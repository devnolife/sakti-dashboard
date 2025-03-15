import { Suspense } from "react"
import { ReadingRoomDashboard } from "@/components/reading-room/dashboard"
import DashboardSkeleton from "@/components/reading-room/dashboard-skeleton"

export const metadata = {
  title: "Dashboard Ruang Baca | Sistem Akademik",
  description: "Kelola buku, peminjaman, dan skripsi dari dashboard admin ruang baca",
}

export default function ReadingRoomAdminPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <ReadingRoomDashboard />
    </Suspense>
  )
}

