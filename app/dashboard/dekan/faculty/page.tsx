import { Building2, Users, TrendingUp, Target, BarChart3, Award } from "lucide-react"
import { StatusCardsTemplate } from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function FacultyManagementPage() {
  const statusCards = [
    {
      title: "Total Program Studi",
      value: "8",
      description: "Distribusi 4 fakultas",
      trend: "Balanced structure",
      icon: <Building2 className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "Total Dosen",
      value: "152",
      description: "45 Profesor, 67 Lektor",
      trend: "+8 dosen baru",
      icon: <Users className="h-5 w-5 text-green-600" />,
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Performance Index",
      value: "4.2/5.0",
      description: "Rata-rata kinerja fakultas",
      trend: "+0.3 dari tahun lalu",
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "Strategic Goals",
      value: "85%",
      description: "Target strategis tercapai",
      trend: "11/13 objectives met",
      icon: <Target className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100 dark:bg-orange-900"
    }
  ]

  return (
    <StatusCardsTemplate
      title="Manajemen Fakultas"
      description="Pengelolaan struktur organisasi dan kinerja fakultas"
      icon={<Building2 className="h-6 w-6 text-blue-600" />}
      cards={statusCards}
    >
      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/dekan/faculty/structure">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Struktur Organisasi</CardTitle>
                  <CardDescription>Hirarki dan pembagian tugas</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Struktur Lengkap</span>
                  <span className="font-medium text-green-600">100%</span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground">8 departemen aktif</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/faculty/departments">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Pengawasan Jurusan</CardTitle>
                  <CardDescription>Monitoring departemen</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Departemen Aktif</span>
                  <span className="font-medium">8/8</span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground">Semua beroperasi normal</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/faculty/planning">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Perencanaan Strategis</CardTitle>
                  <CardDescription>Roadmap dan target</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">85%</p>
                  <p className="text-xs text-muted-foreground">Target tercapai</p>
                </div>
                <Badge className="bg-purple-100 text-purple-700">
                  On Track
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/dekan/faculty/performance">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Monitor Kinerja</CardTitle>
                  <CardDescription>Evaluasi performa fakultas</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">4.2</p>
                  <p className="text-xs text-muted-foreground">Performance Score</p>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  Excellent
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Faculty Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Struktur Fakultas
            </CardTitle>
            <CardDescription>Distribusi program studi dan departemen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { dept: "Teknik Informatika & Sistem Informasi", programs: 2, head: "Dr. Ahmad Fauzi", color: "bg-blue-100 text-blue-700" },
                { dept: "Teknik Elektro & Sipil", programs: 2, head: "Dr. Budi Santoso", color: "bg-green-100 text-green-700" },
                { dept: "Matematika & Fisika", programs: 2, head: "Dr. Siti Nurhaliza", color: "bg-purple-100 text-purple-700" },
                { dept: "Kimia & Biologi", programs: 2, head: "Dr. Joko Widodo", color: "bg-orange-100 text-orange-700" }
              ].map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{dept.dept}</p>
                    <p className="text-xs text-muted-foreground">Kepala: {dept.head}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-sm font-bold">{dept.programs}</p>
                      <p className="text-xs text-muted-foreground">Prodi</p>
                    </div>
                    <Badge className={dept.color}>
                      Active
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Key Performance Metrics
            </CardTitle>
            <CardDescription>Indikator kinerja utama fakultas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Academic Excellence</span>
                <span className="text-sm text-green-600 font-semibold">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Research Output</span>
                <span className="text-sm text-blue-600 font-semibold">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Student Satisfaction</span>
                <span className="text-sm text-purple-600 font-semibold">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Resource Utilization</span>
                <span className="text-sm text-orange-600 font-semibold">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Initiatives */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Inisiatif Strategis 2023-2024
          </CardTitle>
          <CardDescription>Program prioritas pengembangan fakultas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Digital Transformation",
                description: "Digitalisasi proses akademik dan administrasi",
                progress: 75,
                status: "on-track",
                lead: "Tim IT Fakultas"
              },
              {
                title: "Research Excellence Program",
                description: "Peningkatan kualitas dan kuantitas penelitian",
                progress: 68,
                status: "on-track",
                lead: "Wakil Dekan I"
              },
              {
                title: "Industry Partnership",
                description: "Kerjasama strategis dengan industri",
                progress: 90,
                status: "ahead",
                lead: "Wakil Dekan IV"
              },
              {
                title: "Quality Assurance",
                description: "Implementasi sistem jaminan mutu",
                progress: 82,
                status: "on-track",
                lead: "Unit Penjaminan Mutu"
              },
              {
                title: "Faculty Development",
                description: "Program pengembangan SDM dosen",
                progress: 55,
                status: "behind",
                lead: "Bagian Kepegawaian"
              },
              {
                title: "Student Success Program",
                description: "Peningkatan tingkat kelulusan mahasiswa",
                progress: 71,
                status: "on-track",
                lead: "Wakil Dekan III"
              }
            ].map((initiative, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">{initiative.title}</h4>
                  <Badge variant={
                    initiative.status === 'ahead' ? 'default' :
                      initiative.status === 'on-track' ? 'secondary' :
                        'destructive'
                  }>
                    {initiative.status === 'ahead' ? 'Ahead' :
                      initiative.status === 'on-track' ? 'On Track' :
                        'Behind'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{initiative.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{initiative.progress}%</span>
                  </div>
                  <Progress value={initiative.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Lead: {initiative.lead}</p>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </StatusCardsTemplate>
  )
}

