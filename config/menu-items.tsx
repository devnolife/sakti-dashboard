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
  Mail,
  GraduationCapIcon,
  CalendarClock,
  UserCheck,
  Award,
  CreditCard,
  GalleryVerticalEnd,
  Wallet,
  PieChart,
  TrendingDown,
} from "lucide-react"
import type { Role } from "@/types/role"

// Menu items for students (mahasiswa)
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
     
    ],
  },
  {
    id: "payment",
    title: "Pembayaran",
    href: "/dashboard/mahasiswa/payment",
    icon: CreditCard,
    children: [
      {
        id: "payment-dashboard",
        title: "Dashboard",
        href: "/dashboard/mahasiswa/payment",
      },
      {
        id: "payment-history",
        title: "Riwayat Pembayaran",
        href: "/dashboard/mahasiswa/payment/history",
      },
      {
        id: "payment-new",
        title: "Pembayaran Baru",
        href: "/dashboard/mahasiswa/payment/new",
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

// Menu items for staff (staff_tu)
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
    title: "Pelayanan Surat",
    href: "/dashboard/staff_tu/correspondence",
    icon: Mail
  },
  {
    id: "exams",
    title: "Manajemen Ujian",
    href: "/dashboard/staff_tu/exams",
    icon: GraduationCapIcon,
    children: [
      {
        id: "exams-dashboard",
        title: "Dashboard",
        href: "/dashboard/staff_tu/exams",
      },
      {
        id: "exams-schedules",
        title: "Penjadwalan Ujian",
        href: "/dashboard/staff_tu/exams/schedules",
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
    icon: Briefcase
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
    children: [
      {
        id: "exam-approval",
        title: "Persetujuan Ujian",
        href: "/dashboard/prodi/exams/approval",
      },
      {
        id: "exam-requirements",
        title: "Persyaratan Ujian",
        href: "/dashboard/prodi/exams/requirements",
      },
      {
        id: "exam-committees",
        title: "Penguji",
        href: "/dashboard/prodi/exams/committees",
      },
    ],
  },
  {
    id: "correspondence",
    title: "Pelayanan Surat",
    href: "/dashboard/prodi/correspondence",
    icon: Mail
  },
  {
    id: "kkp-locations",
    title: "Manajement KKP",
    href: "/dashboard/prodi/kkp-locations",
    icon: Briefcase
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
    id: "dean-office",
    title: "Dekan",
    href: "/dashboard/dekan/dean-office",
    icon: Crown
  },
  {
    id: "vice-dean-1",
    title: "Wakil Dekan 1",
    href: "/dashboard/dekan/vice-dean-1",
    icon: Users,
  },
  {
    id: "vice-dean-2",
    title: "Wakil Dekan 2",
    href: "/dashboard/dekan/vice-dean-2",
    icon: BarChart,
  },
  {
    id: "vice-dean-3",
    title: "Wakil Dekan 3",
    href: "/dashboard/dekan/vice-dean-3",
    icon: FileText
  },
  {
    id: "vice-dean-4",
    title: "Wakil Dekan 4",
    href: "/dashboard/dekan/vice-dean-4",
    icon: ClipboardList
  },
  {
    id: "faculty-overview",
    title: "Ikhtisar Fakultas",
    href: "/dashboard/dekan/faculty-overview",
    icon: GalleryVerticalEnd,
  },
  {
    id: "department-analytics",
    title: "Analitik Jurusan",
    href: "/dashboard/dekan/department-analytics",
    icon: BarChart,
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
    id: "academic-guidance",
    title: "Bimbingan Akademik",
    href: "/dashboard/lecturer/academic-guidance",
    icon: BookOpen,
  },
  {
    id: "exam-guidance",
    title: "Bimbingan Ujian",
    href: "/dashboard/lecturer/exam-guidance",
    icon: GraduationCapIcon,
  },
  {
    id: "kkp-guidance",
    title: "Bimbingan KKP",
    href: "/dashboard/lecturer/kkp-guidance",
    icon: Briefcase,
  },
  {
    id: "kkp-plus-guidance",
    title: "Bimbingan KKP Plus",
    href: "/dashboard/lecturer/kkp-plus-guidance",
    icon: Award,
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
        title: "Penguji",
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

// Add menu items for laboratory admin
export const laboratoryAdminMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/laboratory_admin",
    icon: LayoutDashboard,
  },
  {
    id: "lab-management",
    title: "Manajemen Lab",
    href: "/dashboard/laboratory_admin/lab-management",
    icon: Briefcase,
    children: [
      {
        id: "lab-inventory",
        title: "Inventaris Lab",
        href: "/dashboard/laboratory_admin/lab-management/inventory",
      },
      {
        id: "lab-schedule",
        title: "Jadwal Lab",
        href: "/dashboard/laboratory_admin/lab-management/schedule",
      },
      {
        id: "lab-maintenance",
        title: "Pemeliharaan Lab",
        href: "/dashboard/laboratory_admin/lab-management/maintenance",
      },
    ],
  },
  {
    id: "lab-registrations",
    title: "Pendaftaran Lab",
    href: "/dashboard/laboratory_admin/registrations",
    icon: ClipboardList,
    badge: { text: "8", variant: "destructive" },
  },
  {
    id: "lab-reports",
    title: "Laporan Lab",
    href: "/dashboard/laboratory_admin/reports",
    icon: FileText,
  },
  {
    id: "lab-assistants",
    title: "Asisten Lab",
    href: "/dashboard/laboratory_admin/assistants",
    icon: Users,
  },
  {
    id: "lab-practicum",
    title: "Praktikum",
    href: "/dashboard/laboratory_admin/practicum",
    icon: BookOpen,
    children: [
      {
        id: "practicum-schedule",
        title: "Jadwal Praktikum",
        href: "/dashboard/laboratory_admin/practicum/schedule",
      },
      {
        id: "practicum-materials",
        title: "Materi Praktikum",
        href: "/dashboard/laboratory_admin/practicum/materials",
      },
      {
        id: "practicum-grades",
        title: "Nilai Praktikum",
        href: "/dashboard/laboratory_admin/practicum/grades",
      },
    ],
  },
 
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/laboratory_admin/settings",
    icon: Settings,
  },
]

// Update the menuItems record to include laboratory_admin
export const menuItems: Record<Role, typeof adminMenuItems> = {
  admin: adminMenuItems,
  dekan: dekanMenuItems,
  lecturer: lecturerMenuItems,
  mahasiswa: mahasiswaMenuItems,
  prodi: prodiMenuItems,
  staff_tu: staffTuMenuItems,
  staff_kkp: staffKkpMenuItems,
  laboratory_admin: laboratoryAdminMenuItems,
}

// Add the Vice Dean 2 menu items to the dekanItems array
export const dekanItems = [
  {
    title: "Dashboard",
    href: "/dashboard/dekan",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Korespondensi",
    href: "/dashboard/dekan/correspondence",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    title: "Ujian",
    href: "/dashboard/dekan/exams",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Wakil Dekan 2",
    href: "/dashboard/dekan/vice-dean-2",
    icon: <Wallet className="w-5 h-5" />,
    submenu: [
      {
        title: "Dashboard",
        href: "/dashboard/dekan/vice-dean-2",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        title: "Manajemen Anggaran",
        href: "/dashboard/dekan/vice-dean-2/budget",
        icon: <PieChart className="w-5 h-5" />,
      },
      {
        title: "Pelacakan Pengeluaran",
        href: "/dashboard/dekan/vice-dean-2/expenses",
        icon: <TrendingDown className="w-5 h-5" />,
      },
      {
        title: "Laporan Keuangan",
        href: "/dashboard/dekan/vice-dean-2/reports",
        icon: <FileText className="w-5 h-5" />,
      },
    ],
  },
]

