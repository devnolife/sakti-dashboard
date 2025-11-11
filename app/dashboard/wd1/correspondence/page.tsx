import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { WD1CorrespondenceDashboard } from "@/components/wd1/correspondence-dashboard"

export const metadata = {
  title: "Persetujuan Surat | WD1",
  description: "Persetujuan surat oleh Wakil Dekan 1",
}

export default function WD1CorrespondencePage() {
  return (
    <div className="pt-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Persetujuan Permohonan Surat</h2>
        <p className="text-muted-foreground">
          Tinjau dan setujui permohonan surat yang diteruskan dari Admin Umum
        </p>
      </div>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <WD1CorrespondenceDashboard />
      </Suspense>
    </div>
  )
}
