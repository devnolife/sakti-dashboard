# Branch: fetch-graphql

## 🎯 Tujuan Branch
Branch ini adalah migrasi dari database lokal dengan Prisma ke GraphQL endpoint eksternal.

## ✅ Status: Database Cleanup Complete

Semua file dan konfigurasi terkait Prisma dan database lokal telah dihapus. Project sekarang siap untuk migrasi bertahap ke GraphQL.

---

## 📊 Progress Overview

### ✅ Selesai (Cleanup Phase)
- Database & Prisma dihapus
- Dependencies dibersihkan
- GraphQL client dikonfigurasi
- Type definitions dibuat
- Dokumentasi lengkap

### ⚠️ In Progress (Refactoring Phase)
- 5 files masih menggunakan Prisma (perlu di-refactor)
- Auth belum diupdate
- Testing diperlukan

---

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://superapps.if.unismuh.ac.id/graphql
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=your-secret-here
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
```bash
pnpm dev
```

**Note:** Akan ada errors karena file actions masih menggunakan Prisma. Ini expected dan akan di-fix bertahap.

---

## 📁 GraphQL Configuration

### Endpoint
```
https://superapps.if.unismuh.ac.id/graphql
```

### Usage Example
```typescript
import { executeGraphQLQuery } from '@/lib/graphql/client'
import { GET_MAHASISWA_INFO } from '@/lib/graphql/queries'

// Query data
const { data, error } = await executeGraphQLQuery(
  GET_MAHASISWA_INFO,
  { nim: '105841109520' }
)

if (error) {
  console.error('Error:', error)
  return
}

console.log('Student data:', data)
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `CLEANUP_SUMMARY.md` | ✅ **START HERE** - Complete cleanup summary |
| `docs/GRAPHQL_MIGRATION.md` | Full migration guide |
| `docs/PRISMA_REFACTOR_TODO.md` | Refactoring checklist |
| `MIGRATION_SUMMARY.md` | Quick reference |

---

## ⚠️ Known Issues

### TypeScript Errors
File-file berikut masih import Prisma dan akan error:
1. `app/actions/library-actions.ts`
2. `app/actions/student-actions.ts`
3. `app/actions/schedule-actions.ts`
4. `app/actions/laboratory-actions.ts`
5. `lib/graphql/sync-student-data.ts`

**Action Required:** Refactor file-file ini untuk menggunakan GraphQL. Lihat `docs/PRISMA_REFACTOR_TODO.md` untuk panduan.

### Missing Module: graphql-request
Jika error "Cannot find module 'graphql-request'", run:
```bash
pnpm install
```

---

## 🔄 Next Steps (Prioritas)

### Immediate
- [ ] Review & test GraphQL endpoint connectivity
- [ ] Decide: keep atau hapus `lib/graphql/sync-student-data.ts`

### Short Term (1-2 hari)
- [ ] Refactor `lib/auth.ts` - remove PrismaAdapter
- [ ] Refactor `app/actions/schedule-actions.ts` (simplest)
- [ ] Add required GraphQL queries to `lib/graphql/queries.ts`

### Medium Term (1 minggu)
- [ ] Refactor all action files
- [ ] Update components using Prisma types
- [ ] End-to-end testing
- [ ] Update documentation

---

## 🛠️ Development Guidelines

### Adding New Features
Gunakan GraphQL, bukan Prisma:

```typescript
// ❌ Don't (Prisma - tidak tersedia)
const user = await prisma.users.findUnique({ where: { id } })

// ✅ Do (GraphQL)
const { data } = await executeGraphQLQuery(GET_USER, { id })
```

### Creating Types
Gunakan types dari `@/types/models`:

```typescript
import { User, Student, Role } from '@/types/models'
```

### GraphQL Queries
Add queries to `lib/graphql/queries.ts`:

```typescript
export const GET_YOUR_DATA = `
  query GetYourData($param: String!) {
    yourData(param: $param) {
      field1
      field2
    }
  }
`
```

---

## 📞 Support & Resources

### Documentation Files
- **CLEANUP_SUMMARY.md** - What was done
- **GRAPHQL_MIGRATION.md** - How to migrate
- **PRISMA_REFACTOR_TODO.md** - What needs to be done

### GraphQL Resources
- Endpoint: `https://superapps.if.unismuh.ac.id/graphql`
- Client: `lib/graphql/client.ts`
- Queries: `lib/graphql/queries.ts`
- Types: `types/models.ts`

### Tools
- [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/) - Test queries
- [graphql-request docs](https://github.com/jasonkuhrt/graphql-request) - Library documentation

---

## 🎓 Branch Info

- **Branch:** `fetch-graphql`
- **Base:** `main`
- **Status:** 🔄 In Progress - Cleanup Complete, Refactoring Needed
- **Last Updated:** 2025-10-27

---

## ⚡ Key Changes

### Removed
- Prisma schema & migrations
- Database connection
- All seed scripts
- Sync scripts
- `@prisma/client` & related deps

### Added
- GraphQL client configuration
- GraphQL queries
- Type definitions (`types/models.ts`)
- Migration documentation

### Updated
- `package.json` - removed Prisma deps & scripts
- `lib/menu-config.ts` - use local types
- `lib/graphql/client.ts` - new endpoint

---

**Ready to start refactoring?** Check `CLEANUP_SUMMARY.md` for detailed next steps! 🚀
