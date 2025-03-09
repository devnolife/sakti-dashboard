"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  parseISO,
} from "date-fns"
import { id } from "date-fns/locale"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  ListFilter,
  MapPin,
  Search,
  User,
  Users,
  FileText,
  BookOpen,
  Award,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"


const academicEvents = [
  {
    id: "event-1",
    title: "Ujian Proposal Skripsi",
    date: "2025-03-07T14:30:00",
    endDate: "2025-03-07T16:30:00",
    location: "Ruang Seminar A1.2",
    type: "exam",
    examType: "proposal",
    description: "Presentasi proposal penelitian tentang Implementasi Machine Learning untuk Prediksi Cuaca",
    committee: [
      { name: "Dr. Budi Santoso, M.Sc.", role: "Ketua" },
      { name: "Prof. Siti Rahayu, Ph.D.", role: "Anggota" },
      { name: "Dr. Ahmad Wijaya, M.T.", role: "Anggota" },
    ],
    status: "confirmed",
  },
  {
    id: "event-2",
    title: "Kuliah Algoritma dan Pemrograman",
    date: "2025-03-05T08:00:00",
    endDate: "2025-03-05T10:30:00",
    location: "Ruang 301",
    type: "class",
    description: "Materi: Algoritma Sorting dan Searching",
    lecturer: "Dr. Maya Purnama, M.Kom.",
    status: "confirmed",
  },
  {
    id: "event-3",
    title: "Praktikum Basis Data",
    date: "2025-03-06T13:00:00",
    endDate: "2025-03-06T15:00:00",
    location: "Lab Komputer 2",
    type: "lab",
    description: "Praktikum SQL Lanjutan: Stored Procedure dan Trigger",
    lecturer: "Ir. Joko Widodo, M.T.",
    status: "confirmed",
  },
  {
    id: "event-4",
    title: "Bimbingan Skripsi",
    date: "2025-03-12T10:00:00",
    endDate: "2025-03-12T11:00:00",
    location: "Ruang Dosen Lt. 3",
    type: "consultation",
    description: "Diskusi revisi proposal skripsi",
    lecturer: "Dr. Dewi Anggraini, M.Kom.",
    status: "confirmed",
  },
  {
    id: "event-5",
    title: "Seminar Teknologi Blockchain",
    date: "2025-03-18T09:00:00",
    endDate: "2025-03-18T12:00:00",
    location: "Auditorium Utama",
    type: "seminar",
    description: "Pembicara: Dr. Satoshi Nakamoto dari Universitas Tokyo",
    status: "confirmed",
  },
  {
    id: "event-6",
    title: "Ujian Tengah Semester",
    date: "2025-03-20T10:00:00",
    endDate: "2025-03-20T11:30:00",
    location: "Ruang 201-205",
    type: "exam",
    examType: "midterm",
    description: "Mata Kuliah: Jaringan Komputer",
    lecturer: "Prof. Bambang Sutejo, Ph.D.",
    status: "confirmed",
  },
  {
    id: "event-7",
    title: "Workshop UI/UX Design",
    date: "2025-03-22T09:00:00",
    endDate: "2025-03-22T16:00:00",
    location: "Creative Hub",
    type: "workshop",
    description: "Fasilitator: Tim Design Google Indonesia",
    status: "confirmed",
  },
  {
    id: "event-8",
    title: "Deadline Pengumpulan Tugas Besar",
    date: "2025-03-25T23:59:00",
    endDate: "2025-03-25T23:59:00",
    type: "deadline",
    description: "Mata Kuliah: Pemrograman Web Lanjut",
    lecturer: "Dr. Rudi Hartono, M.T.",
    status: "confirmed",
  },
  {
    id: "event-9",
    title: "Ujian Hasil Skripsi",
    date: "2025-03-28T13:00:00",
    endDate: "2025-03-28T15:00:00",
    location: "Ruang Seminar B2.3",
    type: "exam",
    examType: "result",
    description: "Presentasi hasil penelitian tentang Analisis Keamanan Jaringan pada Infrastruktur Cloud",
    committee: [
      { name: "Prof. Agus Setiawan, Ph.D.", role: "Ketua" },
      { name: "Dr. Maya Purnama, M.Kom.", role: "Anggota" },
      { name: "Dr. Budi Santoso, M.Sc.", role: "Anggota" },
    ],
    status: "confirmed",
  },
  {
    id: "event-10",
    title: "Rapat Organisasi Mahasiswa",
    date: "2025-03-15T16:00:00",
    endDate: "2025-03-15T18:00:00",
    location: "Ruang Rapat Himpunan",
    type: "organization",
    description: "Agenda: Persiapan Acara Dies Natalis Fakultas",
    status: "confirmed",
  },
]


