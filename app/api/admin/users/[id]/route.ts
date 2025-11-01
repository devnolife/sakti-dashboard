import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Role } from '@/lib/generated/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { role, sub_role, is_active, position, department, prodi_id } = body

    // Update user
    const updatedUser = await prisma.users.update({
      where: { id: params.id },
      data: {
        role: role as Role,
        sub_role,
        is_active,
        updated_at: new Date()
      }
    })

    // Update related data based on role
    if (role === 'dosen' && updatedUser.id) {
      const lecturer = await prisma.lecturers.findFirst({
        where: { user_id: updatedUser.id }
      })

      if (lecturer && (position || department || prodi_id)) {
        await prisma.lecturers.update({
          where: { id: lecturer.id },
          data: {
            ...(position && { position }),
            ...(department && { department }),
            ...(prodi_id && { prodi_id })
          }
        })
      }
    } else if ((role === 'staff_tu' || role === 'admin_keuangan' || role === 'admin_umum' || role === 'laboratory_admin' || role === 'reading_room_admin' || role === 'kepala_tata_usaha') && updatedUser.id) {
      const staff = await prisma.staff.findFirst({
        where: { user_id: updatedUser.id }
      })

      if (staff && (position || department || prodi_id)) {
        await prisma.staff.update({
          where: { id: staff.id },
          data: {
            ...(position && { position }),
            ...(department && { department }),
            ...(prodi_id && { prodi_id })
          }
        })
      }
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Delete user and related data (cascade should handle this)
    await prisma.users.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
