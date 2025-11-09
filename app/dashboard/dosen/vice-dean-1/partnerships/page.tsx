"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Building2, Globe, Users, FileText, ArrowUpRight, Download, Search, Eye, X, ChevronLeft, ChevronRight } from "lucide-react"

interface Partnership {
  id: number
  name: string
  type: "Industri" | "Akademisi" | "Pemerintah" | "Internasional"
  category: string
  status: "Aktif" | "Perpanjangan" | "Perencanaan"
  students: number
  projects: number
  since: string
  program: string
  country?: string
}

const mockPartnerships: Partnership[] = [
  { id: 1, name: "PT. Telkom Indonesia", type: "Industri", category: "Telekomunikasi", status: "Aktif", students: 45, projects: 8, since: "2020", program: "Magang & Penelitian" },
  { id: 2, name: "PT. Bank Central Asia", type: "Industri", category: "Perbankan", status: "Aktif", students: 32, projects: 5, since: "2019", program: "Magang" },
  { id: 3, name: "PT. Astra International", type: "Industri", category: "Otomotif", status: "Aktif", students: 28, projects: 4, since: "2021", program: "Magang & Training" },
  { id: 4, name: "PT. Pertamina", type: "Industri", category: "Energi", status: "Perpanjangan", students: 15, projects: 3, since: "2018", program: "Penelitian" },
  { id: 5, name: "PT. Tokopedia", type: "Industri", category: "E-Commerce", status: "Aktif", students: 22, projects: 6, since: "2022", program: "Magang & Bootcamp" },
  { id: 6, name: "Institut Teknologi Bandung", type: "Akademisi", category: "Perguruan Tinggi", status: "Aktif", students: 12, projects: 5, since: "2019", program: "Penelitian Bersama" },
  { id: 7, name: "Universitas Indonesia", type: "Akademisi", category: "Perguruan Tinggi", status: "Aktif", students: 8, projects: 3, since: "2020", program: "Pertukaran Dosen" },
  { id: 8, name: "Institut Teknologi Sepuluh Nopember", type: "Akademisi", category: "Perguruan Tinggi", status: "Perencanaan", students: 5, projects: 2, since: "2023", program: "Joint Degree" },
  { id: 9, name: "Kementerian Komunikasi dan Informatika", type: "Pemerintah", category: "Kementerian", status: "Aktif", students: 35, projects: 4, since: "2021", program: "Digital Talent Scholarship" },
  { id: 10, name: "Badan Penelitian dan Pengembangan Daerah", type: "Pemerintah", category: "Lembaga", status: "Aktif", students: 10, projects: 3, since: "2022", program: "Riset Daerah" },
  { id: 11, name: "Dinas Pendidikan Provinsi", type: "Pemerintah", category: "Dinas", status: "Aktif", students: 15, projects: 2, since: "2020", program: "Pelatihan Guru" },
  { id: 12, name: "National University of Singapore", type: "Internasional", category: "Perguruan Tinggi", status: "Aktif", students: 8, projects: 3, since: "2020", program: "Student Exchange", country: "Singapura" },
  { id: 13, name: "University of Melbourne", type: "Internasional", category: "Perguruan Tinggi", status: "Aktif", students: 5, projects: 2, since: "2021", program: "Research Collaboration", country: "Australia" },
  { id: 14, name: "Waseda University", type: "Internasional", category: "Perguruan Tinggi", status: "Aktif", students: 6, projects: 3, since: "2019", program: "Joint Research", country: "Jepang" },
  { id: 15, name: "Technical University of Munich", type: "Internasional", category: "Perguruan Tinggi", status: "Aktif", students: 4, projects: 2, since: "2022", program: "Dual Degree", country: "Jerman" },
]

