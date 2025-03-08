import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, ClipboardCheck, Calendar, GraduationCap, Briefcase, FileCheck, Clock } from "lucide-react"

export function LecturerMetricsGrid() {
  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
      {/* Academic Guidance */}
      <MetricCard
        title="Bimbingan Akademik"
        value="15"
        description="Mahasiswa aktif"
        icon={<Users className="h-5 w-5" />}
        trend="+2 dari semester lalu"
        trendUp={true}
      />

      {/* Exam Guidance */}
      <MetricCard
        title="Bimbingan Ujian"
        value="8"
        description="Mahasiswa aktif"
        icon={<GraduationCap className="h-5 w-5" />}
        trend="+3 dari semester lalu"
        trendUp={true}
      />

      {/* KKP Guidance */}
      <MetricCard
        title="Bimbingan KKP"
        value="5"
        description="Kelompok aktif"
        icon={<Briefcase className="h-5 w-5" />}
        trend="-1 dari semester lalu"
        trendUp={false}
      />

      {/* KKP Plus Guidance */}
      <MetricCard
        title="KKP Plus"
        value="3"
        description="Mahasiswa aktif"
        icon={<FileCheck className="h-5 w-5" />}
        trend="Sama dengan semester lalu"
        trendUp={null}
      />

      {/* Courses */}
      <MetricCard
        title="Mata Kuliah"
        value="4"
        description="Semester ini"
        icon={<BookOpen className="h-5 w-5" />}
        trend="12 SKS total"
      />

      {/* Upcoming Schedules */}
      <MetricCard
        title="Jadwal"
        value="7"
        description="Minggu ini"
        icon={<Calendar className="h-5 w-5" />}
        trend="3 hari kedepan"
      />

      {/* Pending Reviews */}
      <MetricCard
        title="Review Tertunda"
        value="12"
        description="Dokumen & tugas"
        icon={<ClipboardCheck className="h-5 w-5" />}
        trend="5 prioritas tinggi"
        trendUp={false}
      />

      {/* Hours Logged */}
      <MetricCard
        title="Jam Mengajar"
        value="24"
        description="Minggu ini"
        icon={<Clock className="h-5 w-5" />}
        trend="96 jam bulan ini"
      />
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean | null
}

function MetricCard({ title, value, description, icon, trend, trendUp }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-primary/10 p-1.5 text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div
            className={`text-xs mt-2 ${
              trendUp === true ? "text-green-500" : trendUp === false ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

