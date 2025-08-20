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
  FileSpreadsheet,
  BookMarked,
  ScrollText,
  PanelsTopLeft,

} from "lucide-react"
import type { Role } from "@/types/role"

// Type definitions for menu items
interface MenuBadge {
  text: string
  variant: "default" | "secondary" | "destructive" | "outline"
}

interface BaseMenuItem {
  id: string
  title: string
  href: string
  icon: React.ComponentType<any>
  badge?: MenuBadge
}

interface MenuItemWithChildren extends BaseMenuItem {
  children: MenuItem[]
}

interface MenuItemWithoutChildren extends BaseMenuItem {
  children?: never
}

export type MenuItem = MenuItemWithChildren | MenuItemWithoutChildren

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
    title: "Ruang Baca",
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
    id: "aik-komfren",
    title: "Ujian Komfren AIK",
    href: "/dashboard/mahasiswa/aik-komfren",
    icon: BookMarked,
    children: [
      {
        id: "aik-komfren-dashboard",
        title: "Dashboard",
        href: "/dashboard/mahasiswa/aik-komfren",
      },
      {
        id: "aik-komfren-registration",
        title: "Registration & Payment",
        href: "/dashboard/mahasiswa/aik-komfren/registration",
      },
      {
        id: "aik-komfren-schedule",
        title: "Schedule & Examiner",
        href: "/dashboard/mahasiswa/aik-komfren/schedule",
      },
      {
        id: "aik-komfren-completion",
        title: "Exam Completion",
        href: "/dashboard/mahasiswa/aik-komfren/completion",
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
    id: "aik-komfren",
    title: "Ujian Komfren AIK",
    href: "/dashboard/staff_tu/aik-komfren",
    icon: BookMarked,
    children: [
      {
        id: "aik-komfren-dashboard",
        title: "Dashboard",
        href: "/dashboard/staff_tu/aik-komfren",
      },
      {
        id: "aik-komfren-registration",
        title: "Registration",
        href: "/dashboard/staff_tu/aik-komfren/registration",
        badge: { text: "12", variant: "destructive" },
      },
      {
        id: "aik-komfren-examination",
        title: "Examination",
        href: "/dashboard/staff_tu/aik-komfren/examination",
      },
      {
        id: "aik-komfren-completion",
        title: "Completion",
        href: "/dashboard/staff_tu/aik-komfren/completion",
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
export const readingRoomAdminMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/reading_room_admin",
    icon: LayoutDashboard,
  },
  {
    id: "book-management",
    title: "Manajemen Buku",
    href: "/dashboard/reading_room_admin/books",
    icon: BookOpen,
    children: [
      {
        id: "book-list",
        title: "Daftar Buku",
        href: "/dashboard/reading_room_admin/books/list",
      },
      {
        id: "add-book",
        title: "Tambah Buku",
        href: "/dashboard/reading_room_admin/books/add",
      },
      {
        id: "book-categories",
        title: "Kategori Buku",
        href: "/dashboard/reading_room_admin/books/categories",
      },
    ],
  },
  {
    id: "borrowing",
    title: "Peminjaman",
    href: "/dashboard/reading_room_admin/borrowing",
    icon: BookMarked,
    children: [
      {
        id: "active-borrowing",
        title: "Peminjaman Aktif",
        href: "/dashboard/reading_room_admin/borrowing/active",
        badge: { text: "12", variant: "destructive" },
      },
      {
        id: "new-borrowing",
        title: "Peminjaman Baru",
        href: "/dashboard/reading_room_admin/borrowing/new",
      },
      {
        id: "return-books",
        title: "Pengembalian Buku",
        href: "/dashboard/reading_room_admin/borrowing/returns",
      },
      {
        id: "borrowing-history",
        title: "Riwayat Peminjaman",
        href: "/dashboard/reading_room_admin/borrowing/history",
      },
    ],
  },
  {
    id: "thesis",
    title: "Skripsi",
    href: "/dashboard/reading_room_admin/thesis",
    icon: ScrollText,
    children: [
      {
        id: "thesis-titles",
        title: "Judul Skripsi",
        href: "/dashboard/reading_room_admin/thesis/titles",
      },
      {
        id: "title-submissions",
        title: "Pengajuan Judul",
        href: "/dashboard/reading_room_admin/thesis/submissions",
        badge: { text: "8", variant: "destructive" },
      },
      {
        id: "thesis-archive",
        title: "Arsip Skripsi",
        href: "/dashboard/reading_room_admin/thesis/archive",
      },
    ],
  },
  {
    id: "reports",
    title: "Laporan",
    href: "/dashboard/reading_room_admin/reports",
    icon: FileText,
    children: [
      {
        id: "borrowing-reports",
        title: "Laporan Peminjaman",
        href: "/dashboard/reading_room_admin/reports/borrowing",
      },
      {
        id: "popular-books",
        title: "Buku Populer",
        href: "/dashboard/reading_room_admin/reports/popular",
      },
      {
        id: "overdue-reports",
        title: "Laporan Keterlambatan",
        href: "/dashboard/reading_room_admin/reports/overdue",
        badge: { text: "5", variant: "destructive" },
      },
    ],
  },
  {
    id: "users",
    title: "Pengguna",
    href: "/dashboard/reading_room_admin/users",
    icon: Users,
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/reading_room_admin/settings",
    icon: Settings,
  },
]

// Menu items for KKP staff
export const adminUmumMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/admin_umum",
    icon: LayoutDashboard,
  },
  {
    id: "non-regular-students",
    title: "Non Regular",
    href: "/dashboard/admin_umum/non-regular-students",
    icon: Users,
    children: [
      {
        id: "student-records",
        title: "Data Mahasiswa",
        href: "/dashboard/admin_umum/non-regular-students/records",
      },
      {
        id: "payment-processing",
        title: "Proses Pembayaran",
        href: "/dashboard/admin_umum/non-regular-students/payments",
      },
      {
        id: "academic-matters",
        title: "Urusan Akademik",
        href: "/dashboard/admin_umum/non-regular-students/academic",
      },
      {
        id: "registration",
        title: "Pendaftaran",
        href: "/dashboard/admin_umum/non-regular-students/registration",
      },
    ],
  },
  {
    id: "correspondence",
    title: "Korespondensi",
    href: "/dashboard/admin_umum/correspondence",
    icon: Mail,
    children: [
      {
        id: "draft-letters",
        title: "Draft Surat",
        href: "/dashboard/admin_umum/correspondence/drafts",
      },
      {
        id: "leadership-correspondence",
        title: "Surat Pimpinan",
        href: "/dashboard/admin_umum/correspondence/leadership",
      },
      {
        id: "templates",
        title: "Template Surat",
        href: "/dashboard/admin_umum/correspondence/templates",
      },
      {
        id: "archive",
        title: "Arsip Surat",
        href: "/dashboard/admin_umum/correspondence/archive",
      },
    ],
  },
  {
    id: "reports",
    title: "Laporan",
    href: "/dashboard/admin_umum/reports",
    icon: FileSpreadsheet,
    children: [
      {
        id: "payment-reports",
        title: "Laporan Pembayaran",
        href: "/dashboard/admin_umum/reports/payments",
      },
      {
        id: "academic-reports",
        title: "Laporan Akademik",
        href: "/dashboard/admin_umum/reports/academic",
      },
      {
        id: "correspondence-reports",
        title: "Laporan Korespondensi",
        href: "/dashboard/admin_umum/reports/correspondence",
      },
    ],
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/admin_umum/settings",
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

export const financeAdminMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/admin_keuangan",
    icon: LayoutDashboard,
  },
  {
    id: "payments",
    title: "Payments",
    href: "/dashboard/admin_keuangan/payments",
    icon: CreditCard,
    children: [
      {
        id: "payment-list",
        title: "Payment List",
        href: "/dashboard/admin_keuangan/payments",
      },
      {
        id: "payment-verification",
        title: "Payment Verification",
        href: "/dashboard/admin_keuangan/payments/verification",
        badge: { text: "15", variant: "destructive" },
      },
      {
        id: "payment-history",
        title: "Payment History",
        href: "/dashboard/admin_keuangan/payments/history",
      },
    ],
  },
  {
    id: "reports",
    title: "Financial Reports",
    href: "/dashboard/admin_keuangan/reports",
    icon: FileText,
    children: [
      {
        id: "financial-reports",
        title: "Dashboard",
        href: "/dashboard/admin_keuangan/reports",
      },
      {
        id: "income-reports",
        title: "Income Reports",
        href: "/dashboard/admin_keuangan/reports/income",
      },
      {
        id: "expense-reports",
        title: "Expense Reports",
        href: "/dashboard/admin_keuangan/reports/expenses",
      },
      {
        id: "student-payment-reports",
        title: "Student Payment Reports",
        href: "/dashboard/admin_keuangan/reports/students",
      },
    ],
  },
  {
    id: "budget",
    title: "Budget Management",
    href: "/dashboard/admin_keuangan/budget",
    icon: Wallet,
    children: [
      {
        id: "budget-allocation",
        title: "Budget Allocation",
        href: "/dashboard/admin_keuangan/budget/allocation",
      },
      {
        id: "budget-tracking",
        title: "Budget Tracking",
        href: "/dashboard/admin_keuangan/budget/tracking",
      },
      {
        id: "budget-planning",
        title: "Budget Planning",
        href: "/dashboard/admin_keuangan/budget/planning",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    href: "/dashboard/admin_keuangan/settings",
    icon: Settings,
  },
]

// Menu items untuk GKM (Gerakan Kegiatan Mahasiswa)
export const gkmMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/gkm",
    icon: LayoutDashboard,
  },
  {
    id: "events",
    title: "Event Management",
    href: "/dashboard/gkm/events",
    icon: Calendar,
    children: [
      {
        id: "create-event",
        title: "Create New Event",
        href: "/dashboard/gkm/events/create",
      },
      {
        id: "manage-events",
        title: "Manage Events",
        href: "/dashboard/gkm/events/manage",
      },
      {
        id: "event-calendar",
        title: "Event Calendar",
        href: "/dashboard/gkm/events/calendar",
      },
    ],
  },
  {
    id: "student-activities",
    title: "Student Activities",
    href: "/dashboard/gkm/activities",
    icon: Users,
    children: [
      {
        id: "activity-dashboard",
        title: "Activity Hub",
        href: "/dashboard/gkm/activities",
      },
      {
        id: "club-management",
        title: "Club Management",
        href: "/dashboard/gkm/activities/clubs",
      },
      {
        id: "competitions",
        title: "Competitions",
        href: "/dashboard/gkm/activities/competitions",
        badge: { text: "12", variant: "destructive" },
      },
    ],
  },
  {
    id: "social-media",
    title: "Social Media",
    href: "/dashboard/gkm/social",
    icon: Megaphone,
    children: [
      {
        id: "content-calendar",
        title: "Content Calendar",
        href: "/dashboard/gkm/social/calendar",
      },
      {
        id: "posts-management",
        title: "Posts Management",
        href: "/dashboard/gkm/social/posts",
      },
      {
        id: "engagement-stats",
        title: "Engagement Stats",
        href: "/dashboard/gkm/social/stats",
      },
    ],
  },
  {
    id: "announcements",
    title: "Announcements",
    href: "/dashboard/gkm/announcements",
    icon: Bell,
    badge: { text: "5", variant: "secondary" },
  },
  {
    id: "achievements",
    title: "Achievement Tracker",
    href: "/dashboard/gkm/achievements",
    icon: Trophy,
  },
  {
    id: "collaboration",
    title: "Collaboration",
    href: "/dashboard/gkm/collaboration",
    icon: ClipboardCheck,
    children: [
      {
        id: "project-management",
        title: "Project Management",
        href: "/dashboard/gkm/collaboration/projects",
      },
      {
        id: "team-chat",
        title: "Team Chat",
        href: "/dashboard/gkm/collaboration/chat",
      },
      {
        id: "file-sharing",
        title: "File Sharing",
        href: "/dashboard/gkm/collaboration/files",
      },
    ],
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    href: "/dashboard/gkm/reports",
    icon: BarChart,
  },
  {
    id: "settings",
    title: "Settings",
    href: "/dashboard/gkm/settings",
    icon: Settings,
  },
]

