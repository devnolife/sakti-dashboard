import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { graphqlClient } from '@/lib/graphql/client'
import { GET_MAHASISWA_USER, GET_MAHASISWA_INFO, GET_MAHASISWA, type MahasiswaUserResponse, type MahasiswaInfoResponse, type MahasiswaResponse } from '@/lib/graphql/queries'
import { md5Hash, verifyMd5Password } from '@/lib/utils/md5'
import { randomBytes } from 'crypto'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

// Helper function to generate ID similar to cuid
function generateId(): string {
  return `c${randomBytes(12).toString('base64url')}`
}

/**
 * Sync prodi data from GraphQL mahasiswa response
 */
async function syncProdiFromMahasiswa(nim: string) {
  try {
    console.log('🔄 Syncing prodi data from mahasiswa:', nim)

    const response = await graphqlClient.request<MahasiswaResponse>(
      GET_MAHASISWA,
      { nim }
    )

    const mahasiswa = response.mahasiswa

    if (!mahasiswa?.prodi || !mahasiswa.prodi.kodeProdi) {
      console.log('⚠️  No prodi data found for mahasiswa:', nim)
      console.log('Prodi data:', mahasiswa?.prodi)
      return null
    }

    const prodiData = mahasiswa.prodi
    console.log('🎓 Prodi data from GraphQL:', prodiData)

    // Validate required fields
    if (!prodiData.kodeProdi || !prodiData.namaProdi) {
      console.log('⚠️  Incomplete prodi data:', prodiData)
      return null
    }

    // Check if prodi exists
    const existingProdi = await prisma.prodi.findUnique({
      where: { kode: prodiData.kodeProdi }
    })

    if (!existingProdi) {
      // Create new prodi
      // Default jenjang and fakultas from kodeProdi pattern
      const jenjang = prodiData.kodeProdi.startsWith('55') ? 'S1' :
        prodiData.kodeProdi.startsWith('56') ? 'S2' : 'S1'
      const fakultas = 'Teknik' // Default fakultas

      const createdProdi = await prisma.prodi.create({
        data: {
          kode: prodiData.kodeProdi,
          nama: prodiData.namaProdi,
          jenjang: jenjang,
          fakultas: fakultas,
          akreditasi: null // GraphQL tidak return akreditasi
        }
      })
      console.log('✅ Created prodi:', createdProdi.kode, '-', createdProdi.nama)
      return createdProdi.kode
    } else {
      // Update existing prodi if name changed
      if (existingProdi.nama !== prodiData.namaProdi) {
        await prisma.prodi.update({
          where: { kode: prodiData.kodeProdi },
          data: {
            nama: prodiData.namaProdi
          }
        })
        console.log('✏️  Updated prodi:', prodiData.kodeProdi, '-', prodiData.namaProdi)
      } else {
        console.log('ℹ️  Prodi already exists:', prodiData.kodeProdi)
      }
      return existingProdi.kode
    }

  } catch (error) {
    console.error('❌ Error syncing prodi from mahasiswa:', error)
    return null
  }
}

/**
 * Sync complete mahasiswa data from GraphQL
 */
