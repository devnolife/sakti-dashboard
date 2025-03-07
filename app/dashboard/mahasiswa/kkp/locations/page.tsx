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
      status: "tersedia",
      distance: 3.2,
      favorite: true,
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
      status: "terbatas",
      distance: 5.7,
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
      status: "penuh",
      distance: 120.3,
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
      status: "tersedia",
      distance: 4.8,
    },
  ])

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: "",
    address: "",
    city: "",
    industry: "",
    positions: [],
    quota: 0,
    remaining: 0,
    status: "tersedia",
  })

  // Get unique industries and cities for filters
  const industries = Array.from(new Set(locations.map((loc) => loc.industry)))
  const cities = Array.from(new Set(locations.map((loc) => loc.city)))

  // Filter and sort locations
  const filteredLocations = locations
    .filter((location) => {
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

      // Status filter
      const matchesStatus = statusFilter === "all" || location.status === statusFilter

      return matchesSearch && matchesIndustry && matchesCity && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "distance":
          return (a.distance || 0) - (b.distance || 0)
        case "availability":
          return b.remaining - a.remaining
        default:
          return 0
      }
    })

  // Handle adding a new location
  const handleAddLocation = () => {
    const id = `loc-${String(locations.length + 1).padStart(3, "0")}`
    const newLoc: Location = {
      id,
      name: newLocation.name || "",
      address: newLocation.address || "",
      city: newLocation.city || "",
      industry: newLocation.industry || "",
      positions: newLocation.positions || [],
      quota: newLocation.quota || 0,
      remaining: newLocation.remaining || 0,
      status: (newLocation.status as "tersedia" | "terbatas" | "penuh") || "tersedia",
      distance: Math.random() * 10, // Random distance for demo
    }

    setLocations([...locations, newLoc])
    setNewLocation({
      name: "",
      address: "",
      city: "",
      industry: "",
      positions: [],
      quota: 0,
      remaining: 0,
      status: "tersedia",
    })
    setShowAddDialog(false)
  }

  // Handle toggling favorite status
  const toggleFavorite = (id: string) => {
    setLocations(locations.map((loc) => (loc.id === id ? { ...loc, favorite: !loc.favorite } : loc)))
  }

  // Handle removing a location
  const removeLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id))
    if (selectedLocation?.id === id) {
      setSelectedLocation(null)
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "tersedia":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Tersedia</Badge>
      case "terbatas":
        return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Terbatas</Badge>
      case "penuh":
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
        <p className="text-muted-foreground mt-2">Jelajahi, kelola, dan ajukan ke lokasi magang</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari lokasi..."
            className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Industri" />
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
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Kota" />
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

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="tersedia">Tersedia</SelectItem>
              <SelectItem value="terbatas">Terbatas</SelectItem>
              <SelectItem value="penuh">Penuh</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Urutkan berdasarkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nama</SelectItem>
              <SelectItem value="distance">Jarak</SelectItem>
              <SelectItem value="availability">Ketersediaan</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Lokasi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Tambah Lokasi Baru</DialogTitle>
                <DialogDescription>Masukkan detail lokasi magang baru</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nama Perusahaan/Institusi
                    </label>
                    <Input
                      id="name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                      placeholder="PT Contoh Indonesia"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="industry" className="text-sm font-medium">
                      Industri
                    </label>
                    <Input
                      id="industry"
                      value={newLocation.industry}
                      onChange={(e) => setNewLocation({ ...newLocation, industry: e.target.value })}
                      placeholder="Teknologi"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Alamat
                  </label>
                  <Input
                    id="address"
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                    placeholder="Jl. Contoh No. 123, Jakarta"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      Kota
                    </label>
                    <Input
                      id="city"
                      value={newLocation.city}
                      onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                      placeholder="Jakarta"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="positions" className="text-sm font-medium">
                      Posisi (dipisahkan dengan koma)
                    </label>
                    <Input
                      id="positions"
                      value={newLocation.positions?.join(", ")}
                      onChange={(e) =>
                        setNewLocation({
                          ...newLocation,
                          positions: e.target.value
                            .split(",")
                            .map((p) => p.trim())
                            .filter((p) => p),
                        })
                      }
                      placeholder="Pengembang Perangkat Lunak, Desainer UI/UX"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="quota" className="text-sm font-medium">
                      Kuota Total
                    </label>
                    <Input
                      id="quota"
                      type="number"
                      value={newLocation.quota || ""}
                      onChange={(e) =>
                        setNewLocation({
                          ...newLocation,
                          quota: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="remaining" className="text-sm font-medium">
                      Slot Tersisa
                    </label>
                    <Input
                      id="remaining"
                      type="number"
                      value={newLocation.remaining || ""}
                      onChange={(e) =>
                        setNewLocation({
                          ...newLocation,
                          remaining: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <Select
                      value={newLocation.status}
                      onValueChange={(value) =>
                        setNewLocation({
                          ...newLocation,
                          status: value as "tersedia" | "terbatas" | "penuh",
                        })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tersedia">Tersedia</SelectItem>
                        <SelectItem value="terbatas">Terbatas</SelectItem>
                        <SelectItem value="penuh">Penuh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddLocation}>Tambah Lokasi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <div
              key={location.id}
              className={cn(
                "rounded-lg border p-4 hover:bg-muted/30 transition-colors",
                selectedLocation?.id === location.id && "border-primary bg-primary/5",
                location.status === "penuh" && "opacity-70",
              )}
              onClick={() => setSelectedLocation(selectedLocation?.id === location.id ? null : location)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{location.name}</h3>
                      {location.favorite && (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          Favorit
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{location.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">{getStatusBadge(location.status)}</div>
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {location.city} • {location.distance?.toFixed(1)} km
                  </span>
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

              <div className="mt-3 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(location.id)
                  }}
                >
                  {location.favorite ? "Hapus Favorit" : "Tambah ke Favorit"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeLocation(location.id)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Tidak ada lokasi ditemukan</h3>
            <p className="text-sm text-muted-foreground mt-1">Coba sesuaikan filter Anda atau tambahkan lokasi baru</p>
            <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Lokasi
            </Button>
          </div>
        )}
      </div>

      {selectedLocation && (
        <Card className="overflow-hidden gradient-border mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <span>{selectedLocation.name}</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              {selectedLocation.industry} • {selectedLocation.city}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{selectedLocation.address}</span>
              </div>
              {getStatusBadge(selectedLocation.status)}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Posisi Tersedia</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLocation.positions.map((position, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/10">
                    {position}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Ketersediaan</h4>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {selectedLocation.remaining} dari {selectedLocation.quota} posisi tersedia
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(selectedLocation.remaining / selectedLocation.quota) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => toggleFavorite(selectedLocation.id)}>
                {selectedLocation.favorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
              </Button>
              <Button disabled={selectedLocation.status === "penuh"}>
                {selectedLocation.status === "penuh" ? (
                  "Tidak Ada Posisi Tersedia"
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Bentuk Tim & Ajukan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

