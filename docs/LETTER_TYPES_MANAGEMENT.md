# Manajemen Jenis Surat - Admin Umum

## Deskripsi
Sistem manajemen jenis surat memungkinkan Admin Umum untuk membuat, mengedit, dan mengelola jenis-jenis surat yang dapat diakses oleh mahasiswa dan dosen.

## Fitur Utama

### 1. **Tambah Jenis Surat Baru**
Admin Umum dapat membuat jenis surat custom dengan field:
- **Judul Surat** (required): Nama jenis surat yang akan ditampilkan
- **Deskripsi** (required): Penjelasan detail tentang surat
- **Pihak yang Menyetujui** (required): Pilih siapa yang akan menyetujui (Dekan, Kaprodi, Admin Umum, Admin Keuangan)
- **Estimasi Hari** (required): Waktu proses pembuatan surat (1-30 hari)
- **Dokumen yang Diperlukan**: Daftar dokumen pendukung (opsional)
- **Template Surat**: Template konten surat (opsional)
- **Berlaku untuk semua prodi**: Checkbox untuk surat global

### 2. **Edit Jenis Surat**
- Ubah informasi jenis surat yang sudah ada
- Aktifkan/nonaktifkan jenis surat
- Ubah status global/per-prodi

### 3. **Hapus Jenis Surat**
- Soft delete - surat akan dinonaktifkan, tidak dihapus permanen
- Surat yang dinonaktifkan tidak akan muncul di pilihan mahasiswa/dosen

### 4. **Search & Filter**
- Cari berdasarkan judul atau deskripsi
- Filter berdasarkan status (Semua, Aktif, Nonaktif)

## Cara Menggunakan

### A. Menambah Jenis Surat Baru

1. Login sebagai Admin Umum
2. Akses menu **Korespondensi > Jenis Surat**
3. Klik tombol **"Tambah Jenis Surat"**
4. Isi form dengan informasi berikut:
   - **Judul Surat**: Contoh: "Surat Keterangan Penelitian"
   - **Deskripsi**: Jelaskan tujuan surat secara detail
   - **Pihak yang Menyetujui**: Pilih dari dropdown
   - **Estimasi Hari**: Masukkan angka 1-30
   - **Dokumen yang Diperlukan**: Pisahkan dengan koma. Contoh: "KTM, Proposal Penelitian, Surat Pengantar"
   - **Template Surat**: (opsional) Template konten dalam format HTML/text
   - Centang **"Berlaku untuk semua prodi"** jika ingin surat berlaku global
5. Klik **"Tambah Jenis Surat"**

### B. Mengedit Jenis Surat

1. Di halaman Jenis Surat, cari surat yang ingin diedit
2. Klik icon **Edit** (pensil) pada kartu surat
3. Ubah informasi yang diperlukan
4. Klik **"Simpan Perubahan"**

### C. Menonaktifkan Jenis Surat

1. Klik icon **Trash** (tempat sampah) pada kartu surat
2. Konfirmasi dialog yang muncul
3. Surat akan dinonaktifkan (soft delete)

## API Endpoints

### 1. GET `/api/admin-umum/letter-types`
Mengambil semua jenis surat (hanya untuk admin-umum)

**Query Parameters:**
- `isActive`: true/false - filter berdasarkan status
- `prodiId`: string - filter berdasarkan prodi

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "lt-1699876543210",
      "title": "Surat Keterangan Aktif",
      "description": "Surat keterangan mahasiswa aktif kuliah",
      "approval_role": "admin_umum",
      "estimated_days": 3,
      "required_documents": ["KTM", "KRS"],
      "is_global": true,
      "is_active": true,
      "template": null,
      "prodi": null
    }
  ]
}
```

### 2. POST `/api/admin-umum/letter-types`
Membuat jenis surat baru (hanya admin-umum)

**Request Body:**
```json
{
  "title": "Surat Keterangan Penelitian",
  "description": "Surat keterangan untuk keperluan penelitian",
  "approval_role": "dekan",
  "estimated_days": 5,
  "required_documents": ["KTM", "Proposal"],
  "is_global": true,
  "template": "<html>...</html>"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Letter type created successfully",
  "data": { ... }
}
```

### 3. PUT `/api/admin-umum/letter-types/[id]`
Update jenis surat (hanya admin-umum)

### 4. DELETE `/api/admin-umum/letter-types/[id]`
Nonaktifkan jenis surat (hanya admin-umum)

### 5. GET `/api/correspondence/letter-types`
Mengambil jenis surat aktif (untuk mahasiswa/dosen)

**Query Parameters:**
- `prodiId`: string - filter berdasarkan prodi

## Integrasi dengan Form Mahasiswa/Dosen

Jenis surat yang dibuat akan otomatis muncul di:
- Form pembuatan surat mahasiswa
- Form pembuatan surat dosen
- Dialog "Buat Surat" di dashboard correspondence

## Validasi

**Field Wajib:**
- Judul Surat
- Deskripsi
- Pihak yang Menyetujui
- Estimasi Hari

**Field Opsional:**
- Dokumen yang Diperlukan
- Template Surat
- Pengaturan Global/Per-Prodi

## Database Schema

```prisma
model letter_types {
  id                 String       @id
  title              String       @unique
  description        String
  approval_role      ApprovalRole
  estimated_days     Int
  required_documents String[]
  additional_fields  Json?
  prodi_id           String?
  is_global          Boolean      @default(false)
  is_active          Boolean      @default(true)
  template           String?
  prodi              prodi?       @relation(fields: [prodi_id], references: [kode])
}
```

## Tips & Best Practices

1. **Judul Jelas**: Gunakan judul yang deskriptif dan mudah dipahami
2. **Deskripsi Lengkap**: Jelaskan kapan surat ini dibutuhkan
3. **Estimasi Realistis**: Berikan estimasi waktu yang realistis (biasanya 3-7 hari)
4. **Dokumen Spesifik**: Sebutkan dokumen yang benar-benar diperlukan
5. **Global vs Per-Prodi**: 
   - Gunakan global untuk surat umum (aktif kuliah, cuti, dll)
   - Gunakan per-prodi untuk surat spesifik program studi

## Troubleshooting

### Surat tidak muncul di form mahasiswa
- Pastikan status surat **Aktif**
- Pastikan pengaturan global/prodi sudah sesuai
- Refresh halaman atau clear cache

### Error saat membuat surat
- Periksa semua field wajib sudah diisi
- Pastikan judul surat belum digunakan (unique)
- Periksa estimasi hari dalam range 1-30

### Tidak bisa edit/hapus
- Pastikan login sebagai Admin Umum
- Periksa permission/role di database

## Update Log

- **v1.0.0** - Initial release
  - CRUD jenis surat
  - Filter & search
  - Integration dengan correspondence form
