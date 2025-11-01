# 🔐 Daftar Akun untuk Testing

Dokumen ini berisi daftar akun yang tersedia untuk testing aplikasi Dashboard Fakultas Teknik.

> **📌 Catatan Penting:**
> - Semua password default: `password123`
> - File seeding: `prisma/seeds/users.ts`
> - Total user: 50 mahasiswa per prodi + staff + dosen

---

## 📋 Daftar Akun Berdasarkan Role

### 1. 👑 Administrator
Akses penuh ke seluruh sistem dan manajemen.

| Username | Password | Nama | Role |
|----------|----------|------|------|
| `admin` | `password123` | Administrator Sistem | admin |

**Akses:**
- Full system access
- User management
- System configuration
- All modules

---

### 2. 👨‍💼 Pimpinan Fakultas (Data Real)

#### Dekan
| Username (NIDN) | Password | Nama Lengkap | Sub-Role | Jabatan | Prodi |
|----------|----------|--------------|----------|---------|-------|
| `0919017702` | `password123` | MUH SYAFAAT S. KUBA, S.T., M.T. | dekan,dosen | Dekan Fakultas Teknik | S1 Teknik Pengairan |

#### Wakil Dekan
| Username (NIDN) | Password | Nama Lengkap | Sub-Role | Jabatan | Prodi |
|----------|----------|--------------|----------|---------|-------|
| `0928088206` | `password123` | Dr. IRNAWATY IDRUS, S.T., M.T. | wakil_dekan_1,dosen | Wakil Dekan I (Bidang Akademik) | S1 Arsitektur |
| `0926048103` | `password123` | Dr Ir ANDI MAKBUL SYAMSURI, S.T., M.T. | wakil_dekan_2,dosen | Wakil Dekan II (Administrasi Umum & Keuangan) | S1 Teknik Pengairan |
| `0914099203` | `password123` | SOEMITRO EMIN PRAJA, S.T., M.Si | wakil_dekan_3,dosen | Wakil Dekan III (Kemahasiswaan & Alumni) | S1 Perencanaan Wilayah dan Kota |

> **📌 Catatan Penting:**
> - Username menggunakan **NIDN** (Nomor Induk Dosen Nasional)
> - Setiap pimpinan memiliki **multiple sub-roles** (bisa switch antara dekan/wakil dekan dan dosen)
> - Data diambil dari SINTA Kemenristekdikti 
> - Password default untuk testing: `password123`

**Akses:**
- Faculty management
- Approval workflows
- Academic oversight
- Faculty reports
- Strategic planning

---

### 3. 🎓 Kepala Program Studi & Sekretaris

Format username:
- Kepala Prodi: `kaprodi_{kode_prodi}`
- Sekretaris Prodi: `sekprodi_{kode_prodi}`

**Contoh untuk Teknik Informatika (kode: 55201):**

| Username | Password | Role | Sub-Role | Jabatan |
|----------|----------|------|----------|---------|
| `kaprodi_55201` | `password123` | dosen | prodi | Kepala Program Studi Teknik Informatika |
| `sekprodi_55201` | `password123` | dosen | sekretaris_prodi | Sekretaris Program Studi Teknik Informatika |

**Akses:**
- Academic management
- Student academic records
- Curriculum management
- KKP/Thesis approvals
- Program reports

---

### 4. 👨‍🏫 Dosen (Regular Lecturer)

#### Dosen dengan Data Real (Sampel)
| Username (NIDN) | Password | Nama | Jabatan Fungsional | Prodi | Gelar |
|----------|----------|------|-------------------|-------|-------|
| `0930048304` | `password123` | MUHAMMAD FAISAL | Lektor Kepala | S1 Informatika | Ir, S.SI, M.T, Ph.D |
| `0905078907` | `password123` | RIZKI YUSLIANA BAKTI | Lektor | S1 Informatika | S.T, M.T |
| `0903058406` | `password123` | TITIN WAHYUNI | Lektor | S1 Informatika | S.Pd, S.Pd, M.T |
| `0917109102` | `password123` | LUKMAN ANAS | Lektor | S1 Informatika | S.Kom, M.T |
| `0019086209` | `password123` | ABDUL HAFID | Lektor Kepala | S1 Teknik Elektro | Ir, M.T |
| `0903068203` | `password123` | RAHMANIA | Lektor | S1 Teknik Elektro | Ir, S.T, M.T |
| `0907017301` | `password123` | ROHANA | Lektor | S1 Arsitektur | Dr, S.T, M.T |
| `0929068304` | `password123` | ANDI ANNISA AMALIA | Lektor | S1 Arsitektur | S.T, M.Si |

