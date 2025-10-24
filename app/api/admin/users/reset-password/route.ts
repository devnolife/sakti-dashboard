import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { authMiddleware } from '@/lib/auth-middleware'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  userId: z.string(),
  newPassword: z.string().min(6, 'Password minimal 6 karakter'),
})

// Helper function to generate ID
function generateId(): string {
  return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// POST /api/admin/users/reset-password
export async function POST(request: NextRequest) {
  try {
    // Authenticate admin
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Check if user is admin
    if (token.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin only' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = resetPasswordSchema.parse(body)

    // Check if target user exists
    const targetUser = await prisma.users.findUnique({
      where: { id: validatedData.userId },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
      }
    })

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      )
    }

    // Prevent admin from resetting their own password through this endpoint
    if (targetUser.id === token.userId) {
      return NextResponse.json(
        { error: 'Tidak dapat reset password sendiri. Gunakan fitur change password.' },
        { status: 400 }
      )
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10)

    // Update user password
    await prisma.users.update({
      where: { id: validatedData.userId },
      data: {
        password: hashedPassword,
        updated_at: new Date(),
      }
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        id: generateId(),
        user_id: token.userId as string,
        action: 'password_reset_by_admin',
        resource: 'users',
        details: {
          targetUserId: targetUser.id,
          targetUsername: targetUser.username,
          targetUserName: targetUser.name,
          targetUserRole: targetUser.role,
          resetBy: token.userId,
          resetAt: new Date(),
        },
        ip_address: request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          'unknown'
      }
    })

    return NextResponse.json({
      success: true,
      message: `Password untuk ${targetUser.name} (${targetUser.username}) berhasil direset`,
      user: {
        id: targetUser.id,
        username: targetUser.username,
        name: targetUser.name,
        role: targetUser.role,
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validasi gagal', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error resetting password:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mereset password' },
      { status: 500 }
    )
  }
}

