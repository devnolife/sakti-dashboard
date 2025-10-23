# Quick Start: Role Configuration

## Solusi Sementara (Sudah Diterapkan) ✅

Role `admin` sudah ditambahkan ke `config/role-configs.tsx` dengan:
- Icon: Shield
- Title: Administrator
- Subtitle: System Management

**Aplikasi sudah bisa berjalan dengan role admin!**

## Solusi Jangka Panjang (Database-Driven)

### Keuntungan Sistem Database:
1. ✅ Admin bisa mengubah konfigurasi role tanpa coding
2. ✅ Tidak perlu deploy ulang aplikasi
3. ✅ Mudah menambah role baru
4. ✅ Semua perubahan tercatat dengan timestamp
5. ✅ Lebih scalable dan maintainable

### Yang Sudah Disiapkan:

#### 1. Database Schema
File: `prisma/schema.prisma`
```prisma
model role_configurations {
  id          String   @id
  role        Role     @unique
  title       String
  subtitle    String
  icon_name   String
  description String?
  is_active   Boolean  @default(true)
  created_at  DateTime @default(now())
  updated_at  DateTime
}
```

#### 2. Seed Data
File: `prisma/seed-all.ts` - sudah include data untuk semua role

#### 3. API Endpoints
File: `app/api/role-configurations/route.ts`
- GET: Ambil semua role configurations
- POST: Buat role baru
- PUT: Update role configuration

### Cara Implementasi:

#### Step 1: Generate & Migrate Database
```bash
npx prisma generate
npx prisma migrate dev --name add_role_configurations
```

#### Step 2: Seed Data
```bash
npx tsx prisma/seed-all.ts
```

#### Step 3: Update Component untuk Fetch dari Database

**Option A - Server Component (Recommended):**
```tsx
import { prisma } from '@/lib/prisma';

export default async function YourPage() {
  const roleConfig = await prisma.role_configurations.findUnique({
    where: { role: 'admin', is_active: true }
  });

  return <YourComponent config={roleConfig} />;
}
```

**Option B - Client Component:**
```tsx
'use client';

useEffect(() => {
  fetch('/api/role-configurations')
    .then(res => res.json())
    .then(setConfigs);
}, []);
```

### Langkah Berikutnya:

1. **Generate Prisma**
   ```bash
   npx prisma generate
   ```

2. **Run Migration**
   ```bash
   npx prisma migrate dev
   ```

3. **Seed Database**
   ```bash
   npx tsx prisma/seed-all.ts
   ```

4. **Buat Admin Panel** (Optional)
   - Halaman untuk CRUD role configurations
   - Pilihan icon dropdown
   - Toggle active/inactive
   - Form edit title, subtitle, description

### File Reference:
- Schema: `prisma/schema.prisma`
- Seed: `prisma/seed-all.ts`
- API: `app/api/role-configurations/route.ts`
- Config: `config/role-configs.tsx` (fallback)
- Docs: `docs/ROLE_CONFIGURATION_DYNAMIC.md`

## Testing

Setelah implementasi, test dengan:
1. Login sebagai admin
2. Verify layout tampil dengan benar
3. Try mengedit configuration via API
4. Refresh page dan lihat perubahan

## Rollback

Jika ada masalah:
```bash
git checkout config/role-configs.tsx
npx prisma migrate reset
```

Sistem akan kembali menggunakan hard-coded configurations.
