# Fitur Pembuatan Surat untuk Mahasiswa - Prodi

## Deskripsi
Fitur ini memungkinkan Ketua Program Studi untuk membuat surat langsung untuk mahasiswa tanpa menunggu permohonan dari mahasiswa tersebut.

## Cara Penggunaan

### 1. Akses Menu Pembuatan Surat
- Buka dashboard prodi di `/dashboard/prodi/correspondence`
- Klik tombol **"Buat Surat untuk Mahasiswa"** di pojok kanan atas

### 2. Cari Mahasiswa
- Masukkan NIM atau nama mahasiswa di kotak pencarian
- Klik tombol **"Cari"** atau tekan Enter
- Pilih mahasiswa yang diinginkan dari hasil pencarian

### 3. Isi Form Surat
Setelah memilih mahasiswa, lengkapi informasi berikut:
- **Jenis Surat** (wajib): Pilih jenis surat yang akan dibuat
  - Surat Keterangan Aktif Kuliah
  - Surat Cuti Kuliah
  - Surat Keterangan untuk Pengajuan Pinjaman
  - Surat Perpanjangan Pembayaran SPP
  - Surat Rekomendasi Magang
  - Surat Rekomendasi Beasiswa
  - Surat Permintaan Transkrip Nilai
  - Surat Izin Penelitian
  - Surat Keterangan Lulus
- **Judul Surat** (wajib): Otomatis terisi berdasarkan jenis surat
- **Tujuan Surat** (opsional): Keperluan penggunaan surat
- **Keterangan Tambahan** (opsional): Informasi tambahan jika diperlukan

### 4. Submit
- Klik tombol **"Buat Surat"**
- Surat akan otomatis masuk ke workflow yang sesuai
- Mahasiswa akan menerima notifikasi tentang surat yang dibuat

## Fitur Teknis

### Komponen Baru
- **CreateLetterDialog** (`components/correspondence/create-letter-dialog.tsx`)
  - Dialog modal dengan 2 tahap: pencarian mahasiswa dan form pembuatan surat
  - Validasi input dan feedback real-time
  - Loading states untuk UX yang baik

### Server Actions Baru
- **searchStudents** - Mencari mahasiswa berdasarkan NIM atau nama
- **createLetterRequestForStudent** - Membuat surat untuk mahasiswa tertentu

### Integrasi
- Terintegrasi dengan workflow system yang sudah ada
- Surat yang dibuat akan otomatis masuk ke admin_umum atau staff_tu sesuai konfigurasi
- Menggunakan Prisma untuk database operations

## Alur Kerja
```
1. Prodi mencari mahasiswa
2. Prodi memilih mahasiswa
3. Prodi mengisi form surat
4. Sistem membuat letter_request dengan workflow
5. Request masuk ke queue approval yang sesuai
6. Admin memproses surat
7. Mahasiswa menerima surat yang sudah jadi
```

## Notes
- Surat yang dibuat oleh prodi langsung akan memiliki status awal sesuai workflow
- Tidak perlu persetujuan dari mahasiswa karena dibuat atas inisiatif prodi
- Log audit tetap tercatat untuk tracking
