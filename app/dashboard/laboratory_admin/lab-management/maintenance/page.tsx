"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Wrench,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Settings,
  Zap,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

// Mock data for maintenance records
const maintenanceRecords = [
  {
    id: 1,
    equipment: "Server Database Utama",
    equipmentType: "server",
    lab: "Lab Database",
    location: "Ruang Server A-201",
    issue: "Overheating pada CPU",
    priority: "high",
    status: "in-progress",
    reportedBy: "Ahmad Fauzi",
    reportedDate: "2024-01-10",
    assignedTo: "Team IT",
    startDate: "2024-01-11",
    estimatedCompletion: "2024-01-13",
    actualCompletion: null,
    cost: 2500000,
    progress: 65,
    description: "CPU server mengalami suhu tinggi, perlu penggantian thermal paste dan pembersihan fan"
  },
  {
    id: 2,
    equipment: "Proyektor Epson EB-X41",
    equipmentType: "projector",
    lab: "Lab Multimedia",
    location: "MM-101",
    issue: "Lampu proyektor mati",
    priority: "medium",
    status: "completed",
    reportedBy: "Siti Nurhaliza",
    reportedDate: "2024-01-05",
    assignedTo: "Budi Santoso",
    startDate: "2024-01-06",
    estimatedCompletion: "2024-01-08",
    actualCompletion: "2024-01-08",
    cost: 850000,
    progress: 100,
    description: "Penggantian lampu proyektor dengan spare part original"
  },
  {
    id: 3,
    equipment: "Switch Network 24-Port",
    equipmentType: "network",
    lab: "Lab Jaringan",
    location: "JK-201",
    issue: "Port 15-18 tidak berfungsi",
    priority: "medium",
    status: "pending",
    reportedBy: "Andi Pratama",
    reportedDate: "2024-01-12",
    assignedTo: null,
    startDate: null,
    estimatedCompletion: "2024-01-16",
    actualCompletion: null,
    cost: 0,
    progress: 0,
    description: "Beberapa port ethernet tidak mendeteksi koneksi"
  },
  {
    id: 4,
    equipment: "PC Lab Programming #12",
    equipmentType: "computer",
    lab: "Lab Programming",
    location: "PR-102",
    issue: "Hard disk rusak",
    priority: "high",
    status: "cancelled",
    reportedBy: "Citra Dewi",
    reportedDate: "2024-01-08",
    assignedTo: "Team Hardware",
    startDate: "2024-01-09",
    estimatedCompletion: "2024-01-11",
    actualCompletion: null,
    cost: 1200000,
    progress: 0,
    description: "Hard disk mengalami bad sector, perlu penggantian"
  },
  {
    id: 5,
    equipment: "AC Split 2PK",
    equipmentType: "ac",
    lab: "Lab AI",
    location: "AI-301",
    issue: "AC tidak dingin",
    priority: "high",
    status: "scheduled",
    reportedBy: "Dani Ramdhani",
    reportedDate: "2024-01-13",
    assignedTo: "Tim Maintenance",
    startDate: "2024-01-15",
    estimatedCompletion: "2024-01-16",
    actualCompletion: null,
    cost: 750000,
    progress: 0,
    description: "AC tidak menghasilkan udara dingin, kemungkinan freon habis"
  }
]

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  critical: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
}

const statusColors = {
  pending: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "in-progress": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
}

const statusIcons = {
  pending: Clock,
  scheduled: Calendar,
  "in-progress": Settings,
  completed: CheckCircle2,
  cancelled: XCircle
}

const equipmentIcons = {
  server: Cpu,
  computer: Monitor,
  network: Wifi,
  projector: Monitor,
  ac: Zap,
  printer: HardDrive
}

