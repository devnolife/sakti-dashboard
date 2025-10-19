"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AcademicMonitoring } from "./academic-monitoring"
import { StudentManagement } from "./student-management"
import { ResearchPKM } from "./research-pkm"
import { Partnerships } from "./partnerships"
import { DashboardSummary } from "./dashboard-summary"
import {
  BookOpen,
  Users,
  Award,
  Handshake,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  FileText,
} from "lucide-react"

export function ViceDean1Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)

  const departments = [
    "Teknik Pengairan",
    "Teknik Elektro",
    "Arsitektur",
    "Informatika",
    "Perencanaan Wilayah Kota",
  ]

  const handleDepartmentSelect = (dept: string) => {
    setSelectedDepartment(selectedDepartment === dept ? null : dept)
  }

  return (
    <div className="pb-5 space-y-6">
      <div className="flex flex-wrap gap-2 justify-end">
        <Button
          variant="outline"
          className="flex items-center gap-1 transition-all border-primary-100 hover:bg-primary-50 hover:text-primary-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Program</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-1 transition-all border-primary-100 hover:bg-primary-50 hover:text-primary-700"
        >
          <FileText className="w-4 h-4" />
          <span>Laporan</span>
        </Button>
        <Button className="flex items-center gap-1 transition-all bg-primary hover:bg-primary-600">
          <Download className="w-4 h-4" />
          <span>Ekspor Data</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <DashboardSummary />

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex items-center flex-1 space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari mahasiswa, penelitian, atau kerjasama..."
              className="pl-8 transition-all border-primary-100 focus-visible:ring-primary-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="transition-all border-primary-100 hover:bg-primary-50 hover:text-primary-700"
          >
            <Filter className="w-4 h-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="transition-all border-primary-100 hover:bg-primary-50 hover:text-primary-700"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <Badge
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"}
              className={`cursor-pointer transition-all ${selectedDepartment === dept
                ? "bg-primary hover:bg-primary-600"
                : "border-primary-100 hover:bg-primary-50 hover:text-primary-700"
                }`}
              onClick={() => handleDepartmentSelect(dept)}
            >
              {dept}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="akademik" className="space-y-4">
        <TabsList className="grid grid-cols-2 p-1 md:grid-cols-4 bg-muted/50">
          <TabsTrigger
            value="akademik"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Akademik</span>
            <span className="inline md:hidden">Akademik</span>
          </TabsTrigger>
          <TabsTrigger
            value="mahasiswa"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <Users className="w-4 h-4" />
            <span className="hidden md:inline">Mahasiswa</span>
            <span className="inline md:hidden">Mahasiswa</span>
          </TabsTrigger>
          <TabsTrigger
            value="penelitian"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <Award className="w-4 h-4" />
            <span className="hidden md:inline">Penelitian & PKM</span>
            <span className="inline md:hidden">Penelitian</span>
          </TabsTrigger>
          <TabsTrigger
            value="kerjasama"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <Handshake className="w-4 h-4" />
            <span className="hidden md:inline">Kerjasama</span>
            <span className="inline md:hidden">Kerjasama</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="akademik" className="space-y-4">
          <AcademicMonitoring searchQuery={searchQuery} selectedDepartment={selectedDepartment} />
        </TabsContent>

        <TabsContent value="mahasiswa" className="space-y-4">
          <StudentManagement searchQuery={searchQuery} selectedDepartment={selectedDepartment} />
        </TabsContent>

        <TabsContent value="penelitian" className="space-y-4">
          <ResearchPKM searchQuery={searchQuery} selectedDepartment={selectedDepartment} />
        </TabsContent>

        <TabsContent value="kerjasama" className="space-y-4">
          <Partnerships searchQuery={searchQuery} selectedDepartment={selectedDepartment} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
