"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Building,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  RefreshCw,
  User,
  ChevronRight,
} from "lucide-react"
import { mockKkpLocations, mockKkpTeams, mockStudentKkpRecords } from "./mock-data"
import KkpLocationSubmissionsTable from "./kkp-location-submissions-table"
import KkpTeamSubmissionsTable from "./kkp-team-submissions-table"
import StudentKkpStatusTable from "./student-kkp-status-table"
import CompletedKkpRecordsTable from "./completed-kkp-records-table"

export default function KkpLocationsDashboard() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showAddLocationDialog, setShowAddLocationDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Form state for adding a new location
  const [newLocation, setNewLocation] = useState({
    name: "",
    type: "company",
    city: "",
    province: "",
    address: "",
    contactPerson: "",
    contactPosition: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    description: "",
  })

  // Stats from mock data
  const pendingLocations = mockKkpLocations.filter((loc) => loc.status === "pending").length
  const approvedLocations = mockKkpLocations.filter((loc) => loc.status === "approved").length
  const pendingTeams = mockKkpTeams.filter((team) => team.status === "pending").length
  const activeStudents = mockStudentKkpRecords.filter((record) => record.status === "in-progress").length
  const completedStudents = mockStudentKkpRecords.filter((record) => record.status === "completed").length

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Data refreshed",
        description: "The latest KKP data has been loaded.",
      })
    }, 1000)
  }

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!newLocation.name || !newLocation.city || !newLocation.contactPerson || !newLocation.contactEmail) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate adding a new location
    toast({
      title: "Location added",
      description: `${newLocation.name} has been added as a KKP location.`,
    })

    // Reset form and close dialog
    setNewLocation({
      name: "",
      type: "company",
      city: "",
      province: "",
      address: "",
      contactPerson: "",
      contactPosition: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      description: "",
    })
    setShowAddLocationDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Dashboard Kuliah Kerja Profesi</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Kelola kegiatan dan aktivitas Kerja Praktik (KKP) mahasiswa</p>
        </div>

        <div className="flex w-full gap-2 md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari lokasi atau mahasiswa..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowAddLocationDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Lokasi
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Lokasi</TabsTrigger>
          <TabsTrigger value="teams">Tim</TabsTrigger>
          <TabsTrigger value="students">Mahasiswa</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Stats Cards Row */}
            <Card className="overflow-hidden gradient-border card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Lokasi Pending</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10">
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingLocations}</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">Menunggu persetujuan</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden gradient-border card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Lokasi Aktif</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10">
                  <Building className="w-4 h-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{approvedLocations}</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">Tersedia untuk KKP</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden gradient-border card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Tim KKP Aktif</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingTeams}</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">Menunggu persetujuan</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row - Larger Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Recent Locations Card */}
            <Card className="overflow-hidden gradient-border card-hover md:row-span-2">
              <CardHeader>
                <CardTitle>Lokasi Terbaru</CardTitle>
                <CardDescription>Lokasi KKP yang baru ditambahkan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockKkpLocations.slice(0, 5).map((location) => (
                  <div key={location.id} className="flex items-start gap-4 p-3 border rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{location.name}</p>
                        {location.status === "pending" ? (
                          <Badge className="bg-amber-500/10 text-amber-500">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Pending
                          </Badge>
                        ) : location.status === "approved" ? (
                          <Badge className="text-green-500 bg-green-500/10">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge className="text-red-500 bg-red-500/10">
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Rejected
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          {location.city}, {location.province}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Diajukan oleh {location.submittedBy.name} pada{" "}
                        {new Date(location.submissionDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("locations")}>
                  Lihat Semua Lokasi
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            {/* Student Stats Card */}
            <Card className="overflow-hidden gradient-border card-hover">
              <CardHeader>
                <CardTitle>Status Mahasiswa KKP</CardTitle>
                <CardDescription>Ringkasan status mahasiswa dalam KKP</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10">
                      <RotateCcw className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sedang KKP</p>
                      <p className="text-xs text-muted-foreground">Mahasiswa aktif</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{activeStudents}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Selesai KKP</p>
                      <p className="text-xs text-muted-foreground">Telah menyelesaikan KKP</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{completedStudents}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10">
                      <Clock className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Menunggu Persetujuan</p>
                      <p className="text-xs text-muted-foreground">Pengajuan baru</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{pendingTeams}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("students")}>
                  Lihat Status Mahasiswa
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            {/* Recent Teams Card */}
            <Card className="overflow-hidden gradient-border card-hover">
              <CardHeader>
                <CardTitle>Tim KKP Terbaru</CardTitle>
                <CardDescription>Tim yang baru mengajukan KKP</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockKkpTeams.slice(0, 3).map((team) => (
                  <div key={team.id} className="flex items-start gap-4 p-3 border rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 shrink-0">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="grid flex-1 gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{team.name}</p>
                        {team.status === "pending" ? (
                          <Badge className="bg-amber-500/10 text-amber-500">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Pending
                          </Badge>
                        ) : team.status === "approved" ? (
                          <Badge className="text-green-500 bg-green-500/10">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge className="text-red-500 bg-red-500/10">
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Rejected
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{team.location.name}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          {team.leader.name} + {team.members.length} anggota
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("teams")}>
                  Lihat Semua Tim
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Lokasi KKP</CardTitle>
              <CardDescription>Kelola dan setujui lokasi KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <KkpLocationSubmissionsTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Tim KKP</CardTitle>
              <CardDescription>Kelola dan setujui tim KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <KkpTeamSubmissionsTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Status Mahasiswa KKP</CardTitle>
              <CardDescription>Pantau status mahasiswa yang sedang KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentKkpStatusTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>KKP Selesai</CardTitle>
              <CardDescription>Lihat data mahasiswa yang telah menyelesaikan KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <CompletedKkpRecordsTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Location Dialog */}
      <Dialog open={showAddLocationDialog} onOpenChange={setShowAddLocationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              Tambah Lokasi KKP Baru
            </DialogTitle>
            <DialogDescription>Tambahkan lokasi KKP baru yang dapat dipilih oleh mahasiswa</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddLocation}>
            <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right">
                  Nama Lokasi <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                  placeholder="PT. Teknologi Indonesia"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-right">
                  Tipe Lokasi <span className="text-red-500">*</span>
                </Label>
                <select
                  id="type"
                  className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newLocation.type}
                  onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value })}
                  required
                >
                  <option value="company">Perusahaan</option>
                  <option value="government">Instansi Pemerintah</option>
                  <option value="education">Institusi Pendidikan</option>
                  <option value="ngo">Organisasi Non-Profit</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-right">
                  Kota <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  value={newLocation.city}
                  onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                  placeholder="Jakarta"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province" className="text-right">
                  Provinsi <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="province"
                  value={newLocation.province}
                  onChange={(e) => setNewLocation({ ...newLocation, province: e.target.value })}
                  placeholder="DKI Jakarta"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-right">
                  Alamat <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                  placeholder="Jl. Sudirman No. 123, Jakarta Pusat"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="text-right">
                  Nama Kontak <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactPerson"
                  value={newLocation.contactPerson}
                  onChange={(e) => setNewLocation({ ...newLocation, contactPerson: e.target.value })}
                  placeholder="Budi Santoso"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPosition" className="text-right">
                  Jabatan Kontak
                </Label>
                <Input
                  id="contactPosition"
                  value={newLocation.contactPosition}
                  onChange={(e) => setNewLocation({ ...newLocation, contactPosition: e.target.value })}
                  placeholder="HR Manager"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-right">
                  Email Kontak <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={newLocation.contactEmail}
                  onChange={(e) => setNewLocation({ ...newLocation, contactEmail: e.target.value })}
                  placeholder="budi@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-right">
                  Telepon Kontak <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactPhone"
                  value={newLocation.contactPhone}
                  onChange={(e) => setNewLocation({ ...newLocation, contactPhone: e.target.value })}
                  placeholder="081234567890"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-right">
                  Website
                </Label>
                <Input
                  id="website"
                  value={newLocation.website}
                  onChange={(e) => setNewLocation({ ...newLocation, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-right">
                  Deskripsi
                </Label>
                <Textarea
                  id="description"
                  value={newLocation.description}
                  onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
                  placeholder="Deskripsi singkat tentang lokasi KKP ini..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddLocationDialog(false)}>
                Batal
              </Button>
              <Button type="submit">Tambah Lokasi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

