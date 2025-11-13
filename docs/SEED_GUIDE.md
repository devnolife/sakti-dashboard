# Database Seed Guide

## Quick Start

Jalankan seed lengkap dengan 1 command:

```bash
npx tsx prisma/seed-final.ts
```

## What's Seeded

### 👤 Admin (2 accounts)
- **Admin Umum**: `admin.umum` / `password123`
- **Admin Keuangan**: `admin.keuangan` / `password123`

### 🎓 Pimpinan Fakultas (4 accounts - DATA REAL)
- **Dekan**: `0919017702` / `password123`
  - MUH SYAFAAT S. KUBA, S.T., M.T.
  
- **Wakil Dekan I (Akademik)**: `0928088206` / `password123`
  - Dr IRNAWATY IDRUS, S.T., M.T.
  
- **Wakil Dekan II (Administrasi & Keuangan)**: `0926048103` / `password123`
  - Dr Ir ANDI MAKBUL SYAMSURI, S.T., M.T.
  
- **Wakil Dekan III (Kemahasiswaan)**: `0914099203` / `password123`
  - SOEMITRO EMIN PRAJA, S.T., M.Si

### 👨‍🏫 Kepala Prodi (5 accounts)
- `kaprodi.55201` / `password123` - Teknik Elektro
- `kaprodi.55202` / `password123` - Informatika
- `kaprodi.55203` / `password123` - Arsitektur
- `kaprodi.55204` / `password123` - Teknik Sipil
- `kaprodi.55205` / `password123` - Perencanaan Wilayah dan Kota

### 📚 Admin Prodi (5 accounts)
- `admin.prodi.55201` / `password123`
- `admin.prodi.55202` / `password123`
- `admin.prodi.55203` / `password123`
- `admin.prodi.55204` / `password123`
- `admin.prodi.55205` / `password123`

### 👥 Mahasiswa (15 accounts - 3 per prodi)
Format NIM: `25[KODE_PRODI][001-003]`

**Contoh login:**
- `2555202001` / `password123` - Mahasiswa Informatika 1
- `2555202002` / `password123` - Mahasiswa Informatika 2
- `2555202003` / `password123` - Mahasiswa Informatika 3

### 📝 Workflow Test Data (6 requests)
- 3 requests in `initial_review` stage (assigned to Admin Umum)
- 2 requests in `wd1_approval` stage (assigned to Dekan)
- 1 completed request

## Testing Workflow System

### 1. Login as Admin Umum
```
Username: admin.umum
Password: password123
URL: /dashboard/admin_umum/correspondence
```

**Actions:**
- View 3 requests in initial_review
- Forward to WD1 (Dekan)
- Reject requests

### 2. Login as Dekan (WD1)
```
Username: 0919017702
Password: password123
URL: /dashboard/wd1/correspondence
```

**Actions:**
- View requests forwarded by Admin Umum
- Approve requests
- Reject requests
- Return for revision

### 3. Login as Mahasiswa
```
Username: 2555202001
Password: password123
URL: /dashboard/mahasiswa
```

**Actions:**
- Submit new letter requests
- View request status
- See workflow timeline

## Re-running Seed

Seed script uses `upsert`, jadi aman untuk dijalankan ulang. Data yang sudah ada tidak akan duplikat.

```bash
# Reset database (DANGER - deletes all data)
npx prisma migrate reset

# Run seed
npx tsx prisma/seed-final.ts
```

## Notes

- All passwords: `password123`
- Data Dekan & Wakil Dekan adalah data REAL dari SINTA
- Mahasiswa data adalah dummy untuk testing
- Workflow test data ditandai dengan prefix `[TEST]` di title
