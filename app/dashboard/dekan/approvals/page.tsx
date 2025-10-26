import { ClipboardCheck, AlertCircle, FileText, DollarSign, CheckCircle, Clock, Users } from "lucide-react"
import { StatusCardsTemplate } from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function ApprovalsPage() {
  const statusCards = [
    {
      title: "Pending Approvals",
      value: "10",
      description: "Memerlukan persetujuan Anda",
      trend: "5 urgent, 3 medium, 2 low",
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      color: "bg-red-100 dark:bg-red-900"
    },
    {
      title: "Approved Today",
      value: "7",
      description: "Dokumen disetujui hari ini",
      trend: "3 surat, 4 kebijakan",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "In Review",
      value: "15",
      description: "Sedang dalam proses review",
      trend: "Rata-rata 2.3 hari",
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "This Month",
      value: "142",
      description: "Total persetujuan bulan ini",
      trend: "+12% dari bulan lalu",
      icon: <ClipboardCheck className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100 dark:bg-purple-900"
    }
  ]

  return (
    <StatusCardsTemplate
      title="Persetujuan & Keputusan"
      description="Pusat persetujuan dokumen dan keputusan strategis"
      icon={<ClipboardCheck className="h-6 w-6 text-blue-600" />}
      cards={statusCards}
    >
      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/dekan/approvals/correspondence">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Persetujuan Surat</CardTitle>
                  <CardDescription>5 dokumen pending</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600">5</p>
                  <p className="text-xs text-muted-foreground">Urgent items</p>
                </div>
                <Badge variant="destructive">
                  Action Needed
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/approvals/academic">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Keputusan Akademik</CardTitle>
                  <CardDescription>3 keputusan pending</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                  <p className="text-xs text-muted-foreground">Medium priority</p>
                </div>
                <Badge variant="secondary">
                  Review
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/approvals/budget">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Persetujuan Anggaran</CardTitle>
                  <CardDescription>2 proposal pending</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">2</p>
                  <p className="text-xs text-muted-foreground">Financial review</p>
                </div>
                <Badge variant="outline">
                  Low Priority
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/approvals/policy">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                  <ClipboardCheck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Keputusan Kebijakan</CardTitle>
                  <CardDescription>Strategic decisions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">0</p>
                  <p className="text-xs text-muted-foreground">All caught up</p>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  Up to Date
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs defaultValue="urgent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="urgent">Urgent (5)</TabsTrigger>
          <TabsTrigger value="medium">Medium (3)</TabsTrigger>
          <TabsTrigger value="recent">Recently Approved</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="urgent" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Persetujuan Urgent
              </CardTitle>
              <CardDescription>Item yang memerlukan persetujuan segera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "SURAT-001",
                  title: "Surat Keputusan Promosi Dosen",
                  description: "Promosi 3 dosen dari Lektor ke Lektor Kepala",
                  type: "correspondence",
                  submittedBy: "Bagian Kepegawaian",
                  deadline: "24 Oct 2023",
                  priority: "urgent"
                },
                {
                  id: "SURAT-002",
                  title: "Persetujuan Kerjasama Industri",
                  description: "MoU dengan PT. Tech Solutions Indonesia",
                  type: "correspondence",
                  submittedBy: "Wakil Dekan IV",
                  deadline: "25 Oct 2023",
                  priority: "urgent"
                },
                {
                  id: "BUDGET-001",
                  title: "Anggaran Tambahan Penelitian",
                  description: "Proposal tambahan dana penelitian Rp 500jt",
                  type: "budget",
                  submittedBy: "Unit Penelitian",
                  deadline: "26 Oct 2023",
                  priority: "urgent"
                },
                {
                  id: "ACADEMIC-001",
                  title: "Perubahan Kurikulum Teknik Informatika",
                  description: "Update kurikulum sesuai kebutuhan industri 4.0",
                  type: "academic",
                  submittedBy: "Prodi Teknik Informatika",
                  deadline: "27 Oct 2023",
                  priority: "urgent"
                },
                {
                  id: "SURAT-003",
                  title: "SK Pembentukan Tim Akreditasi",
                  description: "Pembentukan tim persiapan akreditasi Prodi Kimia",
                  type: "correspondence",
                  submittedBy: "Wakil Dekan I",
                  deadline: "28 Oct 2023",
                  priority: "urgent"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border-2 border-red-200 bg-red-50 dark:bg-red-950">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
                      {item.type === 'correspondence' ?
                        <FileText className="h-4 w-4 text-red-600" /> :
                        item.type === 'budget' ?
                          <DollarSign className="h-4 w-4 text-red-600" /> :
                          <Users className="h-4 w-4 text-red-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-xs text-muted-foreground">ID: {item.id}</p>
                        <p className="text-xs text-muted-foreground">By: {item.submittedBy}</p>
                        <p className="text-xs text-red-600 font-medium">Due: {item.deadline}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Urgent</Badge>
                    <Button size="sm">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Medium Priority Items
              </CardTitle>
              <CardDescription>Item dengan prioritas menengah</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "ACADEMIC-002",
                  title: "Persetujuan Seminar Nasional",
                  description: "Proposal penyelenggaraan seminar teknologi informasi",
                  type: "academic",
                  submittedBy: "Himpunan Mahasiswa",
                  deadline: "5 Nov 2023"
                },
                {
                  id: "BUDGET-002",
                  title: "Renovasi Laboratorium Kimia",
                  description: "Anggaran renovasi lab senilai Rp 200jt",
                  type: "budget",
                  submittedBy: "Prodi Kimia",
                  deadline: "10 Nov 2023"
                },
                {
                  id: "SURAT-004",
                  title: "Persetujuan Cuti Dosen",
                  description: "Permohonan cuti studi lanjut Dr. Ahmad",
                  type: "correspondence",
                  submittedBy: "Bagian Kepegawaian",
                  deadline: "15 Nov 2023"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-950">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
                      {item.type === 'correspondence' ?
                        <FileText className="h-4 w-4 text-orange-600" /> :
                        item.type === 'budget' ?
                          <DollarSign className="h-4 w-4 text-orange-600" /> :
                          <Users className="h-4 w-4 text-orange-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-xs text-muted-foreground">ID: {item.id}</p>
                        <p className="text-xs text-muted-foreground">By: {item.submittedBy}</p>
                        <p className="text-xs text-orange-600 font-medium">Due: {item.deadline}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Medium</Badge>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Recently Approved
              </CardTitle>
              <CardDescription>Dokumen yang baru disetujui dalam 7 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "SURAT-100",
                  title: "SK Pembentukan Komite Kurikulum",
                  approvedDate: "23 Oct 2023",
                  type: "correspondence"
                },
                {
                  id: "BUDGET-050",
                  title: "Anggaran Kegiatan Dies Natalis",
                  approvedDate: "22 Oct 2023",
                  type: "budget"
                },
                {
                  id: "ACADEMIC-020",
                  title: "Persetujuan Ujian Susulan",
                  approvedDate: "21 Oct 2023",
                  type: "academic"
                },
                {
                  id: "SURAT-099",
                  title: "MoU dengan Universitas Partner",
                  approvedDate: "20 Oct 2023",
                  type: "correspondence"
                },
                {
                  id: "BUDGET-049",
                  title: "Dana Penelitian Kolaboratif",
                  approvedDate: "19 Oct 2023",
                  type: "budget"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">ID: {item.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-green-600 font-medium">{item.approvedDate}</p>
                    <Badge className="bg-green-100 text-green-700">Approved</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Approval Statistics</CardTitle>
                <CardDescription>Statistik persetujuan 30 hari terakhir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Approved</span>
                    <span className="text-sm text-green-600 font-semibold">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg. Processing Time</span>
                    <span className="text-sm text-blue-600 font-semibold">2.3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rejection Rate</span>
                    <span className="text-sm text-red-600 font-semibold">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">On-time Approvals</span>
                    <span className="text-sm text-purple-600 font-semibold">94.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Approval Distribution</CardTitle>
                <CardDescription>Distribusi jenis persetujuan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { type: "Correspondence", count: 68, percentage: 48 },
                    { type: "Academic Decisions", count: 42, percentage: 30 },
                    { type: "Budget Approvals", count: 22, percentage: 15 },
                    { type: "Policy Decisions", count: 10, percentage: 7 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.type}</span>
                        <span className="text-sm font-semibold">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </StatusCardsTemplate>
  )
}

