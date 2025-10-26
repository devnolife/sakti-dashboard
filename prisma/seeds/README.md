# Database Seeding Guide

Panduan untuk melakukan seeding data ke database.

## 🌱 Cara Menjalankan Seed

### 1. Seed Master Data (Program Studi)

Untuk seed hanya data master (prodi):

```bash
npm run seed:master-data
```

atau

```bash
pnpm run seed:master-data
```

### 2. Seed Semua Data

Untuk seed semua data termasuk users, courses, dll:

```bash
npm run db:seed-all
```

atau

```bash
pnpm run db:seed-all
```

## 📋 Data yang Di-seed

### Master Data (master-data-seed.ts)
- **Program Studi (Prodi)**:
  - S1 Teknik Informatika (S1TI)
  - S1 Sistem Informasi (S1SI)
  - S1 Teknik Elektro (S1TE)
  - S1 Teknik Mesin (S1TM)
  - S1 Akuntansi (S1AK)
  - S1 Manajemen (S1MN)

## 📝 Menambah Data Master

Untuk menambahkan data master baru (prodi), edit file `prisma/seeds/master-data-seed.ts`:

```typescript
const prodiData = [
  // ... existing data
  {
    kode: 'S1XX',
    nama: 'S1 Nama Program Studi',
    jenjang: 'S1',
    fakultas: 'Nama Fakultas',
    akreditasi: 'A', // atau 'B', 'C', null
  },
]
```

## 🔧 Mengedit Data Master Melalui Admin Dashboard

Setelah seed, data master dapat di-edit melalui dashboard admin:

1. Login sebagai admin
2. Navigasi ke **Master Data** > **Program Studi**
3. Klik **Tambah** untuk menambah data baru
4. Klik **Edit** pada row untuk mengedit data
5. Klik **Hapus** untuk menghapus data (hanya jika tidak ada data terkait)

## ⚠️ Catatan Penting

- Data seed menggunakan `upsert`, jadi aman untuk dijalankan berulang kali
- Jika data sudah ada (berdasarkan kode prodi), data akan di-update, bukan di-insert ulang
- Pastikan database sudah di-push dengan `npm run db:push` sebelum melakukan seed
- Untuk delete, pastikan tidak ada data mahasiswa/dosen/mata kuliah terkait

## 🗄️ Struktur Database

### Tabel: prodi
```sql
- kode: String (Primary Key)
- nama: String
- jenjang: String
- fakultas: String
- akreditasi: String?
- created_at: DateTime
- updated_at: DateTime
```

## 🔗 API Endpoints

Setelah seed, data dapat diakses melalui API:

- **GET** `/api/admin/master-data` - Ambil semua master data
- **POST** `/api/admin/master-data/prodi` - Tambah prodi baru
- **PUT** `/api/admin/master-data/prodi` - Update prodi
- **DELETE** `/api/admin/master-data/prodi?id={kode}` - Hapus prodi

## 🐛 Troubleshooting

### Error: Module not found
```bash
npm run db:generate
```

### Error: Prisma Client not generated
```bash
npm run db:generate
npm run seed:master-data
```

### Error: P2002 (Unique constraint violation)
Data dengan kode yang sama sudah ada. Gunakan kode yang berbeda atau update data yang ada.

### Error: P2025 (Record not found)
Data yang ingin di-update atau di-delete tidak ditemukan di database.

