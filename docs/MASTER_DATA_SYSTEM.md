# Sistem Master Data - Dashboard Admin

## 📋 Ringkasan

Sistem master data untuk admin dashboard telah dirancang ulang untuk menggunakan data real dari database, bukan mockup/fake data. Admin dapat mengelola data master (Program Studi) melalui dashboard dan semua perubahan akan tersimpan ke database.

## 🎯 Fitur Utama

### 1. Master Data Management
- CRUD operations untuk Program Studi (Create, Read, Update, Delete)
- Validasi data sebelum insert/update
- Perlindungan delete jika ada data terkait (mahasiswa, dosen, dll)
- Real-time update dari database

### 2. Prodi Overview
- Statistik per program studi:
  - Total akun (mahasiswa)
  - Akun aktif
  - Total dosen
  - Dosen aktif
  - Jumlah dokumen
  - Kelengkapan dokumen
  - Status sistem

### 3. Database Seeding
- Seed initial data untuk program studi
- Upsert mechanism (aman untuk di-run berulang kali)
- Mudah ditambahkan data baru

## 🗂️ Struktur File

```
.
├── app/
│   ├── api/
│   │   └── admin/
│   │       ├── master-data/
│   │       │   ├── route.ts              # GET all master data
│   │       │   └── prodi/
│   │       │       └── route.ts          # POST, PUT, DELETE prodi
│   │       └── prodi/
│   │           └── overview/
│   │               └── route.ts          # GET prodi statistics
│   └── dashboard/
│       └── admin/
│           ├── master-data/
│           │   └── page.tsx              # UI untuk CRUD master data
│           └── prodi/
│               └── overview/
│                   └── page.tsx          # UI untuk overview prodi
├── prisma/
│   └── seeds/
│       ├── master-data-seed.ts           # Seed data untuk prodi
│       └── README.md                     # Dokumentasi seeding
└── docs/
    └── MASTER_DATA_SYSTEM.md             # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### Setup Awal

1. **Generate Prisma Client** (jika belum):
```bash
npm run db:generate
```

2. **Push Schema ke Database**:
```bash
npm run db:push
```

3. **Seed Master Data**:
```bash
npm run seed:master-data
```

### Mengelola Data di Dashboard

1. Login sebagai admin
2. Navigasi ke **Master Data** di sidebar
3. Tab **Program Studi**:
   - **Tambah**: Klik tombol "Tambah Program Studi"
   - **Edit**: Klik icon edit pada row
   - **Hapus**: Klik icon hapus pada row (dengan konfirmasi)

### Melihat Overview Prodi

1. Login sebagai admin
2. Navigasi ke **Manajemen Prodi** > **Overview Prodi**
3. Lihat statistik per program studi
4. Filter berdasarkan prodi tertentu menggunakan dropdown

## 🔧 API Endpoints

### Master Data

#### GET `/api/admin/master-data`
Mengambil semua master data (prodi)

**Response:**
```json
{
  "programs": [
    {
      "id": "S1TI",
      "code": "S1TI",
      "name": "S1 Teknik Informatika",
      "status": "active",
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z",
      "fakultas": "Fakultas Teknik",
      "jenjang": "S1",
      "akreditasi": "A"
    }
  ],
  "faculties": []
}
```

#### POST `/api/admin/master-data/prodi`
Membuat prodi baru

**Request Body:**
```json
{
  "code": "S1XX",
  "name": "S1 Program Studi Baru",
  "fakultas": "Fakultas Teknik",
  "jenjang": "S1",
  "akreditasi": "A"
}
```

#### PUT `/api/admin/master-data/prodi`
Update prodi existing

**Request Body:**
```json
{
  "id": "S1TI",
  "code": "S1TI",
  "name": "S1 Teknik Informatika (Updated)",
  "fakultas": "Fakultas Teknik",
  "jenjang": "S1",
  "akreditasi": "A"
}
```

#### DELETE `/api/admin/master-data/prodi?id={kode}`
Hapus prodi

**Error Handling:**
- Akan gagal jika ada mahasiswa terkait dengan prodi tersebut
- Return error message yang jelas

### Prodi Overview

#### GET `/api/admin/prodi/overview`
Mengambil statistik semua program studi

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "S1TI",
      "code": "S1TI",
      "name": "S1 Teknik Informatika",
      "faculty": "Fakultas Teknik",
      "totalAccounts": 450,
      "activeAccounts": 425,
      "totalDosen": 25,
      "activeDosen": 24,
      "totalDocuments": 150,
      "requiredDocuments": 900,
      "completedDocuments": 150,
      "systemStatus": "active",
      "jenjang": "S1",
      "akreditasi": "A"
    }
  ]
}
```

