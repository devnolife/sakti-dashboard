import { BookOpen, Award, FileText, Users, TrendingUp, CheckCircle } from "lucide-react"
import { StatusCardsTemplate } from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function AcademicManagementPage() {
  const statusCards = [
    {
      title: "Total Program Studi",
      value: "8",
      description: "6 terakreditasi A, 2 dalam proses",
      trend: "+1 program baru",
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "Akreditasi Aktif",
      value: "6/8",
      description: "75% program terakreditasi A",
      trend: "2 dalam review",
      icon: <Award className="h-5 w-5 text-green-600" />,
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Kurikulum Terbaru",
      value: "2023",
      description: "Sesuai MBKM dan industri",
      trend: "100% updated",
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "Dosen Aktif",
      value: "152",
      description: "Rasio 1:15 dengan mahasiswa",
      trend: "+8 dosen baru",
      icon: <Users className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100 dark:bg-orange-900"
    }
  ]

  return (
    <StatusCardsTemplate
      title="Manajemen Akademik"
      description="Pengawasan dan pengelolaan aspek akademik fakultas"
      icon={<BookOpen className="h-6 w-6 text-blue-600" />}
      cards={statusCards}
    >
      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/dekan/academic/curriculum">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Pengawasan Kurikulum</CardTitle>
                  <CardDescription>Review dan monitoring kurikulum</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress Review</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">6/8 prodi selesai</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/academic/quality">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Jaminan Mutu</CardTitle>
                  <CardDescription>Monitoring mutu akademik</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>KPI Tercapai</span>
                  <span className="font-medium text-green-600">92%</span>
                </div>
                <Progress value={92} className="h-2" />
                <p className="text-xs text-muted-foreground">11/12 indikator</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/academic/accreditation">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Akreditasi Program</CardTitle>
                  <CardDescription>Status dan proses akreditasi</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">6</p>
                  <p className="text-xs text-muted-foreground">Terakreditasi A</p>
                </div>
                <Badge className="bg-purple-100 text-purple-700">
                  2 Review
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/academic/policies">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Kebijakan Akademik</CardTitle>
                  <CardDescription>Aturan dan kebijakan fakultas</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">24</p>
                  <p className="text-xs text-muted-foreground">Kebijakan aktif</p>
                </div>
                <Badge variant="outline">
                  3 Draft
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>Update terkini manajemen akademik</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
              <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Review Kurikulum SI</p>
                <p className="text-xs text-muted-foreground">Selesai - 2 jam lalu</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <FileText className="h-4 w-4 text-yellow-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Kebijakan MBKM</p>
                <p className="text-xs text-muted-foreground">Draft - 1 hari lalu</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
              <Award className="h-4 w-4 text-purple-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Persiapan Akreditasi Matematika</p>
                <p className="text-xs text-muted-foreground">Proses - 3 hari lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Program Studi Overview</CardTitle>
            <CardDescription>Status akreditasi dan performa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Teknik Informatika</p>
                  <p className="text-xs text-muted-foreground">1,245 mahasiswa</p>
                </div>
                <Badge className="bg-green-100 text-green-700">Akreditasi A</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sistem Informasi</p>
                  <p className="text-xs text-muted-foreground">890 mahasiswa</p>
                </div>
                <Badge className="bg-green-100 text-green-700">Akreditasi A</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Matematika</p>
                  <p className="text-xs text-muted-foreground">456 mahasiswa</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700">Review</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Fisika</p>
                  <p className="text-xs text-muted-foreground">324 mahasiswa</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700">Proses</Badge>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              Lihat Detail Semua Prodi
            </Button>
          </CardContent>
        </Card>
      </div>
    </StatusCardsTemplate>
  )
}

