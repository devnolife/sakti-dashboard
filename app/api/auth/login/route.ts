import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { graphqlClient } from '@/lib/graphql/client'
import { GET_MAHASISWA_USER, type MahasiswaUserResponse } from '@/lib/graphql/queries'
import { md5Hash, verifyMd5Password } from '@/lib/utils/md5'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

console.log('Auth API loaded, bcrypt available:', !!bcrypt)

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
    const user = await prisma.user.upsert({
      where: { username: nim },
      update: {
        name: mahasiswaData.nama,
        // Keep existing password in DB if updating
      },
      create: {
        username: nim,
        name: mahasiswaData.nama,
        password: hashedPassword,
        role: 'mahasiswa',
        isActive: true,
        avatar: mahasiswaData.foto || null,
      },
      include: {
        studentProfile: true
      }
    })

    // Create or update student profile
    const student = await prisma.student.upsert({
      where: { nim },
      update: {
        phone: mahasiswaData.hp,
        major: mahasiswaData.prodi || 'Unknown',
        department: 'Fakultas Teknik', // Default, will be updated from full sync
      },
      create: {
        userId: user.id,
        nim,
        phone: mahasiswaData.hp,
        major: mahasiswaData.prodi || 'Unknown',
        department: 'Fakultas Teknik',
        semester: 1, // Will be updated from mahasiswaInfo sync
        academicYear: new Date().getFullYear().toString(),
        enrollDate: new Date(),
        status: 'active',
      }
    })

    console.log('Mahasiswa synced to local DB:', { nim, userId: user.id, studentId: student.id })

    // Return user with profile
    return await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        studentProfile: true,
        lecturerProfile: true,
        staffProfile: true
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

    console.log('Login attempt:', { username, selectedRole })

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    let user = null
    let isNewUser = false

    // Step 1: Try to find user in local database
    user = await prisma.user.findUnique({
      where: { username },
      include: {
        studentProfile: true,
        lecturerProfile: true,
        staffProfile: true
      }
    })

    console.log('User found in local DB:', user ? { username: user.username, role: user.role } : 'Not found')

    if (user) {
      // User exists in local DB - verify with bcrypt
      console.log('Verifying password with bcrypt...')

      let isValidPassword = false
      try {
        isValidPassword = await bcrypt.compare(password, user.password)
        console.log('Password valid:', isValidPassword)
      } catch (bcryptError) {
        console.error('Bcrypt comparison error:', bcryptError)
        return NextResponse.json(
          { error: 'Authentication error' },
          { status: 500 }
        )
      }

      if (!isValidPassword) {
        console.log('Password comparison failed')
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }
    } else {
      // Step 2: User not in local DB - try GraphQL for mahasiswa
      console.log('User not in local DB, checking GraphQL...')

      try {
        // Query GraphQL for mahasiswa user
        const response = await graphqlClient.request<MahasiswaUserResponse>(
          GET_MAHASISWA_USER,
          { nim: username }
        )

        const mahasiswaData = response.mahasiswaUser

        if (!mahasiswaData) {
          console.log('User not found in GraphQL either')
          return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
          )
        }

        console.log('Mahasiswa found in GraphQL, verifying password with MD5...')

        // Verify password using MD5 (GraphQL uses MD5)
        const isValidPassword = verifyMd5Password(password, mahasiswaData.passwd)

        if (!isValidPassword) {
          console.log('GraphQL password verification failed')
          return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
          )
        }

        console.log('GraphQL password verified, syncing to local DB...')

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
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }
    }

    // Check if user is active
    if (!user || !user.isActive) {
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
        subRole: user.subRole
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Create session record
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    })

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: isNewUser ? 'first_login' : 'login',
        resource: 'auth',
        details: {
          loginTime: new Date(),
          userAgent: request.headers.get('user-agent'),
          isNewUser,
          syncedFromGraphQL: isNewUser
        },
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      }
    })

    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        subRole: user.subRole,
        avatar: user.avatar,
        profile: user.studentProfile || user.lecturerProfile || user.staffProfile,
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
