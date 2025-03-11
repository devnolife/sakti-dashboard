"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Building, Search, MapPin, Users, Briefcase, Plus, X, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// SubLocation interface
interface SubLocation {
  id: string
  name: string
  address: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
}

// Location interface
interface Location {
  id: string
  name: string
  address: string
  city: string
  industry: string
  positions: string[]
  quota: number
  remaining: number
  status: "available" | "limited" | "full"
  distance?: number // in km
  favorite?: boolean
  subLocations: SubLocation[]
}

export default function LocationsPage() {
  // State for locations
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "loc-001",
      name: "PT Teknologi Maju",
      address: "Jl. Sudirman No. 123, Jakarta Selatan",
      city: "Jakarta",
      industry: "Teknologi",
      positions: ["Pengembang Perangkat Lunak", "Desainer UI/UX"],
      quota: 10,
      remaining: 5,
      status: "available",
      distance: 3.2,
      favorite: true,
      subLocations: [],
    },
    {
      id: "loc-002",
      name: "Bank Nasional Indonesia",
      address: "Jl. MH Thamrin No. 45, Jakarta Pusat",
      city: "Jakarta",
      industry: "Perbankan & Keuangan",
      positions: ["Analis Keuangan", "Manajemen Risiko"],
      quota: 8,
      remaining: 2,
      status: "limited",
      distance: 5.7,
      subLocations: [],
    },
    {
      id: "loc-003",
      name: "Rumah Sakit Medika",
      address: "Jl. Diponegoro No. 78, Bandung",
      city: "Bandung",
      industry: "Kesehatan",
      positions: ["Sistem Informasi Medis"],
      quota: 5,
      remaining: 0,
      status: "full",
      distance: 120.3,
      subLocations: [],
    },
    {
      id: "loc-004",
      name: "Kementerian Pendidikan",
      address: "Jl. Jenderal Sudirman, Jakarta Pusat",
      city: "Jakarta",
      industry: "Pemerintahan",
      positions: ["Kebijakan Pendidikan", "Sistem Informasi"],
      quota: 12,
      remaining: 8,
      status: "available",
      distance: 4.5,
      subLocations: [],
    },
    {
      id: "loc-005",
      name: "PT Indo Teknologi",
      address: "Jl. Gatot Subroto Kav. 52-53, Jakarta Selatan",
      city: "Jakarta",
      industry: "Teknologi",
      positions: ["Teknisi Jaringan", "Analis Sistem", "Administrator Basis Data"],
      quota: 15,
      remaining: 10,
      status: "available",
      distance: 7.2,
      subLocations: [],
    },
  ])

  // States for various filters
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [cityFilter, setCityFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showAddLocationDialog, setShowAddLocationDialog] = useState(false)
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: "",
    address: "",
    city: "",
    industry: "",
    positions: [],
    quota: 0,
    remaining: 0,
    status: "available",
    subLocations: [],
  })
  const [newPosition, setNewPosition] = useState("")
  const [newSubLocations, setNewSubLocations] = useState<Partial<SubLocation>[]>([])

  // Get unique list of industries from locations
  const industries = Array.from(new Set(locations.map((loc) => loc.industry)))

  // Get unique list of cities from locations
  const cities = Array.from(new Set(locations.map((loc) => loc.city)))

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
      if (statusFilter && loc.status !== statusFilter) {
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
        // Default sort by favorites, then name
        if (a.favorite && !b.favorite) return -1
        if (!a.favorite && b.favorite) return 1
        return a.name.localeCompare(b.name)
      }
    })

  // Handle adding a new location
  const handleAddLocation = () => {
    // Create a new location with an id
    const locationId = `loc-${String(Date.now()).slice(-6)}`
    
    // Process the positions into an array
    let positions: string[] = []
    if (newPosition.trim()) {
      positions = newPosition.split(",").map((p) => p.trim())
    }

    // Process sublocations - give them IDs
    const subLocations = newSubLocations.map((sl, index) => ({
      ...sl,
      id: `${locationId}-sub-${index + 1}`,
    })) as SubLocation[]

    // Create the full location object
    const location: Location = {
      id: locationId,
      name: newLocation.name || "",
      address: newLocation.address || "",
      city: newLocation.city || "",
      industry: newLocation.industry || "",
      positions: positions,
      quota: Number(newLocation.quota) || 0,
      remaining: Number(newLocation.remaining) || 0,
      status: (newLocation.status as "available" | "limited" | "full") || "available",
      subLocations: subLocations,
    }

    // Add to the locations list
    setLocations([...locations, location])

    // Reset the form
    setNewLocation({
      name: "",
      address: "",
      city: "",
      industry: "",
      positions: [],
      quota: 0,
      remaining: 0,
      status: "available",
      subLocations: [],
    })
    setNewPosition("")
    setNewSubLocations([])
    setShowAddLocationDialog(false)
  }

  // Add a new sublocation field to the form
  const handleAddSubLocationField = () => {
    setNewSubLocations([
      ...newSubLocations,
      { name: "", address: "", contactPerson: "", contactEmail: "", contactPhone: "" },
    ])
  }

  // Update a sublocation field
  const handleUpdateSubLocation = (index: number, field: keyof SubLocation, value: string) => {
    const updated = [...newSubLocations]
    updated[index] = { ...updated[index], [field]: value }
    setNewSubLocations(updated)
  }

  // Remove a sublocation field
  const handleRemoveSubLocationField = (index: number) => {
    const updated = [...newSubLocations]
    updated.splice(index, 1)
    setNewSubLocations(updated)
  }

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setLocations(
      locations.map((loc) => (loc.id === id ? { ...loc, favorite: !loc.favorite } : loc))
    )
  }

  // Remove a location
  const removeLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id))
  }

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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Lokasi KKP
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Jelajahi dan cari lokasi KKP yang tersedia untuk periode ini
          </p>
        </div>
        <Button onClick={() => setShowAddLocationDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Lokasi
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              <Select value={industryFilter || ""} onValueChange={(v) => setIndustryFilter(v || null)}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Semua bidang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua bidang</SelectItem>
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
              <Select value={cityFilter || ""} onValueChange={(v) => setCityFilter(v || null)}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Semua kota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua kota</SelectItem>
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
              <Select value={statusFilter || ""} onValueChange={(v) => setStatusFilter(v || null)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Semua status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua status</SelectItem>
                  <SelectItem value="available">Tersedia</SelectItem>
                  <SelectItem value="limited">Terbatas</SelectItem>
                  <SelectItem value="full">Penuh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort">Urutkan</Label>
              <Select value={sortBy || ""} onValueChange={(v) => setSortBy(v || null)}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Urutan default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Urutan default</SelectItem>
                  <SelectItem value="name-asc">Nama (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Nama (Z-A)</SelectItem>
                  <SelectItem value="distance">Jarak terdekat</SelectItem>
                  <SelectItem value="spots">Kuota tersedia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end space-x-2">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("grid")}
                className="h-10 w-10"
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
                <span className="sr-only">Tampilan Grid</span>
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("list")}
                className="h-10 w-10"
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
                <span className="sr-only">Tampilan Daftar</span>
              </Button>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSearchQuery("")
                setIndustryFilter(null)
                setStatusFilter(null)
                setCityFilter(null)
                setSortBy(null)
              }}>
                Reset Filter
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

      {/* Locations Grid View */}
      {view === "grid" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLocations.map((location) => (
            <Card key={location.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{location.name}</CardTitle>
                    <CardDescription>{location.industry}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(location.id)}
                      className={cn(
                        "h-8 w-8",
                        location.favorite && "text-amber-500 hover:text-amber-600"
                      )}
                    >
                      {location.favorite ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      )}
                      <span className="sr-only">
                        {location.favorite ? "Hapus dari favorit" : "Tambahkan ke favorit"}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm">{location.address}</p>
                      <p className="text-sm text-muted-foreground">{location.city}</p>
                      {location.distance && (
                        <p className="text-xs text-muted-foreground">
                          {location.distance} km dari lokasi Anda
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Posisi tersedia:</p>
                      <ul className="list-disc text-sm ml-4 space-y-1 mt-1">
                        {location.positions.map((position, index) => (
                          <li key={index}>{position}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                      {location.status === "full" ? (
                        <span className="text-red-500">Kuota penuh</span>
                      ) : (
                        <span>
                          {location.remaining} dari {location.quota} kuota tersedia
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>{getStatusBadge(location.status)}</div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Lihat Detail</Button>
                    <Button size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Ajukan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Locations List View */}
      {view === "list" && (
        <div className="space-y-4">
          {filteredLocations.map((location) => (
            <Card key={location.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{location.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(location.id)}
                          className={cn(
                            "h-6 w-6",
                            location.favorite && "text-amber-500 hover:text-amber-600"
                          )}
                        >
                          {location.favorite ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              />
                            </svg>
                          )}
                          <span className="sr-only">
                            {location.favorite ? "Hapus dari favorit" : "Tambahkan ke favorit"}
                          </span>
                        </Button>
                      </div>
                      <div>{getStatusBadge(location.status)}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{location.industry}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {location.address}, {location.city}
                        {location.distance && ` (${location.distance} km)`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {location.status === "full" ? (
                          <span className="text-red-500">Kuota penuh</span>
                        ) : (
                          <span>
                            {location.remaining} dari {location.quota} kuota tersedia
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col sm:items-end gap-2">
                    <div className="flex flex-wrap gap-2">
                      {location.positions.map((position, index) => (
                        <Badge key={index} variant="outline">
                          {position}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2 mt-auto">
                      <Button size="sm" variant="outline">
                        Lihat Detail
                      </Button>
                      <Button size="sm">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Ajukan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Location Dialog */}
      <Dialog open={showAddLocationDialog} onOpenChange={setShowAddLocationDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tambah Lokasi KKP Baru</DialogTitle>
            <DialogDescription>
              Tambahkan informasi detail lokasi KKP baru untuk mahasiswa
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Perusahaan/Instansi</Label>
                <Input
                  id="name"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Bidang/Industri</Label>
                <Input
                  id="industry"
                  value={newLocation.industry}
                  onChange={(e) => setNewLocation({ ...newLocation, industry: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Kota</Label>
                <Input
                  id="city"
                  value={newLocation.city}
                  onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positions">Posisi yang Tersedia (pisahkan dengan koma)</Label>
                <Textarea
                  id="positions"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  placeholder="Contoh: Software Developer, UI/UX Designer, Network Engineer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quota">Total Kuota</Label>
                  <Input
                    id="quota"
                    type="number"
                    value={newLocation.quota}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, quota: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remaining">Kuota Tersedia</Label>
                  <Input
                    id="remaining"
                    type="number"
                    value={newLocation.remaining}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, remaining: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newLocation.status}
                  onValueChange={(v) =>
                    setNewLocation({
                      ...newLocation,
                      status: v as "available" | "limited" | "full",
                    })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Tersedia</SelectItem>
                    <SelectItem value="limited">Terbatas</SelectItem>
                    <SelectItem value="full">Penuh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sub-locations section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Sub-lokasi/Cabang</h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddSubLocationField}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Sub-lokasi
                </Button>
              </div>

              {newSubLocations.map((subLoc, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Sub-lokasi #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSubLocationField(index)}
                      className="h-8 w-8 text-destructive"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Hapus sub-lokasi</span>
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`subloc-${index}-name`}>Nama Sub-lokasi</Label>
                      <Input
                        id={`subloc-${index}-name`}
                        value={subLoc.name}
                        onChange={(e) => handleUpdateSubLocation(index, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`subloc-${index}-address`}>Alamat</Label>
                      <Input
                        id={`subloc-${index}-address`}
                        value={subLoc.address}
                        onChange={(e) => handleUpdateSubLocation(index, "address", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`subloc-${index}-contact`}>Nama Kontak</Label>
                      <Input
                        id={`subloc-${index}-contact`}
                        value={subLoc.contactPerson}
                        onChange={(e) =>
                          handleUpdateSubLocation(index, "contactPerson", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`subloc-${index}-email`}>Email Kontak</Label>
                      <Input
                        id={`subloc-${index}-email`}
                        type="email"
                        value={subLoc.contactEmail}
                        onChange={(e) =>
                          handleUpdateSubLocation(index, "contactEmail", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`subloc-${index}-phone`}>Telepon Kontak</Label>
                      <Input
                        id={`subloc-${index}-phone`}
                        value={subLoc.contactPhone}
                        onChange={(e) =>
                          handleUpdateSubLocation(index, "contactPhone", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddLocationDialog(false)}>
              Batal
            </Button>
            <Button type="button" onClick={handleAddLocation}>
              Simpan Lokasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

