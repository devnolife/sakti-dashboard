import { prisma } from '@/lib/prisma'
import { createAuthenticatedClient, executeGraphQLQuery } from '@/lib/graphql/client'
import { GET_DOSEN, GET_PA_DOSEN, type DosenResponse } from '@/lib/graphql/queries'
import { randomBytes } from 'crypto'

// Helper function to generate ID similar to cuid
function generateId(): string {
  return `c${randomBytes(12).toString('base64url')}`
}

/**
 * Sync dosen profile from GraphQL to local database
 */
export async function syncDosenFromGraphQL(nidn: string, token: string) {
  try {
    console.log('Syncing dosen from GraphQL:', nidn)

    // Find existing user by username (nidn is username for dosen)
    const existingUser = await prisma.users.findUnique({
      where: { username: nidn },
      include: { lecturers: true }
    })

    if (!existingUser) {
      console.error('Dosen user not found in local DB:', nidn)
      return null
    }

    // If lecturer profile already exists, skip sync and return existing data
    if (existingUser.lecturers) {
      console.log('✅ Dosen lecturer profile already exists, skipping sync')
      return { user: existingUser, lecturer: existingUser.lecturers }
    }

    // Only fetch from GraphQL if lecturer profile doesn't exist
    const client = createAuthenticatedClient(token)
    const { data, error } = await executeGraphQLQuery<DosenResponse>(
      GET_DOSEN,
      { nidn },
      client
    )

    if (error || !data?.dosen) {
      console.error('Failed to fetch dosen from GraphQL:', error)
      return null
    }

    const dosenData = data.dosen
    console.log('GraphQL dosen data received:', {
      nidn: dosenData.nidn,
      nama: dosenData.nama,
      email: dosenData.email
    })

    // Build full name with titles
    const fullName = [
      dosenData.gelar_depan,
      dosenData.nama,
      dosenData.gelar_belakang
    ].filter(Boolean).join(' ')

    // Update user name if different
    if (existingUser.name !== fullName) {
      await prisma.users.update({
        where: { id: existingUser.id },
        data: { name: fullName }
      })
    }

    // Create lecturer profile (since we know it doesn't exist)
    const lecturer = await prisma.lecturers.create({
      data: {
        id: generateId(),
        user_id: existingUser.id,
        nip: nidn,
        department: dosenData.prodiId || 'Unknown',
        position: 'Dosen',
        specialization: null,
        email: dosenData.email || existingUser.name?.toLowerCase().replace(/\s/g, '.') + '@unismuh.ac.id',
        last_sync_at: new Date(),
      }
    })

    console.log('Dosen synced to local DB:', { nidn, user_id: existingUser.id, lecturer_id: lecturer.id })

    return { user: existingUser, lecturer }
  } catch (error) {
    console.error('Error syncing dosen from GraphQL:', error)
    return null
  }
}

/**
 * Sync mahasiswa PA (Penasehat Akademik) from GraphQL
 * Returns list of students under this dosen's supervision
 */
