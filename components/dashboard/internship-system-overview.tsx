"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardCheck, Building, FileSearch, ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function InternshipSystemOverview({ role }: { role: string }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for the overview
  const requirementsProgress = 70
  const pendingApplications = 2
  const approvedLocations = 8

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: "requirement",
      title: "Sertifikat Bahasa Inggris",
      status: "complete",
      date: "15 September 2023",
      description: "Dokumen telah diverifikasi dan disetujui.",
    },
    {
      id: 2,
      type: "application",
      title: "PT Inovasi Teknologi",
      status: "pending",
      date: "10 September 2023",
      description: "Pengajuan lokasi magang baru sedang menunggu review.",
    },
    {
      id: 3,
      type: "location",
      title: "Bank Nasional Indonesia",
      status: "applied",
      date: "5 September 2023",
      description: "Aplikasi magang telah dikirim, menunggu konfirmasi dari perusahaan.",
    },
    {
      id: 4,
      type: "requirement",
      title: "Proposal Magang",
      status: "in-progress",
      date: "1 September 2023",
      description: "Dokumen sedang dalam proses penyusunan.",
    },
    {
      id: 5,
      type: "location",
      title: "Kementerian Pendidikan",
      status: "viewed",
      date: "28 Agustus 2023",
      description: "Anda telah melihat detail lokasi magang ini.",
    },
  ]

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Selesai
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Dalam Proses
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Menunggu Review
          </Badge>
        )
      case "applied":
        return (
          <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Diaplikasikan
          </Badge>
        )
      case "viewed":
        return (
          <Badge className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Dilihat
          </Badge>
        )
      default:
        return null
    }
  }

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "requirement":
        return <ClipboardCheck className="h-5 w-5 text-primary" />
      case "application":
        return <FileSearch className="h-5 w-5 text-secondary" />
      case "location":
        return <Building className="h-5 w-5 text-accent" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Sistem Magang
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Kelola persyaratan, lokasi, dan pengajuan magang Anda dalam satu tempat
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="requirements">Persyaratan</TabsTrigger>
          <TabsTrigger value="locations">Lokasi Magang</TabsTrigger>
          <TabsTrigger value="applications">Pengajuan Lokasi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="overflow-hidden gradient-border card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Persyaratan</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ClipboardCheck className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{requirementsProgress}%</div>
                <div className="mt-2">
                  <Progress value={requirementsProgress} className="h-2" />
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("requirements")}>
                    Lihat Detail
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden gradient-border card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lokasi Magang</CardTitle>
                <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Building className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{approvedLocations}</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">Lokasi tersedia untuk dipilih</span>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("locations")}>
                    Lihat Lokasi
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden gradient-border card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengajuan Lokasi</CardTitle>
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <FileSearch className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingApplications}</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">Pengajuan sedang menunggu review</span>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("applications")}>
                    Lihat Pengajuan
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Aktivitas terbaru terkait persyaratan dan lokasi magang Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-medium truncate">{activity.title}</h4>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="mt-4">
            <h3 className="text-lg font-medium">KKP Request Management</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Administrative staff can review and process student KKP requests, generate approval letters, and track the
              status of all applications through the dedicated management interface.
            </p>
            {(role === "admin" || role === "department_head") && (
              <Button variant="link" className="p-0 h-auto mt-2" asChild>
                <Link href="/admin/kkp-requests">Access KKP Request Management</Link>
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="requirements">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Persyaratan Magang</CardTitle>
              <CardDescription>Pantau dan kelola persyaratan magang Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Button onClick={() => setActiveSection("requirements")}>Buka Halaman Persyaratan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Lokasi Magang</CardTitle>
              <CardDescription>Jelajahi dan pilih lokasi magang yang tersedia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Button onClick={() => setActiveSection("internship-locations")}>Buka Halaman Lokasi Magang</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Pengajuan Lokasi Baru</CardTitle>
              <CardDescription>Ajukan dan pantau status pengajuan lokasi magang baru</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Button onClick={() => setActiveSection("new-location")}>Buka Halaman Pengajuan Lokasi</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  function setActiveSection(section: string) {
    // This function would be passed down from the parent component
    // For now, we'll just log it
    console.log(`Navigating to ${section}`)
    // In a real implementation, this would call the parent's setActiveSection function
  }
}