## 🔐 Authorization

Semua endpoint dilindungi dengan authentication middleware:
- Memerlukan token Bearer di header Authorization
- Hanya role `admin` yang dapat mengakses

**Header Example:**
```
Authorization: Bearer {session-token}
```

## 🗄️ Database Schema

### Tabel: prodi

| Column | Type | Description |
|--------|------|-------------|
| kode | String | Primary Key, kode unik prodi |
| nama | String | Nama program studi |
| jenjang | String | Jenjang pendidikan (S1, S2, S3) |
| fakultas | String | Nama fakultas |
| akreditasi | String? | Akreditasi (A, B, C) - nullable |
| created_at | DateTime | Waktu dibuat |
| updated_at | DateTime | Waktu terakhir diupdate |

### Relations
- `students` - One to Many
- `lecturers` - One to Many
- `courses` - One to Many
- `laboratories` - One to Many
- `academic_events` - One to Many
- dll (lihat schema.prisma untuk detail lengkap)

## ✅ Data Validasi

### Create/Update Prodi
- `code`: Required, unique
- `name`: Required
- `fakultas`: Required
- `jenjang`: Required (default: "S1")
- `akreditasi`: Optional

### Delete Prodi
- Tidak dapat dihapus jika ada:
  - Mahasiswa terkait
  - Dosen terkait
  - Mata kuliah terkait
  - dll

## 🎨 UI/UX Features

### Master Data Page
- **Search**: Cari berdasarkan kode atau nama
- **Filter Status**: Filter active/inactive (untuk future)
- **Pagination**: Otomatis (untuk data banyak)
- **Real-time Update**: Data refresh setelah create/update/delete
- **Loading States**: Indicator saat fetch data
- **Error Handling**: Alert message untuk error

### Prodi Overview Page
- **Filter Prodi**: Dropdown untuk filter prodi spesifik
- **Quick Stats Cards**: 4 kartu statistik utama
- **Individual Prodi Cards**: Card per prodi dengan detail
- **Tabs**: Perbandingan dan Tren (untuk future development)
- **Responsive Design**: Mobile-friendly

## 🔄 Data Flow

```
User Action (UI)
    ↓
Frontend (page.tsx)
    ↓
API Route (route.ts)
    ↓
Auth Middleware (verifyAuth)
    ↓
Prisma Query (database)
    ↓
Response to Frontend
    ↓
UI Update
```

## 📊 Perhitungan Statistik

### Total Accounts
```typescript
COUNT(students WHERE prodi_id = {kode})
```

### Active Accounts
```typescript
COUNT(students WHERE prodi_id = {kode} AND status = 'active')
```

### Total Dosen
```typescript
COUNT(lecturers WHERE prodi_id = {kode})
```

### Total Documents
```typescript
COUNT(kkp_documents) + COUNT(exam_documents)
WHERE student.prodi_id = {kode}
```

### Required Documents
```typescript
student_count * 2  // Contoh: 2 dokumen per mahasiswa
```

## 🐛 Error Handling

### Frontend
- Try-catch untuk semua API calls
- Alert untuk error messages
- Console.error untuk debugging

### Backend
- Prisma error handling (P2002, P2025, dll)
- Custom error messages
- Status codes yang sesuai (400, 401, 404, 500)

## 🔮 Future Enhancements

1. **Fakultas Management**: CRUD untuk fakultas
2. **Bulk Operations**: Import/export Excel
3. **Audit Trail**: Log semua perubahan data
4. **Advanced Filters**: Filter by akreditasi, fakultas, dll
5. **Data Analytics**: Grafik perbandingan antar prodi
6. **Export Reports**: PDF/Excel reports
7. **Data Archiving**: Soft delete untuk prodi

## 📝 Notes

- Semua data mockup telah dihapus
- Sistem sekarang menggunakan data real dari database
- Seed file dapat dijalankan berulang kali (upsert)
- Data dapat di-edit melalui UI admin dashboard
- Authorization menggunakan session token dari localStorage

## 🆘 Troubleshooting

### Data tidak muncul di dashboard
1. Pastikan seed sudah dijalankan
2. Check console browser untuk error
3. Check network tab untuk API response
4. Pastikan token valid di localStorage

### Error saat create/update
1. Check required fields
2. Pastikan kode unique (untuk create)
3. Check console untuk error details

### Error saat delete
1. Check apakah ada data terkait (mahasiswa, dll)
2. Hapus data terkait terlebih dahulu
3. Atau gunakan soft delete (future enhancement)

## 📞 Support

Untuk pertanyaan atau issue, silakan buat issue di repository atau hubungi tim development.


