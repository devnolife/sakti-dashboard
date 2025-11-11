import { Suspense } from "react"
import type { Metadata } from "next"
import { AdminUmumCorrespondenceDashboard } from "@/components/admin_umum/correspondence-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Manajemen Surat | Admin Umum",
  description: "Dashboard manajemen surat untuk Admin Umum",
}

export default function AdminUmumCorrespondencePage() {
  return (
    <div className="pt-4 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
            Review Permohonan Surat
          </h2>
          <p className="text-muted-foreground">Tinjau dan teruskan permohonan surat ke WD1</p>
        </div>
      </div>

      <Suspense fallback={<Skeleton className="h-96" />}>
        <AdminUmumCorrespondenceDashboard />
      </Suspense>
    </div>
  )
}
