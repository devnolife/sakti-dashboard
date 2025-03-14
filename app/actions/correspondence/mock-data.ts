import { LetterRequest, LetterStatus } from "@/types/correspondence"

// Create sample mock data for the application
export const MOCK_LETTER_REQUESTS: LetterRequest[] = [
  // Active Student Letters
  {
    id: "letter-001",
    type: "active_student",
    title: "Surat Keterangan Aktif Kuliah",
    purpose: "Pengajuan Beasiswa Djarum",
    description: "Surat keterangan aktif kuliah untuk keperluan pengajuan Beasiswa Djarum periode 2023",
    status: "completed" as LetterStatus,
    requestDate: "2023-08-15T09:30:00Z",
    approvedDate: "2023-08-17T14:20:00Z",
    completedDate: "2023-08-18T10:15:00Z",
    studentId: "std-001",
    studentName: "Ahmad Fauzi",
    studentNIM: "1901234567",
    studentMajor: "Informatika",
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
    notes: undefined
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
    } as Record<string, any>,
    attachments: [
      {
        id: "att-003",
        name: "Bukti_Pembayaran_SPP_Semester_3.pdf",
        uploadDate: "2023-09-05T13:40:00Z",
      },
    ],
    notes: undefined
  },
  // Leave Absence Letter
  {
    id: "letter-004",
    type: "leave_absence",
    title: "Surat Cuti Kuliah",
    purpose: "Cuti Sakit",
    description: "Permohonan cuti kuliah selama satu semester karena sakit yang memerlukan perawatan intensif",
    status: "approved" as LetterStatus,
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
      }
    ],
    notes: undefined
  },
  // Scholarship Recommendation
  {
    id: "letter-012",
    type: "scholarship_recommendation",
    title: "Surat Rekomendasi Beasiswa",
    purpose: "Beasiswa LPDP",
    description: "Surat rekomendasi untuk pengajuan Beasiswa LPDP",
    status: "submitted" as LetterStatus,
    requestDate: "2023-06-10T10:30:00Z",
    studentId: "std-012",
    studentName: "Lina Mariani",
    studentNIM: "1701234578",
    studentMajor: "Hubungan Internasional",
    approvalRole: "staff_tu",
    additionalInfo: {
      scholarshipName: "Beasiswa LPDP",
      scholarshipProvider: "Kementerian Keuangan RI",
      achievements: "Juara 1 Debat Bahasa Inggris Tingkat Nasional 2022"
    },
    attachments: [
      {
        id: "att-030",
        name: "Transkrip_Nilai.pdf",
        uploadDate: "2023-06-10T10:25:00Z",
      }
    ],
    notes: undefined
  }
] 
