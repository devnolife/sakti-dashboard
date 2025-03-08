import { Suspense } from "react"
import { LabAssistantsManagement } from "@/components/laboratory/admin/assistants/lab-assistants-management"
import { LabAssistantsPageSkeleton } from "@/components/laboratory/admin/assistants/lab-assistants-page-skeleton"

export default function LabAssistantsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Laboratory Assistants Management</h1>
      <Suspense fallback={<LabAssistantsPageSkeleton />}>
        <LabAssistantsManagement />
      </Suspense>
    </div>
  )
}

