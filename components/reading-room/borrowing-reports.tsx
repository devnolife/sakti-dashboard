"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Printer } from "lucide-react"
import { BorrowingTrendsChart } from "./borrowing-trends-chart"
import { BorrowingByDepartmentChart } from "./borrowing-by-department-chart"
import { BorrowingByCategoryChart } from "./borrowing-by-category-chart"
import { BorrowingDetailsTable } from "./borrowing-details-table"
import { BorrowingMetricsCards } from "./borrowing-metrics-cards"
import { BorrowingDurationChart } from "./borrowing-duration-chart"
import { mockBorrowingReportData } from "./mock-borrowing-report-data"

export default function BorrowingReports() {
  const [activeTab, setActiveTab] = useState("overview")
  const [reportType, setReportType] = useState("all")

  const handleExportPDF = () => {
    // Implementation would connect to a PDF generation service
    alert("Exporting PDF report...")
  }

  const handleExportExcel = () => {
    // Implementation would generate and download an Excel file
    alert("Exporting Excel report...")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Laporan Peminjaman</h1>
          <p className="text-muted-foreground">Analisis dan laporan peminjaman buku di Ruang Baca</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <Download className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <DatePickerWithRange className="w-full sm:w-auto" />
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tipe Laporan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Peminjaman</SelectItem>
            <SelectItem value="active">Peminjaman Aktif</SelectItem>
            <SelectItem value="returned">Peminjaman Selesai</SelectItem>
            <SelectItem value="overdue">Peminjaman Terlambat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <BorrowingMetricsCards data={mockBorrowingReportData.metrics} />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
          <TabsTrigger value="trends">Tren</TabsTrigger>
          <TabsTrigger value="categories">Kategori</TabsTrigger>
          <TabsTrigger value="details">Detail</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tren Peminjaman</CardTitle>
              <CardDescription>Jumlah peminjaman buku per bulan dalam periode yang dipilih</CardDescription>
            </CardHeader>
            <CardContent>
              <BorrowingTrendsChart data={mockBorrowingReportData.trends} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Peminjaman Berdasarkan Departemen</CardTitle>
                <CardDescription>Distribusi peminjaman berdasarkan departemen</CardDescription>
              </CardHeader>
              <CardContent>
                <BorrowingByDepartmentChart data={mockBorrowingReportData.byDepartment} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peminjaman Berdasarkan Kategori</CardTitle>
                <CardDescription>Distribusi peminjaman berdasarkan kategori buku</CardDescription>
              </CardHeader>
              <CardContent>
                <BorrowingByCategoryChart data={mockBorrowingReportData.byCategory} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tren Peminjaman Bulanan</CardTitle>
              <CardDescription>Analisis tren peminjaman buku selama 12 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <BorrowingTrendsChart data={mockBorrowingReportData.trends} showDetails />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Durasi Peminjaman</CardTitle>
              <CardDescription>Distribusi durasi peminjaman buku</CardDescription>
            </CardHeader>
            <CardContent>
              <BorrowingDurationChart data={mockBorrowingReportData.duration} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Peminjaman Berdasarkan Kategori</CardTitle>
              <CardDescription>Analisis detail peminjaman berdasarkan kategori buku</CardDescription>
            </CardHeader>
            <CardContent>
              <BorrowingByCategoryChart data={mockBorrowingReportData.byCategory} showDetails />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Peminjaman Berdasarkan Departemen</CardTitle>
              <CardDescription>Analisis detail peminjaman berdasarkan departemen</CardDescription>
            </CardHeader>
            <CardContent>
              <BorrowingByDepartmentChart data={mockBorrowingReportData.byDepartment} showDetails />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Detail Peminjaman</CardTitle>
              <CardDescription>Daftar lengkap peminjaman dalam periode yang dipilih</CardDescription>
            </CardHeader>
            <CardContent>
              <BorrowingDetailsTable data={mockBorrowingReportData.details} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

