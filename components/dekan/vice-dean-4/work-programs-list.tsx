"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, MapPin, Calendar, Clock, CheckCircle, AlertTriangle, FileText } from "lucide-react"
import { teams, getLocationName, getSupervisorName, getTeamMembers } from "./mock-data"
import { WorkProgramDetailsDialog } from "./work-program-details-dialog"

interface WorkProgramsListProps {
  searchQuery: string
  selectedDepartment: string | null
}

export function WorkProgramsList({ searchQuery, selectedDepartment }: WorkProgramsListProps) {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)

  // Filter work programs based on search query and selected department
  const filteredPrograms = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.workProgram.toLowerCase().includes(searchQuery.toLowerCase())

    // Check if any team member belongs to the selected department
    const teamMembers = getTeamMembers(team.id)
    const matchesDepartment =
      !selectedDepartment || teamMembers.some((member) => member.department === selectedDepartment)

    return matchesSearch && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1 shadow-sm"
          >
            <Clock className="h-3 w-3" />
            <span>Perencanaan</span>
          </Badge>
        )
      case "ongoing":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 shadow-sm"
          >
            <AlertTriangle className="h-3 w-3" />
            <span>Berjalan</span>
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1 shadow-sm"
          >
            <CheckCircle className="h-3 w-3" />
            <span>Selesai</span>
          </Badge>
        )
      case "evaluated":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1 shadow-sm"
          >
            <FileText className="h-3 w-3" />
            <span>Dievaluasi</span>
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrograms.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 text-center py-10">
            Tidak ada program kerja yang sesuai dengan kriteria pencarian
          </div>
        ) : (
          filteredPrograms.map((program) => {
            const teamMembers = getTeamMembers(program.id)
            const locationName = getLocationName(program.location)
            const supervisorName = getSupervisorName(program.supervisorId)

            return (
              <Card
                key={program.id}
                className="overflow-hidden border-primary-100 bg-gradient-to-br from-white to-primary-50/30 shadow-sm hover:shadow-md transition-all"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-primary-700">{program.name}</CardTitle>
                    {getStatusBadge(program.status)}
                  </div>
                  <CardDescription className="line-clamp-2">{program.workProgram}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary-500" />
                      <span>{locationName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-secondary-500" />
                      <span>{teamMembers.length} Mahasiswa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>
                        {new Date(program.startDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(program.endDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-mint" />
                      <span>{supervisorName}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-primary-200 bg-white hover:bg-primary-50 hover:text-primary-700 transition-all"
                    onClick={() => setSelectedProgram(program.id)}
                  >
                    Lihat Detail
                  </Button>
                </CardFooter>
              </Card>
            )
          })
        )}
      </div>

      {selectedProgram && (
        <WorkProgramDetailsDialog
          programId={selectedProgram}
          open={!!selectedProgram}
          onOpenChange={(open) => {
            if (!open) setSelectedProgram(null)
          }}
        />
      )}
    </>
  )
}

