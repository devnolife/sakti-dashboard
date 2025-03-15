import { Suspense } from "react"
import type { Metadata } from "next"
import { CorrespondenceStaffDashboard } from "@/components/correspondence/correspondence-staff-dashboard"
import { SkeletonCorrespondenceDashboard } from "@/components/correspondence/skeleton-correspondence-dashboard"

export const metadata: Metadata = {
  title: "Manajemen Layanan Surat | Admin Prodi",
  description: "Sistem manajemen layanan surat untuk Administrasi Program Studi",
}

export default function StaffCorrespondencePage() {
  return (
    <div className="pt-4 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
            Manajemen Layanan Surat
          </h2>
          <p className="text-muted-foreground">Kelola semua permohonan surat dari mahasiswa</p>
        </div>
      </div>
      <Suspense fallback={<SkeletonCorrespondenceDashboard />}>
        <CorrespondenceStaffDashboard />
      </Suspense>
    </div>
  )
}

