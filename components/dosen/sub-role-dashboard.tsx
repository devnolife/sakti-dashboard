"use client"

import { useDosenSubRole } from "@/context/dosen-subrole-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { dosenSubRoleConfigs } from "@/types/role"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ModernDashboard from "./modern-dashboard"
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  BarChart3,
  Settings,
  Award,
  GraduationCap,
  Calculator,
  Handshake,
  ClipboardCheck,
  Layout,
  CreditCard,
  Calendar,
  TrendingUp,
  Briefcase
} from "lucide-react"

const iconMap = {
  "book-open": BookOpen,
  "award": Award,
  "graduation-cap": GraduationCap,
  "calculator": Calculator,
  "users": Users,
  "handshake": Handshake,
  "clipboard-check": ClipboardCheck,
  "layout": Layout,
}

export default function SubRoleDashboard() {
  const { currentSubRole } = useDosenSubRole()
  const router = useRouter()
  const config = dosenSubRoleConfigs[currentSubRole]
  const IconComponent = iconMap[config.icon as keyof typeof iconMap] || BookOpen

  // Remove auto-redirect logic - let user control navigation via switcher

  const getSubRoleDashboardPath = (subRole: string) => {
    switch (subRole) {
      case 'wakil_dekan_1':
        return '/dashboard/dosen/vice-dean-1'
      case 'wakil_dekan_2':
        return '/dashboard/dosen/vice-dean-2'
      case 'wakil_dekan_3':
        return '/dashboard/dosen/vice-dean-3'
      case 'wakil_dekan_4':
        return '/dashboard/dosen/vice-dean-4'
      case 'dekan':
        return '/dashboard/dekan'
      case 'gkm':
        return '/dashboard/gkm'
      case 'prodi':
        return '/dashboard/prodi'
      case 'sekretaris_prodi':
        return '/dashboard/prodi'
      default:
        return null
    }
  }

  const getDashboardContent = () => {
    switch (currentSubRole) {
      case "dosen":
        return {
          title: "Dashboard Dosen",
          subtitle: "Kelola kegiatan pengajaran dan bimbingan",
          cards: [
            {
              title: "Mata Kuliah",
              description: "Kelola mata kuliah yang diampu",
              icon: BookOpen,
              count: "8",
              href: "/dashboard/dosen/courses"
            },
            {
              title: "Mahasiswa Bimbingan",
              description: "Daftar mahasiswa bimbingan",
              icon: Users,
              count: "24",
              href: "/dashboard/dosen/students"
            },
            {
              title: "Bimbingan KKP",
              description: "Proses bimbingan KKP",
              icon: ClipboardList,
              count: "12",
              href: "/dashboard/dosen/kkp-guidance"
            },
            {
              title: "Bimbingan Ujian",
              description: "Jadwal dan hasil ujian",
              icon: BarChart3,
              count: "5",
              href: "/dashboard/dosen/exam-guidance"
            }
          ]
        }
      
      case "dekan":
        return {
          title: "Dashboard Dekan",
          subtitle: "Kelola fakultas dan kebijakan strategis",
          cards: [
            {
              title: "Program Studi",
              description: "Kelola program studi di fakultas",
              icon: Layout,
              count: "6",
              href: "/dashboard/dekan/program-studi"
            },
            {
              title: "Dosen Fakultas",
              description: "Manajemen dosen dan staff",
              icon: Users,
              count: "120",
              href: "/dashboard/dekan/dosen"
            },
            {
              title: "Anggaran Fakultas",
              description: "Kelola anggaran dan keuangan",
              icon: Calculator,
              count: "15M",
              href: "/dashboard/dekan/budget"
            },
            {
              title: "Laporan Kinerja",
              description: "Monitoring kinerja fakultas",
              icon: BarChart3,
              count: "98%",
              href: "/dashboard/dekan/reports"
            }
          ]
        }

      case "wakil_dekan_1":
        return {
          title: "Dashboard Wakil Dekan I",
          subtitle: "Bidang Akademik - Kelola kurikulum dan akademik",
          cards: [
            {
              title: "Monitoring Akademik",
              description: "Pantau kinerja akademik fakultas",
              icon: BarChart3,
              count: "85%",
              href: "/dashboard/dosen/vice-dean-1/academic-monitoring"
            },
            {
              title: "Manajemen Mahasiswa",
              description: "Kelola data dan layanan mahasiswa",
              icon: Users,
              count: "2.4K",
              href: "/dashboard/dosen/vice-dean-1/student-management"
            },
            {
              title: "Penelitian & PKM",
              description: "Program penelitian dan PKM",
              icon: ClipboardList,
              count: "45",
              href: "/dashboard/dosen/vice-dean-1/research-pkm"
            },
            {
              title: "Kemitraan",
              description: "Kerjasama akademik",
              icon: Handshake,
              count: "28",
              href: "/dashboard/dosen/vice-dean-1/partnerships"
            }
          ]
        }

      case "wakil_dekan_2":
        return {
          title: "Dashboard Wakil Dekan II",
          subtitle: "Administrasi Umum, Perencanaan dan Keuangan",
          cards: [
            {
              title: "Anggaran",
              description: "Perencanaan dan alokasi anggaran",
              icon: Calculator,
              count: "25M",
              href: "/dashboard/dosen/vice-dean-2/budget"
            },
            {
              title: "Pengeluaran",
              description: "Kelola pengeluaran fakultas",
              icon: CreditCard,
              count: "18M",
              href: "/dashboard/dosen/vice-dean-2/expenses"
            },
            {
              title: "Laporan Keuangan",
              description: "Monitoring dan pelaporan keuangan",
              icon: BarChart3,
              count: "92%",
              href: "/dashboard/dosen/vice-dean-2/reports"
            }
          ]
        }

      case "wakil_dekan_3":
        return {
          title: "Dashboard Wakil Dekan III",
          subtitle: "Kemahasiswaan dan Alumni",
          cards: [
            {
              title: "Kemahasiswaan",
              description: "Kelola data dan layanan mahasiswa",
              icon: Users,
              count: "2.4K",
              href: "/dashboard/dekan/vice-dean-3/student-affairs"
            },
            {
              title: "Kegiatan Mahasiswa",
              description: "Organisasi dan kegiatan mahasiswa",
              icon: Calendar,
              count: "45",
              href: "/dashboard/dekan/vice-dean-3/activities"
            },
            {
              title: "Beasiswa",
              description: "Program dan distribusi beasiswa",
              icon: Award,
              count: "125",
              href: "/dashboard/dekan/vice-dean-3/scholarships"
            },
            {
              title: "Alumni",
              description: "Manajemen data dan jaringan alumni",
              icon: GraduationCap,
              count: "8.5K",
              href: "/dashboard/dekan/vice-dean-3/alumni"
            }
          ]
        }

      case "wakil_dekan_4":
        return {
          title: "Dashboard Wakil Dekan IV",
          subtitle: "Kerjasama dan Pengembangan",
          cards: [
            {
              title: "Kerjasama",
              description: "Partnership dan kerjasama institusi",
              icon: Handshake,
              count: "32",
              href: "/dashboard/dekan/vice-dean-4/cooperation"
            },
            {
              title: "Pengembangan",
              description: "Program pengembangan institusi",
              icon: TrendingUp,
              count: "95%",
              href: "/dashboard/dekan/vice-dean-4/development"
            },
            {
              title: "Mitra",
              description: "Kelola mitra dan stakeholder",
              icon: Users,
              count: "45",
              href: "/dashboard/dekan/vice-dean-4/partnerships"
            },
            {
              title: "Program Magang",
              description: "Kelola program magang mahasiswa",
              icon: Briefcase,
              count: "180",
              href: "/dashboard/dekan/vice-dean-4/internships"
            }
          ]
        }

      case "gkm":
        return {
          title: "Dashboard Gugus Kendali Mutu",
          subtitle: "Monitoring dan evaluasi kualitas pendidikan",
          cards: [
            {
              title: "Evaluasi Kualitas",
              description: "Monitoring kualitas pembelajaran",
              icon: ClipboardCheck,
              count: "89%",
              href: "/dashboard/gkm/quality-evaluation"
            },
            {
              title: "Survei Kepuasan",
              description: "Survey mahasiswa dan stakeholder",
              icon: BarChart3,
              count: "4.2",
              href: "/dashboard/gkm/surveys"
            },
            {
              title: "Perbaikan Mutu",
              description: "Program perbaikan berkelanjutan",
              icon: Settings,
              count: "18",
              href: "/dashboard/gkm/quality-improvement"
            },
            {
              title: "Laporan Mutu",
              description: "Laporan dan analisis mutu",
              icon: ClipboardList,
              count: "12",
              href: "/dashboard/gkm/reports"
            }
          ]
        }

      case "prodi":
        return {
          title: "Dashboard Program Studi",
          subtitle: "Kelola program studi dan mahasiswa",
          cards: [
            {
              title: "Mahasiswa Prodi",
              description: "Data mahasiswa program studi",
              icon: Users,
              count: "450",
              href: "/dashboard/prodi/students"
            },
            {
              title: "Kurikulum Prodi",
              description: "Pengelolaan kurikulum program",
              icon: BookOpen,
              count: "8",
              href: "/dashboard/prodi/curriculum"
            },
            {
              title: "Dosen Pengajar",
              description: "Manajemen dosen program studi",
              icon: GraduationCap,
              count: "28",
              href: "/dashboard/prodi/dosen"
            },
            {
              title: "Capaian Pembelajaran",
              description: "Monitoring capaian dan hasil",
              icon: BarChart3,
              count: "87%",
              href: "/dashboard/prodi/achievements"
            }
          ]
        }

      default:
        return {
          title: "Dashboard Dosen",
          subtitle: "Pilih sub-role untuk melihat dashboard khusus",
          cards: []
        }
    }
  }

  const content = getDashboardContent()

  // If current sub-role is dosen, show the modern dashboard
  if (currentSubRole === "dosen") {
    return <ModernDashboard />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${config.bgColor}`}>
          <IconComponent className={`h-6 w-6 ${config.color}`} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{content.title}</h1>
          <p className="text-muted-foreground">{content.subtitle}</p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          {config.displayName}
        </Badge>
      </div>

      {content.cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.cards.map((card, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <card.icon className="h-8 w-8 text-primary" />
                  <Badge variant="outline">{card.count}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-2">{card.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={card.href}>Lihat Detail</a>
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      const redirectPath = getSubRoleDashboardPath(currentSubRole)
                      if (redirectPath) {
                        router.push(redirectPath)
                      }
                    }}
                  >
                    Buka Dashboard {config.displayName}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {content.cards.length === 0 && (
        <Card className="p-8 text-center">
          <div className="mb-4">
            <IconComponent className="h-16 w-16 text-muted-foreground mx-auto" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Selamat Datang!</h3>
          <p className="text-muted-foreground">
            Gunakan switcher sub-role di header untuk mengakses dashboard sesuai jabatan Anda.
          </p>
        </Card>
      )}
    </div>
  )
}