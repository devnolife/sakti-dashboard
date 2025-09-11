"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LabAssistantsTable } from "./lab-assistants-table"
import { LabAssistantSchedule } from "./lab-assistant-schedule"
import { LabAssistantPerformance } from "./lab-assistant-performance"
import { AddLabAssistantDialog } from "./add-lab-assistant-dialog"
import { LabAssistantStats } from "./lab-assistant-stats"
import { mockLabAssistants } from "./mock-lab-assistants"
import { 
  Search, 
  Plus, 
  FileText, 
  Calendar, 
  BarChart, 
  Filter,
  Users,
  GraduationCap,
  Clock
} from "lucide-react"

export function LabAssistantsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [labFilter, setLabFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter assistants based on search query and filters
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
              <CardTitle className="text-xl">Asisten Laboratorium</CardTitle>
              <CardDescription>Kelola asisten laboratorium, jadwal, dan performa</CardDescription>
            </div>
              
              {/* Search and Action Section */}
              <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari asisten..."
                    className="pl-10 w-full sm:w-[280px] h-11 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="h-11 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Asisten
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Filters Section */}
            <div className="flex flex-wrap gap-4 mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filter:</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Status:</span>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px] h-9 rounded-lg border-slate-300 dark:border-slate-600">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Aktif
                      </div>
                    </SelectItem>
                    <SelectItem value="inactive">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Tidak Aktif
                      </div>
                    </SelectItem>
                    <SelectItem value="probation">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Masa Percobaan
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Laboratorium:</span>
                <Select value={labFilter} onValueChange={setLabFilter}>
                  <SelectTrigger className="w-[200px] h-9 rounded-lg border-slate-300 dark:border-slate-600">
                    <SelectValue placeholder="Pilih laboratorium" />
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

              {(statusFilter !== "all" || labFilter !== "all") && (
                <Badge variant="secondary" className="ml-auto">
                  {filteredAssistants.length} dari {mockLabAssistants.length} asisten
                </Badge>
              )}
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="assistants" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 p-1 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger 
                  value="assistants" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm h-10"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Daftar Asisten</span>
                  <span className="sm:hidden">Daftar</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm h-10"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Jadwal</span>
                  <span className="sm:hidden">Jadwal</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm h-10"
                >
                  <BarChart className="h-4 w-4" />
                  <span className="hidden sm:inline">Performa</span>
                  <span className="sm:hidden">Performa</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="assistants" className="space-y-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm">
                  <LabAssistantsTable assistants={filteredAssistants} />
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">Jadwal Asisten</h3>
                  </div>
                  <LabAssistantSchedule assistants={filteredAssistants} />
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-lg">Analisis Performa</h3>
                  </div>
                  <LabAssistantPerformance assistants={filteredAssistants} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}