const eventTypeIcons = {
  exam: <GraduationCap className="w-4 h-4" />,
  class: <BookOpen className="w-4 h-4" />,
  lab: <FileText className="w-4 h-4" />,
  consultation: <User className="w-4 h-4" />,
  seminar: <Users className="w-4 h-4" />,
  workshop: <FileText className="w-4 h-4" />,
  deadline: <Clock className="w-4 h-4" />,
  organization: <Users className="w-4 h-4" />,
}


const eventTypeColors = {
  exam: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800/30",
  class: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/30",
  lab: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/30",
  consultation:
    "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800/30",
  seminar:
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/30",
  workshop:
    "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/30",
  deadline: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/30",
  organization:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800/30",
}

const examTypeIcons = {
  proposal: <BookOpen className="w-5 h-5" />,
  result: <FileText className="w-5 h-5" />,
  closing: <Award className="w-5 h-5" />,
  midterm: <FileText className="w-5 h-5" />,
  final: <GraduationCap className="w-5 h-5" />,
}

export const ExamScheduleDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedView, setSelectedView] = useState("month")
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"])

  
  const filteredEvents = academicEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = selectedFilters.includes("all") || selectedFilters.includes(event.type)

    return matchesSearch && matchesFilter
  })

  
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter((event) => {
      const eventDate = parseISO(event.date)
      return isSameDay(eventDate, date)
    })
  }

  
  const getEventsForMonth = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

    return days.map((day) => {
      return {
        date: day,
        events: getEventsForDate(day),
      }
    })
  }

  
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  
  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  
  const handleFilterChange = (type: string) => {
    if (type === "all") {
      setSelectedFilters(["all"])
    } else {
      const newFilters = selectedFilters.filter((f) => f !== "all")
      if (newFilters.includes(type)) {
        setSelectedFilters(newFilters.filter((f) => f !== type))
      } else {
        setSelectedFilters([...newFilters, type])
      }

      if (newFilters.length === 0) {
        setSelectedFilters(["all"])
      }
    }
  }

  
  const calendarDays = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

    return days.map((day) => {
      const dayEvents = getEventsForDate(day)
      const isToday = isSameDay(day, new Date())
      const isSelected = selectedDate ? isSameDay(day, selectedDate) : false

      return (
        <div
          key={day.toString()}
          className={cn(
            "border p-1 h-32 overflow-y-auto",
            isToday ? "bg-blue-50 dark:bg-blue-950/20" : "",
            isSelected ? "ring-2 ring-primary" : "",
          )}
          onClick={() => setSelectedDate(day)}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between pb-1 bg-inherit">
            <span className={cn("text-sm font-medium", isToday ? "text-primary" : "")}>{format(day, "d")}</span>
            {dayEvents.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {dayEvents.length}
              </Badge>
            )}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={cn(
                  "text-xs p-1 rounded border truncate cursor-pointer",
                  eventTypeColors[event.type as keyof typeof eventTypeColors],
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  handleEventClick(event)
                }}
              >
                <div className="flex items-center gap-1">
                  {eventTypeIcons[event.type as keyof typeof eventTypeIcons]}
                  <span className="truncate">{event.title}</span>
                </div>
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-center text-muted-foreground">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Jadwal Akademik</h1>
          <p className="text-muted-foreground">Kelola dan lihat semua jadwal akademik Anda dalam satu tempat.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold min-w-[140px] text-center">
            {format(currentDate, "MMMM yyyy", { locale: id })}
          </h2>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="space-y-6 md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Kalender</CardTitle>
              <CardDescription>Navigasi cepat ke tanggal</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-3">
                <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-center">
                  <div className="text-muted-foreground">Min</div>
                  <div className="text-muted-foreground">Sen</div>
                  <div className="text-muted-foreground">Sel</div>
                  <div className="text-muted-foreground">Rab</div>
                  <div className="text-muted-foreground">Kam</div>
                  <div className="text-muted-foreground">Jum</div>
                  <div className="text-muted-foreground">Sab</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {eachDayOfInterval({
                    start: startOfMonth(currentDate),
                    end: endOfMonth(currentDate),
                  }).map((day, i) => {
                    const dayEvents = getEventsForDate(day)
                    const isToday = isSameDay(day, new Date())
                    const isSelected = selectedDate ? isSameDay(day, selectedDate) : false

                    return (
                      <button
                        key={i}
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center text-sm p-0 relative",
                          isToday ? "bg-primary text-primary-foreground" : "",
                          isSelected && !isToday ? "bg-muted" : "",
                          dayEvents.length > 0 && !isToday && !isSelected ? "text-primary font-medium" : "",
                        )}
                        onClick={() => setSelectedDate(day)}
                      >
                        {format(day, "d")}
                        {dayEvents.length > 0 && !isToday && (
                          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-primary"></span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 border-t">
              <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedDate(new Date())}>
                Hari Ini
              </Button>
            </CardFooter>
          </Card>

          <Card className="">
            <CardHeader>
              <CardTitle className="text-primary-800 dark:text-primary-300">Jadwal Terdekat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredEvents
                .filter((event) => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 3)
                .map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "bg-white dark:bg-background rounded-lg p-3 shadow-sm border border-primary-200 dark:border-primary-800/30 cursor-pointer",
                      eventTypeColors[event.type as keyof typeof eventTypeColors],
                    )}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          event.type === "exam"
                            ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                            : event.type === "class"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                              : event.type === "lab"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300"
                                : "bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300",
                        )}
                      >
                        {eventTypeIcons[event.type as keyof typeof eventTypeIcons]}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-1">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(event.date), "EEEE, d MMMM yyyy", { locale: id })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{format(parseISO(event.date), "HH:mm", { locale: id })}</span>
                      {event.location && (
                        <>
                          <span className="mx-1">•</span>
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="truncate">{event.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              {filteredEvents.filter((event) => new Date(event.date) >= new Date()).length === 0 && (
                <div className="py-6 text-center text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-primary-300" />
                  <p>Tidak ada jadwal terdekat</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-white/80 dark:bg-background/80">
                Lihat Semua Jadwal
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="md:col-span-3">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-center">
            <div className="text-muted-foreground">Min</div>
            <div className="text-muted-foreground">Sen</div>
            <div className="text-muted-foreground">Sel</div>
            <div className="text-muted-foreground">Rab</div>
            <div className="text-muted-foreground">Kam</div>
            <div className="text-muted-foreground">Jum</div>
            <div className="text-muted-foreground">Sab</div>
          </div>
          <div className="grid grid-cols-7 gap-1">{calendarDays()}</div>
        </div>
      </div>

      {/* Event Detail Dialog */}
      {selectedEvent && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Jadwal</DialogTitle>
              <DialogDescription>Informasi lengkap tentang jadwal akademik Anda.</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {selectedEvent.type === "exam"
                      ? "Ujian"
                      : selectedEvent.type === "class"
                        ? "Kuliah"
                        : selectedEvent.type === "lab"
                          ? "Praktikum"
                          : selectedEvent.type === "consultation"
                            ? "Bimbingan"
                            : selectedEvent.type === "seminar"
                              ? "Seminar"
                              : selectedEvent.type === "workshop"
                                ? "Workshop"
                                : selectedEvent.type === "deadline"
                                  ? "Deadline"
                                  : "Organisasi"}
                  </Badge>
                  {selectedEvent.type === "exam" && selectedEvent.examType && (
                    <Badge
                      className={
                        selectedEvent.examType === "proposal"
                          ? "bg-blue-500"
                          : selectedEvent.examType === "result"
                            ? "bg-purple-500"
                            : selectedEvent.examType === "closing"
                              ? "bg-teal-500"
                              : selectedEvent.examType === "midterm"
                                ? "bg-amber-500"
                                : "bg-red-500"
                      }
                    >
                      {selectedEvent.examType === "proposal"
                        ? "Proposal"
                        : selectedEvent.examType === "result"
                          ? "Hasil"
                          : selectedEvent.examType === "closing"
                            ? "Tertutup"
                            : selectedEvent.examType === "midterm"
                              ? "UTS"
                              : "UAS"}
                    </Badge>
                  )}
                </div>
                <h2 className="mt-2 text-xl font-semibold">{selectedEvent.title}</h2>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Informasi Jadwal</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Tanggal: {format(parseISO(selectedEvent.date), "EEEE, d MMMM yyyy", { locale: id })}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>
                      Waktu: {format(parseISO(selectedEvent.date), "HH:mm", { locale: id })}
                      {selectedEvent.endDate && (
                        <> - {format(parseISO(selectedEvent.endDate), "HH:mm", { locale: id })}</>
                      )}
                    </span>
                  </div>
                  {selectedEvent.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Lokasi: {selectedEvent.location}</span>
                    </div>
                  )}
                  {selectedEvent.lecturer && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Dosen: {selectedEvent.lecturer}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {selectedEvent.description && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Deskripsi</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm">
                    <p>{selectedEvent.description}</p>
                  </CardContent>
                </Card>
              )}

              {selectedEvent.committee && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Penguji</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {selectedEvent.committee.map((member: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{member.name}</span>
                        </div>
                        <Badge variant="outline">{member.role}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Tutup
                </Button>
                <Button>Tambahkan ke Kalender</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

