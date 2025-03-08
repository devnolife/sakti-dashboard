"use client"

import { useState } from "react"
import { Check, Search, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CommitteeMember } from "@/types/exam"

// Mock data for available lecturers
const availableLecturers = [
  {
    id: "lec-101",
    name: "Dr. Ahmad Dahlan",
    department: "Computer Science",
    expertise: "Artificial Intelligence",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "lec-102",
    name: "Dr. Kartini Wijaya",
    department: "Information Systems",
    expertise: "Database Systems",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "lec-103",
    name: "Dr. Hatta Rajasa",
    department: "Computer Science",
    expertise: "Computer Networks",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "lec-104",
    name: "Dr. Fatmawati Soekarno",
    department: "Information Systems",
    expertise: "Human-Computer Interaction",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "lec-105",
    name: "Dr. Soedirman Prawiro",
    department: "Computer Science",
    expertise: "Machine Learning",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "lec-106",
    name: "Dr. Megawati Thamrin",
    department: "Information Systems",
    expertise: "Information Security",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "lec-107",
    name: "Dr. Soekarno Hatta",
    department: "Computer Science",
    expertise: "Software Engineering",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "lec-108",
    name: "Dr. Cut Nyak Dien",
    department: "Information Systems",
    expertise: "Data Mining",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

interface CommitteeMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddMembers: (members: CommitteeMember[]) => void
  existingMembers: CommitteeMember[]
}

export function CommitteeMemberDialog({
  open,
  onOpenChange,
  onAddMembers,
  existingMembers,
}: CommitteeMemberDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLecturers, setSelectedLecturers] = useState<Record<string, { role: string }>>({})

  // Filter out already selected committee members
  const existingMemberIds = existingMembers.map((member) => member.id)
  const filteredLecturers = availableLecturers.filter((lecturer) => !existingMemberIds.includes(lecturer.id))

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleSelectLecturer = (lecturerId: string) => {
    setSelectedLecturers((prev) => {
      const newSelected = { ...prev }
      if (newSelected[lecturerId]) {
        delete newSelected[lecturerId]
      } else {
        newSelected[lecturerId] = { role: "Member" }
      }
      return newSelected
    })
  }

  const handleRoleChange = (lecturerId: string, role: string) => {
    setSelectedLecturers((prev) => ({
      ...prev,
      [lecturerId]: { ...prev[lecturerId], role },
    }))
  }

  const handleAddMembers = () => {
    const newMembers = Object.entries(selectedLecturers).map(([id, { role }]) => {
      const lecturer = availableLecturers.find((l) => l.id === id)!
      return {
        id,
        name: lecturer.name,
        role,
        department: lecturer.department,
        avatar: lecturer.avatar,
      }
    })

    onAddMembers(newMembers)
    setSelectedLecturers({})
    onOpenChange(false)
  }

  const filteredResults = filteredLecturers.filter((lecturer) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      lecturer.name.toLowerCase().includes(searchLower) ||
      lecturer.department.toLowerCase().includes(searchLower) ||
      lecturer.expertise.toLowerCase().includes(searchLower)
    )
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Committee Members</DialogTitle>
          <DialogDescription>Select lecturers to add to the examination committee</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="search-lecturers">Search Lecturers</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-lecturers"
                placeholder="Search by name, department, or expertise..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <ScrollArea className="h-[300px]">
              <Command>
                <CommandList>
                  <CommandEmpty>No lecturers found.</CommandEmpty>
                  <CommandGroup>
                    {filteredResults.map((lecturer) => {
                      const isSelected = !!selectedLecturers[lecturer.id]
                      return (
                        <CommandItem
                          key={lecturer.id}
                          onSelect={() => handleSelectLecturer(lecturer.id)}
                          className="flex items-center justify-between p-2"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center justify-center w-6 h-6 rounded-full border ${isSelected ? "bg-primary border-primary" : "border-input"}`}
                            >
                              {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                            </div>
                            <Avatar>
                              <AvatarImage src={lecturer.avatar} alt={lecturer.name} />
                              <AvatarFallback>
                                {lecturer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{lecturer.name}</div>
                              <div className="text-sm text-muted-foreground">{lecturer.department}</div>
                            </div>
                          </div>
                          <Badge variant="outline">{lecturer.expertise}</Badge>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </ScrollArea>
          </div>

          {Object.keys(selectedLecturers).length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Selected Lecturers</h3>
              <div className="space-y-2">
                {Object.entries(selectedLecturers).map(([id, { role }]) => {
                  const lecturer = availableLecturers.find((l) => l.id === id)!
                  return (
                    <div key={id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={lecturer.avatar} alt={lecturer.name} />
                          <AvatarFallback>
                            {lecturer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{lecturer.name}</div>
                          <div className="text-sm text-muted-foreground">{lecturer.department}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={role} onValueChange={(value) => handleRoleChange(id, value)}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Chair">Chair</SelectItem>
                            <SelectItem value="Secretary">Secretary</SelectItem>
                            <SelectItem value="Member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" onClick={() => handleSelectLecturer(id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddMembers} disabled={Object.keys(selectedLecturers).length === 0}>
            Add Selected Members
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

