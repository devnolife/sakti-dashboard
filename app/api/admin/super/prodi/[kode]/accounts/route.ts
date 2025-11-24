import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth-middleware'
import bcrypt from 'bcryptjs'

// GET - List all accounts in a prodi with filters
export async function GET(
  req: NextRequest,
  { params }: { params: { kode: string } }
) {
  try {
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { kode } = params
    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role') // mahasiswa, dosen, staff
    const status = searchParams.get('status') // active, inactive, all
    const search = searchParams.get('search')

    // Build account list from different tables
    const accounts: any[] = []

    // Get students if role is mahasiswa or all
    if (!role || role === 'all' || role === 'mahasiswa') {
      const students = await prisma.students.findMany({
        where: {
          prodi_id: kode,
          ...(status && status !== 'all' && {
            status: status as any
          }),
          ...(search && {
            OR: [
              { nim: { contains: search, mode: 'insensitive' } },
              { users: { name: { contains: search, mode: 'insensitive' } } }
            ]
          })
        },
        include: {
          users: {
            select: {
              id: true,
              username: true,
              name: true,
              is_active: true,
              created_at: true,
            }
          }
        },
        take: 100
      })

      accounts.push(...students.map(s => ({
        userId: s.users.id,
        username: s.users.username,
        name: s.users.name,
        role: 'mahasiswa',
        identifier: s.nim,
        isActive: s.status === 'active',
        createdAt: s.users.created_at,
      })))
    }

    // Get lecturers if role is dosen or all
    if (!role || role === 'all' || role === 'dosen') {
      const lecturers = await prisma.lecturers.findMany({
        where: {
          prodi_id: kode,
          ...(search && {
            OR: [
              { nip: { contains: search, mode: 'insensitive' } },
              { users: { name: { contains: search, mode: 'insensitive' } } }
            ]
          })
        },
        include: {
          users: {
            select: {
              id: true,
              username: true,
              name: true,
              is_active: true,
              created_at: true,
            }
          }
        },
        take: 100
      })

      const filteredLecturers = lecturers.filter(l => {
        if (status === 'active') return l.users.is_active
        if (status === 'inactive') return !l.users.is_active
        return true
      })

      accounts.push(...filteredLecturers.map(l => ({
        userId: l.users.id,
        username: l.users.username,
        name: l.users.name,
        role: 'dosen',
        identifier: l.nip,
        isActive: l.users.is_active,
        createdAt: l.users.created_at,
      })))
    }

    // Get staff if role is staff or all
    if (!role || role === 'all' || role === 'staff') {
      const staff = await prisma.staff.findMany({
        where: {
          prodi_id: kode,
          ...(search && {
            OR: [
              { nip: { contains: search, mode: 'insensitive' } },
              { users: { name: { contains: search, mode: 'insensitive' } } }
            ]
          })
        },
        include: {
          users: {
            select: {
              id: true,
              username: true,
              name: true,
              is_active: true,
              created_at: true,
            }
          }
        },
        take: 100
      })

      const filteredStaff = staff.filter(s => {
        if (status === 'active') return s.users.is_active
        if (status === 'inactive') return !s.users.is_active
        return true
      })

      accounts.push(...filteredStaff.map(s => ({
        userId: s.users.id,
        username: s.users.username,
        name: s.users.name,
        role: 'staff',
        identifier: s.nip,
        isActive: s.users.is_active,
        createdAt: s.users.created_at,
      })))
    }

    return NextResponse.json({
      success: true,
      data: accounts,
      total: accounts.length
    })
  } catch (error) {
    console.error('Error fetching prodi accounts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Bulk actions on accounts
export async function POST(
  req: NextRequest,
  { params }: { params: { kode: string } }
) {
  try {
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { kode } = params
    const body = await req.json()
    const { action, userIds, newPassword } = body

    if (!action || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: action and userIds are required' },
        { status: 400 }
      )
    }

    let result: any = {}

    switch (action) {
      case 'reset_password':
        if (!newPassword) {
          return NextResponse.json(
            { error: 'New password is required' },
            { status: 400 }
          )
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const resetResult = await prisma.users.updateMany({
          where: { id: { in: userIds } },
          data: {
            password: hashedPassword,
            updated_at: new Date()
          }
        })
        result = { updated: resetResult.count, message: 'Passwords reset successfully' }
        break

      case 'deactivate':
        const deactivateResult = await prisma.users.updateMany({
          where: { id: { in: userIds } },
          data: {
            is_active: false,
            updated_at: new Date()
          }
        })
        result = { updated: deactivateResult.count, message: 'Accounts deactivated successfully' }
        break

      case 'activate':
        const activateResult = await prisma.users.updateMany({
          where: { id: { in: userIds } },
          data: {
            is_active: true,
            updated_at: new Date()
          }
        })
        result = { updated: activateResult.count, message: 'Accounts activated successfully' }
        break

      case 'delete':
        // Delete associated records first
        await Promise.all([
          prisma.students.deleteMany({ where: { user_id: { in: userIds } } }),
          prisma.lecturers.deleteMany({ where: { user_id: { in: userIds } } }),
          prisma.staff.deleteMany({ where: { user_id: { in: userIds } } }),
        ])

        // Then delete users
        const deleteResult = await prisma.users.deleteMany({
          where: { id: { in: userIds } }
        })
        result = { deleted: deleteResult.count, message: 'Accounts deleted successfully' }
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      ...result
    })
  } catch (error) {
    console.error('Error performing bulk action:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
