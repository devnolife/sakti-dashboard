import { Building2, Users, Crown, Award, Edit, Eye, Plus } from "lucide-react"
import PageTemplate from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FacultyStructurePage() {
  return (
    <PageTemplate
      title="Struktur Organisasi"
      description="Hirarki dan pembagian tugas organisasi fakultas"
      icon={<Building2 className="h-6 w-6 text-blue-600" />}
      backHref="/dashboard/dekan/faculty"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Org Chart
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Update Structure
          </Button>
        </div>
      }
    >
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leadership Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">6</div>
            <p className="text-xs text-muted-foreground">Executive roles</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Program Studi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="text-xs text-muted-foreground">Study programs</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Support Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">5</div>
            <p className="text-xs text-muted-foreground">Administrative units</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leadership" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="support">Support Units</TabsTrigger>
          <TabsTrigger value="orgchart">Org Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="leadership" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-blue-600" />
                Faculty Leadership Structure
              </CardTitle>
              <CardDescription>Struktur kepemimpinan dan tanggung jawab utama</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dekan */}
              <div className="text-center">
                <div className="inline-flex flex-col items-center p-6 rounded-lg bg-blue-50 dark:bg-blue-950 border-2 border-blue-200">
                  <div className="w-16 h-16 mb-3 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg">Prof. Dr. Ir. Ahmad Dekan, ST., MT.</h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">Dekan</p>
                  <p className="text-xs text-muted-foreground text-center max-w-xs">
                    Memimpin dan mengoordinasikan seluruh kegiatan fakultas, menetapkan kebijakan strategis
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">Profile</Button>
                    <Button size="sm">Contact</Button>
                  </div>
                </div>
              </div>

              {/* Vice Deans */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: "Dr. Ir. Ar. Hj. Irnawaty Idrus, ST., MT., IPM., IAI.",
                    position: "Wakil Dekan I",
                    responsibility: "Bidang Akademik",
                    description: "Mengelola urusan akademik, kurikulum, dan jaminan mutu pendidikan",
                    image: "/dekan/Wakil Dekan 1 Dr. Ir. Ar. Hj. Irnawaty Idrus, ST., MT., IPM., IAI..png"
                  },
                  {
                    name: "Dr. Ir. Andi Makbul Syamsuri, ST., MT., IPM.",
                    position: "Wakil Dekan II",
                    responsibility: "Bidang Administrasi & Keuangan",
                    description: "Mengawasi administrasi umum, keuangan, dan perencanaan strategis",
                    image: "/dekan/Wakil Dekan 2 Dr. Ir. Andi Makbul Syamsuri, ST., MT., IPM..png"
                  },
                  {
                    name: "Soemitro Emin Praja, ST., M.Si.",
                    position: "Wakil Dekan III",
                    responsibility: "Bidang Kemahasiswaan",
                    description: "Menangani urusan kemahasiswaan, alumni, dan pengembangan karir",
                    image: "/dekan/Wakil Dekan 3 Soemitro Emin Praja, ST., M.Si..png"
                  },
                  {
                    name: "Dr. Alamsyah, S.Pd.I., M.H.",
                    position: "Wakil Dekan IV",
                    responsibility: "Bidang Kerjasama & Pengembangan",
                    description: "Mengembangkan kerjasama industri dan program pengembangan",
                    image: "/dekan/Wakil Dekan 4 Dr. Alamsyah, S.Pd.I., M.H..png"
                  }
                ].map((viceDekan, index) => (
                  <div key={index} className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200">
                    <div className="text-center">
                      <Avatar className="w-12 h-12 mx-auto mb-3">
                        <AvatarImage src={viceDekan.image} />
                        <AvatarFallback>WD{index + 1}</AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold text-sm mb-1">{viceDekan.name}</h4>
                      <p className="text-xs text-green-600 font-medium mb-1">{viceDekan.position}</p>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">{viceDekan.responsibility}</p>
                      <p className="text-xs text-muted-foreground mb-3">{viceDekan.description}</p>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">Profile</Button>
                        <Button size="sm" className="text-xs px-2 py-1">Contact</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secretary */}
              <div className="flex justify-center">
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 max-w-sm">
                  <div className="text-center">
                    <Avatar className="w-12 h-12 mx-auto mb-3">
                      <AvatarFallback>SK</AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">Dr. Sekretaris Fakultas, ST., MT.</h4>
                    <p className="text-sm text-purple-600 font-medium mb-2">Sekretaris Fakultas</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Membantu dekan dalam administrasi dan koordinasi kegiatan fakultas
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" variant="outline">Profile</Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Departmental Structure
              </CardTitle>
              <CardDescription>Struktur departemen dan program studi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  department: "Departemen Teknik Informatika & Sistem Informasi",
                  head: "Dr. Ahmad Fauzi, ST., MT.",
                  programs: [
                    { name: "Teknik Informatika", head: "Dr. Budi Santoso, ST., MT.", students: 1245, accreditation: "A" },
                    { name: "Sistem Informasi", head: "Dr. Siti Nurhaliza, ST., MT.", students: 890, accreditation: "A" }
                  ],
                  color: "blue"
                },
                {
                  department: "Departemen Teknik Elektro & Sipil",
                  head: "Dr. Ir. Joko Widodo, ST., MT.",
                  programs: [
                    { name: "Teknik Elektro", head: "Dr. Andi Sutopo, ST., MT.", students: 756, accreditation: "A" },
                    { name: "Teknik Sipil", head: "Dr. Ir. Maya Sari, ST., MT.", students: 698, accreditation: "A" }
                  ],
                  color: "green"
                },
                {
                  department: "Departemen Matematika & Fisika",
                  head: "Dr. Rahman Ali, S.Si., M.Si.",
                  programs: [
                    { name: "Matematika", head: "Dr. Lisa Permata, S.Si., M.Si.", students: 456, accreditation: "B" },
                    { name: "Fisika", head: "Dr. Ir. Tono Suratno, S.Si., M.Si.", students: 324, accreditation: "B" }
                  ],
                  color: "purple"
                },
                {
                  department: "Departemen Kimia & Biologi",
                  head: "Dr. Ir. Dewi Lestari, S.Si., M.Si.",
                  programs: [
                    { name: "Kimia", head: "Dr. Agus Setiawan, S.Si., M.Si.", students: 278, accreditation: "B" },
                    { name: "Biologi", head: "Dr. Nina Kartika, S.Si., M.Si.", students: 245, accreditation: "B" }
                  ],
                  color: "orange"
                }
              ].map((dept, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{dept.department}</h3>
                      <p className="text-sm text-muted-foreground">Kepala Departemen: {dept.head}</p>
                    </div>
                    <Badge className={`bg-${dept.color}-100 text-${dept.color}-700`}>
                      {dept.programs.length} Programs
                    </Badge>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {dept.programs.map((program, idx) => (
                      <div key={idx} className={`p-3 rounded-lg bg-${dept.color}-50 dark:bg-${dept.color}-950 border border-${dept.color}-200`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{program.name}</h4>
                          <Badge className={`bg-${program.accreditation === 'A' ? 'green' : 'blue'}-100 text-${program.accreditation === 'A' ? 'green' : 'blue'}-700`}>
                            Akreditasi {program.accreditation}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Kaprodi: {program.head}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span>Mahasiswa: {program.students}</span>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1">Details</Button>
                            <Button size="sm" className="text-xs px-2 py-1">Manage</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-purple-600" />
                Support Units & Administrative Structure
              </CardTitle>
              <CardDescription>Unit pendukung dan struktur administrasi fakultas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    unit: "Bagian Akademik",
                    head: "Ahmad Kasubag, S.Kom.",
                    staff: 8,
                    responsibilities: ["Administrasi akademik", "Jadwal perkuliahan", "Ujian dan nilai", "Wisuda"],
                    color: "blue"
                  },
                  {
                    unit: "Bagian Keuangan",
                    head: "Siti Bendahara, SE.",
                    staff: 6,
                    responsibilities: ["Pengelolaan anggaran", "Pembayaran", "Laporan keuangan", "Audit internal"],
                    color: "green"
                  },
                  {
                    unit: "Bagian Kepegawaian",
                    head: "Budi Staffing, S.Sos.",
                    staff: 5,
                    responsibilities: ["SDM dosen", "SDM tendik", "Pengembangan karir", "Administrasi kepegawaian"],
                    color: "purple"
                  },
                  {
                    unit: "Unit Penelitian & PKM",
                    head: "Dr. Research Head, ST., MT.",
                    staff: 4,
                    responsibilities: ["Administrasi penelitian", "Proposal grant", "Publikasi", "PKM mahasiswa"],
                    color: "orange"
                  },
                  {
                    unit: "Unit Teknologi Informasi",
                    head: "IT Manager, S.Kom.",
                    staff: 6,
                    responsibilities: ["Sistem informasi", "Infrastruktur IT", "Support teknis", "Keamanan data"],
                    color: "red"
                  },
                  {
                    unit: "Unit Jaminan Mutu",
                    head: "QA Coordinator, M.Pd.",
                    staff: 3,
                    responsibilities: ["Audit mutu internal", "Akreditasi", "Evaluasi kinerja", "Perbaikan berkelanjutan"],
                    color: "indigo"
                  }
                ].map((unit, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{unit.unit}</h4>
                        <p className="text-sm text-muted-foreground">Head: {unit.head}</p>
                      </div>
                      <Badge variant="outline">
                        {unit.staff} Staff
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Key Responsibilities:</p>
                      <ul className="space-y-1">
                        {unit.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start">
                            <span className="w-1 h-1 bg-current rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        Team
                      </Button>
                      <Button size="sm" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orgchart" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Organizational Chart
              </CardTitle>
              <CardDescription>Bagan organisasi lengkap fakultas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Org Chart</h3>
                <p className="text-muted-foreground mb-4">
                  Bagan organisasi interaktif akan ditampilkan di sini dengan struktur hierarki lengkap
                </p>
                <div className="flex justify-center gap-2">
                  <Button>
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Chart
                  </Button>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Position
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  )
}
