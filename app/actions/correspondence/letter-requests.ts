"use server"

import { LetterRequest } from "@/types/correspondence"
import { prisma } from "@/lib/prisma"
import { assignLetterRequest, forwardToWD1, approveByWD1, rejectLetterRequest, returnForRevision } from "./workflow"

// Helper function to transform database record to LetterRequest type
function transformLetterRequest(req: any): LetterRequest {
  return {
    id: req.id,
    type: req.type,
    title: req.title,
    purpose: req.purpose,
    description: req.description,
    status: req.status as any,
    requestDate: req.request_date.toISOString(),
    approvedDate: req.approved_date?.toISOString(),
    completedDate: req.completed_date?.toISOString(),
    reviewDate: req.review_date?.toISOString() || '',
    rejectedDate: req.rejected_date?.toISOString() || '',
    student_id: req.student_id,
    studentName: req.students?.users?.name || 'Unknown',
    studentNIM: req.students?.nim || 'Unknown',
    studentMajor: req.students?.prodi?.nama || req.students?.prodi?.name || 'Unknown',
    studentFaculty: req.students?.prodi?.fakultas || 'Fakultas Teknik',
    studentSemester: req.students?.semester?.toString() || '1',
    academicYear: req.students?.academic_year || '2024/2025',
    approvalRole: req.approval_role as any,
    approvedBy: req.approved_by || undefined,
    rejectedReason: req.rejected_reason || undefined,
    letterUrl: req.letter_url || undefined,
    additionalInfo: req.additional_info as any,
    attachments: req.letter_attachments?.map((att: any) => ({
      id: att.id,
      name: att.name,
      uploadDate: att.upload_date ? new Date(att.upload_date).toISOString() : new Date().toISOString(),
      url: att.url
    })) || []
  }
}

// Get letter requests that need approval by a specific role
export async function getLetterRequestsForApproval(role: string): Promise<LetterRequest[]> {
  const requests = await prisma.letter_requests.findMany({
    where: {
      approval_role: role as any,
      status: {
        in: ['submitted', 'in_review']
      }
    },
    include: {
      students: {
        include: {
          users: true,
          prodi: true
        }
      },
      letter_attachments: true
    },
    orderBy: {
      request_date: 'desc'
    }
  })

  return requests.map(transformLetterRequest)
}

// Get letter requests by workflow stage (for WD1 approval)
export async function getLetterRequestsByWorkflowStage(workflowStage: string): Promise<LetterRequest[]> {
  const requests = await prisma.letter_requests.findMany({
    where: {
      workflow_stage: workflowStage,
      status: {
        in: ['submitted', 'in_review']
      }
    },
    include: {
      students: {
        include: {
          users: true,
          prodi: true
        }
      },
      letter_attachments: true
    },
    orderBy: {
      request_date: 'desc'
    }
  })

  return requests.map(transformLetterRequest)
}

// Get letter requests submitted by a specific student
export async function getStudentLetterRequests(studentId: string): Promise<LetterRequest[]> {
  const requests = await prisma.letter_requests.findMany({
    where: {
      student_id: studentId
    },
    include: {
      students: {
        include: {
          users: true,
          prodi: true
        }
      },
      letter_attachments: true
    },
    orderBy: {
      request_date: 'desc'
    }
  })

  return requests.map(transformLetterRequest)
}

// Get letter requests for staff_tu filtered by prodi
export async function getLetterRequestsByProdi(prodiId: string): Promise<LetterRequest[]> {
  const requests = await prisma.letter_requests.findMany({
    where: {
      students: {
        prodi_id: prodiId
      }
    },
    include: {
      students: {
        include: {
          users: true,
          prodi: true
        }
      },
      letter_attachments: true
    },
    orderBy: {
      request_date: 'desc'
    }
  })

  return requests.map(transformLetterRequest)
}

