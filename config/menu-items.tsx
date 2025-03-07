import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart,
  FileText,
  ClipboardCheck,
  Calendar,
  Briefcase,
  Settings,
  Library,
  ClipboardList,
  Crown,
  Bell,
  Building,
  Mail,
  GraduationCapIcon,
  CalendarClock,
  UserCheck,
  Award,
} from "lucide-react"
import type { Role } from "@/types/role"

export const mahasiswaMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/mahasiswa",
    icon: LayoutDashboard,
  },
  {
    id: "courses",
    title: "Mata Kuliah",
    href: "/dashboard/mahasiswa/courses",
    icon: BookOpen,
  },
  {
    id: "grades",
    title: "Nilai",
    href: "/dashboard/mahasiswa/grades",
    icon: FileText,
  },
  {
    id: "academic",
    title: "Akademik",
    href: "/dashboard/mahasiswa/academic",
    icon: Award,
    children: [
      {
        id: "academic-overview",
        title: "Ikhtisar Akademik",
        href: "/dashboard/mahasiswa/academic",
      },
      {
        id: "control-card",
        title: "Kartu Kontrol",
        href: "/dashboard/mahasiswa/academic/control-card",
      },
    ],
  },
  {
    id: "schedule",
    title: "Jadwal",
    href: "/dashboard/mahasiswa/schedule",
    icon: Calendar,
  },
  {
    id: "library",
    title: "Perpustakaan",
    href: "/dashboard/mahasiswa/library",
    icon: Library,
    children: [
      {
        id: "library-books",
        title: "Katalog Buku",
        href: "/dashboard/mahasiswa/library",
      },
      {
        id: "thesis-titles",
        title: "Judul Skripsi",
        href: "/dashboard/mahasiswa/library/thesis-titles",
      },
      {
        id: "title-submission",
        title: "Pengajuan Judul",
        href: "/dashboard/mahasiswa/library/title-submission",
      },
    ],
  },
  {
    id: "laboratory",
    title: "Laboratorium",
    href: "/dashboard/mahasiswa/laboratory",
    icon: Briefcase,
  },
  {
    id: "correspondence",
    title: "Layanan Surat",
    href: "/dashboard/mahasiswa/correspondence",
    icon: Mail,
  },
  {
    id: "exams",
    title: "Ujian",
    href: "/dashboard/mahasiswa/exams",
    icon: GraduationCapIcon,
    children: [
      {
        id: "exams-dashboard",
        title: "Dashboard",
        href: "/dashboard/mahasiswa/exams",
      },
      {
        id: "exams-register",
        title: "Daftar Ujian",
        href: "/dashboard/mahasiswa/exams/register",
      },
      {
        id: "exams-submissions",
        title: "Pengajuan Saya",
        href: "/dashboard/mahasiswa/exams/submissions",
      },
    ],
  },
  {
    id: "kkp",
    title: "KKP",
    href: "/dashboard/mahasiswa/kkp",
    icon: Briefcase,
    children: [
      {
        id: "kkp-dashboard",
        title: "Dashboard",
        href: "/dashboard/mahasiswa/kkp",
      },
      {
        id: "kkp-in-progress",
        title: "In KKP",
        href: "/dashboard/mahasiswa/kkp/in-progress",
      },
      {
        id: "kkp-finished",
        title: "Finish KKP",
        href: "/dashboard/mahasiswa/kkp/finished",
      },
      {
        id: "kkp-requirements",
        title: "Persyaratan",
        href: "/dashboard/mahasiswa/kkp/requirements",
      },
    ],
  },
  {
    id: "kkp-plus",
    title: "KKP Plus",
    href: "/dashboard/mahasiswa/kkp/plus",
    icon: Award,
    children: [
      {
        id: "kkp-plus-overview",
        title: "Overview",
        href: "/dashboard/mahasiswa/kkp/plus",
      },
      {
        id: "kkp-plus-workshops",
        title: "Workshop",
        href: "/dashboard/mahasiswa/kkp/plus/workshops",
      },
      {
        id: "kkp-plus-certifications",
        title: "Sertifikasi",
        href: "/dashboard/mahasiswa/kkp/plus/certifications",
      },
      {
        id: "kkp-plus-resources",
        title: "Sumber Daya",
        href: "/dashboard/mahasiswa/kkp/plus/resources",
      },
    ],
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/mahasiswa/settings",
    icon: Settings,
  },
]

