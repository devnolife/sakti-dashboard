"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { mockPracticumSchedules } from "./mock-practicum-data"
import type { PracticumSchedule } from "./types"
import PracticumScheduleCalendar from "./practicum-schedule-calendar"
import PracticumScheduleTable from "./practicum-schedule-table"
import AddPracticumScheduleDialog from "./add-practicum-schedule-dialog"

export default function PracticumScheduleManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLab, setSelectedLab] = useState<string>("all")
  const [selectedDay, setSelectedDay] = useState<string>("all")
  const [schedules, setSchedules] = useState<PracticumSchedule[]>(mockPracticumSchedules)

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.lab.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLab = selectedLab === "all" || schedule.lab === selectedLab
    const matchesDay = selectedDay === "all" || schedule.day === selectedDay

    return matchesSearch && matchesLab && matchesDay
  })

  const handleAddSchedule = (newSchedule: PracticumSchedule) => {
    setSchedules([...schedules, { ...newSchedule, id: `schedule-${schedules.length + 1}` }])
    setIsAddDialogOpen(false)
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  const handleUpdateSchedule = (updatedSchedule: PracticumSchedule) => {
    setSchedules(schedules.map((schedule) => (schedule.id === updatedSchedule.id ? updatedSchedule : schedule)))
  }

  const uniqueLabs = Array.from(new Set(schedules.map((schedule) => schedule.lab)))
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Jadwal Praktikum
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola jadwal praktikum untuk semua laboratorium</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari praktikum..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={selectedLab} onValueChange={setSelectedLab}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter Lab" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Lab</SelectItem>
              {uniqueLabs.map((lab) => (
                <SelectItem key={lab} value={lab}>
                  {lab}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter Hari" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Hari</SelectItem>
              {days.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Jadwal
        </Button>
      </div>

      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">
            <Filter className="mr-2 h-4 w-4" />
            Tabel
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="mr-2 h-4 w-4" />
            Kalender
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <PracticumScheduleTable
            schedules={filteredSchedules}
            onDelete={handleDeleteSchedule}
            onUpdate={handleUpdateSchedule}
          />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <PracticumScheduleCalendar schedules={filteredSchedules} />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Jadwal</CardTitle>
            <CardDescription>Distribusi jadwal per hari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {days.map((day) => {
                const count = schedules.filter((s) => s.day === day).length
                return (
                  <div key={day} className="flex items-center justify-between">
                    <span className="font-medium">{day}</span>
                    <Badge variant={count > 0 ? "default" : "outline"}>{count} Praktikum</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Lab</CardTitle>
            <CardDescription>Jumlah praktikum per laboratorium</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uniqueLabs.map((lab) => {
                const count = schedules.filter((s) => s.lab === lab).length
                return (
                  <div key={lab} className="flex items-center justify-between">
                    <span className="font-medium">{lab}</span>
                    <Badge variant={count > 0 ? "default" : "outline"}>{count} Praktikum</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jadwal Terdekat</CardTitle>
            <CardDescription>Praktikum yang akan datang</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedules
                .filter((s) => s.status === "upcoming")
                .slice(0, 3)
                .map((schedule) => (
                  <div key={schedule.id} className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="font-medium">{schedule.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {schedule.day}, {schedule.startTime} - {schedule.endTime}
                      </p>
                      <p className="text-xs text-muted-foreground">{schedule.lab}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddPracticumScheduleDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddSchedule}
        labs={uniqueLabs}
      />
    </div>
  )
}