**Total Dosen di CSV:** 64 dosen dari berbagai prodi:
- S1 Informatika
- S1 Teknik Elektro
- S1 Teknik Pengairan
- S1 Arsitektur
- S1 Perencanaan Wilayah dan Kota

**Akses:**
- Teaching portal
- Student grades
- Academic consultations
- Research supervision
- Thesis/KKP guidance
- Dapat switch role jika punya sub-role kepemimpinan

---

### 5. 📋 Staff Tata Usaha
Staff TU per program studi.

Format username: `stafftu_{kode_prodi}`

**Contoh:**
| Username | Password | Role | Departemen |
|----------|----------|------|------------|
| `stafftu_55201` | `password123` | staff_tu | Teknik Informatika |
| `stafftu_55202` | `password123` | staff_tu | Teknik Sipil |
| `stafftu_55203` | `password123` | staff_tu | Teknik Elektro |

**Akses:**
- Administrative tasks
- Document verification
- Student records
- Letter processing

---

### 6. 👨‍💼 Kepala Tata Usaha
| Username | Password | Nama | Role |
|----------|----------|------|------|
| `kepala_tu` | `password123` | Drs. Bambang Supriadi, M.M. | kepala_tata_usaha |

**Akses:**
- Administration head portal
- Staff oversight
- Administrative approvals
- Management reports

---

### 7. 💰 Admin Keuangan
| Username | Password | Role | Jabatan |
|----------|----------|------|---------|
| `admin_keuangan1` | `password123` | admin_keuangan | Administrator Keuangan |
| `admin_keuangan2` | `password123` | admin_keuangan | Administrator Keuangan |

**Akses:**
- Financial administration
- Payment processing
- Budget management
- Financial reports

---

### 8. 🏢 Admin Umum
| Username | Password | Role | Jabatan |
|----------|----------|------|---------|
| `admin_umum1` | `password123` | admin_umum | Administrator Umum |
| `admin_umum2` | `password123` | admin_umum | Administrator Umum |

**Akses:**
- General administrative tasks
- Facility management
- General services

---

### 9. 🔬 Laboratory Admin
Admin laboratorium per program studi.

Format username: `labadmin_{kode_prodi}`

**Contoh:**
| Username | Password | Role | Departemen |
|----------|----------|------|------------|
| `labadmin_55201` | `password123` | laboratory_admin | Lab Teknik Informatika |
| `labadmin_55202` | `password123` | laboratory_admin | Lab Teknik Sipil |
| `labadmin_55203` | `password123` | laboratory_admin | Lab Teknik Elektro |

**Akses:**
- Laboratory management
- Lab equipment tracking
- Lab schedule management
- Lab reports

---

### 10. 📚 Reading Room Admin
Admin ruang baca per program studi.

Format username: `rradmin_{kode_prodi}`

**Contoh:**
| Username | Password | Role | Departemen |
|----------|----------|------|------------|
| `rradmin_55201` | `password123` | reading_room_admin | Ruang Baca Teknik Informatika |
| `rradmin_55202` | `password123` | reading_room_admin | Ruang Baca Teknik Sipil |
| `rradmin_55203` | `password123` | reading_room_admin | Ruang Baca Teknik Elektro |

**Akses:**
- Reading room management
- Book borrowing
- Library services

---

### 11. 👨‍🎓 Mahasiswa (Student)
**50 mahasiswa per program studi** dari angkatan 2020-2024.

Format NIM/Username: `{tahun}{kode_prodi}{nomor_urut_4_digit}`

