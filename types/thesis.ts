export interface ThesisTitle {
  id: string
  title: string
  author: {
    id: string
    name: string
    nim: string
    department: string
    avatarUrl: string
  }
  abstract: string
  keywords: string[]
  submissionDate: string
  status: "pending" | "approved" | "rejected" | "archived"
  supervisor?: {
    id: string
    name: string
    department: string
    avatarUrl: string
  }
  department: string
  year: number
  similarityScore?: number
  digitalCopy?: boolean
  documentUrl?: string
  externalLink?: string
  similarTheses?: Array<{
    id: string
    title: string
    author: string
    year: number
    similarityPercentage: number
  }>
  reviewHistory?: Array<{
    id: string
    date: string
    reviewer: string
    action: string
    comments?: string
  }>
  archiveInfo?: {
    date: string
    location: string
    physicalId?: string
    digitalId?: string
    notes?: string
  }
}

