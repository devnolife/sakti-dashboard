import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { authMiddleware } from '@/lib/auth-middleware'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const exam_type = searchParams.get('examType') as 'proposal' | 'result' | 'closing'

    if (!examType) {
      return NextResponse.json(
        { success: false, error: 'Missing exam type parameter' },
        { status: 400 }
      )
    }

    // Get student_id from authenticated user
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) user_id = token.sub
    if (!userId) { try { user_id = await getServerActionUserId() } catch {} }
    if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const student = await prisma.students.findUnique({
      where: { user_id },
      select: { id: true }
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
    const requirements = await prisma.examRequirement.findMany({
      where: {
        exam_type: examType
      },
      include: {
        studentRequirements: {
          where: {
            student_id: studentId
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    // Transform data to include completion status
    const transformedRequirements = requirements.map(requirement => {
      const studentRequirement = requirement.studentRequirements[0]
      return {
        id: requirement.id,
        title: requirement.title,
        description: requirement.description,
        completed: studentRequirement?.completed || false,
        fileUrl: studentRequirement?.fileUrl,
        fileName: studentRequirement?.fileName,
        fileSize: studentRequirement?.fileSize,
        uploadedAt: studentRequirement?.uploadedAt?.toISOString(),
        verifiedAt: studentRequirement?.verifiedAt?.toISOString(),
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