**Contoh NIM untuk Teknik Informatika (kode: 55201):**
| NIM | Password | Tahun | Semester | Role |
|-----|----------|-------|----------|------|
| `202055201001` | `password123` | 2020 | 8 | mahasiswa |
| `202155201001` | `password123` | 2021 | 7 | mahasiswa |
| `202255201001` | `password123` | 2022 | 5 | mahasiswa |
| `202355201001` | `password123` | 2023 | 3 | mahasiswa |
| `202455201001` | `password123` | 2024 | 1 | mahasiswa |

**Data Mahasiswa:**
- Nama: Nama Indonesia random
- Email: `{nim}@student.ft.unsri.ac.id`
- IPK: Random 2.5 - 4.0
- Jenis Kelamin: Bergantian (genap/ganjil)
- Alamat: Jl. Contoh No. {nomor}, Palembang

**Akses:**
- Student portal
- Course registration (KRS)
- Grade reports (KHS)
- Transcript
- KKP application
- Thesis submission
- Academic consultations
- Payment status
- Library services

---

## 🔍 Cara Generate Username

### Format Username per Role:

| Role | Format | Contoh |
|------|--------|--------|
| Admin | `admin` | `admin` |
| Dekan | `dekan` | `dekan` |
| Wakil Dekan | `wd{nomor}` | `wd1`, `wd2`, `wd3`, `wd4` |
| GKM | `gkm` | `gkm` |
| Kepala Prodi | `kaprodi_{kode_prodi}` | `kaprodi_55201` |
| Sekretaris Prodi | `sekprodi_{kode_prodi}` | `sekprodi_55201` |
| Dosen | `dosen{nomor_3_digit}` | `dosen001`, `dosen020` |
| Staff TU | `stafftu_{kode_prodi}` | `stafftu_55201` |
| Kepala TU | `kepala_tu` | `kepala_tu` |
| Admin Keuangan | `admin_keuangan{nomor}` | `admin_keuangan1` |
| Admin Umum | `admin_umum{nomor}` | `admin_umum1` |
| Lab Admin | `labadmin_{kode_prodi}` | `labadmin_55201` |
| Reading Room Admin | `rradmin_{kode_prodi}` | `rradmin_55201` |
| Mahasiswa | `{tahun}{kode_prodi}{urut_4_digit}` | `202055201001` |

### Kode Prodi yang Tersedia:

Tergantung dari data di `prisma/seeds/master-data-seed.ts`. Contoh:
- **55201** - Teknik Informatika
- **55202** - Teknik Sipil  
- **55203** - Teknik Elektro
- **55204** - Teknik Mesin
- **55205** - Arsitektur

---

## 🚀 Cara Menggunakan

### 1. Jalankan Seeding Database
```bash
# Reset database (jika perlu)
pnpm prisma migrate reset

# Atau jalankan seeding saja
pnpm prisma db seed
```

### 2. Login ke Aplikasi
```
URL: http://localhost:3000/login
```

### 3. Pilih Akun Sesuai Role yang Ingin Ditest
Gunakan username dan password `password123` untuk semua akun.

**Contoh Login:**
- **Admin**: `admin` / `password123`
- **Dekan**: `dekan` / `password123`
- **Mahasiswa**: `202055201001` / `password123`

### 4. Test Fitur Berdasarkan Role
Setiap role memiliki akses yang berbeda-beda sesuai dengan kebutuhan.

---

## 📊 Summary Akun

| Role | Jumlah | Pattern | Contoh |
|------|--------|---------|--------|
| Admin | 1 | `admin` | `admin` |
| Dekan | 1 | `dekan` | `dekan` |
| Wakil Dekan | 4 | `wd{n}` | `wd1`, `wd2`, `wd3`, `wd4` |
| GKM | 1 | `gkm` | `gkm` |
| Kepala Prodi | Per prodi | `kaprodi_{kode}` | `kaprodi_55201` |
| Sekretaris Prodi | Per prodi | `sekprodi_{kode}` | `sekprodi_55201` |
| Dosen Regular | 20 | `dosen{nnn}` | `dosen001` - `dosen020` |
| Staff TU | Per prodi | `stafftu_{kode}` | `stafftu_55201` |
| Kepala TU | 1 | `kepala_tu` | `kepala_tu` |
| Admin Keuangan | 2 | `admin_keuangan{n}` | `admin_keuangan1`, `admin_keuangan2` |
| Admin Umum | 2 | `admin_umum{n}` | `admin_umum1`, `admin_umum2` |
| Lab Admin | Per prodi | `labadmin_{kode}` | `labadmin_55201` |
| Reading Room Admin | Per prodi | `rradmin_{kode}` | `rradmin_55201` |
| Mahasiswa | 50 per prodi | `{tahun}{kode}{nnnn}` | `202055201001` |

