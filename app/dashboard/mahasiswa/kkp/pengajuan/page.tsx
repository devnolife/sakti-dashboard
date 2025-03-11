"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  Search,
  MapPin,
  Users,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { LocationType } from "@/components/location-manager"
import TeamMemberSelector from "@/components/team-member-selector"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

// SubLocation interface
interface SubLocation {
  id: string
  name: string
  address: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
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

export default function PengajuanPage() {
  // State for the current step in the submission process
  const [currentStep, setCurrentStep] = useState<"location" | "team" | "verification" | "success">("location")

  // State for selected location and team members
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showTeamSelector, setShowTeamSelector] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const [selectedSubLocation, setSelectedSubLocation] = useState<SubLocation | null>(null)
  const [showAddSubLocationDialog, setShowAddSubLocationDialog] = useState(false)
  const [newSubLocation, setNewSubLocation] = useState<Partial<SubLocation>>({
    name: "",
    address: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  })

  // Sample data for available locations
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
      subLocations: [
        {
          id: "subloc-001",
          name: "IT Department",
          address: "Floor 5, PT Teknologi Maju Building",
          contactPerson: "John Doe",
          contactEmail: "john.doe@teknologimaju.com",
          contactPhone: "081234567890",
        },
      ],
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

  // Filter locations based on search query
  const filteredLocations = locations.filter((location) => {
    return (
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.positions.some((pos) => pos.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  // Handle selecting a location
  const handleSelectLocation = (location: LocationType) => {
    setSelectedLocation(location)
  }

  // Handle proceeding to team selection
  const proceedToTeamSelection = () => {
    if (selectedLocation) {
      setCurrentStep("team")
      setShowTeamSelector(true)
    }
  }

  // Handle team selection completion
  const handleTeamSelectionComplete = (teamMembers: Student[]) => {
    setSelectedTeam(teamMembers)
    setShowTeamSelector(false)
    setCurrentStep("verification")
  }

  // Handle canceling team selection
  const cancelTeamSelection = () => {
    setShowTeamSelector(false)
    setCurrentStep("location")
  }

  // Handle submitting the application
  const handleSubmitApplication = () => {
    setConfirmDialogOpen(true)
  }

  // Handle confirming the application
  const confirmApplication = () => {
    setConfirmDialogOpen(false)
    setCurrentStep("success")

    // In a real application, you would submit this to the backend
    console.log("Application submitted for location:", selectedLocation?.name)
    console.log("Team members:", selectedTeam)

    // Update the remaining quota for the selected location
    if (selectedLocation) {
      setLocations(
        locations.map((loc) =>
          loc.id === selectedLocation.id ? { ...loc, remaining: Math.max(0, loc.remaining - 1) } : loc,
        ),
      )
    }
  }

  // Handle going back to a previous step
  const goBack = () => {
    if (currentStep === "team") {
      setCurrentStep("location")
      setShowTeamSelector(false)
    } else if (currentStep === "verification") {
      setCurrentStep("team")
      setShowTeamSelector(true)
    }
  }

  // Handle starting over
  const startOver = () => {
    setCurrentStep("location")
    setSelectedLocation(null)
    setSelectedTeam([])
    setSearchQuery("")
    setShowTeamSelector(false)
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

  // Handle adding a new sub-location
  const handleAddSubLocation = () => {
    if (selectedLocation) {
      const subLocationId = `subloc-${String(selectedLocation.subLocations.length + 1).padStart(3, "0")}`
      const newSubLoc: SubLocation = {
        id: subLocationId,
        name: newSubLocation.name || "",
        address: newSubLocation.address || "",
        contactPerson: newSubLocation.contactPerson || "",
        contactEmail: newSubLocation.contactEmail || "",
        contactPhone: newSubLocation.contactPhone || "",
      }

      setLocations(
        locations.map((loc) =>
          loc.id === selectedLocation.id ? { ...loc, subLocations: [...loc.subLocations, newSubLoc] } : loc,
        ),
      )

      setNewSubLocation({
        name: "",
        address: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
      })
      setShowAddSubLocationDialog(false)
    }
  }

  // Handle removing a sub-location
  const removeSubLocation = (locationId: string, subLocationId: string) => {
    setLocations(
      locations.map((loc) =>
        loc.id === locationId
          ? { ...loc, subLocations: loc.subLocations.filter((subloc) => subloc.id !== subLocationId) }
          : loc,
      ),
    )
    if (selectedSubLocation?.id === subLocationId) {
      setSelectedSubLocation(null)
    }
  }

  // If team selector is shown, render it
  if (showTeamSelector && selectedLocation) {
    return (
      <TeamMemberSelector
        selectedLocation={selectedLocation}
        onComplete={handleTeamSelectionComplete}
        onCancel={cancelTeamSelection}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep === "location" ||
                  currentStep === "team" ||
                  currentStep === "verification" ||
                  currentStep === "success"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
                }`}
            >
              <Building className="w-4 h-4" />
            </div>
            <span className={currentStep === "location" ? "font-medium" : ""}>Select Location</span>
          </div>
          <div className="w-12 h-px bg-muted md:w-24" />
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep === "team" || currentStep === "verification" || currentStep === "success"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
                }`}
            >
              <Users className="w-4 h-4" />
            </div>
            <span className={currentStep === "team" ? "font-medium" : ""}>Form Team</span>
          </div>
          <div className="w-12 h-px bg-muted md:w-24" />
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep === "verification" || currentStep === "success"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
                }`}
            >
              <FileText className="w-4 h-4" />
            </div>
            <span className={currentStep === "verification" ? "font-medium" : ""}>Verify</span>
          </div>
          <div className="w-12 h-px bg-muted md:w-24" />
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep === "success" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className={currentStep === "success" ? "font-medium" : ""}>Complete</span>
          </div>
        </div>
      </div>

      {/* Location Selection Step */}
      {currentStep === "location" && (
        <Card>
          <CardHeader>
            <CardTitle>Select Internship Location</CardTitle>
            <CardDescription>Choose a location for your KKP internship</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search locations..."
                className="w-full pl-8 rounded-md border-primary/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Locations List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    className={cn(
                      "rounded-lg border p-4 hover:bg-muted/30 transition-colors cursor-pointer",
                      selectedLocation?.id === location.id && "border-primary bg-primary/5",
                      location.status === "full" && "opacity-70",
                    )}
                    onClick={() => handleSelectLocation(location)}
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
                              <Badge
                                variant="outline"
                                className="text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                              >
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

                    {/* Sub-locations */}
                    {location.subLocations.length > 0 && (
                      <div className="mt-3">
                        <h4 className="mb-2 text-sm font-medium">Sub-locations:</h4>
                        <div className="space-y-2">
                          {location.subLocations.map((subLoc) => (
                            <div key={subLoc.id} className="text-xs text-muted-foreground">
                              {subLoc.name} - {subLoc.address}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-muted">
                    <Building className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No locations found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or check back later</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={startOver}>
              Cancel
            </Button>
            <Button onClick={proceedToTeamSelection} disabled={!selectedLocation || selectedLocation.status === "full"}>
              {selectedLocation?.status === "full" ? (
                "No Positions Available"
              ) : (
                <>
                  Continue to Team Selection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Verification Step */}
      {currentStep === "verification" && selectedLocation && (
        <Card>
          <CardHeader>
            <CardTitle>Verify Your Application</CardTitle>
            <CardDescription>Review your internship location and team members before submitting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location Details */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Selected Location</h3>
              <div className="p-4 border rounded-lg bg-muted/10">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 shrink-0">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{selectedLocation.name}</h3>
                      {getStatusBadge(selectedLocation.status)}
                    </div>
                    <p className="text-sm">{selectedLocation.industry}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{selectedLocation.address}</p>

                    <div className="grid grid-cols-1 gap-2 mt-3 md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {selectedLocation.city} • {selectedLocation.distance?.toFixed(1)} km
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Quota: {selectedLocation.remaining}/{selectedLocation.quota} remaining
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="mb-1 text-sm font-medium">Available Positions</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedLocation.positions.map((position, index) => (
                          <Badge key={index} variant="outline" className="bg-primary/5">
                            {position}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Sub-locations */}
                    {selectedLocation.subLocations.length > 0 && (
                      <div className="mt-3">
                        <h4 className="mb-1 text-sm font-medium">Sub-locations</h4>
                        <div className="space-y-2">
                          {selectedLocation.subLocations.map((subLoc) => (
                            <div key={subLoc.id} className="text-sm">
                              <p className="font-medium">{subLoc.name}</p>
                              <p className="text-muted-foreground">{subLoc.address}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Team Members */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Team Members ({selectedTeam.length})</h3>
              <div className="space-y-3">
                {selectedTeam.map((member, index) => (
                  <div key={member.id} className="p-4 border rounded-lg bg-muted/10">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                        {index + 1}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>NIM: {member.nim}</span>
                          <span>•</span>
                          <span>{member.major}</span>
                          <span>•</span>
                          <span>Year {member.year}</span>
                        </div>
                        {member.skills && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {member.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-primary/5">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Notes */}
            <div className="p-4 border rounded-lg bg-blue-500/5 border-blue-500/20">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700">Application Timeline</h4>
                  <p className="mt-1 text-sm text-blue-600">
                    After submission, your application will be reviewed by the KKP coordinator and the internship
                    location. You will receive a notification once your application is approved or if additional
                    information is required.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={goBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team Selection
            </Button>
            <Button onClick={handleSubmitApplication}>
              Submit Application
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Success Step */}
      {currentStep === "success" && selectedLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Application Submitted</span>
            </CardTitle>
            <CardDescription>Your team has been successfully registered for the internship</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 text-center border rounded-lg bg-green-500/10 border-green-500/20">
              <h3 className="mb-2 text-lg font-medium text-green-700">Congratulations!</h3>
              <p className="mb-4 text-sm text-green-600">
                Your team of {selectedTeam.length} members has been successfully registered for an internship at{" "}
                <strong>{selectedLocation.name}</strong>.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedTeam.map((member) => (
                  <Badge key={member.id} variant="outline" className="bg-green-500/5 border-green-500/20">
                    {member.name} ({member.nim})
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="mb-2 font-medium">Next Steps</h4>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li>Wait for confirmation from the internship location</li>
                <li>Complete any remaining requirements</li>
                <li>Attend the pre-internship orientation</li>
                <li>Prepare your internship proposal</li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg bg-blue-500/5 border-blue-500/20">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700">Application Timeline</h4>
                  <p className="text-sm text-blue-600">
                    Your application has been submitted on {new Date().toLocaleDateString()}. You can expect to receive
                    a response within 5-7 working days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={startOver}>Return to Locations</Button>
          </CardFooter>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Application Submission</DialogTitle>
            <DialogDescription>
              You are about to submit your internship application for {selectedLocation?.name} with a team of{" "}
              {selectedTeam.length} members.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-[300px] overflow-y-auto my-4">
            {selectedTeam.map((member, index) => (
              <div key={member.id} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                <div className="flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                  {index + 1}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">NIM: {member.nim}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Once confirmed, all team members will be notified and your team will be registered for the internship. This
            action cannot be undone.
          </p>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Go Back
            </Button>
            <Button onClick={confirmApplication}>
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Confirm Submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Sub-location Dialog */}
      <Dialog open={showAddSubLocationDialog} onOpenChange={setShowAddSubLocationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Sub-location</DialogTitle>
            <DialogDescription>Enter the details of the new sub-location or sub-agency.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newSubLocation.name}
                onChange={(e) => setNewSubLocation({ ...newSubLocation, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={newSubLocation.address}
                onChange={(e) => setNewSubLocation({ ...newSubLocation, address: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="contactPerson" className="text-right">
                Contact Person
              </Label>
              <Input
                id="contactPerson"
                value={newSubLocation.contactPerson}
                onChange={(e) => setNewSubLocation({ ...newSubLocation, contactPerson: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="contactEmail" className="text-right">
                Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={newSubLocation.contactEmail}
                onChange={(e) => setNewSubLocation({ ...newSubLocation, contactEmail: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="contactPhone" className="text-right">
                Phone
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                value={newSubLocation.contactPhone}
                onChange={(e) => setNewSubLocation({ ...newSubLocation, contactPhone: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddSubLocation}>
              Add Sub-location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

