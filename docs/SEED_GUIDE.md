# Database Seed Guide

## Quick Start

Jalankan seed lengkap dengan 1 command:

```bash
npx tsx prisma/seed.ts
```

Atau via npm script:
```bash
npm run db:seed
```

## What's Seeded

### 👤 Admin Fakultas (6 accounts)
- **Admin Umum (2)**: `admin_umum` / `password123`, `admin_umum2` / `password123`
- **Admin Keuangan (2)**: `admin_keuangan` / `password123`, `admin_keuangan2` / `password123`
- **Kepala Tata Usaha**: `kepala_tu` / `password123`
- **Admin**: `admin` / `password123`

### 🎓 Pimpinan Fakultas (15 accounts - DATA REAL)

**Dekan & Wakil Dekan:**
- **Dekan**: `0919017702` / `password123` - MUH SYAFAAT S. KUBA, S.T., M.T.
- **Wakil Dekan I**: `0928088206` / `password123` - Dr IRNAWATY IDRUS, S.T., M.T.
- **Wakil Dekan II**: `0926048103` / `password123` - Dr Ir ANDI MAKBUL SYAMSURI, S.T., M.T.
- **Wakil Dekan III**: `0914099203` / `password123` - SOEMITRO EMIN PRAJA, S.T., M.Si

**Kepala Prodi & Sekprodi (per prodi):**
- Kepala Program Studi + Sekretaris untuk setiap prodi
- Gugus Kendali Mutu (GKM)

### 👨‍🏫 Dosen (20 accounts - DATA REAL dari SINTA)
Dosen dengan data lengkap dari database SINTA, termasuk:
- NIDN
- Jabatan fungsional (Asisten Ahli, Lektor, Lektor Kepala)
- Gelar akademik

### 📚 Staff Per Prodi (5 prodi)

**Admin Prodi (Staff TU):**
- Format: `stafftu_[kode_prodi]`
- Contoh: `stafftu_55202` / `password123` - Staff TU Informatika

**Admin Lab:**
- Format: `labadmin_[kode_prodi]`
- `labadmin_55201` / `password123` - Admin Lab Teknik Elektro
- `labadmin_55202` / `password123` - Admin Lab Informatika
- `labadmin_55203` / `password123` - Admin Lab Arsitektur
- `labadmin_55204` / `password123` - Admin Lab Teknik Sipil
- `labadmin_55205` / `password123` - Admin Lab PWK

**Reading Room Admin:**
- Format: `rradmin_[kode_prodi]`
- Contoh: `rradmin_55202` / `password123` - Admin Ruang Baca Informatika

### 👥 Mahasiswa (250 accounts - 50 per prodi)
Format NIM: `25[KODE_PRODI][001-050]`

**Contoh login:**
- `2555202001` / `password123` - Mahasiswa Informatika 1
- `2555202002` / `password123` - Mahasiswa Informatika 2
- ...
- `2555202050` / `password123` - Mahasiswa Informatika 50

### 📬 Letter Master Data
- **Jenis Surat**: A (UNSUR PIMPINAN), B (Muhammadiyah), C (PT & INSTANSI), D (SURAT KELUAR)
- **Masalah Surat**: I-VIII (Kategori masalah)
- **Tujuan Surat**: A.1-A.6, B.1-B.4, C.1-C.6, D.1-D.3
- **Letter Types**: KKP, Ujian Proposal, Cuti Kuliah, Keterangan Aktif

## Testing Dashboards

### Admin Lab
```
Username: labadmin_55202
Password: password123
URL: /dashboard/laboratory_admin
```

### Admin Prodi (Staff TU)
```
Username: stafftu_55202
Password: password123
URL: /dashboard/staff_tu
```

### Ketua Prodi
Login dengan akun Kepala Prodi
```
URL: /dashboard/prodi
```

### Admin Umum
```
Username: admin_umum
Password: password123
URL: /dashboard/admin_umum
```

### Dekan
```
Username: 0919017702
Password: password123
URL: /dashboard/wd1
```

### Mahasiswa
```
Username: 2555202001
Password: password123
URL: /dashboard/mahasiswa
```

## Re-running Seed

Seed script menggunakan `upsert` dan `create`, jadi perlu reset database untuk menghindari duplikasi.

```bash
# Reset database (DANGER - deletes all data)
npx prisma migrate reset --force

# Atau run seed manual setelah reset
npx tsx prisma/seed.ts
```

## Summary

**Total Users: ~305**
- 6 Admin Fakultas
- 15 Pimpinan Fakultas (Dekan, WD, Kaprodi, Sekprodi, GKM)
- 20 Dosen (DATA REAL dari SINTA)
- 15 Staff (5 Staff TU, 5 Lab Admin, 5 Reading Room Admin)
- 250 Mahasiswa (50 per prodi)

## Notes

- **Password untuk semua akun**: `password123`
- **Data Dosen**: Real data dari SINTA database
- **Data Pimpinan**: Real data (Dekan, Wakil Dekan)
- **Mahasiswa**: Dummy data untuk testing
- **Master Data**: Lengkap untuk sistem penomoran surat