async function syncMahasiswaDataFromGraphQL(nim: string, studentId: string) {
  try {
    console.log('🔄 Fetching complete mahasiswa data from GraphQL for:', nim)
    console.log('   Student ID:', studentId)

    // Get complete mahasiswa data
    const response = await graphqlClient.request<MahasiswaResponse>(
      GET_MAHASISWA,
      { nim }
    )

    const mahasiswa = response.mahasiswa

    if (!mahasiswa) {
      console.log('❌ No mahasiswa data found for:', nim)
      return
    }

    console.log('✅ Complete mahasiswa data received from GraphQL')
    console.log('   Raw data keys:', Object.keys(mahasiswa))    // Calculate GPA from KHS (latest semester IPK)
    let gpa: number | null = null
    if (mahasiswa.khs && mahasiswa.khs.length > 0) {
      const sortedKhs = [...mahasiswa.khs].sort((a, b) => {
        const taA = a.tahunAkademik || '0'
        const taB = b.tahunAkademik || '0'
        return taB.localeCompare(taA)
      })
      gpa = sortedKhs[0].ipk || null
    }

    // Determine semester from KHS count
    const semester = mahasiswa.khs?.length || 1

    // Map status
    let status: 'active' | 'inactive' | 'graduated' | 'suspended' | 'dropped_out' = 'active'
    if (mahasiswa.lulus) {
      status = 'graduated'
    }

    // Prepare guardian data
    const guardianData = mahasiswa.ayah ? {
      ayah: {
        nama: mahasiswa.ayah.nama || null,
        nik: mahasiswa.ayah.nik || null,
        hp: mahasiswa.ayah.hp || null,
        alamat: mahasiswa.ayah.alamat || null,
        pendidikan: mahasiswa.ayah.pendidikan || null,
        pekerjaan: mahasiswa.ayah.pekerjaan || null,
        instansi: mahasiswa.ayah.instansi || null,
        penghasilan: mahasiswa.ayah.penghasilan || null,
        status: mahasiswa.ayah.status || null
      }
    } : null

    // Update student with ALL data from GraphQL
    await prisma.students.update({
      where: { id: studentId },
      data: {
        angkatan: mahasiswa.angkatan,
        jenis_kelamin: mahasiswa.jenisKelamin,
        tempat_lahir: mahasiswa.tempatLahir,
        tanggal_lahir: mahasiswa.tanggalLahir ? new Date(mahasiswa.tanggalLahir) : null,
        nik: mahasiswa.nik,
        email: mahasiswa.email,
        phone: mahasiswa.hp,
        semester_awal: mahasiswa.semesterAwal,
        tahun_akademik_lulus: mahasiswa.tahunAkademikLulus,
        tanggal_lulus: mahasiswa.tanggalLulus ? new Date(mahasiswa.tanggalLulus) : null,
        lulus: mahasiswa.lulus,
        no_seri_ijazah: mahasiswa.noSeriIjazah,
        masa_studi: mahasiswa.masaStudi,
        gpa: gpa,
        semester: semester,
        status: status,
        guardian: guardianData as any,
        last_sync_at: new Date()
      }
    })

    console.log('✅ Student profile fully synced with all fields from GraphQL')
    console.log(`   - Personal: angkatan=${mahasiswa.angkatan}, gender=${mahasiswa.jenisKelamin}`)
    console.log(`   - Contact: email=${mahasiswa.email}, phone=${mahasiswa.hp}`)
    console.log(`   - Academic: GPA=${gpa}, semester=${semester}, status=${status}`)
    console.log(`   - Guardian: ${guardianData ? 'Data ayah tersedia' : 'Tidak ada data wali'}`)

  } catch (error) {
    console.error('❌ Error syncing complete mahasiswa data from GraphQL:', error)
  }
}

/**
 * Sync mahasiswa from GraphQL to local database
 */
async function syncMahasiswaFromGraphQL(nim: string, graphqlPassword: string) {
  try {
    const response = await graphqlClient.request<MahasiswaUserResponse>(
      GET_MAHASISWA_USER,
      { nim }
    )

    const mahasiswaData = response.mahasiswaUser

    if (!mahasiswaData) {
      return null
    }

    console.log('GraphQL mahasiswa data received:', {
      nim: mahasiswaData.nim,
      nama: mahasiswaData.nama,
      prodi: mahasiswaData.prodi
    })

    // Hash password untuk disimpan di local DB (bcrypt)
    const hashedPassword = await bcrypt.hash(graphqlPassword, 10)

    // Create or update user
    const user = await prisma.users.upsert({
      where: { username: nim },
      update: {
        name: mahasiswaData.nama,
        // Keep existing password in DB if updating
      },
      create: {
        id: generateId(),
        username: nim,
        name: mahasiswaData.nama,
        password: hashedPassword,
        role: 'mahasiswa',
        is_active: true,
        avatar: mahasiswaData.foto || null,
        updated_at: new Date(),
      },
      include: {
        students: true
      }
    })

    // Sync prodi data first to ensure it exists and get prodi_id
    const prodi_id = await syncProdiFromMahasiswa(nim)
    console.log('🎓 Prodi ID from sync:', prodi_id)

    // Create or update student profile
    const student = await prisma.students.upsert({
      where: { nim },
      update: {
        phone: mahasiswaData.hp,
        major: mahasiswaData.prodi || 'Unknown',
        department: 'Fakultas Teknik', // Default, will be updated from full sync
        prodi_id: prodi_id,
      },
      create: {
        id: generateId(),
        user_id: user.id,
        nim,
        phone: mahasiswaData.hp,
        major: mahasiswaData.prodi || 'Unknown',
        department: 'Fakultas Teknik',
        prodi_id: prodi_id,
        semester: 1, // Will be updated from mahasiswaInfo sync
        academic_year: new Date().getFullYear().toString(),
        enroll_date: new Date(),
        status: 'active',
      }
    })

    console.log('Mahasiswa synced to local DB:', { nim, user_id: user.id, student_id: student.id, prodi_id })

    // Sync complete mahasiswa data from GraphQL (all fields)
    await syncMahasiswaDataFromGraphQL(nim, student.id)

    // Return user with profile including prodi info
    return await prisma.users.findUnique({
      where: { id: user.id },
      include: {
        students: {
          include: {
            prodi: true
          }
        },
        lecturers: {
          include: {
            prodi: true
          }
        },
        staff: {
          include: {
            prodi: true
          }
        }
      }
    })
  } catch (error) {
    console.error('Error syncing mahasiswa from GraphQL:', error)
    return null
  }
}

