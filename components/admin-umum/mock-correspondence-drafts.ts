import type { CorrespondenceDraft, DraftTemplate } from "@/types/correspondence-draft"

export const mockDrafts: CorrespondenceDraft[] = [
  {
    id: "draft-001",
    title: "Surat Keterangan Aktif Kuliah",
    type: "Surat Keterangan",
    content: `<p>Yang bertanda tangan di bawah ini:</p>
    <p>Nama: Dr. Budi Santoso, M.Pd.<br>
    Jabatan: Dekan Fakultas Teknik<br>
    Institusi: Universitas Teknologi Indonesia</p>
    <p>Dengan ini menerangkan bahwa:</p>
    <p>Nama: [NAMA_MAHASISWA]<br>
    NIM: [NIM_MAHASISWA]<br>
    Program Studi: [PRODI_MAHASISWA]<br>
    Fakultas: Teknik</p>
    <p>adalah benar mahasiswa aktif pada semester [SEMESTER] tahun akademik [TAHUN_AKADEMIK].</p>
    <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>`,
    createdAt: "2023-11-15T08:30:00Z",
    updatedAt: "2023-11-15T10:45:00Z",
    createdBy: "Administrasi Umum",
    status: "draft",
    version: 1,
    recipients: ["Mahasiswa", "Arsip"],
    metadata: {
      department: "Teknik Informatika",
      semester: "Ganjil 2023/2024",
    },
  },
  {
    id: "draft-002",
    title: "Undangan Rapat Koordinasi Dosen",
    type: "Undangan",
    content: `<p>Kepada Yth.<br>
    Bapak/Ibu Dosen<br>
    Fakultas Teknik<br>
    Universitas Teknologi Indonesia</p>
    <p>Dengan hormat,</p>
    <p>Kami mengundang Bapak/Ibu untuk menghadiri Rapat Koordinasi Dosen yang akan dilaksanakan pada:</p>
    <p>Hari/Tanggal: Senin, 20 November 2023<br>
    Waktu: 09.00 - 12.00 WIB<br>
    Tempat: Ruang Rapat Utama Fakultas Teknik<br>
    Agenda: Persiapan Semester Genap 2023/2024</p>
    <p>Mengingat pentingnya acara tersebut, kehadiran Bapak/Ibu sangat diharapkan.</p>
    <p>Demikian undangan ini kami sampaikan. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.</p>`,
    createdAt: "2023-11-16T09:15:00Z",
    updatedAt: "2023-11-16T14:20:00Z",
    createdBy: "Administrasi Umum",
    status: "review",
    reviewedBy: "Kepala Bagian Umum",
    version: 2,
    previousVersions: ["draft-002-v1"],
    recipients: ["Semua Dosen Fakultas Teknik"],
  },
  {
    id: "draft-003",
    title: "Surat Permohonan Dana Kegiatan Mahasiswa",
    type: "Surat Permohonan",
    content: `<p>Kepada Yth.<br>
    Wakil Dekan II Bidang Keuangan<br>
    Fakultas Teknik<br>
    Universitas Teknologi Indonesia</p>
    <p>Dengan hormat,</p>
    <p>Sehubungan dengan akan dilaksanakannya kegiatan [NAMA_KEGIATAN] yang diselenggarakan oleh [ORGANISASI_MAHASISWA] pada tanggal [TANGGAL_KEGIATAN], dengan ini kami mengajukan permohonan dana sebesar Rp [JUMLAH_DANA] untuk keperluan pelaksanaan kegiatan tersebut.</p>
    <p>Adapun rincian penggunaan dana terlampir dalam proposal kegiatan yang kami sertakan.</p>
    <p>Demikian surat permohonan ini kami sampaikan. Atas perhatian dan bantuan Bapak/Ibu, kami ucapkan terima kasih.</p>`,
    createdAt: "2023-11-17T11:00:00Z",
    updatedAt: "2023-11-17T13:30:00Z",
    createdBy: "Administrasi Umum",
    status: "approved",
    reviewedBy: "Kepala Bagian Umum",
    reviewedAt: "2023-11-18T09:45:00Z",
    version: 1,
    attachments: [
      {
        id: "att-001",
        name: "Proposal Kegiatan.pdf",
        url: "/documents/proposal-kegiatan.pdf",
        size: 2500000,
        type: "application/pdf",
      },
    ],
    recipients: ["Wakil Dekan II", "Arsip"],
  },
  {
    id: "draft-004",
    title: "Surat Keterangan Lulus",
    type: "Surat Keterangan",
    content: `<p>Yang bertanda tangan di bawah ini:</p>
    <p>Nama: Dr. Budi Santoso, M.Pd.<br>
    Jabatan: Dekan Fakultas Teknik<br>
    Institusi: Universitas Teknologi Indonesia</p>
    <p>Dengan ini menerangkan bahwa:</p>
    <p>Nama: [NAMA_MAHASISWA]<br>
    NIM: [NIM_MAHASISWA]<br>
    Program Studi: [PRODI_MAHASISWA]<br>
    Fakultas: Teknik</p>
    <p>telah dinyatakan LULUS pada Program Studi [PRODI_MAHASISWA] Fakultas Teknik Universitas Teknologi Indonesia pada tanggal [TANGGAL_LULUS] dengan predikat [PREDIKAT].</p>
    <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>`,
    createdAt: "2023-11-18T10:20:00Z",
    updatedAt: "2023-11-18T15:40:00Z",
    createdBy: "Administrasi Umum",
    status: "finalized",
    reviewedBy: "Dekan",
    reviewedAt: "2023-11-19T08:30:00Z",
    version: 3,
    previousVersions: ["draft-004-v1", "draft-004-v2"],
    recipients: ["Mahasiswa", "Arsip", "BAAK"],
  },
  {
    id: "draft-005",
    title: "Surat Pengantar Magang",
    type: "Surat Pengantar",
    content: `<p>Nomor: [NOMOR_SURAT]/FT/UTI/[BULAN]/[TAHUN]</p>
    <p>Kepada Yth.<br>
    [NAMA_PERUSAHAAN]<br>
    [ALAMAT_PERUSAHAAN]</p>
    <p>Dengan hormat,</p>
    <p>Dalam rangka memenuhi persyaratan kurikulum Program Studi [PRODI_MAHASISWA] Fakultas Teknik Universitas Teknologi Indonesia, dengan ini kami memohon kesediaan Bapak/Ibu untuk menerima mahasiswa kami berikut ini untuk melaksanakan magang/praktik kerja di perusahaan yang Bapak/Ibu pimpin:</p>
    <p>Nama: [NAMA_MAHASISWA]<br>
    NIM: [NIM_MAHASISWA]<br>
    Program Studi: [PRODI_MAHASISWA]</p>
    <p>Adapun pelaksanaan magang/praktik kerja tersebut direncanakan selama [DURASI_MAGANG] bulan, mulai tanggal [TANGGAL_MULAI] sampai dengan [TANGGAL_SELESAI].</p>
    <p>Demikian surat pengantar ini kami sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.</p>`,
    createdAt: "2023-11-19T09:00:00Z",
    updatedAt: "2023-11-19T11:25:00Z",
    createdBy: "Administrasi Umum",
    status: "rejected",
    reviewedBy: "Kepala Bagian Umum",
    reviewedAt: "2023-11-20T10:15:00Z",
    comments: "Perlu perbaikan format dan penambahan informasi kontak mahasiswa",
    version: 1,
    recipients: ["Perusahaan Tujuan", "Mahasiswa", "Arsip"],
  },
  {
    id: "draft-006",
    title: "Pengumuman Jadwal Ujian Akhir Semester",
    type: "Pengumuman",
    content: `<p>PENGUMUMAN<br>
    Nomor: [NOMOR_PENGUMUMAN]/FT/UTI/[BULAN]/[TAHUN]</p>
    <p>Diberitahukan kepada seluruh mahasiswa Fakultas Teknik Universitas Teknologi Indonesia bahwa Ujian Akhir Semester (UAS) Semester Ganjil Tahun Akademik 2023/2024 akan dilaksanakan pada:</p>
    <p>Tanggal: 4 - 15 Desember 2023<br>
    Waktu: Sesuai jadwal yang telah ditentukan<br>
    Tempat: Ruang kuliah Fakultas Teknik</p>
    <p>Jadwal detail UAS dapat dilihat pada papan pengumuman fakultas atau website resmi universitas.</p>
    <p>Demikian pengumuman ini disampaikan untuk diketahui dan dilaksanakan sebagaimana mestinya.</p>`,
    createdAt: "2023-11-20T13:45:00Z",
    updatedAt: "2023-11-20T16:30:00Z",
    createdBy: "Administrasi Umum",
    status: "draft",
    version: 2,
    previousVersions: ["draft-006-v1"],
    recipients: ["Seluruh Mahasiswa Fakultas Teknik", "Dosen", "Arsip"],
  },
]

