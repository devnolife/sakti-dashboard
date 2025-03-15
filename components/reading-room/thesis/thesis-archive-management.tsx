"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThesisArchiveStatCards } from "@/components/reading-room/thesis/thesis-archive-stat-cards"
import { ThesisArchiveGrid } from "@/components/reading-room/thesis/thesis-archive-grid"
import { ThesisDetailsDialog } from "@/components/reading-room/thesis-details-dialog"
import { mockArchivedThesisData } from "@/components/reading-room/thesis/mock-archived-thesis-data"
import { Download, FileText, Filter, Search } from "lucide-react"
import { ThesisExportDialog } from "@/components/reading-room/thesis/thesis-export-dialog"
import { ThesisRestoreDialog } from "@/components/reading-room/thesis/thesis-restore-dialog"

export function ThesisArchiveManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [selectedThesis, setSelectedThesis] = useState<any>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [restoreOpen, setRestoreOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid")

  // Filter theses based on search query and filters
  const filteredTheses = mockArchivedThesisData.filter((thesis) => {
    const matchesSearch =
      thesis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thesis.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thesis.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDepartment = departmentFilter === "all" || thesis.department === departmentFilter
    const matchesYear = yearFilter === "all" || thesis.year.toString() === yearFilter

    return matchesSearch && matchesDepartment && matchesYear
  })

  // Get unique departments and years for filters
  const departments = Array.from(new Set(mockArchivedThesisData.map((thesis) => thesis.department)))
  const years = Array.from(new Set(mockArchivedThesisData.map((thesis) => thesis.year))).sort((a, b) => b - a)

  // Calculate statistics
  const stats = {
    total: mockArchivedThesisData.length,
    byDepartment: departments.map((dept) => ({
      department: dept,
      count: mockArchivedThesisData.filter((thesis) => thesis.department === dept).length,
    })),
    byYear: years.map((year) => ({
      year,
      count: mockArchivedThesisData.filter((thesis) => thesis.year === year).length,
    })),
    digitalCopies: mockArchivedThesisData.filter((thesis) => thesis.digitalCopy).length,
  }

  const handleViewDetails = (thesis: any) => {
    setSelectedThesis(thesis)
    setDetailsOpen(true)
  }

  const handleRestore = (thesis: any) => {
    setSelectedThesis(thesis)
    setRestoreOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Thesis Archive</h1>
          <p className="text-muted-foreground">Browse and manage archived thesis documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExportOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <ThesisArchiveStatCards stats={stats} />

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Archived Theses</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters:</span>
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by title, author, or keywords..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === "timeline" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("timeline")}
                >
                  Timeline View
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <ThesisArchiveGrid theses={filteredTheses} onViewDetails={handleViewDetails} onRestore={handleRestore} />
            ) : (
              <div className="p-4 text-center text-muted-foreground">Timeline view is under development</div>
            )}

            {filteredTheses.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTheses.length} of {mockArchivedThesisData.length} archived theses
                </p>
                {filteredTheses.length < mockArchivedThesisData.length && (
                  <Button variant="outline" size="sm">
                    Load More
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedThesis && (
        <>
          <ThesisDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} thesis={selectedThesis} />
          <ThesisRestoreDialog open={restoreOpen} onOpenChange={setRestoreOpen} thesis={selectedThesis} />
        </>
      )}

      <ThesisExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  )
}

