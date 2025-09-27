import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { nidn, password } = await request.json()

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

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
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
        ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown'
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