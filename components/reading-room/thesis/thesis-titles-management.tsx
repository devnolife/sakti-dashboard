"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThesisStatCards } from "@/components/reading-room/thesis/thesis-stat-cards"
import { ThesisTitlesList } from "@/components/reading-room/thesis/admin-thesis-titles-list"
import { ThesisDetailsDialog } from "@/components/reading-room/thesis-details-dialog"
import { mockThesisData } from "@/components/reading-room/thesis/mock-thesis-data"
import { Download, FileText, Filter, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ThesisApprovalDialog } from "@/components/reading-room/thesis/thesis-approval-dialog"
import { ThesisExportDialog } from "@/components/reading-room/thesis/thesis-export-dialog"

export function ThesisTitlesManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [selectedThesis, setSelectedThesis] = useState<any>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [approvalOpen, setApprovalOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)

  // Filter theses based on search query and filters
  const filteredTheses = mockThesisData.filter((thesis) => {
    const matchesSearch =
      thesis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thesis.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thesis.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || thesis.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || thesis.department === departmentFilter
    const matchesYear = yearFilter === "all" || thesis.year.toString() === yearFilter

    return matchesSearch && matchesStatus && matchesDepartment && matchesYear
  })

  // Get unique departments and years for filters
  const departments = Array.from(new Set(mockThesisData.map((thesis) => thesis.department)))
  const years = Array.from(new Set(mockThesisData.map((thesis) => thesis.year))).sort((a, b) => b - a)

  // Calculate statistics
  const stats = {
    total: mockThesisData.length,
    pending: mockThesisData.filter((thesis) => thesis.status === "pending").length,
    approved: mockThesisData.filter((thesis) => thesis.status === "approved").length,
    rejected: mockThesisData.filter((thesis) => thesis.status === "rejected").length,
    archived: mockThesisData.filter((thesis) => thesis.status === "archived").length,
  }

  const handleViewDetails = (thesis: any) => {
    setSelectedThesis(thesis)
    setDetailsOpen(true)
  }

  const handleApprove = (thesis: any) => {
    setSelectedThesis(thesis)
    setApprovalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Thesis Titles Management</h1>
          <p className="text-muted-foreground">Review, approve, and manage thesis titles submitted by students</p>
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

      <ThesisStatCards stats={stats} />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Theses
            <Badge variant="secondary" className="ml-2">
              {stats.total}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge variant="secondary" className="ml-2">
              {stats.pending}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved
            <Badge variant="secondary" className="ml-2">
              {stats.approved}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            <Badge variant="secondary" className="ml-2">
              {stats.rejected}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived
            <Badge variant="secondary" className="ml-2">
              {stats.archived}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Thesis Titles</CardTitle>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="all" className="m-0">
                <ThesisTitlesList theses={filteredTheses} onViewDetails={handleViewDetails} onApprove={handleApprove} />
              </TabsContent>

              <TabsContent value="pending" className="m-0">
                <ThesisTitlesList
                  theses={filteredTheses.filter((thesis) => thesis.status === "pending")}
                  onViewDetails={handleViewDetails}
                  onApprove={handleApprove}
                />
              </TabsContent>

              <TabsContent value="approved" className="m-0">
                <ThesisTitlesList
                  theses={filteredTheses.filter((thesis) => thesis.status === "approved")}
                  onViewDetails={handleViewDetails}
                  onApprove={handleApprove}
                />
              </TabsContent>

              <TabsContent value="rejected" className="m-0">
                <ThesisTitlesList
                  theses={filteredTheses.filter((thesis) => thesis.status === "rejected")}
                  onViewDetails={handleViewDetails}
                  onApprove={handleApprove}
                />
              </TabsContent>

              <TabsContent value="archived" className="m-0">
                <ThesisTitlesList
                  theses={filteredTheses.filter((thesis) => thesis.status === "archived")}
                  onViewDetails={handleViewDetails}
                  onApprove={handleApprove}
                />
              </TabsContent>
            </div>
          </CardContent>
        </Card>
      </Tabs>

      {selectedThesis && (
        <>
          <ThesisDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} thesis={selectedThesis} />
          <ThesisApprovalDialog open={approvalOpen} onOpenChange={setApprovalOpen} thesis={selectedThesis} />
        </>
      )}

      <ThesisExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  )
}

