"use client"

import { useState, useEffect } from "react"
import { KkpRequirementsView } from "../_components/kkp-requirements-view"

interface Requirement {
  id: string
  title: string
  description: string
  type: string
  status: "completed" | "pending" | "rejected"
  uploadedAt?: Date
  notes?: string
}

export default function PersyaratanKkpPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRequirements()
  }, [])

  const fetchRequirements = async () => {
    try {
      const response = await fetch("/api/student/kkp/status")
      const data = await response.json()
      
      if (data.requirements) {
        setRequirements(data.requirements)
      }
    } catch (error) {
      console.error("Error fetching requirements:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = (requirementId: string) => {
    console.log("Upload requirement:", requirementId)
    // TODO: Implement upload functionality
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <KkpRequirementsView requirements={requirements} onUpload={handleUpload} />
}
