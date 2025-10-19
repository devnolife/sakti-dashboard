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
  TrendingUp,
  Calculator,
  Sparkles,
  Server,
  Code,
  Database,
  FileSignature,

} from "lucide-react"
import type { Role, DosenSubRole } from "@/types/role"

// Type definitions for menu items
interface MenuBadge {
  text: string
  variant: "default" | "secondary" | "destructive" | "outline" | string
}

interface BaseMenuItem {
  id: string
  title: string
  href: string
  icon?: React.ComponentType<any>
  badge?: MenuBadge
}

export interface MenuItem extends BaseMenuItem {
  children?: MenuItem[]
}

export const mahasiswaMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/mahasiswa",
    icon: LayoutDashboard,
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
        id: "courses",
        title: "Mata Kuliah",
        href: "/dashboard/mahasiswa/courses",
      },
      {
        id: "grades",
        title: "Nilai",
        href: "/dashboard/mahasiswa/grades",
      },
      {
        id: "schedule",
        title: "Jadwal",
        href: "/dashboard/mahasiswa/schedule",
      },
      {
        id: "control-card",
        title: "Kartu Kontrol",
        href: "/dashboard/mahasiswa/academic/control-card",
      },
    ],
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
    children: [
      {
        id: "correspondence-general",
        title: "Surat Umum",
        href: "/dashboard/mahasiswa/correspondence",
      },
      {
        id: "correspondence-transfer",
        title: "Surat Pindah",
        href: "/dashboard/mahasiswa/correspondence/transfer",
      },
      {
        id: "correspondence-survey",
        title: "Surat Pengantar Survey",
        href: "/dashboard/mahasiswa/correspondence/survey",
      },
      {
        id: "correspondence-generate",
        title: "Buat Surat",
        href: "/dashboard/mahasiswa/correspondence/generate",
      },
    ],
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
        id: "aik-komfren-dashboard",
        title: "Ujian Komfren AIK",
        href: "/dashboard/mahasiswa/aik-komfren",
      },
      {
        id: "aik-komfren-registration",
        title: "Registrasi & Pembayaran",
        href: "/dashboard/mahasiswa/aik-komfren/registration",
      },
      {
        id: "aik-komfren-schedule",
        title: "Jadwal & Penguji",
        href: "/dashboard/mahasiswa/aik-komfren/schedule",
      },
      {
        id: "aik-komfren-completion",
        title: "Penyelesaian Ujian",
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
        title: "Dashboard Umum",
        href: "/dashboard/mahasiswa/payment",
      },
      {
        id: "payment-special",
        title: "Pembayaran Khusus",
        href: "/dashboard/mahasiswa/payment/special",
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
        id: "kkp-requirements",
        title: "Persyaratan",
        href: "/dashboard/mahasiswa/kkp/requirements",
      },
      {
        id: "kkp-locations",
        title: "Lokasi KKP",
        href: "/dashboard/mahasiswa/kkp/locations",
      },
      {
        id: "kkp-pengajuan",
        title: "Pengajuan",
        href: "/dashboard/mahasiswa/kkp/pengajuan",
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
    ],
  },
  {
    id: "kkp-plus",
    title: "KKP Plus",
    href: "/dashboard/mahasiswa/kkp-plus",
    icon: Award,
    children: [
      {
        id: "kkp-plus-dashboard",
        title: "KKP Plus",
        href: "/dashboard/mahasiswa/kkp-plus",
      },
      {
        id: "kkp-plus-registration",
        title: "Pendaftaran KKP Plus",
        href: "/dashboard/mahasiswa/kkp-plus/registration",
      },
      {
        id: "kkp-plus-progress",
        title: "Progress KKP Plus",
        href: "/dashboard/mahasiswa/kkp-plus/progress",
      },
      {
        id: "kkp-plus-documents",
        title: "Dokumen KKP Plus",
        href: "/dashboard/mahasiswa/kkp-plus/documents",
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
    icon: Briefcase,
    children: [
      {
        id: "kkp-overview",
        title: "Overview KKP",
        href: "/dashboard/staff_tu/kkp",
      },
      {
        id: "kkp-approval",
        title: "Persetujuan KKP",
        href: "/dashboard/staff_tu/kkp-approval",
        badge: { text: "3", variant: "destructive" },
      },
    ],
  },
  {
    id: "document-generation",
    title: "Document Generation",
    href: "/dashboard/staff_tu/document-generation",
    icon: FileSignature,
    badge: { text: "New", variant: "secondary" },
    children: [
      {
        id: "generate-documents",
        title: "Generate Documents",
        href: "/dashboard/staff_tu/document-generation",
      },
      {
        id: "document-templates",
        title: "Document Templates",
        href: "/dashboard/staff_tu/document-generation/templates",
      },
      {
        id: "verification-docs",
        title: "Document Verification",
        href: "/dashboard/staff_tu/document-generation/verification",
      },
    ],
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
    id: "kkp-management",
    title: "Manajement KKP",
    href: "/dashboard/prodi/kkp",
    icon: Briefcase,
    children: [
      {
        id: "kkp-overview",
        title: "Overview KKP",
        href: "/dashboard/prodi/kkp/overview",
      },
      {
        id: "kkp-regular",
        title: "KKP Reguler",
        href: "/dashboard/prodi/kkp/regular",
      },
      {
        id: "kkp-plus-management",
        title: "KKP Plus",
        href: "/dashboard/prodi/kkp/plus",
      },
      {
        id: "kkp-grading",
        title: "Input Nilai",
        href: "/dashboard/prodi/kkp/grading",
      },
      {
        id: "kkp-supervisors",
        title: "Pembimbing",
        href: "/dashboard/prodi/kkp/supervisors",
      },
      {
        id: "kkp-locations",
        title: "Lokasi KKP",
        href: "/dashboard/prodi/kkp/locations",
      },
    ],
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
export const readingRoomAdminMenuItems: MenuItem[] = [
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
        icon: BookOpen,
      },
      {
        id: "add-book",
        title: "Tambah Buku",
        href: "/dashboard/reading_room_admin/books/add",
        icon: BookOpen,
      },
      {
        id: "book-categories",
        title: "Kategori Buku",
        href: "/dashboard/reading_room_admin/books/categories",
        icon: BookOpen,
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
        icon: BookMarked,
        badge: { text: "12", variant: "destructive" as const },
      },
      {
        id: "new-borrowing",
        title: "Peminjaman Baru",
        href: "/dashboard/reading_room_admin/borrowing/new",
        icon: BookMarked,
      },
      {
        id: "return-books",
        title: "Pengembalian Buku",
        href: "/dashboard/reading_room_admin/borrowing/returns",
        icon: BookMarked,
      },
      {
        id: "borrowing-history",
        title: "Riwayat Peminjaman",
        href: "/dashboard/reading_room_admin/borrowing/history",
        icon: BookMarked,
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
        icon: ScrollText,
      },
      {
        id: "title-submissions",
        title: "Pengajuan Judul",
        href: "/dashboard/reading_room_admin/thesis/submissions",
        icon: ScrollText,
        badge: { text: "8", variant: "destructive" as const },
      },
      {
        id: "thesis-archive",
        title: "Arsip Skripsi",
        href: "/dashboard/reading_room_admin/thesis/archive",
        icon: ScrollText,
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
        icon: FileText,
      },
      {
        id: "popular-books",
        title: "Buku Populer",
        href: "/dashboard/reading_room_admin/reports/popular",
        icon: FileText,
      },
      {
        id: "overdue-reports",
        title: "Laporan Keterlambatan",
        href: "/dashboard/reading_room_admin/reports/overdue",
        icon: FileText,
        badge: { text: "5", variant: "destructive" as const },
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

// Menu items for Admin Umum staff
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
    id: "document-generation",
    title: "Document Generation",
    href: "/dashboard/admin_umum/document-generation",
    icon: FileSignature,
    children: [
      {
        id: "generate-documents",
        title: "Generate Documents",
        href: "/dashboard/admin_umum/document-generation",
      },
      {
        id: "document-list",
        title: "Document List",
        href: "/dashboard/admin_umum/document-generation/list",
      },
      {
        id: "document-types",
        title: "Document Types",
        href: "/dashboard/admin_umum/document-generation/types",
      },
      {
        id: "document-config",
        title: "Document Config",
        href: "/dashboard/admin_umum/document-generation/config",
      },
      {
        id: "verification-docs",
        title: "Document Verification",
        href: "/dashboard/admin_umum/document-generation/verification",
      },
    ],
  },
  {
    id: "signatures",
    title: "Digital Signatures",
    href: "/dashboard/admin_umum/signatures",
    icon: ScrollText,
    children: [
      {
        id: "signature-sign",
        title: "Sign Documents",
        href: "/dashboard/admin_umum/signatures/sign",
      },
      {
        id: "signature-verify",
        title: "Verify Signatures",
        href: "/dashboard/admin_umum/signatures/verify",
      },
      {
        id: "signers-management",
        title: "Manage Signers",
        href: "/dashboard/admin_umum/signatures/signers",
      },
      {
        id: "signature-status",
        title: "Signature Status",
        href: "/dashboard/admin_umum/signatures/status",
      },
    ],
  },
  {
    id: "admin-tools",
    title: "Admin Tools",
    href: "/dashboard/admin_umum/admin",
    icon: Database,
    children: [
      {
        id: "system-statistics",
        title: "System Statistics",
        href: "/dashboard/admin_umum/admin/statistics",
      },
      {
        id: "system-health",
        title: "System Health",
        href: "/dashboard/admin_umum/admin/health",
      },
      {
        id: "api-monitoring",
        title: "API Monitoring",
        href: "/dashboard/admin_umum/admin/monitoring",
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
        id: "document-reports",
        title: "Laporan Dokumen",
        href: "/dashboard/admin_umum/reports/documents",
      },
      {
        id: "signature-reports",
        title: "Laporan Tanda Tangan",
        href: "/dashboard/admin_umum/reports/signatures",
      },
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
    id: "role-description",
    title: "Deskripsi Peran",
    href: "/dashboard/admin_umum/role-description",
    icon: UserCheck,
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/admin_umum/settings",
    icon: Settings,
  },
]

// Menu items for admin
export const adminMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    id: "user-management",
    title: "Manajemen Pengguna",
    href: "/dashboard/admin/manajemen-pengguna",
    icon: Users,
  },
  {
    id: "kkp-requests",
    title: "KKP Requests",
    href: "/dashboard/admin/kkp-requests",
    icon: Briefcase,
    badge: { text: "12", variant: "destructive" as const },
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

// Menu items for dosen (formerly lecturer)
export const lecturerMenuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/dosen",
    icon: LayoutDashboard,
  },
  {
    id: "academic-guidance",
    title: "Bimbingan Akademik",
    href: "/dashboard/dosen/academic-guidance",
    icon: BookOpen,
  },
  {
    id: "exam-guidance",
    title: "Bimbingan Ujian",
    href: "/dashboard/dosen/exam-guidance",
    icon: GraduationCapIcon,
  },
  {
    id: "kkp-guidance",
    title: "Bimbingan KKP",
    href: "/dashboard/dosen/kkp-guidance",
    icon: Briefcase,
  },
  {
    id: "kkp-plus-guidance",
    title: "Bimbingan KKP Plus",
    href: "/dashboard/dosen/kkp-plus-guidance",
    icon: Award,
  },
  {
    id: "rekomendasi-judul",
    title: "Rekomendasi Judul",
    href: "/dashboard/dosen/rekomendasi-judul",
    icon: BookMarked,
  },
  {
    id: "exams",
    title: "Ujian",
    href: "/dashboard/dosen/exams",
    icon: GraduationCapIcon,
    badge: { text: "7", variant: "destructive" },
    children: [
      {
        id: "exam-schedule",
        title: "Jadwal Ujian",
        href: "/dashboard/dosen/exams/schedule",
        icon: Calendar,
      },
      {
        id: "student-guidance-list",
        title: "List Bimbingan Mahasiswa",
        href: "/dashboard/dosen/exams/student-guidance",
        icon: Users,
      },
      {
        id: "exam-committees",
        title: "Menu Penguji Mahasiswa",
        href: "/dashboard/dosen/exams/penguji",
        icon: UserCheck,
        badge: { text: "7", variant: "destructive" },
      },
      {
        id: "exam-grading",
        title: "Penilaian Ujian",
        href: "/dashboard/dosen/exams/grading",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    id: "schedule",
    title: "Schedule",
    href: "/dashboard/dosen/schedule",
    icon: Calendar,
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/dosen/settings",
    icon: Settings,
  },
]


export const laboratoryAdminMenuItems: MenuItem[] = [
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
        icon: Briefcase,
      },
      {
        id: "lab-schedule",
        title: "Jadwal Lab",
        href: "/dashboard/laboratory_admin/lab-management/schedule",
        icon: Calendar,
      },
      {
        id: "lab-maintenance",
        title: "Pemeliharaan Lab",
        href: "/dashboard/laboratory_admin/lab-management/maintenance",
        icon: Settings,
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
        icon: Calendar,
      },
      {
        id: "practicum-materials",
        title: "Materi Praktikum",
        href: "/dashboard/laboratory_admin/practicum/materials",
        icon: BookOpen,
      },
      {
        id: "practicum-grades",
        title: "Nilai Praktikum",
        href: "/dashboard/laboratory_admin/practicum/grades",
        icon: Award,
      },
    ],
  },

  {
    id: "certificates",
    title: "Generator Sertifikat",
    href: "/dashboard/laboratory_admin/certificates",
    icon: Sparkles,
    children: [
      {
        id: "certificate-generate",
        title: "Buat Sertifikat",
        href: "/dashboard/laboratory_admin/certificates/generate",
        icon: Award,
      },
      {
        id: "certificate-templates",
        title: "Template Sertifikat",
        href: "/dashboard/laboratory_admin/certificates/templates",
        icon: FileText,
      },
      {
        id: "certificate-history",
        title: "Riwayat Sertifikat",
        href: "/dashboard/laboratory_admin/certificates/history",
        icon: ClipboardList,
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

// Menu items untuk GKM (Gugus Kendali Mutu)
export const gkmMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/gkm",
    icon: LayoutDashboard,
  },
  {
    id: "quality-monitoring",
    title: "Monitoring Mutu",
    href: "/dashboard/gkm/quality-monitoring",
    icon: ClipboardCheck,
    children: [
      {
        id: "academic-quality",
        title: "Mutu Akademik",
        href: "/dashboard/gkm/quality-monitoring/academic",
        icon: BarChart,
      },
      {
        id: "service-quality",
        title: "Mutu Layanan",
        href: "/dashboard/gkm/quality-monitoring/service",
        icon: ClipboardCheck,
      },
      {
        id: "facility-quality",
        title: "Mutu Fasilitas",
        href: "/dashboard/gkm/quality-monitoring/facility",
        icon: Briefcase,
      },
    ],
  },
  {
    id: "quality-evaluation",
    title: "Evaluasi Mutu",
    href: "/dashboard/gkm/quality-evaluation",
    icon: BarChart,
    children: [
      {
        id: "lecturer-evaluation",
        title: "Evaluasi Dosen",
        href: "/dashboard/gkm/quality-evaluation/lecturer",
        icon: Users,
      },
      {
        id: "curriculum-evaluation",
        title: "Evaluasi Kurikulum",
        href: "/dashboard/gkm/quality-evaluation/curriculum",
        icon: BookOpen,
      },
      {
        id: "learning-evaluation",
        title: "Evaluasi Pembelajaran",
        href: "/dashboard/gkm/quality-evaluation/learning",
        icon: GraduationCapIcon,
      },
    ],
  },
  {
    id: "quality-improvement",
    title: "Perbaikan Mutu",
    href: "/dashboard/gkm/quality-improvement",
    icon: TrendingUp,
    children: [
      {
        id: "improvement-plans",
        title: "Rencana Perbaikan",
        href: "/dashboard/gkm/quality-improvement/plans",
        icon: ClipboardList,
      },
      {
        id: "improvement-tracking",
        title: "Tracking Perbaikan",
        href: "/dashboard/gkm/quality-improvement/tracking",
        icon: TrendingUp,
      },
      {
        id: "best-practices",
        title: "Best Practices",
        href: "/dashboard/gkm/quality-improvement/best-practices",
        icon: Award,
      },
    ],
  },
  {
    id: "accreditation",
    title: "Akreditasi",
    href: "/dashboard/gkm/accreditation",
    icon: Award,
    children: [
      {
        id: "accreditation-preparation",
        title: "Persiapan Akreditasi",
        href: "/dashboard/gkm/accreditation/preparation",
        icon: ClipboardCheck,
      },
      {
        id: "document-management",
        title: "Manajemen Dokumen",
        href: "/dashboard/gkm/accreditation/documents",
        icon: FileText,
      },
      {
        id: "assessment-results",
        title: "Hasil Penilaian",
        href: "/dashboard/gkm/accreditation/results",
        icon: BarChart,
      },
    ],
  },
  {
    id: "surveys",
    title: "Survei & Feedback",
    href: "/dashboard/gkm/surveys",
    icon: ClipboardList,
    children: [
      {
        id: "student-satisfaction",
        title: "Kepuasan Mahasiswa",
        href: "/dashboard/gkm/surveys/student-satisfaction",
        icon: Users,
      },
      {
        id: "stakeholder-feedback",
        title: "Feedback Stakeholder",
        href: "/dashboard/gkm/surveys/stakeholder-feedback",
        icon: Mail,
      },
      {
        id: "survey-analysis",
        title: "Analisis Survei",
        href: "/dashboard/gkm/surveys/analysis",
        icon: BarChart,
      },
    ],
  },
  {
    id: "reports",
    title: "Laporan Mutu",
    href: "/dashboard/gkm/reports",
    icon: FileSpreadsheet,
    children: [
      {
        id: "quality-reports",
        title: "Laporan Berkala",
        href: "/dashboard/gkm/reports/periodic",
        icon: FileText,
      },
      {
        id: "performance-metrics",
        title: "Metrik Kinerja",
        href: "/dashboard/gkm/reports/metrics",
        icon: BarChart,
      },
      {
        id: "annual-report",
        title: "Laporan Tahunan",
        href: "/dashboard/gkm/reports/annual",
        icon: FileSpreadsheet,
      },
    ],
  },
  {
    id: "settings",
    title: "Pengaturan",
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
    title: "Administrasi",
    href: "/dashboard/kepala_tata_usaha/administration",
    icon: Users,
  },
  {
    id: "document-management",
    title: "Manajemen Dokumen",
    href: "/dashboard/kepala_tata_usaha/documents",
    icon: FileText,
  },
  {
    id: "reports",
    title: "Laporan",
    href: "/dashboard/kepala_tata_usaha/reports",
    icon: BarChart,
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/kepala_tata_usaha/settings",
    icon: Settings,
  },
]

// Menu items untuk SIMAK (Sistem Informasi Manajemen Akademik)
export const simakMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/simak",
    icon: LayoutDashboard,
  },
  {
    id: "prodis",
    title: "Manajemen Prodi",
    href: "/dashboard/simak/prodis",
    icon: GraduationCapIcon,
    children: [
      {
        id: "prodi-list",
        title: "Daftar Prodi",
        href: "/dashboard/simak/prodis",
        icon: GraduationCapIcon,
      },
      {
        id: "prodi-add",
        title: "Tambah Prodi",
        href: "/dashboard/simak/prodis/add",
        icon: GraduationCapIcon,
      },
      {
        id: "prodi-statistics",
        title: "Statistik Prodi",
        href: "/dashboard/simak/prodis/statistics",
        icon: BarChart,
      },
    ],
  },
  {
    id: "courses",
    title: "Manajemen Mata Kuliah",
    href: "/dashboard/simak/courses",
    icon: BookOpen,
    children: [
      {
        id: "course-list",
        title: "Daftar Mata Kuliah",
        href: "/dashboard/simak/courses",
        icon: BookOpen,
      },
      {
        id: "course-add",
        title: "Tambah Mata Kuliah",
        href: "/dashboard/simak/courses/add",
        icon: BookOpen,
      },
      {
        id: "course-bulk",
        title: "Import Bulk",
        href: "/dashboard/simak/courses/bulk",
        icon: FileText,
      },
    ],
  },
  {
    id: "schedule-generation",
    title: "Pembuat Jadwal",
    href: "/dashboard/simak/schedule-generation",
    icon: CalendarClock,
    children: [
      {
        id: "generate-schedule",
        title: "Generate Jadwal",
        href: "/dashboard/simak/schedule-generation",
        icon: CalendarClock,
      },
      {
        id: "schedule-status",
        title: "Status Generasi",
        href: "/dashboard/simak/schedule-generation/status",
        icon: ClipboardCheck,
      },
      {
        id: "schedule-templates",
        title: "Template Jadwal",
        href: "/dashboard/simak/schedule-generation/templates",
        icon: FileText,
      },
    ],
  },
  {
    id: "schedules",
    title: "Jadwal Akademik",
    href: "/dashboard/simak/schedules",
    icon: Calendar,
    children: [
      {
        id: "view-schedules",
        title: "Lihat Jadwal",
        href: "/dashboard/simak/schedules",
        icon: Calendar,
      },
      {
        id: "schedule-by-prodi",
        title: "Jadwal per Prodi",
        href: "/dashboard/simak/schedules/by-prodi",
        icon: Calendar,
      },
      {
        id: "schedule-conflicts",
        title: "Konflik Jadwal",
        href: "/dashboard/simak/schedules/conflicts",
        icon: ClipboardCheck,
        badge: { text: "3", variant: "destructive" },
      },
    ],
  },
  {
    id: "file-management",
    title: "Manajemen File",
    href: "/dashboard/simak/files",
    icon: FileText,
    children: [
      {
        id: "upload-files",
        title: "Upload File",
        href: "/dashboard/simak/files/upload",
        icon: FileText,
      },
      {
        id: "file-history",
        title: "Riwayat File",
        href: "/dashboard/simak/files/history",
        icon: FileText,
      },
      {
        id: "file-templates",
        title: "Template File",
        href: "/dashboard/simak/files/templates",
        icon: FileText,
      },
    ],
  },
  {
    id: "downloads",
    title: "Download & Export",
    href: "/dashboard/simak/downloads",
    icon: FileSpreadsheet,
    children: [
      {
        id: "export-excel",
        title: "Export Excel",
        href: "/dashboard/simak/downloads/excel",
        icon: FileSpreadsheet,
      },
      {
        id: "export-pdf",
        title: "Export PDF",
        href: "/dashboard/simak/downloads/pdf",
        icon: FileText,
      },
      {
        id: "export-json",
        title: "Export JSON",
        href: "/dashboard/simak/downloads/json",
        icon: Code,
      },
    ],
  },
  {
    id: "system-config",
    title: "Konfigurasi Sistem",
    href: "/dashboard/simak/config",
    icon: Settings,
    children: [
      {
        id: "time-slots",
        title: "Pengaturan Waktu",
        href: "/dashboard/simak/config/time-slots",
        icon: CalendarClock,
      },
      {
        id: "academic-year",
        title: "Tahun Akademik",
        href: "/dashboard/simak/config/academic-year",
        icon: Calendar,
      },
      {
        id: "system-stats",
        title: "Statistik Sistem",
        href: "/dashboard/simak/config/stats",
        icon: BarChart,
      },
    ],
  },
  {
    id: "reports",
    title: "Laporan",
    href: "/dashboard/simak/reports",
    icon: BarChart,
    children: [
      {
        id: "schedule-reports",
        title: "Laporan Jadwal",
        href: "/dashboard/simak/reports/schedules",
        icon: Calendar,
      },
      {
        id: "course-reports",
        title: "Laporan Mata Kuliah",
        href: "/dashboard/simak/reports/courses",
        icon: BookOpen,
      },
      {
        id: "analytics",
        title: "Analytics",
        href: "/dashboard/simak/reports/analytics",
        icon: BarChart,
      },
    ],
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/simak/settings",
    icon: Settings,
  },
]

