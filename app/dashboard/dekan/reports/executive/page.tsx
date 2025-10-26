import { BarChart3, TrendingUp, Users, DollarSign, Award, Target, Calendar, Download } from "lucide-react"
import PageTemplate from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExecutiveReportsPage() {
  return (
    <PageTemplate
      title="Dashboard Eksekutif"
      description="Laporan strategis dan analitik untuk pengambilan keputusan"
      icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
      backHref="/dashboard/dekan/reports"
      actions={
        <div className="flex gap-2">
          <Select defaultValue="current-month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="current-quarter">Current Quarter</SelectItem>
              <SelectItem value="current-year">Current Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      }
    >
      {/* Executive KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Faculty Performance Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4.2/5.0</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <p className="text-xs text-green-600">+0.3 from last quarter</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Strategic Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="mt-2">
              <Progress value={85} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">11/13 objectives achieved</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Budget Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">92%</div>
            <div className="mt-2">
              <Progress value={92} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Optimal resource utilization</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stakeholder Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">4.1/5.0</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <p className="text-xs text-green-600">+0.2 improvement</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Strategic Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="financial">Financial Summary</TabsTrigger>
          <TabsTrigger value="trends">Trends & Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Strategic Objectives Progress
                </CardTitle>
                <CardDescription>Status pencapaian tujuan strategis fakultas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    objective: "Academic Excellence",
                    progress: 92,
                    status: "On Track",
                    target: "95%",
                    description: "Improve graduation rate and academic quality"
                  },
                  {
                    objective: "Research Output",
                    progress: 88,
                    status: "On Track",
                    target: "90%",
                    description: "Increase publications and research grants"
                  },
                  {
                    objective: "Industry Partnership",
                    progress: 95,
                    status: "Ahead",
                    target: "85%",
                    description: "Strengthen collaboration with industry"
                  },
                  {
                    objective: "Digital Transformation",
                    progress: 75,
                    status: "Behind",
                    target: "80%",
                    description: "Implement digital systems and processes"
                  },
                  {
                    objective: "Faculty Development",
                    progress: 82,
                    status: "On Track",
                    target: "85%",
                    description: "Professional development of academic staff"
                  }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.objective}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          item.status === 'Ahead' ? 'default' :
                            item.status === 'On Track' ? 'secondary' :
                              'destructive'
                        }>
                          {item.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Target: {item.target}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.progress} className="flex-1 h-2" />
                      <span className="text-sm font-medium w-10">{item.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Key Achievements This Quarter
                </CardTitle>
                <CardDescription>Pencapaian signifikan dalam 3 bulan terakhir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    achievement: "6 Program Studi Terakreditasi A",
                    impact: "Meningkatkan reputasi dan daya saing fakultas",
                    date: "Sep 2023",
                    category: "Academic"
                  },
                  {
                    achievement: "Kerjasama dengan 15 Industri Baru",
                    impact: "Membuka peluang magang dan penelitian kolaboratif",
                    date: "Oct 2023",
                    category: "Partnership"
                  },
                  {
                    achievement: "Dana Penelitian Rp 2.5M",
                    impact: "Mendukung 12 proyek penelitian unggulan",
                    date: "Aug 2023",
                    category: "Research"
                  },
                  {
                    achievement: "Implementasi Sistem Digital",
                    impact: "Efisiensi proses administrasi meningkat 40%",
                    date: "Oct 2023",
                    category: "Digital"
                  },
                  {
                    achievement: "Tingkat Kepuasan Mahasiswa 4.2/5.0",
                    impact: "Peningkatan kualitas layanan akademik",
                    date: "Sep 2023",
                    category: "Service"
                  }
                ].map((item, index) => (
                  <div key={index} className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{item.achievement}</h4>
                      <Badge className="bg-green-100 text-green-700">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{item.impact}</p>
                    <p className="text-xs text-green-600 font-medium">{item.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Faculty Snapshot
              </CardTitle>
              <CardDescription>Ringkasan statistik fakultas saat ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">3,245</div>
                  <p className="text-sm text-muted-foreground">Total Mahasiswa</p>
                  <p className="text-xs text-green-600">+120 dari tahun lalu</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">152</div>
                  <p className="text-sm text-muted-foreground">Dosen Aktif</p>
                  <p className="text-xs text-green-600">+8 dosen baru</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">8</div>
                  <p className="text-sm text-muted-foreground">Program Studi</p>
                  <p className="text-xs text-blue-600">6 Terakreditasi A</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">89.2%</div>
                  <p className="text-sm text-muted-foreground">Tingkat Kelulusan</p>
                  <p className="text-xs text-green-600">+3% improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Academic Performance Indicators</CardTitle>
                <CardDescription>Indikator kinerja akademik utama</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Graduation Rate</span>
                    <span className="text-sm text-green-600 font-semibold">89.2%</span>
                  </div>
                  <Progress value={89.2} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 90%</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average GPA</span>
                    <span className="text-sm text-blue-600 font-semibold">3.45</span>
                  </div>
                  <Progress value={86.25} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 3.50</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Student Satisfaction</span>
                    <span className="text-sm text-purple-600 font-semibold">4.1/5.0</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 4.2/5.0</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Employability Rate</span>
                    <span className="text-sm text-green-600 font-semibold">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 90%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Research & Innovation Metrics</CardTitle>
                <CardDescription>Indikator penelitian dan inovasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">International Publications</span>
                    <span className="text-sm text-green-600 font-semibold">142</span>
                  </div>
                  <Progress value={94.6} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 150 per year</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Research Grants</span>
                    <span className="text-sm text-blue-600 font-semibold">Rp 2.5M</span>
                  </div>
                  <Progress value={83.3} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: Rp 3M</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">PhD Qualified Faculty</span>
                    <span className="text-sm text-purple-600 font-semibold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 80%</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Industry Collaborations</span>
                    <span className="text-sm text-green-600 font-semibold">45</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 50 partnerships</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Department Performance Comparison</CardTitle>
              <CardDescription>Perbandingan kinerja antar departemen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: "Teknik Informatika & SI", performance: 4.5, students: 2135, research: 45, budget: 92 },
                  { dept: "Teknik Elektro & Sipil", performance: 4.2, students: 1456, research: 38, budget: 88 },
                  { dept: "Matematika & Fisika", performance: 4.0, students: 890, research: 32, budget: 85 },
                  { dept: "Kimia & Biologi", performance: 3.8, students: 654, research: 27, budget: 82 }
                ].map((dept, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">{dept.dept}</h4>
                      <Badge variant={
                        dept.performance >= 4.3 ? 'default' :
                          dept.performance >= 4.0 ? 'secondary' :
                            'outline'
                      }>
                        Score: {dept.performance}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Students</p>
                        <p className="font-semibold">{dept.students}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Research Projects</p>
                        <p className="font-semibold">{dept.research}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget Utilization</p>
                        <p className="font-semibold">{dept.budget}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Rp 12.5M</div>
                  <p className="text-sm text-muted-foreground">Total Budget 2023/2024</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Utilized</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="text-xs text-muted-foreground">Rp 8.5M spent, Rp 4M remaining</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { source: "Government Grant", amount: "Rp 7.5M", percentage: 60 },
                  { source: "Tuition Fees", amount: "Rp 3.0M", percentage: 24 },
                  { source: "Research Grants", amount: "Rp 1.5M", percentage: 12 },
                  { source: "Industry Partnership", amount: "Rp 0.5M", percentage: 4 }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.source}</span>
                      <span className="font-medium">{item.amount}</span>
                    </div>
                    <Progress value={item.percentage} className="h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Expenditure Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { category: "Operational", amount: "Rp 3.5M", percentage: 41 },
                  { category: "Research", amount: "Rp 1.7M", percentage: 20 },
                  { category: "Infrastructure", amount: "Rp 1.8M", percentage: 21 },
                  { category: "Development", amount: "Rp 1.5M", percentage: 18 }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="font-medium">{item.amount}</span>
                    </div>
                    <Progress value={item.percentage} className="h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Financial Health Indicators</CardTitle>
              <CardDescription>Indikator kesehatan keuangan fakultas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <p className="text-sm text-muted-foreground">Budget Efficiency</p>
                  <p className="text-xs text-green-600">Excellent</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <div className="text-2xl font-bold text-blue-600">1.2</div>
                  <p className="text-sm text-muted-foreground">Cost per Student (M)</p>
                  <p className="text-xs text-blue-600">Optimal</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
                  <div className="text-2xl font-bold text-purple-600">15%</div>
                  <p className="text-sm text-muted-foreground">Research Investment</p>
                  <p className="text-xs text-purple-600">Above Target</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
                  <div className="text-2xl font-bold text-orange-600">6</div>
                  <p className="text-sm text-muted-foreground">Months Runway</p>
                  <p className="text-xs text-orange-600">Healthy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Growth Trends
                </CardTitle>
                <CardDescription>Tren pertumbuhan 3 tahun terakhir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { metric: "Student Enrollment", trend: [2850, 3120, 3245], growth: "+7.8%" },
                  { metric: "Faculty Size", trend: [135, 144, 152], growth: "+5.6%" },
                  { metric: "Research Publications", trend: [98, 124, 142], growth: "+14.5%" },
                  { metric: "Industry Partnerships", trend: [25, 35, 45], growth: "+28.6%" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.metric}</span>
                      <span className="text-sm text-green-600 font-semibold">{item.growth}</span>
                    </div>
                    <div className="flex items-end gap-1 h-8">
                      {item.trend.map((value, idx) => {
                        const height = (value / Math.max(...item.trend)) * 100;
                        return (
                          <div
                            key={idx}
                            className="flex-1 bg-blue-500 rounded-t"
                            style={{ height: `${height}%` }}
                          ></div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>2021</span>
                      <span>2022</span>
                      <span>2023</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  2024 Forecasting
                </CardTitle>
                <CardDescription>Proyeksi dan target tahun depan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    objective: "Student Growth",
                    current: 3245,
                    target: 3500,
                    probability: 85,
                    strategy: "Enhanced marketing and partnership programs"
                  },
                  {
                    objective: "Research Output",
                    current: 142,
                    target: 180,
                    probability: 75,
                    strategy: "Increased research funding and collaboration"
                  },
                  {
                    objective: "Accreditation A",
                    current: 6,
                    target: 8,
                    probability: 90,
                    strategy: "Complete re-accreditation for remaining programs"
                  },
                  {
                    objective: "Industry Partners",
                    current: 45,
                    target: 60,
                    probability: 80,
                    strategy: "Focused outreach and partnership development"
                  }
                ].map((item, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm">{item.objective}</h4>
                      <Badge variant={item.probability >= 80 ? 'default' : 'secondary'}>
                        {item.probability}% likely
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Current: {item.current}</span>
                      <span className="font-semibold">Target: {item.target}</span>
                    </div>
                    <Progress value={item.probability} className="h-1 mb-2" />
                    <p className="text-xs text-muted-foreground">{item.strategy}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  )
}

