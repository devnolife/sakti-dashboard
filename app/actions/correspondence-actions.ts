"use server"
import type { LetterRequest, LetterStatus } from "@/types/correspondence"

// Define letter types with their properties
export const LETTER_TYPES: Record<
  string,
  {
    title: string
    description: string
    approvalRole: "staff_tu" | "prodi" | "dekan" | "none"
    estimatedDays: number
    requiredDocuments?: string[]
    additionalFields?: Array<{
      name: string
      label: string
      type: "text" | "date" | "select" | "textarea" | "number"
      options?: string[]
      required?: boolean
    }>
  }
> = {
  active_student: {
    title: "Surat Keterangan Aktif Kuliah",
    description: "Surat yang menyatakan bahwa mahasiswa terdaftar dan aktif mengikuti perkuliahan",
    approvalRole: "staff_tu",
    estimatedDays: 3,
    requiredDocuments: ["Bukti pembayaran SPP terakhir"],
    additionalFields: [
      {
        name: "semester",
        label: "Semester Saat Ini",
        type: "select",
        options: ["1", "2", "3", "4", "5", "6", "7", "8"],
        required: true,
      },
      {
        name: "purpose",
        label: "Tujuan Penggunaan Surat",
        type: "text",
        required: true,
      },
    ],
  },
  leave_absence: {
    title: "Surat Cuti Kuliah",
    description: "Surat permohonan untuk mengambil cuti dari perkuliahan",
    approvalRole: "prodi",
    estimatedDays: 7,
    requiredDocuments: ["Bukti pembayaran SPP terakhir", "Transkrip nilai"],
    additionalFields: [
      {
        name: "startDate",
        label: "Tanggal Mulai Cuti",
        type: "date",
        required: true,
      },
      {
        name: "endDate",
        label: "Tanggal Selesai Cuti",
        type: "date",
        required: true,
      },
      {
        name: "reason",
        label: "Alasan Cuti",
        type: "textarea",
        required: true,
      },
    ],
  },
  loan_application: {
    title: "Surat Keterangan untuk Pengajuan Pinjaman",
    description: "Surat keterangan untuk keperluan pengajuan pinjaman di bank atau lembaga keuangan",
    approvalRole: "staff_tu",
    estimatedDays: 5,
    requiredDocuments: ["Bukti pembayaran SPP terakhir", "KTM", "KTP"],
    additionalFields: [
      {
        name: "bankName",
        label: "Nama Bank/Lembaga Keuangan",
        type: "text",
        required: true,
      },
      {
        name: "loanAmount",
        label: "Jumlah Pinjaman",
        type: "text",
        required: true,
      },
      {
        name: "loanPurpose",
        label: "Tujuan Pinjaman",
        type: "textarea",
        required: true,
      },
    ],
  },
  tuition_extension: {
    title: "Surat Permohonan Perpanjangan Pembayaran SPP",
    description: "Surat permohonan untuk memperpanjang tenggat waktu pembayaran SPP",
    approvalRole: "staff_tu",
    estimatedDays: 3,
    additionalFields: [
      {
        name: "currentDueDate",
        label: "Tenggat Waktu Saat Ini",
        type: "date",
        required: true,
      },
      {
        name: "requestedDueDate",
        label: "Tenggat Waktu yang Diminta",
        type: "date",
        required: true,
      },
      {
        name: "reason",
        label: "Alasan Perpanjangan",
        type: "textarea",
        required: true,
      },
    ],
  },
  internship_recommendation: {
    title: "Surat Rekomendasi Magang",
    description: "Surat rekomendasi untuk keperluan magang di perusahaan atau instansi",
    approvalRole: "prodi",
    estimatedDays: 4,
    requiredDocuments: ["Transkrip nilai"],
    additionalFields: [
      {
        name: "companyName",
        label: "Nama Perusahaan/Instansi",
        type: "text",
        required: true,
      },
      {
        name: "companyAddress",
        label: "Alamat Perusahaan/Instansi",
        type: "textarea",
        required: true,
      },
      {
        name: "internshipPeriod",
        label: "Periode Magang",
        type: "text",
        required: true,
      },
    ],
  },
  scholarship_recommendation: {
    title: "Surat Rekomendasi Beasiswa",
    description: "Surat rekomendasi untuk keperluan pengajuan beasiswa",
    approvalRole: "staff_tu",
    estimatedDays: 5,
    requiredDocuments: ["Transkrip nilai", "CV", "Sertifikat prestasi"],
    additionalFields: [
      {
        name: "scholarshipName",
        label: "Nama Beasiswa",
        type: "text",
        required: true,
      },
      {
        name: "scholarshipProvider",
        label: "Penyedia Beasiswa",
        type: "text",
        required: true,
      },
      {
        name: "achievements",
        label: "Prestasi Akademik/Non-Akademik",
        type: "textarea",
        required: true,
      },
    ],
  },
  transcript_request: {
    title: "Permohonan Transkrip Nilai",
    description: "Permohonan untuk mendapatkan transkrip nilai resmi",
    approvalRole: "staff_tu",
    estimatedDays: 3,
    requiredDocuments: ["Bukti pembayaran SPP terakhir", "KTM"],
    additionalFields: [
      {
        name: "purpose",
        label: "Tujuan Penggunaan",
        type: "select",
        options: ["Melamar Pekerjaan", "Melanjutkan Studi", "Keperluan Beasiswa", "Lainnya"],
        required: true,
      },
      {
        name: "copies",
        label: "Jumlah Salinan",
        type: "number",
        required: true,
      },
    ],
  },
  research_permission: {
    title: "Surat Izin Penelitian",
    description: "Surat izin untuk melakukan penelitian di luar kampus",
    approvalRole: "prodi",
    estimatedDays: 5,
    requiredDocuments: ["Proposal penelitian", "Surat persetujuan pembimbing"],
    additionalFields: [
      {
        name: "researchTitle",
        label: "Judul Penelitian",
        type: "text",
        required: true,
      },
      {
        name: "researchLocation",
        label: "Lokasi Penelitian",
        type: "text",
        required: true,
      },
      {
        name: "researchPeriod",
        label: "Periode Penelitian",
        type: "text",
        required: true,
      },
    ],
  },
  graduation_confirmation: {
    title: "Surat Keterangan Lulus",
    description: "Surat keterangan bahwa mahasiswa telah lulus dan menyelesaikan studi",
    approvalRole: "staff_tu",
    estimatedDays: 7,
    requiredDocuments: [
      "Bukti bebas tanggungan perpustakaan",
      "Bukti bebas tanggungan laboratorium",
      "Bukti bebas tanggungan keuangan",
    ],
    additionalFields: [
      {
        name: "graduationDate",
        label: "Tanggal Kelulusan",
        type: "date",
        required: true,
      },
      {
        name: "gpa",
        label: "IPK",
        type: "text",
        required: true,
      },
      {
        name: "thesisTitle",
        label: "Judul Skripsi/Tugas Akhir",
        type: "text",
        required: true,
      },
    ],
  },
}