export const menuItems: Record<Role, MenuItem[]> = {
  admin: adminMenuItems,
  dosen: lecturerMenuItems, // Default to lecturer menu, actual menu will be determined by sub-role
  mahasiswa: mahasiswaMenuItems,
  prodi: prodiMenuItems,
  dekan: dekanMenuItems,
  staff_tu: staffTuMenuItems,
  laboratory_admin: laboratoryAdminMenuItems,
  admin_umum: adminUmumMenuItems,
  reading_room_admin: readingRoomAdminMenuItems,
  admin_keuangan: financeAdminMenuItems,
  gkm: gkmMenuItems,
  kepala_tata_usaha: kepalaTataUsahaMenuItems,
  simak: simakMenuItems,
}

// Menu items for Wakil Dekan I (Akademik)
export const wakilDekan1MenuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/dosen/vice-dean-1",
    icon: LayoutDashboard,
  },
  {
    id: "academic-monitoring",
    title: "Monitoring Akademik",
    href: "/dashboard/dosen/vice-dean-1/academic-monitoring",
    icon: BookOpen,
  },
  {
    id: "student-management",
    title: "Manajemen Mahasiswa",
    href: "/dashboard/dosen/vice-dean-1/student-management",
    icon: Users,
  },
  {
    id: "research-pkm",
    title: "Penelitian & PKM",
    href: "/dashboard/dosen/vice-dean-1/research-pkm",
    icon: ClipboardList,
  },
  {
    id: "partnerships",
    title: "Kemitraan",
    href: "/dashboard/dosen/vice-dean-1/partnerships",
    icon: Briefcase,
  },
  {
    id: "kkp-verification",
    title: "Verifikasi KKP",
    href: "/dashboard/dosen/vice-dean-1/kkp-verification",
    icon: FileText,
    badge: { text: "2", variant: "destructive" },
  },
]

