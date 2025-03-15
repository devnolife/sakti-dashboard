import { Suspense } from "react"
import { ThesisTitlesManagement } from "@/components/reading-room/thesis/thesis-titles-management"
import { ThesisTitlesPageSkeleton } from "@/components/reading-room/thesis/thesis-titles-page-skeleton"

export const metadata = {
  title: "Thesis Titles Management | Reading Room Admin",
  description: "Manage and review thesis titles submitted by students",
}

export default function ThesisTitlesPage() {
  return (
    <Suspense fallback={<ThesisTitlesPageSkeleton />}>
      <ThesisTitlesManagement />
    </Suspense>
  )
}

