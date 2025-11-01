# 🎓 Seeding Database Dosen - Fakultas Teknik

Dokumentasi lengkap untuk proses seeding data dosen dari SINTA database.

## 📋 Daftar Isi

- [Overview](#overview)
- [Data Source](#data-source)
- [Struktur Akun](#struktur-akun)
- [Cara Menjalankan](#cara-menjalankan)
- [Daftar Akun Dosen](#daftar-akun-dosen)
- [Default Credentials](#default-credentials)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Seed file ini dibuat khusus untuk **hanya membuat akun dosen** dari data SINTA (Sistem Informasi Sains dan Teknologi) yang real. Berbeda dengan `seed.ts` yang membuat semua jenis user (admin, dosen, staff, mahasiswa), file ini fokus pada:

- ✅ 1 Admin utama
- ✅ 15 Dosen dengan jabatan struktural/kepemimpinan
- ✅ 59 Dosen reguler dari data SINTA

**Total: 74 users** (tanpa staff TU, admin keuangan, lab admin, atau mahasiswa)

---

## 📊 Data Source

Data dosen berasal dari file CSV `dosen_teknik.csv` yang berisi informasi lengkap dari SINTA:

| Field | Deskripsi | Contoh |
|-------|-----------|--------|
| `nidn` | Nomor Induk Dosen Nasional (username) | 0905078907 |
| `nama` | Nama lengkap dosen | RIZKI YUSLIANA BAKTI |
| `prodi` | Program studi | Informatika |
| `jabatan_fungsional` | Jabatan akademik | Lektor |
| `gelar_depan` | Gelar sebelum nama | Dr, Ir |
| `gelar_belakang` | Gelar setelah nama | S.T, M.T |

---

## 👥 Struktur Akun

### 1. Admin (1 user)
- Username: `admin`
- Role: `admin`
- Password: `password123`

### 2. Dosen Leadership (15 users)

#### Tingkat Fakultas (5 users)
| Posisi | Nama | NIDN | Sub Role |
|--------|------|------|----------|
| **Dekan** | MUH SYAFAAT S. KUBA | 0919017702 | dekan,dosen |
| **Wakil Dekan I** (Akademik) | IRNAWATY IDRUS | 0928088206 | wakil_dekan,dosen |
| **Wakil Dekan II** (Administrasi & Keuangan) | ANDI MAKBUL SYAMSURI | 0926048103 | wakil_dekan,dosen |
| **Wakil Dekan III** (Kemahasiswaan & Alumni) | SOEMITRO EMIN PRAJA | 0914099203 | wakil_dekan,dosen |
| **Ketua Gugus Kendali Mutu** | - | gkm | gkm,dosen |

#### Tingkat Program Studi (10 users)

**Informatika (Kode: 55202)**
- **Kepala Prodi**: RIZKI YUSLIANA BAKTI (0905078907)
- **Sekretaris Prodi**: TITIN WAHYUNI (0903058406)

**Teknik Elektro (Kode: 55201)**
- **Kepala Prodi**: Placeholder (kaprodi_55201)
- **Sekretaris Prodi**: Placeholder (sekprodi_55201)

**Arsitektur (Kode: 55203)**
- **Kepala Prodi**: CITRA AMALIA AMAL (0927098403)
- **Sekretaris Prodi**: Placeholder (sekprodi_55203)

**Teknik Sipil (Kode: 55204)**
- **Kepala Prodi**: M. AGUSALIM (0912087505)
- **Sekretaris Prodi**: Placeholder (sekprodi_55204)

**Perencanaan Wilayah dan Kota (Kode: 55205)**
- **Kepala Prodi**: NINI APRIANI RUMATA (0926048906)
- **Sekretaris Prodi**: Placeholder (sekprodi_55205)

> ⚠️ **Note**: Beberapa posisi Sekretaris Prodi masih menggunakan placeholder karena menunggu data real dari SINTA.

### 3. Dosen Reguler (59 users)

Dosen reguler diambil dari `dosen_teknik.csv` dengan distribusi:

| Program Studi | Jumlah Dosen | Jabatan Fungsional |
|---------------|--------------|-------------------|
| Informatika | 12 | 2 Lektor Kepala, 5 Lektor, 5 Asisten Ahli |
| Teknik Elektro | 11 | 1 Lektor Kepala, 7 Lektor, 3 Asisten Ahli |
| Arsitektur | 12 | 1 Lektor Kepala, 10 Lektor, 1 Asisten Ahli |
| Teknik Sipil | 12 | 1 Lektor Kepala, 10 Lektor, 1 Asisten Ahli |
| PWK | 12 | 1 Lektor Kepala, 9 Lektor, 2 Asisten Ahli |
| **Total** | **59** | **6 Lektor Kepala, 41 Lektor, 12 Asisten Ahli** |

---

## 🚀 Cara Menjalankan

### Opsi 1: Reset Database & Seed Ulang (Recommended)

```bash
# Reset database dan jalankan seed dosen
npx prisma migrate reset --force && npx tsx prisma/seed-dosen-only.ts
```

⚠️ **WARNING**: Perintah ini akan **menghapus semua data** di database dan membuat ulang dari awal!

### Opsi 2: Seed Tanpa Reset

```bash
# Hanya jalankan seed (akan skip jika user sudah ada)
npx tsx prisma/seed-dosen-only.ts
```

✅ Safe: Seed file sudah dilengkapi dengan check untuk skip user yang sudah ada.

### Opsi 3: Via package.json script

```bash
# Tambahkan script di package.json
"scripts": {
  "db:seed-dosen": "tsx prisma/seed-dosen-only.ts",
  "db:reset-dosen": "prisma migrate reset --force && tsx prisma/seed-dosen-only.ts"
}

# Kemudian jalankan
npm run db:seed-dosen
# atau
npm run db:reset-dosen
```

---

## 📝 Daftar Akun Dosen

### Dosen Informatika (12 users)

| No | Nama | NIDN | Jabatan | Gelar |
|----|------|------|---------|-------|
| 1 | MUHAMMAD FAISAL | 0930048304 | Lektor Kepala | Ir, S.Si, M.T, Ph.D |
| 2 | RIZKI YUSLIANA BAKTI | 0905078907 | Lektor | S.T, M.T |
| 3 | TITIN WAHYUNI | 0903058406 | Lektor | S.Pd, M.T |
| 4 | LUKMAN ANAS | 0917109102 | Lektor | S.Kom, M.T |
| 5 | FAHRIM IRHAMNAH RACHMAN | 0916088803 | Asisten Ahli | S.Kom, M.T |
| 6 | MUHYIDDIN | 0931087901 | Asisten Ahli | S.Kom, M.T |
| 7 | CHYQUITHA DANUPUTRI | 0431037702 | Asisten Ahli | S.Kom, M.Kom |
| 8 | LUKMAN | 0921098306 | Asisten Ahli | S.Kom, M.T |
| 9 | DESI ANGGREANI | 0912119601 | Asisten Ahli | S.Kom, M.T |
| 10 | DARNIATI | 8262760000000 | Lektor | S.Kom, M.T |
| 11 | IDA MULYADI | 7158760000000 | Lektor | Ir, S.Kom, M.T |
| 12 | EMIL AGUSALIM HABI TALIB | 4149780000000 | Asisten Ahli | S.Pd, M.Eng |

### Dosen Teknik Elektro (11 users)

| No | Nama | NIDN | Jabatan | Gelar |
|----|------|------|---------|-------|
| 1 | ABDUL HAFID | 0019086209 | Lektor Kepala | Ir, M.T |
| 2 | RAHMANIA | 0903068203 | Lektor | Ir, S.T, M.T |
| 3 | ANDI FAHARUDDIN | 0030106704 | Lektor | S.T, M.T |
| 4 | ADRIANI | 0907118201 | Lektor | Ir, S.T, M.T |
| 5 | ANDI ABD. HALIK LATEKO | 0927097401 | Lektor | S.T, M.T, Ph.D |
| 6 | ANTARISSUBHI | 0918056902 | Lektor | Dr, Ir, S.T, M.T |
| 7 | SURYANI | 0901048102 | Lektor | S.T, M.T |
| 8 | ANDI RAHMAT | 0011056601 | Lektor | Ir, M.T |
| 9 | RIDWANG | 0901019009 | Lektor | Dr, Ir, S.Kom, M.T |
| 10 | ST KHADIJAH | 0914069102 | Asisten Ahli | S.T, M.Kom |
| 11 | LISA FITRIANI ISHAK | 0426087901 | Lektor | S.T, M.T |

### Dosen Arsitektur (12 users)

| No | Nama | NIDN | Jabatan | Gelar |
|----|------|------|---------|-------|
| 1 | ROHANA | 0907017301 | Lektor | Dr, S.T, M.T |
| 2 | ANDI ANNISA AMALIA | 0929068304 | Lektor | S.T, M.Si |
| 3 | SITI FUADILLAH ALHUMAIRAH AMIN | 0922108804 | Lektor | S.T, M.T |
| 4 | KHILDA WILDANA NUR | 0901038304 | Lektor | S.T, M.T |
| 5 | CITRA AMALIA AMAL | 0927098403 | Lektor | S.T, M.T |
| 6 | FITRAWAN UMAR | 0927128905 | Asisten Ahli | Dr, S.T, M.Sc |
| 7 | SAHABUDDIN | 0917117201 | Lektor Kepala | Dr, S.T, M.T |
| 8 | NURHIKMAH PADDIYATU | 0922099003 | Lektor | S.T, M.T |
| 9 | ASHARI ABDULLAH | 0906068406 | Lektor | Dr, Ir, S.T, M.T |
| 10 | MUHAMMAD SYARIF | 1216097102 | Lektor Kepala | Dr, Ir, S.T, M.H, M.M, M.T |
| 11 | ANDI YUSRI | 0927017501 | Lektor | S.T, M.T |
| 12 | A. SYAHRIYUNITA SYAHRUDDIN | 0912118501 | Lektor | S.T, M.T |

### Dosen Teknik Sipil (12 users)

| No | Nama | NIDN | Jabatan | Gelar |
|----|------|------|---------|-------|
| 1 | SALMIAH ZAINUDIN H | 0931128411 | Asisten Ahli | S.T, M.Ars |
| 2 | SUKMASARI ANTARIA | 0030116004 | Lektor Kepala | Dr, Ir, M.Si |
| 3 | FAUZAN HAMDI | 0930047504 | Lektor | Ir, S.T, M.T |
| 4 | NENNY | 0916036801 | Lektor Kepala | Dr, S.T, M.T |
| 5 | HAMZAH AL-IMRAN | 0904126802 | Lektor | Dr, S.T, M.T |
| 6 | FATRIADY MR | 0923048801 | Lektor | Dr, Ir, S.T, M.T |
| 7 | LUTFI HAIR DJUNUR | 0913117801 | Lektor | S.T, M.T |
| 8 | MARUPAH | 0925066905 | Lektor | Dr, S.P, M.P |
| 9 | MAHMUDDIN | 0917126801 | Lektor | S.T, M.T |
| 10 | M. AGUSALIM | 0912087505 | Lektor | S.T, M.T |
| 11 | KASMAWATI | 0914108804 | Lektor | S.T, M.T |
| 12 | MUH AMIR | 0910076502 | Lektor | S.T, M.T |

### Dosen PWK (12 users)

| No | Nama | NIDN | Jabatan | Gelar |
|----|------|------|---------|-------|
| 1 | FAUSIAH LATIF | 0926127601 | Asisten Ahli | S.T, M.T |
| 2 | INDRIYANTI | 0919067904 | Lektor | S.T, M.T |
| 3 | ASNITA VIRLAYANI | 0014017902 | Lektor | S.T, M.T |
| 4 | FARIDA G | 0919046801 | Lektor | S.T, M.M |
| 5 | ISRAIL | 0916036401 | Lektor | Dr, S.T, M.T |
| 6 | ANDI BUNGA TONGENG ANAS | 0906067401 | Asisten Ahli | S.T, M.T |
| 7 | FATHURRAHMAN BURHANUDDIN | 0916108605 | Lektor | S.T, M.T |
| 8 | M. NURHIDAYAT | 0901118502 | Lektor | S.T, M.T |
| 9 | NINI APRIANI RUMATA | 0926048906 | Lektor | S.T, M.T |
| 10 | FIRDAUS | 0927118703 | Lektor | Ir, S.T, M.T, M.Si |
| 11 | LUCKE AYURINDRA MARGIE DAYANA | 0906108905 | Asisten Ahli | S.T, M.Si |
| 12 | ZULKIFLI | 0007018506 | Asisten Ahli | S.Si, M.Si |

---

## 🔑 Default Credentials

### Login untuk Dosen

```
Username: [NIDN]
Password: password123
```

**Contoh:**
- Username: `0905078907` (RIZKI YUSLIANA BAKTI)
- Password: `password123`

### Login untuk Admin

```
Username: admin
Password: password123
```

---

## 🔧 Troubleshooting

### 1. Error: Unique constraint failed on username

**Masalah**: User dengan username yang sama sudah ada di database.

**Solusi**:
```bash
# Reset database terlebih dahulu
npx prisma migrate reset --force
npx tsx prisma/seed-dosen-only.ts
```

### 2. Error: Cannot find module 'bcryptjs'

**Masalah**: Dependencies belum terinstall.

**Solusi**:
```bash
npm install bcryptjs nanoid @prisma/client
npm install -D @types/bcryptjs tsx
```

### 3. Warning: prisma migrate reset akan menghapus semua data

**Masalah**: Takut kehilangan data production.

**Solusi**:
- ⚠️ **JANGAN** jalankan di production!
- Gunakan `npx tsx prisma/seed-dosen-only.ts` saja (akan skip user yang sudah ada)
- Atau backup database terlebih dahulu:
```bash
pg_dump -U username database_name > backup.sql
```

### 4. Seed berjalan tapi user tidak muncul di dashboard

**Masalah**: Cache browser atau session issue.

**Solusi**:
1. Logout dari aplikasi
2. Clear browser cache (Ctrl + Shift + Delete)
3. Login kembali dengan credentials baru

### 5. Tidak bisa login dengan NIDN

**Masalah**: Username atau password salah.

**Solusi**:
1. Pastikan menggunakan NIDN tanpa spasi atau karakter tambahan
2. Password default adalah `password123` (huruf kecil semua)
3. Cek di Prisma Studio apakah user sudah ada:
```bash
npx prisma studio
```

---

## 📚 File Terkait

| File | Deskripsi |
|------|-----------|
| `prisma/seed-dosen-only.ts` | Main seed file untuk dosen |
| `prisma/seeds/master-data-seed.ts` | Seed data prodi |
| `dosen_teknik.csv` | Source data dosen dari SINTA |
| `prisma/schema.prisma` | Database schema |

---

## 📞 Kontak

Jika ada pertanyaan atau issue, silakan hubungi tim pengembang atau buat issue di repository.

---

## 📝 Changelog

### Version 1.0.0 (November 2025)
- ✅ Initial release
- ✅ 74 total users (1 admin + 15 leadership + 59 reguler)
- ✅ Data real dari SINTA database
- ✅ Auto-skip untuk user yang sudah ada
- ✅ Validasi NIDN dan prodi

---

**Last Updated**: November 1, 2025  
**Maintainer**: DevNoLife Team
