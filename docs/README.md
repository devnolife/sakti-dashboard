# 📚 Dokumentasi Dashboard FT UNISMUH Makassar

Dokumentasi lengkap sistem dashboard Fakultas Teknik Universitas Muhammadiyah Makassar.

## 📖 Daftar Dokumentasi

### 🎯 Sistem Utama

- **[CORRESPONDENCE_SYSTEM.md](./CORRESPONDENCE_SYSTEM.md)** - Sistem surat menyurat
- **[PRODI_CREATE_LETTER_FEATURE.md](./PRODI_CREATE_LETTER_FEATURE.md)** - Fitur pembuatan surat prodi
- **[AKUN_PIMPINAN.md](./AKUN_PIMPINAN.md)** - Manajemen akun pimpinan

### 🔧 Setup & Konfigurasi

- **[ADMIN_SYSTEM_GUIDE.md](./ADMIN_SYSTEM_GUIDE.md)** - Panduan sistem admin
- **[AKUN-TESTING.md](./AKUN-TESTING.md)** - Akun untuk testing
- **[DIGITAL_SIGNATURE_GUIDE.md](./DIGITAL_SIGNATURE_GUIDE.md)** - Panduan tanda tangan digital
- **[MINIO_SETUP.md](./MINIO_SETUP.md)** - Setup MinIO storage
- **[MINIO_PROXY_SOLUTION.md](./MINIO_PROXY_SOLUTION.md)** - Solusi proxy MinIO
- **[TEMPLATE_VARIABLE_EDITOR_GUIDE.md](./TEMPLATE_VARIABLE_EDITOR_GUIDE.md)** - Editor template variabel
- **[PRODI_MASTER_BACKUP.md](./PRODI_MASTER_BACKUP.md)** - Backup data master prodi

## 🗂️ Struktur Project

```
dashboard/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities & helpers
├── prisma/          # Database schema & seeds
├── docs/            # Dokumentasi (folder ini)
└── public/          # Static files
```

## 🌱 Seeding Data

### Master Data Prodi
```bash
npm run seed:prodi-master
```

### Production Seed (dengan data SINTA)
```bash
npm run db:seed-production
```

### Master Data General
```bash
npm run seed:master-data
```

## 🔑 Default Credentials

Lihat file `AKUN-TESTING.md` di root project untuk daftar lengkap akun testing.

## 🆘 Troubleshooting

### Data Prodi Hilang
Jalankan restore command:
```bash
npm run seed:prodi-master
```

### Database Error
1. Check connection di `.env`
2. Generate Prisma client: `npm run db:generate`
3. Push schema: `npm run db:push`

## 📞 Support

Untuk pertanyaan atau issue, hubungi tim developer.

---

**Last Updated**: November 24, 2025
