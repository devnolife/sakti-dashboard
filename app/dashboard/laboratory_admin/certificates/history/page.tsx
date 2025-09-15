"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ClipboardList,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Users,
  FileText,
  Star,
  TrendingUp,
  BarChart3,
  Award,
  Clock,
  CheckCircle,
  User,
  GraduationCap
} from "lucide-react"

const certificateHistory = [
  {
    id: "cert-001",
    title: "Juara 1 Programming Contest 2024",
    recipient: {
      name: "Ahmad Fauzi",
      nim: "12345678",
      program: "Informatika"
    },
    template: "Modern",
    category: "Achievement",
    createdDate: "2024-01-15",
    createdBy: "Admin Lab",
    downloadCount: 3,
    status: "active",
    event: "Programming Contest 2024",
    description: "Penghargaan untuk juara pertama dalam kompetisi programming tingkat nasional"
  },
  {
    id: "cert-002", 
    title: "Best Presenter Workshop AI",
    recipient: {
      name: "Siti Nurhaliza",
      nim: "23456789",
      program: "Sistem Informasi"
    },
    template: "Academic",
    category: "Workshop",
    createdDate: "2024-01-14",
    createdBy: "Dr. Maya Sari",
    downloadCount: 2,
    status: "active",
    event: "AI Workshop Series",
    description: "Penghargaan untuk presenter terbaik dalam workshop artificial intelligence"
  },
  {
    id: "cert-003",
    title: "Outstanding Student Achievement",
    recipient: {
      name: "Budi Santoso",
      nim: "34567890", 
      program: "Informatika"
    },
    template: "Classic",
    category: "Academic",
    createdDate: "2024-01-13",
    createdBy: "Admin Lab",
    downloadCount: 5,
    status: "active",
    event: "Academic Excellence 2024",
    description: "Penghargaan untuk mahasiswa berprestasi dengan IPK tertinggi"
  },
  {
    id: "cert-004",
    title: "Completion Certificate - Web Dev Bootcamp",
    recipient: {
      name: "Dewi Anggraini",
      nim: "45678901",
      program: "Sistem Informasi"
    },
    template: "Corporate",
    category: "Training",
    createdDate: "2024-01-12",
    createdBy: "Training Team",
    downloadCount: 1,
    status: "active",
    event: "Web Development Bootcamp",
    description: "Sertifikat penyelesaian bootcamp web development selama 3 bulan"
  },
  {
    id: "cert-005",
    title: "Innovation Award - Smart Campus",
    recipient: {
      name: "Rudi Hartono",
      nim: "56789012",
      program: "Informatika"
    },
    template: "Creative", 
    category: "Innovation",
    createdDate: "2024-01-11",
    createdBy: "Innovation Team",
    downloadCount: 4,
    status: "active",
    event: "Smart Campus Innovation",
    description: "Penghargaan inovasi terbaik dalam pengembangan sistem smart campus"
  },
  {
    id: "cert-006",
    title: "Research Excellence Certificate",
    recipient: {
      name: "Maya Sari",
      nim: "67890123",
      program: "Data Science"
    },
    template: "Academic",
    category: "Research",
    createdDate: "2024-01-10",
    createdBy: "Research Center",
    downloadCount: 2,
    status: "active",
    event: "Research Symposium 2024",
    description: "Sertifikat untuk penelitian terbaik dalam bidang machine learning"
  }
]

const categoryColors = {
  Achievement: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Academic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300", 
  Workshop: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Training: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Innovation: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  Research: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
}

