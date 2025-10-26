import { Award, TrendingUp, Users, CheckCircle, BarChart3, Target } from "lucide-react"
import { StatusCardsTemplate } from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QualityAssurancePage() {
  const statusCards = [
    {
      title: "Quality Score",
      value: "4.2/5.0",
      description: "Rata-rata skor mutu fakultas",
      trend: "+0.3 dari tahun lalu",
      icon: <Award className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "KPI Achievement",
      value: "92%",
      description: "11/12 indikator tercapai",
      trend: "+8% improvement",
      icon: <Target className="h-5 w-5 text-green-600" />,
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Student Satisfaction",
      value: "4.1/5.0",
      description: "Kepuasan mahasiswa",
      trend: "82% mahasiswa puas",
      icon: <Users className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "Quality Audits",
      value: "8/8",
      description: "Audit mutu internal",
      trend: "100% completed",
      icon: <CheckCircle className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100 dark:bg-orange-900"
    }
  ]

  return (
    <StatusCardsTemplate
      title="Jaminan Mutu Akademik"
      description="Monitoring dan evaluasi mutu pendidikan tinggi"
      icon={<Award className="h-6 w-6 text-blue-600" />}
      cards={statusCards}
    >
      <Tabs defaultValue="kpi" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kpi">Key Performance Indicators</TabsTrigger>
          <TabsTrigger value="audit">Internal Audit</TabsTrigger>
          <TabsTrigger value="satisfaction">Student Satisfaction</TabsTrigger>
          <TabsTrigger value="improvement">Continuous Improvement</TabsTrigger>
        </TabsList>

        <TabsContent value="kpi" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Academic Performance KPIs
                </CardTitle>
                <CardDescription>Indikator kinerja akademik utama</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tingkat Kelulusan</span>
                    <span className="text-sm text-green-600 font-semibold">89.2%</span>
                  </div>
                  <Progress value={89.2} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 90%</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rata-rata IPK</span>
                    <span className="text-sm text-blue-600 font-semibold">3.45</span>
                  </div>
                  <Progress value={86.25} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 3.50</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Waktu Studi Rata-rata</span>
                    <span className="text-sm text-purple-600 font-semibold">4.2 tahun</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 4.0 tahun</p>
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
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Faculty Performance KPIs
                </CardTitle>
                <CardDescription>Indikator kinerja dosen dan fakultas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Dosen Berkualifikasi S3</span>
                    <span className="text-sm text-green-600 font-semibold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 80%</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Publikasi Internasional</span>
                    <span className="text-sm text-blue-600 font-semibold">142</span>
                  </div>
                  <Progress value={94.6} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 150 per tahun</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rasio Dosen:Mahasiswa</span>
                    <span className="text-sm text-orange-600 font-semibold">1:21</span>
                  </div>
                  <Progress value={71.4} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 1:15</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Research Grants</span>
                    <span className="text-sm text-purple-600 font-semibold">24</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 30 grants</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>KPI Summary by Program</CardTitle>
              <CardDescription>Ringkasan indikator kinerja per program studi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Teknik Informatika", score: 4.5, graduation: 92, satisfaction: 4.3, color: "bg-green-100 text-green-700" },
                  { name: "Sistem Informasi", score: 4.2, graduation: 88, satisfaction: 4.1, color: "bg-blue-100 text-blue-700" },
                  { name: "Matematika", score: 4.0, graduation: 85, satisfaction: 3.9, color: "bg-yellow-100 text-yellow-700" },
                  { name: "Fisika", score: 3.8, graduation: 82, satisfaction: 3.7, color: "bg-orange-100 text-orange-700" },
                ].map((program, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">{program.name}</p>
                      <p className="text-xs text-muted-foreground">Program Studi</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">{program.score}</p>
                        <p className="text-xs text-muted-foreground">Quality Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{program.graduation}%</p>
                        <p className="text-xs text-muted-foreground">Graduation</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{program.satisfaction}</p>
                        <p className="text-xs text-muted-foreground">Satisfaction</p>
                      </div>
                      <Badge className={program.color}>
                        {program.score >= 4.0 ? "Excellent" : program.score >= 3.5 ? "Good" : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Internal Quality Audit</CardTitle>
              <CardDescription>Status dan hasil audit mutu internal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    program: "Teknik Informatika",
                    auditDate: "15 Sep 2023",
                    score: 4.5,
                    findings: 2,
                    status: "completed",
                    auditor: "Dr. Ahmad Fauzi"
                  },
                  {
                    program: "Sistem Informasi",
                    auditDate: "20 Sep 2023",
                    score: 4.2,
                    findings: 3,
                    status: "completed",
                    auditor: "Dr. Siti Nurhaliza"
                  },
                  {
                    program: "Matematika",
                    auditDate: "25 Sep 2023",
                    score: 4.0,
                    findings: 4,
                    status: "completed",
                    auditor: "Dr. Budi Santoso"
                  },
                  {
                    program: "Fisika",
                    auditDate: "30 Sep 2023",
                    score: 3.8,
                    findings: 5,
                    status: "in-progress",
                    auditor: "Dr. Joko Widodo"
                  }
                ].map((audit, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{audit.program}</h4>
                      <Badge variant={audit.status === 'completed' ? 'default' : 'secondary'}>
                        {audit.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Audit Date:</span>
                        <span>{audit.auditDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quality Score:</span>
                        <span className="font-medium">{audit.score}/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Findings:</span>
                        <span>{audit.findings} items</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Auditor:</span>
                        <span>{audit.auditor}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Student Satisfaction Survey</CardTitle>
                <CardDescription>Hasil survei kepuasan mahasiswa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Kualitas Pengajaran</span>
                    <span className="text-sm text-green-600 font-semibold">4.3/5.0</span>
                  </div>
                  <Progress value={86} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Fasilitas Kampus</span>
                    <span className="text-sm text-blue-600 font-semibold">4.0/5.0</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pelayanan Akademik</span>
                    <span className="text-sm text-purple-600 font-semibold">3.9/5.0</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Kurikulum & Materi</span>
                    <span className="text-sm text-green-600 font-semibold">4.1/5.0</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Satisfaction Trends</CardTitle>
                <CardDescription>Tren kepuasan mahasiswa 3 tahun terakhir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { year: "2023", score: 4.1, trend: "up", change: "+0.2" },
                    { year: "2022", score: 3.9, trend: "up", change: "+0.1" },
                    { year: "2021", score: 3.8, trend: "stable", change: "0.0" }
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{data.year}</span>
                        <Badge variant={data.trend === 'up' ? 'default' : 'secondary'}>
                          {data.trend === 'up' ? '↗️ Naik' : '→ Stabil'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{data.score}/5.0</p>
                        <p className="text-xs text-muted-foreground">{data.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="improvement" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Continuous Improvement Plan</CardTitle>
              <CardDescription>Rencana perbaikan berkelanjutan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Peningkatan Rasio Dosen",
                  description: "Rekrutmen 15 dosen baru untuk mencapai rasio ideal 1:15",
                  status: "in-progress",
                  deadline: "Des 2023",
                  progress: 60
                },
                {
                  title: "Upgrade Fasilitas Lab",
                  description: "Modernisasi peralatan laboratorium untuk 4 program studi",
                  status: "planning",
                  deadline: "Mar 2024",
                  progress: 25
                },
                {
                  title: "Digital Learning Platform",
                  description: "Implementasi platform pembelajaran digital terintegrasi",
                  status: "completed",
                  deadline: "Sep 2023",
                  progress: 100
                }
              ].map((plan, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className={`p-2 rounded-full ${plan.status === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                      plan.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900' :
                        'bg-orange-100 dark:bg-orange-900'
                    }`}>
                    {plan.status === 'completed' ?
                      <CheckCircle className="h-4 w-4 text-green-600" /> :
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    }
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{plan.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={plan.progress} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{plan.progress}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      plan.status === 'completed' ? 'default' :
                        plan.status === 'in-progress' ? 'secondary' :
                          'outline'
                    }>
                      {plan.status === 'completed' ? 'Completed' :
                        plan.status === 'in-progress' ? 'In Progress' :
                          'Planning'}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Due: {plan.deadline}</p>
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

