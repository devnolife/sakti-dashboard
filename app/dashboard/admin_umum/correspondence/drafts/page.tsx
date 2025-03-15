import { Suspense } from "react"
import { CorrespondenceDraftsManagement } from "@/components/admin-umum/correspondence-drafts-management"
import { CorrespondenceDraftsPageSkeleton } from "@/components/admin-umum/correspondence-drafts-page-skeleton"

export default function CorrespondenceDraftsPage() {
  return (
    <Suspense fallback={<CorrespondenceDraftsPageSkeleton />}>
      <CorrespondenceDraftsManagement />
    </Suspense>
  )
}

