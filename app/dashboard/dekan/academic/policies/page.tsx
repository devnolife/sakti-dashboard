import { FileText, Plus, Edit, Eye, CheckCircle, Clock, AlertCircle, Users } from "lucide-react"
import PageTemplate from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AcademicPoliciesPage() {
  return (
    <PageTemplate
      title="Kebijakan Akademik"
      description="Manajemen aturan dan kebijakan akademik fakultas"
      icon={<FileText className="h-6 w-6 text-blue-600" />}
      backHref="/dashboard/dekan/academic"
      badge={{ text: "24 Active Policies", variant: "default" }}
      actions={
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="faculty">Faculty</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Search policies..." className="w-64" />
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Policy
          </Button>
        </div>
      }
    >
      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24</div>
            <p className="text-xs text-muted-foreground">Currently in effect</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Draft Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">Under development</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">5</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Updates This Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <p className="text-xs text-muted-foreground">Policy revisions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Policies (24)</TabsTrigger>
          <TabsTrigger value="draft">Draft (3)</TabsTrigger>
          <TabsTrigger value="review">Pending Review (5)</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Active Academic Policies
              </CardTitle>
              <CardDescription>Kebijakan akademik yang berlaku saat ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "POL-ACD-001",
                  title: "Kebijakan Kurikulum MBKM",
                  category: "Academic",
                  description: "Pedoman implementasi kurikulum Merdeka Belajar - Kampus Merdeka untuk seluruh program studi",
                  effectiveDate: "1 Aug 2023",
                  lastReview: "15 Jul 2023",
                  reviewCycle: "Annual",
                  scope: "All Programs",
                  status: "active",
                  priority: "high",
                  appliesTo: "Students & Faculty"
                },
                {
                  id: "POL-ACD-002",
                  title: "Standar Penilaian Akademik",
                  category: "Academic",
                  description: "Pedoman penilaian mahasiswa termasuk sistem grading, remedial, dan evaluasi kompetensi",
                  effectiveDate: "1 Sep 2023",
                  lastReview: "20 Aug 2023",
                  reviewCycle: "Biannual",
                  scope: "All Programs",
                  status: "active",
                  priority: "high",
                  appliesTo: "Faculty & Students"
                },
                {
                  id: "POL-STD-001",
                  title: "Kebijakan Kehadiran Mahasiswa",
                  category: "Student",
                  description: "Aturan kehadiran minimal, izin, dan sanksi untuk mahasiswa dalam mengikuti perkuliahan",
                  effectiveDate: "15 Aug 2023",
                  lastReview: "1 Aug 2023",
                  reviewCycle: "Annual",
                  scope: "All Students",
                  status: "active",
                  priority: "medium",
                  appliesTo: "Students"
                },
                {
                  id: "POL-FAC-001",
                  title: "Standar Beban Kerja Dosen",
                  category: "Faculty",
                  description: "Pedoman beban kerja mengajar, penelitian, dan pengabdian masyarakat untuk dosen",
                  effectiveDate: "1 Sep 2023",
                  lastReview: "15 Aug 2023",
                  reviewCycle: "Annual",
                  scope: "All Faculty",
                  status: "active",
                  priority: "high",
                  appliesTo: "Faculty"
                },
                {
                  id: "POL-ACD-003",
                  title: "Kebijakan Penelitian Mahasiswa",
                  category: "Academic",
                  description: "Pedoman pelaksanaan penelitian skripsi, tugas akhir, dan penelitian mandiri mahasiswa",
                  effectiveDate: "10 Aug 2023",
                  lastReview: "25 Jul 2023",
                  reviewCycle: "Annual",
                  scope: "Undergraduate & Graduate",
                  status: "active",
                  priority: "medium",
                  appliesTo: "Students & Supervisors"
                },
                {
                  id: "POL-QA-001",
                  title: "Sistem Jaminan Mutu Internal",
                  category: "Quality",
                  description: "Prosedur dan standar jaminan mutu untuk semua aspek pendidikan tinggi",
                  effectiveDate: "1 Sep 2023",
                  lastReview: "10 Aug 2023",
                  reviewCycle: "Annual",
                  scope: "Faculty-wide",
                  status: "active",
                  priority: "high",
                  appliesTo: "All Stakeholders"
                }
              ].map((policy, index) => (
                <div key={index} className={`border rounded-lg p-4 ${policy.priority === 'high' ? 'border-blue-200 bg-blue-50 dark:bg-blue-950' :
                    policy.priority === 'medium' ? 'border-green-200 bg-green-50 dark:bg-green-950' :
                      'border-gray-200 bg-gray-50 dark:bg-gray-950'
                  }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-1 rounded-full ${policy.priority === 'high' ? 'bg-blue-100 dark:bg-blue-900' :
                            policy.priority === 'medium' ? 'bg-green-100 dark:bg-green-900' :
                              'bg-gray-100 dark:bg-gray-900'
                          }`}>
                          <FileText className={`h-4 w-4 ${policy.priority === 'high' ? 'text-blue-600' :
                              policy.priority === 'medium' ? 'text-green-600' :
                                'text-gray-600'
                            }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{policy.title}</h4>
                          <p className="text-sm text-muted-foreground">{policy.category} • ID: {policy.id}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{policy.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Effective Date:</span> {policy.effectiveDate}
                        </div>
                        <div>
                          <span className="font-medium">Last Review:</span> {policy.lastReview}
                        </div>
                        <div>
                          <span className="font-medium">Review Cycle:</span> {policy.reviewCycle}
                        </div>
                        <div>
                          <span className="font-medium">Applies To:</span> {policy.appliesTo}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant={
                        policy.priority === 'high' ? 'default' :
                          policy.priority === 'medium' ? 'secondary' :
                            'outline'
                      }>
                        {policy.priority}
                      </Badge>
                      <Badge className="bg-green-100 text-green-700">
                        {policy.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Stakeholders
                    </Button>
                    <Button size="sm">
                      Review Status
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-orange-600" />
                Draft Policies
              </CardTitle>
              <CardDescription>Kebijakan yang sedang dalam tahap pengembangan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "DRAFT-001",
                  title: "Kebijakan Pembelajaran Hybrid",
                  category: "Academic",
                  description: "Pedoman pelaksanaan pembelajaran campuran online dan offline pasca pandemi",
                  author: "Tim Kurikulum",
                  lastEdited: "20 Oct 2023",
                  progress: 75,
                  targetCompletion: "30 Nov 2023"
                },
                {
                  id: "DRAFT-002",
                  title: "Standar Kompetensi Digital",
                  category: "Academic",
                  description: "Standar kompetensi teknologi digital yang harus dimiliki mahasiswa dan dosen",
                  author: "Wakil Dekan I",
                  lastEdited: "18 Oct 2023",
                  progress: 60,
                  targetCompletion: "15 Dec 2023"
                },
                {
                  id: "DRAFT-003",
                  title: "Kebijakan Sustainability",
                  category: "Environment",
                  description: "Pedoman implementasi prinsip keberlanjutan dalam seluruh aktivitas fakultas",
                  author: "Komite Lingkungan",
                  lastEdited: "15 Oct 2023",
                  progress: 40,
                  targetCompletion: "31 Jan 2024"
                }
              ].map((draft, index) => (
                <div key={index} className="border border-orange-200 rounded-lg p-4 bg-orange-50 dark:bg-orange-950">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1 rounded-full bg-orange-100 dark:bg-orange-900">
                          <Edit className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{draft.title}</h4>
                          <p className="text-sm text-muted-foreground">{draft.category} • ID: {draft.id}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{draft.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span>Author: {draft.author}</span>
                        <span>Last edited: {draft.lastEdited}</span>
                        <span>Target: {draft.targetCompletion}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm">Progress:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all"
                            style={{ width: `${draft.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{draft.progress}%</span>
                      </div>
                    </div>

                    <Badge variant="secondary">Draft</Badge>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Continue Editing
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm">
                      Submit for Review
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete Draft
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Policies Pending Review
              </CardTitle>
              <CardDescription>Kebijakan yang menunggu persetujuan atau review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "REV-001",
                  title: "Update Kebijakan Absensi Dosen",
                  category: "Faculty",
                  description: "Revisi kebijakan kehadiran dosen dengan penambahan fleksibilitas untuk dosen senior",
                  submittedBy: "Bagian Kepegawaian",
                  submittedDate: "15 Oct 2023",
                  reviewDeadline: "30 Oct 2023",
                  reviewer: "Dekan",
                  status: "awaiting-review"
                },
                {
                  id: "REV-002",
                  title: "Kebijakan Penggunaan AI dalam Akademik",
                  category: "Academic",
                  description: "Pedoman penggunaan kecerdasan buatan dalam pembelajaran dan penelitian",
                  submittedBy: "Tim Teknologi Pendidikan",
                  submittedDate: "18 Oct 2023",
                  reviewDeadline: "5 Nov 2023",
                  reviewer: "Wakil Dekan I",
                  status: "under-review"
                },
                {
                  id: "REV-003",
                  title: "Standar Etika Penelitian",
                  category: "Research",
                  description: "Update standar etika penelitian sesuai dengan perkembangan teknologi terkini",
                  submittedBy: "Komite Etik Penelitian",
                  submittedDate: "20 Oct 2023",
                  reviewDeadline: "10 Nov 2023",
                  reviewer: "Wakil Dekan I",
                  status: "awaiting-review"
                }
              ].map((policy, index) => (
                <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{policy.title}</h4>
                          <p className="text-sm text-muted-foreground">{policy.category} • ID: {policy.id}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{policy.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Submitted by:</span> {policy.submittedBy}
                        </div>
                        <div>
                          <span className="font-medium">Submitted:</span> {policy.submittedDate}
                        </div>
                        <div>
                          <span className="font-medium">Reviewer:</span> {policy.reviewer}
                        </div>
                        <div>
                          <span className="font-medium">Deadline:</span> {policy.reviewDeadline}
                        </div>
                      </div>
                    </div>

                    <Badge variant={
                      policy.status === 'under-review' ? 'default' : 'secondary'
                    }>
                      {policy.status === 'under-review' ? 'Under Review' : 'Awaiting Review'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Review
                    </Button>
                    <Button size="sm" variant="outline">
                      Compare Changes
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-gray-600" />
                Archived Policies
              </CardTitle>
              <CardDescription>Kebijakan yang sudah tidak berlaku atau diganti</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "ARC-001",
                  title: "Kebijakan Pembelajaran Online COVID-19",
                  category: "Academic",
                  archivedDate: "1 Aug 2023",
                  replacedBy: "POL-ACD-001",
                  reason: "Replaced by MBKM policy"
                },
                {
                  id: "ARC-002",
                  title: "Standar Penilaian Lama",
                  category: "Academic",
                  archivedDate: "1 Sep 2023",
                  replacedBy: "POL-ACD-002",
                  reason: "Updated grading system"
                },
                {
                  id: "ARC-003",
                  title: "Kebijakan Lab Manual",
                  category: "Facility",
                  archivedDate: "15 Sep 2023",
                  replacedBy: "Digital system",
                  reason: "Digitalization initiative"
                }
              ].map((archived, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50 dark:bg-gray-950">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-900">
                          <AlertCircle className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700">{archived.title}</h4>
                          <p className="text-sm text-muted-foreground">{archived.category} • ID: {archived.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Archived: {archived.archivedDate}</span>
                        <span>Replaced by: {archived.replacedBy}</span>
                        <span>Reason: {archived.reason}</span>
                      </div>
                    </div>

                    <Badge variant="outline">Archived</Badge>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Historical
                    </Button>
                    <Button size="sm" variant="outline">
                      Compare with Current
                    </Button>
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
