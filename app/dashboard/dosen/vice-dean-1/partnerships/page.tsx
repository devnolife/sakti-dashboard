"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Plus, Globe, Users, FileText, ArrowUpRight, Download, Briefcase, GraduationCap } from "lucide-react"

export default function PartnershipsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kemitraan & Kerjasama</h1>
          <p className="text-xs text-muted-foreground">Kelola kemitraan dengan industri, akademisi, dan institusi lainnya</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Download className="h-3 w-3 mr-1" />
            Ekspor
          </Button>
          <Button size="sm" className="h-8 text-xs bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
            <Plus className="h-3 w-3 mr-1" />
            Tambah Mitra
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Total Mitra Aktif</CardTitle>
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <Building2 className="h-3.5 w-3.5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-700">45</div>
            <p className="text-[10px] text-blue-600/80 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              +8 dari tahun lalu
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Kerjasama Internasional</CardTitle>
            <div className="p-1.5 bg-purple-500/10 rounded-lg">
              <Globe className="h-3.5 w-3.5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-700">12</div>
            <p className="text-[10px] text-purple-600/80">8 negara berbeda</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-green-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">MoU Aktif</CardTitle>
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <FileText className="h-3.5 w-3.5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-700">38</div>
            <p className="text-[10px] text-green-600/80">7 akan berakhir tahun ini</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Mahasiswa Terlibat</CardTitle>
            <div className="p-1.5 bg-amber-500/10 rounded-lg">
              <Users className="h-3.5 w-3.5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-amber-700">234</div>
            <p className="text-[10px] text-amber-600/80">Magang & pertukaran</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="industry" className="space-y-3">
        <TabsList className="h-9">
          <TabsTrigger value="industry" className="text-xs">Industri</TabsTrigger>
          <TabsTrigger value="academia" className="text-xs">Akademisi</TabsTrigger>
          <TabsTrigger value="government" className="text-xs">Pemerintah</TabsTrigger>
          <TabsTrigger value="international" className="text-xs">Internasional</TabsTrigger>
        </TabsList>

        <TabsContent value="industry" className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "PT. Telkom Indonesia", type: "Telekomunikasi", status: "active", students: 45, since: "2020", color: "from-blue-500 to-cyan-500" },
              { name: "PT. Bank Central Asia", type: "Perbankan", status: "active", students: 32, since: "2019", color: "from-green-500 to-emerald-500" },
              { name: "PT. Astra International", type: "Otomotif", status: "active", students: 28, since: "2021", color: "from-purple-500 to-pink-500" },
              { name: "PT. Pertamina", type: "Energi", status: "renewal", students: 15, since: "2018", color: "from-amber-500 to-orange-500" },
              { name: "PT. Tokopedia", type: "E-Commerce", status: "active", students: 22, since: "2022", color: "from-indigo-500 to-blue-500" },
            ].map((partner, i) => (
              <Card key={i} className={`overflow-hidden border-0 bg-gradient-to-br ${partner.color}`}>
                <CardHeader className="pb-2 text-white">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-semibold leading-tight">{partner.name}</CardTitle>
                    <Badge className={`${partner.status === 'active' ? 'bg-white/20' : 'bg-yellow-500/30'} text-white border-white/30 text-[10px]`}>
                      {partner.status === 'active' ? 'Aktif' : 'Perpanjangan'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-white space-y-2">
                  <p className="text-xs opacity-90">{partner.type}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/20">
                    <div className="flex items-center gap-1 text-[10px]">
                      <Users className="h-3 w-3" />
                      <span>{partner.students} mhs</span>
                    </div>
                    <span className="text-[10px] opacity-90">Sejak {partner.since}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="academia" className="space-y-3">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Kemitraan Akademisi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "Institut Teknologi Bandung", program: "Penelitian Bersama", status: "active", projects: 5 },
                { name: "Universitas Indonesia", program: "Pertukaran Dosen", status: "active", projects: 3 },
                { name: "Institut Teknologi Sepuluh Nopember", program: "Joint Degree", status: "planning", projects: 2 },
              ].map((partner, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium">{partner.name}</p>
                      <Badge variant={partner.status === 'active' ? 'default' : 'outline'} className="text-[10px]">
                        {partner.status === 'active' ? 'Aktif' : 'Perencanaan'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{partner.program} • {partner.projects} proyek</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs">Detail</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="government" className="space-y-3">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Kemitraan Pemerintah</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "Kementerian Komunikasi dan Informatika", program: "Digital Talent Scholarship" },
                { name: "Badan Penelitian dan Pengembangan Daerah", program: "Riset Daerah" },
                { name: "Dinas Pendidikan Provinsi", program: "Pelatihan Guru" },
              ].map((partner, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">Program: {partner.program}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-[10px]">Aktif</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="international" className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { name: "National University of Singapore", country: "Singapura", program: "Student Exchange", students: 8, color: "from-red-500 to-orange-500" },
              { name: "University of Melbourne", country: "Australia", program: "Research Collaboration", students: 5, color: "from-blue-500 to-cyan-500" },
              { name: "Waseda University", country: "Jepang", program: "Joint Research", students: 6, color: "from-purple-500 to-pink-500" },
              { name: "Technical University of Munich", country: "Jerman", program: "Dual Degree", students: 4, color: "from-green-500 to-emerald-500" },
            ].map((partner, i) => (
              <Card key={i} className={`overflow-hidden border-0 bg-gradient-to-br ${partner.color}`}>
                <CardHeader className="pb-2 text-white">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-semibold leading-tight">{partner.name}</CardTitle>
                    <Badge className="bg-white/20 text-white border-white/30 text-[10px]">
                      {partner.country}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-white space-y-2">
                  <p className="text-xs opacity-90">{partner.program}</p>
                  <div className="flex items-center gap-1 text-[10px] pt-2 border-t border-white/20">
                    <Users className="h-3 w-3" />
                    <span>{partner.students} mahasiswa terlibat</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                  <CardTitle className="text-sm">Pertukaran Pelajar</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-700">23</p>
                <p className="text-xs text-muted-foreground mt-1">Mahasiswa tahun ini</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-indigo-600" />
                  <CardTitle className="text-sm">Penelitian Internasional</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-indigo-700">9</p>
                <p className="text-xs text-muted-foreground mt-1">Proyek aktif</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