export const staffTuMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/staff_tu",
    icon: LayoutDashboard,
  },
  {
    id: "student-records",
    title: "Data Mahasiswa",
    href: "/dashboard/staff_tu/student-records",
    icon: Users,
  },
  {
    id: "documents",
    title: "Manajemen Dokumen",
    href: "/dashboard/staff_tu/document-management",
    icon: FileText,
    children: [
      {
        id: "document-templates",
        title: "Template Dokumen",
        href: "/dashboard/staff_tu/document-management/templates",
      },
      {
        id: "document-archive",
        title: "Arsip Dokumen",
        href: "/dashboard/staff_tu/document-management/archive",
      },
    ],
  },
  {
    id: "correspondence",
    title: "Layanan Surat",
    href: "/dashboard/staff_tu/correspondence",
    icon: Mail,
    badge: { text: "5", variant: "destructive" },
  },
  {
    id: "exams",
    title: "Manajemen Ujian",
    href: "/dashboard/staff_tu/exams",
    icon: GraduationCapIcon,
    badge: { text: "10", variant: "destructive" },
    children: [
      {
        id: "exam-dashboard",
        title: "Dashboard Ujian",
        href: "/dashboard/staff_tu/exams",
      },
      {
        id: "exam-schedules",
        title: "Jadwal Ujian",
        href: "/dashboard/staff_tu/exams/schedules",
        icon: CalendarClock,
      },
      {
        id: "proposal-exams",
        title: "Ujian Proposal",
        href: "/dashboard/staff_tu/exams/proposal",
        icon: ClipboardCheck,
      },
      {
        id: "result-exams",
        title: "Ujian Hasil",
        href: "/dashboard/staff_tu/exams/result",
        icon: Award,
      },
      {
        id: "closed-exams",
        title: "Ujian Tertutup",
        href: "/dashboard/staff_tu/exams/closed",
        icon: UserCheck,
      },
      {
        id: "exam-committees",
        title: "Komite Penguji",
        href: "/dashboard/staff_tu/exams/committees",
        icon: Users,
      },
    ],
  },
  {
    id: "schedule-management",
    title: "Jadwal Akademik",
    href: "/dashboard/staff_tu/schedule-management",
    icon: Calendar,
  },
  {
    id: "kkp-management",
    title: "Manajemen KKP",
    href: "/dashboard/staff_tu/kkp",
    icon: Briefcase,
    badge: { text: "12", variant: "destructive" },
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/staff_tu/settings",
    icon: Settings,
  },
]

// Menu items for head of study program (prodi)
export const prodiMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/prodi",
    icon: LayoutDashboard,
  },
  {
    id: "curriculum",
    title: "Kurikulum",
    href: "/dashboard/prodi/curriculum",
    icon: BookOpen,
    children: [
      {
        id: "curriculum-design",
        title: "Desain Kurikulum",
        href: "/dashboard/prodi/curriculum/design",
      },
      {
        id: "curriculum-review",
        title: "Review Kurikulum",
        href: "/dashboard/prodi/curriculum/review",
      },
    ],
  },
  {
    id: "student-progress",
    title: "Kemajuan Mahasiswa",
    href: "/dashboard/prodi/student-progress",
    icon: GraduationCapIcon,
  },
  {
    id: "exams",
    title: "Manajemen Ujian",
    href: "/dashboard/prodi/exams",
    icon: GraduationCapIcon,
    badge: { text: "8", variant: "destructive" },
    children: [
      {
        id: "exam-approval",
        title: "Persetujuan Ujian",
        href: "/dashboard/prodi/exams/approval",
      },
      {
        id: "exam-committees",
        title: "Komite Penguji",
        href: "/dashboard/prodi/exams/committees",
      },
    ],
  },
  {
    id: "correspondence",
    title: "Layanan Surat",
    href: "/dashboard/prodi/correspondence",
    icon: Mail,
    badge: { text: "3", variant: "destructive" },
  },
  {
    id: "internship-approval",
    title: "Persetujuan Magang",
    href: "/dashboard/prodi/internship-approval",
    icon: ClipboardCheck,
    badge: { text: "8", variant: "destructive" },
  },
  {
    id: "kkp-management",
    title: "Manajemen KKP",
    href: "/dashboard/prodi/kkp",
    icon: Briefcase,
    badge: { text: "12", variant: "destructive" },
  },
  {
    id: "kkp-locations",
    title: "Lokasi KKP",
    href: "/dashboard/prodi/kkp-locations",
    icon: Building,
    badge: { text: "5", variant: "destructive" },
  },
  {
    id: "faculty-directory",
    title: "Direktori Fakultas",
    href: "/dashboard/prodi/faculty-directory",
    icon: Users,
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/prodi/settings",
    icon: Settings,
  },
]

