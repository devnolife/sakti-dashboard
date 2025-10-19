"use server"

import { LetterRequest } from "@/types/correspondence"
import { prisma } from "@/lib/prisma"

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

  return requests.map(req => ({
    id: req.id,
    type: req.type,
    title: req.title,
    purpose: req.purpose,
    description: req.description,
    status: req.status as any,
    requestDate: req.requestDate.toISOString(),
    approvedDate: req.approvedDate?.toISOString(),
    completedDate: req.completedDate?.toISOString(),
    studentId: req.studentId,
    studentName: req.student.user.name,
    studentNIM: req.student.nim,
    studentMajor: req.student.major || req.student.programStudi,
    approvalRole: req.approvalRole as any,
    approvedBy: req.approvedBy,
    rejectedReason: req.rejectedReason,
    additionalInfo: req.additionalInfo as any,
    attachments: req.attachments?.map(att => ({
      id: att.id,
      name: att.name,
      uploadDate: att.uploadDate.toISOString(),
      url: att.url
    }))
  }))
}

// Get letter requests submitted by a specific student
export async function getStudentLetterRequests(studentId: string): Promise<LetterRequest[]> {
  const requests = await prisma.letterRequest.findMany({
    where: {
      studentId: studentId
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

  return requests.map(req => ({
    id: req.id,
    type: req.type,
    title: req.title,
    purpose: req.purpose,
    description: req.description,
    status: req.status as any,
    requestDate: req.requestDate.toISOString(),
    approvedDate: req.approvedDate?.toISOString(),
    completedDate: req.completedDate?.toISOString(),
    studentId: req.studentId,
    studentName: req.student.user.name,
    studentNIM: req.student.nim,
    studentMajor: req.student.major || req.student.programStudi,
    approvalRole: req.approvalRole as any,
    approvedBy: req.approvedBy,
    rejectedReason: req.rejectedReason,
    additionalInfo: req.additionalInfo as any,
    attachments: req.attachments?.map(att => ({
      id: att.id,
      name: att.name,
      uploadDate: att.uploadDate.toISOString(),
      url: att.url
    }))
  }))
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

  return {
    id: request.id,
    type: request.type,
    title: request.title,
    purpose: request.purpose,
    description: request.description,
    status: request.status as any,
    requestDate: request.requestDate.toISOString(),
    approvedDate: request.approvedDate?.toISOString(),
    completedDate: request.completedDate?.toISOString(),
    studentId: request.studentId,
    studentName: request.student.user.name,
    studentNIM: request.student.nim,
    studentMajor: request.student.major || request.student.programStudi,
    approvalRole: request.approvalRole as any,
    approvedBy: request.approvedBy,
    rejectedReason: request.rejectedReason,
    additionalInfo: request.additionalInfo as any,
    attachments: request.attachments?.map(att => ({
      id: att.id,
      name: att.name,
      uploadDate: att.uploadDate.toISOString(),
      url: att.url
    }))
  }
} 
