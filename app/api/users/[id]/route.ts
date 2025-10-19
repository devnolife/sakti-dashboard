import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const updateUserSchema = z.object({
  username: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
  name: z.string().min(1).optional(),
  role: z.enum(['mahasiswa', 'dosen', 'prodi', 'staff_tu', 'dekan', 'admin', 'laboratory_admin', 'reading_room_admin', 'admin_umum', 'admin_keuangan', 'gkm', 'kepala_tata_usaha']).optional(),
  subRole: z.string().optional(),
  avatar: z.string().optional(),
  isActive: z.boolean().optional()
})

interface RouteParams {
  params: { id: string }
}

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'users')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = params
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        subRole: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        students: {
          select: {
            nim: true,
            major: true,
            department: true,
            semester: true,
            academicYear: true,
            phone: true,
            address: true,
            status: true,
            gpa: true
          }
        },
        lecturers: {
          select: {
            nip: true,
            department: true,
            position: true,
            specialization: true,
            phone: true,
            office: true
          }
        },
        staff: {
          select: {
            nip: true,
            department: true,
            position: true,
            phone: true,
            office: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/users/[id]
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'users')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = params
    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if username is being changed and if it already exists
    if (validatedData.username && validatedData.username !== existingUser.username) {
      const usernameExists = await prisma.user.findUnique({
        where: { username: validatedData.username }
      })

      if (usernameExists) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
      }
    }

    const updateData: any = { ...validatedData }

    // Hash password if provided
    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 10)
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        subRole: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/users/[id]
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'users')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = params

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent admin from deleting themselves
    if (existingUser.id === token.sub) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
    }

    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
