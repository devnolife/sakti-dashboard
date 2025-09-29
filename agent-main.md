# 📝 Template Prompt untuk Pengembangan Fitur & Migrasi Data

## Template 1: Migrasi Data Statik ke Database Real

```
Saya ingin melakukan migrasi data statik ke database real untuk:

**Modul**: [Nama Modul - contoh: Manajemen KKP]
**Path Halaman**: [Path file - contoh: /app/dashboard/mahasiswa/kkp/page.tsx]
**Path Data Statik**: [Path data - contoh: /lib/data/kkp-dummy.ts]

**Data yang akan dimigrasi**:
- [List data yang perlu dimigrasi]
- [contoh: Daftar aplikasi KKP]
- [contoh: Status persetujuan]
- [contoh: Dokumen pendukung]

**Fungsi yang dibutuhkan**:
- [ ] GET - Ambil semua data
- [ ] GET - Ambil data by ID
- [ ] POST - Tambah data baru
- [ ] PUT - Update data
- [ ] DELETE - Hapus data
- [ ] Filter & Search
- [ ] Pagination
- [ ] Export data

**Relasi yang diperlukan**:
- [Relasi dengan tabel lain]
- [contoh: Student -> KkpApplication]
- [contoh: KkpApplication -> Company]

**Validasi yang diperlukan**:
- [Rule validasi]
- [contoh: Title minimal 10 karakter]
- [contoh: Tanggal mulai harus setelah hari ini]

**Informasi Tambahan**:
[Informasi atau requirement khusus]
```

## Template 2: Penambahan Fitur Baru

```
Saya ingin menambahkan fitur baru:

**Nama Fitur**: [Nama fitur yang akan ditambahkan]
**Dashboard**: [mahasiswa/dosen/admin/staff]
**Path Target**: [Path dimana fitur akan ditambahkan]

**Deskripsi Fitur**:
[Jelaskan secara detail apa yang dilakukan fitur ini]

**User Story**:
Sebagai [role], saya ingin [action] agar [benefit]

**Komponen UI yang dibutuhkan**:
- [ ] Form input
- [ ] Tabel data
- [ ] Modal/Dialog
- [ ] Charts/Grafik
- [ ] Upload file
- [ ] Filter/Search
- [ ] Export/Import
- [ ] Print view

**API Endpoints yang dibutuhkan**:
- [ ] GET /api/[endpoint]
- [ ] POST /api/[endpoint]
- [ ] PUT /api/[endpoint]/[id]
- [ ] DELETE /api/[endpoint]/[id]

**Schema Database**:
Apakah perlu menambahkan field/model baru?
- [ ] Ya, tambahkan: [detail field/model]
- [ ] Tidak, gunakan yang ada

**Integrasi dengan modul lain**:
- [Modul yang terhubung]
- [Data yang perlu di-share]

**Mockup/Referensi UI**:
[Link atau deskripsi tampilan yang diinginkan]
```

## Template 3: Enhancement Fitur Existing

```
Saya ingin meningkatkan fitur yang sudah ada:

**Fitur**: [Nama fitur]
**Lokasi**: [Path file yang akan diubah]
**Tipe Enhancement**: [Performance/UI/Functionality/Security]

**Masalah Saat Ini**:
[Jelaskan apa yang kurang dari fitur saat ini]

**Perbaikan yang Diinginkan**:
[Jelaskan hasil yang diharapkan]

**Perubahan yang Diperlukan**:
- [ ] Frontend changes
- [ ] Backend changes
- [ ] Database changes (tambahan field)
- [ ] API modifications
- [ ] Validation updates

**Impact Analysis**:
- Modul yang terpengaruh: [list modul]
- User yang terpengaruh: [role user]
```

## Template 4: Implementasi CRUD Lengkap

```
Implementasikan CRUD lengkap untuk:

**Entity**: [Nama entity - contoh: Pengajuan Surat]
**Path Base**: /app/dashboard/[role]/[feature]
**API Route**: /app/api/[feature]

**Fields yang dibutuhkan**:
| Field Name | Type | Required | Validation |
|------------|------|----------|------------|
| [field1]   | string | Yes | Min 3 chars |
| [field2]   | date | Yes | Future date |
| [field3]   | number | No | Positive |

**Fitur Tambahan**:
- [ ] Bulk operations
- [ ] Import/Export CSV
- [ ] Print functionality
- [ ] Email notifications
- [ ] Approval workflow
- [ ] File attachments
- [ ] Activity logs

**Permission/Access Control**:
- Create: [roles yang bisa create]
- Read: [roles yang bisa read]
- Update: [roles yang bisa update]
- Delete: [roles yang bisa delete]

**UI Components**:
- [ ] List view dengan DataTable
- [ ] Detail view
- [ ] Create/Edit form
- [ ] Delete confirmation
- [ ] Success/Error notifications
```

