# 🎓 Akun Pimpinan Fakultas Teknik - Credentials

## 📋 Daftar Akun

### 👥 Admin Accounts

| Role | Username | Password | Dashboard URL |
|------|----------|----------|---------------|
| Admin Umum | `admin.umum` | `password123` | `/dashboard/admin_umum` |
| Admin Keuangan | `admin.keuangan` | `password123` | `/dashboard/admin_keuangan` |

### 🎓 Pimpinan Fakultas (Data Real dari SINTA)

| Jabatan | Nama | NIDN/Username | Password | Gelar |
|---------|------|---------------|----------|-------|
| **Dekan Fakultas Teknik** | MUH SYAFAAT S. KUBA | `0919017702` | `password123` | S.T., M.T. |
| **Wakil Dekan I** (Bidang Akademik) | IRNAWATY IDRUS | `0928088206` | `password123` | Dr, S.T., M.T. |
| **Wakil Dekan II** (Administrasi Umum & Keuangan) | ANDI MAKBUL SYAMSURI | `0926048103` | `password123` | Dr Ir, S.T., M.T. |
| **Wakil Dekan III** (Kemahasiswaan & Alumni) | SOEMITRO EMIN PRAJA | `0914099203` | `password123` | S.T., M.Si |

---

## 🚀 Cara Instalasi

### 1. Setup Database

Pastikan database PostgreSQL sudah berjalan dan `.env` sudah dikonfigurasi:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/simtekmu?schema=dev"
```

### 2. Jalankan Migration

```bash
npx prisma migrate deploy
```

### 3. Seed Master Data (Prodi, dll)

```bash
npx prisma db seed
```

### 4. Seed Akun Pimpinan

```bash
npx tsx prisma/seed-pimpinan-only.ts
```

---

## 🔐 Login ke Sistem

### URL Login
```
http://localhost:3001/login
```

### Contoh Login:

#### Admin Umum
- **Username**: `admin.umum`
- **Password**: `password123`
- **Akses**: Dashboard Admin Umum, Correspondence Management

#### Dekan (sebagai WD1 untuk approval)
- **Username**: `0919017702`
- **Password**: `password123`
- **Akses**: Dashboard WD1, Approval Workflow

#### Wakil Dekan I
- **Username**: `0928088206`
- **Password**: `password123`
- **Akses**: Dashboard WD1, Approval Workflow

---

## 📱 Dashboard URLs

Setelah login, akses dashboard sesuai role:

| Role | URL |
|------|-----|
| Admin Umum | `/dashboard/admin_umum/correspondence` |
| Admin Keuangan | `/dashboard/admin_keuangan` |
| Dekan / WD1 | `/dashboard/wd1/correspondence` |
| Dosen (Wakil Dekan) | `/dashboard/dosen` |

---

## 🔄 Workflow System

### Multi-Level Approval Flow:

1. **Mahasiswa** submit surat
2. **Admin Umum** review → Forward ke WD1 / Reject
3. **WD1 (Dekan)** approve → Complete / Return / Reject
4. **Completed** → Generate PDF & Nomor Surat

### Testing Workflow:

1. Login sebagai **Admin Umum** (`admin.umum`)
2. Buka `/dashboard/admin_umum/correspondence`
3. Lihat request yang masuk
4. Forward ke WD1 untuk approval
5. Logout, login sebagai **Dekan** (`0919017702`)
6. Buka `/dashboard/wd1/correspondence`
7. Approve/Reject request

---

## 🔧 Update Password

Jika ingin update password setelah login pertama, gunakan fitur change password di dashboard atau update via Prisma Studio:

```bash
npx prisma studio
```

Navigate to `users` table → Edit user → Update `password` field dengan bcrypt hash baru.

---

## 📝 Notes

- ✅ Semua NIDN adalah **data real dari SINTA** (Sistem Informasi Ilmu Pengetahuan Indonesia)
- ✅ Password default: `password123` untuk semua akun
- ✅ Akun dapat digunakan langsung setelah seed
- ✅ Data pimpinan sudah terverifikasi dengan gelar akademik yang benar
- ⚠️ **Ganti password** setelah login pertama untuk keamanan
- ⚠️ Jangan commit file ini ke public repository jika sudah production

---

## 🆘 Troubleshooting

### Error: "Invalid credentials"

1. Pastikan seed sudah dijalankan:
   ```bash
   npx tsx prisma/seed-pimpinan-only.ts
   ```

2. Cek database apakah user sudah ada:
   ```bash
   npx prisma studio
   ```

3. Password harus bcrypt hash, bukan plain text

### Error: "No prodi found"

Jalankan seed master data dulu:
```bash
npx prisma db seed
```

### Reset Database

Jika ingin reset semua data:
```bash
npx prisma migrate reset
npx prisma db seed
npx tsx prisma/seed-pimpinan-only.ts
```

---

## 📞 Support

Untuk bantuan lebih lanjut, hubungi:
- IT Support Fakultas Teknik
- Email: teknik@unismuh.ac.id

---

**Last Updated**: November 12, 2025
**Version**: 1.0.0
