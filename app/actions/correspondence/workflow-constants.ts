// Workflow constants (no "use server" - this file only exports constants)

// Workflow stages
export const WORKFLOW_STAGES = {
  INITIAL_REVIEW: 'initial_review',
  WD1_APPROVAL: 'wd1_approval',
  COMPLETED: 'completed',
  REJECTED: 'rejected'
} as const

// Workflow actions
export const WORKFLOW_ACTIONS = {
  SUBMITTED: 'submitted',
  REVIEWED: 'reviewed',
  FORWARDED: 'forwarded',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
} as const

// Role mappings for letter types
export const LETTER_TYPE_ROLES: Record<string, { initialRole: string; approvalRole: string }> = {
  'aktif': { initialRole: 'admin_umum', approvalRole: 'wd1' },
  'kkp': { initialRole: 'staff_tu', approvalRole: 'wd1' },
  'ujian': { initialRole: 'staff_tu', approvalRole: 'wd1' },
  'cuti': { initialRole: 'staff_tu', approvalRole: 'wd1' },
}
