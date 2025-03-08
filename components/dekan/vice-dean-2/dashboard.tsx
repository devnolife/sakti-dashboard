"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetAllocationChart } from "./budget-allocation-chart"
import { ExamApplicationsChart } from "./exam-applications-chart"
import { LabFeePaymentsChart } from "./lab-fee-payments-chart"
import { BudgetSummaryCards } from "./budget-summary-cards"
import { DepartmentFinancialTable } from "./department-financial-table"
import { RecentTransactions } from "./recent-transactions"
import { FinancialMetricsCards } from "./financial-metrics-cards"
import { PaymentReports } from "./payment-reports"
import {
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Building2,
  GraduationCap,
  Beaker,
} from "lucide-react"

export function ViceDean2Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Wakil Dekan 2</h2>
        <p className="text-muted-foreground mt-2">Ikhtisar keuangan dan aktivitas akademik fakultas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-50 to-blue-100 shadow-md transition-all hover:shadow-lg dark:from-blue-950/40 dark:to-blue-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-800/50">
                <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Total Anggaran</CardTitle>
                <CardDescription>Tahun Akademik 2023/2024</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Rp 12,5 Miliar</div>
            <div className="mt-1 flex items-center text-xs text-blue-600/80 dark:text-blue-400/80">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>Naik 8% dari tahun lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-green-50 to-green-100 shadow-md transition-all hover:shadow-lg dark:from-green-950/40 dark:to-green-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/50">
                <Building2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Jumlah Departemen</CardTitle>
                <CardDescription>Aktif dalam fakultas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">5</div>
            <div className="mt-1 flex items-center text-xs text-green-600/80 dark:text-green-400/80">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>Semua departemen aktif</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-purple-50 to-purple-100 shadow-md transition-all hover:shadow-lg dark:from-purple-950/40 dark:to-purple-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-800/50">
                <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Pendaftar Ujian</CardTitle>
                <CardDescription>Semester ini</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">1,248</div>
            <div className="mt-1 flex items-center text-xs text-purple-600/80 dark:text-purple-400/80">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>Naik 12% dari semester lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-50 to-amber-100 shadow-md transition-all hover:shadow-lg dark:from-amber-950/40 dark:to-amber-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-800/50">
                <Beaker className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Pendapatan Lab</CardTitle>
                <CardDescription>Semester ini</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">Rp 875 Juta</div>
            <div className="mt-1 flex items-center text-xs text-amber-600/80 dark:text-amber-400/80">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>Naik 5% dari semester lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" />
            Ikhtisar
          </TabsTrigger>
          <TabsTrigger value="budget">
            <PieChart className="mr-2 h-4 w-4" />
            Anggaran
          </TabsTrigger>
          <TabsTrigger value="academic">
            <LineChart className="mr-2 h-4 w-4" />
            Akademik
          </TabsTrigger>
          <TabsTrigger value="payments">
            <Wallet className="mr-2 h-4 w-4" />
            Laporan Pembayaran
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Alokasi Anggaran Fakultas</CardTitle>
                <CardDescription>Distribusi anggaran berdasarkan departemen dan kategori</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BudgetAllocationChart />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Pendaftar Ujian per Departemen</CardTitle>
                <CardDescription>Jumlah mahasiswa yang mendaftar ujian semester ini</CardDescription>
              </CardHeader>
              <CardContent>
                <ExamApplicationsChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Pembayaran Biaya Laboratorium</CardTitle>
                <CardDescription>Perbandingan pembayaran biaya lab per departemen</CardDescription>
              </CardHeader>
              <CardContent>
                <LabFeePaymentsChart />
              </CardContent>
            </Card>

            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Transaksi Terbaru</CardTitle>
                <CardDescription>10 transaksi keuangan terbaru fakultas</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <BudgetSummaryCards />

          <Card>
            <CardHeader>
              <CardTitle>Rincian Keuangan Departemen</CardTitle>
              <CardDescription>Perbandingan anggaran, pengeluaran, dan sisa dana per departemen</CardDescription>
            </CardHeader>
            <CardContent>
              <DepartmentFinancialTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <FinancialMetricsCards />

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pendaftar Ujian per Departemen</CardTitle>
                <CardDescription>Tren pendaftaran ujian dalam 6 bulan terakhir</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ExamApplicationsChart variant="line" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pembayaran Biaya Laboratorium</CardTitle>
                <CardDescription>Tren pembayaran biaya lab dalam 6 bulan terakhir</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LabFeePaymentsChart variant="line" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <PaymentReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}

