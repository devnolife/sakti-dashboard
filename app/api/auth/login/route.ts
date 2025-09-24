import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

console.log('Auth API loaded, bcrypt available:', !!bcrypt)

export async function POST(request: NextRequest) {
  try {
    const { nidn, password, selectedRole } = await request.json()

    console.log('Login attempt:', { nidn, selectedRole })

    if (!nidn || !password) {
      return NextResponse.json(
        { error: 'NIDN and password are required' },
        { status: 400 }
      )
    }

    // Find user with profile
    const user = await prisma.user.findUnique({
      where: { nidn },
      include: {
        studentProfile: true,
        lecturerProfile: true,
        staffProfile: true
      }
    })

    console.log('User found:', user ? { nidn: user.nidn, role: user.role, isActive: user.isActive } : 'No user found')

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    console.log('Comparing passwords...')
    console.log('Input password length:', password.length)
    console.log('Stored password hash length:', user.password.length)
    console.log('Stored password hash starts with:', user.password.substring(0, 10))
    
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
        nidn: user.nidn,
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
        action: 'login',
        resource: 'auth',
        details: {
          loginTime: new Date(),
          userAgent: request.headers.get('user-agent')
        },
        // ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown'
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      }
    })

    const response = NextResponse.json({
      user: {
        id: user.id,
        nidn: user.nidn,
        name: user.name,
        role: user.role,
        subRole: user.subRole,
        avatar: user.avatar,
        profile: user.studentProfile || user.lecturerProfile || user.staffProfile
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