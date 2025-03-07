"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Search, MapPin, Users, Briefcase, Plus, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Location interface
interface InternshipLocation {
  id: string
  name: string
  address: string
  city: string
  industry: string
  positions: string[]
  quota: number
  remaining: number
  status: "available" | "limited" | "full"
  description: string
  contact: {
    name: string
    position: string
    email: string
    phone: string
  }
}

export default function InternshipLocations() {
  const [activeTab, setActiveTab] = useState("approved")
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState<InternshipLocation | null>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [applicationSuccess, setApplicationSuccess] = useState(false)

  // Sample data for pre-approved locations
  const [locations, setLocations] = useState<InternshipLocation[]>([
    {
      id: "loc-001",
      name: "PT Teknologi Maju Indonesia",
      address: "Jl. Sudirman No. 123, Jakarta Selatan",
      city: "Jakarta",
      industry: "Teknologi Informasi",
      positions: ["Software Developer", "UI/UX Designer", "Data Analyst"],
      quota: 10,
      remaining: 5,
      status: "available",
      description:
        "PT Teknologi Maju Indonesia adalah perusahaan teknologi terkemuka yang berfokus pada pengembangan software dan solusi digital untuk berbagai industri.",
      contact: {
        name: "Budi Santoso",
        position: "HR Manager",
        email: "budi.santoso@teknoindo.com",
        phone: "021-5551234",
      },
    },
    {
      id: "loc-002",
      name: "Bank Nasional Indonesia",
      address: "Jl. MH Thamrin No. 45, Jakarta Pusat",
      city: "Jakarta",
      industry: "Perbankan & Keuangan",
      positions: ["Financial Analyst", "Risk Management", "Digital Banking"],
      quota: 8,
      remaining: 2,
      status: "limited",
      description:
        "Bank Nasional Indonesia adalah salah satu bank terbesar di Indonesia yang menyediakan layanan perbankan lengkap untuk nasabah ritel dan korporasi.",
      contact: {
        name: "Siti Rahayu",
        position: "Talent Acquisition",
        email: "siti.rahayu@bni.co.id",
        phone: "021-5552345",
      },
    },
    {
      id: "loc-003",
      name: "Rumah Sakit Medika",
      address: "Jl. Diponegoro No. 78, Bandung",
      city: "Bandung",
      industry: "Kesehatan",
      positions: ["Medical Information Systems", "Healthcare Administration"],
      quota: 5,
      remaining: 0,
      status: "full",
      description:
        "Rumah Sakit Medika adalah rumah sakit modern yang dilengkapi dengan teknologi medis terkini dan sistem informasi kesehatan terintegrasi.",
      contact: {
        name: "Dr. Ahmad Hidayat",
        position: "Director",
        email: "ahmad.hidayat@rsmedika.com",
        phone: "022-4445678",
      },
    },
    {
      id: "loc-004",
      name: "Kementerian Pendidikan",
      address: "Jl. Jenderal Sudirman, Jakarta Pusat",
      city: "Jakarta",
      industry: "Pemerintahan",
      positions: ["Education Policy", "Information Systems", "Data Management"],
      quota: 12,
      remaining: 8,
      status: "available",
      description:
        "Kementerian Pendidikan bertanggung jawab atas kebijakan pendidikan nasional dan pengembangan sistem pendidikan di Indonesia.",
      contact: {
        name: "Hendra Wijaya",
        position: "Kepala Bagian Magang",
        email: "hendra.wijaya@kemdikbud.go.id",
        phone: "021-5553456",
      },
    },
    {
      id: "loc-005",
      name: "PT Media Digital",
      address: "Jl. Gatot Subroto No. 56, Jakarta Barat",
      city: "Jakarta",
      industry: "Media & Komunikasi",
      positions: ["Content Creator", "Digital Marketing", "Media Analysis"],
      quota: 6,
      remaining: 0,
      status: "full",
      description:
        "PT Media Digital adalah perusahaan media yang fokus pada konten digital, marketing online, dan analisis media sosial.",
      contact: {
        name: "Dian Permata",
        position: "Creative Director",
        email: "dian.permata@mediadigital.com",
        phone: "021-5554567",
      },
    },
    {
      id: "loc-006",
      name: "Universitas Pendidikan Indonesia",
      address: "Jl. Dr. Setiabudi No. 229, Bandung",
      city: "Bandung",
      industry: "Pendidikan",
      positions: ["Educational Technology", "Academic Administration", "Research Assistant"],
      quota: 15,
      remaining: 10,
      status: "available",
      description:
        "Universitas Pendidikan Indonesia adalah institusi pendidikan tinggi yang fokus pada pengembangan ilmu pendidikan dan teknologi pembelajaran.",
      contact: {
        name: "Prof. Bambang Sutanto",
        position: "Kepala Program Magang",
        email: "bambang.sutanto@upi.edu",
        phone: "022-4446789",
      },
    },
    {
      id: "loc-007",
      name: "PT Manufaktur Presisi",
      address: "Kawasan Industri Jababeka, Bekasi",
      city: "Bekasi",
      industry: "Manufaktur",
      positions: ["Production Planning", "Quality Control", "Supply Chain Management"],
      quota: 8,
      remaining: 3,
      status: "available",
      description:
        "PT Manufaktur Presisi adalah perusahaan manufaktur yang menghasilkan komponen presisi untuk industri otomotif dan elektronik.",
      contact: {
        name: "Rudi Hartono",
        position: "Production Manager",
        email: "rudi.hartono@manufakturpresisi.com",
        phone: "021-8951234",
      },
    },
    {
      id: "loc-008",
      name: "Startup Inovasi Digital",
      address: "Jl. Casablanca Raya, Jakarta Selatan",
      city: "Jakarta",
      industry: "Teknologi Informasi",
      positions: ["Mobile Developer", "Product Manager", "Growth Hacker"],
      quota: 5,
      remaining: 1,
      status: "limited",
      description:
        "Startup Inovasi Digital adalah perusahaan rintisan yang mengembangkan aplikasi mobile dan solusi digital inovatif untuk pasar Indonesia.",
      contact: {
        name: "Maya Putri",
        position: "Co-Founder",
        email: "maya.putri@inovasidigital.id",
        phone: "021-5555678",
      },
    },
  ])

  // Filter locations based on search query and filters
  const filteredLocations = locations.filter((location) => {
    // Search filter
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.positions.some((pos) => pos.toLowerCase().includes(searchQuery.toLowerCase()))

    // Industry filter
    const matchesIndustry = industryFilter === "all" || location.industry === industryFilter

    // City filter
    const matchesCity = cityFilter === "all" || location.city === cityFilter

    // Status filter (based on active tab)
    const matchesStatus =
      activeTab === "approved" ||
      (activeTab === "available" && location.status !== "full") ||
      (activeTab === "full" && location.status === "full")

    return matchesSearch && matchesIndustry && matchesCity && matchesStatus
  })

  // Get unique industries and cities for filters
  const industries = Array.from(new Set(locations.map((loc) => loc.industry)))
  const cities = Array.from(new Set(locations.map((loc) => loc.city)))

  // Handle location selection
  const handleSelectLocation = (location: InternshipLocation) => {
    setSelectedLocation(location)
  }

  // Handle application submission
  const handleApply = () => {
    setIsApplying(true)
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false)
      setApplicationSuccess(true)
      // Reset after 3 seconds
      setTimeout(() => {
        setApplicationSuccess(false)
        setSelectedLocation(null)
      }, 3000)
    }, 1500)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Tersedia</Badge>
      case "limited":
        return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Terbatas</Badge>
      case "full":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Penuh</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Lokasi Magang
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Pilih lokasi magang dari daftar yang tersedia atau ajukan lokasi baru
        </p>
      </div>

      <Tabs defaultValue="approved" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="approved">Semua Lokasi</TabsTrigger>
            <TabsTrigger value="available">Tersedia</TabsTrigger>
            <TabsTrigger value="full">Penuh</TabsTrigger>
          </TabsList>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari lokasi magang..."
                className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih industri" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Industri</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih kota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kota</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <Card key={location.id} className={cn("overflow-hidden", location.status === "full" && "opacity-75")}>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{location.name}</CardTitle>
                          <CardDescription>{location.industry}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(location.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{location.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {location.positions.slice(0, 2).join(", ")}
                          {location.positions.length > 2 && "..."}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Kuota: {location.remaining}/{location.quota} tersisa
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => handleSelectLocation(location)}
                        disabled={location.status === "full"}
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Tidak ada lokasi yang ditemukan</h3>
                <p className="text-sm text-muted-foreground mt-1">Coba ubah filter pencarian atau ajukan lokasi baru</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajukan Lokasi Baru
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Ajukan Lokasi Magang Baru</DialogTitle>
                      <DialogDescription>
                        Isi formulir berikut untuk mengajukan lokasi magang baru yang belum terdaftar dalam sistem.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="company-name" className="text-sm font-medium">
                            Nama Perusahaan/Instansi
                          </label>
                          <Input id="company-name" placeholder="PT Example Indonesia" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="industry" className="text-sm font-medium">
                            Industri
                          </label>
                          <Select>
                            <SelectTrigger id="industry">
                              <SelectValue placeholder="Pilih industri" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tech">Teknologi Informasi</SelectItem>
                              <SelectItem value="finance">Perbankan & Keuangan</SelectItem>
                              <SelectItem value="health">Kesehatan</SelectItem>
                              <SelectItem value="education">Pendidikan</SelectItem>
                              <SelectItem value="government">Pemerintahan</SelectItem>
                              <SelectItem value="manufacture">Manufaktur</SelectItem>
                              <SelectItem value="media">Media & Komunikasi</SelectItem>
                              <SelectItem value="other">Lainnya</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium">
                          Alamat Lengkap
                        </label>
                        <Input id="address" placeholder="Jl. Contoh No. 123, Jakarta" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="city" className="text-sm font-medium">
                            Kota
                          </label>
                          <Input id="city" placeholder="Jakarta" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="positions" className="text-sm font-medium">
                            Posisi Magang
                          </label>
                          <Input id="positions" placeholder="Software Developer, UI/UX Designer" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Deskripsi Perusahaan
                        </label>
                        <textarea
                          id="description"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Deskripsi singkat tentang perusahaan/instansi"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="contact-name" className="text-sm font-medium">
                            Nama Kontak
                          </label>
                          <Input id="contact-name" placeholder="Nama lengkap kontak" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="contact-position" className="text-sm font-medium">
                            Jabatan
                          </label>
                          <Input id="contact-position" placeholder="HR Manager" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="contact-email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="contact-email" type="email" placeholder="email@example.com" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="contact-phone" className="text-sm font-medium">
                            Nomor Telepon
                          </label>
                          <Input id="contact-phone" placeholder="021-1234567" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Ajukan Lokasi</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Location Detail Dialog */}
      {selectedLocation && (
        <Dialog open={!!selectedLocation} onOpenChange={(open) => !open && setSelectedLocation(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedLocation.name}</DialogTitle>
              <DialogDescription>
                {selectedLocation.industry} • {selectedLocation.city}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedLocation.address}</span>
                </div>
                {getStatusBadge(selectedLocation.status)}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Deskripsi</h4>
                <p className="text-sm text-muted-foreground">{selectedLocation.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Posisi Magang</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.positions.map((position, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {position}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Kuota</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation.remaining} dari {selectedLocation.quota} posisi tersisa
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Kontak</h4>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">{selectedLocation.contact.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedLocation.contact.position}</p>
                  <div className="mt-2 text-xs">
                    <p>Email: {selectedLocation.contact.email}</p>
                    <p>Telepon: {selectedLocation.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              {applicationSuccess ? (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Aplikasi berhasil dikirim!</span>
                </div>
              ) : (
                <Button onClick={handleApply} disabled={isApplying || selectedLocation.status === "full"}>
                  {isApplying ? "Mengirim Aplikasi..." : "Ajukan Magang di Lokasi Ini"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

