"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Calendar, TrendingUp, CheckCircle, Mail, GraduationCapIcon, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface StaffTUDashboardProps {
  activeSection: string
}

export default function StaffTUDashboard({ activeSection }: StaffTUDashboardProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Dashboard Admin Prodi
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">Kelola data mahasiswa, dokumen, dan jadwal akademik.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Data Mahasiswa</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Users className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,245</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              <span className="text-xs text-green-500">+5% dari semester lalu</span>
            </div>
            <Link href="/dashboard/staff_tu/student-records">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Lihat Data</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Dokumen Diproses</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
              <FileText className="w-4 h-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87</div>
            <div className="flex items-center mt-1">
              <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
              <span className="text-xs text-green-500">32 selesai minggu ini</span>
            </div>
            <Link href="/dashboard/staff_tu/document-management">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Kelola Dokumen</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Jadwal Akademik</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
              <Calendar className="w-4 h-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Acara dalam 30 hari ke depan</span>
            </div>
            <Link href="/dashboard/staff_tu/schedule-management">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Lihat Jadwal</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Layanan Surat</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mint/10">
              <Mail className="w-4 h-4 text-mint" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Permintaan surat baru</span>
            </div>
            <Link href="/dashboard/staff_tu/correspondence">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Kelola Surat</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Manajemen Ujian</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <GraduationCapIcon className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">10</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Ujian yang perlu dikelola</span>
            </div>
            <Link href="/dashboard/staff_tu/exams">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Kelola Ujian</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Manajemen KKP</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
              <Building className="w-4 h-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Aplikasi KKP yang perlu ditinjau</span>
            </div>
            <Link href="/dashboard/staff_tu/kkp">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Kelola KKP</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tugas Mendesak</CardTitle>
          <CardDescription>Tugas yang memerlukan perhatian segera</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-xl">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 shrink-0">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Verifikasi Dokumen Pendaftaran</p>
                <p className="text-xs text-muted-foreground">42 dokumen pendaftaran memerlukan verifikasi</p>
                <div className="mt-1">
                  <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Prioritas Tinggi</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-xl">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 shrink-0">
                <Calendar className="w-5 h-5 text-amber-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Persiapan Jadwal Ujian</p>
                <p className="text-xs text-muted-foreground">
                  Jadwal ujian tengah semester perlu diselesaikan dalam 3 hari
                </p>
                <div className="mt-1">
                  <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">Tenggat Dekat</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-xl">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 shrink-0">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Pembaruan Data Mahasiswa</p>
                <p className="text-xs text-muted-foreground">Data 78 mahasiswa perlu diperbarui sebelum akhir bulan</p>
                <div className="mt-1">
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Dalam Proses</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

