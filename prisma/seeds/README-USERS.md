# 📋 User Seed Documentation

Dokumentasi lengkap untuk semua user yang dibuat oleh seed script.

## 🔑 Default Password

**Semua user menggunakan password yang sama:**
```
password123
```

---

## 👤 1. ADMIN

| Username | Nama | Role | Sub Role |
|----------|------|------|----------|
| `admin` | Administrator Sistem | `admin` | - |

**Akses:** Full system administrator dengan akses penuh ke semua fitur sistem.

---

## 👨‍🏫 2. DOSEN - LEADERSHIP ROLES

### 🎖️ Dekan & Wakil Dekan

| Username | Nama | Sub Role | Jabatan |
|----------|------|----------|---------|
| `dekan` | Prof. Dr. Ahmad Dekan, S.T., M.T. | `dekan` | Dekan Fakultas Teknik |
| `wd1` | Dr. Budi Santoso, S.T., M.T. | `wakil_dekan_1` | Wakil Dekan I (Bidang Akademik) |
| `wd2` | Dr. Siti Rahayu, S.E., M.M. | `wakil_dekan_2` | Wakil Dekan II (Administrasi Umum & Keuangan) |
| `wd3` | Dr. Eko Prasetyo, S.T., M.T. | `wakil_dekan_3` | Wakil Dekan III (Kemahasiswaan & Alumni) |
| `wd4` | Dr. Rina Wati, S.T., M.Sc. | `wakil_dekan_4` | Wakil Dekan IV (Kerjasama & Pengembangan) |

### 📊 Gugus Kendali Mutu (GKM)

| Username | Nama | Sub Role | Jabatan |
|----------|------|----------|---------|
| `gkm` | Dr. Indra Gunawan, S.T., M.T. | `gkm` | Ketua Gugus Kendali Mutu |

### 🎓 Kepala Program Studi (Dinamis per Prodi)

Format username: `kaprodi_[kode_prodi]`

Contoh untuk prodi yang ada di database:
- `kaprodi_if` - Kepala Prodi Teknik Informatika
- `kaprodi_si` - Kepala Prodi Sistem Informasi
- `kaprodi_te` - Kepala Prodi Teknik Elektro
- dst...

**Sub Role:** `prodi`

### 📝 Sekretaris Program Studi (Dinamis per Prodi)

Format username: `sekprodi_[kode_prodi]`

Contoh untuk prodi yang ada di database:
- `sekprodi_if` - Sekretaris Prodi Teknik Informatika
- `sekprodi_si` - Sekretaris Prodi Sistem Informasi
- `sekprodi_te` - Sekretaris Prodi Teknik Elektro
- dst...

**Sub Role:** `sekretaris_prodi`

### 👨‍🏫 Dosen Reguler

| Username Pattern | Jumlah | Sub Role | Keterangan |
|-----------------|--------|----------|------------|
| `dosen001` - `dosen020` | 20 | `dosen` | Dosen pengajar reguler, terdistribusi ke semua prodi |

**Jabatan Akademik:** Asisten Ahli, Lektor, Lektor Kepala, Profesor (random)

---

## 👥 3. STAFF ROLES

### 📋 Staff Tata Usaha (Dinamis per Prodi)

Format username: `stafftu_[kode_prodi]`

Contoh:
- `stafftu_if` - Staff TU Teknik Informatika
- `stafftu_si` - Staff TU Sistem Informasi
- `stafftu_te` - Staff TU Teknik Elektro
- dst...

**Role:** `staff_tu`
**Jumlah:** 1 staff per prodi

### 👔 Kepala Tata Usaha

| Username | Nama | Role |
|----------|------|------|
| `kepala_tu` | Drs. Bambang Supriadi, M.M. | `kepala_tata_usaha` |

### 💰 Admin Keuangan

| Username | Role | Jumlah |
|----------|------|--------|
| `admin_keuangan1` | `admin_keuangan` | 2 users |
| `admin_keuangan2` | `admin_keuangan` |

### 🏢 Admin Umum

| Username | Role | Jumlah |
|----------|------|--------|
| `admin_umum1` | `admin_umum` | 2 users |
| `admin_umum2` | `admin_umum` |

### 🔬 Lab Administrator (Dinamis per Prodi)

Format username: `labadmin_[kode_prodi]`

Contoh:
- `labadmin_if` - Admin Lab Teknik Informatika
- `labadmin_si` - Admin Lab Sistem Informasi
- `labadmin_te` - Admin Lab Teknik Elektro
- dst...

**Role:** `laboratory_admin`
**Jumlah:** 1 admin per prodi

### 📚 Reading Room Administrator (Dinamis per Prodi)

Format username: `rradmin_[kode_prodi]`

