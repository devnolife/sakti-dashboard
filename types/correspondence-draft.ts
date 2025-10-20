export type DraftStatus = "draft" | "review" | "approved" | "rejected" | "finalized"

export interface CorrespondenceDraft {
  id: string
  title: string
  type: string
  content: string
  created_at: string
  updated_at: string
  createdBy: string
  status: DraftStatus
  reviewedBy?: string
  reviewedAt?: string
  comments?: string
  recipients?: string[]
  attachments?: {
    id: string
    name: string
    url: string
    size: number
    type: string
  }[]
  metadata?: Record<string, any>
  templateId?: string
  version: number
  previousVersions?: string[]
}

export interface DraftTemplate {
  id: string
  name: string
  description: string
  content: string
  category: string
  tags: string[]
  created_at: string
  updated_at: string
  createdBy: string
  isDefault: boolean
  placeholders: string[]
}

