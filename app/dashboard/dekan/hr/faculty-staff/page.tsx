import { Users, Search, Filter, Download, Eye, Edit, UserPlus } from "lucide-react"
import PageTemplate from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FacultyStaffPage() {
  return (
    <PageTemplate
      title="Dosen & Staff"
      description="Direktori lengkap dosen dan staff fakultas"
      icon={<Users className="h-6 w-6 text-blue-600" />}
      backHref="/dashboard/dekan/hr"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      }
    >
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari berdasarkan nama, NIDN, atau departemen..."
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="faculty" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faculty">Dosen (143)</TabsTrigger>
          <TabsTrigger value="staff">Staff (36)</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="faculty" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                name: "Prof. Dr. Ir. Ahmad Wijaya, ST., MT.",
                nidn: "0123456789",
                position: "Profesor",
                department: "Teknik Informatika",
                specialization: "Artificial Intelligence, Machine Learning",
                education: "S3 - Computer Science (MIT, 2010)",
                experience: "15 tahun",
                publications: 45,
                research: "Active",
                teaching: ["Algoritma AI", "Machine Learning", "Deep Learning"],
                status: "active",
                performance: 4.8
              },
              {
                name: "Dr. Siti Nurhaliza, ST., MT.",
                nidn: "0234567890",
                position: "Lektor Kepala",
                department: "Sistem Informasi",
                specialization: "Database Systems, Information Systems",
                education: "S3 - Information Systems (UI, 2015)",
                experience: "12 tahun",
                publications: 32,
                research: "Active",
                teaching: ["Database Design", "System Analysis", "Data Mining"],
                status: "active",
                performance: 4.6
              },
              {
                name: "Dr. Ir. Budi Santoso, ST., MT.",
                nidn: "0345678901",
                position: "Lektor",
                department: "Teknik Elektro",
                specialization: "Power Systems, Renewable Energy",
                education: "S3 - Electrical Engineering (ITB, 2018)",
                experience: "8 tahun",
                publications: 24,
                research: "Active",
                teaching: ["Circuit Analysis", "Power Systems", "Renewable Energy"],
                status: "active",
                performance: 4.4
              },
              {
                name: "Maya Sari, ST., MT.",
                nidn: "0456789012",
                position: "Asisten Ahli",
                department: "Teknik Sipil",
                specialization: "Structural Engineering, Construction Management",
                education: "S2 - Civil Engineering (UGM, 2020)",
                experience: "4 tahun",
                publications: 12,
                research: "Starting",
                teaching: ["Struktur Bangunan", "Manajemen Konstruksi"],
                status: "active",
                performance: 4.2
              }
            ].map((faculty, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{faculty.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          NIDN: {faculty.nidn}
                        </Badge>
                        <Badge className={`text-xs ${faculty.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                          {faculty.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm"><span className="font-medium">Jabatan:</span> {faculty.position}</p>
                          <p className="text-sm"><span className="font-medium">Departemen:</span> {faculty.department}</p>
                          <p className="text-sm"><span className="font-medium">Spesialisasi:</span> {faculty.specialization}</p>
                          <p className="text-sm"><span className="font-medium">Pendidikan:</span> {faculty.education}</p>
                        </div>
                        <div>
                          <p className="text-sm"><span className="font-medium">Pengalaman:</span> {faculty.experience}</p>
                          <p className="text-sm"><span className="font-medium">Publikasi:</span> {faculty.publications} paper</p>
                          <p className="text-sm"><span className="font-medium">Penelitian:</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {faculty.research}
                            </Badge>
                          </p>
                          <p className="text-sm"><span className="font-medium">Performance:</span>
                            <span className="ml-2 font-semibold text-green-600">{faculty.performance}/5.0</span>
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Mata Kuliah yang Diampu:</p>
                        <div className="flex flex-wrap gap-2">
                          {faculty.teaching.map((subject, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm">
                      Performance Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center pt-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                name: "Ahmad Teknisi, A.Md.",
                nip: "198501012010011001",
                position: "Teknisi Laboratorium",
                unit: "Lab Komputer",
                education: "D3 - Teknik Komputer",
                experience: "8 tahun",
                specialization: "Hardware Maintenance, Network Administration",
                status: "active",
                performance: 4.3
              },
              {
                name: "Siti Admin, S.Kom.",
                nip: "199002152015022001",
                position: "Staff Administrasi",
                unit: "Bagian Akademik",
                education: "S1 - Sistem Informasi",
                experience: "5 tahun",
                specialization: "Academic Administration, Student Affairs",
                status: "active",
                performance: 4.5
              },
              {
                name: "Budi Finance, SE.",
                nip: "198703102012011002",
                position: "Staff Keuangan",
                unit: "Bagian Keuangan",
                education: "S1 - Akuntansi",
                experience: "10 tahun",
                specialization: "Financial Management, Budget Planning",
                status: "active",
                performance: 4.7
              }
            ].map((staff, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{staff.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          NIP: {staff.nip}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                          {staff.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm"><span className="font-medium">Posisi:</span> {staff.position}</p>
                          <p className="text-sm"><span className="font-medium">Unit:</span> {staff.unit}</p>
                          <p className="text-sm"><span className="font-medium">Pendidikan:</span> {staff.education}</p>
                        </div>
                        <div>
                          <p className="text-sm"><span className="font-medium">Pengalaman:</span> {staff.experience}</p>
                          <p className="text-sm"><span className="font-medium">Spesialisasi:</span> {staff.specialization}</p>
                          <p className="text-sm"><span className="font-medium">Performance:</span>
                            <span className="ml-2 font-semibold text-green-600">{staff.performance}/5.0</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm">
                      Performance Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Faculty Distribution by Rank</CardTitle>
                <CardDescription>Distribusi dosen berdasarkan jabatan akademik</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { rank: "Profesor", count: 12, percentage: 8.4 },
                  { rank: "Lektor Kepala", count: 28, percentage: 19.6 },
                  { rank: "Lektor", count: 45, percentage: 31.5 },
                  { rank: "Asisten Ahli", count: 58, percentage: 40.5 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{item.rank}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-12">{item.count}</span>
                      <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Staff Distribution by Unit</CardTitle>
                <CardDescription>Distribusi staff berdasarkan unit kerja</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { unit: "Akademik", count: 12 },
                  { unit: "Keuangan", count: 8 },
                  { unit: "Kepegawaian", count: 6 },
                  { unit: "Laboratorium", count: 10 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{item.unit}</span>
                    <span className="text-sm">{item.count}</span>
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

