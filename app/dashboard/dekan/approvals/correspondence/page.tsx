import { FileText, AlertCircle, CheckCircle, Clock, Eye, Download, Send } from "lucide-react"
import PageTemplate from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CorrespondenceApprovalPage() {
  return (
    <PageTemplate
      title="Persetujuan Surat"
      description="Review dan persetujuan dokumen korespondensi"
      icon={<FileText className="h-6 w-6 text-red-600" />}
      backHref="/dashboard/dekan/approvals"
      badge={{ text: "5 Urgent", variant: "destructive" }}
      actions={
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sk">SK</SelectItem>
              <SelectItem value="mou">MoU</SelectItem>
              <SelectItem value="surat">Surat</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Search documents..." className="w-64" />
        </div>
      }
    >
      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Urgent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-xs text-muted-foreground">Need immediate action</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Medium Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-xs text-muted-foreground">Review required</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">Can wait</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="urgent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="urgent">Urgent (5)</TabsTrigger>
          <TabsTrigger value="medium">Medium (8)</TabsTrigger>
          <TabsTrigger value="low">Low (3)</TabsTrigger>
          <TabsTrigger value="approved">Recently Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="urgent" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Urgent Correspondence Approvals
              </CardTitle>
              <CardDescription>Documents requiring immediate review and approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "SK-2023-001",
                  title: "SK Promosi Dosen",
                  type: "Surat Keputusan",
                  description: "Promosi 3 dosen dari Lektor ke Lektor Kepala berdasarkan penilaian kinerja",
                  submittedBy: "Bagian Kepegawaian",
                  submittedDate: "22 Oct 2023",
                  deadline: "24 Oct 2023",
                  priority: "urgent",
                  department: "Fakultas",
                  status: "pending"
                },
                {
                  id: "MOU-2023-015",
                  title: "MoU Kerjasama Industri",
                  type: "Memorandum of Understanding",
                  description: "Kerjasama strategis dengan PT. Tech Solutions Indonesia untuk program magang mahasiswa",
                  submittedBy: "Wakil Dekan IV",
                  submittedDate: "22 Oct 2023",
                  deadline: "25 Oct 2023",
                  priority: "urgent",
                  department: "Kerjasama",
                  status: "pending"
                },
                {
                  id: "SK-2023-002",
                  title: "SK Tim Akreditasi",
                  type: "Surat Keputusan",
                  description: "Pembentukan tim persiapan akreditasi Program Studi Kimia dengan asesor internal",
                  submittedBy: "Wakil Dekan I",
                  submittedDate: "23 Oct 2023",
                  deadline: "26 Oct 2023",
                  priority: "urgent",
                  department: "Akademik",
                  status: "pending"
                },
                {
                  id: "SURAT-2023-045",
                  title: "Surat Rekomendasi Penelitian",
                  type: "Surat Rekomendasi",
                  description: "Rekomendasi proposal penelitian hibah nasional senilai Rp 500 juta",
                  submittedBy: "Unit Penelitian",
                  submittedDate: "23 Oct 2023",
                  deadline: "27 Oct 2023",
                  priority: "urgent",
                  department: "Penelitian",
                  status: "pending"
                },
                {
                  id: "SK-2023-003",
                  title: "SK Pengangkatan Staff",
                  type: "Surat Keputusan",
                  description: "Pengangkatan 2 staff administrasi baru untuk mendukung operasional fakultas",
                  submittedBy: "Bagian Kepegawaian",
                  submittedDate: "23 Oct 2023",
                  deadline: "28 Oct 2023",
                  priority: "urgent",
                  department: "SDM",
                  status: "pending"
                }
              ].map((doc, index) => (
                <div key={index} className="border-2 border-red-200 rounded-lg p-4 bg-red-50 dark:bg-red-950">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1 rounded-full bg-red-100 dark:bg-red-900">
                          <FileText className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{doc.title}</h4>
                          <p className="text-sm text-muted-foreground">{doc.type} • ID: {doc.id}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>By: {doc.submittedBy}</span>
                        <span>Dept: {doc.department}</span>
                        <span>Submitted: {doc.submittedDate}</span>
                        <span className="text-red-600 font-medium">Due: {doc.deadline}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant="destructive">Urgent</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="destructive">
                      Reject
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
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
                Medium Priority Documents
              </CardTitle>
              <CardDescription>Documents with medium priority for review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "SURAT-2023-046",
                  title: "Surat Izin Kegiatan Seminar",
                  type: "Surat Izin",
                  description: "Izin penyelenggaraan seminar nasional teknologi informasi",
                  submittedBy: "Himpunan Mahasiswa TI",
                  department: "Kemahasiswaan",
                  deadline: "5 Nov 2023"
                },
                {
                  id: "MOU-2023-016",
                  title: "MoU Pertukaran Mahasiswa",
                  type: "Memorandum of Understanding",
                  description: "Program pertukaran mahasiswa dengan universitas partner di Malaysia",
                  submittedBy: "Bagian Internasional",
                  department: "Kerjasama",
                  deadline: "8 Nov 2023"
                },
                {
                  id: "SK-2023-004",
                  title: "SK Pembentukan Komite",
                  type: "Surat Keputusan",
                  description: "Pembentukan komite evaluasi kurikulum untuk seluruh program studi",
                  submittedBy: "Wakil Dekan I",
                  department: "Akademik",
                  deadline: "10 Nov 2023"
                }
              ].map((doc, index) => (
                <div key={index} className="border border-orange-200 rounded-lg p-4 bg-orange-50 dark:bg-orange-950">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1 rounded-full bg-orange-100 dark:bg-orange-900">
                          <FileText className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{doc.title}</h4>
                          <p className="text-sm text-muted-foreground">{doc.type} • ID: {doc.id}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>By: {doc.submittedBy}</span>
                        <span>Dept: {doc.department}</span>
                        <span className="text-orange-600 font-medium">Due: {doc.deadline}</span>
                      </div>
                    </div>

                    <Badge variant="secondary">Medium</Badge>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Reject
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Low Priority Documents
              </CardTitle>
              <CardDescription>Documents with lower priority that can wait</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "SURAT-2023-047",
                  title: "Surat Keterangan Aktif Dosen",
                  type: "Surat Keterangan",
                  description: "Surat keterangan aktif mengajar untuk Dr. Ahmad sebagai persyaratan grant",
                  submittedBy: "Dr. Ahmad Fauzi",
                  department: "Akademik",
                  deadline: "15 Nov 2023"
                },
                {
                  id: "SURAT-2023-048",
                  title: "Surat Rekomendasi Mahasiswa",
                  type: "Surat Rekomendasi",
                  description: "Rekomendasi mahasiswa berprestasi untuk beasiswa luar negeri",
                  submittedBy: "Bagian Kemahasiswaan",
                  department: "Kemahasiswaan",
                  deadline: "20 Nov 2023"
                }
              ].map((doc, index) => (
                <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{doc.title}</h4>
                          <p className="text-sm text-muted-foreground">{doc.type} • ID: {doc.id}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>By: {doc.submittedBy}</span>
                        <span>Dept: {doc.department}</span>
                        <span className="text-blue-600 font-medium">Due: {doc.deadline}</span>
                      </div>
                    </div>

                    <Badge variant="outline">Low</Badge>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Reject
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Recently Approved Documents
              </CardTitle>
              <CardDescription>Documents approved in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "SK-2023-100",
                  title: "SK Komite Kurikulum",
                  type: "Surat Keputusan",
                  approvedDate: "23 Oct 2023",
                  department: "Akademik",
                  approvedBy: "Dekan"
                },
                {
                  id: "MOU-2023-014",
                  title: "MoU Penelitian Kolaboratif",
                  type: "Memorandum of Understanding",
                  approvedDate: "22 Oct 2023",
                  department: "Penelitian",
                  approvedBy: "Dekan"
                },
                {
                  id: "SURAT-2023-044",
                  title: "Surat Izin Penelitian",
                  type: "Surat Izin",
                  approvedDate: "21 Oct 2023",
                  department: "Penelitian",
                  approvedBy: "Dekan"
                }
              ].map((doc, index) => (
                <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50 dark:bg-green-950">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-green-100 dark:bg-green-900">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground">{doc.type} • ID: {doc.id}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>Dept: {doc.department}</span>
                          <span>Approved by: {doc.approvedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 mb-2">Approved</Badge>
                      <p className="text-sm text-green-600 font-medium">{doc.approvedDate}</p>
                    </div>
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

