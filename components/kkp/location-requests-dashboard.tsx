"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, Download } from "lucide-react"
import type { KkpLocationRequest, KkpLocationStatus } from "@/types/kkp-location"
import { getKkpLocationRequestsByStatus } from "@/app/actions/kkp-location-actions"
import LocationRequestsTable from "./location-requests-table"

interface KkpLocationRequestsDashboardProps {
  initialRequests: KkpLocationRequest[]
}

export default function KkpLocationRequestsDashboard({ initialRequests }: KkpLocationRequestsDashboardProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<KkpLocationStatus | "all">("all")
  const [requests, setRequests] = useState<KkpLocationRequest[]>(initialRequests)
  const [filteredRequests, setFilteredRequests] = useState<KkpLocationRequest[]>(initialRequests)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Filter requests based on active tab and search query
  useEffect(() => {
    const filterRequests = async () => {
      setIsLoading(true)
      try {
        let filtered = [...requests]

        // Filter by status
        if (activeTab !== "all") {
          filtered = filtered.filter((req) => req.status === activeTab)
        }

        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filtered = filtered.filter(
            (req) =>
              req.companyName.toLowerCase().includes(query) ||
              req.companyIndustry.toLowerCase().includes(query) ||
              req.proposedBy.name.toLowerCase().includes(query) ||
              req.proposedBy.nim.toLowerCase().includes(query),
          )
        }

        setFilteredRequests(filtered)
      } catch (error) {
        console.error("Error filtering requests:", error)
        toast({
          title: "Error",
          description: "Failed to filter location requests",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    filterRequests()
  }, [activeTab, searchQuery, requests, toast])

  // Handle tab change
  const handleTabChange = async (value: string) => {
    setActiveTab(value as KkpLocationStatus | "all")
    setIsLoading(true)

    try {
      if (value === "all") {
        // No need to fetch, just use the full list
        setFilteredRequests(requests)
      } else {
        // Fetch requests by status
        const statusRequests = await getKkpLocationRequestsByStatus(value as KkpLocationStatus)
        setFilteredRequests(statusRequests)
      }
    } catch (error) {
      console.error("Error fetching requests by status:", error)
      toast({
        title: "Error",
        description: "Failed to fetch location requests",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle export to CSV
  const handleExportCSV = () => {
    try {
      // Convert requests to CSV format
      const headers = [
        "ID",
        "Company Name",
        "Industry",
        "City",
        "Contact Person",
        "Contact Email",
        "Proposed By",
        "Submission Date",
        "Status",
      ]

      const csvData = filteredRequests.map((req) => [
        req.id,
        req.companyName,
        req.companyIndustry,
        req.companyCity,
        req.contactPerson,
        req.contactEmail,
        `${req.proposedBy.name} (${req.proposedBy.nim})`,
        new Date(req.submissionDate).toLocaleDateString(),
        req.status,
      ])

      // Create CSV content
      const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

      // Create a blob and download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `kkp-location-requests-${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Success",
        description: "Location requests exported successfully",
      })
    } catch (error) {
      console.error("Error exporting to CSV:", error)
      toast({
        title: "Error",
        description: "Failed to export location requests",
        variant: "destructive",
      })
    }
  }

  // Update requests after approval/rejection
  const handleRequestUpdated = (updatedRequest: KkpLocationRequest) => {
    setRequests((prev) => prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari lokasi KKP..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="w-full md:w-auto" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Permintaan Lokasi KKP</CardTitle>
          <CardDescription>Tinjau dan setujui permintaan lokasi KKP baru dari mahasiswa</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="all" className="mt-0">
              <LocationRequestsTable
                requests={filteredRequests}
                isLoading={isLoading}
                onRequestUpdated={handleRequestUpdated}
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              <LocationRequestsTable
                requests={filteredRequests}
                isLoading={isLoading}
                onRequestUpdated={handleRequestUpdated}
              />
            </TabsContent>
            <TabsContent value="approved" className="mt-0">
              <LocationRequestsTable
                requests={filteredRequests}
                isLoading={isLoading}
                onRequestUpdated={handleRequestUpdated}
              />
            </TabsContent>
            <TabsContent value="rejected" className="mt-0">
              <LocationRequestsTable
                requests={filteredRequests}
                isLoading={isLoading}
                onRequestUpdated={handleRequestUpdated}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

