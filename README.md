# Dashboard FT UNISMUH Makassar

Dashboard sistem informasi Fakultas Teknik Universitas Muhammadiyah Makassar.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
pnpm db:generate

# Push database schema
pnpm db:push

# Seed master data
pnpm seed:prodi-master
pnpm db:seed-production

# Run development server
pnpm dev
```

## 📚 Dokumentasi

Dokumentasi lengkap tersedia di folder [`docs/`](./docs/README.md):

- [Setup & Konfigurasi](./docs/README.md)
- [Sistem Surat](./docs/CORRESPONDENCE_SYSTEM.md)
- [Akun Testing](./docs/AKUN-TESTING.md)
- [MinIO Setup](./docs/MINIO_SETUP.md)
- [Backup Data Prodi](./docs/PRODI_MASTER_BACKUP.md)

## 🗂️ Struktur Project

```
dashboard/
├── app/              # Next.js 14 App Router
├── components/       # React Components
│   ├── ui/          # shadcn/ui components
│   ├── admin/       # Admin components
│   ├── dosen/       # Dosen components
│   └── ...
├── lib/             # Utilities & helpers
├── prisma/          # Database schema & seeds
├── docs/            # Dokumentasi
├── scripts/         # Utility scripts
└── public/          # Static files
```

## 🌱 Database Seeding

```bash
# Restore master prodi (jika data hilang)
pnpm seed:prodi-master

# Seed production dengan data SINTA
pnpm db:seed-production

# Seed super admin
pnpm seed:super-admin
```

## 🔑 Default Credentials

Lihat [AKUN-TESTING.md](./docs/AKUN-TESTING.md) untuk daftar lengkap akun.

**Super Admin:**
- Username: `admin.umum`
- Password: `password123`

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL, Prisma ORM
- **Storage**: MinIO
- **Auth**: JWT, bcrypt
- **API**: GraphQL (SINTA integration)

## 📦 Available Scripts

```bash
pnpm dev              # Development server (port 3002)
pnpm build            # Production build
pnpm start            # Start production server
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm seed:prodi-master # Restore master prodi
```

## 🆘 Troubleshooting

### Port 3002 sudah digunakan
```bash
# Windows (PowerShell)
Get-NetTCPConnection -LocalPort 3002 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

### Database connection error
1. Periksa `.env` untuk database credentials
2. Pastikan PostgreSQL berjalan
3. Run `pnpm db:push`

### Data prodi hilang
```bash
pnpm seed:prodi-master
```

## 📞 Support

Untuk pertanyaan atau issue, hubungi tim developer atau buat issue di repository.

---

**© 2025 Fakultas Teknik UNISMUH Makassar**
