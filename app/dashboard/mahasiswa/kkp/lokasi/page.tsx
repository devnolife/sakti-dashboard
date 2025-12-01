"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building,
  Search,
  MapPin,
  Users,
  Briefcase,
  Plus,
  X,
  Trash2,
  Loader2,
  Send,
  CheckCircle2,
  Info,
  Globe,
  Phone,
  Mail,
  Clock,
  FileText,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// SubLocation interface
interface SubLocation {
  id: string
  name: string
  address: string
  contactPerson: string
  contactEmail?: string
  contactPhone?: string
}

// Company interface
interface Company {
  id: string
  name: string
  address: string
  city: string
  industry: string
}

// Creator interface (matches API response)
interface Creator {
  id: string
  nim: string
  user_id: string
  users: {
    id: string
    name: string
  }
}

// Location interface - updated to match API response
interface Location {
  id: string
  name: string
  address: string
  city: string
  province?: string | null
  industry: string
  positions: string[] // JSON array from database
  quota: number
  remaining: number
  status?: "available" | "limited" | "full"
  distance?: number // in km
  contact_person?: string | null
  contact_email?: string | null
  contact_phone?: string | null
  description?: string | null
  website?: string | null
  company_id?: string | null
  companies?: Company | null
  students?: Creator | null
  kkp_sub_locations?: SubLocation[]
  created_at: string
  updated_at: string
}

// Location Proposal interface
interface LocationProposal {
  name: string
  address: string
  city: string
  province: string
  industry: string
  positions: string[]
  quota: number
  contactPerson: string
  contactEmail: string
  contactPhone: string
  description: string
  website: string
  reason: string
}