export default function CertificateHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("all")

  const filteredHistory = certificateHistory.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.recipient.nim.includes(searchQuery) ||
                         cert.event.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || cert.category === selectedCategory
    const matchesTemplate = selectedTemplate === "all" || cert.template === selectedTemplate
    
    // Simple period filtering (last 7 days, 30 days, etc.)
    let matchesPeriod = true
    if (selectedPeriod !== "all") {
      const certDate = new Date(cert.createdDate)
      const now = new Date()
      const daysDiff = Math.floor((now.getTime() - certDate.getTime()) / (1000 * 60 * 60 * 24))
      
      switch (selectedPeriod) {
        case "7days":
          matchesPeriod = daysDiff <= 7
          break
        case "30days":
          matchesPeriod = daysDiff <= 30
          break
        case "90days":
          matchesPeriod = daysDiff <= 90
          break
      }
    }
    
    return matchesSearch && matchesCategory && matchesTemplate && matchesPeriod
  })

  const stats = {
    total: certificateHistory.length,
    thisMonth: certificateHistory.filter(cert => {
      const certDate = new Date(cert.createdDate)
      const now = new Date()
      return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear()
    }).length,
    totalDownloads: certificateHistory.reduce((sum, cert) => sum + cert.downloadCount, 0),
    uniqueRecipients: new Set(certificateHistory.map(cert => cert.recipient.nim)).size
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg"></div>
        <div className="relative p-6">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              Riwayat Sertifikat
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">Lihat dan kelola semua sertifikat yang telah dibuat</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-green-500" />
              Total Sertifikat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Semua sertifikat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisMonth}</div>
            <p className="text-xs text-muted-foreground">Sertifikat baru</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Download className="h-4 w-4 text-purple-500" />
              Total Download
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloads}</div>
            <p className="text-xs text-muted-foreground">Kali diunduh</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-500" />
              Penerima Unik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueRecipients}</div>
            <p className="text-xs text-muted-foreground">Mahasiswa berbeda</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Daftar Sertifikat
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analisis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <div>
                  <CardTitle>Riwayat Sertifikat</CardTitle>
                  <p className="text-muted-foreground">Semua sertifikat yang telah dibuat dan diterbitkan</p>
                </div>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Download className="mr-2 h-4 w-4" />
                  Export Laporan
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari sertifikat, nama, NIM, atau event..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-[150px]">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="Achievement">Achievement</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Innovation">Innovation</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="w-full lg:w-[150px]">
                    <SelectValue placeholder="Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Template</SelectItem>
                    <SelectItem value="Modern">Modern</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Classic">Classic</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-full lg:w-[150px]">
                    <SelectValue placeholder="Periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Periode</SelectItem>
                    <SelectItem value="7days">7 Hari Terakhir</SelectItem>
                    <SelectItem value="30days">30 Hari Terakhir</SelectItem>
                    <SelectItem value="90days">90 Hari Terakhir</SelectItem>
                  </SelectContent>
                </Select>

                {(searchQuery || selectedCategory !== "all" || selectedTemplate !== "all" || selectedPeriod !== "all") && (
                  <Badge variant="secondary">
                    {filteredHistory.length} dari {certificateHistory.length} sertifikat
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {filteredHistory.map((cert) => (
                  <Card key={cert.id} className="hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="h-12 w-12 bg-gradient-to-br from-green-400 to-emerald-400">
                            <AvatarFallback className="text-white font-semibold">
                              {cert.recipient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{cert.title}</h3>
                                <p className="text-sm text-muted-foreground">{cert.description}</p>
                              </div>
                              <Badge className={categoryColors[cert.category as keyof typeof categoryColors]}>
                                {cert.category}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">{cert.recipient.name}</div>
                                  <div className="text-muted-foreground">{cert.recipient.nim}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">{cert.recipient.program}</div>
                                  <div className="text-muted-foreground">Program Studi</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">{cert.template}</div>
                                  <div className="text-muted-foreground">Template</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">{cert.createdDate}</div>
                                  <div className="text-muted-foreground">Tanggal dibuat</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Dibuat oleh: {cert.createdBy}</span>
                                <span className="flex items-center gap-1">
                                  <Download className="h-3 w-3" />
                                  {cert.downloadCount}x downloaded
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredHistory.length === 0 && (
                  <div className="text-center py-12">
                    <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Tidak ada sertifikat ditemukan</h3>
                    <p className="text-muted-foreground">Coba ubah filter pencarian atau buat sertifikat baru</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Kategori Sertifikat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.keys(categoryColors).map(category => {
                    const count = certificateHistory.filter(cert => cert.category === category).length
                    const percentage = Math.round((count / certificateHistory.length) * 100)
                    
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                            category === 'Achievement' ? 'from-yellow-400 to-yellow-600' :
                            category === 'Academic' ? 'from-blue-400 to-blue-600' :
                            category === 'Workshop' ? 'from-green-400 to-green-600' :
                            category === 'Training' ? 'from-purple-400 to-purple-600' :
                            category === 'Innovation' ? 'from-pink-400 to-pink-600' :
                            'from-indigo-400 to-indigo-600'
                          }`}></div>
                          <span className="font-medium">{category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${
                                category === 'Achievement' ? 'from-yellow-400 to-yellow-600' :
                                category === 'Academic' ? 'from-blue-400 to-blue-600' :
                                category === 'Workshop' ? 'from-green-400 to-green-600' :
                                category === 'Training' ? 'from-purple-400 to-purple-600' :
                                category === 'Innovation' ? 'from-pink-400 to-pink-600' :
                                'from-indigo-400 to-indigo-600'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-16 text-right">
                            {count} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}