import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth-middleware'
import { getMahasiswaPaWithSync } from '@/lib/sync/dosen-sync'

// GET /api/dosen/students - Get mahasiswa bimbingan (PA students)
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
          id: token.userId
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    // Sync mahasiswa PA from GraphQL
    const authHeader = request.headers.get('authorization')
    const sessionToken = authHeader?.replace('Bearer ', '')
    if (sessionToken) {
      console.log('Syncing mahasiswa PA from GraphQL in students endpoint...')
      await getMahasiswaPaWithSync(lecturer.id, sessionToken)
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'pa', 'kkp', 'thesis', or 'all'
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    let students = []

    if (!type || type === 'pa' || type === 'all') {
      // Get PA (Pembimbing Akademik) students
      const whereCondition: any = {
        academic_advisor_id: lecturer.id
      }

      if (lecturer.prodi_id && lecturer.is_homebase) {
        whereCondition.prodi_id = lecturer.prodi_id
      }

      if (search) {
        whereCondition.OR = [
          { nim: { contains: search, mode: 'insensitive' as const } },
          { users: { name: { contains: search, mode: 'insensitive' as const } } }
        ]
      }

      const paStudents = await prisma.students.findMany({
        where: whereCondition,
        include: {
          users: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true
            }
          },
          prodi: {
            select: {
              kode: true,
              nama: true,
              jenjang: true
            }
          }
        },
        orderBy: { nim: 'asc' }
      })

      students.push(...paStudents.map(s => ({
        id: s.id,
        nim: s.nim,
        name: s.users?.name || '',
        avatar: s.users?.avatar,
        major: s.major,
        department: s.department,
        prodi: s.prodi ? {
          kode: s.prodi.kode,
          nama: s.prodi.nama,
          jenjang: s.prodi.jenjang
        } : null,
        semester: s.semester,
        academic_year: s.academic_year,
        gpa: s.gpa,
        status: s.status,
        type: 'pa',
        phone: s.phone,
        address: s.address
      })))
    }

    if (type === 'kkp' || type === 'all') {
      // Get KKP guidance students
      const kkpStudents = await prisma.kkp_applications.findMany({
        where: {
          supervisor_id: lecturer.id,
          status: {
            in: ['approved', 'in_progress']
          }
        },
        include: {
          students: {
            include: {
              users: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  avatar: true
                }
              }
            }
          },
          companies: true
        }
      })

      students.push(...kkpStudents.map(kkp => ({
        id: kkp.students.id,
        nim: kkp.students.nim,
        name: kkp.students.users.name,
        avatar: kkp.students.users.avatar,
        major: kkp.students.major,
        department: kkp.students.department,
        semester: kkp.students.semester,
        type: 'kkp',
        kkpTitle: kkp.title,
        kkpCompany: kkp.companies?.name,
        kkpStatus: kkp.status,
        kkpStartDate: kkp.start_date,
        kkpEndDate: kkp.end_date
      })))
    }

    if (type === 'thesis' || type === 'all') {
      // Get thesis guidance students
      const thesisStudents = await prisma.thesis_titles.findMany({
        where: {
          supervisor_id: lecturer.id,
          status: 'approved'
        },
        include: {
          students: {
            include: {
              users: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  avatar: true
                }
              }
            }
          }
        }
      })

      students.push(...thesisStudents.map(thesis => ({
        id: thesis.students.id,
        nim: thesis.students.nim,
        name: thesis.students.users.name,
        avatar: thesis.students.users.avatar,
        major: thesis.students.major,
        department: thesis.students.department,
        semester: thesis.students.semester,
        type: 'thesis',
        thesisTitle: thesis.title,
        thesisStatus: thesis.status,
        thesisSubmissionDate: thesis.submission_date
      })))
    }

    // Remove duplicates if type is 'all'
    if (type === 'all') {
      const uniqueStudents = Array.from(
        new Map(students.map(s => [s.nim, s])).values()
      )
      students = uniqueStudents
    }

    return NextResponse.json({
      data: students,
      total: students.length,
      type: type || 'pa'
    })
  } catch (error) {
    console.error('Error fetching dosen students:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
