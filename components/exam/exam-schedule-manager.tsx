"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, FileText, CheckSquare, Award, Clock, MapPin, Trash2, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"

// Define thesis exam types
type ExamType = "proposal" | "result" | "defense" | "closing"

interface ExamSchedule {
  id: string
  examType: ExamType
  date: string
  startTime: string
  endTime: string
  location: string
  capacity: number
  notes?: string
}

// Mock data for exam schedules
const mockExamSchedules: ExamSchedule[] = [
  {
    id: "schedule-1",
    examType: "proposal",
    date: "2023-06-15",
    startTime: "09:00",
    endTime: "12:00",
    location: "Ruang Sidang A",
    capacity: 5,
    notes: "Sesi pagi untuk mahasiswa semester 6",
  },
  {
    id: "schedule-2",
    examType: "result",
    date: "2023-07-20",
    startTime: "13:00",
    endTime: "16:00",
    location: "Ruang Sidang B",
    capacity: 4,
    notes: "Sesi siang untuk mahasiswa semester 7",
  },
  {
    id: "schedule-3",
    examType: "defense",
    date: "2023-08-10",
    startTime: "10:00",
    endTime: "15:00",
    location: "Ruang Sidang C",
    capacity: 3,
    notes: "Sidang skripsi akhir semester",
  },
  {
    id: "schedule-4",
    examType: "closing",
    date: "2023-05-25",
    startTime: "14:00",
    endTime: "17:00",
    location: "Ruang Sidang A",
    capacity: 6,
    notes: "Ujian penutupan untuk mahasiswa yang akan wisuda",
  },
]

// Custom color palette
const colors = {
  proposal: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", icon: "text-teal-500" },
  result: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", icon: "text-violet-500" },
  defense: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "text-amber-500" },
  closing: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", icon: "text-rose-500" },
}

