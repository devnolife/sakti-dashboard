import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Get the token from authorization header
    const authHeader = request.headers.get('authorization')
    const sessionToken = authHeader?.replace('Bearer ', '')

    if (sessionToken) {
      // Delete session from database
      await prisma.sessions.deleteMany({
        where: {
          token: sessionToken,
          user_id: token.sub
        }
      })

      // Log audit
      await prisma.audit_logs.create({
        data: {
          user_id: token.sub!,
          action: 'logout',
          resource: 'auth',
          details: {
            logoutTime: new Date(),
            userAgent: request.headers.get('user-agent')
          },
          ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
        }
      })
    }

    const response = NextResponse.json({ message: 'Logged out successfully' })
    
    // Clear httpOnly cookie
    response.cookies.set('session-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