export default function MaintenancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterLab, setFilterLab] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  // Filter maintenance records
  const filteredRecords = maintenanceRecords.filter((record) => {
    const matchesSearch = record.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.reportedBy.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLab = filterLab === "all" || record.lab === filterLab
    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    const matchesPriority = filterPriority === "all" || record.priority === filterPriority
    
    return matchesSearch && matchesLab && matchesStatus && matchesPriority
  })

  // Calculate statistics
  const stats = {
    total: maintenanceRecords.length,
    pending: maintenanceRecords.filter(r => r.status === "pending").length,
    inProgress: maintenanceRecords.filter(r => r.status === "in-progress").length,
    completed: maintenanceRecords.filter(r => r.status === "completed").length,
    scheduled: maintenanceRecords.filter(r => r.status === "scheduled").length,
    highPriority: maintenanceRecords.filter(r => r.priority === "high").length,
    totalCost: maintenanceRecords.reduce((sum, r) => sum + r.cost, 0),
    avgCompletion: Math.round(maintenanceRecords.reduce((sum, r) => sum + r.progress, 0) / maintenanceRecords.length)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
            Pemeliharaan Laboratorium
          </span>
          <Wrench className="h-6 w-6 text-orange-500" />
        </h1>
        <p className="text-muted-foreground mt-2">Kelola dan pantau pemeliharaan peralatan laboratorium</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Total Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">{stats.total}</div>
            <p className="text-xs text-blue-700 dark:text-blue-300">{stats.pending} menunggu</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">
              Sedang Berjalan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-50">{stats.inProgress}</div>
            <p className="text-xs text-orange-700 dark:text-orange-300">{stats.scheduled} terjadwal</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-900 dark:text-red-100">
              Prioritas Tinggi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900 dark:text-red-50">{stats.highPriority}</div>
            <p className="text-xs text-red-700 dark:text-red-300">Perlu perhatian</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
              Biaya Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-50">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(stats.totalCost)}
            </div>
            <p className="text-xs text-green-700 dark:text-green-300">Tahun ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-xl">Riwayat Pemeliharaan</CardTitle>
              <p className="text-muted-foreground">Kelola dan pantau status pemeliharaan peralatan</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari peralatan atau masalah..."
                  className="pl-10 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                <Plus className="mr-2 h-4 w-4" />
                Lapor Masalah
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            
            <Select value={filterLab} onValueChange={setFilterLab}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Lab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lab</SelectItem>
                <SelectItem value="Lab Database">Lab Database</SelectItem>
                <SelectItem value="Lab Multimedia">Lab Multimedia</SelectItem>
                <SelectItem value="Lab Jaringan">Lab Jaringan</SelectItem>
                <SelectItem value="Lab Programming">Lab Programming</SelectItem>
                <SelectItem value="Lab AI">Lab AI</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="scheduled">Terjadwal</SelectItem>
                <SelectItem value="in-progress">Berjalan</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Prioritas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Prioritas</SelectItem>
                <SelectItem value="low">Rendah</SelectItem>
                <SelectItem value="medium">Sedang</SelectItem>
                <SelectItem value="high">Tinggi</SelectItem>
                <SelectItem value="critical">Kritis</SelectItem>
              </SelectContent>
            </Select>

            {(filterLab !== "all" || filterStatus !== "all" || filterPriority !== "all") && (
              <Badge variant="secondary">
                {filteredRecords.length} dari {maintenanceRecords.length} record
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Maintenance Records */}
          <div className="space-y-4">
            {filteredRecords.map((record) => {
              const StatusIcon = statusIcons[record.status as keyof typeof statusIcons]
              const EquipmentIcon = equipmentIcons[record.equipmentType as keyof typeof equipmentIcons] || Monitor
              
              return (
                <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <EquipmentIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{record.equipment}</h3>
                            <p className="text-sm text-muted-foreground">{record.lab} - {record.location}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={priorityColors[record.priority as keyof typeof priorityColors]}>
                            {record.priority === 'low' ? 'Rendah' :
                             record.priority === 'medium' ? 'Sedang' :
                             record.priority === 'high' ? 'Tinggi' : 'Kritis'}
                          </Badge>
                          <Badge className={statusColors[record.status as keyof typeof statusColors]}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {record.status === 'pending' ? 'Menunggu' :
                             record.status === 'scheduled' ? 'Terjadwal' :
                             record.status === 'in-progress' ? 'Berjalan' :
                             record.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="font-medium">Masalah:</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">{record.issue}</p>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">{record.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Dilaporkan: {record.reportedBy}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Tanggal: {new Date(record.reportedDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Ditugaskan: {record.assignedTo || 'Belum ditugaskan'}</span>
                        </div>
                        
                        {record.startDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Mulai: {new Date(record.startDate).toLocaleDateString('id-ID')}</span>
                          </div>
                        )}
                        
                        {record.estimatedCompletion && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Target: {new Date(record.estimatedCompletion).toLocaleDateString('id-ID')}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Biaya:</span>
                          <span className="font-medium">
                            {record.cost > 0 ? 
                              new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0
                              }).format(record.cost) : 
                              'Belum diestimasi'
                            }
                          </span>
                        </div>
                      </div>
                      
                      {/* Progress */}
                      {record.status === 'in-progress' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{record.progress}%</span>
                          </div>
                          <Progress value={record.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
            
            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tidak ada record pemeliharaan</h3>
                <p className="text-muted-foreground">Coba ubah filter pencarian atau tambah laporan baru</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}