// Utility function to get initials from name
const getInitials = (name: string) => {
  const words = name.split(' ').filter(word => word.length > 0)
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

// Utility function to get consistent color based on string
const getAvatarColor = (str: string) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-violet-500',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Utility function to get badge color for category
const getCategoryBadgeColor = (category: string) => {
  const colorMap: Record<string, string> = {
    'Telekomunikasi': 'bg-blue-100 text-blue-700 border-blue-200',
    'Perbankan': 'bg-green-100 text-green-700 border-green-200',
    'Otomotif': 'bg-purple-100 text-purple-700 border-purple-200',
    'Energi': 'bg-orange-100 text-orange-700 border-orange-200',
    'E-Commerce': 'bg-pink-100 text-pink-700 border-pink-200',
    'Perguruan Tinggi': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Kementerian': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'Lembaga': 'bg-teal-100 text-teal-700 border-teal-200',
    'Dinas': 'bg-violet-100 text-violet-700 border-violet-200',
  }
  return colorMap[category] || 'bg-gray-100 text-gray-700 border-gray-200'
}

export default function PartnershipsPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>(mockPartnerships)
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleViewDetail = (partnership: Partnership) => {
    setSelectedPartnership(partnership)
    setIsDialogOpen(true)
  }

  const filterPartnerships = (partnershipList: Partnership[]) => {
    let filtered = partnershipList

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus)
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.program.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const filteredPartnerships = filterPartnerships(partnerships)
  const totalPages = Math.ceil(filteredPartnerships.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPartnerships = filteredPartnerships.slice(startIndex, endIndex)

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedType("all")
    setSelectedStatus("all")
    setCurrentPage(1)
  }

  const stats = {
    total: partnerships.filter(p => p.status === "Aktif").length,
    international: partnerships.filter(p => p.type === "Internasional").length,
    mou: partnerships.filter(p => p.status === "Aktif").length,
    students: partnerships.reduce((sum, p) => sum + p.students, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kemitraan & Kerjasama</h1>
          <p className="text-sm text-muted-foreground">Kelola kemitraan dengan industri, akademisi, dan institusi lainnya</p>
        </div>
        <Button variant="outline" size="default" className="h-10">
          <Download className="h-4 w-4 mr-2" />
          Ekspor
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-medium">Total Mitra Aktif</CardTitle>
            <div className="p-2.5 bg-blue-500/10 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-700">{stats.total}</div>
            <p className="text-sm text-blue-600/80 flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-4 w-4" />
              +8 dari tahun lalu
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-medium">Kerjasama Internasional</CardTitle>
            <div className="p-2.5 bg-purple-500/10 rounded-lg">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-700">{stats.international}</div>
            <p className="text-sm text-purple-600/80 mt-2">8 negara berbeda</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-green-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-medium">MoU Aktif</CardTitle>
            <div className="p-2.5 bg-green-500/10 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-700">{stats.mou}</div>
            <p className="text-sm text-green-600/80 mt-2">7 akan berakhir tahun ini</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-medium">Mahasiswa Terlibat</CardTitle>
            <div className="p-2.5 bg-amber-500/10 rounded-lg">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-700">{stats.students}</div>
            <p className="text-sm text-amber-600/80 mt-2">Magang & pertukaran</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Daftar Kemitraan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama mitra, kategori, atau program..."
                className="pl-11 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[220px] h-12 text-base">
                <SelectValue placeholder="Pilih Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-base">Semua Tipe</SelectItem>
                <SelectItem value="Industri" className="text-base">Industri</SelectItem>
                <SelectItem value="Akademisi" className="text-base">Akademisi</SelectItem>
                <SelectItem value="Pemerintah" className="text-base">Pemerintah</SelectItem>
                <SelectItem value="Internasional" className="text-base">Internasional</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[220px] h-12 text-base">
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-base">Semua Status</SelectItem>
                <SelectItem value="Aktif" className="text-base">Aktif</SelectItem>
                <SelectItem value="Perpanjangan" className="text-base">Perpanjangan</SelectItem>
                <SelectItem value="Perencanaan" className="text-base">Perencanaan</SelectItem>
              </SelectContent>
            </Select>
            {(searchQuery || selectedType !== "all" || selectedStatus !== "all") && (
              <Button variant="outline" onClick={resetFilters} className="h-12 px-6 text-base">
                <X className="h-5 w-5 mr-2" />
                Reset
              </Button>
            )}
          </div>

          {/* Table */}
          <div className="rounded-lg border-2">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-sm font-semibold h-14">Nama Mitra</TableHead>
                  <TableHead className="text-sm font-semibold h-14">Tipe</TableHead>
                  <TableHead className="text-sm font-semibold h-14">Kategori</TableHead>
                  <TableHead className="text-sm font-semibold h-14">Status</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Mahasiswa</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Proyek</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Sejak</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPartnerships.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      <div className="flex flex-col items-center gap-3">
                        <Building2 className="h-12 w-12 text-muted-foreground/50" />
                        <p className="text-base font-medium">Tidak ada data kemitraan ditemukan</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedPartnerships.map((partnership) => (
                    <TableRow key={partnership.id} className="hover:bg-muted/30 h-16">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${getAvatarColor(partnership.name)} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                            {getInitials(partnership.name)}
                          </div>
                          <span className="font-semibold text-sm">{partnership.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <Badge variant="outline" className="text-sm px-3 py-1 border">
                          {partnership.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        <Badge className={`text-sm px-3 py-1 border ${getCategoryBadgeColor(partnership.category)}`}>
                          {partnership.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        <Badge
                          className={`text-sm px-3 py-1 border ${
                            partnership.status === "Aktif"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : partnership.status === "Perpanjangan"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {partnership.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-sm font-medium">{partnership.students}</TableCell>
                      <TableCell className="text-center text-sm font-medium">{partnership.projects}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-blue-50 text-blue-700 border border-blue-200 text-sm px-3 py-1">
                          {partnership.since}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(partnership)}
                          className="h-9 px-4"
                        >
                          <Eye className="h-5 w-5 mr-2" />
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredPartnerships.length > 0 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-muted-foreground font-medium">
                Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredPartnerships.length)} dari {filteredPartnerships.length} data
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-10 px-4"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="h-10 w-10 text-base"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-10 px-4"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Detail Kemitraan</DialogTitle>
            <DialogDescription>Informasi lengkap tentang mitra</DialogDescription>
          </DialogHeader>
          {selectedPartnership && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Nama Mitra</p>
                  <p className="text-sm font-medium">{selectedPartnership.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tipe</p>
                  <Badge variant="outline">{selectedPartnership.type}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Kategori</p>
                  <p className="text-sm">{selectedPartnership.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <Badge variant={selectedPartnership.status === "Aktif" ? "default" : "secondary"}>
                    {selectedPartnership.status}
                  </Badge>
                </div>
                {selectedPartnership.country && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Negara</p>
                    <p className="text-sm">{selectedPartnership.country}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Sejak</p>
                  <p className="text-sm">{selectedPartnership.since}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Program Kerjasama</p>
                <p className="text-sm">{selectedPartnership.program}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <p className="text-xs text-blue-600 font-medium">Mahasiswa Terlibat</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{selectedPartnership.students}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <p className="text-xs text-green-600 font-medium">Proyek Berjalan</p>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{selectedPartnership.projects}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
