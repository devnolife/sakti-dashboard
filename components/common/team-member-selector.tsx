"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, X, Check, Users, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Location } from "./location-manager"

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

interface TeamMemberSelectorProps {
  selectedLocation: Location | null
  onComplete: (teamMembers: Student[]) => void
  onCancel: () => void
}

export default function TeamMemberSelector({ selectedLocation, onComplete, onCancel }: TeamMemberSelectorProps) {
  // State for search and selected team members
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("search")
  const [selectedMembers, setSelectedMembers] = useState<Student[]>([])
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Sample data for available students
  const [availableStudents, setAvailableStudents] = useState<Student[]>([
    {
      id: "s-001",
      nim: "12345678",
      name: "Andi Saputra",
      major: "Computer Science",
      year: 3,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      skills: ["Programming", "Web Development", "UI/UX Design"],
      gpa: 3.8,
      availability: true,
    },
    {
      id: "s-002",
      nim: "23456789",
      name: "Budi Santoso",
      major: "Information Systems",
      year: 3,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      skills: ["Database Management", "System Analysis"],
      gpa: 3.5,
      availability: true,
    },
    {
      id: "s-003",
      nim: "34567890",
      name: "Citra Dewi",
      major: "Computer Science",
      year: 4,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      skills: ["Mobile Development", "UI/UX Design"],
      gpa: 3.9,
      availability: true,
    },
    {
      id: "s-004",
      nim: "45678901",
      name: "Dian Permata",
      major: "Information Systems",
      year: 3,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      skills: ["Project Management", "Business Analysis"],
      gpa: 3.7,
      availability: false,
    },
    {
      id: "s-005",
      nim: "56789012",
      name: "Eko Prasetyo",
      major: "Computer Engineering",
      year: 4,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      skills: ["Hardware Design", "IoT Development"],
      gpa: 3.6,
      availability: true,
    },
    {
      id: "s-006",
      nim: "67890123",
      name: "Fina Rahmawati",
      major: "Computer Science",
      year: 3,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      skills: ["Data Science", "Machine Learning"],
      gpa: 4.0,
      availability: true,
    },
    {
      id: "s-007",
      nim: "78901234",
      name: "Gunawan Wibowo",
      major: "Information Systems",
      year: 4,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      skills: ["Network Administration", "Cybersecurity"],
      gpa: 3.4,
      availability: true,
    },
    {
      id: "s-008",
      nim: "89012345",
      name: "Hana Putri",
      major: "Computer Science",
      year: 3,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      skills: ["Web Development", "Mobile Development"],
      gpa: 3.7,
      availability: true,
    },
  ])

  // Filter students based on search query
  const filteredStudents = availableStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery) ||
      student.major.toLowerCase().includes(searchQuery.toLowerCase())

    // Don't show already selected students in search results
    const notSelected = !selectedMembers.some((member) => member.id === student.id)

    return matchesSearch && notSelected
  })

  // Handle selecting a team member
  const selectMember = (student: Student) => {
    // Check if we've reached the maximum team size (usually 4 for KKP)
    if (selectedMembers.length >= 4) {
      setErrorMessage("Maximum team size is 4 members")
      return
    }

    // Check if student is available
    if (!student.availability) {
      setErrorMessage(`${student.name} is not available for team formation`)
      return
    }

    setSelectedMembers([...selectedMembers, student])
    setErrorMessage(null)
  }

  // Handle removing a team member
  const removeMember = (studentId: string) => {
    setSelectedMembers(selectedMembers.filter((member) => member.id !== studentId))
    setErrorMessage(null)
  }

  // Handle completing team formation
  const handleComplete = () => {
    // Validate team size (minimum 2 members for KKP)
    if (selectedMembers.length < 2) {
      setErrorMessage("Team must have at least 2 members")
      return
    }

    // If all validations pass, show confirmation dialog
    setConfirmDialogOpen(true)
  }

  // Handle confirming team formation
  const confirmTeamFormation = () => {
    onComplete(selectedMembers)
    setConfirmDialogOpen(false)
  }

  // Clear error message after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Team Member Selection</span>
        </CardTitle>
        <CardDescription>
          {selectedLocation ? (
            <>
              Select team members for your internship at <strong>{selectedLocation.name}</strong>
            </>
          ) : (
            <>Select team members for your internship</>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Error message */}
        {errorMessage && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Team information */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Team Information</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Your team must have 2-4 members from the same program. All team members must be available for the internship
            period.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Current team size:</span>
            <Badge variant={selectedMembers.length < 2 ? "destructive" : "default"}>
              {selectedMembers.length} / 4 members
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="search" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="search">Search Students</TabsTrigger>
            <TabsTrigger value="selected">Selected Team ({selectedMembers.length})</TabsTrigger>
          </TabsList>

          {/* Search tab */}
          <TabsContent value="search" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, NIM, or major..."
                className="w-full pl-8 rounded-md border-primary/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors",
                      !student.availability && "opacity-60",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                        <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{student.name}</h4>
                          {!student.availability && (
                            <Badge variant="outline" className="text-muted-foreground">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>NIM: {student.nim}</span>
                          <span>•</span>
                          <span>{student.major}</span>
                          <span>•</span>
                          <span>Year {student.year}</span>
                        </div>
                        {student.skills && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {student.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-primary/5">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={student.availability ? "default" : "outline"}
                      onClick={() => selectMember(student)}
                      disabled={!student.availability}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No students found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery ? "Try a different search term" : "Start typing to search for students"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Selected team members tab */}
          <TabsContent value="selected" className="space-y-4">
            {selectedMembers.length > 0 ? (
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-primary/5 border-primary/20"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
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
                          <span>GPA: {member.gpa}</span>
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
                    <Button size="sm" variant="destructive" onClick={() => removeMember(member.id)}>
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No team members selected</h3>
                <p className="text-sm text-muted-foreground mt-1">Go to the Search tab to add team members</p>
                <Button className="mt-4" variant="outline" onClick={() => setSelectedTab("search")}>
                  Search Students
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleComplete} disabled={selectedMembers.length < 2}>
          {selectedMembers.length < 2 ? "Need at least 2 members" : "Confirm Team Selection"}
        </Button>
      </CardFooter>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Team Formation</DialogTitle>
            <DialogDescription>
              You are about to form a team with the following members for your internship
              {selectedLocation && (
                <>
                  {" "}
                  at <strong>{selectedLocation.name}</strong>
                </>
              )}
              .
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-[300px] overflow-y-auto my-4">
            {selectedMembers.map((member, index) => (
              <div key={member.id} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {index + 1}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
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
            <Button onClick={confirmTeamFormation}>
              <Check className="h-4 w-4 mr-1" />
              Confirm Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

