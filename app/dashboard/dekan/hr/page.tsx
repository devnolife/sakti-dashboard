import { Users, UserPlus, TrendingUp, Award } from "lucide-react"
import { StatusCardsTemplate } from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HRPage() {
  const statusCards = [
    {
      title: "Total SDM",
      value: "156",
      description: "Dosen & Staff aktif",
      trend: "+8 tahun ini",
      icon: <Users className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "Rasio Dosen",
      value: "1:23",
      description: "Dosen per mahasiswa",
      trend: "Target: 1:20",
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Rekrutmen Aktif",
      value: "12",
      description: "Posisi terbuka",
      trend: "8 dosen, 4 staff",
      icon: <UserPlus className="w-5 h-5 text-purple-600" />,
      color: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "Performance Rating",
      value: "4.1/5.0",
      description: "Rata-rata kinerja SDM",
      trend: "+0.2 dari tahun lalu",
      icon: <Award className="w-5 h-5 text-orange-600" />,
      color: "bg-orange-100 dark:bg-orange-900"
    }
  ]

  return (
    <StatusCardsTemplate
      title="Sumber Daya Manusia"
      description="Manajemen dan pengembangan dosen serta staff fakultas"
      icon={<Users className="w-6 h-6 text-blue-600" />}
      cards={statusCards}
    >
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Profile</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Faculty Distribution */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Distribusi SDM per Departemen</CardTitle>
                <CardDescription>Sebaran dosen dan staff berdasarkan departemen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { dept: "Teknik Informatika & SI", faculty: 45, staff: 12, ratio: "1:47" },
                  { dept: "Teknik Elektro & Sipil", faculty: 38, staff: 10, ratio: "1:38" },
                  { dept: "Matematika & Fisika", faculty: 32, staff: 8, ratio: "1:24" },
                  { dept: "Kimia & Biologi", faculty: 28, staff: 6, ratio: "1:19" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.dept}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.faculty} Dosen, {item.staff} Staff
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.ratio}</p>
                      <p className="text-xs text-muted-foreground">Dosen:Mahasiswa</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Qualification Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Kualifikasi Dosen</CardTitle>
                <CardDescription>Distribusi tingkat pendidikan dosen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { level: "S3/Doktor", count: 67, percentage: 47, color: "bg-blue-500" },
                  { level: "S2/Magister", count: 76, percentage: 53, color: "bg-green-500" },
                  { level: "S1/Sarjana", count: 0, percentage: 0, color: "bg-orange-500" }
                ].map((qual, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{qual.level}</span>
                      <span className="text-sm font-semibold">{qual.count} ({qual.percentage}%)</span>
                    </div>
                    <Progress value={qual.percentage} className="h-2" />
                  </div>
                ))}

                <div className="p-3 mt-4 rounded-lg bg-green-50 dark:bg-green-950">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    ✅ 100% dosen bergelar minimal S2 sesuai standar nasional
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Age Distribution */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Distribusi Usia SDM</CardTitle>
                <CardDescription>Piramida usia untuk perencanaan regenerasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { range: "20-30 tahun", count: 23, percentage: 15, type: "Junior" },
                  { range: "31-40 tahun", count: 47, percentage: 30, type: "Associate" },
                  { range: "41-50 tahun", count: 52, percentage: 33, type: "Senior" },
                  { range: "51-60 tahun", count: 28, percentage: 18, type: "Expert" },
                  { range: ">60 tahun", count: 6, percentage: 4, type: "Emeritus" }
                ].map((age, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{age.range}</p>
                      <p className="text-xs text-muted-foreground">{age.type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20">
                        <Progress value={age.percentage} className="h-2" />
                      </div>
                      <span className="w-12 text-sm font-semibold">{age.count}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Ringkasan kinerja SDM tahun ini</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 text-center rounded-lg bg-green-50 dark:bg-green-950">
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <p className="text-xs text-green-700">Kinerja Memuaskan</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-blue-50 dark:bg-blue-950">
                    <div className="text-2xl font-bold text-blue-600">87%</div>
                    <p className="text-xs text-blue-700">Target KPI Tercapai</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-purple-50 dark:bg-purple-950">
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <p className="text-xs text-purple-700">Jam Pengembangan</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-orange-50 dark:bg-orange-950">
                    <div className="text-2xl font-bold text-orange-600">23</div>
                    <p className="text-xs text-orange-700">Sertifikasi Baru</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Teaching Excellence</span>
                    <span className="text-sm font-semibold">4.3/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Research Output</span>
                    <span className="text-sm font-semibold">4.1/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Service Contribution</span>
                    <span className="text-sm font-semibold">3.9/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Faculty & Staff Profiles</CardTitle>
              <CardDescription>Profil lengkap dosen dan staff berdasarkan departemen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold">Faculty Directory</h3>
                <p className="mb-4 text-muted-foreground">
                  Direktori lengkap profil, kualifikasi, dan spesialisasi faculty
                </p>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  View Faculty Directory
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recruitment" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Active Recruitment</CardTitle>
              <CardDescription>Posisi terbuka dan proses rekrutmen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  position: "Dosen Teknik Informatika",
                  level: "Lektor",
                  requirements: "S3 Computer Science, min. 5 tahun pengalaman",
                  applications: 23,
                  status: "interview",
                  deadline: "15 Des 2024"
                },
                {
                  position: "Dosen Sistem Informasi",
                  level: "Asisten Ahli",
                  requirements: "S2 Sistem Informasi, fresh graduate welcome",
                  applications: 18,
                  status: "screening",
                  deadline: "20 Des 2024"
                },
                {
                  position: "Staff Laboratorium",
                  level: "Staff",
                  requirements: "S1 Teknik, pengalaman lab min. 2 tahun",
                  applications: 31,
                  status: "open",
                  deadline: "10 Jan 2025"
                }
              ].map((job, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{job.position}</h4>
                      <p className="text-sm text-muted-foreground">{job.level}</p>
                    </div>
                    <Badge variant={
                      job.status === 'interview' ? 'default' :
                        job.status === 'screening' ? 'secondary' : 'outline'
                    }>
                      {job.status}
                    </Badge>
                  </div>

                  <p className="mb-3 text-sm">{job.requirements}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span>{job.applications} aplikasi</span>
                    <span>Deadline: {job.deadline}</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">View Applications</Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Professional Development Programs</CardTitle>
              <CardDescription>Program pengembangan kapasitas SDM</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  program: "Academic Writing Workshop",
                  participants: 25,
                  duration: "3 days",
                  status: "ongoing",
                  completion: 60
                },
                {
                  program: "Research Methodology Training",
                  participants: 18,
                  duration: "5 days",
                  status: "planned",
                  completion: 0
                },
                {
                  program: "Digital Teaching Skills",
                  participants: 42,
                  duration: "2 weeks",
                  status: "completed",
                  completion: 100
                }
              ].map((prog, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{prog.program}</h4>
                      <p className="text-sm text-muted-foreground">
                        {prog.participants} participants • {prog.duration}
                      </p>
                    </div>
                    <Badge variant={
                      prog.status === 'completed' ? 'default' :
                        prog.status === 'ongoing' ? 'secondary' : 'outline'
                    }>
                      {prog.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{prog.completion}%</span>
                    </div>
                    <Progress value={prog.completion} className="h-2" />
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Manage</Button>
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
