"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Flame,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Users
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

// Mock data for major tasks
const majorTasks = [
  {
    id: 1,
    title: "Kalibrasi Peralatan",
    description: "Kalibrasi semua mikroskop di Laboratorium Biologi",
    priority: "high",
    dueDate: "2023-11-15",
    status: "in-progress",
    progress: 65,
    assignees: [
      { id: 1, name: "Alex Kim", avatar: "/placeholder-user.jpg" },
      { id: 2, name: "Jamie Chen", avatar: "/placeholder-user.jpg" },
    ],
    lab: "Lab Biologi",
  },
  {
    id: 2,
    title: "Pembaruan Software",
    description: "Update software simulasi di Lab Komputer",
    priority: "medium",
    dueDate: "2023-11-20",
    status: "not-started",
    progress: 0,
    assignees: [{ id: 3, name: "Taylor Wong", avatar: "/placeholder-user.jpg" }],
    lab: "Lab Komputer",
  },
  {
    id: 3,
    title: "Inspeksi Keamanan",
    description: "Inspeksi keamanan bulanan di Lab Kimia",
    priority: "high",
    dueDate: "2023-11-10",
    status: "completed",
    progress: 100,
    assignees: [
      { id: 4, name: "Jordan Lee", avatar: "/placeholder-user.jpg" },
      { id: 5, name: "Casey Park", avatar: "/placeholder-user.jpg" },
    ],
    lab: "Lab Kimia",
  },
  {
    id: 4,
    title: "Restocking Inventaris",
    description: "Restok bahan kimia dan supplies di Lab Kimia",
    priority: "medium",
    dueDate: "2023-11-25",
    status: "in-progress",
    progress: 30,
    assignees: [{ id: 6, name: "Riley Johnson", avatar: "/placeholder-user.jpg" }],
    lab: "Lab Kimia",
  },
  {
    id: 5,
    title: "Pemeliharaan Peralatan",
    description: "Pemeliharaan rutin peralatan fisika",
    priority: "low",
    dueDate: "2023-12-05",
    status: "not-started",
    progress: 0,
    assignees: [{ id: 7, name: "Morgan Smith", avatar: "/placeholder-user.jpg" }],
    lab: "Lab Fisika",
  },
]

