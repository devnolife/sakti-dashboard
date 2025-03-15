"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { CommitteeMember } from "@/types/exam"

// Mock data for lecturers
const mockLecturers = [
  {
    id: "l1",
    name: "Dr. Budi Santoso",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l2",
    name: "Dr. Citra Dewi",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l3",
    name: "Dr. Dian Purnama",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l4",
    name: "Dr. Eko Prasetyo",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l5",
    name: "Dr. Fitri Handayani",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l6",
    name: "Dr. Gunawan Wibisono",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l7",
    name: "Dr. Hani Fujianti",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l8",
    name: "Dr. Irfan Hakim",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l9",
    name: "Dr. Joko Widodo",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l10",
    name: "Dr. Kartika Sari",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l11",
    name: "Dr. Lukman Hakim",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l12",
    name: "Dr. Maya Nabila",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l13",
    name: "Dr. Nugroho Santoso",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l14",
    name: "Dr. Olivia Putri",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "l15",
    name: "Dr. Prabowo Subianto",
    department: "Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

interface CommitteeMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddMember: (member: CommitteeMember) => void
  existingMembers: CommitteeMember[]
  title?: string
  description?: string
}

export function CommitteeMemberDialog({
  open,
  onOpenChange,
  onAddMember,
  existingMembers,
  title = "Tambah Anggota Komite",
  description = "Pilih dosen untuk ditugaskan pada ujian ini",
}: CommitteeMemberDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLecturer, setSelectedLecturer] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("Ketua")
  const [filteredLecturers, setFilteredLecturers] = useState(mockLecturers)
  const [activeTab, setActiveTab] = useState("all")

  // Filter lecturers based on search query and department
  useEffect(() => {
    // Move the filtering of available lecturers inside the useEffect
    const availableLecturersList = mockLecturers.filter(
      (lecturer) => !existingMembers.some((member) => member.id === lecturer.id),
    )

    let filtered = availableLecturersList

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (lecturer) => lecturer.name.toLowerCase().includes(query) || lecturer.department.toLowerCase().includes(query),
      )
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((lecturer) => lecturer.department === activeTab)
    }

    setFilteredLecturers(filtered)
  }, [searchQuery, activeTab, existingMembers]) // Remove availableLecturers from dependencies

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already applied via useEffect
  }

  const handleAddMember = () => {
    if (selectedLecturer) {
      const lecturer = mockLecturers.find((l) => l.id === selectedLecturer)
      if (lecturer) {
        // Set role based on the dialog title if it includes "Pembimbing"
        const defaultRole = title.includes("Pembimbing") ? 
          title.includes("Pembimbing 1") ? "Pembimbing 1" : "Pembimbing 2" : 
          selectedRole
          
        const newMember: CommitteeMember = {
          id: lecturer.id,
          name: lecturer.name,
          role: defaultRole,
          department: lecturer.department,
          avatarUrl: lecturer.avatarUrl,
        }
        onAddMember(newMember)
        setSelectedLecturer(null)
        setSelectedRole("Ketua")
        setSearchQuery("")
      }
    }
  }

  // Get unique departments for tabs
  const departments = Array.from(new Set(mockLecturers.map((lecturer) => lecturer.department)))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari dosen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border shadow-sm dark:bg-card border-input focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
            />
          </form>

          {/* Department Tabs */}
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap h-auto p-1 bg-muted/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm h-8 px-3"
              >
                Semua
              </TabsTrigger>
              {departments.map((department) => (
                <TabsTrigger
                  key={department}
                  value={department}
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm h-8 px-3"
                >
                  {department}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Lecturers List */}
          <div className="overflow-hidden bg-white border rounded-lg dark:bg-card">
            <ScrollArea className="h-[300px]">
              <div className="p-1">
                {filteredLecturers.length > 0 ? (
                  filteredLecturers.map((lecturer) => (
                    <div
                      key={lecturer.id}
                      className={`flex items-center justify-between p-3 rounded-md transition-colors cursor-pointer ${
                        selectedLecturer === lecturer.id ? "bg-primary/10 dark:bg-primary/20" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedLecturer(lecturer.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border border-border">
                          <AvatarImage src={lecturer.avatarUrl} alt={lecturer.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {lecturer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{lecturer.name}</p>
                          <p className="text-xs text-muted-foreground">{lecturer.department}</p>
                        </div>
                      </div>
                      {selectedLecturer === lecturer.id && (
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="p-3 mb-4 rounded-full bg-muted">
                      <X className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">Tidak ada dosen</h3>
                    <p className="mt-1 text-muted-foreground">Tidak ada dosen yang sesuai dengan pencarian.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Selected Lecturer Details */}
          {selectedLecturer && (
            <div className="p-4 space-y-4 border rounded-lg border-border">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-primary/10">
                  <AvatarImage
                    src={mockLecturers.find((l) => l.id === selectedLecturer)?.avatarUrl}
                    alt={mockLecturers.find((l) => l.id === selectedLecturer)?.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {mockLecturers
                      .find((l) => l.id === selectedLecturer)
                      ?.name.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {mockLecturers.find((l) => l.id === selectedLecturer)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {mockLecturers.find((l) => l.id === selectedLecturer)?.department}
                  </p>
                </div>
              </div>

              {!title.includes("Pembimbing") && (
                <div className="space-y-2">
                  <Label htmlFor="role">Peran dalam Ujian</Label>
                  <RadioGroup
                    id="role"
                    value={selectedRole}
                    onValueChange={setSelectedRole}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ketua" id="ketua" />
                      <Label htmlFor="ketua" className="cursor-pointer">
                        Ketua
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Anggota" id="anggota" />
                      <Label htmlFor="anggota" className="cursor-pointer">
                        Anggota
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sekretaris" id="sekretaris" />
                      <Label htmlFor="sekretaris" className="cursor-pointer">
                        Sekretaris
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Penguji 1" id="penguji1" />
                      <Label htmlFor="penguji1" className="cursor-pointer">
                        Penguji 1
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Penguji 2" id="penguji2" />
                      <Label htmlFor="penguji2" className="cursor-pointer">
                        Penguji 2
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Penguji 3" id="penguji3" />
                      <Label htmlFor="penguji3" className="cursor-pointer">
                        Penguji 3
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            onClick={handleAddMember}
            disabled={!selectedLecturer}
            className={!selectedLecturer ? "opacity-50 cursor-not-allowed" : ""}
          >
            Tambahkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

