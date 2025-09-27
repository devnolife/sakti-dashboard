import { PrismaClient, ApprovalRole } from '../../lib/generated/prisma'

export async function seedLetterTypes(prisma: PrismaClient) {
  const letterTypes = [
    {
      title: 'Surat Keterangan Mahasiswa Aktif',
      description: 'Surat keterangan yang menyatakan bahwa mahasiswa masih aktif kuliah',
      approvalRole: ApprovalRole.staff_tu,
      estimatedDays: 1,
      requiredDocuments: ['KTM', 'KRS Semester Aktif'],
      template: `
SURAT KETERANGAN MAHASISWA AKTIF

Yang bertanda tangan di bawah ini:
Nama: {{approver.name}}
Jabatan: {{approver.position}}

Dengan ini menerangkan bahwa:
Nama: {{student.name}}
NIM: {{student.nim}}
Program Studi: {{student.major}}
Semester: {{student.semester}}

Adalah benar mahasiswa aktif di Fakultas Teknik Universitas Sriwijaya.

Demikian surat keterangan ini dibuat untuk dapat digunakan sebagaimana mestinya.
      `,
      isActive: true
    },
    {
      title: 'Surat Pengantar KKP/Magang',
      description: 'Surat pengantar untuk mahasiswa yang akan melaksanakan KKP atau magang',
      approvalRole: ApprovalRole.prodi,
      estimatedDays: 3,
      requiredDocuments: ['Proposal KKP', 'CV', 'Transkrip Nilai'],
      additionalFields: [
        { name: 'company_name', label: 'Nama Perusahaan', type: 'text', required: true },
        { name: 'company_address', label: 'Alamat Perusahaan', type: 'textarea', required: true },
        { name: 'kkp_period', label: 'Periode KKP', type: 'text', required: true }
      ],
      template: `
SURAT PENGANTAR KERJA KERJA PROFESI (KKP)

Kepada Yth.
{{company_name}}
{{company_address}}

Dengan hormat,
Kami dari Fakultas Teknik Universitas Sriwijaya bermaksud untuk mengirimkan mahasiswa kami:

Nama: {{student.name}}
NIM: {{student.nim}}
Program Studi: {{student.major}}

Untuk melaksanakan Kerja Kerja Profesi (KKP) di perusahaan yang Bapak/Ibu pimpin dalam periode {{kkp_period}}.

Demikian surat pengantar ini kami sampaikan, atas perhatian dan kerjasamanya kami ucapkan terima kasih.
      `,
      isActive: true
    },
    {
      title: 'Surat Keterangan Lulus/Bebas Laboratorium',
      description: 'Surat keterangan bahwa mahasiswa telah menyelesaikan semua praktikum laboratorium',
      approvalRole: ApprovalRole.staff_tu,
      estimatedDays: 2,
      requiredDocuments: ['Kartu Kontrol Laboratorium', 'Bukti Pembayaran Lab'],
      additionalFields: [
        { name: 'lab_courses', label: 'Mata Kuliah Laboratorium', type: 'textarea', required: true }
      ],
      template: `
SURAT KETERANGAN BEBAS LABORATORIUM

Yang bertanda tangan di bawah ini menerangkan bahwa:

Nama: {{student.name}}
NIM: {{student.nim}}
Program Studi: {{student.major}}

Telah menyelesaikan seluruh kegiatan praktikum laboratorium untuk mata kuliah:
{{lab_courses}}

Dan dinyatakan BEBAS LABORATORIUM.

Surat keterangan ini berlaku untuk keperluan administrasi akademik.
      `,
      isActive: true
    },
    {
      title: 'Surat Keterangan Penelitian/Tugas Akhir',
      description: 'Surat keterangan untuk keperluan penelitian tugas akhir/skripsi',
      approvalRole: ApprovalRole.prodi,
      estimatedDays: 5,
      requiredDocuments: ['Proposal Penelitian', 'Form Bimbingan', 'Transkrip Nilai'],
      additionalFields: [
        { name: 'research_title', label: 'Judul Penelitian', type: 'text', required: true },
        { name: 'research_location', label: 'Lokasi Penelitian', type: 'text', required: true },
        { name: 'supervisor_name', label: 'Nama Pembimbing', type: 'text', required: true }
      ],
      template: `
SURAT KETERANGAN PENELITIAN

Kepada Yth.
{{research_location}}

Yang bertanda tangan di bawah ini menerangkan bahwa mahasiswa:

Nama: {{student.name}}
NIM: {{student.nim}}
Program Studi: {{student.major}}
Pembimbing: {{supervisor_name}}

Sedang melaksanakan penelitian dengan judul "{{research_title}}" dalam rangka penyelesaian tugas akhir.

Untuk itu kami mohon bantuan dan fasilitas yang diperlukan.
      `,
      isActive: true
    },
    {
      title: 'Surat Pengantar Beasiswa',
      description: 'Surat pengantar untuk pengajuan beasiswa',
      approvalRole: ApprovalRole.dekan,
      estimatedDays: 7,
      requiredDocuments: ['Transkrip Nilai', 'Surat Keterangan Tidak Mampu', 'Sertifikat Prestasi'],
      additionalFields: [
        { name: 'scholarship_type', label: 'Jenis Beasiswa', type: 'text', required: true },
        { name: 'gpa', label: 'IPK', type: 'number', required: true },
        { name: 'achievements', label: 'Prestasi yang Diraih', type: 'textarea', required: false }
      ],
      template: `
SURAT PENGANTAR BEASISWA

Kepada Yth.
Penyelenggara Beasiswa {{scholarship_type}}

Yang bertanda tangan di bawah ini menerangkan bahwa mahasiswa:

Nama: {{student.name}}
NIM: {{student.nim}}
Program Studi: {{student.major}}
IPK: {{gpa}}

Adalah mahasiswa yang aktif dan berprestasi di Fakultas Teknik Universitas Sriwijaya.

Prestasi yang telah diraih:
{{achievements}}

Kami merekomendasikan mahasiswa tersebut untuk mendapatkan beasiswa {{scholarship_type}}.
      `,
      isActive: true
    },
    {
      title: 'Surat Keterangan Mengikuti Organisasi',
      description: 'Surat keterangan keaktifan mahasiswa dalam organisasi kemahasiswaan',
      approvalRole: ApprovalRole.staff_tu,
      estimatedDays: 2,
      requiredDocuments: ['Surat Keterangan dari Organisasi', 'Bukti Kegiatan'],
      additionalFields: [
        { name: 'organization_name', label: 'Nama Organisasi', type: 'text', required: true },
        { name: 'position', label: 'Jabatan dalam Organisasi', type: 'text', required: true },
        { name: 'period', label: 'Periode Keaktifan', type: 'text', required: true }
      ],
      template: `
SURAT KETERANGAN ORGANISASI

Yang bertanda tangan di bawah ini menerangkan bahwa:

Nama: {{student.name}}
NIM: {{student.nim}}
Program Studi: {{student.major}}

Adalah anggota aktif organisasi {{organization_name}} dengan jabatan {{position}} dalam periode {{period}}.

Mahasiswa tersebut menunjukkan dedikasi dan kontribusi positif dalam kegiatan organisasi.
      `,
      isActive: true
    }
  ]

  const createdTypes = []
  for (const letterType of letterTypes) {
    const created = await prisma.letterType.create({
      data: letterType
    })
    createdTypes.push(created)
  }

  console.log(`✅ Created ${createdTypes.length} letter types`)
  return createdTypes
}