import { Bell, Plus, Send, Eye, Edit, Trash2, Users, Calendar } from "lucide-react"
import PageTemplate from "@/components/dekan/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnnouncementsPage() {
  return (
    <PageTemplate
      title="Pengumuman"
      description="Kelola dan publikasikan pengumuman fakultas"
      icon={<Bell className="h-6 w-6 text-orange-600" />}
      backHref="/dashboard/dekan/communication"
      actions={
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Search announcements..." className="w-64" />
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Announcement
          </Button>
        </div>
      }
    >
      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">15</div>
            <p className="text-xs text-muted-foreground">Currently published</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">Being prepared</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">5</div>
            <p className="text-xs text-muted-foreground">Auto-publish later</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">2.3K</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active (15)</TabsTrigger>
          <TabsTrigger value="draft">Draft (3)</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled (5)</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-green-600" />
                Active Announcements
              </CardTitle>
              <CardDescription>Currently published announcements visible to faculty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "ANN-001",
                  title: "Pengumuman Dies Natalis Fakultas Teknik 2023",
                  type: "Event",
                  content: "Fakultas Teknik akan mengadakan Dies Natalis ke-25 pada tanggal 15 November 2023. Seluruh civitas akademika diundang untuk menghadiri acara puncak...",
                  publishedDate: "20 Oct 2023",
                  expiryDate: "15 Nov 2023",
                  audience: "All Faculty",
                  views: 456,
                  priority: "high",
                  status: "published"
                },
                {
                  id: "ANN-002",
                  title: "Jadwal Ujian Tengah Semester Ganjil 2023/2024",
                  type: "Academic",
                  content: "Ujian Tengah Semester untuk semester ganjil 2023/2024 akan dilaksanakan mulai tanggal 30 Oktober - 10 November 2023. Mahasiswa diharap mempersiapkan...",
                  publishedDate: "18 Oct 2023",
                  expiryDate: "10 Nov 2023",
                  audience: "Students & Lecturers",
                  views: 892,
                  priority: "high",
                  status: "published"
                },
                {
                  id: "ANN-003",
                  title: "Workshop Peningkatan Kompetensi Dosen",
                  type: "Event",
                  content: "Mengundang seluruh dosen untuk mengikuti workshop 'Digital Teaching Methods in Higher Education' yang akan dilaksanakan pada 25 Oktober 2023...",
                  publishedDate: "16 Oct 2023",
                  expiryDate: "25 Oct 2023",
                  audience: "Lecturers",
                  views: 234,
                  priority: "medium",
                  status: "published"
                },
                {
                  id: "ANN-004",
                  title: "Pembaruan Sistem Informasi Akademik (SIMAK)",
                  type: "Urgent",
                  content: "Sistem SIMAK akan mengalami pembaruan pada tanggal 28 Oktober 2023 pukul 00:00-06:00 WIB. Selama periode ini, akses ke sistem akan terbatas...",
                  publishedDate: "22 Oct 2023",
                  expiryDate: "29 Oct 2023",
                  audience: "All Faculty",
                  views: 678,
                  priority: "urgent",
                  status: "published"
                },
                {
                  id: "ANN-005",
                  title: "Lomba Karya Tulis Ilmiah Mahasiswa 2023",
                  type: "Event",
                  content: "Fakultas Teknik mengadakan Lomba Karya Tulis Ilmiah untuk mahasiswa dengan tema 'Teknologi Berkelanjutan untuk Indonesia'. Pendaftaran dibuka hingga...",
                  publishedDate: "15 Oct 2023",
                  expiryDate: "30 Nov 2023",
                  audience: "Students",
                  views: 345,
                  priority: "medium",
                  status: "published"
                }
              ].map((announcement, index) => (
                <div key={index} className={`border rounded-lg p-4 ${announcement.priority === 'urgent' ? 'border-red-200 bg-red-50 dark:bg-red-950' :
                    announcement.priority === 'high' ? 'border-orange-200 bg-orange-50 dark:bg-orange-950' :
                      'border-gray-200 bg-gray-50 dark:bg-gray-950'
                  }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-1 rounded-full ${announcement.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900' :
                            announcement.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900' :
                              'bg-gray-100 dark:bg-gray-900'
                          }`}>
                          <Bell className={`h-4 w-4 ${announcement.priority === 'urgent' ? 'text-red-600' :
                              announcement.priority === 'high' ? 'text-orange-600' :
                                'text-gray-600'
                            }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{announcement.title}</h4>
                          <p className="text-sm text-muted-foreground">{announcement.type} • ID: {announcement.id}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{announcement.content}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Published: {announcement.publishedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {announcement.audience}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {announcement.views} views
                        </span>
                        <span>Expires: {announcement.expiryDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant={
                        announcement.priority === 'urgent' ? 'destructive' :
                          announcement.priority === 'high' ? 'default' :
                            'secondary'
                      }>
                        {announcement.priority}
                      </Badge>
                      <Badge className="bg-green-100 text-green-700">
                        Active
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
                      <Send className="w-4 h-4 mr-2" />
                      Resend
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
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
                Draft Announcements
              </CardTitle>
              <CardDescription>Announcements being prepared for publication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "DRAFT-001",
                  title: "Panduan Akademik Semester Genap 2023/2024",
                  type: "Academic",
                  lastEdited: "23 Oct 2023",
                  author: "Bagian Akademik",
                  progress: 75
                },
                {
                  id: "DRAFT-002",
                  title: "Seminar Nasional Teknik dan Teknologi",
                  type: "Event",
                  lastEdited: "22 Oct 2023",
                  author: "Wakil Dekan I",
                  progress: 60
                },
                {
                  id: "DRAFT-003",
                  title: "Kebijakan Baru Penelitian Mahasiswa",
                  type: "Policy",
                  lastEdited: "21 Oct 2023",
                  author: "Unit Penelitian",
                  progress: 40
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
                          <p className="text-sm text-muted-foreground">{draft.type} • ID: {draft.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span>Author: {draft.author}</span>
                        <span>Last edited: {draft.lastEdited}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm">Progress:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
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
                      <Send className="w-4 h-4 mr-2" />
                      Publish
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Scheduled Announcements
              </CardTitle>
              <CardDescription>Announcements scheduled for automatic publication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "SCHED-001",
                  title: "Pengumuman Libur Akhir Tahun 2023",
                  type: "Announcement",
                  scheduledDate: "15 Dec 2023",
                  scheduledTime: "08:00",
                  audience: "All Faculty",
                  status: "scheduled"
                },
                {
                  id: "SCHED-002",
                  title: "Pendaftaran Semester Genap 2023/2024",
                  type: "Academic",
                  scheduledDate: "1 Dec 2023",
                  scheduledTime: "07:00",
                  audience: "Students",
                  status: "scheduled"
                },
                {
                  id: "SCHED-003",
                  title: "Evaluasi Kinerja Dosen Semester Ganjil",
                  type: "Academic",
                  scheduledDate: "20 Nov 2023",
                  scheduledTime: "09:00",
                  audience: "Lecturers",
                  status: "scheduled"
                }
              ].map((scheduled, index) => (
                <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{scheduled.title}</h4>
                          <p className="text-sm text-muted-foreground">{scheduled.type} • ID: {scheduled.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Scheduled: {scheduled.scheduledDate} at {scheduled.scheduledTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {scheduled.audience}
                        </span>
                      </div>
                    </div>

                    <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Schedule
                    </Button>
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Publish Now
                    </Button>
                    <Button size="sm" variant="destructive">
                      Cancel Schedule
                    </Button>
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
                <CardTitle>Announcement Performance</CardTitle>
                <CardDescription>Statistik performa pengumuman 30 hari terakhir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Views</span>
                    <span className="text-sm text-green-600 font-semibold">2,345</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg. Views per Announcement</span>
                    <span className="text-sm text-blue-600 font-semibold">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Engagement Rate</span>
                    <span className="text-sm text-purple-600 font-semibold">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Most Active Audience</span>
                    <span className="text-sm text-orange-600 font-semibold">Students</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Content Categories</CardTitle>
                <CardDescription>Distribusi jenis pengumuman</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { category: "Academic", count: 45, percentage: 40 },
                    { category: "Events", count: 32, percentage: 28 },
                    { category: "Urgent", count: 23, percentage: 20 },
                    { category: "Policy", count: 14, percentage: 12 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.category}</span>
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
    </PageTemplate>
  )
}

