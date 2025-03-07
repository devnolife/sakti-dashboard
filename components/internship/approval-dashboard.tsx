"use client"

import { useState } from "react"
import type { InternshipApplication } from "@/types/internship"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download } from "lucide-react"
import ApplicationsTable from "./applications-table"
import { useToast } from "@/components/ui/use-toast"

interface InternshipApprovalDashboardProps {
  initialApplications: InternshipApplication[]
}

export default function InternshipApprovalDashboard({ initialApplications }: InternshipApprovalDashboardProps) {
  const [applications, setApplications] = useState<InternshipApplication[]>(initialApplications)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Filter applications based on search query
  const filteredApplications = applications.filter(
    (app) =>
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.studentNIM.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group applications by status
  const pendingApplications = filteredApplications.filter((app) => app.status === "pending")
  const approvedApplications = filteredApplications.filter((app) => app.status === "approved")
  const rejectedApplications = filteredApplications.filter((app) => app.status === "rejected")
  const inProgressApplications = filteredApplications.filter((app) => app.status === "in_progress")
  const completedApplications = filteredApplications.filter((app) => app.status === "completed")

  // Handle application status update
  const handleStatusUpdate = (updatedApplication: InternshipApplication) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) => (app.id === updatedApplication.id ? updatedApplication : app)),
    )

    toast({
      title: "Status Diperbarui",
      description: `Aplikasi ${updatedApplication.studentName} telah ${
        updatedApplication.status === "approved"
          ? "disetujui"
          : updatedApplication.status === "rejected"
            ? "ditolak"
            : "diperbarui"
      }`,
      variant: "default",
    })
  }

  // Export applications as CSV
  const exportAsCSV = () => {
    const headers = [
      "ID",
      "Nama Mahasiswa",
      "NIM",
      "Perusahaan",
      "Posisi",
      "Tanggal Mulai",
      "Tanggal Selesai",
      "Status",
      "Tanggal Aplikasi",
    ]

    const csvData = filteredApplications.map((app) => [
      app.id,
      app.studentName,
      app.studentNIM,
      app.companyName,
      app.position,
      app.startDate.toISOString().split("T")[0],
      app.endDate.toISOString().split("T")[0],
      app.status,
      app.applicationDate.toISOString().split("T")[0],
    ])

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "internship-applications.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Ekspor Berhasil",
      description: "Data aplikasi magang berhasil diekspor sebagai CSV",
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari berdasarkan nama, NIM, atau perusahaan..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={exportAsCSV}>
                <Download className="h-4 w-4 mr-2" />
                Ekspor
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                Semua
                <span className="ml-2 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                  {filteredApplications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Menunggu
                <span className="ml-2 bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full text-xs">
                  {pendingApplications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="approved">
                Disetujui
                <span className="ml-2 bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full text-xs">
                  {approvedApplications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Ditolak
                <span className="ml-2 bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full text-xs">
                  {rejectedApplications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="in_progress">
                Berlangsung
                <span className="ml-2 bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full text-xs">
                  {inProgressApplications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Selesai
                <span className="ml-2 bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded-full text-xs">
                  {completedApplications.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ApplicationsTable applications={filteredApplications} onStatusUpdate={handleStatusUpdate} />
            </TabsContent>

            <TabsContent value="pending">
              <ApplicationsTable applications={pendingApplications} onStatusUpdate={handleStatusUpdate} />
            </TabsContent>

            <TabsContent value="approved">
              <ApplicationsTable applications={approvedApplications} onStatusUpdate={handleStatusUpdate} />
            </TabsContent>

            <TabsContent value="rejected">
              <ApplicationsTable applications={rejectedApplications} onStatusUpdate={handleStatusUpdate} />
            </TabsContent>

            <TabsContent value="in_progress">
              <ApplicationsTable applications={inProgressApplications} onStatusUpdate={handleStatusUpdate} />
            </TabsContent>

            <TabsContent value="completed">
              <ApplicationsTable applications={completedApplications} onStatusUpdate={handleStatusUpdate} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