export default function MajorTasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredTasks = majorTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase()) || task.lab.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "high-priority") return matchesSearch && task.priority === "high"
    if (selectedFilter === "in-progress") return matchesSearch && task.status === "in-progress"
    if (selectedFilter === "completed") return matchesSearch && task.status === "completed"
    if (selectedFilter === "not-started") return matchesSearch && task.status === "not-started"

    return matchesSearch
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header with stats */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              Tugas Utama
            </span>
            <Sparkles className="h-6 w-6 text-amber-400" />
          </h1>
          <Button className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600">
            <Plus className="mr-2 h-4 w-4" /> 
            Buat Tugas Baru
          </Button>
        </div>
        <p className="text-muted-foreground">Kelola dan lacak tugas-tugas penting laboratorium dan penugasan</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-rose-900 dark:text-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-rose-500" /> 
                  Prioritas Tinggi
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rose-900 dark:text-rose-50">
                {majorTasks.filter((task) => task.priority === "high").length}
              </div>
              <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">2 sedang berjalan, 1 selesai</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-amber-900 dark:text-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" /> 
                  Sedang Berjalan
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900 dark:text-amber-50">
                {majorTasks.filter((task) => task.status === "in-progress").length}
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">48% rata-rata penyelesaian</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-emerald-900 dark:text-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> 
                  Selesai
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">
                {majorTasks.filter((task) => task.status === "completed").length}
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Terakhir selesai 2 hari lalu</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-blue-900 dark:text-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" /> 
                  Staf Ditugaskan
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-50">7</div>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Untuk 5 tugas utama</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-violet-50 dark:from-slate-800 dark:to-slate-700">
            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari tugas, lab, atau deskripsi..."
                  className="pl-10 h-11 rounded-xl border-slate-300 focus:border-violet-500 focus:ring-violet-500/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 h-11 px-6 rounded-xl border-slate-200 hover:bg-slate-50 transition-all duration-200"
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-lg">
                    <DropdownMenuLabel>Filter Tugas</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedFilter("all")}>Semua Tugas</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("high-priority")}>Prioritas Tinggi</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("in-progress")}>Sedang Berjalan</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("completed")}>Selesai</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("not-started")}>Belum Dimulai</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 h-11 px-6 rounded-xl border-slate-200 hover:bg-slate-50 transition-all duration-200"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Urutkan</span>
                </Button>

                <Button 
                  className="h-11 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" /> 
                  Buat Tugas Baru
                </Button>

                <Tabs defaultValue="card" className="w-auto">
                  <TabsList className="grid w-24 grid-cols-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <TabsTrigger value="card" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <div className="grid grid-cols-2 gap-0.5 h-4 w-4">
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="list" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <div className="flex flex-col gap-0.5 h-4 w-4 justify-center">
                        <div className="h-0.5 w-full bg-current rounded-full"></div>
                        <div className="h-0.5 w-full bg-current rounded-full"></div>
                        <div className="h-0.5 w-full bg-current rounded-full"></div>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Active filter indicator */}
            {selectedFilter !== "all" && (
              <div className="flex items-center gap-2 mt-4">
                <Badge variant="secondary" className="flex items-center gap-2 text-sm bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                  <Filter className="h-3 w-3" />
                  {selectedFilter === "high-priority" && "Prioritas Tinggi"}
                  {selectedFilter === "in-progress" && "Sedang Berjalan"}
                  {selectedFilter === "completed" && "Selesai"}
                  {selectedFilter === "not-started" && "Belum Dimulai"}
                  <button 
                    className="ml-1 rounded-full hover:bg-violet-200 dark:hover:bg-violet-800 p-0.5" 
                    onClick={() => setSelectedFilter("all")}
                  >
                    <span className="sr-only">Clear filter</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 3L3 9M3 3L9 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {filteredTasks.length} {filteredTasks.length === 1 ? "tugas" : "tugas"} ditemukan
                </span>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-6">
            {/* Task cards */}
            {filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 flex items-center justify-center mb-6">
                  <Search className="h-10 w-10 text-violet-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tidak ada tugas ditemukan</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Kami tidak dapat menemukan tugas yang sesuai dengan kriteria pencarian Anda. Coba sesuaikan filter atau buat tugas baru.
                </p>
                <Button 
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" /> 
                  Buat Tugas Baru
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="group overflow-hidden border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <CardHeader className="p-6 pb-0">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3">
                          {task.priority === "high" && (
                            <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900 dark:text-rose-300 font-medium">
                              <Flame className="w-3 h-3 mr-1" />
                              Tinggi
                            </Badge>
                          )}
                          {task.priority === "medium" && (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300 font-medium">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Sedang
                            </Badge>
                          )}
                          {task.priority === "low" && (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-300 font-medium">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Rendah
                            </Badge>
                          )}
                          <Badge variant="outline" className="font-normal bg-slate-50 dark:bg-slate-800">
                            {task.lab}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-lg">
                            <DropdownMenuItem className="cursor-pointer">Edit tugas</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Assign staff</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Ubah status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive cursor-pointer">Hapus tugas</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="text-xl group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-2">
                        {task.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-base">
                        {task.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-6 pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Jatuh tempo:{" "}
                          {new Date(task.dueDate).toLocaleDateString("id-ID", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Progress</span>
                          <span className="font-bold text-violet-600 dark:text-violet-400">{task.progress}%</span>
                        </div>
                        <Progress 
                          value={task.progress} 
                          className="h-2"
                          // @ts-ignore
                          indicatorClassName={
                            task.progress === 100 
                              ? "bg-green-500" 
                              : task.progress > 50 
                                ? "bg-violet-500" 
                                : "bg-amber-500"
                          }
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {task.assignees.map((assignee) => (
                          <Avatar key={assignee.id} className="border-2 border-background h-9 w-9 hover:z-10 hover:scale-110 transition-transform">
                            <AvatarImage src={assignee.avatar} alt={assignee.name} />
                            <AvatarFallback className="text-xs bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700">
                              {assignee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="rounded-full h-9 w-9 border-dashed hover:bg-violet-50 hover:border-violet-300 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Tambah anggota</span>
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                      >
                        Detail <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}