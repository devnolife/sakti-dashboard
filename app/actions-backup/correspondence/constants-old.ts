// Letter types with their properties
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
