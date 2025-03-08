"use client"

import { useState } from "react"
import { Check, Search } from "lucide-react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockLecturers } from "./mock-lecturers"
import type { Lecturer } from "./types"

interface AssignLecturerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAssign: (lecturer: Lecturer) => void
  type: "supervisor" | "examiner"
  existingLecturers: Lecturer[]
}

export function AssignLecturerDialog({
  open,
  onOpenChange,
  onAssign,
  type,
  existingLecturers,
}: AssignLecturerDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null)

  // Filter out already assigned lecturers
  const existingLecturerIds = existingLecturers.map((lecturer) => lecturer.id)
  const availableLecturers = mockLecturers.filter((lecturer) => !existingLecturerIds.includes(lecturer.id))

  // Get unique departments for filter
  const departments = Array.from(new Set(mockLecturers.map((lecturer) => lecturer.department)))

  const filteredLecturers = availableLecturers.filter((lecturer) => {
    const matchesSearch =
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.expertise.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || lecturer.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  const handleSelectLecturer = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer)
  }

  const handleAssign = () => {
    if (selectedLecturer) {
      onAssign(selectedLecturer)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Pilih Dosen {type === "supervisor" ? "Pembimbing" : "Penguji"}</DialogTitle>
          <DialogDescription>
            Pilih dosen untuk ditugaskan sebagai {type === "supervisor" ? "pembimbing" : "penguji"} pada ujian ini
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari dosen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter departemen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Departemen</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md">
            <ScrollArea className="h-[300px]">
              <Command>
                <CommandList>
                  <CommandEmpty>Tidak ada dosen yang ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {filteredLecturers.map((lecturer) => {
                      const isSelected = selectedLecturer?.id === lecturer.id
                      return (
                        <CommandItem
                          key={lecturer.id}
                          onSelect={() => handleSelectLecturer(lecturer)}
                          className="flex items-center justify-between p-2"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center justify-center w-6 h-6 rounded-full border ${isSelected ? "bg-primary border-primary" : "border-input"}`}
                            >
                              {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                            </div>
                            <Avatar>
                              <AvatarImage src={lecturer.avatarUrl} alt={lecturer.name} />
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

          {selectedLecturer && (
            <div className="p-3 border rounded-md bg-muted/30">
              <div className="text-sm font-medium mb-2">Dosen Terpilih</div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedLecturer.avatarUrl} alt={selectedLecturer.name} />
                  <AvatarFallback>
                    {selectedLecturer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedLecturer.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedLecturer.department}</div>
                  <div className="text-xs text-muted-foreground">{selectedLecturer.expertise}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleAssign} disabled={!selectedLecturer}>
            Tugaskan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