Contoh:
- `rradmin_if` - Admin Ruang Baca Teknik Informatika
- `rradmin_si` - Admin Ruang Baca Sistem Informasi
- `rradmin_te` - Admin Ruang Baca Teknik Elektro
- dst...

**Role:** `reading_room_admin`
**Jumlah:** 1 admin per prodi

---

## 🎓 4. MAHASISWA (STUDENTS)

### Format NIM

```
[TAHUN][KODE_PRODI][NOMOR_URUT]
```

Contoh:
- `2024IF0001` - Mahasiswa Teknik Informatika angkatan 2024
- `2023SI0005` - Mahasiswa Sistem Informasi angkatan 2023

### Distribusi Mahasiswa

- **Jumlah per Prodi:** 50 mahasiswa
- **Angkatan:** 2020, 2021, 2022, 2023, 2024 (10 mahasiswa per angkatan)
- **Total Mahasiswa:** 50 × jumlah prodi

### Data Mahasiswa

Setiap mahasiswa memiliki:
- ✅ NIM sebagai username
- ✅ Nama dari daftar nama Indonesia
- ✅ Email: `[NIM]@student.ft.unsri.ac.id`
- ✅ Semester otomatis (berdasarkan angkatan)
- ✅ GPA random antara 2.5 - 4.0
- ✅ Data wali (guardian)
- ✅ Jenis kelamin (bergantian laki-laki/perempuan)

---

## 📊 RINGKASAN JUMLAH USER

Dengan asumsi ada **N** program studi:

| Kategori | Jumlah | Keterangan |
|----------|--------|------------|
| **Admin** | 1 | System administrator |
| **Dekan & Wakil** | 5 | 1 Dekan + 4 Wakil Dekan |
| **GKM** | 1 | Gugus Kendali Mutu |
| **Kepala Prodi** | N | 1 per prodi |
| **Sekretaris Prodi** | N | 1 per prodi |
| **Dosen Reguler** | 20 | Terdistribusi ke semua prodi |
| **Staff TU** | N | 1 per prodi |
| **Kepala TU** | 1 | Level fakultas |
| **Admin Keuangan** | 2 | Level fakultas |
| **Admin Umum** | 2 | Level fakultas |
| **Lab Admin** | N | 1 per prodi |
| **Reading Room Admin** | N | 1 per prodi |
| **Mahasiswa** | 50 × N | 50 per prodi |
| **TOTAL** | **30 + 4N + 50N** | **30 + 54N** |

### Contoh dengan 5 Prodi:
- Admin & Staff: 30
- Staff per Prodi (4): 20
- Mahasiswa (50 × 5): 250
- **TOTAL: 300 users**

---

## 🔐 LOGIN EXAMPLES

### Admin
```
Username: admin
Password: password123
```

### Dekan
```
Username: dekan
Password: password123
```

### Kepala Prodi Teknik Informatika
```
Username: kaprodi_if
Password: password123
```

### Staff TU Teknik Informatika
```
Username: stafftu_if
Password: password123
```

### Mahasiswa
```
Username: 2024IF0001  (atau NIM lainnya)
Password: password123
```

---

## 🚀 CARA MENJALANKAN SEED

### 1. Reset Database (Opsional)
```bash
npx prisma migrate reset
```

### 2. Jalankan Seed
```bash
npx prisma db seed
# atau
npm run seed
# atau
node prisma/seed-all.ts
```

### 3. Verifikasi
Cek di database atau login menggunakan username yang ada di dokumentasi ini.

---

## 📝 CATATAN PENTING

1. **Master Data Prodi** harus di-seed terlebih dahulu sebelum users
2. Jumlah user dinamis mengikuti jumlah prodi yang ada di database
3. Semua password default adalah `password123`
4. NIP dan NIM dibuat secara otomatis dengan format unik
5. Email dibuat otomatis dengan format standar

---

## 🎯 SUB-ROLE HIERARCHY

```
dosen (role)
  ├── dekan (sub_role)
  ├── wakil_dekan_1 (sub_role)
  ├── wakil_dekan_2 (sub_role)
  ├── wakil_dekan_3 (sub_role)
  ├── wakil_dekan_4 (sub_role)
  ├── gkm (sub_role)
  ├── prodi (sub_role) - Kepala Prodi
  ├── sekretaris_prodi (sub_role)
  └── dosen (sub_role) - Dosen Reguler
```

---

## 🔄 UPDATE & MAINTENANCE

Untuk update seed:
1. Edit file `prisma/seeds/users.ts`
2. Modify data sesuai kebutuhan
3. Jalankan ulang seed

---

## 📞 SUPPORT

Jika ada masalah dengan seeding:
1. Pastikan database connection benar
2. Pastikan master data prodi sudah ter-seed
3. Cek console log untuk error details
4. Drop dan recreate database jika perlu

---

**Generated by:** User Seed Script v1.0
**Last Updated:** 2025

