"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Download,
  Search,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Building2,
  BookOpen,
  Users,
  Laptop,
  Wrench
} from "lucide-react"

interface BudgetItem {
  id: string
  category: string
  department: string
  allocated: number
  spent: number
  remaining: number
  icon: any
  color: string
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export default function BudgetManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("2024")

  const totalBudget = 15000000000
  const totalSpent = 8750000000
  const totalRemaining = totalBudget - totalSpent
  const spentPercentage = (totalSpent / totalBudget) * 100

  const budgetCategories: BudgetItem[] = [
    {
      id: '1',
      category: 'Operasional',
      department: 'Fakultas',
      allocated: 5000000000,
      spent: 3200000000,
      remaining: 1800000000,
      icon: Building2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      category: 'Penelitian',
      department: 'P3M',
      allocated: 4000000000,
      spent: 2800000000,
      remaining: 1200000000,
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '3',
      category: 'Pengabdian',
      department: 'P3M',
      allocated: 2500000000,
      spent: 1500000000,
      remaining: 1000000000,
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '4',
      category: 'Infrastruktur',
      department: 'Fakultas',
      allocated: 2000000000,
      spent: 750000000,
      remaining: 1250000000,
      icon: Wrench,
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: '5',
      category: 'Teknologi',
      department: 'IT',
      allocated: 1500000000,
      spent: 500000000,
      remaining: 1000000000,
      icon: Laptop,
      color: 'from-indigo-500 to-blue-500'
    },
  ]

  const monthlySpending = [
    { month: 'Jan', amount: 450000000 },
    { month: 'Feb', amount: 520000000 },
    { month: 'Mar', amount: 680000000 },
    { month: 'Apr', amount: 750000000 },
    { month: 'Mei', amount: 890000000 },
    { month: 'Jun', amount: 920000000 },
    { month: 'Jul', amount: 1100000000 },
    { month: 'Ago', amount: 980000000 },
    { month: 'Sep', amount: 850000000 },
    { month: 'Okt', amount: 720000000 },
    { month: 'Nov', amount: 590000000 },
    { month: 'Des', amount: 300000000 },
  ]

