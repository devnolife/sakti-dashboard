"use server"

import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"
import { WORKFLOW_STAGES, WORKFLOW_ACTIONS, LETTER_TYPE_ROLES } from "./workflow-constants"

/**
 * Get role assignment based on letter type
 */
export async function getRoleAssignment(letterType: string) {
  const typeKey = letterType.toLowerCase()
  return LETTER_TYPE_ROLES[typeKey] || { initialRole: 'staff_tu', approvalRole: 'wd1' }
}

/**
 * Assign letter request to initial role
 */
export async function assignLetterRequest(letterRequestId: string, letterType: string) {
  const { initialRole } = await getRoleAssignment(letterType)

  // Find user with the initial role
  const assignee = await prisma.users.findFirst({
    where: { role: initialRole as any }
  })

  if (!assignee) {
    throw new Error(`No user found with role: ${initialRole}`)
  }

  // Update letter request
  await prisma.letter_requests.update({
    where: { id: letterRequestId },
    data: {
      workflow_stage: WORKFLOW_STAGES.INITIAL_REVIEW,
      assigned_to: assignee.id
    }
  })

  // Log workflow history
  await prisma.workflow_history.create({
    data: {
      id: nanoid(),
      letter_request_id: letterRequestId,
      action: WORKFLOW_ACTIONS.SUBMITTED,
      actor_id: assignee.id,
      actor_role: initialRole,
      notes: `Automatically assigned to ${initialRole}`
    }
  })

  return { success: true, assignedTo: assignee }
}

/**
 * Forward letter request to WD1
 */
export async function forwardToWD1(
  letterRequestId: string,
  forwardedBy: string,
  notes?: string
) {
  // Find WD1 user
  const wd1User = await prisma.users.findFirst({
    where: { role: 'wd1' as any }
  })

  if (!wd1User) {
    throw new Error('No WD1 user found')
  }

  // Get current request
  const request = await prisma.letter_requests.findUnique({
    where: { id: letterRequestId }
  })

  if (!request) {
    throw new Error('Letter request not found')
  }

  // Validate: can only forward from initial_review
  if (request.workflow_stage !== WORKFLOW_STAGES.INITIAL_REVIEW) {
    throw new Error('Can only forward requests in initial_review stage')
  }

  // Update letter request
  await prisma.letter_requests.update({
    where: { id: letterRequestId },
    data: {
      workflow_stage: WORKFLOW_STAGES.WD1_APPROVAL,
      assigned_to: wd1User.id,
      forwarded_by: forwardedBy,
      forwarded_at: new Date(),
      status: 'in_review' as any
    }
  })

  // Log workflow history
  await prisma.workflow_history.create({
    data: {
      id: nanoid(),
      letter_request_id: letterRequestId,
      action: WORKFLOW_ACTIONS.FORWARDED,
      actor_id: forwardedBy,
      actor_role: request.approval_role,
      notes: notes || 'Forwarded to WD1 for approval'
    }
  })

  return { success: true, forwardedTo: wd1User }
}

/**
 * Approve letter request by WD1
 */
export async function approveByWD1(
  letterRequestId: string,
  approvedBy: string,
  notes?: string
) {
  // Get current request
  const request = await prisma.letter_requests.findUnique({
    where: { id: letterRequestId }
  })

  if (!request) {
    throw new Error('Letter request not found')
  }

  // Validate: can only approve from wd1_approval stage
  if (request.workflow_stage !== WORKFLOW_STAGES.WD1_APPROVAL) {
    throw new Error('Can only approve requests in wd1_approval stage')
  }

  // Update letter request
  await prisma.letter_requests.update({
    where: { id: letterRequestId },
    data: {
      workflow_stage: WORKFLOW_STAGES.COMPLETED,
      status: 'approved' as any,
      wd1_approved_by: approvedBy,
      wd1_approved_at: new Date(),
      wd1_notes: notes,
      approved_by: approvedBy,
      approved_date: new Date()
    }
  })

  // Log workflow history
  await prisma.workflow_history.create({
    data: {
      id: nanoid(),
      letter_request_id: letterRequestId,
      action: WORKFLOW_ACTIONS.APPROVED,
      actor_id: approvedBy,
      actor_role: 'wd1',
      notes: notes || 'Approved by WD1'
    }
  })

  // TODO: Generate letter number and PDF here

  return { success: true }
}

/**
 * Reject letter request
 */
export async function rejectLetterRequest(
  letterRequestId: string,
  rejectedBy: string,
  reason: string
) {
  // Get current request
  const request = await prisma.letter_requests.findUnique({
    where: { id: letterRequestId }
  })

  if (!request) {
    throw new Error('Letter request not found')
  }

  // Update letter request
  await prisma.letter_requests.update({
    where: { id: letterRequestId },
    data: {
      workflow_stage: WORKFLOW_STAGES.REJECTED,
      status: 'rejected' as any,
      rejected_reason: reason
    }
  })

  // Get actor role
  const actor = await prisma.users.findUnique({ where: { id: rejectedBy } })

  // Log workflow history
  await prisma.workflow_history.create({
    data: {
      id: nanoid(),
      letter_request_id: letterRequestId,
      action: WORKFLOW_ACTIONS.REJECTED,
      actor_id: rejectedBy,
      actor_role: actor?.role || 'unknown',
      notes: reason
    }
  })

  return { success: true }
}

/**
 * Get workflow history for a letter request
 */
export async function getWorkflowHistory(letterRequestId: string) {
  return await prisma.workflow_history.findMany({
    where: { letter_request_id: letterRequestId },
    orderBy: { created_at: 'asc' }
  })
}

/**
 * Get letter requests assigned to a user
 */
export async function getAssignedRequests(userId: string) {
  return await prisma.letter_requests.findMany({
    where: { assigned_to: userId },
    include: {
      students: {
        include: {
          users: true,
          prodi: true
        }
      }
    },
    orderBy: { request_date: 'desc' }
  })
}

/**
 * Return letter request to previous stage (for revisions)
 */
export async function returnForRevision(
  letterRequestId: string,
  returnedBy: string,
  notes: string
) {
  // Get current request
  const request = await prisma.letter_requests.findUnique({
    where: { id: letterRequestId }
  })

  if (!request) {
    throw new Error('Letter request not found')
  }

  // Determine previous stage
  let previousStage = WORKFLOW_STAGES.INITIAL_REVIEW
  if (request.workflow_stage === WORKFLOW_STAGES.WD1_APPROVAL) {
    previousStage = WORKFLOW_STAGES.INITIAL_REVIEW
  }

  // Find user with initial role to reassign
  const { initialRole } = await getRoleAssignment(request.type)
  const reassignTo = await prisma.users.findFirst({
    where: { role: initialRole as any }
  })

  // Update letter request
  await prisma.letter_requests.update({
    where: { id: letterRequestId },
    data: {
      workflow_stage: previousStage,
      assigned_to: reassignTo?.id,
      status: 'in_review' as any
    }
  })

  // Log workflow history
  await prisma.workflow_history.create({
    data: {
      id: nanoid(),
      letter_request_id: letterRequestId,
      action: 'returned_for_revision',
      actor_id: returnedBy,
      actor_role: 'wd1',
      notes: notes
    }
  })

  return { success: true, reassignedTo: reassignTo }
}
