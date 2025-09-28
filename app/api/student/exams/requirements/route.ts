import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const examType = searchParams.get('examType') as 'proposal' | 'result' | 'closing'
    const studentId = searchParams.get('studentId')

    if (!examType || !studentId) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

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
