"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Award, FileText, Users, ArrowUpRight, Download, Plus, BookOpen, DollarSign, Search, Filter, TrendingUp, Building2, GraduationCap } from "lucide-react"

export default function ResearchPKMPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeStatus, setActiveStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Data
  const researchData = [
    { id: 1, title: 'AI untuk Smart City', researcher: 'Dr. Ahmad Fauzi', category: 'penelitian', status: 'active', progress: 65, color: 'from-blue-500 to-cyan-500', participants: 5, funding: '250K', year: '2024' },
    { id: 2, title: 'Struktur Bangunan Tahan Gempa', researcher: 'Dr. Siti Nurhaliza', category: 'penelitian', status: 'active', progress: 42, color: 'from-green-500 to-emerald-500', participants: 4, funding: '180K', year: '2024' },
    { id: 3, title: 'IoT untuk Pertanian', researcher: 'Dr. Budi Santoso', category: 'penelitian', status: 'active', progress: 78, color: 'from-purple-500 to-pink-500', participants: 6, funding: '200K', year: '2024' },
    { id: 4, title: 'Energi Terbarukan', researcher: 'Dr. Dewi Lestari', category: 'penelitian', status: 'proposal', progress: 20, color: 'from-amber-500 to-orange-500', participants: 3, funding: '150K', year: '2024' },
    { id: 5, title: 'Arsitektur Berkelanjutan', researcher: 'Dr. Eko Prasetyo', category: 'penelitian', status: 'completed', progress: 100, color: 'from-indigo-500 to-blue-500', participants: 4, funding: '220K', year: '2023' },
    { id: 6, title: 'Smart Waste Management System', team: 'Tim Informatika 1', category: 'pkm', type: 'PKM-RSH', status: 'review', progress: 30, color: 'from-cyan-500 to-blue-500', participants: 5, funding: '15K', year: '2024' },
    { id: 7, title: 'Sistem Monitoring Jembatan', team: 'Tim Teknik Sipil 2', category: 'pkm', type: 'PKM-KC', status: 'approved', progress: 50, color: 'from-teal-500 to-green-500', participants: 4, funding: '12K', year: '2024' },
    { id: 8, title: 'Aplikasi Edukasi AR', team: 'Tim Informatika 3', category: 'pkm', type: 'PKM-M', status: 'active', progress: 60, color: 'from-violet-500 to-purple-500', participants: 5, funding: '18K', year: '2024' },
    { id: 9, title: 'Sistem Hidroponik Otomatis', team: 'Tim Pertanian 1', category: 'pkm', type: 'PKM-K', status: 'active', progress: 45, color: 'from-lime-500 to-green-500', participants: 4, funding: '10K', year: '2024' },
  ]

  const publicationData = [
    { title: 'Machine Learning for Disaster Prediction', author: 'Dr. Ahmad Fauzi', journal: 'IEEE Access', type: 'Q1', year: '2024', category: 'publikasi' },
    { title: 'Sustainable Architecture Design', author: 'Dr. Eko Prasetyo', journal: 'Journal of Architecture', type: 'Q2', year: '2024', category: 'publikasi' },
    { title: 'IoT in Smart Farming', author: 'Dr. Budi Santoso', journal: 'Sensors Journal', type: 'Q1', year: '2024', category: 'publikasi' },
    { title: 'Earthquake Resistant Building', author: 'Dr. Siti Nurhaliza', journal: 'Civil Engineering', type: 'Q2', year: '2023', category: 'publikasi' },
  ]

  // Filter data
  const filteredData = researchData.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory
    const matchStatus = activeStatus === 'all' || item.status === activeStatus
    const matchSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.researcher && item.researcher.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.team && item.team.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchCategory && matchStatus && matchSearch
  })

  // Stats
  const totalActive = researchData.filter(d => d.status === 'active').length
  const totalPenelitian = researchData.filter(d => d.category === 'penelitian').length
  const totalPKM = researchData.filter(d => d.category === 'pkm').length
  const totalPublikasi = publicationData.length
  const totalFunding = researchData.reduce((sum, d) => sum + parseFloat(d.funding.replace('K', '')), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Penelitian & PKM</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola penelitian dan program kreativitas mahasiswa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Ekspor
          </Button>
          <Button size="sm" className="h-9 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Program
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-blue-900">Total Program</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{researchData.length}</div>
            <p className="text-xs text-blue-700/80 mt-1">Semua kategori</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-purple-900">Penelitian</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{totalPenelitian}</div>
            <p className="text-xs text-purple-700/80 mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              Aktif & proposal
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-indigo-900">PKM</CardTitle>
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-900">{totalPKM}</div>
            <p className="text-xs text-indigo-700/80 mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              Program mahasiswa
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-green-900">Publikasi</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{totalPublikasi}</div>
            <p className="text-xs text-green-700/80 mt-1">Tahun ini</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-amber-900">Total Dana</CardTitle>
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900">{totalFunding.toFixed(0)}K</div>
            <p className="text-xs text-amber-700/80 mt-1">Total pendanaan</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari judul, peneliti, atau tim..."
                className="pl-10 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-full md:w-[200px] h-10">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="penelitian">Penelitian</SelectItem>
                <SelectItem value="pkm">PKM</SelectItem>
              </SelectContent>
            </Select>
            <Select value={activeStatus} onValueChange={setActiveStatus}>
              <SelectTrigger className="w-full md:w-[200px] h-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="approved">Disetujui</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {filteredData.length} Program Ditemukan
          </h2>
          {(activeCategory !== 'all' || activeStatus !== 'all' || searchQuery !== '') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setActiveCategory('all')
                setActiveStatus('all')
                setSearchQuery('')
              }}
            >
              Reset Filter
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((item) => (
            <Card key={item.id} className={`overflow-hidden border-0 bg-gradient-to-br ${item.color} hover:shadow-xl transition-all cursor-pointer`}>
              <CardHeader className="pb-3 text-white">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <Badge className="bg-white/20 text-white border-white/30 text-xs mb-2">
                      {item.category === 'penelitian' ? '🔬 Penelitian' : '🎓 PKM'}
                      {item.type && ` - ${item.type}`}
                    </Badge>
                    <CardTitle className="text-base font-semibold leading-tight">{item.title}</CardTitle>
                  </div>
                  <Badge
                    className={`
                      ${item.status === 'active' ? 'bg-green-500/30' : ''}
                      ${item.status === 'proposal' ? 'bg-yellow-500/30' : ''}
                      ${item.status === 'review' ? 'bg-blue-500/30' : ''}
                      ${item.status === 'approved' ? 'bg-emerald-500/30' : ''}
                      ${item.status === 'completed' ? 'bg-gray-500/30' : ''}
                      text-white border-white/30 text-xs shrink-0
                    `}
                  >
                    {item.status === 'active' && 'Aktif'}
                    {item.status === 'proposal' && 'Proposal'}
                    {item.status === 'review' && 'Review'}
                    {item.status === 'approved' && 'Disetujui'}
                    {item.status === 'completed' && 'Selesai'}
                  </Badge>
                </div>
                <p className="text-sm opacity-90">
                  {item.researcher || item.team}
                </p>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs opacity-90">Progress</span>
                    <span className="text-sm font-bold">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                  <div className="flex items-center gap-2 text-xs opacity-90">
                    <Users className="h-4 w-4" />
                    <span>{item.participants} anggota</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-90">
                    <DollarSign className="h-4 w-4" />
                    <span>{item.funding}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Tidak ada data ditemukan</p>
              <p className="text-sm">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          </Card>
        )}
      </div>

      {/* Publications Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Publikasi Terbaru</h2>
          <Button variant="outline" size="sm">
            Lihat Semua
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {publicationData.map((pub, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold leading-tight mb-2">{pub.title}</h3>
                    <p className="text-xs text-muted-foreground">{pub.author}</p>
                  </div>
                  <Badge className={`${pub.type === 'Q1' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} text-xs shrink-0`}>
                    {pub.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="h-3.5 w-3.5" />
                    <span>{pub.journal}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{pub.year}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Status Program</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Aktif', count: researchData.filter(d => d.status === 'active').length, color: 'bg-green-500' },
              { label: 'Proposal', count: researchData.filter(d => d.status === 'proposal').length, color: 'bg-yellow-500' },
              { label: 'Review', count: researchData.filter(d => d.status === 'review').length, color: 'bg-blue-500' },
              { label: 'Selesai', count: researchData.filter(d => d.status === 'completed').length, color: 'bg-gray-500' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-24 text-sm font-medium">{stat.label}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className={`h-full ${stat.color} flex items-center justify-end px-3`}
                    style={{ width: `${(stat.count / researchData.length) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">{stat.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Tipe PKM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { type: 'PKM-RSH', count: researchData.filter(d => d.type === 'PKM-RSH').length, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
              { type: 'PKM-KC', count: researchData.filter(d => d.type === 'PKM-KC').length, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
              { type: 'PKM-M', count: researchData.filter(d => d.type === 'PKM-M').length, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
              { type: 'PKM-K', count: researchData.filter(d => d.type === 'PKM-K').length, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
            ].map((pkm, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-24 text-sm font-medium">{pkm.type}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className={`h-full ${pkm.color} flex items-center justify-end px-3`}
                    style={{ width: `${pkm.count > 0 ? (pkm.count / totalPKM) * 100 : 0}%` }}
                  >
                    {pkm.count > 0 && (
                      <span className="text-xs font-medium text-white">{pkm.count}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Publikasi per Quartile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { quartile: 'Q1', count: publicationData.filter(p => p.type === 'Q1').length, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
              { quartile: 'Q2', count: publicationData.filter(p => p.type === 'Q2').length, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
            ].map((pub, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-24 text-sm font-medium">{pub.quartile}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className={`h-full ${pub.color} flex items-center justify-end px-3`}
                    style={{ width: `${(pub.count / totalPublikasi) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">{pub.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
