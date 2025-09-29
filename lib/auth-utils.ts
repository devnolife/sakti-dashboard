import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

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
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!session || session.expiresAt < new Date() || !session.user.isActive) {
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
