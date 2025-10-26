import { DollarSign, TrendingUp, PieChart, BarChart3, AlertTriangle, CheckCircle } from "lucide-react"
import { StatusCardsTemplate } from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function FinancialOversightPage() {
  const statusCards = [
    {
      title: "Total Budget",
      value: "Rp 12.5M",
      description: "Anggaran fakultas 2023/2024",
      trend: "+8% dari tahun lalu",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Budget Utilized",
      value: "68%",
      description: "Rp 8.5M telah direalisasikan",
      trend: "Rp 4M tersisa",
      icon: <PieChart className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "Monthly Burn Rate",
      value: "Rp 1.2M",
      description: "Rata-rata pengeluaran/bulan",
      trend: "Normal range",
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "Pending Approvals",
      value: "Rp 850K",
      description: "Menunggu persetujuan anggaran",
      trend: "3 proposal pending",
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100 dark:bg-orange-900"
    }
  ]

  return (
    <StatusCardsTemplate
      title="Pengawasan Keuangan"
      description="Monitoring dan pengelolaan anggaran fakultas"
      icon={<DollarSign className="h-6 w-6 text-green-600" />}
      cards={statusCards}
    >
      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/dekan/finance/budget">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                  <PieChart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Ikhtisar Anggaran</CardTitle>
                  <CardDescription>Budget overview & allocation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Allocated</span>
                  <span className="font-medium">Rp 12.5M</span>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-muted-foreground">68% utilized</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/finance/reports">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Laporan Keuangan</CardTitle>
                  <CardDescription>Financial reports & analysis</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">15</p>
                  <p className="text-xs text-muted-foreground">Reports available</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700">
                  Updated
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/finance/expenditure">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Monitor Pengeluaran</CardTitle>
                  <CardDescription>Expenditure tracking</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">Rp 8.5M</p>
                  <p className="text-xs text-muted-foreground">Year to date</p>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  On Track
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/finance/planning">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Perencanaan Keuangan</CardTitle>
                  <CardDescription>Financial planning & forecasting</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">2024</p>
                  <p className="text-xs text-muted-foreground">Budget planning</p>
                </div>
                <Badge variant="outline">
                  In Progress
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Budget Overview</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-green-600" />
                  Budget Breakdown 2023/2024
                </CardTitle>
                <CardDescription>Distribusi anggaran per kategori</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { category: "Operasional", amount: "Rp 5.2M", percentage: 42, color: "bg-blue-500" },
                  { category: "Penelitian", amount: "Rp 3.8M", percentage: 30, color: "bg-green-500" },
                  { category: "Pengembangan", amount: "Rp 2.5M", percentage: 20, color: "bg-purple-500" },
                  { category: "Kemahasiswaan", amount: "Rp 1.0M", percentage: 8, color: "bg-orange-500" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm font-semibold">{item.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.percentage}% of total budget</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Realization Status
                </CardTitle>
                <CardDescription>Status realisasi anggaran per kategori</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { category: "Operasional", budgeted: 5.2, realized: 3.5, percentage: 67 },
                  { category: "Penelitian", budgeted: 3.8, realized: 1.7, percentage: 45 },
                  { category: "Pengembangan", budgeted: 2.5, realized: 0.8, percentage: 32 },
                  { category: "Kemahasiswaan", budgeted: 1.0, realized: 0.5, percentage: 50 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm font-semibold">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Realized: Rp {item.realized}M</span>
                      <span>Budget: Rp {item.budgeted}M</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Financial Activities</CardTitle>
              <CardDescription>Aktivitas keuangan terbaru</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  date: "23 Oct 2023",
                  activity: "Pencairan Dana Penelitian",
                  amount: "Rp 350K",
                  department: "Teknik Informatika",
                  status: "approved"
                },
                {
                  date: "22 Oct 2023",
                  activity: "Pembelian Alat Lab",
                  amount: "Rp 1.2M",
                  department: "Kimia",
                  status: "pending"
                },
                {
                  date: "21 Oct 2023",
                  activity: "Biaya Seminar Nasional",
                  amount: "Rp 500K",
                  department: "Matematika",
                  status: "approved"
                },
                {
                  date: "20 Oct 2023",
                  activity: "Renovasi Ruang Kuliah",
                  amount: "Rp 800K",
                  department: "Fakultas",
                  status: "approved"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${activity.status === 'approved' ? 'bg-green-100 dark:bg-green-900' : 'bg-orange-100 dark:bg-orange-900'
                      }`}>
                      {activity.status === 'approved' ?
                        <CheckCircle className="h-4 w-4 text-green-600" /> :
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{activity.activity}</p>
                      <p className="text-sm text-muted-foreground">{activity.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{activity.amount}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                      <Badge variant={activity.status === 'approved' ? 'default' : 'secondary'}>
                        {activity.status === 'approved' ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Budget Allocation by Department</CardTitle>
              <CardDescription>Alokasi anggaran per departemen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: "Teknik Informatika & SI", allocated: 3.2, utilized: 2.1, percentage: 66 },
                  { dept: "Teknik Elektro & Sipil", allocated: 2.8, utilized: 1.9, percentage: 68 },
                  { dept: "Matematika & Fisika", allocated: 2.1, utilized: 1.4, percentage: 67 },
                  { dept: "Kimia & Biologi", allocated: 1.9, utilized: 1.3, percentage: 68 },
                  { dept: "Unit Penelitian", allocated: 1.5, utilized: 0.9, percentage: 60 },
                  { dept: "Kemahasiswaan", allocated: 1.0, utilized: 0.5, percentage: 50 }
                ].map((dept, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">{dept.dept}</h4>
                      <Badge variant={dept.percentage >= 65 ? 'default' : 'secondary'}>
                        {dept.percentage}% utilized
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Allocated: Rp {dept.allocated}M</span>
                        <span>Utilized: Rp {dept.utilized}M</span>
                      </div>
                      <Progress value={dept.percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Remaining: Rp {(dept.allocated - dept.utilized).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
                <CardDescription>Tren pengeluaran bulanan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { month: "Juli 2023", amount: 1.1, target: 1.0, variance: 10 },
                  { month: "Agustus 2023", amount: 1.3, target: 1.2, variance: 8 },
                  { month: "September 2023", amount: 1.2, target: 1.1, variance: 9 },
                  { month: "Oktober 2023", amount: 1.4, target: 1.3, variance: 8 }
                ].map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="text-right">
                        <p className="text-sm font-semibold">Rp {data.amount}M</p>
                        <p className="text-xs text-muted-foreground">Target: Rp {data.target}M</p>
                      </div>
                    </div>
                    <Progress value={(data.amount / 1.5) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Variance: +{data.variance}% from target
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Yearly Comparison</CardTitle>
                <CardDescription>Perbandingan anggaran tahun ke tahun</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { year: "2021", budget: 10.2, utilized: 9.8, rate: 96 },
                  { year: "2022", budget: 11.5, utilized: 10.9, rate: 95 },
                  { year: "2023", budget: 12.5, utilized: 8.5, rate: 68 }
                ].map((year, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Tahun {year.year}</span>
                      <span className="text-sm font-semibold">{year.rate}%</span>
                    </div>
                    <Progress value={year.rate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Budget: Rp {year.budget}M</span>
                      <span>Utilized: Rp {year.utilized}M</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Financial Alerts & Warnings
              </CardTitle>
              <CardDescription>Peringatan dan notifikasi keuangan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  type: "warning",
                  title: "Budget Threshold Alert",
                  message: "Anggaran Kemahasiswaan telah mencapai 50% dari alokasi",
                  action: "Review spending pattern",
                  priority: "medium"
                },
                {
                  type: "info",
                  title: "Quarterly Review Due",
                  message: "Review anggaran kuartal Q4 jatuh tempo minggu depan",
                  action: "Schedule review meeting",
                  priority: "low"
                },
                {
                  type: "success",
                  title: "Budget Performance",
                  message: "Anggaran penelitian berperforma baik dengan utilisasi optimal",
                  action: "Continue monitoring",
                  priority: "info"
                }
              ].map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${alert.type === 'warning' ? 'border-orange-500 bg-orange-50 dark:bg-orange-950' :
                    alert.type === 'info' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' :
                      'border-green-500 bg-green-50 dark:bg-green-950'
                  }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-1 rounded-full ${alert.type === 'warning' ? 'bg-orange-100 dark:bg-orange-900' :
                        alert.type === 'info' ? 'bg-blue-100 dark:bg-blue-900' :
                          'bg-green-100 dark:bg-green-900'
                      }`}>
                      {alert.type === 'warning' ?
                        <AlertTriangle className="h-4 w-4 text-orange-600" /> :
                        alert.type === 'info' ?
                          <BarChart3 className="h-4 w-4 text-blue-600" /> :
                          <CheckCircle className="h-4 w-4 text-green-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <p className="text-xs font-medium">Action: {alert.action}</p>
                    </div>
                    <Badge variant={
                      alert.priority === 'medium' ? 'secondary' :
                        alert.priority === 'low' ? 'outline' :
                          'default'
                    }>
                      {alert.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </StatusCardsTemplate>
  )
}

