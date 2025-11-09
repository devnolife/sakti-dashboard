"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetAllocationChart } from "./budget-allocation-chart"
import { BudgetSummaryCards } from "./budget-summary-cards"
import { DepartmentFinancialTable } from "./department-financial-table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download, FileSpreadsheet } from "lucide-react"

export function BudgetManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Anggaran</h2>
          <p className="mt-2 text-muted-foreground">Kelola dan pantau anggaran fakultas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Tambah Anggaran
          </Button>
        </div>
      </div>

      <BudgetSummaryCards />

      <Card>
        <CardHeader>
          <CardTitle>Alokasi Anggaran Fakultas</CardTitle>
          <CardDescription>Distribusi anggaran berdasarkan departemen dan kategori</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <BudgetAllocationChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rincian Keuangan Departemen</CardTitle>
          <CardDescription>Perbandingan anggaran, pengeluaran, dan sisa dana per departemen</CardDescription>
        </CardHeader>
        <CardContent>
          <DepartmentFinancialTable />
        </CardContent>
      </Card>
    </div>
  )
}