export async function syncMahasiswaPaFromGraphQL(token: string) {
  try {
    console.log('Syncing mahasiswa PA from GraphQL')

    const client = createAuthenticatedClient(token)
    const { data, error } = await executeGraphQLQuery<{
      paDosen: Array<{
        nim: string
        nama: string
        angkatan: number
        kodeProdi: string
        namaProdi: string
        ipk: number | null
        totalSksLulus: number | null
        jumlahSemester: number | null
        statusTerakhirTa: string | null
      }>
    }>(GET_PA_DOSEN, {}, client)

    if (error || !data?.paDosen) {
      console.error('Failed to fetch mahasiswa PA from GraphQL:', error)
      return []
    }

    const students = data.paDosen
    console.log(`Found ${students.length} mahasiswa PA from GraphQL`)

    // Get the dosen user from token
    const dosenUser = await prisma.users.findFirst({
      where: { role: 'dosen' },
      include: { lecturers: true }
    })

    if (!dosenUser?.lecturers) {
      console.error('Dosen user not found')
      return []
    }

    const syncedStudents = []

    for (const mahasiswa of students) {
      try {
        // Find or create user
        const user = await prisma.users.upsert({
          where: { username: mahasiswa.nim },
          update: {
            name: mahasiswa.nama,
          },
          create: {
            id: generateId(),
            username: mahasiswa.nim,
            name: mahasiswa.nama,
            password: 'temp', // Password will be set on first login
            role: 'mahasiswa',
            is_active: true,
          }
        })

        // Map status from GraphQL
        let status: 'active' | 'inactive' | 'graduated' | 'suspended' | 'leave' = 'active'
        if (mahasiswa.statusTerakhirTa) {
          const statusLower = mahasiswa.statusTerakhirTa.toLowerCase()
          if (statusLower.includes('lulus')) {
            status = 'graduated'
          } else if (statusLower.includes('cuti')) {
            status = 'leave'
          } else if (statusLower.includes('non aktif') || statusLower.includes('nonaktif')) {
            status = 'inactive'
          }
        }

        // Create or update student
        const student = await prisma.students.upsert({
          where: { nim: mahasiswa.nim },
          update: {
            major: mahasiswa.namaProdi,
            department: 'Fakultas Teknik',
            semester: mahasiswa.jumlahSemester || 1,
            gpa: mahasiswa.ipk ? parseFloat(mahasiswa.ipk.toString()) : null,
            academic_advisor_id: dosenUser.lecturers.id,
            status,
            last_sync_at: new Date(),
          },
          create: {
            id: generateId(),
            user_id: user.id,
            nim: mahasiswa.nim,
            major: mahasiswa.namaProdi,
            department: 'Fakultas Teknik',
            semester: mahasiswa.jumlahSemester || 1,
            academic_year: new Date().getFullYear().toString(),
            enroll_date: new Date(`${mahasiswa.angkatan}-09-01`),
            gpa: mahasiswa.ipk ? parseFloat(mahasiswa.ipk.toString()) : null,
            academic_advisor_id: dosenUser.lecturers.id,
            status,
            last_sync_at: new Date(),
          }
        })

        syncedStudents.push(student)
      } catch (studentError) {
        console.error(`Error syncing student ${mahasiswa.nim}:`, studentError)
        // Continue with other students
      }
    }

    console.log(`Synced ${syncedStudents.length} mahasiswa PA to local DB`)
    return syncedStudents
  } catch (error) {
    console.error('Error syncing mahasiswa PA from GraphQL:', error)
    return []
  }
}

/**
 * Get dosen by NIDN with auto-sync from GraphQL if not found or outdated
 */
export async function getDosenWithSync(nidn: string, token: string) {
  try {
    // Check if lecturer exists and is recently synced (within 24 hours)
    const lecturer = await prisma.lecturers.findUnique({
      where: { nip: nidn },
      include: {
        users: true
      }
    })

    const needsSync = !lecturer ||
      !lecturer.last_sync_at ||
      (new Date().getTime() - lecturer.last_sync_at.getTime() > 24 * 60 * 60 * 1000)

    if (needsSync) {
      console.log('Lecturer data outdated or not found, syncing from GraphQL...')
      const syncResult = await syncDosenFromGraphQL(nidn, token)
      if (syncResult) {
        return syncResult.lecturer
      }
    }

    return lecturer
  } catch (error) {
    console.error('Error in getDosenWithSync:', error)
    return null
  }
}

/**
 * Get mahasiswa PA with auto-sync from GraphQL if outdated
 */
export async function getMahasiswaPaWithSync(dosenId: string, token: string, forceSync: boolean = false) {
  try {
    // Check last sync time for any student under this dosen
    const lastSyncedStudent = await prisma.students.findFirst({
      where: { academic_advisor_id: dosenId },
      orderBy: { last_sync_at: 'desc' }
    })

    const needsSync = forceSync ||
      !lastSyncedStudent ||
      !lastSyncedStudent.last_sync_at ||
      (new Date().getTime() - lastSyncedStudent.last_sync_at.getTime() > 24 * 60 * 60 * 1000)

    if (needsSync) {
      console.log('Student PA data outdated or not found, syncing from GraphQL...')
      await syncMahasiswaPaFromGraphQL(token)
    }

    // Return students from local DB
    const students = await prisma.students.findMany({
      where: { academic_advisor_id: dosenId },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: { semester: 'desc' }
    })

    return students
  } catch (error) {
    console.error('Error in getMahasiswaPaWithSync:', error)
    return []
  }
}
