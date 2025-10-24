import { prisma } from '../prisma'
import { graphqlClient, executeGraphQLQuery } from './client'
import { GET_MAHASISWA, MahasiswaResponse } from './queries'

/**
 * Fetch and sync student data from GraphQL API to local database
 * This function is called after successful login for student users
 */
export async function syncStudentDataFromGraphQL(nim: string): Promise<{
  success: boolean
  error?: string
  data?: any
}> {
  try {
    // Fetch data from GraphQL API
    const { data, error } = await executeGraphQLQuery<MahasiswaResponse>(
      GET_MAHASISWA,
      { nim },
      graphqlClient
    )

    if (error || !data?.mahasiswa) {
      console.error('Failed to fetch student data from GraphQL:', error)
      return { success: false, error: error || 'No data returned from GraphQL' }
    }

    const mahasiswaData = data.mahasiswa

    // Find the student record in local database
    const student = await prisma.students.findUnique({
      where: { nim },
      include: { users: true }
    })

    if (!student) {
      return { success: false, error: 'Student not found in local database' }
    }

    // Prepare guardian data (ayah/ibu/wali)
    const guardianData = mahasiswaData.ayah ? {
      ayah: {
        nama: mahasiswaData.ayah.nama || undefined,
        nik: mahasiswaData.ayah.nik || undefined,
        alamat: mahasiswaData.ayah.alamat || undefined,
        hp: mahasiswaData.ayah.hp || undefined,
        email: mahasiswaData.ayah.email || undefined,
        pendidikan: mahasiswaData.ayah.pendidikan || undefined,
        pekerjaan: mahasiswaData.ayah.pekerjaan || undefined,
        instansi: mahasiswaData.ayah.instansi || undefined,
        jabatan: mahasiswaData.ayah.jabatan || undefined,
        penghasilan: mahasiswaData.ayah.penghasilan || undefined,
        status: mahasiswaData.ayah.status || undefined
      }
    } : null

    // Calculate GPA from KHS if available
    let gpa = student.gpa
    if (mahasiswaData.khs && mahasiswaData.khs.length > 0) {
      const latestKhs = mahasiswaData.khs.sort((a, b) => {
        const yearA = a.tahunAkademik || ''
        const yearB = b.tahunAkademik || ''
        return yearB.localeCompare(yearA)
      })[0]
      gpa = latestKhs.ipk || student.gpa
    }

    // Parse dates safely
    const parseTanggalLahir = mahasiswaData.tanggalLahir
      ? new Date(mahasiswaData.tanggalLahir)
      : null

    const parseTanggalLulus = mahasiswaData.tanggalLulus
      ? new Date(mahasiswaData.tanggalLulus)
      : null

    // STEP 1: Sync prodi data FIRST (before updating student)
    if (mahasiswaData.prodi && mahasiswaData.prodi.kodeProdi) {
      const existingProdi = await prisma.prodi.findUnique({
        where: { kode: mahasiswaData.prodi.kodeProdi }
      })

      if (!existingProdi) {
        console.log(`Creating prodi: ${mahasiswaData.prodi.kodeProdi} - ${mahasiswaData.prodi.namaProdi}`)
        await prisma.prodi.create({
          data: {
            kode: mahasiswaData.prodi.kodeProdi,
            nama: mahasiswaData.prodi.namaProdi || mahasiswaData.prodi.kodeProdi,
            jenjang: 'S1', // Default, adjust if needed
            fakultas: mahasiswaData.prodi.kodeFakultas || 'Unknown',
            akreditasi: mahasiswaData.prodi.statusProdi || null
          }
        })
      }
    }

    // STEP 2: Update student record with GraphQL data
    const updatedStudent = await prisma.students.update({
      where: { nim },
      data: {
        // Basic info
        prodi_id: mahasiswaData.kodeProdi || student.prodi_id,
        angkatan: mahasiswaData.angkatan || student.angkatan,

        // Personal info
        jenis_kelamin: mahasiswaData.jenisKelamin || student.jenis_kelamin,
        tempat_lahir: mahasiswaData.tempatLahir || student.tempat_lahir,
        tanggal_lahir: parseTanggalLahir || student.tanggal_lahir,
        nik: mahasiswaData.nik || student.nik,

        // Contact info
        phone: mahasiswaData.hp || student.phone,
        email: mahasiswaData.email || student.email,
        address: student.address, // Keep existing address

        // Academic info
        semester_awal: mahasiswaData.semesterAwal || student.semester_awal,
        gpa: gpa,

        // Graduation info
        lulus: mahasiswaData.lulus ?? student.lulus,
        tahun_akademik_lulus: mahasiswaData.tahunAkademikLulus || student.tahun_akademik_lulus,
        tanggal_lulus: parseTanggalLulus || student.tanggal_lulus,
        no_seri_ijazah: mahasiswaData.noSeriIjazah || student.no_seri_ijazah,
        masa_studi: mahasiswaData.masaStudi || student.masa_studi,

        // Additional data
        guardian: guardianData as any,
        last_sync_at: new Date()
      }
    })

    // STEP 3: Sync dosen penasehat (academic advisor) if exists
    if (mahasiswaData.dosenPenasehat && mahasiswaData.dosenPenasehat.nidn) {
      const advisor = await prisma.lecturers.findFirst({
        where: { nip: mahasiswaData.dosenPenasehat.nidn }
      })

      if (advisor) {
        await prisma.students.update({
          where: { nim },
          data: { academic_advisor_id: advisor.id }
        })
      }
    }

    return {
      success: true,
      data: {
        student: updatedStudent,
        graphqlData: mahasiswaData
      }
    }
  } catch (error: any) {
    console.error('Error syncing student data:', error)
    return {
      success: false,
      error: error.message || 'Failed to sync student data'
    }
  }
}

/**
 * Get enriched student profile with GraphQL data
 * This can be called to get the most up-to-date student information
 */
export async function getEnrichedStudentProfile(nim: string) {
  try {
    // First, sync the latest data
    await syncStudentDataFromGraphQL(nim)

    // Then fetch the enriched profile from local database
    const student = await prisma.students.findUnique({
      where: { nim },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            role: true
          }
        },
        lecturers: {
          select: {
            id: true,
            nip: true,
            email: true,
            user_id: true,
            users: {
              select: {
                name: true
              }
            }
          }
        },
        prodi: {
          select: {
            kode: true,
            nama: true,
            jenjang: true,
            fakultas: true,
            akreditasi: true
          }
        }
      }
    })

    return student
  } catch (error) {
    console.error('Error getting enriched student profile:', error)
    return null
  }
}
