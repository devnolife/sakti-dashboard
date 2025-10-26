import { Award, CheckCircle, Clock, AlertCircle, FileText, Calendar } from "lucide-react"
import PageTemplate from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccreditationPage() {
  return (
    <PageTemplate
      title="Akreditasi Program"
      description="Status dan proses akreditasi program studi"
      icon={<Award className="h-6 w-6 text-purple-600" />}
      backHref="/dashboard/dekan/academic"
      badge={{ text: "6/8 Terakreditasi A", variant: "default" }}
    >
      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Akreditasi A</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">6</div>
            <p className="text-xs text-muted-foreground">Program Studi</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Akreditasi B</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2</div>
            <p className="text-xs text-muted-foreground">Program Studi</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dalam Proses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">Re-akreditasi</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <p className="text-xs text-muted-foreground">Standar nasional</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="status">Status Akreditasi</TabsTrigger>
          <TabsTrigger value="process">Proses Berjalan</TabsTrigger>
          <TabsTrigger value="schedule">Jadwal</TabsTrigger>
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Status Akreditasi Program Studi</CardTitle>
              <CardDescription>Status terkini akreditasi seluruh program studi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Teknik Informatika",
                    status: "A",
                    validUntil: "2026-12-15",
                    lastVisit: "2021-11-20",
                    score: 385,
                    statusColor: "bg-green-100 text-green-700"
                  },
                  {
                    name: "Sistem Informasi",
                    status: "A",
                    validUntil: "2027-06-30",
                    lastVisit: "2022-05-15",
                    score: 378,
                    statusColor: "bg-green-100 text-green-700"
                  },
                  {
                    name: "Teknik Elektro",
                    status: "A",
                    validUntil: "2025-08-10",
                    lastVisit: "2020-07-25",
                    score: 372,
                    statusColor: "bg-green-100 text-green-700"
                  },
                  {
                    name: "Teknik Sipil",
                    status: "A",
                    validUntil: "2026-03-20",
                    lastVisit: "2021-02-10",
                    score: 368,
                    statusColor: "bg-green-100 text-green-700"
                  },
                  {
                    name: "Matematika",
                    status: "B",
                    validUntil: "2025-12-15",
                    lastVisit: "2020-11-30",
                    score: 315,
                    statusColor: "bg-blue-100 text-blue-700"
                  },
                  {
                    name: "Fisika",
                    status: "B",
                    validUntil: "2025-09-20",
                    lastVisit: "2020-08-15",
                    score: 308,
                    statusColor: "bg-blue-100 text-blue-700"
                  },
                  {
                    name: "Kimia",
                    status: "Re-akreditasi",
                    validUntil: "2024-01-30",
                    lastVisit: "Dijadwalkan",
                    score: 0,
                    statusColor: "bg-orange-100 text-orange-700"
                  },
                  {
                    name: "Biologi",
                    status: "Re-akreditasi",
                    validUntil: "2024-03-15",
                    lastVisit: "Dijadwalkan",
                    score: 0,
                    statusColor: "bg-orange-100 text-orange-700"
                  }
                ].map((program, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${program.status === 'A' ? 'bg-green-100 dark:bg-green-900' :
                          program.status === 'B' ? 'bg-blue-100 dark:bg-blue-900' :
                            'bg-orange-100 dark:bg-orange-900'
                        }`}>
                        {program.status === 'Re-akreditasi' ?
                          <Clock className="h-4 w-4 text-orange-600" /> :
                          <Award className="h-4 w-4 text-green-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{program.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Valid until: {program.validUntil}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm font-medium">{program.score || 'TBD'}</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Last Visit</p>
                        <p className="text-sm font-medium">{program.lastVisit}</p>
                      </div>
                      <Badge className={program.statusColor}>
                        {program.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Re-akreditasi Berjalan
                </CardTitle>
                <CardDescription>Proses re-akreditasi yang sedang berlangsung</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Program Studi Kimia</h4>
                      <Badge variant="outline">Fase 2</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress Dokumen</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Visitasi dijadwalkan: 15 Januari 2024
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Program Studi Biologi</h4>
                      <Badge variant="outline">Fase 1</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress Dokumen</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Target submisi: 20 Desember 2023
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Action Items
                </CardTitle>
                <CardDescription>Item yang memerlukan perhatian segera</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Lengkapi Dokumen Borang Kimia",
                    description: "9 kriteria masih perlu dilengkapi",
                    priority: "high",
                    deadline: "10 Des 2023"
                  },
                  {
                    title: "Koordinasi Tim Asesor",
                    description: "Konfirmasi jadwal visitasi dengan BAN-PT",
                    priority: "medium",
                    deadline: "15 Des 2023"
                  },
                  {
                    title: "Persiapan Presentasi Biologi",
                    description: "Materi presentasi untuk tim asesor",
                    priority: "medium",
                    deadline: "20 Des 2023"
                  },
                  {
                    title: "Update Data SISTER",
                    description: "Sinkronisasi data dosen dan penelitian",
                    priority: "low",
                    deadline: "30 Des 2023"
                  }
                ].map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg ${item.priority === 'high' ? 'bg-red-50 dark:bg-red-950' :
                      item.priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-950' :
                        'bg-gray-50 dark:bg-gray-950'
                    }`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-1 rounded-full mt-1 ${item.priority === 'high' ? 'bg-red-100 dark:bg-red-900' :
                          item.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900' :
                            'bg-gray-100 dark:bg-gray-900'
                        }`}>
                        <AlertCircle className={`h-3 w-3 ${item.priority === 'high' ? 'text-red-600' :
                            item.priority === 'medium' ? 'text-yellow-600' :
                              'text-gray-600'
                          }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground mb-1">{item.description}</p>
                        <p className="text-xs font-medium">Deadline: {item.deadline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Jadwal Akreditasi 2024
              </CardTitle>
              <CardDescription>Timeline dan milestone akreditasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    date: "15 Jan 2024",
                    event: "Visitasi Program Studi Kimia",
                    type: "visitasi",
                    status: "scheduled"
                  },
                  {
                    date: "20 Jan 2024",
                    event: "Hasil Evaluasi Kimia",
                    type: "result",
                    status: "pending"
                  },
                  {
                    date: "15 Mar 2024",
                    event: "Visitasi Program Studi Biologi",
                    type: "visitasi",
                    status: "scheduled"
                  },
                  {
                    date: "20 Mar 2024",
                    event: "Hasil Evaluasi Biologi",
                    type: "result",
                    status: "pending"
                  },
                  {
                    date: "Aug 2024",
                    event: "Re-akreditasi Teknik Elektro",
                    type: "preparation",
                    status: "upcoming"
                  }
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                    <div className={`p-2 rounded-full ${schedule.type === 'visitasi' ? 'bg-blue-100 dark:bg-blue-900' :
                        schedule.type === 'result' ? 'bg-green-100 dark:bg-green-900' :
                          'bg-orange-100 dark:bg-orange-900'
                      }`}>
                      {schedule.type === 'visitasi' ?
                        <Calendar className="h-4 w-4 text-blue-600" /> :
                        schedule.type === 'result' ?
                          <CheckCircle className="h-4 w-4 text-green-600" /> :
                          <Clock className="h-4 w-4 text-orange-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{schedule.event}</p>
                      <p className="text-sm text-muted-foreground">{schedule.date}</p>
                    </div>
                    <Badge variant={
                      schedule.status === 'scheduled' ? 'default' :
                        schedule.status === 'pending' ? 'secondary' :
                          'outline'
                    }>
                      {schedule.status === 'scheduled' ? 'Scheduled' :
                        schedule.status === 'pending' ? 'Pending' :
                          'Upcoming'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Dokumen Akreditasi
              </CardTitle>
              <CardDescription>Status kelengkapan dokumen per program studi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    program: "Kimia",
                    borang: 85,
                    led: 90,
                    evaluasiDiri: 80,
                    dokumenPendukung: 75,
                    status: "in-progress"
                  },
                  {
                    program: "Biologi",
                    borang: 65,
                    led: 70,
                    evaluasiDiri: 60,
                    dokumenPendukung: 55,
                    status: "preparation"
                  }
                ].map((doc, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Program Studi {doc.program}</h4>
                      <Badge variant={doc.status === 'in-progress' ? 'default' : 'secondary'}>
                        {doc.status === 'in-progress' ? 'In Progress' : 'Preparation'}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Borang Akreditasi</span>
                        <div className="flex items-center gap-2">
                          <Progress value={doc.borang} className="w-20 h-2" />
                          <span className="text-sm font-medium w-8">{doc.borang}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">LED (Laporan Evaluasi Diri)</span>
                        <div className="flex items-center gap-2">
                          <Progress value={doc.led} className="w-20 h-2" />
                          <span className="text-sm font-medium w-8">{doc.led}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Evaluasi Diri</span>
                        <div className="flex items-center gap-2">
                          <Progress value={doc.evaluasiDiri} className="w-20 h-2" />
                          <span className="text-sm font-medium w-8">{doc.evaluasiDiri}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dokumen Pendukung</span>
                        <div className="flex items-center gap-2">
                          <Progress value={doc.dokumenPendukung} className="w-20 h-2" />
                          <span className="text-sm font-medium w-8">{doc.dokumenPendukung}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  )
}

