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
      industry: "Technology",
      positions: ["Software Developer", "UI/UX Designer"],
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
      industry: "Banking & Finance",
      positions: ["Financial Analyst", "Risk Management"],
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
      industry: "Healthcare",
      positions: ["Medical Information Systems"],
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
      industry: "Government",
      positions: ["Education Policy", "Information Systems"],
      quota: 12,
      remaining: 8,
      status: "available",
      distance: 4.8,
      subLocations: [],
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
    status: "available",
    subLocations: [],
  })

  // State for sub-locations
  const [newSubLocations, setNewSubLocations] = useState<Partial<SubLocation>[]>([])

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
      status: (newLocation.status as "available" | "limited" | "full") || "available",
      distance: Math.random() * 10, // Random distance for demo
      subLocations: newSubLocations.map((subLoc, index) => ({
        id: `subloc-${id}-${index + 1}`,
        name: subLoc.name || "",
        address: subLoc.address || "",
        contactPerson: subLoc.contactPerson || "",
        contactEmail: subLoc.contactEmail || "",
        contactPhone: subLoc.contactPhone || "",
      })),
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
      status: "available",
      subLocations: [],
    })
    setNewSubLocations([])
    setShowAddDialog(false)
  }

  // Handle adding a new sub-location field
  const handleAddSubLocationField = () => {
    setNewSubLocations([...newSubLocations, {}])
  }

  // Handle updating a sub-location field
  const handleUpdateSubLocation = (index: number, field: keyof SubLocation, value: string) => {
    const updatedSubLocations = [...newSubLocations]
    updatedSubLocations[index] = { ...updatedSubLocations[index], [field]: value }
    setNewSubLocations(updatedSubLocations)
  }

  // Handle removing a sub-location field
  const handleRemoveSubLocationField = (index: number) => {
    const updatedSubLocations = newSubLocations.filter((_, i) => i !== index)
    setNewSubLocations(updatedSubLocations)
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
      case "available":
        return <Badge className="text-green-500 bg-green-500/10 hover:bg-green-500/20">Available</Badge>
      case "limited":
        return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Limited</Badge>
      case "full":
        return <Badge className="text-red-500 bg-red-500/10 hover:bg-red-500/20">Full</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Internship Locations
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">Browse, manage, and apply to internship locations</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search locations..."
            className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap w-full gap-2 md:w-auto">
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
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
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="limited">Limited</SelectItem>
              <SelectItem value="full">Full</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="availability">Availability</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
                <DialogDescription>Enter the details of the new internship location</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company/Institution Name</Label>
                    <Input
                      id="name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                      placeholder="PT Example Indonesia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={newLocation.industry}
                      onChange={(e) => setNewLocation({ ...newLocation, industry: e.target.value })}
                      placeholder="Technology"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                    placeholder="Jl. Example No. 123, Jakarta"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newLocation.city}
                      onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                      placeholder="Jakarta"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="positions">Positions (comma separated)</Label>
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
                      placeholder="Software Developer, UI/UX Designer"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quota">Total Quota</Label>
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
                    <Label htmlFor="remaining">Remaining Slots</Label>
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
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newLocation.status}
                      onValueChange={(value) =>
                        setNewLocation({
                          ...newLocation,
                          status: value as "available" | "limited" | "full",
                        })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sub-locations section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Sub-locations</h4>
                    <Button onClick={handleAddSubLocationField} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Sub-location
                    </Button>
                  </div>
                  {newSubLocations.map((subLoc, index) => (
                    <div key={index} className="p-4 space-y-2 border rounded-md">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium">Sub-location {index + 1}</h5>
                        <Button onClick={() => handleRemoveSubLocationField(index)} variant="ghost" size="sm">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Sub-location Name"
                          value={subLoc.name || ""}
                          onChange={(e) => handleUpdateSubLocation(index, "name", e.target.value)}
                        />
                        <Input
                          placeholder="Sub-location Address"
                          value={subLoc.address || ""}
                          onChange={(e) => handleUpdateSubLocation(index, "address", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          placeholder="Contact Person"
                          value={subLoc.contactPerson || ""}
                          onChange={(e) => handleUpdateSubLocation(index, "contactPerson", e.target.value)}
                        />
                        <Input
                          placeholder="Contact Email"
                          type="email"
                          value={subLoc.contactEmail || ""}
                          onChange={(e) => handleUpdateSubLocation(index, "contactEmail", e.target.value)}
                        />
                        <Input
                          placeholder="Contact Phone"
                          type="tel"
                          value={subLoc.contactPhone || ""}
                          onChange={(e) => handleUpdateSubLocation(index, "contactPhone", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLocation}>Add Location</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Locations List */}
      <div className="space-y-4">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <div
              key={location.id}
              className={cn(
                "rounded-lg border p-4 hover:bg-muted/30 transition-colors",
                selectedLocation?.id === location.id && "border-primary bg-primary/5",
                location.status === "full" && "opacity-70",
              )}
              onClick={() => setSelectedLocation(selectedLocation?.id === location.id ? null : location)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{location.name}</h3>
                      {location.favorite && (
                        <Badge variant="outline" className="text-yellow-500 bg-yellow-500/10 border-yellow-500/20">
                          Favorite
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{location.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">{getStatusBadge(location.status)}</div>
              </div>

              <div className="grid grid-cols-1 gap-2 mt-3 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {location.city} • {location.distance?.toFixed(1)} km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {location.positions.slice(0, 2).join(", ")}
                    {location.positions.length > 2 && "..."}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Quota: {location.remaining}/{location.quota} remaining
                  </span>
                </div>
              </div>

              {/* Display sub-locations if any */}
              {location.subLocations.length > 0 && (
                <div className="mt-3">
                  <h4 className="mb-2 text-sm font-medium">Sub-locations:</h4>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {location.subLocations.map((subLoc) => (
                      <div key={subLoc.id} className="text-xs text-muted-foreground">
                        {subLoc.name} - {subLoc.address}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(location.id)
                  }}
                >
                  {location.favorite ? "Remove Favorite" : "Add to Favorites"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeLocation(location.id)
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-muted">
              <Building className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No locations found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or add a new location</p>
            <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </div>
        )}
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <Card className="mt-4 overflow-hidden gradient-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <span>{selectedLocation.name}</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>
              {selectedLocation.industry} • {selectedLocation.city}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{selectedLocation.address}</span>
              </div>
              {getStatusBadge(selectedLocation.status)}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Available Positions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLocation.positions.map((position, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/10">
                    {position}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Availability</h4>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {selectedLocation.remaining} of {selectedLocation.quota} positions available
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(selectedLocation.remaining / selectedLocation.quota) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Display sub-locations */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Sub-locations</h4>
              {selectedLocation.subLocations.length > 0 ? (
                <div className="space-y-2">
                  {selectedLocation.subLocations.map((subLoc) => (
                    <div key={subLoc.id} className="p-2 border rounded-md">
                      <p className="font-medium">{subLoc.name}</p>
                      <p className="text-sm text-muted-foreground">{subLoc.address}</p>
                      <p className="text-sm">Contact: {subLoc.contactPerson}</p>
                      <p className="text-sm">Email: {subLoc.contactEmail}</p>
                      <p className="text-sm">Phone: {subLoc.contactPhone}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No sub-locations available for this location.</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => toggleFavorite(selectedLocation.id)}>
                {selectedLocation.favorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
              <Button disabled={selectedLocation.status === "full"}>
                {selectedLocation.status === "full" ? (
                  "No Positions Available"
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Form Team & Apply
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