// Menu items for dean (dekan)
export const dekanMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/dekan",
    icon: LayoutDashboard,
  },
  {
    id: "faculty-overview",
    title: "Ikhtisar Fakultas",
    href: "/dashboard/dekan/faculty-overview",
    icon: Crown,
  },
  {
    id: "department-analytics",
    title: "Analitik Jurusan",
    href: "/dashboard/dekan/department-analytics",
    icon: BarChart,
  },
  {
    id: "faculty-management",
    title: "Manajemen Fakultas",
    href: "/dashboard/dekan/faculty-management",
    icon: Users,
    children: [
      {
        id: "faculty-appointments",
        title: "Penunjukan Fakultas",
        href: "/dashboard/dekan/faculty-management/appointments",
      },
      {
        id: "faculty-performance",
        title: "Kinerja Fakultas",
        href: "/dashboard/dekan/faculty-management/performance",
      },
    ],
  },
  {
    id: "exams",
    title: "Ujian Akademik",
    href: "/dashboard/dekan/exams",
    icon: GraduationCapIcon,
    children: [
      {
        id: "exam-overview",
        title: "Ikhtisar Ujian",
        href: "/dashboard/dekan/exams/overview",
      },
      {
        id: "exam-approvals",
        title: "Persetujuan Ujian",
        href: "/dashboard/dekan/exams/approvals",
        badge: { text: "5", variant: "destructive" },
      },
    ],
  },
  {
    id: "budget-management",
    title: "Manajemen Anggaran",
    href: "/dashboard/dekan/budget-management",
    icon: BarChart,
  },
  {
    id: "strategic-planning",
    title: "Perencanaan Strategis",
    href: "/dashboard/dekan/strategic-planning",
    icon: ClipboardList,
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/dekan/settings",
    icon: Settings,
  },
]

// Menu items for KKP staff
export const staffKkpMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/staff_kkp",
    icon: LayoutDashboard,
  },
  {
    id: "kkp-applications",
    title: "Aplikasi KKP",
    href: "/dashboard/staff_kkp/applications",
    icon: FileText,
    badge: { text: "15", variant: "destructive" },
  },
  {
    id: "kkp-locations",
    title: "Lokasi KKP",
    href: "/dashboard/staff_kkp/locations",
    icon: Briefcase,
  },
  {
    id: "kkp-supervisors",
    title: "Supervisor KKP",
    href: "/dashboard/staff_kkp/supervisors",
    icon: Users,
  },
  {
    id: "kkp-reports",
    title: "Laporan KKP",
    href: "/dashboard/staff_kkp/reports",
    icon: ClipboardList,
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/staff_kkp/settings",
    icon: Settings,
  },
]

// Menu items for admin
export const adminMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    id: "user-management",
    title: "Manajemen Pengguna",
    href: "/dashboard/admin/user-management",
    icon: Users,
  },
  {
    id: "kkp-requests",
    title: "KKP Requests",
    href: "/dashboard/admin/kkp-requests",
    icon: Briefcase,
    badge: { text: "12", variant: "destructive" },
  },
  {
    id: "system-settings",
    title: "Pengaturan Sistem",
    href: "/dashboard/admin/system-settings",
    icon: Settings,
  },
  {
    id: "logs",
    title: "Log Sistem",
    href: "/dashboard/admin/logs",
    icon: FileText,
  },
]

// Menu items for lecturer
export const lecturerMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/lecturer",
    icon: LayoutDashboard,
  },
  {
    id: "kkp-supervision",
    title: "KKP Supervision",
    href: "/dashboard/lecturer/kkp",
    icon: BookOpen,
  },
  {
    id: "supervisions",
    title: "Supervisions",
    href: "/dashboard/lecturer/supervisions",
    icon: ClipboardCheck,
  },
  {
    id: "exams",
    title: "Ujian",
    href: "/dashboard/lecturer/exams",
    icon: GraduationCapIcon,
    badge: { text: "7", variant: "destructive" },
    children: [
      {
        id: "exam-schedule",
        title: "Jadwal Ujian",
        href: "/dashboard/lecturer/exams/schedule",
      },
      {
        id: "exam-committees",
        title: "Komite Penguji",
        href: "/dashboard/lecturer/exams/committees",
        badge: { text: "7", variant: "destructive" },
      },
      {
        id: "exam-grading",
        title: "Penilaian Ujian",
        href: "/dashboard/lecturer/exams/grading",
      },
    ],
  },
  {
    id: "schedule",
    title: "Schedule",
    href: "/dashboard/lecturer/schedule",
    icon: Calendar,
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/lecturer/settings",
    icon: Settings,
  },
]

// Consolidated menu items
export const menuItems: Record<Role, typeof adminMenuItems> = {
  admin: adminMenuItems,
  dekan: dekanMenuItems,
  lecturer: lecturerMenuItems,
  mahasiswa: mahasiswaMenuItems,
  prodi: prodiMenuItems,
  staff_tu: staffTuMenuItems,
  staff_kkp: staffKkpMenuItems,
  kepala_jurusan: []
}

