# Database Seeding Guide

## Overview
File `seed-all.ts` berisi seed data lengkap untuk semua tabel dalam database. Seed ini mencakup:

## Data yang Di-seed

### 1. **Users & Authentication**
- Admin (username: `admin`, password: `admin123`)
- Dekan (username: `dekan001`, password: `dekan123`)
- Staff TU (username: `stafftu001`, password: `stafftu123`)
- Kepala Tata Usaha (username: `katu001`, password: `katu123`)
- Admin Keuangan (username: `adminkeuangan001`, password: `keuangan123`)
- Prodi (username: `prodi001`, password: `prodi123`)
- 3 Dosen (username: `dosen001-003`, password: `dosen123`)
- 3 Mahasiswa (username: `20210001-002`, `20220001`, password: `mhs123`)

### 2. **Academic Data**
- **Prodi**: Teknik Informatika, Sistem Informasi
- **Courses**: 3 mata kuliah (Algoritma, Struktur Data, Basis Data)
- **Course Schedules**: Jadwal kuliah
- **Grades**: Nilai mahasiswa
- **Academic Consultations**: Konsultasi akademik
- **Academic Events**: Event akademik (ujian, workshop)

### 3. **KKP (Kuliah Kerja Praktek)**
- **Companies**: 2 perusahaan
- **KKP Locations**: Lokasi KKP
- **KKP Applications**: Pengajuan KKP
- **KKP Approvals**: Persetujuan KKP
- **KKP Documents**: Dokumen KKP
- **KKP Requirements**: Persyaratan KKP

### 4. **Laboratory**
- **Laboratories**: 2 laboratorium (AI, Database)
- **Lab Registrations**: Pendaftaran lab
- **Lab Sessions**: Sesi praktikum
- **Lab Materials**: Materi praktikum
- **Lab Assignments**: Tugas praktikum
- **Lab Assignment Submissions**: Pengumpulan tugas
- **Lab Announcements**: Pengumuman lab

### 5. **Library**
- **Book Categories**: Kategori buku
- **Books**: 2 buku
- **Book Borrowings**: Peminjaman buku

### 6. **Financial**
- **Budgets**: Anggaran
- **Budget Allocations**: Alokasi anggaran
- **Expenses**: Pengeluaran
- **Payments**: Pembayaran mahasiswa
- **Payment Items**: Item pembayaran

### 7. **Exam/Ujian**
- **Exam Requirements**: Persyaratan ujian
- **Exam Applications**: Pengajuan ujian
- **Exam Committees**: Panitia ujian
- **Exam Documents**: Dokumen ujian
- **Exam Student Requirements**: Persyaratan mahasiswa

### 8. **Thesis/Skripsi**
- **Thesis Titles**: Judul skripsi
- **Thesis Reviews**: Review skripsi
- **Thesis Archives**: Arsip skripsi

### 9. **Letter/Surat**
- **Letter Types**: Jenis surat
- **Letter Requests**: Pengajuan surat
- **Letter Attachments**: Lampiran surat

### 10. **System**
- **Notifications**: Notifikasi
- **System Configs**: Konfigurasi sistem
- **Audit Logs**: Log audit
- **File Uploads**: File upload

## Cara Menjalankan Seed

### 1. Pastikan Database Sudah Dibuat
```bash
# Jalankan migrasi terlebih dahulu
npx prisma migrate dev
```

### 2. Jalankan Seed
```bash
# Jalankan seed-all.ts
npx tsx prisma/seed-all.ts
```

Atau jika Anda ingin menggunakan npm script, tambahkan di `package.json`:
```json
{
  "prisma": {
    "seed": "tsx prisma/seed-all.ts"
  }
}
```

Kemudian jalankan:
```bash
npx prisma db seed
```

### 3. Reset Database dan Seed Ulang
Jika Anda ingin mereset database dan seed ulang:
```bash
# Reset database
npx prisma migrate reset

# Ini akan otomatis menjalankan seed setelah reset
```

## Struktur Data

### Relasi Penting
1. **Users → Lecturers/Students/Staff**: Setiap user memiliki role yang terhubung ke tabel spesifik
2. **Students → Lecturers**: Mahasiswa memiliki dosen pembimbing akademik
3. **Courses → Lecturers**: Mata kuliah diampu oleh dosen
4. **KKP Applications → Students, Companies, Lecturers**: KKP menghubungkan mahasiswa, perusahaan, dan pembimbing
5. **Exam Applications → Students, Lecturers**: Ujian melibatkan mahasiswa dan dosen pembimbing
6. **Grades → Students, Courses**: Nilai menghubungkan mahasiswa dan mata kuliah

### Sample Login Credentials

#### Admin
- Username: `admin`
- Password: `admin123`
- Role: `admin`

#### Dekan
- Username: `dekan001`
- Password: `dekan123`
- Role: `dekan`

#### Staff TU
- Username: `stafftu001`
- Password: `stafftu123`
- Role: `staff_tu`

#### Dosen
- Username: `dosen001`, `dosen002`, `dosen003`
- Password: `dosen123`
- Role: `dosen`

#### Mahasiswa
- Username: `20210001`, `20210002`, `20220001`
- Password: `mhs123`
- Role: `mahasiswa`

## Catatan Penting

1. **Password Hashing**: Semua password di-hash menggunakan `bcryptjs` dengan salt rounds 10
2. **IDs**: Semua ID menggunakan format yang konsisten (e.g., `student-001`, `lecturer-001`)
3. **Timestamps**: Menggunakan `new Date()` untuk semua timestamp
4. **Upsert**: Menggunakan `upsert` untuk menghindari duplikasi data saat seed dijalankan berulang kali

## Troubleshooting

### Error: "unique constraint failed"
Ini terjadi jika seed dijalankan dua kali. Solusi:
```bash
npx prisma migrate reset
```

### Error: "foreign key constraint failed"
Pastikan urutan seed sudah benar. Data parent harus dibuat sebelum data child.

### Error: "updated_at is required"
Pastikan semua record users memiliki field `updated_at: new Date()`

## Customization

Anda dapat memodifikasi seed data sesuai kebutuhan:
1. Tambah/kurangi jumlah users
2. Ubah data default
3. Tambah seed untuk tabel lain yang belum ter-cover

## Next Steps

Setelah seed berhasil:
1. Login dengan credentials di atas
2. Verifikasi data di dashboard
3. Test fitur-fitur yang memerlukan data seed
4. Buat seed tambahan untuk data spesifik jika diperlukan