  const maxMonthly = Math.max(...monthlySpending.map(m => m.amount))

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Anggaran</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitoring dan kontrol keuangan fakultas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="py-4 bg-gradient-to-br from-blue-50 to-blue-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-900">Total Anggaran</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
            <p className="text-sm text-muted-foreground mt-1">Tahun {selectedPeriod}</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-red-500">
          <CardHeader className="py-4 bg-gradient-to-br from-red-50 to-red-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-red-900">Total Pengeluaran</CardTitle>
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalSpent)}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-600">{spentPercentage.toFixed(1)}% terpakai</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="py-4 bg-gradient-to-br from-green-50 to-green-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-900">Sisa Anggaran</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalRemaining)}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-600">{(100 - spentPercentage).toFixed(1)}% tersisa</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-amber-500">
          <CardHeader className="py-4 bg-gradient-to-br from-amber-50 to-amber-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-amber-900">Rata-rata/Bulan</CardTitle>
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-600">{formatCurrency(totalSpent / 12)}</div>
            <p className="text-sm text-muted-foreground mt-1">Pengeluaran bulanan</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress Overview */}
      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Progress Anggaran {selectedPeriod}</CardTitle>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {spentPercentage.toFixed(1)}% Terpakai
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-base mb-2">
              <span className="font-medium">Realisasi Anggaran</span>
              <span className="font-bold">{formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}</span>
            </div>
            <Progress value={spentPercentage} className="h-4" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-3 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Dialokasikan</p>
              <p className="text-base font-bold text-blue-600">{formatCurrency(totalBudget)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Digunakan</p>
              <p className="text-base font-bold text-red-600">{formatCurrency(totalSpent)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tersedia</p>
              <p className="text-base font-bold text-green-600">{formatCurrency(totalRemaining)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget by Category */}
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 h-10">
          <TabsTrigger value="categories" className="text-sm">Per Kategori</TabsTrigger>
          <TabsTrigger value="monthly" className="text-sm">Pengeluaran Bulanan</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {budgetCategories.map((item) => {
              const Icon = item.icon
              const percentage = (item.spent / item.allocated) * 100
              const status = percentage >= 90 ? 'critical' : percentage >= 70 ? 'warning' : 'good'

              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className={`py-4 bg-gradient-to-br ${item.color} text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-semibold">{item.category}</CardTitle>
                          <p className="text-sm opacity-90">{item.department}</p>
                        </div>
                      </div>
                      {status === 'critical' && (
                        <AlertCircle className="h-5 w-5 text-white animate-pulse" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Alokasi</p>
                        <p className="text-sm font-bold">{formatCurrency(item.allocated).replace(/\s/g, '')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Terpakai</p>
                        <p className="text-sm font-bold text-red-600">{formatCurrency(item.spent).replace(/\s/g, '')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Sisa</p>
                        <p className="text-sm font-bold text-green-600">{formatCurrency(item.remaining).replace(/\s/g, '')}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className={`font-bold ${
                          status === 'critical' ? 'text-red-600' :
                          status === 'warning' ? 'text-amber-600' :
                          'text-green-600'
                        }`}>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        className={`h-3 ${
                          status === 'critical' ? '[&>div]:bg-red-500' :
                          status === 'warning' ? '[&>div]:bg-amber-500' :
                          '[&>div]:bg-green-500'
                        }`}
                      />
                    </div>

                    {status !== 'good' && (
                      <div className={`p-3 rounded-lg border text-sm ${
                        status === 'critical'
                          ? 'bg-red-50 border-red-200 text-red-700'
                          : 'bg-amber-50 border-amber-200 text-amber-700'
                      }`}>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          <span className="font-medium">
                            {status === 'critical' ? 'Anggaran hampir habis!' : 'Perlu monitoring'}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {monthlySpending.map((item, index) => {
              const percentage = (item.amount / totalBudget) * 100
              const isCurrentMonth = index === new Date().getMonth()

              // Color gradients for each month
              const gradients = [
                'from-blue-500 to-cyan-500',      // Jan
                'from-purple-500 to-pink-500',    // Feb
                'from-green-500 to-emerald-500',  // Mar
                'from-orange-500 to-amber-500',   // Apr
                'from-red-500 to-rose-500',       // Mei
                'from-indigo-500 to-blue-500',    // Jun
                'from-teal-500 to-cyan-500',      // Jul
                'from-violet-500 to-purple-500',  // Ago
                'from-lime-500 to-green-500',     // Sep
                'from-amber-500 to-yellow-500',   // Okt
                'from-pink-500 to-rose-500',      // Nov
                'from-sky-500 to-blue-500',       // Des
              ]

              const gradient = gradients[index]
              const progressPercentage = (item.amount / maxMonthly) * 100

              return (
                <Card
                  key={item.month}
                  className={`overflow-hidden transition-all hover:scale-105 ${
                    isCurrentMonth ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                >
                  <CardHeader className={`py-4 bg-gradient-to-br ${gradient} text-white relative`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold">{item.month}</CardTitle>
                        <p className="text-sm opacity-90 mt-1">{selectedPeriod}</p>
                      </div>
                      <div className="text-right">
                        <Calendar className="h-8 w-8 opacity-30 absolute top-4 right-4" />
                      </div>
                    </div>
                    {isCurrentMonth && (
                      <Badge className="absolute top-2 right-2 bg-white/20 text-white border-white/30 text-xs">
                        Bulan Ini
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Total Pengeluaran</span>
                        <span className="text-xs text-muted-foreground">{percentage.toFixed(1)}% dari budget</span>
                      </div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                        {formatCurrency(item.amount)}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Vs Max Spending</span>
                        <span className="text-xs font-bold">{progressPercentage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${gradient} transition-all duration-500`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                      <div className="text-center p-2 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Vs Avg</p>
                        <p className={`text-sm font-bold ${
                          item.amount > (totalSpent / 12) ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {item.amount > (totalSpent / 12) ? '+' : ''}
                          {(((item.amount - (totalSpent / 12)) / (totalSpent / 12)) * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div className="text-center p-2 bg-slate-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Ranking</p>
                        <p className="text-sm font-bold text-blue-600">
                          #{monthlySpending
                            .slice()
                            .sort((a, b) => b.amount - a.amount)
                            .findIndex(m => m.month === item.month) + 1}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Monthly Summary */}
          <Card className="border-2 border-dashed">
            <CardHeader className="py-4 bg-gradient-to-r from-slate-50 to-slate-100">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Ringkasan Tahunan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <p className="text-sm text-blue-900 mb-1">Tertinggi</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(Math.max(...monthlySpending.map(m => m.amount)))}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    {monthlySpending.find(m => m.amount === Math.max(...monthlySpending.map(x => x.amount)))?.month}
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <p className="text-sm text-green-900 mb-1">Terendah</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(Math.min(...monthlySpending.map(m => m.amount)))}
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    {monthlySpending.find(m => m.amount === Math.min(...monthlySpending.map(x => x.amount)))?.month}
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <p className="text-sm text-purple-900 mb-1">Rata-rata</p>
                  <p className="text-xl font-bold text-purple-600">
                    {formatCurrency(totalSpent / 12)}
                  </p>
                  <p className="text-xs text-purple-700 mt-1">Per bulan</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                  <p className="text-sm text-amber-900 mb-1">Total</p>
                  <p className="text-xl font-bold text-amber-600">
                    {formatCurrency(totalSpent)}
                  </p>
                  <p className="text-xs text-amber-700 mt-1">Tahun {selectedPeriod}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Budget Alerts */}
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="py-4 bg-amber-50/50">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-base font-semibold text-amber-900">Peringatan Anggaran</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {budgetCategories
              .filter(item => (item.spent / item.allocated) * 100 >= 70)
              .map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-100 rounded">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-900">{item.category}</p>
                      <p className="text-xs text-amber-700">
                        {((item.spent / item.allocated) * 100).toFixed(1)}% terpakai
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs bg-white px-2 py-1">
                    Sisa: {formatCurrency(item.remaining)}
                  </Badge>
                </div>
              ))}
            {budgetCategories.filter(item => (item.spent / item.allocated) * 100 >= 70).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-3">
                Tidak ada peringatan anggaran saat ini
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