// Menu items untuk Kepala Tata Usaha
export const kepalaTataUsahaMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/kepala_tata_usaha",
    icon: LayoutDashboard,
  },
  {
    id: "administration",
    title: "Administration",
    href: "/dashboard/kepala_tata_usaha/administration",
    icon: Users,
    children: [
      {
        id: "staff-management",
        title: "Staff Management",
        href: "/dashboard/kepala_tata_usaha/administration/staff",
      },
      {
        id: "office-operations",
        title: "Office Operations",
        href: "/dashboard/kepala_tata_usaha/administration/operations",
      },
      {
        id: "policies",
        title: "Policies & Procedures",
        href: "/dashboard/kepala_tata_usaha/administration/policies",
      },
    ],
  },
  {
    id: "document-management",
    title: "Document Management",
    href: "/dashboard/kepala_tata_usaha/documents",
    icon: FileText,
    children: [
      {
        id: "document-approval",
        title: "Document Approval",
        href: "/dashboard/kepala_tata_usaha/documents/approval",
        badge: { text: "15", variant: "destructive" },
      },
      {
        id: "document-archive",
        title: "Document Archive",
        href: "/dashboard/kepala_tata_usaha/documents/archive",
      },
      {
        id: "templates",
        title: "Document Templates",
        href: "/dashboard/kepala_tata_usaha/documents/templates",
      },
    ],
  },
  {
    id: "workflow",
    title: "Workflow Management",
    href: "/dashboard/kepala_tata_usaha/workflow",
    icon: ClipboardList,
    children: [
      {
        id: "process-approval",
        title: "Process Approval",
        href: "/dashboard/kepala_tata_usaha/workflow/approval",
      },
      {
        id: "task-delegation",
        title: "Task Delegation",
        href: "/dashboard/kepala_tata_usaha/workflow/delegation",
      },
      {
        id: "monitoring",
        title: "Process Monitoring",
        href: "/dashboard/kepala_tata_usaha/workflow/monitoring",
      },
    ],
  },
  {
    id: "coordination",
    title: "Coordination",
    href: "/dashboard/kepala_tata_usaha/coordination",
    icon: Crown,
    children: [
      {
        id: "inter-department",
        title: "Inter-Department",
        href: "/dashboard/kepala_tata_usaha/coordination/departments",
      },
      {
        id: "external-relations",
        title: "External Relations",
        href: "/dashboard/kepala_tata_usaha/coordination/external",
      },
      {
        id: "meetings",
        title: "Meeting Management",
        href: "/dashboard/kepala_tata_usaha/coordination/meetings",
      },
    ],
  },
  {
    id: "budget-oversight",
    title: "Budget Management",
    href: "/dashboard/kepala_tata_usaha/budget",
    icon: CreditCard,
    children: [
      {
        id: "budget-approval",
        title: "Budget Approval",
        href: "/dashboard/kepala_tata_usaha/budget/approval",
      },
      {
        id: "expense-monitoring",
        title: "Expense Monitoring",
        href: "/dashboard/kepala_tata_usaha/budget/monitoring",
      },
      {
        id: "financial-reports",
        title: "Financial Reports",
        href: "/dashboard/kepala_tata_usaha/budget/reports",
      },
    ],
  },
  {
    id: "facility-management",
    title: "Facility Management",
    href: "/dashboard/kepala_tata_usaha/facilities",
    icon: Briefcase,
    children: [
      {
        id: "maintenance",
        title: "Maintenance Requests",
        href: "/dashboard/kepala_tata_usaha/facilities/maintenance",
      },
      {
        id: "resource-allocation",
        title: "Resource Allocation",
        href: "/dashboard/kepala_tata_usaha/facilities/resources",
      },
      {
        id: "space-management",
        title: "Space Management",
        href: "/dashboard/kepala_tata_usaha/facilities/spaces",
      },
    ],
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    href: "/dashboard/kepala_tata_usaha/analytics",
    icon: BarChart,
  },
  {
    id: "settings",
    title: "Settings",
    href: "/dashboard/kepala_tata_usaha/settings",
    icon: Settings,
  },
]

export const menuItems: Record<Role, MenuItem[]> = {
  admin: adminMenuItems,
  dekan: dekanMenuItems,
  dosen: lecturerMenuItems,
  mahasiswa: mahasiswaMenuItems,
  prodi: prodiMenuItems,
  staff_tu: staffTuMenuItems,
  laboratory_admin: laboratoryAdminMenuItems,
  admin_umum: adminUmumMenuItems,
  reading_room_admin: readingRoomAdminMenuItems,
  admin_keuangan: financeAdminMenuItems,
  gkm: gkmMenuItems,
  kepala_tata_usaha: kepalaTataUsahaMenuItems,
}

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

