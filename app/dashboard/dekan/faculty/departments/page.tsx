import { Users, BarChart3, TrendingUp, Award, AlertCircle, CheckCircle, Target } from "lucide-react"
import { StatusCardsTemplate } from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DepartmentOversightPage() {
  const statusCards = [
    {
      title: "Total Departments",
      value: "4",
      description: "Active departments",
      trend: "All operational",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "Average Performance",
      value: "4.2/5.0",
      description: "Department performance score",
      trend: "+0.3 from last year",
      icon: <BarChart3 className="h-5 w-5 text-green-600" />,
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Programs with A-accreditation",
      value: "6/8",
      description: "75% excellent accreditation",
      trend: "2 under review",
      icon: <Award className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "Budget Utilization",
      value: "87%",
      description: "Average across departments",
      trend: "Optimal usage",
      icon: <Target className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100 dark:bg-orange-900"
    }
  ]

  return (
    <StatusCardsTemplate
      title="Pengawasan Jurusan"
      description="Monitoring dan evaluasi kinerja departemen fakultas"
      icon={<Users className="h-6 w-6 text-green-600" />}
      cards={statusCards}
    >
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance Overview</TabsTrigger>
          <TabsTrigger value="comparison">Department Comparison</TabsTrigger>
          <TabsTrigger value="issues">Issues & Actions</TabsTrigger>
          <TabsTrigger value="development">Development Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                department: "Teknik Informatika & Sistem Informasi",
                head: "Dr. Ahmad Fauzi, ST., MT.",
                programs: 2,
                students: 2135,
                faculty: 45,
                performance: {
                  overall: 4.5,
                  academic: 4.6,
                  research: 4.4,
                  service: 4.3,
                  finance: 4.7
                },
                highlights: [
                  "Highest student enrollment",
                  "Excellence in research output",
                  "Strong industry partnerships"
                ],
                concerns: [
                  "Faculty-student ratio needs improvement"
                ],
                color: "blue"
              },
              {
                department: "Teknik Elektro & Sipil",
                head: "Dr. Ir. Joko Widodo, ST., MT.",
                programs: 2,
                students: 1454,
                faculty: 38,
                performance: {
                  overall: 4.2,
                  academic: 4.1,
                  research: 4.0,
                  service: 4.3,
                  finance: 4.4
                },
                highlights: [
                  "Strong academic programs",
                  "Good financial management",
                  "Active community service"
                ],
                concerns: [
                  "Research output below target",
                  "Need more industry collaboration"
                ],
                color: "green"
              },
              {
                department: "Matematika & Fisika",
                head: "Dr. Rahman Ali, S.Si., M.Si.",
                programs: 2,
                students: 780,
                faculty: 32,
                performance: {
                  overall: 4.0,
                  academic: 4.2,
                  research: 3.8,
                  service: 4.0,
                  finance: 4.0
                },
                highlights: [
                  "Strong theoretical foundation",
                  "Good student-faculty ratio",
                  "Stable program management"
                ],
                concerns: [
                  "Lower research publications",
                  "Need accreditation improvement"
                ],
                color: "purple"
              },
              {
                department: "Kimia & Biologi",
                head: "Dr. Ir. Dewi Lestari, S.Si., M.Si.",
                programs: 2,
                students: 523,
                faculty: 28,
                performance: {
                  overall: 3.8,
                  academic: 3.9,
                  research: 3.7,
                  service: 3.8,
                  finance: 3.8
                },
                highlights: [
                  "Specialized laboratory facilities",
                  "Focus on environmental studies",
                  "Growing research interest"
                ],
                concerns: [
                  "Low student enrollment",
                  "Need accreditation upgrade",
                  "Research funding challenges"
                ],
                color: "orange"
              }
            ].map((dept, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{dept.department}</CardTitle>
                      <CardDescription>Head: {dept.head}</CardDescription>
                    </div>
                    <Badge className={`bg-${dept.color}-100 text-${dept.color}-700`}>
                      Score: {dept.performance.overall}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{dept.programs}</div>
                      <p className="text-xs text-muted-foreground">Programs</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{dept.students}</div>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{dept.faculty}</div>
                      <p className="text-xs text-muted-foreground">Faculty</p>
                    </div>
                  </div>

                  {/* Performance Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Performance Metrics</h4>
                    {[
                      { metric: "Academic", score: dept.performance.academic },
                      { metric: "Research", score: dept.performance.research },
                      { metric: "Service", score: dept.performance.service },
                      { metric: "Finance", score: dept.performance.finance }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm">{item.metric}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={item.score * 20} className="w-16 h-2" />
                          <span className="text-sm font-medium w-8">{item.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-green-700">Strengths</h4>
                    {dept.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-xs text-green-700">{highlight}</p>
                      </div>
                    ))}
                  </div>

                  {/* Concerns */}
                  {dept.concerns.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-orange-700">Areas for Improvement</h4>
                      {dept.concerns.map((concern, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <AlertCircle className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                          <p className="text-xs text-orange-700">{concern}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Action Plan</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Department Performance Comparison</CardTitle>
              <CardDescription>Perbandingan kinerja antar departemen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Overall Performance Ranking */}
                <div>
                  <h4 className="font-semibold mb-4">Overall Performance Ranking</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Teknik Informatika & SI", score: 4.5, rank: 1, color: "bg-gold", trend: "↗️" },
                      { name: "Teknik Elektro & Sipil", score: 4.2, rank: 2, color: "bg-silver", trend: "→" },
                      { name: "Matematika & Fisika", score: 4.0, rank: 3, color: "bg-bronze", trend: "↗️" },
                      { name: "Kimia & Biologi", score: 3.8, rank: 4, color: "bg-gray-300", trend: "↗️" }
                    ].map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full ${dept.color} flex items-center justify-center text-white font-bold text-sm`}>
                            {dept.rank}
                          </div>
                          <div>
                            <p className="font-medium">{dept.name}</p>
                            <p className="text-sm text-muted-foreground">Performance Score: {dept.score}/5.0</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={dept.score * 20} className="w-20 h-2" />
                          <span className="text-lg">{dept.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Metrics Comparison */}
                <div>
                  <h4 className="font-semibold mb-4">Detailed Metrics Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Department</th>
                          <th className="text-center p-2">Academic</th>
                          <th className="text-center p-2">Research</th>
                          <th className="text-center p-2">Service</th>
                          <th className="text-center p-2">Finance</th>
                          <th className="text-center p-2">Students</th>
                          <th className="text-center p-2">Faculty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "IT & SI", academic: 4.6, research: 4.4, service: 4.3, finance: 4.7, students: 2135, faculty: 45 },
                          { name: "Elektro & Sipil", academic: 4.1, research: 4.0, service: 4.3, finance: 4.4, students: 1454, faculty: 38 },
                          { name: "Mat & Fisika", academic: 4.2, research: 3.8, service: 4.0, finance: 4.0, students: 780, faculty: 32 },
                          { name: "Kimia & Bio", academic: 3.9, research: 3.7, service: 3.8, finance: 3.8, students: 523, faculty: 28 }
                        ].map((dept, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">{dept.name}</td>
                            <td className="text-center p-2">{dept.academic}</td>
                            <td className="text-center p-2">{dept.research}</td>
                            <td className="text-center p-2">{dept.service}</td>
                            <td className="text-center p-2">{dept.finance}</td>
                            <td className="text-center p-2">{dept.students}</td>
                            <td className="text-center p-2">{dept.faculty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="p-4 bg-green-50 dark:bg-green-950">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <h4 className="font-semibold text-green-800">Top Performer</h4>
                    </div>
                    <p className="text-sm text-green-700">Teknik Informatika & SI leads in overall performance with strong research output and industry partnerships.</p>
                  </Card>

                  <Card className="p-4 bg-orange-50 dark:bg-orange-950">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <h4 className="font-semibold text-orange-800">Needs Attention</h4>
                    </div>
                    <p className="text-sm text-orange-700">Kimia & Biologi requires support in student recruitment and research funding to improve performance.</p>
                  </Card>

                  <Card className="p-4 bg-blue-50 dark:bg-blue-950">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">Growth Opportunity</h4>
                    </div>
                    <p className="text-sm text-blue-700">All departments show positive trends in performance metrics with room for strategic improvements.</p>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Issues & Action Items
              </CardTitle>
              <CardDescription>Identifikasi masalah dan rencana tindakan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  issue: "Faculty-Student Ratio Imbalance",
                  department: "Teknik Informatika & SI",
                  severity: "medium",
                  description: "Rasio dosen mahasiswa 1:47 melebihi standar ideal 1:25",
                  impact: "Kualitas pembelajaran dan bimbingan mahasiswa",
                  action: "Rekrutmen 8 dosen baru dalam 6 bulan",
                  timeline: "6 months",
                  responsible: "Bagian Kepegawaian",
                  status: "in-progress"
                },
                {
                  issue: "Low Research Output",
                  department: "Matematika & Fisika",
                  severity: "high",
                  description: "Publikasi internasional dibawah target fakultas",
                  impact: "Ranking dan akreditasi program",
                  action: "Program peningkatan kapasitas penelitian",
                  timeline: "12 months",
                  responsible: "Unit Penelitian",
                  status: "planned"
                },
                {
                  issue: "Student Enrollment Decline",
                  department: "Kimia & Biologi",
                  severity: "high",
                  description: "Penurunan 15% pendaftar dalam 2 tahun terakhir",
                  impact: "Sustainabilitas program dan anggaran",
                  action: "Marketing dan rebranding program",
                  timeline: "9 months",
                  responsible: "Tim Marketing",
                  status: "planning"
                },
                {
                  issue: "Laboratory Equipment Obsolescence",
                  department: "Teknik Elektro & Sipil",
                  severity: "medium",
                  description: "40% peralatan lab berusia >10 tahun",
                  impact: "Kualitas praktikum dan penelitian",
                  action: "Upgrade peralatan laboratorium",
                  timeline: "18 months",
                  responsible: "Unit Sarana",
                  status: "budgeting"
                }
              ].map((issue, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${issue.severity === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-950' :
                    issue.severity === 'medium' ? 'border-orange-500 bg-orange-50 dark:bg-orange-950' :
                      'border-yellow-500 bg-yellow-50 dark:bg-yellow-950'
                  }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{issue.issue}</h4>
                      <p className="text-sm text-muted-foreground">{issue.department}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        issue.severity === 'high' ? 'destructive' :
                          issue.severity === 'medium' ? 'default' : 'secondary'
                      }>
                        {issue.severity}
                      </Badge>
                      <Badge variant="outline">
                        {issue.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>

                  <div className="grid gap-2 md:grid-cols-2 text-sm">
                    <div>
                      <span className="font-medium">Impact:</span> {issue.impact}
                    </div>
                    <div>
                      <span className="font-medium">Timeline:</span> {issue.timeline}
                    </div>
                    <div>
                      <span className="font-medium">Action:</span> {issue.action}
                    </div>
                    <div>
                      <span className="font-medium">Responsible:</span> {issue.responsible}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t">
                    <Button size="sm" variant="outline">Update Status</Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Department Development Plans
              </CardTitle>
              <CardDescription>Rencana pengembangan dan peningkatan kinerja departemen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  department: "Teknik Informatika & SI",
                  plan: "Centers of Excellence Initiative",
                  description: "Pengembangan pusat keunggulan AI dan Data Science",
                  budget: "Rp 2.5M",
                  timeline: "24 months",
                  objectives: [
                    "Establish AI Research Lab",
                    "Industry partnership program",
                    "Faculty capacity building",
                    "Student exchange program"
                  ],
                  progress: 25,
                  status: "active"
                },
                {
                  department: "Teknik Elektro & Sipil",
                  plan: "Infrastructure Modernization",
                  description: "Modernisasi laboratorium dan fasilitas praktikum",
                  budget: "Rp 1.8M",
                  timeline: "18 months",
                  objectives: [
                    "Lab equipment upgrade",
                    "Digital learning platform",
                    "Professional certification prep",
                    "Industry collaboration space"
                  ],
                  progress: 15,
                  status: "planning"
                },
                {
                  department: "Matematika & Fisika",
                  plan: "Research Enhancement Program",
                  description: "Peningkatan kapasitas dan output penelitian",
                  budget: "Rp 1.2M",
                  timeline: "12 months",
                  objectives: [
                    "Research mentorship program",
                    "Publication incentive system",
                    "Conference participation fund",
                    "Collaboration with international institutions"
                  ],
                  progress: 40,
                  status: "active"
                },
                {
                  department: "Kimia & Biologi",
                  plan: "Revitalization & Rebranding",
                  description: "Revitalisasi program dan peningkatan daya tarik",
                  budget: "Rp 1.0M",
                  timeline: "15 months",
                  objectives: [
                    "Curriculum modernization",
                    "Green technology focus",
                    "Industry internship program",
                    "Alumni engagement initiative"
                  ],
                  progress: 10,
                  status: "approved"
                }
              ].map((plan, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{plan.plan}</h4>
                      <p className="text-sm text-muted-foreground">{plan.department}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{plan.description}</p>
                    </div>
                    <Badge variant={
                      plan.status === 'active' ? 'default' :
                        plan.status === 'planning' ? 'secondary' :
                          plan.status === 'approved' ? 'outline' : 'destructive'
                    }>
                      {plan.status}
                    </Badge>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div>
                      <p className="text-sm"><span className="font-medium">Budget:</span> {plan.budget}</p>
                      <p className="text-sm"><span className="font-medium">Timeline:</span> {plan.timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Progress: {plan.progress}%</p>
                      <Progress value={plan.progress} className="h-2" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Key Objectives:</p>
                    <div className="grid gap-1 md:grid-cols-2">
                      {plan.objectives.map((objective, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t">
                    <Button size="sm" variant="outline">View Timeline</Button>
                    <Button size="sm" variant="outline">Budget Details</Button>
                    <Button size="sm">Update Progress</Button>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </StatusCardsTemplate>
  )
}