export default function LokasiKkpPage() {
  const { user, isLoading: authLoading } = useAuth()

  // State for locations
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<"browse" | "propose">("browse")

  // States for various filters
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [cityFilter, setCityFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")

  // Location detail dialog
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // Proposal form state
  const [showProposalDialog, setShowProposalDialog] = useState(false)
  const [proposalForm, setProposalForm] = useState<LocationProposal>({
    name: "",
    address: "",
    city: "",
    province: "",
    industry: "",
    positions: [],
    quota: 5,
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    description: "",
    website: "",
    reason: "",
  })
  const [newPosition, setNewPosition] = useState("")

  // API Functions
  const fetchLocations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/kkp/locations')
      const result = await response.json()

      if (result.success) {
        setLocations(result.data)
      } else {
        toast({
          title: "Error",
          description: result.error || "Gagal memuat lokasi KKP",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching locations:', error)
      toast({
        title: "Error",
        description: "Gagal memuat lokasi KKP",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitProposal = async () => {
    // Validate required fields
    if (!proposalForm.name.trim() || !proposalForm.address.trim() ||
      !proposalForm.city.trim() || !proposalForm.industry.trim() ||
      !proposalForm.reason.trim()) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive",
      })
      return
    }

    try {
      setSubmitting(true)

      // Parse positions from comma-separated string if needed
      const positionsArray = newPosition.trim()
        ? newPosition.split(',').map(p => p.trim()).filter(p => p.length > 0)
        : proposalForm.positions

      const proposalData = {
        ...proposalForm,
        positions: positionsArray,
        isProposal: true, // Mark as proposal from student
      }

      const response = await fetch('/api/kkp/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Berhasil!",
          description: "Pengajuan lokasi KKP Anda berhasil dikirim dan akan ditinjau oleh admin",
        })
        setShowProposalDialog(false)
        resetProposalForm()
        // Refresh locations
        fetchLocations()
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal mengirim pengajuan lokasi KKP",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error submitting proposal:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengirim pengajuan",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const resetProposalForm = () => {
    setProposalForm({
      name: "",
      address: "",
      city: "",
      province: "",
      industry: "",
      positions: [],
      quota: 5,
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
      website: "",
      reason: "",
    })
    setNewPosition("")
  }

  // Load locations on component mount
  useEffect(() => {
    fetchLocations()
  }, [])

  // Helper function to calculate status based on quota and remaining
  const getLocationStatus = (location: Location): "available" | "limited" | "full" => {
    if (location.remaining === 0) return "full"
    if (location.remaining <= Math.ceil(location.quota * 0.2)) return "limited"
    return "available"
  }

  // Get unique list of industries from locations
  const industries = Array.from(new Set(locations.map((loc) => loc.industry).filter(Boolean)))

  // Get unique list of cities from locations  
  const cities = Array.from(new Set(locations.map((loc) => loc.city).filter(Boolean)))

  // Filter and sort locations based on user selections
  const filteredLocations = locations
    .filter((loc) => {
      // Filter by search query (name, address, city, industry)
      if (
        searchQuery &&
        !loc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !loc.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !loc.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !loc.industry.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Filter by industry
      if (industryFilter && loc.industry !== industryFilter) {
        return false
      }

      // Filter by status
      if (statusFilter && getLocationStatus(loc) !== statusFilter) {
        return false
      }

      // Filter by city
      if (cityFilter && loc.city !== cityFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected sort method
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name)
      } else if (sortBy === "distance") {
        return (a.distance || 0) - (b.distance || 0)
      } else if (sortBy === "spots") {
        return b.remaining - a.remaining
      } else {
        // Default sort by name
        return a.name.localeCompare(b.name)
      }
    })

  // Get appropriate badge for status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-200">
            Tersedia
          </Badge>
        )
      case "limited":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-200">
            Terbatas
          </Badge>
        )
      case "full":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-200">
            Penuh
          </Badge>
        )
      default:
        return null
    }
  }

  const handleViewDetail = (location: Location) => {
    setSelectedLocation(location)
    setShowDetailDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Lokasi KKP
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Jelajahi lokasi KKP tersedia atau ajukan lokasi baru untuk KKP Anda
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "browse" | "propose")}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Cari Lokasi
          </TabsTrigger>
          <TabsTrigger value="propose" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ajukan Lokasi Baru
          </TabsTrigger>
        </TabsList>

        {/* Browse Tab Content */}
        <TabsContent value="browse" className="space-y-6 mt-6">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-muted-foreground">Memuat lokasi KKP...</span>
              </div>
            </div>
          )}

          {/* Content */}
          {!loading && (
            <>
              {/* Filters and Search */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="search">Cari</Label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          type="search"
                          placeholder="Nama, alamat, atau bidang..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Bidang</Label>
                      <Select value={industryFilter || "all"} onValueChange={(v) => setIndustryFilter(v === "all" ? null : v)}>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Semua bidang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua bidang</SelectItem>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Kota</Label>
                      <Select value={cityFilter || "all"} onValueChange={(v) => setCityFilter(v === "all" ? null : v)}>
                        <SelectTrigger id="city">
                          <SelectValue placeholder="Semua kota" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua kota</SelectItem>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={statusFilter || "all"} onValueChange={(v) => setStatusFilter(v === "all" ? null : v)}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Semua status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua status</SelectItem>
                          <SelectItem value="available">Tersedia</SelectItem>
                          <SelectItem value="limited">Terbatas</SelectItem>
                          <SelectItem value="full">Penuh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Button variant="outline" size="sm" onClick={() => {
                      setSearchQuery("")
                      setIndustryFilter(null)
                      setStatusFilter(null)
                      setCityFilter(null)
                      setSortBy(null)
                    }}>
                      Reset Filter
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant={view === "grid" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setView("grid")}
                        className="h-9 w-9"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <rect width="7" height="7" x="3" y="3" rx="1" />
                          <rect width="7" height="7" x="14" y="3" rx="1" />
                          <rect width="7" height="7" x="14" y="14" rx="1" />
                          <rect width="7" height="7" x="3" y="14" rx="1" />
                        </svg>
                      </Button>
                      <Button
                        variant={view === "list" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setView("list")}
                        className="h-9 w-9"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <line x1="8" x2="21" y1="6" y2="6" />
                          <line x1="8" x2="21" y1="12" y2="12" />
                          <line x1="8" x2="21" y1="18" y2="18" />
                          <line x1="3" x2="3" y1="6" y2="6" />
                          <line x1="3" x2="3" y1="12" y2="12" />
                          <line x1="3" x2="3" y1="18" y2="18" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Menampilkan {filteredLocations.length} lokasi dari {locations.length} total
                </p>
              </div>

              {/* No Results */}
              {filteredLocations.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Building className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">Tidak ada lokasi ditemukan</h3>
                    <p className="text-sm text-muted-foreground mt-1 text-center">
                      Tidak ada lokasi yang sesuai dengan filter Anda.
                      <br />
                      Coba ubah filter atau ajukan lokasi baru.
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => setActiveTab("propose")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Ajukan Lokasi Baru
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Locations Grid View */}
              {view === "grid" && filteredLocations.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredLocations.map((location) => (
                    <Card key={location.id} className="overflow-hidden transition-all hover:shadow-md">
                      <CardHeader className="p-5 pb-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1 flex-1">
                            <CardTitle className="text-lg line-clamp-1">{location.name}</CardTitle>
                            <CardDescription className="line-clamp-1">{location.industry}</CardDescription>
                          </div>
                          {getStatusBadge(getLocationStatus(location))}
                        </div>
                      </CardHeader>
                      <CardContent className="p-5 pt-0 space-y-3">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {location.address}, {location.city}
                          </p>
                        </div>

                        {location.positions && location.positions.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {location.positions.slice(0, 2).map((position, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {position}
                              </Badge>
                            ))}
                            {location.positions.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{location.positions.length - 2} lainnya
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>
                              {location.remaining}/{location.quota} kuota
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-5 pt-0 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleViewDetail(location)}
                        >
                          Lihat Detail
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          disabled={getLocationStatus(location) === "full"}
                          asChild
                        >
                          <Link href={`/dashboard/mahasiswa/kkp/pengajuan?locationId=${location.id}`}>
                            Pilih Lokasi
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              {/* Locations List View */}
              {view === "list" && filteredLocations.length > 0 && (
                <div className="space-y-4">
                  {filteredLocations.map((location) => (
                    <Card key={location.id} className="overflow-hidden transition-all hover:shadow-md">
                      <div className="p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-semibold">{location.name}</h3>
                                <p className="text-sm text-muted-foreground">{location.industry}</p>
                              </div>
                              {getStatusBadge(getLocationStatus(location))}
                            </div>

                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {location.address}, {location.city}
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {location.remaining} dari {location.quota} kuota tersedia
                              </span>
                            </div>

                            {location.positions && location.positions.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {location.positions.map((position, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {position}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex shrink-0 gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetail(location)}
                            >
                              Lihat Detail
                            </Button>
                            <Button
                              size="sm"
                              disabled={getLocationStatus(location) === "full"}
                              asChild
                            >
                              <Link href={`/dashboard/mahasiswa/kkp/pengajuan?locationId=${location.id}`}>
                                Pilih Lokasi
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Propose Tab Content */}
        <TabsContent value="propose" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Ajukan Lokasi KKP Baru
              </CardTitle>
              <CardDescription>
                Jika lokasi yang Anda inginkan belum tersedia, Anda dapat mengajukan lokasi baru untuk ditinjau oleh koordinator KKP.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Information Banner */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Petunjuk Pengajuan Lokasi</p>
                    <ul className="text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                      <li>Pastikan lokasi yang diajukan relevan dengan program studi Anda</li>
                      <li>Lengkapi informasi kontak perusahaan/instansi dengan benar</li>
                      <li>Pengajuan akan ditinjau dalam waktu 3-5 hari kerja</li>
                      <li>Anda akan diberitahu melalui notifikasi setelah pengajuan disetujui</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prop-name">Nama Perusahaan/Instansi <span className="text-red-500">*</span></Label>
                    <Input
                      id="prop-name"
                      placeholder="Contoh: PT Teknologi Indonesia"
                      value={proposalForm.name}
                      onChange={(e) => setProposalForm({ ...proposalForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prop-industry">Bidang/Industri <span className="text-red-500">*</span></Label>
                    <Input
                      id="prop-industry"
                      placeholder="Contoh: Teknologi Informasi"
                      value={proposalForm.industry}
                      onChange={(e) => setProposalForm({ ...proposalForm, industry: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prop-address">Alamat Lengkap <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="prop-address"
                    placeholder="Masukkan alamat lengkap perusahaan/instansi"
                    value={proposalForm.address}
                    onChange={(e) => setProposalForm({ ...proposalForm, address: e.target.value })}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prop-city">Kota <span className="text-red-500">*</span></Label>
                    <Input
                      id="prop-city"
                      placeholder="Contoh: Jakarta"
                      value={proposalForm.city}
                      onChange={(e) => setProposalForm({ ...proposalForm, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prop-province">Provinsi</Label>
                    <Input
                      id="prop-province"
                      placeholder="Contoh: DKI Jakarta"
                      value={proposalForm.province}
                      onChange={(e) => setProposalForm({ ...proposalForm, province: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="prop-positions">Posisi yang Tersedia (pisahkan dengan koma)</Label>
                  <Textarea
                    id="prop-positions"
                    placeholder="Contoh: Software Developer, UI/UX Designer, Network Engineer"
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Masukkan posisi yang tersedia di lokasi ini, pisahkan dengan koma
                  </p>
                </div>

                <Separator />

                <h3 className="font-medium">Informasi Kontak</h3>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="prop-contact">Nama Kontak</Label>
                    <Input
                      id="prop-contact"
                      placeholder="Nama narahubung"
                      value={proposalForm.contactPerson}
                      onChange={(e) => setProposalForm({ ...proposalForm, contactPerson: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prop-email">Email</Label>
                    <Input
                      id="prop-email"
                      type="email"
                      placeholder="email@perusahaan.com"
                      value={proposalForm.contactEmail}
                      onChange={(e) => setProposalForm({ ...proposalForm, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prop-phone">Telepon</Label>
                    <Input
                      id="prop-phone"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={proposalForm.contactPhone}
                      onChange={(e) => setProposalForm({ ...proposalForm, contactPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prop-website">Website (opsional)</Label>
                  <Input
                    id="prop-website"
                    type="url"
                    placeholder="https://www.perusahaan.com"
                    value={proposalForm.website}
                    onChange={(e) => setProposalForm({ ...proposalForm, website: e.target.value })}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="prop-description">Deskripsi Perusahaan/Instansi (opsional)</Label>
                  <Textarea
                    id="prop-description"
                    placeholder="Jelaskan secara singkat tentang perusahaan/instansi ini"
                    value={proposalForm.description}
                    onChange={(e) => setProposalForm({ ...proposalForm, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prop-reason">Alasan Mengajukan Lokasi Ini <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="prop-reason"
                    placeholder="Jelaskan mengapa Anda memilih lokasi ini untuk KKP Anda..."
                    value={proposalForm.reason}
                    onChange={(e) => setProposalForm({ ...proposalForm, reason: e.target.value })}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Jelaskan keterkaitan dengan program studi dan tujuan KKP Anda
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetProposalForm}>
                Reset Form
              </Button>
              <Button onClick={handleSubmitProposal} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Kirim Pengajuan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Location Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedLocation && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedLocation.name}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <Briefcase className="h-4 w-4" />
                      {selectedLocation.industry}
                    </DialogDescription>
                  </div>
                  {getStatusBadge(getLocationStatus(selectedLocation))}
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Alamat</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLocation.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLocation.city}{selectedLocation.province && `, ${selectedLocation.province}`}
                    </p>
                  </div>
                </div>

                {/* Quota */}
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Kuota</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLocation.remaining} dari {selectedLocation.quota} kuota tersedia
                    </p>
                  </div>
                </div>

                {/* Positions */}
                {selectedLocation.positions && selectedLocation.positions.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium mb-2">Posisi Tersedia</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedLocation.positions.map((position, index) => (
                          <Badge key={index} variant="outline">
                            {position}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                {(selectedLocation.contact_person || selectedLocation.contact_email || selectedLocation.contact_phone) && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-3">Informasi Kontak</h4>
                      <div className="space-y-2">
                        {selectedLocation.contact_person && (
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedLocation.contact_person}</span>
                          </div>
                        )}
                        {selectedLocation.contact_email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${selectedLocation.contact_email}`} className="text-primary hover:underline">
                              {selectedLocation.contact_email}
                            </a>
                          </div>
                        )}
                        {selectedLocation.contact_phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${selectedLocation.contact_phone}`} className="text-primary hover:underline">
                              {selectedLocation.contact_phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Description */}
                {selectedLocation.description && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Deskripsi</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedLocation.description}
                      </p>
                    </div>
                  </>
                )}

                {/* Sub-locations */}
                {selectedLocation.kkp_sub_locations && selectedLocation.kkp_sub_locations.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-3">Sub-lokasi/Cabang</h4>
                      <div className="space-y-3">
                        {selectedLocation.kkp_sub_locations.map((subLoc) => (
                          <div key={subLoc.id} className="p-3 border rounded-lg bg-muted/30">
                            <p className="font-medium text-sm">{subLoc.name}</p>
                            <p className="text-xs text-muted-foreground">{subLoc.address}</p>
                            {subLoc.contactPerson && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Kontak: {subLoc.contactPerson}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                  Tutup
                </Button>
                <Button
                  disabled={getLocationStatus(selectedLocation) === "full"}
                  asChild
                >
                  <Link href={`/dashboard/mahasiswa/kkp/pengajuan?locationId=${selectedLocation.id}`}>
                    Pilih Lokasi Ini
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
