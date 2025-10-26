import { BookOpen, FileText, Clock, CheckCircle, AlertCircle, Users } from "lucide-react"
import PageTemplate from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CurriculumOversightPage() {
  return (
    <PageTemplate
      title="Pengawasan Kurikulum"
      description="Monitoring dan evaluasi kurikulum program studi"
      icon={<BookOpen className="h-6 w-6 text-blue-600" />}
      backHref="/dashboard/dekan/academic"
      badge={{ text: "6/8 Prodi Selesai", variant: "secondary" }}
    >
      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8/8</div>
            <p className="text-xs text-muted-foreground">Program Studi</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">6</div>
            <p className="text-xs text-muted-foreground">Review selesai</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dalam Proses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">Sedang direview</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <p className="text-xs text-muted-foreground">Sesuai standar</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="review">Status Review</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Progress Review Kurikulum</CardTitle>
                <CardDescription>Status review per program studi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Teknik Informatika</p>
                      <p className="text-xs text-muted-foreground">Kurikulum 2023</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Selesai
                    </Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sistem Informasi</p>
                      <p className="text-xs text-muted-foreground">Kurikulum 2023</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Selesai
                    </Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Matematika</p>
                      <p className="text-xs text-muted-foreground">Kurikulum 2023</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">
                      <Clock className="w-3 h-3 mr-1" />
                      Review
                    </Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Fisika</p>
                      <p className="text-xs text-muted-foreground">Kurikulum 2023</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">
                      <Clock className="w-3 h-3 mr-1" />
                      Review
                    </Badge>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Indikator kinerja kurikulum</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">MBKM Integration</span>
                    <span className="text-sm text-green-600 font-semibold">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Industry Alignment</span>
                    <span className="text-sm text-blue-600 font-semibold">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Learning Outcomes</span>
                    <span className="text-sm text-purple-600 font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Student Satisfaction</span>
                    <span className="text-sm text-green-600 font-semibold">4.2/5.0</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Detail Status Review</CardTitle>
              <CardDescription>Progress detail review kurikulum per program studi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Teknik Informatika", status: "completed", progress: 100, reviewer: "Dr. Ahmad Fauzi", date: "15 Oct 2023" },
                  { name: "Sistem Informasi", status: "completed", progress: 100, reviewer: "Dr. Siti Nurhaliza", date: "12 Oct 2023" },
                  { name: "Matematika", status: "review", progress: 75, reviewer: "Dr. Budi Santoso", date: "In Progress" },
                  { name: "Fisika", status: "review", progress: 60, reviewer: "Dr. Joko Widodo", date: "In Progress" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${item.status === 'completed' ? 'bg-green-100 dark:bg-green-900' : 'bg-orange-100 dark:bg-orange-900'
                        }`}>
                        {item.status === 'completed' ?
                          <CheckCircle className="h-4 w-4 text-green-600" /> :
                          <Clock className="h-4 w-4 text-orange-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Reviewer: {item.reviewer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Progress value={item.progress} className="w-20 h-2" />
                        <span className="text-sm font-medium">{item.progress}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Compliance Standards</CardTitle>
              <CardDescription>Kepatuhan kurikulum terhadap standar nasional dan internasional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800 dark:text-green-200">KKNI Compliance</h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                    100% kurikulum sesuai dengan kerangka KKNI level 6-8
                  </p>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">MBKM Integration</h4>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                    Semua program studi terintegrasi dengan program MBKM
                  </p>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Industry Standards</h4>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                    85% mata kuliah sesuai dengan kebutuhan industri
                  </p>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200">International Standards</h4>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                    75% kurikulum sesuai standar internasional
                  </p>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Update terbaru dalam pengawasan kurikulum</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Review Kurikulum SI Selesai",
                  description: "Kurikulum Sistem Informasi telah selesai direview dan disetujui",
                  time: "2 jam lalu",
                  type: "success"
                },
                {
                  title: "Meeting dengan Industri",
                  description: "Diskusi alignment kurikulum TI dengan kebutuhan industri tech",
                  time: "1 hari lalu",
                  type: "info"
                },
                {
                  title: "Update MBKM Guidelines",
                  description: "Panduan baru integrasi MBKM untuk semua program studi",
                  time: "3 hari lalu",
                  type: "warning"
                }
              ].map((update, index) => (
                <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${update.type === 'success' ? 'bg-green-50 dark:bg-green-950' :
                    update.type === 'info' ? 'bg-blue-50 dark:bg-blue-950' :
                      'bg-orange-50 dark:bg-orange-950'
                  }`}>
                  <div className={`p-1 rounded-full mt-1 ${update.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                      update.type === 'info' ? 'bg-blue-100 dark:bg-blue-900' :
                        'bg-orange-100 dark:bg-orange-900'
                    }`}>
                    {update.type === 'success' ?
                      <CheckCircle className="h-3 w-3 text-green-600" /> :
                      update.type === 'info' ?
                        <FileText className="h-3 w-3 text-blue-600" /> :
                        <AlertCircle className="h-3 w-3 text-orange-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-sm">{update.title}</p>
                    <p className="text-xs text-muted-foreground mb-1">{update.description}</p>
                    <p className="text-xs text-muted-foreground">{update.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  )
}