/**
 * Get user include options based on their role
 */
function getUserIncludeByRole(role?: string) {
  // If role is dosen/lecturer
  if (role === 'dosen') {
    return {
      lecturers: {
        include: {
          prodi: true
        }
      }
    }
  }

  // If role is mahasiswa/student
  if (role === 'mahasiswa') {
    return {
      students: {
        include: {
          prodi: true
        }
      }
    }
  }

  // If role is staff
  if (role === 'staff') {
    return {
      staff: {
        include: {
          prodi: true
        }
      }
    }
  }

  // Default: include all (for when we don't know the role yet)
  return {
    students: {
      include: {
        prodi: true
      }
    },
    lecturers: {
      include: {
        prodi: true
      }
    },
    staff: {
      include: {
        prodi: true
      }
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password, selectedRole } = await request.json()

    console.log('========================================')
    console.log('🔐 Login attempt:', { username, selectedRole })
    console.log('========================================')

    // Debug: Hash password dengan MD5 untuk melihat hasilnya
    const hashedPassword = crypto.createHash("md5").update(password).digest("hex")
    console.log('Password (plain):', password)
    console.log('Password (MD5 hash):', hashedPassword)

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    let user = null
    let isNewUser = false

    // Step 1: Try to find user in local database (without includes first to get role)
    const userBasic = await prisma.users.findUnique({
      where: { username }
    })

    console.log('User found in local DB:', userBasic ? { username: userBasic.username, role: userBasic.role } : 'Not found')

    // Step 2: If user exists, fetch with appropriate includes based on role
    if (userBasic) {
      user = await prisma.users.findUnique({
        where: { username },
        include: getUserIncludeByRole(userBasic.role)
      })
    }

    console.log('User found in local DB:', user ? { username: user.username, role: user.role } : 'Not found')

    if (user) {
      // User exists in local DB - verify password
      console.log('Verifying password...')

      let isValidPassword = false

      // Check if password is bcrypt (starts with $2a$, $2b$, or $2y$) or MD5 (32 hex chars)
      const isBcrypt = user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$')

      if (isBcrypt) {
        console.log('Password format: bcrypt')
        try {
          isValidPassword = await bcrypt.compare(password, user.password)
          console.log('Bcrypt verification:', isValidPassword)
        } catch (bcryptError) {
          console.error('Bcrypt comparison error:', bcryptError)
          return NextResponse.json(
            { error: 'Authentication error' },
            { status: 500 }
          )
        }
      } else {
        console.log('Password format: MD5')
        // Verify with MD5
        isValidPassword = hashedPassword === user.password
        console.log('MD5 verification:', isValidPassword)
        console.log('Input hash:', hashedPassword)
        console.log('DB hash:', user.password)
      }

      if (!isValidPassword) {
        console.log('❌ Password comparison failed - Invalid credentials')
        console.log('Returning 401 error...')
        return NextResponse.json(
          { error: 'Password salah. Silakan coba lagi.' },
          { status: 401 }
        )
      }

      console.log('✅ Password verification successful')

      // For existing mahasiswa users, always sync data from GraphQL to keep it up-to-date
      if (user.role === 'mahasiswa') {
        console.log('🔄 Syncing existing mahasiswa data from GraphQL...')
        try {
          await syncMahasiswaFromGraphQL(username, password)

          // Re-fetch user with appropriate includes based on role
          const updatedUser = await prisma.users.findUnique({
            where: { id: user.id },
            include: getUserIncludeByRole(user.role)
          })

          if (updatedUser) {
            user = updatedUser
            console.log('✅ User data synced successfully')
            console.log('📊 Updated profile:', {
              id: user.id,
              hasStudents: !!user.students,
              studentNim: user.students?.nim,
              hasLecturers: !!user.lecturers,
              hasStaff: !!user.staff
            })
          }
        } catch (syncError) {
          console.error('⚠️ Failed to sync mahasiswa data:', syncError)
          // Continue with login even if sync fails - user can still access with existing data
        }
      }
    } else {
      console.log('User not in local DB, checking GraphQL...')

      try {
        // Query GraphQL for mahasiswa user
        const response = await graphqlClient.request<MahasiswaUserResponse>(
          GET_MAHASISWA_USER,
          { nim: username }
        )

        const mahasiswaData = response.mahasiswaUser

        if (!mahasiswaData) {
          console.log('❌ User not found in GraphQL')
          return NextResponse.json(
            { error: 'Akun tidak ditemukan. Periksa kembali username Anda.' },
            { status: 401 }
          )
        }

        console.log('Mahasiswa found in GraphQL, verifying password with MD5...')
        console.log('Input MD5 hash:', hashedPassword)
        console.log('GraphQL password hash:', mahasiswaData.passwd)

        // Verify password using MD5 (GraphQL uses MD5)
        // Langsung bandingkan hash MD5 dari input dengan hash dari GraphQL
        if (hashedPassword !== mahasiswaData.passwd) {
          console.log('❌ Password mismatch - Invalid credentials')
          console.log('Hash tidak sama, password salah!')
          return NextResponse.json(
            { error: 'Password salah. Silakan coba lagi.' },
            { status: 401 }
          )
        }

        console.log('✅ Password matched!')
        console.log('Syncing user to local DB...')

        // Password valid - sync to local database
        const syncedUser = await syncMahasiswaFromGraphQL(username, password)

        if (!syncedUser) {
          console.error('Failed to sync user to local DB')
          return NextResponse.json(
            { error: 'Failed to create user account' },
            { status: 500 }
          )
        }

        // Re-fetch user with appropriate includes based on role
        user = await prisma.users.findUnique({
          where: { id: syncedUser.id },
          include: getUserIncludeByRole(syncedUser.role)
        })

        if (!user) {
          console.error('Failed to fetch synced user')
          return NextResponse.json(
            { error: 'Failed to load user profile' },
            { status: 500 }
          )
        }

        isNewUser = true
        console.log('User successfully synced from GraphQL')
        console.log('User profile loaded:', {
          id: user.id,
          hasStudents: !!user.students,
          hasLecturers: !!user.lecturers,
          hasStaff: !!user.staff
        })

      } catch (graphqlError: any) {
        console.error('GraphQL error:', graphqlError)
        return NextResponse.json(
          { error: 'Akun tidak ditemukan atau terjadi kesalahan sistem. Silakan hubungi administrator.' },
          { status: 401 }
        )
      }
    }

    // Check if user is active
    if (!user || !user.is_active) {
      return NextResponse.json(
        { error: 'Account is inactive' },
        { status: 401 }
      )
    }

    // Check if selected role matches user's actual role (if provided)
    if (selectedRole && user.role !== selectedRole) {
      return NextResponse.json(
        { error: `Access denied. Your account role is ${user.role}, but you selected ${selectedRole}.` },
        { status: 403 }
      )
    }

    // Get prodi_id from user profile
    let prodi_id: string | undefined = undefined

    if (user.students) {
      prodi_id = user.students.prodi_id || undefined
      console.log('✅ Student prodi_id:', prodi_id)
    } else if (user.lecturers) {
      prodi_id = user.lecturers.prodi_id || undefined
      console.log('✅ Lecturer prodi_id:', prodi_id)
    } else if (user.staff) {
      prodi_id = user.staff.prodi_id || undefined
      console.log('✅ Staff prodi_id:', prodi_id)
    }

    // Create session token with prodi_id
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
        subRole: user.sub_role,
        prodi_id: prodi_id
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Create session record
    const session = await prisma.sessions.create({
      data: {
        id: generateId(),
        user_id: user.id,
        token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    })

    // Log audit
    await prisma.audit_logs.create({
      data: {
        id: generateId(),
        user_id: user.id,
        action: isNewUser ? 'first_login' : 'login',
        resource: 'auth',
        details: {
          loginTime: new Date(),
          userAgent: request.headers.get('user-agent'),
          isNewUser,
          syncedFromGraphQL: isNewUser
        },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      }
    })

    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        sub_role: user.sub_role,
        prodi_id: prodi_id,
        avatar: user.avatar,
        profile: user.students || user.lecturers || user.staff,
        isNewUser
      },
      token
    })

    // Set httpOnly cookie for session
    response.cookies.set('session-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
