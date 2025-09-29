"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { getHardcodedUserId } from "@/lib/auth-utils"
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
import { Building, Search, MapPin, Users, Briefcase, Plus, X, UserPlus, Trash2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

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

// Creator interface
interface Creator {
  id: string
  nim: string
  userId: string
  user: {
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
  province?: string
  industry: string
  positions: string[] // JSON array from database
  quota: number
  remaining: number
  status: "available" | "limited" | "full"
  distance?: number // in km
  contactPerson?: string
  contactEmail?: string
  contactPhone?: string
  description?: string
  company?: Company
  createdBy: Creator
  subLocations: SubLocation[]
  _count: {
    documents: number
  }
  createdAt: string
  updatedAt: string
}

export default function LocationsPage() {
  const { user, isLoading: authLoading } = useAuth()
  
  // State for locations
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

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
          description: result.error || "Failed to fetch locations",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching locations:', error)
      toast({
        title: "Error",
        description: "Failed to fetch locations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddLocation = async (locationData: any) => {
    try {
      setSubmitting(true)
      const response = await fetch('/api/kkp/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Location added successfully",
        })
        setLocations(prev => [result.data, ...prev])
        setShowAddLocationDialog(false)
        resetNewLocationForm()
      } else {
        toast({
          title: "Error", 
          description: result.error || "Failed to add location",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error adding location:', error)
      toast({
        title: "Error",
        description: "Failed to add location",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteLocation = async (locationId: string) => {
    try {
      const response = await fetch(`/api/kkp/locations/${locationId}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Location deleted successfully",
        })
        setLocations(prev => prev.filter(loc => loc.id !== locationId))
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete location", 
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error deleting location:', error)
      toast({
        title: "Error",
        description: "Failed to delete location",
        variant: "destructive",
      })
    }
  }

  // Load locations on component mount
  useEffect(() => {
    fetchLocations()
  }, [])

  // States for various filters
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [cityFilter, setCityFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showAddLocationDialog, setShowAddLocationDialog] = useState(false)
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    industry: "",
    positions: [] as string[],
    quota: 0,
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    description: "",
    companyId: "",
    subLocations: [] as Partial<SubLocation>[],
  })
  const [newPosition, setNewPosition] = useState("")
  
  // Form management functions
  const resetNewLocationForm = () => {
    setNewLocation({
      name: "",
      address: "",
      city: "",
      province: "",
      industry: "",
      positions: [],
      quota: 0,
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
      companyId: "",
      subLocations: [],
    })
    setNewPosition("")
  }

  const addPosition = () => {
    if (newPosition.trim()) {
      setNewLocation(prev => ({
        ...prev,
        positions: [...prev.positions, newPosition.trim()]
      }))
      setNewPosition("")
    }
  }

  const removePosition = (index: number) => {
    setNewLocation(prev => ({
      ...prev,
      positions: prev.positions.filter((_, i) => i !== index)
    }))
  }

  const addSubLocation = () => {
    setNewLocation(prev => ({
      ...prev,
      subLocations: [...prev.subLocations, {
        name: "",
        address: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
      }]
    }))
  }

  const updateSubLocation = (index: number, field: string, value: string) => {
    setNewLocation(prev => ({
      ...prev,
      subLocations: prev.subLocations.map((sub, i) => 
        i === index ? { ...sub, [field]: value } : sub
      )
    }))
  }

  const removeSubLocation = (index: number) => {
    setNewLocation(prev => ({
      ...prev,
      subLocations: prev.subLocations.filter((_, i) => i !== index)
    }))
  }

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
        // Default sort by name
        return a.name.localeCompare(b.name)
      }
    })

  // Check if current user can delete a location
  const canDeleteLocation = (location: Location) => {
    if (!location.createdBy) return false
    
    // For development: use hardcoded user ID
    const isDevelopment = process.env.NODE_ENV === 'development'
    const currentUserId = isDevelopment ? getHardcodedUserId() : user?.id
    
    return location.createdBy.userId === currentUserId
  }

  // Handle form submission
  const handleSubmit = () => {
    // Validate required fields
    if (!newLocation.name.trim() || !newLocation.address.trim() || 
        !newLocation.city.trim() || !newLocation.industry.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Prepare data for API
    const locationData = {
      ...newLocation,
      positions: newLocation.positions,
      subLocations: newLocation.subLocations.filter(sub => 
        sub.name?.trim() && sub.address?.trim() && sub.contactPerson?.trim()
      ),
    }

    handleAddLocation(locationData)
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

                <div className="space-y-2">
                  <Label htmlFor="sort">Urutkan</Label>
                  <Select value={sortBy || "default"} onValueChange={(v) => setSortBy(v === "default" ? null : v)}>
                    <SelectTrigger id="sort">
                      <SelectValue placeholder="Urutan default" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Urutan default</SelectItem>
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
                        {canDeleteLocation(location) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteLocation(location.id)}
                            className="h-8 w-8 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="sr-only">Hapus lokasi</span>
                          </Button>
                        )}
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
                            {canDeleteLocation(location) && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteLocation(location.id)}
                                className="h-6 w-6 text-red-400 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Hapus lokasi</span>
                              </Button>
                            )}
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
                  </div>
                </div>

                {/* Sub-locations section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Sub-lokasi/Cabang</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addSubLocation}>
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Sub-lokasi
                    </Button>
                  </div>

                  {newLocation.subLocations.map((subLoc, index) => (
                    <div key={index} className="rounded-lg border p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Sub-lokasi #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSubLocation(index)}
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
                            onChange={(e) => updateSubLocation(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`subloc-${index}-address`}>Alamat</Label>
                          <Input
                            id={`subloc-${index}-address`}
                            value={subLoc.address}
                            onChange={(e) => updateSubLocation(index, "address", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`subloc-${index}-contact`}>Nama Kontak</Label>
                          <Input
                            id={`subloc-${index}-contact`}
                            value={subLoc.contactPerson}
                            onChange={(e) =>
                              updateSubLocation(index, "contactPerson", e.target.value)
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
                              updateSubLocation(index, "contactEmail", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`subloc-${index}-phone`}>Telepon Kontak</Label>
                          <Input
                            id={`subloc-${index}-phone`}
                            value={subLoc.contactPhone}
                            onChange={(e) =>
                              updateSubLocation(index, "contactPhone", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddLocationDialog(false)}
                  disabled={submitting}
                >
                  Batal
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan Lokasi
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}

