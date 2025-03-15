"use client"

import { CardFooter } from "@/components/ui/card"

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
import { Building, Search, MapPin, Users, Briefcase, Plus, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import TeamMemberSelector from "./team-member-selector"

// Location interface
export interface SubLocation {
  id: string
  name: string
  address: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
}

export interface LocationType {
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

// Student interface
interface Student {
  id: string
  nim: string
  name: string
  major: string
  year: number
  avatarUrl?: string
  skills?: string[]
  gpa?: number
  availability?: boolean
}

interface LocationManagerProps {
  userId?: string // Optional user ID for personalization
}

export default function LocationManager({ userId }: LocationManagerProps) {
  // State for locations
  const [locations, setLocations] = useState<LocationType[]>([
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
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newLocation, setNewLocation] = useState<Partial<LocationType>>({
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

  // State for team selection
  const [showTeamSelector, setShowTeamSelector] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Student[]>([])
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

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
    const newLoc: LocationType = {
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
      subLocations: [],
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

  // Handle team selection completion
  const handleTeamSelectionComplete = (teamMembers: Student[]) => {
    setSelectedTeam(teamMembers)
    setShowTeamSelector(false)
    setApplicationSubmitted(true)

    // In a real application, you would submit this to the backend
    console.log("Team formed for location:", selectedLocation?.name)
    console.log("Team members:", teamMembers)

    // Update the remaining quota for the selected location
    if (selectedLocation) {
      setLocations(
        locations.map((loc) =>
          loc.id === selectedLocation.id ? { ...loc, remaining: Math.max(0, loc.remaining - 1) } : loc,
        ),
      )
    }
  }

  // Handle starting the application process
  const startApplication = () => {
    if (selectedLocation && selectedLocation.status !== "full") {
      setShowTeamSelector(true)
    }
  }

  // Handle canceling team selection
  const cancelTeamSelection = () => {
    setShowTeamSelector(false)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Available</Badge>
      case "limited":
        return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Limited</Badge>
      case "full":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Full</Badge>
      default:
        return null
    }
  }

  // If team selector is shown, render it instead of the location list
  if (showTeamSelector) {
    return <TeamMemberSelector onComplete={handleTeamSelectionComplete} onCancel={cancelTeamSelection} />
  }

  // If application is submitted, show success message
  if (applicationSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span>Application Submitted</span>
          </CardTitle>
          <CardDescription>Your team has been successfully registered for the internship</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
            <h3 className="text-lg font-medium text-green-700 mb-2">Congratulations!</h3>
            <p className="text-sm text-green-600 mb-4">
              Your team of {selectedTeam.length} members has been successfully registered for an internship at{" "}
              <strong>{selectedLocation?.name}</strong>.
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {selectedTeam.map((member) => (
                <Badge key={member.id} variant="outline" className="bg-green-500/5 border-green-500/20">
                  {member.name} ({member.nim})
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-2">Next Steps</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Wait for confirmation from the internship location</li>
              <li>Complete any remaining requirements</li>
              <li>Attend the pre-internship orientation</li>
              <li>Prepare your internship proposal</li>
            </ol>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setApplicationSubmitted(false)}>Return to Locations</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
                <Plus className="h-4 w-4 mr-2" />
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
                    <label htmlFor="name" className="text-sm font-medium">
                      Company/Institution Name
                    </label>
                    <Input
                      id="name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                      placeholder="PT Example Indonesia"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="industry" className="text-sm font-medium">
                      Industry
                    </label>
                    <Input
                      id="industry"
                      value={newLocation.industry}
                      onChange={(e) => setNewLocation({ ...newLocation, industry: e.target.value })}
                      placeholder="Technology"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address
                  </label>
                  <Input
                    id="address"
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                    placeholder="Jl. Example No. 123, Jakarta"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      City
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
                      Positions (comma separated)
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
                      placeholder="Software Developer, UI/UX Designer"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="quota" className="text-sm font-medium">
                      Total Quota
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
                      Remaining Slots
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
      <div className="space-y-3">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <div
              key={location.id}
              className={cn(
                "rounded-lg border p-4 hover:bg-muted/30 transition-colors cursor-pointer",
                selectedLocation?.id === location.id && "border-primary bg-primary/5",
                location.status === "full" && "opacity-70",
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
                          Favorite
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
                    Quota: {location.remaining}/{location.quota} remaining
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 flex justify-end gap-2">
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
            <h3 className="text-lg font-medium">No locations found</h3>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or add a new location</p>
            <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
        )}
      </div>

      {/* Selected Location Details (inline) */}
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
                <p className="text-sm font-medium">{selectedLocation.contactPerson}</p>
                <p className="text-xs text-muted-foreground">{selectedLocation.contactPosition}</p>
                <div className="mt-2 text-xs">
                  <p>Email: {selectedLocation.contactEmail}</p>
                  <p>Telepon: {selectedLocation.contactPhone}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => toggleFavorite(selectedLocation.id)}>
              {selectedLocation.favorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            <Button onClick={startApplication} disabled={selectedLocation.status === "full"}>
              {selectedLocation.status === "full" ? (
                "No Positions Available"
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Form Team & Apply
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export type Location = LocationType

\"\

