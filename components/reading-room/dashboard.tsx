"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, BookOpen, BookMarked, ScrollText, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookStatsCard } from "./book-stats-card"
import { BorrowingStatsCard } from "./borrowing-stats-card"
import { RecentBorrowingsTable } from "./recent-borrowings-table"
import { OverdueBorrowingsTable } from "./overdue-borrowings-table"
import { PopularBooksChart } from "./popular-books-chart"
import { RecentTitleSubmissionsTable } from "./recent-title-submissions-table"
import { useToast } from "@/components/ui/use-toast"

export function ReadingRoomDashboard() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Data diperbarui",
        description: "Dashboard telah diperbarui dengan data terbaru",
      })
    }, 1500)
  }

  const handleExportData = () => {
    toast({
      title: "Ekspor Data",
      description: "Data sedang disiapkan untuk diunduh",
    })

    // Simulate export delay
    setTimeout(() => {
      toast({
        title: "Ekspor Selesai",
        description: "Data telah berhasil diekspor",
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Ruang Baca</h1>
          <p className="mt-1 text-muted-foreground">
            Selamat datang di dashboard Admin Ruang Baca. Kelola buku, peminjaman, dan skripsi dari sini.
          </p>
        </div>
        <div className="flex self-end gap-2 sm:self-auto">
          <Button variant="outline" size="sm" className="gap-1 h-9" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Memperbarui..." : "Perbarui Data"}</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1 h-9" onClick={handleExportData}>
            <Download className="w-4 h-4" />
            <span>Ekspor Data</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BookStatsCard />
        <BorrowingStatsCard />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pengajuan Judul Baru</CardTitle>
            <ScrollText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 sejak kemarin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Keterlambatan</CardTitle>
            <AlertCircle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Perlu tindakan segera</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="borrowings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 md:w-auto">
          <TabsTrigger value="borrowings" className="flex items-center gap-1">
            <BookMarked className="w-4 h-4" />
            <span className="hidden sm:inline">Peminjaman</span>
            <span className="sm:hidden">Pinjam</span>
          </TabsTrigger>
          <TabsTrigger value="overdue" className="flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Keterlambatan</span>
            <span className="sm:hidden">Terlambat</span>
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Buku Populer</span>
            <span className="sm:hidden">Populer</span>
          </TabsTrigger>
          <TabsTrigger value="submissions" className="flex items-center gap-1">
            <ScrollText className="w-4 h-4" />
            <span className="hidden sm:inline">Pengajuan Judul</span>
            <span className="sm:hidden">Judul</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="borrowings" className="space-y-4">
          <RecentBorrowingsTable />
        </TabsContent>
        <TabsContent value="overdue" className="space-y-4">
          <OverdueBorrowingsTable />
        </TabsContent>
        <TabsContent value="popular" className="space-y-4">
          <PopularBooksChart />
        </TabsContent>
        <TabsContent value="submissions" className="space-y-4">
          <RecentTitleSubmissionsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

