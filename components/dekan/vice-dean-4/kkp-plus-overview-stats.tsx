"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, MapPin, Award, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { students, teams, locations, supervisors, historicalStudents } from "./mock-data"

export function KkpPlusOverviewStats() {
  // Calculate statistics
  const activeStudents = students.filter((s) => s.status === "active").length
  const pendingStudents = students.filter((s) => s.status === "pending").length
  const completedStudents = students.filter((s) => s.status === "completed").length
  const historicalCount = historicalStudents.length

  const activeTeams = teams.filter((t) => t.status === "ongoing").length
  const planningTeams = teams.filter((t) => t.status === "planning").length
  const completedTeams = teams.filter((t) => t.status === "completed" || t.status === "evaluated").length

  const activeLocations = locations.filter((l) => l.isActive).length
  const totalCapacity = locations.reduce((sum, loc) => sum + loc.capacity, 0)

  const availableSupervisors = supervisors.filter((s) => s.currentLoad < s.maxLoad).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-none bg-gradient-to-br from-white to-primary-50 shadow-md hover:shadow-lg transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary-700">Mahasiswa KKP Plus</CardTitle>
          <Users className="h-4 w-4 text-primary-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-800">
            {activeStudents + pendingStudents + completedStudents}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-yellow-500" />
              <span>Menunggu: {pendingStudents}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-green-500" />
              <span>Aktif: {activeStudents}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-blue-500" />
              <span>Selesai: {completedStudents}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none bg-gradient-to-br from-white to-secondary-50 shadow-md hover:shadow-lg transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-secondary-700">Tim Program Kerja</CardTitle>
          <Briefcase className="h-4 w-4 text-secondary-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary-800">{teams.length}</div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-yellow-500" />
              <span>Perencanaan: {planningTeams}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-green-500" />
              <span>Berjalan: {activeTeams}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-blue-500" />
              <span>Selesai: {completedTeams}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none bg-gradient-to-br from-white to-accent-50 shadow-md hover:shadow-lg transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-accent-foreground">Lokasi Program</CardTitle>
          <MapPin className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent-foreground">{locations.length}</div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Aktif: {activeLocations}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-blue-500" />
              <span>Kapasitas: {totalCapacity}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none bg-gradient-to-br from-white to-mint-50 shadow-md hover:shadow-lg transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-mint-foreground">Alumni KKP Plus</CardTitle>
          <Award className="h-4 w-4 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-mint-foreground">{historicalCount}</div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-primary-500" />
              <span>Pembimbing: {supervisors.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Tersedia: {availableSupervisors}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

