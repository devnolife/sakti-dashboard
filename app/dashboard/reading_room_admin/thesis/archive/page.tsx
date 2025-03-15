import { Suspense } from "react"
import { ThesisArchiveManagement } from "@/components/reading-room/thesis/thesis-archive-management"
import { ThesisArchivePageSkeleton } from "@/components/reading-room/thesis/thesis-archive-page-skeleton"

export const metadata = {
  title: "Thesis Archive | Admin Ruang Baca",
  description: "Browse and manage archived thesis documents",
}

export default function ThesisArchivePage() {
  return (
    <Suspense fallback={<ThesisArchivePageSkeleton />}>
      <ThesisArchiveManagement />
    </Suspense>
  )
}

