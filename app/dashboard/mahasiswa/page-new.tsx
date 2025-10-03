'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "@/components/ui/stat-card"
import { ActivityCard } from "@/components/ui/activity-card"
import { AnnouncementCard } from "@/components/ui/announcement-card"
import { CourseCard } from "@/components/ui/course-card"
import {
  CalendarDays,
  GraduationCap,
  BookOpen,
  Clock,
  Bell,
  FileText,
  AlertCircle,
  CheckCircle2,
  Award,
} from "lucide-react"

export default function MahasiswaPage() {
  return (
    <div className="space-y-8 p-6">
      {/* Header dengan tema SINTEKMu */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-black tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
            Dashboard Mahasiswa
          </span>
        </h1>
        <p className="mt-2 text-gray-600 font-medium">Selamat datang kembali, Andi Pratama! 👋</p>
      </div>

      {/* Stats Section - Menggunakan StatCard component */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="IPK Terkini"
          value="3.75"
          subtitle="Semester 7"
          icon={GraduationCap}
          trend={{ value: "+0.15", label: "dari semester lalu", type: "increase" }}
          variant="red"
        />
        <StatCard
          title="SKS Semester Ini"
          value="21"
          subtitle="6 mata kuliah aktif"
          icon={BookOpen}
          variant="blue"
        />
        <StatCard
          title="Kehadiran"
          value="92%"
          subtitle="3 ketidakhadiran"
          icon={Clock}
          trend={{ value: "Baik", label: "tingkat kehadiran", type: "increase" }}
          variant="green"
        />
        <StatCard
          title="Tugas Mendatang"
          value="5"
          subtitle="2 deadline minggu ini"
          icon={CalendarDays}
          variant="amber"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Activities Section - Menggunakan ActivityCard */}
        <Card className="col-span-4 border-none shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Aktivitas Akademik</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                Lihat Semua
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <ActivityCard
              title="Ujian Tengah Semester"
              subtitle="15 Oktober 2023"
              icon={AlertCircle}
              badge={{ label: "Mendesak", variant: "urgent" }}
              variant="red"
            />
            <ActivityCard
              title="Tugas Algoritma"
              subtitle="10 Oktober 2023"
              icon={FileText}
              badge={{ label: "Segera", variant: "warning" }}
              variant="amber"
            />
            <ActivityCard
              title="Presentasi Kelompok"
              subtitle="12 Oktober 2023"
              icon={Bell}
              badge={{ label: "Mendatang", variant: "info" }}
              variant="blue"
            />
            <ActivityCard
              title="Praktikum Database"
              subtitle="14 Oktober 2023"
              icon={BookOpen}
              badge={{ label: "Terjadwal", variant: "info" }}
              variant="purple"
            />
          </CardContent>
        </Card>

        {/* Announcements Section - Menggunakan AnnouncementCard */}
        <Card className="col-span-3 border-none shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Pengumuman</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                Lihat Semua
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <AnnouncementCard
              title="Libur Nasional"
              description="17 Oktober 2023 - Semua kelas ditiadakan"
              date="5 Okt 2023"
              badge={{ label: "Penting", variant: "urgent" }}
            />
            <AnnouncementCard
              title="Seminar Karir"
              description="20 Oktober 2023 - Auditorium Utama"
              date="3 Okt 2023"
              badge={{ label: "Event", variant: "info" }}
            />
            <AnnouncementCard
              title="Pendaftaran KKP Dibuka"
              description="1 November 2023 - Daftar lebih awal"
              date="1 Okt 2023"
              badge={{ label: "Pendaftaran", variant: "success" }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Courses Section - Menggunakan CourseCard */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Mata Kuliah Semester Ini</CardTitle>
          <CardDescription>Mata kuliah yang Anda ambil semester ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="Algorithms & Data Structures"
              instructor="Dr. Budi Santoso"
              credits={3}
              grade="A-"
              attendance="13/14"
              variant="red"
              onViewDetail={() => console.log("View detail")}
            />
            <CourseCard
              title="Advanced Database"
              instructor="Dr. Siti Aminah"
              credits={3}
              grade="B+"
              attendance="12/14"
              variant="blue"
              onViewDetail={() => console.log("View detail")}
            />
            <CourseCard
              title="Web Programming"
              instructor="Prof. Joko Widodo"
              credits={3}
              grade="A"
              attendance="14/14"
              variant="green"
              onViewDetail={() => console.log("View detail")}
            />
            <CourseCard
              title="Computer Networks"
              instructor="Dr. Ahmad Dahlan"
              credits={3}
              grade="B"
              attendance="12/14"
              variant="amber"
              onViewDetail={() => console.log("View detail")}
            />
            <CourseCard
              title="Software Engineering"
              instructor="Dr. Maya Putri"
              credits={3}
              grade="A-"
              attendance="13/14"
              variant="purple"
              onViewDetail={() => console.log("View detail")}
            />
            <CourseCard
              title="Mobile App Development"
              instructor="Prof. Hadi Wijaya"
              credits={3}
              grade="B+"
              attendance="12/14"
              variant="cyan"
              onViewDetail={() => console.log("View detail")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Course Progress */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Kemajuan Mata Kuliah</CardTitle>
          <CardDescription>Kemajuan Anda dalam mata kuliah saat ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Algorithms & Data Structures", progress: 75, color: "red" },
              { name: "Advanced Database", progress: 60, color: "blue" },
              { name: "Web Programming", progress: 90, color: "green" },
              { name: "Computer Networks", progress: 65, color: "amber" },
              { name: "Software Engineering", progress: 80, color: "purple" },
              { name: "Mobile Application Development", progress: 70, color: "cyan" },
            ].map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">{course.name}</span>
                  <span className="text-sm font-bold text-gray-900">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
