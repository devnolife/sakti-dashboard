"use server"

import { LetterRequest } from "@/types/correspondence"
import { prisma } from "@/lib/prisma"

// Helper function to transform database record to LetterRequest type
function transformLetterRequest(req: any): LetterRequest {
  return {
    id: req.id,
    type: req.type,
    title: req.title,
    purpose: req.purpose,
    description: req.description,
    status: req.status as any,
    requestDate: req.requestDate.toISOString(),
    approvedDate: req.approvedDate?.toISOString(),
    completedDate: req.completedDate?.toISOString(),
    student_id: req.studentId,
    studentName: req.student.user.name,
    studentNIM: req.student.nim,
    studentMajor: req.student.major || 'Unknown',
    approvalRole: req.approvalRole as any,
    approvedBy: req.approvedBy || undefined,
    rejectedReason: req.rejectedReason || undefined,
    additionalInfo: req.additionalInfo as any,
    attachments: req.attachments?.map((att: any) => ({
      id: att.id,
      name: att.name,
      uploadDate: att.uploadDate.toISOString(),
      url: att.url
    })) || []
  }
}

// Get letter requests that need approval by a specific role
export async function getLetterRequestsForApproval(role: string): Promise<LetterRequest[]> {
  const requests = await prisma.letterRequest.findMany({
    where: {
      approvalRole: role as any,
      status: {
        in: ['submitted', 'in_review']
      }
    },
    include: {
      student: {
        include: {
          user: true
        }
      },
      attachments: true
    },
    orderBy: {
      requestDate: 'desc'
    }
  })

  return requests.map(transformLetterRequest)
}

// Get letter requests submitted by a specific student
export async function getStudentLetterRequests(studentId: string): Promise<LetterRequest[]> {
  const requests = await prisma.letterRequest.findMany({
    where: {
      student_id: studentId
    },
    include: {
      student: {
        include: {
          user: true
        }
      },
      attachments: true
    },
    orderBy: {
      requestDate: 'desc'
    }
  })

  return requests.map(transformLetterRequest)
}

// Get a specific letter request by its ID
export async function getLetterRequestById(requestId: string): Promise<LetterRequest | null> {
  const request = await prisma.letterRequest.findUnique({
    where: { id: requestId },
    include: {
      student: {
        include: {
          user: true
        }
      },
      attachments: true
    }
  })

  if (!request) return null

  return transformLetterRequest(request)
}
