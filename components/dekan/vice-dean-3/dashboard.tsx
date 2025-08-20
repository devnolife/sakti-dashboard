"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentStatisticsChart } from "./student-statistics-chart"
import { GpaDistributionChart } from "./gpa-distribution-chart"
import { BelowAverageGpaTable } from "./below-average-gpa-table"
import { DepartmentStudentRecap } from "./department-student-recap"
import { StudentPerformanceMetrics } from "./student-performance-metrics"
import { AcademicStatusOverview } from "./academic-status-overview"
import { OutstandingStudentsList } from "./outstanding-students-list"
import { Award, BarChart3, GraduationCap } from "lucide-react"

export function ViceDean3Dashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<string>("overview")

  const departments = [
    { id: "all", name: "Semua Program Studi" },
    { id: "watering", name: "Teknik Pengairan" },
    { id: "electrical", name: "Teknik Elektro" },
    { id: "architecture", name: "Arsitektur" },
    { id: "informatics", name: "Informatika" },
    { id: "urban", name: "Perencanaan Wilayah Kota" },
  ]

  return (
    <div className="px-1 py-2 space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
            Wakil Dekan 3 - Kemahasiswaan
          </h2>
          <p className="text-muted-foreground">Pantau statistik mahasiswa, distribusi IPK, dan status akademik</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            className="px-3 py-2 text-sm rounded-md border shadow-sm transition-all duration-200 border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-primary-400 hover:border-primary-300"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            title="Pilih Program Studi"
            aria-label="Pilih Program Studi"
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="inline-flex p-1 h-10 rounded-xl bg-muted/30">
          <TabsTrigger
            value="overview"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <BarChart3 className="mr-2 w-4 h-4" />
            Ikhtisar
          </TabsTrigger>
          <TabsTrigger
            value="outstanding"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <Award className="mr-2 w-4 h-4" />
            Mahasiswa Berprestasi
          </TabsTrigger>
          <TabsTrigger
            value="academic"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <GraduationCap className="mr-2 w-4 h-4" />
            Status Akademik
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <StudentPerformanceMetrics departmentId={selectedDepartment} />

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 border-none shadow-md transition-all duration-200 dark:from-gray-900 dark:to-gray-950 hover:shadow-lg">
              <CardHeader className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
                <CardTitle className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                  Statistik Mahasiswa per Program Studi
                </CardTitle>
                <CardDescription>Jumlah mahasiswa aktif, cuti, dan lulus per program studi</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentStatisticsChart departmentId={selectedDepartment} />
              </CardContent>
            </Card>
            <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 border-none shadow-md transition-all duration-200 dark:from-gray-900 dark:to-gray-950 hover:shadow-lg">
              <CardHeader className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
                <CardTitle className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                  Distribusi IPK
                </CardTitle>
                <CardDescription>Distribusi IPK mahasiswa berdasarkan rentang nilai</CardDescription>
              </CardHeader>
              <CardContent>
                <GpaDistributionChart departmentId={selectedDepartment} />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="below-average" className="mt-2">
            <TabsList className="grid grid-cols-2 p-1 w-full rounded-xl bg-muted/30">
              <TabsTrigger
                value="below-average"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
              >
                Mahasiswa IPK Di Bawah Rata-rata
              </TabsTrigger>
              <TabsTrigger
                value="department-recap"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
              >
                Rekap Mahasiswa per Prodi
              </TabsTrigger>
            </TabsList>
            <TabsContent value="below-average" className="mt-6">
              <BelowAverageGpaTable departmentId={selectedDepartment} />
            </TabsContent>
            <TabsContent value="department-recap" className="mt-6">
              <DepartmentStudentRecap />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="outstanding" className="space-y-4">
          <Card className="bg-gradient-to-br from-white to-gray-50 border-none shadow-md dark:from-gray-900 dark:to-gray-950">
            <CardHeader>
              <div className="flex gap-2 items-center">
                <Award className="w-5 h-5 text-primary-500" />
                <CardTitle className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                  Mahasiswa Berprestasi
                </CardTitle>
              </div>
              <CardDescription>Daftar mahasiswa dengan prestasi akademik dan non-akademik terbaik</CardDescription>
            </CardHeader>
            <CardContent>
              <OutstandingStudentsList departmentId={selectedDepartment} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <AcademicStatusOverview departmentId={selectedDepartment} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

