"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetAllocationChart } from "./budget-allocation-chart"
import { ExamApplicationsChart } from "./exam-applications-chart"
import { LabFeePaymentsChart } from "./lab-fee-payments-chart"
import { Button } from "@/components/ui/button"
import { Download, FileSpreadsheet, Printer, Share2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FinancialReporting() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Laporan Keuangan</h2>
          <p className="text-muted-foreground mt-2">Laporan keuangan fakultas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Printer className="mr-2 h-4 w-4" />
            Cetak
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Share2 className="mr-2 h-4 w-4" />
            Bagikan
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Periode Laporan</CardTitle>
              <CardDescription>Pilih periode laporan keuangan</CardDescription>
            </div>
            <Select defaultValue="current">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Semester Ganjil 2023/2024</SelectItem>
                <SelectItem value="previous">Semester Genap 2022/2023</SelectItem>
                <SelectItem value="year">Tahun Akademik 2022/2023</SelectItem>
                <SelectItem value="custom">Kustom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alokasi Anggaran</CardTitle>
            <CardDescription>Distribusi anggaran berdasarkan departemen</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <BudgetAllocationChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pendaftar Ujian</CardTitle>
            <CardDescription>Jumlah pendaftar ujian per departemen</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ExamApplicationsChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pembayaran Biaya Laboratorium</CardTitle>
          <CardDescription>Perbandingan pembayaran biaya lab per departemen</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <LabFeePaymentsChart variant="bar" />
        </CardContent>
      </Card>
    </div>
  )
}