**Total Estimasi:**
- **Leadership**: 7 (Admin, Dekan, 4 WD, GKM)
- **Dosen**: 20 + (2 × jumlah prodi) untuk Kaprodi & Sekprodi
- **Staff**: Per prodi × 3 + 5 (TU, Lab, RR per prodi + KTU + 2 Keuangan + 2 Umum)
- **Mahasiswa**: 50 × jumlah prodi

Untuk 5 prodi = **Lebih dari 300 user**

---

## 🔐 Keamanan

> **⚠️ PENTING:** 
> - Akun-akun ini **HANYA untuk testing/development**
> - **JANGAN** gunakan di production
> - **GANTI** semua password sebelum deploy ke production
> - Password default `password123` sangat lemah dan mudah ditebak
> - Implementasikan password hashing yang kuat di production

---

## 🛠️ Maintenance

### Generate Akun Baru

Edit file seeding:
```bash
prisma/seeds/users.ts
prisma/seeds/master-data-seed.ts
```

Jalankan seeding:
```bash
pnpm prisma db seed
```

### Reset Database
```bash
# Reset complete (drop + migrate + seed)
pnpm prisma migrate reset

# Atau manual
pnpm prisma migrate dev --name init
pnpm prisma db seed
```

### Troubleshooting

**Problem: Login gagal**
- Pastikan database sudah di-seed
- Check apakah username sudah benar
- Pastikan password menggunakan `password123`

**Problem: User tidak ada**
- Jalankan `pnpm prisma db seed` ulang
- Check file `prisma/seeds/master-data-seed.ts` untuk prodi yang tersedia

**Problem: Database error**
- Reset database: `pnpm prisma migrate reset`
- Rebuild Prisma client: `pnpm prisma generate`

---

## 📚 File Seeding

| File | Deskripsi |
|------|-----------|
| `prisma/seed-all.ts` | Entry point untuk seeding |
| `prisma/seeds/master-data-seed.ts` | Data master (prodi, dll) |
| `prisma/seeds/users.ts` | Data user dan role (file ini yang digunakan) |

---

## 📞 Referensi

- **GraphQL API**: `https://superapps.if.unismuh.ac.id/graphql`
- **Seeding File**: `prisma/seeds/users.ts`
- **Password Default**: `password123`
- **Email Pattern Mahasiswa**: `{nim}@student.ft.unsri.ac.id`
- **Email Pattern Dosen**: `{username}@ft.unsri.ac.id`

---

**Last Updated:** 1 November 2025  
**Version:** 2.1.0 (Added real lecturer data from SINTA CSV)

---

## 📂 Data Sources

- **User Seeding**: `prisma/seeds/users.ts`
- **Real Lecturer Data**: `dosen_teknik.csv` (64 dosen from SINTA)
- **Password Hash**: bcrypt with 10 rounds
- **Username Format**: NIDN (Nomor Induk Dosen Nasional)

---

## 🎯 Quick Login Examples

### Test Sub-Role Switching (Dekan)
```
Username: 0919017702
Password: password123
Sub-Roles: dekan, dosen
```
Login akan masuk ke **Dashboard Dekan**, klik **SubRoleSwitcher** di header untuk switch ke **Dashboard Dosen**.

### Test Sub-Role Switching (Wakil Dekan)
```
Username: 0928088206  
Password: password123
Sub-Roles: wakil_dekan_1, dosen
```
Login akan masuk ke **Dashboard Wakil Dekan 1**, bisa switch ke **Dashboard Dosen**.

### Test Regular Dosen
```
Username: 0930048304
Password: password123
Sub-Roles: dosen
```
Login langsung ke **Dashboard Dosen** (tidak ada sub-role lain).

