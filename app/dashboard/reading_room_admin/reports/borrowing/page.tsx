import type { Metadata } from "next"
import BorrowingReports from "@/components/reading-room/borrowing-reports"

export const metadata: Metadata = {
  title: "Laporan Peminjaman | Ruang Baca",
  description: "Laporan dan analisis peminjaman buku di Ruang Baca",
}

export default function BorrowingReportsPage() {
  return <BorrowingReports />
}

