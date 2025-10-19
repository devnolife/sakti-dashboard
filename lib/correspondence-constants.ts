// Helper constants for correspondence without "use server" directive
// This file can be imported by client components

export const DEFAULT_LETTER_TYPES = {
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
  survey: {
    title: "Surat Pengantar Survey",
    description: "Surat pengantar untuk kegiatan survey dan penelitian",
    approvalRole: "staff_tu",
    estimatedDays: 5,
    requiredDocuments: ["Proposal penelitian"],
    additionalFields: [
      {
        name: "researchTitle",
        label: "Judul Penelitian",
        type: "text",
        required: true,
      },
      {
        name: "targetLocation",
        label: "Lokasi Survey",
        type: "text",
        required: true,
      },
    ],
  },
}
