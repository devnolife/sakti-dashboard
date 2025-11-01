# API Routes Cleanup - GraphQL Migration

## Status: Prisma API Routes Removal

Karena project sudah migrasi ke GraphQL penuh, banyak API routes (`app/api/*`) yang masih menggunakan Prisma sudah tidak diperlukan lagi.

---

## ✅ Yang Sudah Dihapus

### KKP Requirements
- ❌ `app/api/kkp/requirements/route.ts` - Digantikan dengan `getKkpRequirementsByProdi()`
- ❌ `app/api/kkp/requirements/[id]/route.ts` - Tidak diperlukan lagi

---

## ⚠️ File yang Masih Menggunakan Prisma

Total: **59+ files** di `app/api/` masih import prisma

### Categories:

#### 1. Student API Routes
- `app/api/student/exams/route.ts`
- `app/api/student/exams/requirements/route.ts`
- `app/api/student/exams/submissions/route.ts`
- `app/api/student/exams/register/route.ts`
- `app/api/student/aik-komfren/route.ts`
- `app/api/student/aik-komfren/register/route.ts`

#### 2. Admin API Routes
- `app/api/admin/prodi/overview/route.ts`
- `app/api/admin/master-data/route.ts`
- `app/api/admin/master-data/prodi/route.ts`
- `app/api/admin/academic-calendar/route.ts`
- `app/api/admin/curriculum/[id]/courses/route.ts`
- `app/api/admin/curriculum/[id]/route.ts`
- `app/api/admin/curriculum/route.ts`
- `app/api/admin/classrooms/[id]/route.ts`
- `app/api/admin/classrooms/route.ts`
- `app/api/admin/reading-room-admins/[id]/route.ts`
- `app/api/admin/reading-room-admins/route.ts`
- `app/api/admin/users/reset-password/route.ts`
- `app/api/admin/dashboard/comprehensive/route.ts`
- `app/api/admin/master-data/departments/route.ts`
- `app/api/admin/notifications/templates/route.ts`
- `app/api/admin/integrations/route.ts`
- `app/api/admin/document-templates/route.ts`
- `app/api/admin/workflows/route.ts`
- `app/api/admin/system-config/route.ts`
- `app/api/admin/statistics/route.ts`
- `app/api/admin/config/route.ts`
- `app/api/admin/override/route.ts`
- `app/api/admin/companies/route.ts`
- `app/api/admin/letter-types/route.ts`
- `app/api/admin/book-categories/route.ts`

#### 3. Dosen API Routes
- `app/api/dosen/thesis-titles/route.ts`
- `app/api/dosen/students/route.ts`
- `app/api/dosen/dashboard/route.ts`
- `app/api/dosen/kkp/route.ts`
- `app/api/dosen/exams/route.ts`
- `app/api/dosen/exams/grading/route.ts`

#### 4. KKP API Routes
- `app/api/kkp/locations/route.ts`
- `app/api/kkp/locations/[id]/route.ts`
- `app/api/kkp/companies/route.ts`
- `app/api/kkp/applications/route.ts`

#### 5. Auth & Users
- `app/api/auth/me/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/route.ts`
- `app/api/students/route.ts`

#### 6. Other
- `app/api/announcements/[id]/route.ts`
- `app/api/announcements/route.ts`
- `app/api/role-configurations/route.ts`
- `app/api/prodi/sync/route.ts`

---

## 🎯 Rekomendasi

### Option 1: Delete Unused API Routes (Recommended)
Hapus semua API routes yang:
1. Sudah tidak digunakan di frontend
2. Sudah digantikan dengan GraphQL
3. Masih pakai Prisma

**Benefit:**
- Clean codebase
- Tidak ada dead code
- Konsisten dengan arsitektur GraphQL

### Option 2: Create Stub Routes
Buat stub routes yang return error untuk backward compatibility:
```typescript
export async function GET() {
  return NextResponse.json({
    error: 'This API route has been deprecated. Please use GraphQL endpoint.'
  }, { status: 410 })
}
```

**Benefit:**
- Backward compatibility
- Clear deprecation message
- Can track usage

### Option 3: Gradual Migration
Migrate satu-satu API route ke GraphQL actions sesuai kebutuhan.

---

## 📝 Action Items

### Immediate (Priority 1)
- [x] Hapus `app/api/kkp/requirements/route.ts` - DONE
- [x] Hapus `app/api/kkp/requirements/[id]/route.ts` - DONE
- [ ] Audit API routes mana yang masih digunakan
- [ ] List API routes yang bisa dihapus

### Short Term (Priority 2)
- [ ] Buat script untuk hapus semua unused API routes
- [ ] Update components yang masih pakai API routes
- [ ] Migrate ke GraphQL actions

### Long Term (Priority 3)
- [ ] Complete GraphQL migration
- [ ] Remove all Prisma dependencies
- [ ] Update documentation

---

## 🔍 How to Find Unused API Routes

### 1. Search in Frontend
```bash
# Cari fetch ke API routes
grep -r "fetch('/api/" app/
grep -r 'fetch("/api/' app/
```

### 2. Check Import Statements
```bash
# Cari import dari API routes
grep -r "from '@/app/api" app/
```

### 3. Test After Deletion
- Delete route
- Build project
- Check for errors
- If no errors, route tidak terpakai

---

## 📊 Migration Status

| Category | Total Routes | Migrated | Remaining |
|----------|-------------|----------|-----------|
| Student  | ~6          | 0        | 6         |
| Admin    | ~25         | 0        | 25        |
| Dosen    | ~6          | 0        | 6         |
| KKP      | ~4          | 2        | 2         |
| Auth     | ~3          | 0        | 3         |
| Other    | ~15         | 0        | 15        |
| **Total**| **~59**     | **2**    | **57**    |

---

## 🚨 Warning

**JANGAN hapus API routes yang:**
1. Masih digunakan di production
2. Belum ada pengganti GraphQL-nya
3. Diperlukan untuk backward compatibility
4. Digunakan oleh external services

**SELALU:**
1. Backup sebelum delete
2. Test setelah delete
3. Check di production
4. Update documentation

---

## 📖 Related Documentation

- `docs/GRAPHQL_MIGRATION_COMPLETE.md` - Status migrasi GraphQL
- `docs/PRISMA_REFACTOR_TODO.md` - Checklist refactoring Prisma
- `CLEANUP_SUMMARY.md` - Summary cleanup database

---

**Last Updated:** 2025-10-31  
**Status:** In Progress - API Routes Cleanup