## Template 5: Integrasi & Koneksi Antar Modul

```
Saya ingin mengintegrasikan:

**Modul Sumber**: [Modul A]
**Path Sumber**: [Path modul A]
**Modul Target**: [Modul B]
**Path Target**: [Path modul B]

**Data yang Dibagikan**:
- [Field/data apa saja]
- [Arah data flow]

**Trigger/Event**:
- [Kapan integrasi terjadi]
- [contoh: Saat status berubah menjadi 'approved']

**Sinkronisasi**:
- [ ] Real-time
- [ ] Scheduled
- [ ] Manual trigger
- [ ] Event-based

**Validasi Konsistensi**:
[Rule untuk menjaga konsistensi data]
```

## 📌 Contoh Penggunaan Template

### Contoh 1: Migrasi Data KKP
```
Saya ingin melakukan migrasi data statik ke database real untuk:

**Modul**: Manajemen KKP Mahasiswa
**Path Halaman**: /app/dashboard/mahasiswa/kkp/page.tsx
**Path Data Statik**: /lib/data/mock-kkp.ts

**Data yang akan dimigrasi**:
- Daftar pengajuan KKP
- Status persetujuan (pending, approved, rejected)
- Informasi perusahaan
- Dokumen pendukung

**Fungsi yang dibutuhkan**:
- [x] GET - Ambil semua KKP by student
- [x] GET - Ambil detail KKP by ID
- [x] POST - Ajukan KKP baru
- [x] PUT - Update status KKP
- [x] DELETE - Batalkan pengajuan
- [x] Filter by status
- [x] Search by company name

**Relasi yang diperlukan**:
- Student -> KkpApplication (one-to-many)
- KkpApplication -> Company (many-to-one)
- KkpApplication -> KkpDocument (one-to-many)

**Validasi yang diperlukan**:
- Title minimal 20 karakter
- Tanggal mulai minimal H+7 dari pengajuan
- Maksimal 3 dokumen per pengajuan
- Dokumen maksimal 5MB

**Informasi Tambahan**:
Perlu approval workflow dengan 3 tahap: Staff TU -> Prodi -> Dekan
```

### Contoh 2: Fitur Baru Monitoring Kehadiran
```
Saya ingin menambahkan fitur baru:

**Nama Fitur**: Sistem Monitoring Kehadiran Lab
**Dashboard**: admin
**Path Target**: /app/dashboard/admin/lab/attendance

**Deskripsi Fitur**:
Sistem untuk memantau kehadiran mahasiswa di laboratorium, 
termasuk check-in/out, durasi, dan laporan kehadiran.

**User Story**:
Sebagai admin lab, saya ingin memantau kehadiran mahasiswa 
agar dapat membuat laporan penggunaan lab.

**Komponen UI yang dibutuhkan**:
- [x] Form check-in dengan QR scanner
- [x] Tabel real-time kehadiran
- [x] Modal detail mahasiswa
- [x] Charts statistik kehadiran
- [x] Export laporan PDF

**API Endpoints yang dibutuhkan**:
- [x] GET /api/lab/attendance
- [x] POST /api/lab/attendance/checkin
- [x] POST /api/lab/attendance/checkout
- [x] GET /api/lab/attendance/report

**Schema Database**:
Ya, tambahkan model LabAttendance dengan fields:
- studentId (relation ke Student)
- labId (relation ke Laboratory)
- checkIn (DateTime)
- checkOut (DateTime?)
- duration (Int?)
- purpose (String)
```

## 💡 Tips Penggunaan Template

1. **Gunakan checkbox** [x] untuk menandai item yang penting
2. **Berikan contoh konkret** untuk memperjelas kebutuhan
3. **Sertakan path lengkap** untuk memudahkan navigasi
4. **Jelaskan relasi** antar data dengan jelas
5. **Spesifikan validasi** untuk menjaga integritas data
6. **Tambahkan mockup** jika ada referensi UI tertentu

## 🔗 Template Kombinasi

Anda bisa mengkombinasikan beberapa template, contoh:
"Saya ingin melakukan migrasi data (Template 1) dan sekaligus menambahkan fitur baru (Template 2) untuk modul X"