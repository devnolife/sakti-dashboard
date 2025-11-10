import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { CorrespondenceStaffDashboard } from "@/components/correspondence/correspondence-staff-dashboard"
import { SkeletonCorrespondenceDashboard } from "@/components/correspondence/skeleton-correspondence-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Hash, Database, ArrowRight } from "lucide-react"

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

      {/* Quick Access Menu */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/staff_tu/correspondence/ketentuan">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20 hover:border-primary/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                Buat Ketentuan Surat
              </CardTitle>
              <CardDescription>
                Gabungkan jenis, tujuan, dan masalah surat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="gap-2">
                Buka Halaman
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/staff_tu/correspondence/master-data">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20 hover:border-primary/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Data Master
              </CardTitle>
              <CardDescription>
                Lihat referensi jenis, masalah, dan tujuan surat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="gap-2">
                Buka Halaman
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Suspense fallback={<SkeletonCorrespondenceDashboard />}>
        <CorrespondenceStaffDashboard />
      </Suspense>
    </div>
  )
}

