"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
// Import the new RecitationTestsList component
import { RecitationTestsList } from "./recitation-tests-list"
import {
  BookOpen,
  Users,
  Briefcase,
  MapPin,
  History,
  Search,
  Filter,
  Download,
  RefreshCw,
  UserPlus,
} from "lucide-react"
import { ActiveStudentsList } from "./active-students-list"
import { WorkProgramsList } from "./work-programs-list"
import { HistoricalStudentsList } from "./historical-students-list"
import { LocationsList } from "./locations-list"
import { AddLocationDialog } from "./add-location-dialog"
import { AddSupervisorDialog } from "./add-supervisor-dialog"
import { KkpPlusOverviewStats } from "./kkp-plus-overview-stats"
// Add the AddStaffDialog import and component at the end
import { AddStaffDialog } from "./add-staff-dialog"

export function ViceDean4Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false)
  const [isAddSupervisorOpen, setIsAddSupervisorOpen] = useState(false)
  // Add a new state for the add staff dialog
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)

  const departments = [
    "Informatika",
    "Sistem Informasi",
    "Teknik Komputer",
    "Teknik Elektro",
    "Manajemen Informatika",
  ]

  const handleDepartmentSelect = (dept: string) => {
    setSelectedDepartment(selectedDepartment === dept ? null : dept)
  }

  return (
    <div className="p-4 space-y-6 rounded-lg bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text">
           Kuliah Kerja Profesi Plus
          </h2>
          <p className="text-muted-foreground">Dashboard Wakil Dekan 4 untuk pengelolaan kerja profesi plus</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setIsAddLocationOpen(true)}
            className="flex items-center gap-1 transition-all border-primary-100 hover:bg-primary-50 hover:text-primary-700"
          >
            <MapPin className="w-4 h-4" />
            <span>Tambah Lokasi</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsAddSupervisorOpen(true)}
            className="flex items-center gap-1 transition-all border-primary-100 hover:bg-primary-50 hover:text-primary-700"
          >
            <Users className="w-4 h-4" />
            <span>Tambah Pembimbing</span>
          </Button>
          <Button className="flex items-center gap-1 transition-all bg-primary hover:bg-primary-600">
            <Download className="w-4 h-4" />
            <span>Ekspor Data</span>
          </Button>
        </div>
      </div>

      <KkpPlusOverviewStats />

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex items-center flex-1 space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari berdasarkan nama, NIM, atau program..."
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
              className={`cursor-pointer transition-all ${
                selectedDepartment === dept
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

      <Tabs defaultValue="active-students" className="space-y-4">
        <TabsList className="grid grid-cols-2 p-1 md:grid-cols-5 bg-muted/50">
          <TabsTrigger
            value="active-students"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <Users className="w-4 h-4" />
            <span className="hidden md:inline">Mahasiswa Aktif</span>
            <span className="inline md:hidden">Aktif</span>
          </TabsTrigger>
          <TabsTrigger
            value="work-programs"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <Briefcase className="w-4 h-4" />
            <span className="hidden md:inline">Program Kerja</span>
            <span className="inline md:hidden">Program</span>
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <History className="w-4 h-4" />
            <span className="hidden md:inline">Riwayat Mahasiswa</span>
            <span className="inline md:hidden">Riwayat</span>
          </TabsTrigger>
          <TabsTrigger
            value="locations"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden md:inline">Lokasi Program</span>
            <span className="inline md:hidden">Lokasi</span>
          </TabsTrigger>
          <TabsTrigger
            value="recitation-tests"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Tes Hafalan</span>
            <span className="inline md:hidden">Hafalan</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active-students" className="space-y-4">
          <ActiveStudentsList searchQuery={searchQuery} selectedDepartment={selectedDepartment} />
        </TabsContent>

        <TabsContent value="work-programs" className="space-y-4">
          <WorkProgramsList searchQuery={searchQuery} selectedDepartment={selectedDepartment} />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <HistoricalStudentsList searchQuery={searchQuery} selectedDepartment={selectedDepartment} />
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <LocationsList searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="recitation-tests" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Daftar Mahasiswa Lulus Tes Hafalan</h3>
            <Button
              onClick={() => setIsAddStaffOpen(true)}
              className="flex items-center gap-1 transition-all bg-primary hover:bg-primary-600"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Staff Penguji</span>
            </Button>
          </div>
          <RecitationTestsList searchQuery={searchQuery} selectedDepartment={selectedDepartment} />
        </TabsContent>
      </Tabs>

      <AddLocationDialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen} />

      <AddSupervisorDialog open={isAddSupervisorOpen} onOpenChange={setIsAddSupervisorOpen} />
      <AddStaffDialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen} />
    </div>
  )
}