// Comprehensive mock data for letter requests
const MOCK_LETTER_REQUESTS: LetterRequest[] = [
  // Active Student Letters
  {
    id: "letter-001",
    type: "active_student",
    title: "Surat Keterangan Aktif Kuliah",
    purpose: "Pengajuan Beasiswa Djarum",
    description: "Surat keterangan aktif kuliah untuk keperluan pengajuan Beasiswa Djarum periode 2023",
    status: "completed",
    requestDate: "2023-08-15T09:30:00Z",
    approvedDate: "2023-08-17T14:20:00Z",
    completedDate: "2023-08-18T10:15:00Z",
    studentId: "std-001",
    studentName: "Ahmad Fauzi",
    studentNIM: "1901234567",
    studentMajor: "Teknik Informatika",
    approvalRole: "staff_tu",
    approvedBy: "Budi Santoso, S.Kom.",
    additionalInfo: {
      semester: "5",
      purpose: "Pengajuan Beasiswa Djarum 2023",
    },
    attachments: [
      {
        id: "att-001",
        name: "Bukti_Pembayaran_SPP_Semester_5.pdf",
        uploadDate: "2023-08-15T09:25:00Z",
      },
      {
        id: "att-002",
        name: "KTM_Ahmad_Fauzi.jpg",
        uploadDate: "2023-08-15T09:26:00Z",
      },
    ],
  },
  {
    id: "letter-002",
    type: "active_student",
    title: "Surat Keterangan Aktif Kuliah",
    purpose: "Keperluan Administrasi Keluarga",
    description: "Surat keterangan aktif kuliah untuk keperluan administrasi keluarga (asuransi)",
    status: "in-review",
    requestDate: "2023-09-05T13:45:00Z",
    studentId: "std-002",
    studentName: "Siti Nurhaliza",
    studentNIM: "2001234568",
    studentMajor: "Akuntansi",
    approvalRole: "staff_tu",
    additionalInfo: {
      semester: "3",
      purpose: "Keperluan Asuransi Kesehatan Keluarga",
    },
    attachments: [
      {
        id: "att-003",
        name: "Bukti_Pembayaran_SPP_Semester_3.pdf",
        uploadDate: "2023-09-05T13:40:00Z",
      },
    ],
  },
  {
    id: "letter-003",
    type: "active_student",
    title: "Surat Keterangan Aktif Kuliah",
    purpose: "Pengajuan Kartu Indonesia Pintar Kuliah",
    description: "Surat keterangan aktif kuliah untuk keperluan pengajuan KIP Kuliah",
    status: "submitted",
    requestDate: "2023-09-10T10:15:00Z",
    studentId: "std-003",
    studentName: "Budi Pratama",
    studentNIM: "2101234569",
    studentMajor: "Manajemen",
    approvalRole: "staff_tu",
    additionalInfo: {
      semester: "1",
      purpose: "Pengajuan KIP Kuliah 2023",
    },
    attachments: [
      {
        id: "att-004",
        name: "Bukti_Pembayaran_SPP_Semester_1.pdf",
        uploadDate: "2023-09-10T10:10:00Z",
      },
      {
        id: "att-005",
        name: "KTM_Budi_Pratama.jpg",
        uploadDate: "2023-09-10T10:12:00Z",
      },
    ],
  },

  // Leave of Absence Letters
  {
    id: "letter-004",
    type: "leave_absence",
    title: "Surat Cuti Kuliah",
    purpose: "Cuti Sakit",
    description: "Permohonan cuti kuliah selama satu semester karena sakit yang memerlukan perawatan intensif",
    status: "approved",
    requestDate: "2023-07-20T11:30:00Z",
    approvedDate: "2023-07-25T15:45:00Z",
    studentId: "std-004",
    studentName: "Dewi Anggraini",
    studentNIM: "1801234570",
    studentMajor: "Kedokteran",
    approvalRole: "prodi",
    approvedBy: "Dr. Hendra Wijaya, Sp.PD.",
    additionalInfo: {
      startDate: "2023-09-01",
      endDate: "2024-02-28",
      reason: "Harus menjalani perawatan intensif akibat kecelakaan yang dialami pada bulan Juni 2023",
    },
    attachments: [
      {
        id: "att-006",
        name: "Bukti_Pembayaran_SPP.pdf",
        uploadDate: "2023-07-20T11:25:00Z",
      },
      {
        id: "att-007",
        name: "Transkrip_Nilai.pdf",
        uploadDate: "2023-07-20T11:26:00Z",
      },
      {
        id: "att-008",
        name: "Surat_Keterangan_Dokter.pdf",
        uploadDate: "2023-07-20T11:27:00Z",
      },
    ],
  },
  {
    id: "letter-005",
    type: "leave_absence",
    title: "Surat Cuti Kuliah",
    purpose: "Cuti Kerja",
    description: "Permohonan cuti kuliah selama satu semester untuk bekerja di perusahaan multinasional",
    status: "rejected",
    requestDate: "2023-08-05T09:20:00Z",
    studentId: "std-005",
    studentName: "Eko Prasetyo",
    studentNIM: "1701234571",
    studentMajor: "Teknik Elektro",
    approvalRole: "prodi",
    rejectedReason:
      "Alasan cuti untuk bekerja tidak dapat diterima karena mahasiswa masih dalam tahap penyelesaian tugas akhir. Disarankan untuk menyelesaikan studi terlebih dahulu.",
    additionalInfo: {
      startDate: "2023-09-01",
      endDate: "2024-02-28",
      reason: "Mendapatkan tawaran magang berbayar di PT. Global Technology selama 6 bulan",
    },
    attachments: [
      {
        id: "att-009",
        name: "Bukti_Pembayaran_SPP.pdf",
        uploadDate: "2023-08-05T09:15:00Z",
      },
      {
        id: "att-010",
        name: "Transkrip_Nilai.pdf",
        uploadDate: "2023-08-05T09:16:00Z",
      },
      {
        id: "att-011",
        name: "Surat_Tawaran_Kerja.pdf",
        uploadDate: "2023-08-05T09:17:00Z",
      },
    ],
  },

  // Loan Application Letters
  {
    id: "letter-006",
    type: "loan_application",
    title: "Surat Keterangan untuk Pengajuan Pinjaman",
    purpose: "Pinjaman Pendidikan BNI",
    description: "Surat keterangan untuk pengajuan pinjaman pendidikan di Bank BNI",
    status: "completed",
    requestDate: "2023-08-10T14:30:00Z",
    approvedDate: "2023-08-12T10:15:00Z",
    completedDate: "2023-08-13T11:20:00Z",
    studentId: "std-006",
    studentName: "Fajar Ramadhan",
    studentNIM: "1901234572",
    studentMajor: "Hukum",
    approvalRole: "staff_tu",
    approvedBy: "Siti Aminah, S.E.",
    additionalInfo: {
      bankName: "Bank BNI",
      loanAmount: "Rp 15.000.000",
      loanPurpose: "Biaya kuliah semester ganjil 2023/2024 dan pembelian laptop untuk keperluan perkuliahan",
    },
    attachments: [
      {
        id: "att-012",
        name: "Bukti_Pembayaran_SPP.pdf",
        uploadDate: "2023-08-10T14:25:00Z",
      },
      {
        id: "att-013",
        name: "KTM.jpg",
        uploadDate: "2023-08-10T14:26:00Z",
      },
      {
        id: "att-014",
        name: "KTP.jpg",
        uploadDate: "2023-08-10T14:27:00Z",
      },
      {
        id: "att-015",
        name: "Formulir_Pengajuan_Pinjaman_BNI.pdf",
        uploadDate: "2023-08-10T14:28:00Z",
      },
    ],
  },
  {
    id: "letter-007",
    type: "loan_application",
    title: "Surat Keterangan untuk Pengajuan Pinjaman",
    purpose: "KUR Bank Mandiri",
    description: "Surat keterangan untuk pengajuan Kredit Usaha Rakyat di Bank Mandiri",
    status: "in-review",
    requestDate: "2023-09-08T11:45:00Z",
    studentId: "std-007",
    studentName: "Gita Savitri",
    studentNIM: "1801234573",
    studentMajor: "Manajemen Bisnis",
    approvalRole: "staff_tu",
    additionalInfo: {
      bankName: "Bank Mandiri",
      loanAmount: "Rp 20.000.000",
      loanPurpose: "Modal usaha online shop yang dijalankan selama kuliah untuk membantu biaya pendidikan",
    },
    attachments: [
      {
        id: "att-016",
        name: "Bukti_Pembayaran_SPP.pdf",
        uploadDate: "2023-09-08T11:40:00Z",
      },
      {
        id: "att-017",
        name: "KTM.jpg",
        uploadDate: "2023-09-08T11:41:00Z",
      },
      {
        id: "att-018",
        name: "KTP.jpg",
        uploadDate: "2023-09-08T11:42:00Z",
      },
      {
        id: "att-019",
        name: "Proposal_Usaha.pdf",
        uploadDate: "2023-09-08T11:43:00Z",
      },
    ],
  },

  // Tuition Extension Letters
  {
    id: "letter-008",
    type: "tuition_extension",
    title: "Surat Permohonan Perpanjangan Pembayaran SPP",
    purpose: "Perpanjangan Pembayaran SPP Semester Ganjil",
    description: "Permohonan perpanjangan waktu pembayaran SPP semester ganjil 2023/2024",
    status: "approved",
    requestDate: "2023-08-25T10:30:00Z",
    approvedDate: "2023-08-27T14:15:00Z",
    studentId: "std-008",
    studentName: "Hadi Santoso",
    studentNIM: "2001234574",
    studentMajor: "Teknik Sipil",
    approvalRole: "staff_tu",
    approvedBy: "Siti Aminah, S.E.",
    additionalInfo: {
      currentDueDate: "2023-08-31",
      requestedDueDate: "2023-09-30",
      reason:
        "Menunggu pencairan dana beasiswa dari perusahaan tempat orang tua bekerja yang baru akan cair pada pertengahan September 2023",
    },
    attachments: [
      {
        id: "att-020",
        name: "Surat_Pernyataan_Kesanggupan_Membayar.pdf",
        uploadDate: "2023-08-25T10:25:00Z",
      },
      {
        id: "att-021",
        name: "Surat_Keterangan_Beasiswa_Tertunda.pdf",
        uploadDate: "2023-08-25T10:26:00Z",
      },
    ],
  },
  {
    id: "letter-009",
    type: "tuition_extension",
    title: "Surat Permohonan Perpanjangan Pembayaran SPP",
    purpose: "Perpanjangan Pembayaran SPP Semester Genap",
    description: "Permohonan perpanjangan waktu pembayaran SPP semester genap 2023/2024",
    status: "submitted",
    requestDate: "2023-09-12T15:20:00Z",
    studentId: "std-009",
    studentName: "Indah Permata",
    studentNIM: "1901234575",
    studentMajor: "Psikologi",
    approvalRole: "staff_tu",
    additionalInfo: {
      currentDueDate: "2023-09-15",
      requestedDueDate: "2023-10-15",
      reason:
        "Orang tua baru saja mengalami PHK dan sedang dalam proses mencari pekerjaan baru. Membutuhkan waktu tambahan untuk mengumpulkan biaya kuliah.",
    },
    attachments: [
      {
        id: "att-022",
        name: "Surat_Pernyataan_Kesanggupan_Membayar.pdf",
        uploadDate: "2023-09-12T15:15:00Z",
      },
      {
        id: "att-023",
        name: "Surat_Keterangan_PHK.pdf",
        uploadDate: "2023-09-12T15:16:00Z",
      },
    ],
  },

  // Internship Recommendation Letters
  {
    id: "letter-010",
    type: "internship_recommendation",
    title: "Surat Rekomendasi Magang",
    purpose: "Magang di PT Telkom Indonesia",
    description: "Surat rekomendasi untuk program magang di PT Telkom Indonesia",
    status: "completed",
    requestDate: "2023-07-15T09:45:00Z",
    approvedDate: "2023-07-17T13:30:00Z",
    completedDate: "2023-07-18T10:20:00Z",
    studentId: "std-010",
    studentName: "Joko Widodo",
    studentNIM: "1801234576",
    studentMajor: "Teknik Telekomunikasi",
    approvalRole: "prodi",
    approvedBy: "Dr. Bambang Suprapto, M.T.",
    additionalInfo: {
      companyName: "PT Telkom Indonesia",
      companyAddress: "Jl. Gatot Subroto Kav. 52, Jakarta Selatan",
      internshipPeriod: "Agustus - Desember 2023",
    },
    attachments: [
      {
        id: "att-024",
        name: "Transkrip_Nilai.pdf",
        uploadDate: "2023-07-15T09:40:00Z",
      },
      {
        id: "att-025",
        name: "CV.pdf",
        uploadDate: "2023-07-15T09:41:00Z",
      },
      {
        id: "att-026",
        name: "Surat_Penerimaan_Magang.pdf",
        uploadDate: "2023-07-15T09:42:00Z",
      },
    ],
  },
  {
    id: "letter-011",
    type: "internship_recommendation",
    title: "Surat Rekomendasi Magang",
    purpose: "Magang di Gojek",
    description: "Surat rekomendasi untuk program magang di Gojek",
    status: "in-review",
    requestDate: "2023-09-01T13:15:00Z",
    studentId: "std-011",
    studentName: "Kevin Anggara",
    studentNIM: "1901234577",
    studentMajor: "Teknik Informatika",
    approvalRole: "prodi",
    additionalInfo: {
      companyName: "Gojek",
      companyAddress: "Pasaraya Blok M Gedung B Lt. 6, Jl. Iskandarsyah II No.7, Jakarta Selatan",
      internshipPeriod: "Oktober 2023 - Maret 2024",
    },
    attachments: [
      {
        id: "att-027",
        name: "Transkrip_Nilai.pdf",
        uploadDate: "2023-09-01T13:10:00Z",
      },
      {
        id: "att-028",
        name: "CV.pdf",
        uploadDate: "2023-09-01T13:11:00Z",
      },
      {
        id: "att-029",
        name: "Portfolio.pdf",
        uploadDate: "2023-09-01T13:12:00Z",
      },
    ],
  },

  // Scholarship Recommendation Letters
  {
    id: "letter-012",
    type: "scholarship_recommendation",
    title: "Surat Rekomendasi Beasiswa",
    purpose: "Beasiswa LPDP",
    description: "Surat rekomendasi untuk pengajuan Beasiswa LPDP",
    status: "completed",
    requestDate: "2023-06-10T10:30:00Z",
    approvedDate: "2023-06-12T15:45:00Z",
    completedDate: "2023-06-13T09:20:00Z",
    studentId: "std-012",
    studentName: "Lina Mariani",
    studentNIM: "1701234578",
    studentMajor: "Hubungan Internasional",
    approvalRole: "staff_tu",
    approvedBy: "Dr. Haryanto, M.Si.",
    additionalInfo: {
      scholarshipName: "Beasiswa LPDP",
      scholarshipProvider: "Kementerian Keuangan RI",
      achievements:
        "Juara 1 Debat Bahasa Inggris Tingkat Nasional 2022, Penulis Artikel Jurnal Internasional, Ketua BEM Fakultas 2021-2022",
    },
    attachments: [
      {
        id: "att-030",
        name: "Transkrip_Nilai.pdf",
        uploadDate: "2023-06-10T10:25:00Z",
      },
      {
        id: "att-031",
        name: "CV.pdf",
        uploadDate: "2023-06-10T10:26:00Z",
      },
      {
        id: "att-032",
        name: "Sertifikat_Prestasi.pdf",
        uploadDate: "2023-06-10T10:27:00Z",
      },
    ],
  },
  {
    id: "letter-013",
    type: "scholarship_recommendation",
    title: "Surat Rekomendasi Beasiswa",
    purpose: "Beasiswa Bank Indonesia",
    description: "Surat rekomendasi untuk pengajuan Beasiswa Bank Indonesia",
    status: "submitted",
    requestDate: "2023-09-07T11:20:00Z",
    studentId: "std-013",
    studentName: "Muhammad Rizki",
    studentNIM: "2001234579",
    studentMajor: "Ekonomi Pembangunan",
    approvalRole: "staff_tu",
    additionalInfo: {
      scholarshipName: "Beasiswa Bank Indonesia",
      scholarshipProvider: "Bank Indonesia",
      achievements: "IPK 3.85, Asisten Dosen Mata Kuliah Ekonomi Makro, Juara 2 Lomba Karya Tulis Ilmiah Ekonomi 2022",
    },
    attachments: [
      {
        id: "att-033",
        name: "Transkrip_Nilai.pdf",
        uploadDate: "2023-09-07T11:15:00Z",
      },
      {
        id: "att-034",
        name: "CV.pdf",
        uploadDate: "2023-09-07T11:16:00Z",
      },
      {
        id: "att-035",
        name: "Sertifikat_Prestasi.pdf",
        uploadDate: "2023-09-07T11:17:00Z",
      },
    ],
  },

  // Transcript Request Letters
  {
    id: "letter-014",
    type: "transcript_request",
    title: "Permohonan Transkrip Nilai",
    purpose: "Melamar Pekerjaan",
    description: "Permohonan transkrip nilai resmi untuk keperluan melamar pekerjaan",
    status: "completed",
    requestDate: "2023-08-20T14:15:00Z",
    approvedDate: "2023-08-21T10:30:00Z",
    completedDate: "2023-08-22T13:45:00Z",
    studentId: "std-014",
    studentName: "Nadia Putri",
    studentNIM: "1701234580",
    studentMajor: "Ilmu Komunikasi",
    approvalRole: "staff_tu",
    approvedBy: "Siti Aminah, S.E.",
    additionalInfo: {
      purpose: "Melamar Pekerjaan",
      copies: 3,
    },
    attachments: [
      {
        id: "att-036",
        name: "Bukti_Pembayaran_SPP.pdf",
        uploadDate: "2023-08-20T14:10:00Z",
      },
      {
        id: "att-037",
        name: "KTM.jpg",
        uploadDate: "2023-08-20T14:11:00Z",
      },
    ],
  },
  {
    id: "letter-015",
    type: "transcript_request",
    title: "Permohonan Transkrip Nilai",
    purpose: "Melanjutkan Studi",
    description: "Permohonan transkrip nilai resmi untuk keperluan melanjutkan studi S2",
    status: "in-review",
    requestDate: "2023-09-09T09:30:00Z",
    studentId: "std-015",
    studentName: "Oscar Pratama",
    studentNIM: "1801234581",
    studentMajor: "Fisika",
    approvalRole: "staff_tu",
    additionalInfo: {
      purpose: "Melanjutkan Studi",
      copies: 5,
    },
    attachments: [
      {
        id: "att-038",
        name: "Bukti_Pembayaran_SPP.pdf",
        uploadDate: "2023-09-09T09:25:00Z",
      },
      {
        id: "att-039",
        name: "KTM.jpg",
        uploadDate: "2023-09-09T09:26:00Z",
      },
    ],
  },

  // Research Permission Letters
  {
    id: "letter-016",
    type: "research_permission",
    title: "Surat Izin Penelitian",
    purpose: "Penelitian Skripsi",
    description: "Surat izin untuk melakukan penelitian skripsi di PT Pertamina",
    status: "approved",
    requestDate: "2023-07-25T11:45:00Z",
    approvedDate: "2023-07-27T14:30:00Z",
    studentId: "std-016",
    studentName: "Putri Rahayu",
    studentNIM: "1701234582",
    studentMajor: "Teknik Kimia",
    approvalRole: "prodi",
    approvedBy: "Dr. Ir. Suryadi, M.T.",
    additionalInfo: {
      researchTitle: "Analisis Efisiensi Katalis dalam Proses Cracking Minyak Bumi",
      researchLocation: "PT Pertamina Refinery Unit IV Cilacap",
      researchPeriod: "Agustus - Oktober 2023",
    },
    attachments: [
      {
        id: "att-040",
        name: "Proposal_Penelitian.pdf",
        uploadDate: "2023-07-25T11:40:00Z",
      },
      {
        id: "att-041",
        name: "Surat_Persetujuan_Pembimbing.pdf",
        uploadDate: "2023-07-25T11:41:00Z",
      },
    ],
  },
  {
    id: "letter-017",
    type: "research_permission",
    title: "Surat Izin Penelitian",
    purpose: "Penelitian Tesis",
    description: "Surat izin untuk melakukan penelitian tesis di RSUD Dr. Soetomo",
    status: "submitted",
    requestDate: "2023-09-11T10:20:00Z",
    studentId: "std-017",
    studentName: "Qori Maulana",
    studentNIM: "1901234583",
    studentMajor: "Kedokteran",
    approvalRole: "prodi",
    additionalInfo: {
      researchTitle:
        "Efektivitas Terapi Kombinasi pada Pasien Diabetes Mellitus Tipe 2 dengan Komplikasi Kardiovaskular",
      researchLocation: "RSUD Dr. Soetomo Surabaya",
      researchPeriod: "Oktober 2023 - Januari 2024",
    },
    attachments: [
      {
        id: "att-042",
        name: "Proposal_Penelitian.pdf",
        uploadDate: "2023-09-11T10:15:00Z",
      },
      {
        id: "att-043",
        name: "Surat_Persetujuan_Pembimbing.pdf",
        uploadDate: "2023-09-11T10:16:00Z",
      },
      {
        id: "att-044",
        name: "Ethical_Clearance.pdf",
        uploadDate: "2023-09-11T10:17:00Z",
      },
    ],
  },

  // Graduation Confirmation Letters
  {
    id: "letter-018",
    type: "graduation_confirmation",
    title: "Surat Keterangan Lulus",
    purpose: "Keperluan Melamar Pekerjaan",
    description: "Surat keterangan lulus untuk keperluan melamar pekerjaan sebelum ijazah terbit",
    status: "completed",
    requestDate: "2023-06-15T13:30:00Z",
    approvedDate: "2023-06-16T11:45:00Z",
    completedDate: "2023-06-17T09:30:00Z",
    studentId: "std-018",
    studentName: "Rahmat Hidayat",
    studentNIM: "1601234584",
    studentMajor: "Teknik Mesin",
    approvalRole: "staff_tu",
    approvedBy: "Siti Aminah, S.E.",
    additionalInfo: {
      graduationDate: "2023-05-27",
      gpa: "3.78",
      thesisTitle: "Optimasi Desain Turbin Angin Sumbu Vertikal untuk Aplikasi Perkotaan",
    },
    attachments: [
      {
        id: "att-045",
        name: "Bukti_Bebas_Tanggungan_Perpustakaan.pdf",
        uploadDate: "2023-06-15T13:25:00Z",
      },
      {
        id: "att-046",
        name: "Bukti_Bebas_Tanggungan_Laboratorium.pdf",
        uploadDate: "2023-06-15T13:26:00Z",
      },
      {
        id: "att-047",
        name: "Bukti_Bebas_Tanggungan_Keuangan.pdf",
        uploadDate: "2023-06-15T13:27:00Z",
      },
    ],
  },
  {
    id: "letter-019",
    type: "graduation_confirmation",
    title: "Surat Keterangan Lulus",
    purpose: "Keperluan Melanjutkan Studi",
    description: "Surat keterangan lulus untuk keperluan mendaftar program magister",
    status: "in-review",
    requestDate: "2023-09-03T15:45:00Z",
    studentId: "std-019",
    studentName: "Sinta Dewi",
    studentNIM: "1701234585",
    studentMajor: "Biologi",
    approvalRole: "staff_tu",
    additionalInfo: {
      graduationDate: "2023-08-26",
      gpa: "3.92",
      thesisTitle: "Identifikasi dan Karakterisasi Bakteri Penghasil Enzim Selulase dari Limbah Pertanian",
    },
    attachments: [
      {
        id: "att-048",
        name: "Bukti_Bebas_Tanggungan_Perpustakaan.pdf",
        uploadDate: "2023-09-03T15:40:00Z",
      },
      {
        id: "att-049",
        name: "Bukti_Bebas_Tanggungan_Laboratorium.pdf",
        uploadDate: "2023-09-03T15:41:00Z",
      },
      {
        id: "att-050",
        name: "Bukti_Bebas_Tanggungan_Keuangan.pdf",
        uploadDate: "2023-09-03T15:42:00Z",
      },
    ],
  },

  // Additional recent submissions
  {
    id: "letter-020",
    type: "active_student",
    title: "Surat Keterangan Aktif Kuliah",
    purpose: "Pengajuan Visa Studi",
    description: "Surat keterangan aktif kuliah untuk keperluan pengajuan visa program pertukaran pelajar",
    status: "submitted",
    requestDate: "2023-09-14T08:30:00Z",
    studentId: "std-020",
    studentName: "Taufik Rahman",
    studentNIM: "1901234586",
    studentMajor: "Sastra Inggris",
    approvalRole: "staff_tu",
    additionalInfo: {
      semester: "5",
      purpose: "Pengajuan Visa Program Pertukaran Pelajar ke University of Melbourne",
    },
    attachments: [
      {
        id: "att-051",
        name: "Bukti_Pembayaran_SPP.pdf",
        uploadDate: "2023-09-14T08:25:00Z",
      },
      {
        id: "att-052",
        name: "KTM.jpg",
        uploadDate: "2023-09-14T08:26:00Z",
      },
      {
        id: "att-053",
        name: "Letter_of_Acceptance.pdf",
        uploadDate: "2023-09-14T08:27:00Z",
      },
    ],
  },
  {
    id: "letter-021",
    type: "scholarship_recommendation",
    title: "Surat Rekomendasi Beasiswa",
    purpose: "Beasiswa Unggulan Kemendikbud",
    description: "Surat rekomendasi untuk pengajuan Beasiswa Unggulan Kemendikbud",
    status: "submitted",
    requestDate: "2023-09-15T09:15:00Z",
    studentId: "std-021",
    studentName: "Umi Kalsum",
    studentNIM: "2001234587",
    studentMajor: "Pendidikan Matematika",
    approvalRole: "staff_tu",
    additionalInfo: {
      scholarshipName: "Beasiswa Unggulan Kemendikbud",
      scholarshipProvider: "Kementerian Pendidikan dan Kebudayaan",
      achievements: "IPK 3.95, Juara 1 Olimpiade Matematika Tingkat Nasional 2022, Asisten Dosen untuk 3 mata kuliah",
    },
    attachments: [
      {
        id: "att-054",
        name: "Transkrip_Nilai.pdf",
        uploadDate: "2023-09-15T09:10:00Z",
      },
      {
        id: "att-055",
        name: "CV.pdf",
        uploadDate: "2023-09-15T09:11:00Z",
      },
      {
        id: "att-056",
        name: "Sertifikat_Prestasi.pdf",
        uploadDate: "2023-09-15T09:12:00Z",
      },
    ],
  },
]