export const mockTemplates: DraftTemplate[] = [
  {
    id: "template-001",
    name: "Surat Keterangan Aktif Kuliah",
    description: "Template untuk surat keterangan mahasiswa aktif",
    content: `<p>Yang bertanda tangan di bawah ini:</p>
    <p>Nama: [NAMA_PENANDATANGAN]<br>
    Jabatan: [JABATAN_PENANDATANGAN]<br>
    Institusi: Universitas Teknologi Indonesia</p>
    <p>Dengan ini menerangkan bahwa:</p>
    <p>Nama: [NAMA_MAHASISWA]<br>
    NIM: [NIM_MAHASISWA]<br>
    Program Studi: [PRODI_MAHASISWA]<br>
    Fakultas: [FAKULTAS_MAHASISWA]</p>
    <p>adalah benar mahasiswa aktif pada semester [SEMESTER] tahun akademik [TAHUN_AKADEMIK].</p>
    <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>`,
    category: "Surat Keterangan",
    tags: ["mahasiswa", "aktif", "keterangan"],
    createdAt: "2023-10-01T08:00:00Z",
    updatedAt: "2023-10-01T08:00:00Z",
    createdBy: "Admin",
    isDefault: true,
    placeholders: [
      "NAMA_PENANDATANGAN",
      "JABATAN_PENANDATANGAN",
      "NAMA_MAHASISWA",
      "NIM_MAHASISWA",
      "PRODI_MAHASISWA",
      "FAKULTAS_MAHASISWA",
      "SEMESTER",
      "TAHUN_AKADEMIK",
    ],
  },
  {
    id: "template-002",
    name: "Undangan Rapat",
    description: "Template untuk undangan rapat",
    content: `<p>Kepada Yth.<br>
    [PENERIMA]</p>
    <p>Dengan hormat,</p>
    <p>Kami mengundang Bapak/Ibu untuk menghadiri [JENIS_RAPAT] yang akan dilaksanakan pada:</p>
    <p>Hari/Tanggal: [HARI_TANGGAL]<br>
    Waktu: [WAKTU]<br>
    Tempat: [TEMPAT]<br>
    Agenda: [AGENDA]</p>
    <p>Mengingat pentingnya acara tersebut, kehadiran Bapak/Ibu sangat diharapkan.</p>
    <p>Demikian undangan ini kami sampaikan. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.</p>`,
    category: "Undangan",
    tags: ["undangan", "rapat", "koordinasi"],
    createdAt: "2023-10-02T09:30:00Z",
    updatedAt: "2023-10-02T09:30:00Z",
    createdBy: "Admin",
    isDefault: true,
    placeholders: ["PENERIMA", "JENIS_RAPAT", "HARI_TANGGAL", "WAKTU", "TEMPAT", "AGENDA"],
  },
  {
    id: "template-003",
    name: "Surat Permohonan",
    description: "Template untuk surat permohonan",
    content: `<p>Kepada Yth.<br>
    [PENERIMA]<br>
    [JABATAN_PENERIMA]<br>
    [INSTITUSI_PENERIMA]</p>
    <p>Dengan hormat,</p>
    <p>Sehubungan dengan [ALASAN_PERMOHONAN], dengan ini kami mengajukan permohonan [JENIS_PERMOHONAN].</p>
    <p>[DETAIL_PERMOHONAN]</p>
    <p>Demikian surat permohonan ini kami sampaikan. Atas perhatian dan bantuan Bapak/Ibu, kami ucapkan terima kasih.</p>`,
    category: "Surat Permohonan",
    tags: ["permohonan", "izin", "bantuan"],
    createdAt: "2023-10-03T10:45:00Z",
    updatedAt: "2023-10-03T10:45:00Z",
    createdBy: "Admin",
    isDefault: true,
    placeholders: [
      "PENERIMA",
      "JABATAN_PENERIMA",
      "INSTITUSI_PENERIMA",
      "ALASAN_PERMOHONAN",
      "JENIS_PERMOHONAN",
      "DETAIL_PERMOHONAN",
    ],
  },
  {
    id: "template-004",
    name: "Pengumuman",
    description: "Template untuk pengumuman",
    content: `<p>PENGUMUMAN<br>
    Nomor: [NOMOR_PENGUMUMAN]</p>
    <p>Diberitahukan kepada [PENERIMA_PENGUMUMAN] bahwa [ISI_PENGUMUMAN]</p>
    <p>[DETAIL_PENGUMUMAN]</p>
    <p>Demikian pengumuman ini disampaikan untuk diketahui dan dilaksanakan sebagaimana mestinya.</p>`,
    category: "Pengumuman",
    tags: ["pengumuman", "informasi", "pemberitahuan"],
    createdAt: "2023-10-04T11:15:00Z",
    updatedAt: "2023-10-04T11:15:00Z",
    createdBy: "Admin",
    isDefault: true,
    placeholders: ["NOMOR_PENGUMUMAN", "PENERIMA_PENGUMUMAN", "ISI_PENGUMUMAN", "DETAIL_PENGUMUMAN"],
  },
  {
    id: "template-005",
    name: "Surat Keterangan Lulus",
    description: "Template untuk surat keterangan lulus",
    content: `<p>Yang bertanda tangan di bawah ini:</p>
    <p>Nama: [NAMA_PENANDATANGAN]<br>
    Jabatan: [JABATAN_PENANDATANGAN]<br>
    Institusi: Universitas Teknologi Indonesia</p>
    <p>Dengan ini menerangkan bahwa:</p>
    <p>Nama: [NAMA_MAHASISWA]<br>
    NIM: [NIM_MAHASISWA]<br>
    Program Studi: [PRODI_MAHASISWA]<br>
    Fakultas: [FAKULTAS_MAHASISWA]</p>
    <p>telah dinyatakan LULUS pada Program Studi [PRODI_MAHASISWA] Fakultas [FAKULTAS_MAHASISWA] Universitas Teknologi Indonesia pada tanggal [TANGGAL_LULUS] dengan predikat [PREDIKAT].</p>
    <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>`,
    category: "Surat Keterangan",
    tags: ["mahasiswa", "lulus", "keterangan"],
    createdAt: "2023-10-05T13:30:00Z",
    updatedAt: "2023-10-05T13:30:00Z",
    createdBy: "Admin",
    isDefault: true,
    placeholders: [
      "NAMA_PENANDATANGAN",
      "JABATAN_PENANDATANGAN",
      "NAMA_MAHASISWA",
      "NIM_MAHASISWA",
      "PRODI_MAHASISWA",
      "FAKULTAS_MAHASISWA",
      "TANGGAL_LULUS",
      "PREDIKAT",
    ],
  },
]

export const draftStats = {
  total: 15,
  draft: 6,
  review: 4,
  approved: 3,
  rejected: 1,
  finalized: 1,
  byType: {
    "Surat Keterangan": 5,
    Undangan: 3,
    "Surat Permohonan": 2,
    Pengumuman: 3,
    "Surat Pengantar": 2,
  },
}

