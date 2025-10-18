import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const overrideSchema = z.object({
  module: z.enum(['kkp', 'exam', 'letter', 'payment']),
  itemId: z.string(),
  action: z.enum(['approve', 'reject']),
  reason: z.string().min(10),
})

// POST /api/admin/override
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Only admin can override
    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = overrideSchema.parse(body)

    let result: any

    // Handle different modules
    switch (validatedData.module) {
      case 'kkp':
        result = await prisma.kkpApplication.update({
          where: { id: validatedData.itemId },
          data: {
            status: validatedData.action === 'approve' ? 'approved' : 'rejected',
            notes: validatedData.reason
          }
        })
        break

      case 'exam':
        result = await prisma.examApplication.update({
          where: { id: validatedData.itemId },
          data: {
            status: validatedData.action === 'approve' ? 'scheduled' : 'cancelled',
          }
        })
        break

      case 'letter':
        result = await prisma.letterRequest.update({
          where: { id: validatedData.itemId },
          data: {
            status: validatedData.action === 'approve' ? 'approved' : 'rejected',
            rejectedReason: validatedData.action === 'reject' ? validatedData.reason : null,
            approvedBy: token.sub,
            approvedDate: new Date()
          }
        })
        break

      case 'payment':
        result = await prisma.payment.update({
          where: { id: validatedData.itemId },
          data: {
            status: validatedData.action === 'approve' ? 'completed' : 'failed',
            notes: validatedData.reason,
            paidDate: validatedData.action === 'approve' ? new Date() : null
          }
        })
        break
    }

    // Create audit log for override action
    await prisma.auditLog.create({
      data: {
        userId: token.sub!,
        action: 'ADMIN_OVERRIDE',
        resource: `${validatedData.module}_${validatedData.action.toUpperCase()}`,
        details: {
          module: validatedData.module,
          itemId: validatedData.itemId,
          action: validatedData.action,
          reason: validatedData.reason
        },
      }
    })

    return NextResponse.json({
      success: true,
      message: `Successfully ${validatedData.action}ed ${validatedData.module} application`,
      result
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error performing admin override:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// GET /api/admin/override/pending
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const module = searchParams.get('module')

    const [kkpApplications, examApplications, letterRequests, payments] = await Promise.all([
      !module || module === 'kkp' ? prisma.kkpApplication.findMany({
        where: { status: 'pending' },
        include: {
          student: {
            include: { user: true }
          },
          company: true
        },
        take: 20
      }) : [],
      !module || module === 'exam' ? prisma.examApplication.findMany({
        where: { status: 'pending' },
        include: {
          student: {
            include: { user: true }
          }
        },
        take: 20
      }) : [],
      !module || module === 'letter' ? prisma.letterRequest.findMany({
        where: { status: { in: ['submitted', 'in_review'] } },
        include: {
          student: {
            include: { user: true }
          }
        },
        take: 20
      }) : [],
      !module || module === 'payment' ? prisma.payment.findMany({
        where: { status: 'pending' },
        include: {
          student: {
            include: { user: true }
          }
        },
        take: 20
      }) : [],
    ])

    return NextResponse.json({
      kkp: kkpApplications,
      exam: examApplications,
      letter: letterRequests,
      payment: payments,
      total: kkpApplications.length + examApplications.length + letterRequests.length + payments.length
    })
  } catch (error) {
    console.error('Error fetching pending approvals:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
