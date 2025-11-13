# 🌱 Seed Guide - Real Data from SINTA

Dokumentasi untuk seeding database dengan **data real dari SINTA API**.

---

## 📋 Perubahan Utama

### ✅ Yang Sudah Diupdate:

1. **Kode Prodi Real:**
   - ~~55201~~ → **20201** - Teknik Elektro
   - ~~55204~~ → **22201** - Teknik Pengairan
   - ~~55203~~ → **23201** - Arsitektur
   - **55202** - Informatika (tetap)
   - ~~55205~~ → **35201** - Perencanaan Wilayah dan Kota

2. **Seed Strategy Baru:**
   - `seed-production.ts` - **Data 100% real dari SINTA** (Recommended)
   - `seed-final.ts` - Masih ada tapi pakai kode prodi lama
   - `seed-all.ts` - Backup (masih ada data dummy)

3. **Script Baru:**
   - `fetch-students-sinta.ts` - Fetch mahasiswa real dari SINTA API

---

## 🚀 Cara Penggunaan

### 1. Reset & Seed dengan Data Real

```bash
# Reset database dan seed dengan data real
npx prisma migrate reset --force

# Seed production (data real dari SINTA)
npm run db:seed-production
```

### 2. Fetch Mahasiswa dari SINTA (Optional - Tambah lebih banyak)

```bash
# Fetch semua mahasiswa dari semua prodi
npm run fetch:students

# Fetch dari prodi tertentu (contoh: Informatika)
npm run fetch:students 55202 10

# Fetch single student by NIM
npm run fetch:students single 2255202001
```

### 3. Update Master Data Saja

```bash
# Hanya update data prodi dengan kode real
npm run seed:master-data
```

---

## 📊 Data yang Di-Seed

### `seed-production.ts` (Recommended)

**Total Users: ~25+ real accounts**

| Kategori | Jumlah | Sumber | Real/Dummy |
|----------|--------|--------|------------|
| **Prodi** | 5 | Manual | ✅ Real codes |
| **Admin** | 2 | Manual | Dummy names |
| **Pimpinan Fakultas** | 4 | SINTA | ✅ Real (Dekan + 3 WD) |
| **Kepala Prodi** | 4 | SINTA | ✅ Real |
| **Admin Prodi** | 5 | Generated | Dummy |
| **Mahasiswa** | 3-15 | SINTA API | ✅ Real (fetched live) |

### Data Real dari SINTA:

#### Pimpinan Fakultas ✅
- **Dekan**: MUH SYAFAAT S. KUBA (0919017702)
- **WD1**: IRNAWATY IDRUS (0928088206)
- **WD2**: ANDI MAKBUL SYAMSURI (0926048103)
- **WD3**: SOEMITRO EMIN PRAJA (0914099203)

#### Kepala Prodi ✅
- **Informatika**: RIZKI YUSLIANA BAKTI (0905078907)
- **Arsitektur**: CITRA AMALIA AMAL (0927098403)
- **Teknik Pengairan**: M. AGUSALIM (0912087505)
- **PWK**: NINI APRIANI RUMATA (0926048906)

#### Mahasiswa ✅
- Fetched live dari SINTA GraphQL API
- Data lengkap: NIM, Nama, Angkatan, IPK, Email, HP
- Pattern NIM: `[tahun][kode_prodi][nomor]`
  - Contoh: `2255202001` = Angkatan 2022, Informatika, No. 001

---

## 🔑 Login Credentials

**Password Default:** `password123`

### Admin:
```
Username: admin.umum
Password: password123
```

### Pimpinan (Real):
```
Dekan:  0919017702 / password123
WD1:    0928088206 / password123
```

### Kepala Prodi (Real):
```
Kaprodi IF:  0905078907 / password123
Kaprodi ARS: 0927098403 / password123
```

### Mahasiswa (Real - tergantung yang berhasil di-fetch):
```
NIM: [sesuai data SINTA] / password123
```

---

## 🗂️ File Structure Baru

```
prisma/
├── seed-production.ts          ← ⭐ RECOMMENDED (Real data from SINTA)
├── seed-final.ts               ← Legacy (update kode prodi)
├── seed-all.ts                 ← Backup (banyak dummy data)
├── seeds-backup/               ← Backup file lama
│   ├── seed-all.ts
│   ├── seed-dosen-only.ts
│   └── seed-pimpinan-only.ts
└── seeds/
    └── master-data-seed.ts     ← Updated dengan kode prodi real

scripts/
└── fetch-students-sinta.ts     ← NEW: Fetch mahasiswa dari SINTA
```

---

## ⚠️ Troubleshooting

### 1. Mahasiswa tidak ditemukan di SINTA

**Problem:** `Student 2255202001 not found in SINTA`

**Solution:**
- NIM mungkin belum terdaftar di SINTA
- Coba NIM lain yang valid
- Atau tambahkan manual list NIM yang valid

### 2. GraphQL Connection Error

**Problem:** `GraphQL request failed`

**Solution:**
```bash
# Check koneksi ke SINTA
curl https://sicekcok.if.unismuh.ac.id/graphql

# Pastikan .env sudah benar
GRAPHQL_ENDPOINT=https://sicekcok.if.unismuh.ac.id/graphql
```

### 3. Prodi Code Mismatch

**Problem:** Student prodi code tidak match

**Solution:**
- Pastikan sudah run `seed:master-data` dengan kode prodi baru
- Check di Prisma Studio apakah prodi sudah benar

---

## 📝 Next Steps

### Untuk Development:
1. ✅ Sudah ada `seed-production.ts` dengan data real
2. ✅ Sudah ada script `fetch-students-sinta.ts`
3. 🔄 Tinggal test dan validasi

### Untuk Production:
1. Collect list NIM mahasiswa aktif yang valid
2. Update `nimPatterns` di `seed-production.ts`
3. Run seed di production environment
4. Setup auto-sync dari SINTA (optional)

---

## 🎯 Keuntungan Seed Baru

| Aspek | Sebelum | Sesudah |
|-------|---------|---------|
| **Kode Prodi** | Dummy (55xxx) | ✅ Real (20201, 22201, etc) |
| **Dosen** | ✅ Real dari SINTA | ✅ Real dari SINTA |
| **Mahasiswa** | ❌ Dummy ("Mahasiswa 1") | ✅ Real dari SINTA API |
| **Jumlah File** | 7 seed files | 3 seed files (+ backup) |
| **Maintenance** | Susah (data tersebar) | Mudah (terpusat) |
| **Testing** | Pakai dummy data | Pakai real data |

---

## 📞 Support

Jika ada masalah:
1. Check file `SEED_GUIDE_NEW.md` (ini)
2. Check logs saat run seed
3. Validate di Prisma Studio: `npx prisma studio`

---

**Last Updated:** 2025-01-13
**Maintainer:** DevNoLife Team