// Get all letter requests for admin_umum (administrasi umum)
export async function getAllLetterRequests(): Promise<LetterRequest[]> {
  // Get from letter_requests table (old format)
  const oldRequests = await prisma.letter_requests.findMany({
    include: {
      students: {
        include: {
          users: true,
          prodi: true
        }
      },
      letter_attachments: true
    },
    orderBy: {
      request_date: 'desc'
    }
  })

  // Get from correspondence_requests table (new format with form_data)
  const newRequests = await prisma.correspondence_requests.findMany({
    include: {
      students: {
        include: {
          users: true,
          prodi: true
        }
      },
      letter_types: true,
      approver: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  // Transform old requests
  const transformedOldRequests = oldRequests.map(transformLetterRequest)

  // Transform new correspondence requests
  const transformedNewRequests = newRequests.map((req: any) => ({
    id: req.id,
    type: req.letter_types?.title || 'Unknown',
    title: req.letter_types?.title || 'Unknown',
    purpose: 'Permohonan Surat',
    description: req.rejection_note || 'Pengajuan surat mahasiswa',
    status: req.status === 'pending' ? 'submitted' : req.status === 'approved' ? 'approved' : req.status === 'rejected' ? 'rejected' : 'in_review',
    requestDate: req.created_at.toISOString(),
    approvedDate: req.approved_at?.toISOString(),
    completedDate: req.approved_at?.toISOString(),
    reviewDate: '',
    rejectedDate: req.status === 'rejected' ? req.updated_at.toISOString() : '',
    student_id: req.student_id,
    studentName: req.students?.users?.name || 'Unknown',
    studentNIM: req.students?.nim || 'Unknown',
    studentMajor: req.students?.prodi?.nama || req.students?.prodi?.name || 'Unknown',
    studentFaculty: req.students?.prodi?.fakultas || 'Fakultas Teknik',
    studentSemester: req.students?.semester?.toString() || '1',
    academicYear: req.students?.academic_year || '2024/2025',
    approvalRole: (req.letter_types?.approval_role || 'staff_tu') as any,
    approvedBy: req.approver?.name || undefined,
    rejectedReason: req.rejection_note || undefined,
    letterUrl: undefined,
    additionalInfo: req.form_data as any, // Map form_data to additionalInfo
    attachments: req.attachments ? (Array.isArray(req.attachments) ? req.attachments : []) : []
  }))

  // Combine and sort by date
  const allRequests = [...transformedOldRequests, ...transformedNewRequests]
  allRequests.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime())

  return allRequests
}

// Get a specific letter request by its ID
export async function getLetterRequestById(requestId: string): Promise<LetterRequest | null> {
  const request = await prisma.letter_requests.findUnique({
    where: { id: requestId },
    include: {
      students: {
        include: {
          users: true,
          prodi: true
        }
      },
      letter_attachments: true
    }
  })

  if (!request) return null

  return transformLetterRequest(request)
}

// Forward letter request to WD1 (from Admin Umum)
export async function forwardLetterToWD1(requestId: string, userId: string, notes?: string) {
  return await forwardToWD1(requestId, userId, notes)
}

// Approve letter request (by WD1)
export async function approveLetterRequest(requestId: string, userId: string, notes?: string) {
  return await approveByWD1(requestId, userId, notes)
}

// Reject letter request
export async function rejectRequest(requestId: string, userId: string, reason: string) {
  return await rejectLetterRequest(requestId, userId, reason)
}

// Return letter for revision
export async function returnLetterForRevision(requestId: string, userId: string, notes: string) {
  return await returnForRevision(requestId, userId, notes)
}

// Create new letter request with auto-assignment
export async function createLetterRequest(data: {
  studentId: string
  type: string
  title: string
  purpose: string
  description: string
  additionalInfo?: any
}) {
  const request = await prisma.letter_requests.create({
    data: {
      id: require('nanoid').nanoid(),
      student_id: data.studentId,
      type: data.type,
      title: data.title,
      purpose: data.purpose,
      description: data.description,
      additional_info: data.additionalInfo,
      approval_role: 'staff_tu', // Default, will be updated by workflow
      status: 'submitted',
      request_date: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  // Auto-assign to appropriate role based on letter type
  await assignLetterRequest(request.id, data.type)

  return request
}
