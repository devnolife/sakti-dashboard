import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, Building, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function StaffTuDashboardPage() {
  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Staff TU</h2>
        <p className="mt-2 text-muted-foreground">
          Selamat datang di dashboard Staff TU. Kelola tugas akademik dan administratif.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/staff_tu/kkp">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Aplikasi KKP</CardTitle>
              <CardDescription>Kelola aplikasi KKP mahasiswa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Lihat Aplikasi</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span>Kelola</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <div className="text-xs">
                    <p className="font-medium">Pending</p>
                    <p className="text-muted-foreground">3 aplikasi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  <div className="text-xs">
                    <p className="font-medium">Dalam Tinjauan</p>
                    <p className="text-muted-foreground">2 aplikasi</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Catatan Mahasiswa</CardTitle>
            <CardDescription>Kelola catatan akademik mahasiswa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Lihat Catatan</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <span>Kelola</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Direktori Perusahaan</CardTitle>
            <CardDescription>Kelola perusahaan mitra KKP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <span>Lihat Perusahaan</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <span>Kelola</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Aktivitas Terbaru</TabsTrigger>
          <TabsTrigger value="tasks">Tugas Tertunda</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>
                Tindakan terbaru Anda dan notifikasi sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Aplikasi KKP Disetujui</p>
                    <p className="text-xs text-muted-foreground">
                      Anda menyetujui aplikasi KKP Andi Wijaya untuk Tokopedia
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">2 jam yang lalu</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Aplikasi KKP Baru</p>
                    <p className="text-xs text-muted-foreground">
                      Dian Sastro mengajukan aplikasi KKP baru untuk Perpustakaan Nasional
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">5 jam yang lalu</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <AlertCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Aplikasi Ditetapkan untuk Ditinjau</p>
                    <p className="text-xs text-muted-foreground">
                      Anda menetapkan aplikasi KKP Rini Susanti untuk status tinjauan
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Kemarin</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tugas Tertunda</CardTitle>
              <CardDescription>
                Tugas yang memerlukan perhatian Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-amber-500/10">
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Tinjau Aplikasi KKP</p>
                      <Button variant="ghost" size="sm">Tinjau</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      3 aplikasi menunggu tinjauan
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-amber-500/10">
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Verifikasi Dokumen</p>
                      <Button variant="ghost" size="sm">Verifikasi</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      5 dokumen menunggu verifikasi
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
