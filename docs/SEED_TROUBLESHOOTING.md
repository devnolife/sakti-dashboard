# Cara Mengatasi Error Seed: Unique Constraint Failed

## Error yang Muncul
```
Unique constraint failed on the fields: (`id`)
```

## Penyebab
Data dengan ID yang sama sudah ada di database (seed sudah pernah dijalankan sebelumnya).

## Solusi

### Option 1: Reset dan Seed Ulang (Recommended)

Gunakan script yang sudah disediakan:

```bash
npx tsx prisma/reset-and-seed.ts
```

Script ini akan:
1. ✅ Menghapus semua data seed yang ada
2. ✅ Menjalankan ulang seed dengan data baru

### Option 2: Reset Database Lengkap

Jika ingin mereset seluruh database (termasuk migrasi):

```bash
npx prisma migrate reset
```

**⚠️ Warning:** Ini akan menghapus SEMUA data di database!

Setelah reset, jalankan seed:
```bash
npx tsx prisma/seed-all.ts
```

### Option 3: Hapus Data Manual

Jika hanya ingin menghapus data tertentu:

```bash
npx prisma studio
```

Buka Prisma Studio dan hapus record yang conflict secara manual.

### Option 4: Skip Data yang Sudah Ada

Edit file `prisma/seed-all.ts` dan uncomment bagian clear data:

```typescript
// Uncomment baris 71-116 di seed-all.ts
console.log('🧹 Clearing existing seed data...');
await prisma.course_schedules.deleteMany({});
await prisma.grades.deleteMany({});
// ... dan seterusnya
```

## Cara Mencegah Error Ini

### Untuk Development
Gunakan reset-and-seed script setiap kali ingin seed ulang:

```bash
npx tsx prisma/reset-and-seed.ts
```

### Untuk Production
Jangan jalankan seed di production! Gunakan migrations saja.

## Troubleshooting

### Error: "Foreign key constraint failed"

Hapus data dalam urutan yang benar (child terlebih dahulu):

1. Detail records (contoh: course_schedules, grades)
2. Parent records (contoh: courses, students)
3. Users terakhir

### Error: "Table does not exist"

Jalankan migrasi terlebih dahulu:

```bash
npx prisma migrate dev
```

### Error: "Cannot connect to database"

Cek DATABASE_URL di `.env`:

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
```

## Quick Commands

```bash
# Reset database dan seed
npx tsx prisma/reset-and-seed.ts

# Hanya seed (tanpa reset)
npx tsx prisma/seed-all.ts

# Reset total (hapus semua + re-migrate)
npx prisma migrate reset

# Lihat data di database
npx prisma studio
```

## File Reference

- Main Seed: `prisma/seed-all.ts`
- Reset Script: `prisma/reset-and-seed.ts`
- Schema: `prisma/schema.prisma`
