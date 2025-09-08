import RekomendasiJudul from "@/components/dosen/rekomendasi-judul"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rekomendasi Judul | Dosen Dashboard",
  description: "Kelola rekomendasi judul penelitian untuk mahasiswa",
}

export default function RekomendasiJudulPage() {
  return <RekomendasiJudul />
}