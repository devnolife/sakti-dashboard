import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth-middleware'

// GET /api/dosen/kkp - Get KKP applications under supervision
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (token.role !== 'dosen') {
      return NextResponse.json({ error: 'Forbidden - Dosen access only' }, { status: 403 })
    }

    // Get lecturer profile
    const lecturer = await prisma.lecturers.findFirst({
      where: {
        users: {
          id: token.sub
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const whereClause: any = {
      supervisor_id: lecturer.id
    }

    if (status) {
      whereClause.status = status
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { students: { nim: { contains: search, mode: 'insensitive' } } },
        { students: { users: { name: { contains: search, mode: 'insensitive' } } } }
      ]
    }

    const kkpApplications = await prisma.kkp_applications.findMany({
      where: whereClause,
      include: {
        students: {
          include: {
            users: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        },
        companies: true,
        kkpLocations: true,
        kkpRequirements: {
          orderBy: { created_at: 'desc' }
        }
      },
      orderBy: [
        { status: 'asc' },
        { created_at: 'desc' }
      ]
    })

    const formattedApplications = kkpApplications.map(kkp => {
      // Calculate progress based on requirements
      const totalRequirements = kkp.kkpRequirements.length
      const completedRequirements = kkp.kkpRequirements.filter(
        req => req.status === 'approved'
      ).length
      const progress = totalRequirements > 0
        ? Math.round((completedRequirements / totalRequirements) * 100)
        : 0

      return {
        id: kkp.id,
        student: {
          id: kkp.students.id,
          nim: kkp.students.nim,
          name: kkp.students.users.name,
          avatar: kkp.students.users.avatar,
          major: kkp.students.major,
          semester: kkp.students.semester
        },
        title: kkp.title,
        company: kkp.companies ? {
          id: kkp.companies.id,
          name: kkp.companies.name,
          address: kkp.companies.address,
          contactPerson: kkp.companies.contactPerson,
          phone: kkp.companies.phone
        } : null,
        location: kkp.kkpLocations && kkp.kkpLocations.length > 0 ? {
          id: kkp.kkpLocations[0].id,
          name: kkp.kkpLocations[0].locationName,
          address: kkp.kkpLocations[0].address,
          city: kkp.kkpLocations[0].city
        } : null,
        status: kkp.status,
        start_date: kkp.startDate,
        end_date: kkp.endDate,
        progress,
        totalRequirements,
        completedRequirements,
        pendingRequirements: totalRequirements - completedRequirements,
        lastActivity: kkp.updatedAt,
        created_at: kkp.createdAt,
        updated_at: kkp.updatedAt
      }
    })

    // Group by status for summary
    const summary = {
      total: formattedApplications.length,
      pending: formattedApplications.filter(k => k.status === 'pending').length,
      approved: formattedApplications.filter(k => k.status === 'approved').length,
      in_progress: formattedApplications.filter(k => k.status === 'in_progress').length,
      completed: formattedApplications.filter(k => k.status === 'completed').length,
      rejected: formattedApplications.filter(k => k.status === 'rejected').length,
    }

    return NextResponse.json({
      data: formattedApplications,
      summary,
      filters: {
        status: status || 'all',
        search: search || null
      }
    })
  } catch (error) {
    console.error('Error fetching dosen KKP:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