// Menu items for Wakil Dekan II (Administrasi, Perencanaan, Keuangan)
export const wakilDekan2MenuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/dosen/vice-dean-2",
    icon: LayoutDashboard,
  },
  {
    id: "budget",
    title: "Anggaran",
    href: "/dashboard/dosen/vice-dean-2/budget",
    icon: Calculator,
  },
  {
    id: "expenses",
    title: "Pengeluaran",
    href: "/dashboard/dosen/vice-dean-2/expenses",
    icon: CreditCard,
  },
  {
    id: "reports",
    title: "Laporan Keuangan",
    href: "/dashboard/dosen/vice-dean-2/reports",
    icon: FileSpreadsheet,
  },
]

// Menu items for Wakil Dekan III (Kemahasiswaan)
export const wakilDekan3MenuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/dosen/vice-dean-3",
    icon: LayoutDashboard,
  },
  {
    id: "student-affairs",
    title: "Kemahasiswaan",
    href: "/dashboard/dosen/vice-dean-3/student-affairs",
    icon: Users,
  },
  {
    id: "student-activities",
    title: "Kegiatan Mahasiswa",
    href: "/dashboard/dosen/vice-dean-3/activities",
    icon: Calendar,
  },
  {
    id: "scholarships",
    title: "Beasiswa",
    href: "/dashboard/dosen/vice-dean-3/scholarships",
    icon: Award,
  },
  {
    id: "alumni",
    title: "Alumni",
    href: "/dashboard/dosen/vice-dean-3/alumni",
    icon: GraduationCapIcon,
  },
]

