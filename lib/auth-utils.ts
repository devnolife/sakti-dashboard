import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Pastikan bertipe string pasti (bukan string | undefined) agar jwt.verify tidak error
const JWT_SECRET: string = (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.trim().length > 0)
  ? process.env.NEXTAUTH_SECRET
  : 'your-secret-key'

if (!process.env.NEXTAUTH_SECRET) {
  // Log sekali saja untuk awareness (bisa dihapus di production)
  console.warn('[auth-utils] NEXTAUTH_SECRET tidak ditemukan di environment, menggunakan fallback development secret.')
}

export async function getCurrentUserFromToken(request?: NextRequest): Promise<string | null> {
  try {
    if (!request) {
      // If no request object, we can't get the token
      return null
    }

    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return null
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as any

    // Check if session exists and is not expired
    const session = await prisma.sessions.findUnique({
      where: { token },
      include: { users: true }
    })

    if (!session || session.expires_at < new Date() || !session.users.is_active) {
      return null
    }

    return decoded.userId
  } catch (error) {
    console.error('Error getting user from token:', error)
    return null
  }
}

// For server actions, we'll use a hardcoded user ID for now
// In production, this should be replaced with proper session management
export function getHardcodedUserId(): string {
  return 'cmg4j3mf200019ypx53e5ujp1' // MAHASISWA001 ID
}

// New helper for Server Actions: resolve user_id from either NextAuth session or custom JWT cookie
export async function getServerActionUserId(): Promise<string> {
  // 1. Try NextAuth session (if using NextAuth protected routes)
  try {
    const nextAuthSession = await getServerSession(authOptions)
    if (nextAuthSession?.user?.id) {
      return nextAuthSession.user.id
    }
  } catch (err) {
    // Silent fail, continue to custom session
  }

  // 2. Try custom JWT stored in httpOnly cookie 'session-token'
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session-token')
    const token = sessionCookie?.value
    if (!token) {
      throw new Error('Unauthorized: session token missing')
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (!decoded?.userId) {
      throw new Error('Unauthorized: invalid token payload')
    }

    // Validate against session table & user status
    const sessionRecord = await prisma.sessions.findUnique({
      where: { token },
      include: { users: true }
    })

    if (!sessionRecord || sessionRecord.expires_at < new Date()) {
      throw new Error('Unauthorized: session expired')
    }
    if (!sessionRecord.users.is_active) {
      throw new Error('Unauthorized: user inactive')
    }

    return decoded.userId as string
  } catch (error) {
    console.error('[getServerActionUserId] error:', error)
    throw error instanceof Error ? error : new Error('Unauthorized')
  }
}
