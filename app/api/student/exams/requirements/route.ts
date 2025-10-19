import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { authMiddleware } from '@/lib/auth-middleware'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const examType = searchParams.get('examType') as 'proposal' | 'result' | 'closing'

    if (!examType) {
      return NextResponse.json(
        { success: false, error: 'Missing exam type parameter' },
        { status: 400 }
      )
    }

    // Get studentId from authenticated user
    let userId: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) userId = token.sub
    if (!userId) { try { userId = await getServerActionUserId() } catch {} }
    if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const student = await prisma.student.findUnique({
      where: { userId },
      select: { id: true }
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const studentId = student.id
    console.log(`📋 Fetching ${examType} requirements for student: ${studentId}`)

    // Get requirements for the exam type
    const requirements = await prisma.examRequirement.findMany({
      where: {
        examType: examType
      },
      include: {
        studentRequirements: {
          where: {
            studentId: studentId
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
