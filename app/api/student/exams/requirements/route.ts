import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { authMiddleware } from '@/lib/auth-middleware'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const exam_type = searchParams.get('examType') as 'proposal' | 'result' | 'closing'

    if (!exam_type) {
      return NextResponse.json(
        { success: false, error: 'Missing exam type parameter' },
        { status: 400 }
      )
    }

    // Get student_id from authenticated user
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) user_id = token.userId
    if (!user_id) { try { user_id = await getServerActionUserId() } catch { } }
    if (!user_id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

    const student = await prisma.students.findUnique({
      where: { user_id },
      select: {
        id: true,
        prodi_id: true
      }
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const student_id = student.id
    console.log(`📋 Fetching ${exam_type} requirements for student: ${student_id}`)

    // Get requirements for the exam type
    // Show global requirements OR prodi-specific requirements
    const requirements = await prisma.exam_requirements.findMany({
      where: {
        exam_type: exam_type,
        OR: [
          { is_global: true },
          { prodi_id: student.prodi_id }
        ]
      },
      include: {
        exam_student_requirements: {
          where: {
            student_id: student_id
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    // Transform data to include completion status
    const transformedRequirements = requirements.map(requirement => {
      const studentRequirement = requirement.exam_student_requirements[0]
      return {
        id: requirement.id,
        title: requirement.title,
        description: requirement.description,
        required: requirement.required,
        is_global: requirement.is_global,
        prodi_id: requirement.prodi_id,
        completed: studentRequirement?.status === 'verified' || false,
        status: studentRequirement?.status || 'pending',
        file_url: studentRequirement?.file_url,
        file_name: studentRequirement?.file_name,
        uploaded_at: studentRequirement?.uploaded_at?.toISOString(),
        verified_at: studentRequirement?.verified_at?.toISOString(),
        notes: studentRequirement?.notes
      }
    })

    console.log(`✅ Found ${requirements.length} requirements, ${transformedRequirements.filter(r => r.completed).length} completed`)

    return NextResponse.json({
      success: true,
      data: transformedRequirements
    })

  } catch (error) {
    console.error('Error fetching requirements:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
