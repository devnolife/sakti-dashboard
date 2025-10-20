export type KkpLocationStatus = "pending" | "approved" | "rejected"

export interface KkpLocationRequest {
  id: string
  companyName: string
  companyAddress: string
  companyCity: string
  companyProvince?: string
  companyPostalCode?: string
  companyWebsite?: string
  companyIndustry: string
  companyDescription?: string
  contactPerson: string
  contactPosition?: string
  contactEmail: string
  contactPhone: string
  proposedBy: {
    id: string
    name: string
    nim: string
    major: string
    email: string
  }
  submission_date: Date
  status: KkpLocationStatus
  reviewedBy?: string
  reviewDate?: Date
  feedback?: string
  availablePositions?: string[]
  requiredSkills?: string[]
  documents?: {
    id: string
    name: string
    url: string
    uploadDate: Date
  }[]
}