export function ExamScheduleManager() {
  const [schedules, setSchedules] = useState<ExamSchedule[]>(mockExamSchedules)
  const [activeTab, setActiveTab] = useState<ExamType>("proposal")
  const [filterMonth, setFilterMonth] = useState<string>("")
  const [showForm, setShowForm] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  // Form state for adding new schedule
  const [newSchedule, setNewSchedule] = useState<Partial<ExamSchedule>>({
    examType: "proposal",
    capacity: 5,
  })

  // Update exam type when tab changes
  useEffect(() => {
    setNewSchedule((prev) => ({ ...prev, examType: activeTab }))
  }, [activeTab])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewSchedule({ ...newSchedule, [name]: value })
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewSchedule({ ...newSchedule, [name]: value })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      newSchedule.date &&
      newSchedule.startTime &&
      newSchedule.endTime &&
      newSchedule.location &&
      newSchedule.capacity
    ) {
      const scheduleToAdd: ExamSchedule = {
        id: `schedule-${Date.now()}`,
        examType: newSchedule.examType as ExamType,
        date: newSchedule.date,
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        location: newSchedule.location,
        capacity: Number(newSchedule.capacity),
        notes: newSchedule.notes,
      }

      setSchedules([...schedules, scheduleToAdd])

      // Reset form
      setNewSchedule({
        examType: activeTab,
        capacity: 5,
      })

      // Hide form after submission
      setShowForm(false)
    }
  }

  // Delete schedule
  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  // Filter schedules based on active tab and month
  const filteredSchedules = schedules.filter((schedule) => {
    const matchesType = schedule.examType === activeTab

    if (!filterMonth) return matchesType

    const scheduleMonth = schedule.date.substring(0, 7) // Get YYYY-MM
    return matchesType && scheduleMonth === filterMonth
  })

  // Group schedules by date
  const groupedSchedules: Record<string, ExamSchedule[]> = {}
  filteredSchedules.forEach((schedule) => {
    if (!groupedSchedules[schedule.date]) {
      groupedSchedules[schedule.date] = []
    }
    groupedSchedules[schedule.date].push(schedule)
  })

  // Sort dates
  const sortedDates = Object.keys(groupedSchedules).sort()

  // Get current year and generate months
  const currentYear = new Date().getFullYear()
  const months = [
    { value: `${currentYear}-01`, label: "Januari" },
    { value: `${currentYear}-02`, label: "Februari" },
    { value: `${currentYear}-03`, label: "Maret" },
    { value: `${currentYear}-04`, label: "April" },
    { value: `${currentYear}-05`, label: "Mei" },
    { value: `${currentYear}-06`, label: "Juni" },
    { value: `${currentYear}-07`, label: "Juli" },
    { value: `${currentYear}-08`, label: "Agustus" },
    { value: `${currentYear}-09`, label: "September" },
    { value: `${currentYear}-10`, label: "Oktober" },
    { value: `${currentYear}-11`, label: "November" },
    { value: `${currentYear}-12`, label: "Desember" },
  ]

  // Get exam type label
  const getExamTypeLabel = (type: ExamType) => {
    switch (type) {
      case "proposal":
        return "Ujian Proposal"
      case "result":
        return "Ujian Hasil"
      case "defense":
        return "Sidang Skripsi"
      case "closing":
        return "Ujian Penutupan"
    }
  }

  // Get color for current exam type
  const getExamTypeColor = (type: ExamType) => {
    return colors[type]
  }

  return (
    <Card className="w-full overflow-hidden shadow-md bg-gradient-to-br from-slate-50 to-white">
      <CardHeader className="pb-4 border-b border-slate-100">
        <CardTitle className="text-2xl font-medium text-slate-800">Jadwal Ujian Skripsi</CardTitle>
        <CardDescription className="text-slate-500">
          Kelola jadwal ujian proposal, hasil, sidang, dan penutupan skripsi
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          defaultValue="proposal"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as ExamType)
            setShowForm(false)
          }}
        >
          <TabsList className="grid grid-cols-4 p-1 mb-8 bg-slate-100 rounded-xl">
            {(["proposal", "result", "defense", "closing"] as ExamType[]).map((type) => (
              <TabsTrigger
                key={type}
                value={type}
                className={`flex items-center gap-2 rounded-lg transition-all duration-300 data-[state=active]:shadow-sm ${activeTab === type ? getExamTypeColor(type).text : "text-slate-600"
                  }`}
              >
                {type === "proposal" && <FileText className="w-4 h-4" />}
                {type === "result" && <CheckSquare className="w-4 h-4" />}
                {type === "defense" && <Award className="w-4 h-4" />}
                {type === "closing" && <Calendar className="w-4 h-4" />}
                <span>{getExamTypeLabel(type)}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content for each tab */}
          {(["proposal", "result", "defense", "closing"] as ExamType[]).map((examType) => (
            <TabsContent key={examType} value={examType} className="space-y-8">
              {/* Add schedule button and form */}
              <div className="space-y-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <Button
                    onClick={() => setShowForm(!showForm)}
                    className={`gap-2 ${getExamTypeColor(examType).bg} ${getExamTypeColor(examType).text} hover:bg-opacity-80 transition-all duration-300`}
                  >
                    <Plus className="w-4 h-4" />
                    {showForm ? "Tutup Form" : `Tambah Jadwal ${getExamTypeLabel(examType)}`}
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {showForm && (
                    <motion.div
                      ref={formRef}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <Card className={`border ${getExamTypeColor(examType).border} shadow-sm`}>
                        <CardHeader className={`${getExamTypeColor(examType).bg} pb-2`}>
                          <CardTitle className="text-lg font-medium">
                            Tambah Jadwal {getExamTypeLabel(examType)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="date" className="text-slate-700">
                                  Tanggal
                                </Label>
                                <Input
                                  id="date"
                                  name="date"
                                  type="date"
                                  value={newSchedule.date || ""}
                                  onChange={handleInputChange}
                                  className="focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-300"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                  <Label htmlFor="startTime" className="text-slate-700">
                                    Waktu Mulai
                                  </Label>
                                  <Input
                                    id="startTime"
                                    name="startTime"
                                    type="time"
                                    value={newSchedule.startTime || ""}
                                    onChange={handleInputChange}
                                    className="focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-300"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="endTime" className="text-slate-700">
                                    Waktu Selesai
                                  </Label>
                                  <Input
                                    id="endTime"
                                    name="endTime"
                                    type="time"
                                    value={newSchedule.endTime || ""}
                                    onChange={handleInputChange}
                                    className="focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-300"
                                    required
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="location" className="text-slate-700">
                                  Lokasi
                                </Label>
                                <Input
                                  id="location"
                                  name="location"
                                  value={newSchedule.location || ""}
                                  onChange={handleInputChange}
                                  className="focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-300"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="capacity" className="text-slate-700">
                                  Jumlah Peserta
                                </Label>
                                <Input
                                  id="capacity"
                                  name="capacity"
                                  type="number"
                                  min="1"
                                  value={newSchedule.capacity || "5"}
                                  onChange={handleInputChange}
                                  className="focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-300"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="notes" className="text-slate-700">
                                Catatan
                              </Label>
                              <Textarea
                                id="notes"
                                name="notes"
                                value={newSchedule.notes || ""}
                                onChange={handleInputChange}
                                className="min-h-[80px] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-300"
                              />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowForm(false)}
                                className="border-slate-200 text-slate-700 hover:bg-slate-50"
                              >
                                Batal
                              </Button>
                              <Button
                                type="submit"
                                className={`${getExamTypeColor(examType).bg} ${getExamTypeColor(examType).text} hover:bg-opacity-80`}
                              >
                                Tambah Jadwal
                              </Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* List of schedules */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-medium ${getExamTypeColor(examType).text}`}>
                    Jadwal {getExamTypeLabel(examType)}
                  </h3>

                  <Select value={filterMonth} onValueChange={setFilterMonth}>
                    <SelectTrigger className="w-[180px] border-slate-200 focus:ring-slate-300">
                      <SelectValue placeholder="Filter bulan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Bulan</SelectItem>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <AnimatePresence>
                  {sortedDates.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="py-12 text-center rounded-lg text-slate-400 bg-slate-50"
                    >
                      <Calendar className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                      <p>Tidak ada jadwal ujian yang ditemukan</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {sortedDates.map((date, dateIndex) => (
                        <motion.div
                          key={date}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: dateIndex * 0.1 }}
                        >
                          <Card className="overflow-hidden shadow-sm border-slate-200">
                            <CardHeader className="py-3 bg-slate-50">
                              <CardTitle className="flex items-center gap-2 text-lg font-medium text-slate-700">
                                <Calendar className={`w-5 h-5 ${getExamTypeColor(examType).icon}`} />
                                {format(new Date(date), "EEEE, dd MMMM yyyy")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                {groupedSchedules[date].map((schedule, index) => (
                                  <motion.div
                                    key={schedule.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className={`flex items-start justify-between p-4 border rounded-lg ${getExamTypeColor(examType).border} ${getExamTypeColor(examType).bg} bg-opacity-30 hover:bg-opacity-50 transition-all duration-300`}
                                  >
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Clock className={`w-4 h-4 ${getExamTypeColor(examType).icon}`} />
                                        <span className="font-medium text-slate-700">
                                          {schedule.startTime} - {schedule.endTime}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <MapPin className={`w-4 h-4 ${getExamTypeColor(examType).icon}`} />
                                        <span className="text-slate-600">{schedule.location}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant="outline"
                                          className={`${getExamTypeColor(examType).text} ${getExamTypeColor(examType).border} ${getExamTypeColor(examType).bg}`}
                                        >
                                          Kapasitas: {schedule.capacity}
                                        </Badge>
                                      </div>
                                      {schedule.notes && (
                                        <p className="max-w-md mt-1 text-sm text-slate-500">{schedule.notes}</p>
                                      )}
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleDeleteSchedule(schedule.id)}
                                      className="transition-colors duration-300 text-slate-400 hover:text-red-500 hover:bg-red-50"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      <span className="sr-only">Hapus jadwal</span>
                                    </Button>
                                  </motion.div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

