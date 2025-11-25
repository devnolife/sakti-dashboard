# 🌱 Seeds Directory

Folder ini berisi seed files untuk mengisi database dengan data awal.

## 📁 Seed Files Aktif

### 🎯 Master Data
- **`prodi-master-default.ts`** - Data master prodi resmi (BACKUP UTAMA)
- **`master-data-seed.ts`** - Seed data master umum
- **`super-admin-seed.ts`** - Seed akun super admin

### 📚 Data Tambahan
- **`users.ts`** - Seed users dan roles
- **`letter-master-data.ts`** - Data master jenis surat
- **`rekomendasi-judul-seed.ts`** - Seed data rekomendasi judul
- **`index.ts`** - Entry point untuk seed orchestration

## 🚀 Cara Penggunaan

### Restore Master Prodi
```bash
npm run seed:prodi-master
```

### Seed Master Data
```bash
npm run seed:master-data
```

### Production Seed
```bash
npm run db:seed-production
```

### Super Admin
```bash
npm run seed:super-admin
```

## ⚠️ Catatan Penting

- File `prodi-master-default.ts` adalah BACKUP UTAMA kode prodi resmi
- JANGAN hapus file backup ini
- Gunakan production seed untuk data lengkap dari SINTA

## 🔑 Default Password

Semua akun seed menggunakan password: `password123`

---

**Last Updated**: November 24, 2025
