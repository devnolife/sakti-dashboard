# 🌱 Panduan Lengkap Seeding Database

Dokumentasi lengkap untuk melakukan seeding database dengan semua role dan sub-role.

---

## 📋 Daftar Isi

1. [Prasyarat](#prasyarat)
2. [Cara Menjalankan Seed](#cara-menjalankan-seed)
3. [Struktur Data yang Di-seed](#struktur-data-yang-di-seed)
4. [Login Credentials](#login-credentials)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Prasyarat

### 1. Database Connection

Pastikan file `.env` sudah dikonfigurasi dengan benar:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### 2. Package Dependencies

```bash
npm install
# atau
bun install
```

### 3. Prisma Generate

```bash
npx prisma generate
```

---

## 🚀 Cara Menjalankan Seed

### Option 1: Reset Database (RECOMMENDED untuk fresh start)

**⚠️ WARNING: Ini akan menghapus SEMUA data di database!**

```bash
npx prisma migrate reset
```

Perintah ini akan:
1. Drop database
2. Create database baru
3. Jalankan semua migrations
4. Jalankan seed otomatis

### Option 2: Seed Tanpa Reset

Jika ingin seed tanpa menghapus data yang ada:

```bash
npx prisma db seed
```

atau

```bash
npm run seed
```

atau

```bash
node prisma/seed-all.ts
```

### Option 3: Menggunakan ts-node

```bash
npx ts-node prisma/seed-all.ts
```

---

## 📊 Struktur Data yang Di-seed

### 1️⃣ Master Data (Prioritas Pertama)

File: `prisma/seeds/master-data-seed.ts`

**Yang di-seed:**
- ✅ Data Prodi (Program Studi)
- ✅ Data dari SIMAK/API eksternal
- ✅ Konfigurasi master data lainnya

### 2️⃣ Users & Roles (Prioritas Kedua)

File: `prisma/seeds/users.ts`

**Yang di-seed:**

#### A. Administrator
- 1 Super Admin

#### B. Dosen Leadership
- 1 Dekan
- 4 Wakil Dekan (WD I, II, III, IV)
- 1 Ketua GKM
- N Kepala Prodi (dinamis sesuai jumlah prodi)
- N Sekretaris Prodi (dinamis sesuai jumlah prodi)

#### C. Dosen Reguler
- 20 Dosen pengajar

#### D. Staff
- N Staff TU (1 per prodi)
- 1 Kepala Tata Usaha
- 2 Admin Keuangan
- 2 Admin Umum
- N Lab Administrator (1 per prodi)
- N Reading Room Admin (1 per prodi)

#### E. Mahasiswa
- 50 mahasiswa per prodi
- Distribusi angkatan: 2020-2024
- Total: 50 × jumlah prodi

---

## 🔑 Login Credentials

### Default Password

**SEMUA USER** menggunakan password yang sama:
```
password123
```

### Contoh Login

#### 👨‍💼 Administrator
```
Username: admin
Password: password123
```

#### 🎖️ Dekan
```
Username: dekan
Password: password123
```

#### 🎖️ Wakil Dekan I
```
Username: wd1
Password: password123
```

#### 🎖️ Wakil Dekan II
```
Username: wd2
Password: password123
```

#### 🎖️ Wakil Dekan III
```
Username: wd3
Password: password123
```

#### 🎖️ Wakil Dekan IV
```
Username: wd4
Password: password123
```

#### 📊 Gugus Kendali Mutu (GKM)
```
Username: gkm
Password: password123
```

#### 🎓 Kepala Prodi
```
Username: kaprodi_[kode_prodi]
Password: password123

Contoh:
- kaprodi_if  (Teknik Informatika)
- kaprodi_si  (Sistem Informasi)
- kaprodi_te  (Teknik Elektro)
```

#### 📝 Sekretaris Prodi
```
Username: sekprodi_[kode_prodi]
Password: password123

Contoh:
- sekprodi_if
- sekprodi_si
- sekprodi_te
```

#### 👨‍🏫 Dosen Reguler
```
Username: dosen001 - dosen020
Password: password123
```

#### 📋 Staff TU
```
Username: stafftu_[kode_prodi]
Password: password123

Contoh:
- stafftu_if
- stafftu_si
```

#### 👔 Kepala Tata Usaha
```
Username: kepala_tu
Password: password123
```

#### 💰 Admin Keuangan
```
Username: admin_keuangan1 atau admin_keuangan2
Password: password123
```

#### 🏢 Admin Umum
```
Username: admin_umum1 atau admin_umum2
Password: password123
```

#### 🔬 Lab Administrator
```
Username: labadmin_[kode_prodi]
Password: password123

Contoh:
- labadmin_if
- labadmin_si
```

#### 📚 Reading Room Admin
```
Username: rradmin_[kode_prodi]
Password: password123

Contoh:
- rradmin_if
- rradmin_si
```

#### 🎓 Mahasiswa
```
Username: [NIM]
Password: password123

Contoh:
- 2024IF0001
- 2023SI0005
- 2022TE0010
```

---

## 📈 Estimasi Jumlah Data

### Dengan 5 Program Studi:

| Kategori | Jumlah |
|----------|--------|
| Admin | 1 |
| Dekan & Wakil | 5 |
| GKM | 1 |
| Kepala Prodi | 5 |
| Sekretaris Prodi | 5 |
| Dosen Reguler | 20 |
| Staff TU | 5 |
| Kepala TU | 1 |
| Admin Keuangan | 2 |
| Admin Umum | 2 |
| Lab Admin | 5 |
| Reading Room Admin | 5 |
| Mahasiswa | 250 |
| **TOTAL** | **307 users** |

### Waktu Proses:
- Master Data: ~5-10 detik
- Users Seed: ~30-60 detik (tergantung jumlah prodi)
- **Total: ~1-2 menit**

---

## 🔍 Verifikasi Seeding

### 1. Cek Database Langsung

```sql
-- Cek jumlah users per role
SELECT role, COUNT(*) as total 
FROM users 
GROUP BY role;

-- Cek dosen dengan sub-role
SELECT sub_role, COUNT(*) as total 
FROM users 
WHERE role = 'dosen' 
GROUP BY sub_role;

-- Cek mahasiswa per prodi
SELECT prodi_id, COUNT(*) as total 
FROM students 
GROUP BY prodi_id;
```

### 2. Test Login

Coba login menggunakan credentials di atas melalui aplikasi.

### 3. Check Console Log

Saat menjalankan seed, perhatikan output console:

```
🌱 Seeding users...
👤 Creating Admin user...
✅ Created admin: admin

👨‍🏫 Creating Dosen with leadership roles...
  ✅ Dekan Fakultas Teknik: Prof. Dr. Ahmad Dekan, S.T., M.T.
  ✅ Wakil Dekan I (Bidang Akademik): Dr. Budi Santoso, S.T., M.T.
  ...

✅ Total users seeded: 307
```

---

## 🐛 Troubleshooting

### Error: "No prodi found"

**Problem:** Master data prodi belum di-seed.

**Solution:**
```bash
# Pastikan master data di-seed dulu
npx prisma migrate reset
```

### Error: "Unique constraint violation"

**Problem:** Data sudah ada di database.

**Solution:**
```bash
# Option 1: Reset database
npx prisma migrate reset

# Option 2: Hapus data manual
npx prisma studio
# Lalu hapus data yang conflict
```

### Error: "Connection timeout"

**Problem:** Database tidak bisa diakses.

**Solution:**
1. Cek koneksi database di `.env`
2. Pastikan PostgreSQL service running
3. Cek firewall settings

### Error: "bcrypt" atau "nanoid" not found

**Problem:** Dependencies tidak terinstall.

**Solution:**
```bash
npm install bcryptjs nanoid
npm install --save-dev @types/bcryptjs
```

### Data tidak lengkap

**Problem:** Seed stopped di tengah jalan.

**Solution:**
```bash
# Reset dan coba lagi
npx prisma migrate reset

# Atau hapus semua data users dulu
npx prisma studio
# Hapus semua data di tabel users, students, lecturers, staff
```

### Performance lambat

**Problem:** Terlalu banyak data atau koneksi lambat.

**Solution:**
1. Kurangi jumlah mahasiswa per prodi di `users.ts`:
   ```typescript
   for (let i = 0; i < 50; i++) {  // <- ubah angka ini
   ```

2. Gunakan batch insert (advanced):
   ```typescript
   await prisma.users.createMany({
     data: [...] // array of users
   })
   ```

---

## 📝 Customization

### Mengubah Jumlah Mahasiswa

Edit file `prisma/seeds/users.ts`:

```typescript
// Line ~385
for (let i = 0; i < 50; i++) {  // <- ubah angka ini
  // ... create student
}
```

### Mengubah Jumlah Dosen

Edit file `prisma/seeds/users.ts`:

```typescript
// Line ~160
for (let i = 0; i < 20; i++) {  // <- ubah angka ini
  // ... create lecturer
}
```

### Menambah Role Baru

1. Tambahkan enum di `prisma/schema.prisma`
2. Generate Prisma client: `npx prisma generate`
3. Update `users.ts` untuk create user dengan role baru
4. Jalankan seed ulang

### Mengubah Default Password

Edit file `prisma/seeds/users.ts`:

```typescript
// Line ~26
const defaultPassword = await bcrypt.hash('password123', 10)  // <- ubah ini
```

---

## 🔄 Re-seeding

Jika perlu update data seed:

### Full Reset
```bash
npx prisma migrate reset
```

### Partial Update
```bash
# 1. Backup data penting dulu
# 2. Hapus data yang mau di-update
# 3. Jalankan seed lagi
npx prisma db seed
```

---

## 📚 File Struktur

```
prisma/
├── seed-all.ts              # Main seed file
├── seeds/
│   ├── master-data-seed.ts  # Seed prodi & master data
│   ├── users.ts             # Seed all users & roles
│   └── README-USERS.md      # User documentation
└── schema.prisma            # Database schema
```

---

## 🎯 Best Practices

1. **Selalu backup database** sebelum seeding production
2. **Test di development** dulu sebelum production
3. **Gunakan migrate reset** untuk fresh start
4. **Verifikasi data** setelah seeding
5. **Update dokumentasi** jika ada perubahan seed
6. **Gunakan environment variables** untuk sensitive data

---

## 📞 Support & Contact

Jika mengalami masalah:

1. Cek dokumentasi di `prisma/seeds/README-USERS.md`
2. Cek console log untuk error details
3. Verifikasi database schema dengan `npx prisma studio`
4. Contact: [Your Contact Info]

---

## 📖 Related Documentation

- [User List Documentation](../prisma/seeds/README-USERS.md)
- [Master Data Documentation](./MASTER_DATA_SYSTEM.md)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Last Updated:** October 2025
**Version:** 1.0.0