// Function to get letter requests for approval
export async function getLetterRequestsForApproval(role: string): Promise<LetterRequest[]> {
  // In a real app, this would fetch from a database, filtering by role
  return MOCK_LETTER_REQUESTS.filter((req) => req.approvalRole === role)
}

// Function to get letter requests for a student
export async function getStudentLetterRequests(studentId: string): Promise<LetterRequest[]> {
  // In a real app, this would fetch from a database
  // For now, we'll return mock data
  return MOCK_LETTER_REQUESTS.filter((req) => req.studentId === studentId)
}

// Function to get letter request by ID
export async function getLetterRequestById(requestId: string): Promise<LetterRequest | null> {
  // In a real app, this would fetch from a database
  const request = MOCK_LETTER_REQUESTS.find((req) => req.id === requestId)
  return request || null
}

// Function to submit a new letter request
export async function submitLetterRequest(
  formData: FormData,
): Promise<{ success: boolean; message: string; requestId?: string }> {
  // In a real app, this would save to a database
  // For now, we'll just return a success response
  return {
    success: true,
    message: "Permohonan surat berhasil diajukan",
    requestId: `letter-${Date.now()}`,
  }
}

// Function to update letter request status
export async function updateLetterRequestStatus(
  requestId: string,
  newStatus: LetterStatus,
  notes?: string,
  updatedBy?: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // In a real app, this would update a database record
    const requestIndex = MOCK_LETTER_REQUESTS.findIndex((req) => req.id === requestId)

    if (requestIndex === -1) {
      return { success: false, message: "Permohonan surat tidak ditemukan" }
    }

    // Update the request status
    MOCK_LETTER_REQUESTS[requestIndex].status = newStatus

    // Add notes if provided
    if (notes) {
      MOCK_LETTER_REQUESTS[requestIndex].rejectedReason = notes
    }

    // Update updatedBy if provided
    if (updatedBy) {
      MOCK_LETTER_REQUESTS[requestIndex].approvedBy = updatedBy
    }

    // If status is approved, set approvedDate
    if (newStatus === "approved") {
      MOCK_LETTER_REQUESTS[requestIndex].approvedDate = new Date().toISOString()
    }

    // If status is completed, set completedDate
    if (newStatus === "completed") {
      MOCK_LETTER_REQUESTS[requestIndex].completedDate = new Date().toISOString()
    }

    return {
      success: true,
      message: `Status permohonan surat berhasil diperbarui menjadi ${newStatus}`,
    }
  } catch (error) {
    console.error("Error updating letter request status:", error)
    return { success: false, message: "Gagal memperbarui status permohonan surat" }
  }
}

// Function to delete a letter request
export async function deleteLetterRequest(requestId: string): Promise<{ success: boolean; message: string }> {
  try {
    // In a real app, this would delete from a database
    const requestIndex = MOCK_LETTER_REQUESTS.findIndex((req) => req.id === requestId)

    if (requestIndex === -1) {
      return { success: false, message: "Permohonan surat tidak ditemukan" }
    }

    // Check if the request can be deleted (only draft or rejected)
    const request = MOCK_LETTER_REQUESTS[requestIndex]
    if (request.status !== "draft" && request.status !== "rejected") {
      return {
        success: false,
        message: "Hanya permohonan dengan status draft atau ditolak yang dapat dihapus",
      }
    }

    // Remove the request
    MOCK_LETTER_REQUESTS.splice(requestIndex, 1)

    return {
      success: true,
      message: "Permohonan surat berhasil dihapus",
    }
  } catch (error) {
    console.error("Error deleting letter request:", error)
    return { success: false, message: "Gagal menghapus permohonan surat" }
  }
}

