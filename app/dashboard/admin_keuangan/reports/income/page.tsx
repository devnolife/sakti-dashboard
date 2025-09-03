import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncomeChart } from "@/components/admin_keuangan/income-chart"
import { IncomeTable } from "@/components/admin_keuangan/income-table"
import { IncomeSourcesChart } from "@/components/admin_keuangan/income-sources-chart"
import { Download, FileText, Filter, Calendar, ArrowUpDown, Printer } from "lucide-react"

export const metadata: Metadata = {
  title: "Laporan Pendapatan | Dasbor Admin Keuangan",
  description: "Lihat dan analisis laporan dan statistik pendapatan",
}

export default function IncomeReportsPage() {
  return (
    <div className="space-y-6 bg-gradient-to-br from-white via-green-50/5 to-white rounded-lg p-1">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
            Laporan Pendapatan
          </h2>
          <p className="text-muted-foreground">Lihat dan analisis sumber pendapatan dan transaksi</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            <FileText className="mr-2 h-4 w-4" />
            Buat Laporan
          </Button>
          <Button variant="outline" className="bg-gradient-to-r from-slate-50 to-green-50 hover:bg-green-100/50">
            <Download className="mr-2 h-4 w-4" />
            Ekspor Data
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-green-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">Rp 2.345.678.000</div>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <span className="inline-block bg-green-100 text-green-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              +12,5% dari tahun sebelumnya
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-green-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pendapatan SPP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">Rp 1.987.450.000</div>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <span className="inline-block bg-green-100 text-green-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              84,7% dari total pendapatan
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-green-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pendapatan Lainnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">Rp 358.228.000</div>
            <p className="text-sm text-amber-600 mt-1 flex items-center">
              <span className="inline-block bg-amber-100 text-amber-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              15,3% dari total pendapatan
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Analisis Pendapatan</CardTitle>
              <CardDescription>Lihat dan analisis data pendapatan</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-slate-50 to-green-50 hover:bg-green-100/50"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Pilih Periode
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-slate-50 to-green-50 hover:bg-green-100/50"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-gradient-to-r from-slate-100 to-green-50">
              <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
              <TabsTrigger value="by-source">Berdasarkan Sumber</TabsTrigger>
              <TabsTrigger value="by-period">Berdasarkan Periode</TabsTrigger>
              <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="h-[400px] w-full bg-gradient-to-br from-white via-green-50/10 to-white rounded-xl p-4 shadow-sm">
                <IncomeChart />
              </div>
            </TabsContent>

            <TabsContent value="by-source" className="space-y-4">
              <div className="h-[400px] w-full bg-gradient-to-br from-white via-green-50/10 to-white rounded-xl p-4 shadow-sm">
                <IncomeSourcesChart />
              </div>
            </TabsContent>

            <TabsContent value="by-period" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pendapatan Bulanan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      {/* Monthly chart would go here */}
                      <div className="h-full w-full bg-gradient-to-br from-white via-green-50/10 to-white rounded-xl flex items-center justify-center">
                        <p className="text-muted-foreground">Grafik pendapatan bulanan</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pendapatan Per Triwulan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      {/* Quarterly chart would go here */}
                      <div className="h-full w-full bg-gradient-to-br from-white via-green-50/10 to-white rounded-xl flex items-center justify-center">
                        <p className="text-muted-foreground">Grafik pendapatan triwulanan</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    <span>Urutkan</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Printer className="h-3.5 w-3.5" />
                    <span>Cetak</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Download className="h-3.5 w-3.5" />
                    <span>Ekspor</span>
                  </Button>
                </div>
              </div>
              <IncomeTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

