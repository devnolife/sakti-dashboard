import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { graphqlClient } from '@/lib/graphql/client'
import { GET_MAHASISWA_USER, GET_MAHASISWA_INFO, type MahasiswaUserResponse, type MahasiswaInfoResponse } from '@/lib/graphql/queries'
import { md5Hash, verifyMd5Password } from '@/lib/utils/md5'
import { randomBytes } from 'crypto'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

// Helper function to generate ID similar to cuid
function generateId(): string {
  return `c${randomBytes(12).toString('base64url')}`
}

/**
 * Sync mahasiswa info (IPK, semester, etc) from GraphQL
 */
async function syncMahasiswaInfoFromGraphQL(nim: string, studentId: string) {
  try {
    console.log('Fetching mahasiswaInfo from GraphQL for:', nim)
    const response = await graphqlClient.request<MahasiswaInfoResponse>(
      GET_MAHASISWA_INFO,
      { nim }
    )

    const info = response.mahasiswaInfo

    if (!info) {
      console.log('No mahasiswaInfo found for:', nim)
      return
    }

    console.log('MahasiswaInfo received from GraphQL:', {
      nim: info.nim,
      nama: info.nama,
      ipk: info.ipk,
      semester: info.jumlahSemester,
      totalSksLulus: info.totalSksLulus
    })

    // Map status from GraphQL
    let status: 'active' | 'inactive' | 'graduated' | 'suspended' | 'leave' = 'active'
    if (info.statusTerakhirTa) {
      const statusLower = info.statusTerakhirTa.toLowerCase()
      if (statusLower.includes('lulus')) {
        status = 'graduated'
      } else if (statusLower.includes('cuti')) {
        status = 'leave'
      } else if (statusLower.includes('non aktif') || statusLower.includes('nonaktif')) {
        status = 'inactive'
      }
    }

    // Update student with detailed info from GraphQL
    await prisma.students.update({
      where: { id: studentId },
      data: {
        gpa: info.ipk ? parseFloat(info.ipk.toString()) : null,
        semester: info.jumlahSemester || 1,
        status,
        major: info.namaProdi,
        last_sync_at: new Date()
      }
    })

    console.log('Student profile updated with IPK and semester from GraphQL')
  } catch (error) {
    console.error('Error syncing mahasiswaInfo from GraphQL:', error)
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

    // Create or update student profile
    const student = await prisma.students.upsert({
      where: { nim },
      update: {
        phone: mahasiswaData.hp,
        major: mahasiswaData.prodi || 'Unknown',
        department: 'Fakultas Teknik', // Default, will be updated from full sync
      },
      create: {
        id: generateId(),
        user_id: user.id,
        nim,
        phone: mahasiswaData.hp,
        major: mahasiswaData.prodi || 'Unknown',
        department: 'Fakultas Teknik',
        semester: 1, // Will be updated from mahasiswaInfo sync
        academic_year: new Date().getFullYear().toString(),
        enroll_date: new Date(),
        status: 'active',
      }
    })

    console.log('Mahasiswa synced to local DB:', { nim, user_id: user.id, student_id: student.id })

    // Sync detailed info (IPK, semester, etc) from GraphQL
    await syncMahasiswaInfoFromGraphQL(nim, student.id)

    // Return user with profile
    return await prisma.users.findUnique({
      where: { id: user.id },
      include: {
        students: true,
        lecturers: true,
        staff: true
      }
    })
  } catch (error) {
    console.error('Error syncing mahasiswa from GraphQL:', error)
    return null
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

    // Step 1: Try to find user in local database
    user = await prisma.users.findUnique({
      where: { username },
      include: {
        students: true,
        lecturers: true,
        staff: true
      }
    })

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
        user = await syncMahasiswaFromGraphQL(username, password)

        if (!user) {
          console.error('Failed to sync user to local DB')
          return NextResponse.json(
            { error: 'Failed to create user account' },
            { status: 500 }
          )
        }

        isNewUser = true
        console.log('User successfully synced from GraphQL')

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

    // Create session token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
        subRole: user.sub_role
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