// Menu items for Wakil Dekan IV (Kerjasama & Pengembangan)
export const wakilDekan4MenuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/dosen/vice-dean-4",
    icon: LayoutDashboard,
  },
  {
    id: "cooperation",
    title: "Kerjasama",
    href: "/dashboard/dosen/vice-dean-4/cooperation",
    icon: Briefcase,
  },
  {
    id: "development",
    title: "Pengembangan",
    href: "/dashboard/dosen/vice-dean-4/development",
    icon: TrendingUp,
  },
  {
    id: "partnerships",
    title: "Mitra",
    href: "/dashboard/dosen/vice-dean-4/partnerships",
    icon: Users,
  },
  {
    id: "internships",
    title: "Program Magang",
    href: "/dashboard/dosen/vice-dean-4/internships",
    icon: Briefcase,
  },
]

// Menu items untuk Sekretaris Prodi
export const sekretarisProdiMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard/dosen/sekretaris-prodi",
    icon: LayoutDashboard,
  },
  {
    id: "academic-administration",
    title: "Administrasi Akademik",
    href: "/dashboard/dosen/sekretaris-prodi/academic-admin",
    icon: BookOpen,
    children: [
      {
        id: "curriculum-support",
        title: "Dukungan Kurikulum",
        href: "/dashboard/dosen/sekretaris-prodi/academic-admin/curriculum",
        icon: BookOpen,
      },
      {
        id: "course-scheduling",
        title: "Penjadwalan Mata Kuliah",
        href: "/dashboard/dosen/sekretaris-prodi/academic-admin/scheduling",
        icon: Calendar,
      },
    ],
  },
  {
    id: "student-affairs",
    title: "Urusan Mahasiswa",
    href: "/dashboard/dosen/sekretaris-prodi/student-affairs",
    icon: Users,
    children: [
      {
        id: "student-records",
        title: "Data Mahasiswa",
        href: "/dashboard/dosen/sekretaris-prodi/student-affairs/records",
        icon: Users,
      },
      {
        id: "academic-guidance",
        title: "Bimbingan Akademik",
        href: "/dashboard/dosen/sekretaris-prodi/student-affairs/guidance",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    id: "correspondence",
    title: "Korespondensi",
    href: "/dashboard/dosen/sekretaris-prodi/correspondence",
    icon: Mail,
  },
  {
    id: "reports",
    title: "Laporan",
    href: "/dashboard/dosen/sekretaris-prodi/reports",
    icon: FileText,
  },
  {
    id: "settings",
    title: "Pengaturan",
    href: "/dashboard/dosen/sekretaris-prodi/settings",
    icon: Settings,
  },
]

// Mapping sub-roles to their specific menu items
export const dosenSubRoleMenuItems: Record<DosenSubRole, MenuItem[]> = {
  dosen: lecturerMenuItems,
  dekan: dekanMenuItems,
  wakil_dekan_1: wakilDekan1MenuItems,
  wakil_dekan_2: wakilDekan2MenuItems,
  wakil_dekan_3: wakilDekan3MenuItems,
  wakil_dekan_4: wakilDekan4MenuItems,
  gkm: gkmMenuItems,
  prodi: prodiMenuItems,
  sekretaris_prodi: sekretarisProdiMenuItems,
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

