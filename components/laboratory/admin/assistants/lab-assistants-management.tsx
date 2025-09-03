"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LabAssistantsTable } from "./lab-assistants-table"
import { LabAssistantSchedule } from "./lab-assistant-schedule"
import { LabAssistantPerformance } from "./lab-assistant-performance"
import { AddLabAssistantDialog } from "./add-lab-assistant-dialog"
import { LabAssistantStats } from "./lab-assistant-stats"
import { mockLabAssistants } from "./mock-lab-assistants"
import { Search, Plus, FileText, Calendar, BarChart } from "lucide-react"

export function LabAssistantsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [labFilter, setLabFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter asisten berdasarkan kueri pencarian dan filter
  const filteredAssistants = mockLabAssistants.filter((assistant) => {
    const matchesSearch =
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || assistant.status === statusFilter
    const matchesLab = labFilter === "all" || assistant.lab === labFilter

    return matchesSearch && matchesStatus && matchesLab
  })

  return (
    <div className="space-y-6">
      <LabAssistantStats assistants={mockLabAssistants} />

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Asisten Laboratorium</CardTitle>
              <CardDescription>Kelola asisten laboratorium, jadwal, dan kinerja</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari asisten..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Asisten
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter berdasarkan status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  <SelectItem value="probation">Masa Percobaan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Laboratorium:</span>
              <Select value={labFilter} onValueChange={setLabFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter berdasarkan laboratorium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Laboratorium</SelectItem>
                  <SelectItem value="Computer Networks">Jaringan Komputer</SelectItem>
                  <SelectItem value="Database Systems">Sistem Basis Data</SelectItem>
                  <SelectItem value="Programming">Pemrograman</SelectItem>
                  <SelectItem value="Multimedia">Multimedia</SelectItem>
                  <SelectItem value="Artificial Intelligence">Kecerdasan Buatan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="assistants">
            <TabsList className="mb-4">
              <TabsTrigger value="assistants">
                <FileText className="mr-2 h-4 w-4" />
                Daftar Asisten
              </TabsTrigger>
              <TabsTrigger value="schedule">
                <Calendar className="mr-2 h-4 w-4" />
                Jadwal
              </TabsTrigger>
              <TabsTrigger value="performance">
                <BarChart className="mr-2 h-4 w-4" />
                Kinerja
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assistants">
              <LabAssistantsTable assistants={filteredAssistants} />
            </TabsContent>

            <TabsContent value="schedule">
              <LabAssistantSchedule assistants={filteredAssistants} />
            </TabsContent>

            <TabsContent value="performance">
              <LabAssistantPerformance assistants={filteredAssistants} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddLabAssistantDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}

