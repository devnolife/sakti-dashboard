import { Suspense } from "react"
import { LabAssistantsManagement } from "@/components/laboratory/admin/assistants/lab-assistants-management"
import { LabAssistantsPageSkeleton } from "@/components/laboratory/admin/assistants/lab-assistants-page-skeleton"

export default function LabAssistantsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
          Pengelolaan Asisten Laboratorium
        </span>
      </h1>
      <Suspense fallback={<LabAssistantsPageSkeleton />}>
        <LabAssistantsManagement />
      </Suspense>
    </div>
  )
}

