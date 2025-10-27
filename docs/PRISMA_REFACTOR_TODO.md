# Files Using Prisma - Needs Refactoring

## 🔴 High Priority - Core Actions

### app/actions/
1. **library-actions.ts** - Library/book management
2. **student-actions.ts** - Student data management
3. **schedule-actions.ts** - Schedule/calendar
4. **laboratory-actions.ts** - Laboratory management

### lib/sync/
1. **dosen-sync.ts** - Lecturer synchronization

### lib/graphql/
1. **sync-student-data.ts** - Student data sync (already using GraphQL!)

### lib/
1. **menu-config.ts** - Role types from Prisma

## 📋 Action Plan

### Phase 1: Remove Files yang Tidak Relevan (NOW)
File-file sync yang seharusnya tidak digunakan lagi karena data dari GraphQL:

```bash
# Files to remove
lib/sync/dosen-sync.ts
lib/graphql/sync-student-data.ts (jika tidak diperlukan)
```

### Phase 2: Update Type Definitions
1. Buat file `types/models.ts` untuk replace Prisma generated types
2. Update `lib/menu-config.ts` untuk tidak import dari Prisma

### Phase 3: Refactor Actions (Per File)
Setiap file action perlu di-refactor untuk:
- Hapus import `@/lib/prisma`
- Ganti dengan GraphQL queries
- Update types

## 🛠️ Recommended Approach

### Step 1: Identify GraphQL Queries Needed
Untuk setiap Prisma query, tentukan GraphQL query equivalent:

**Prisma:**
```typescript
const user = await prisma.users.findUnique({
  where: { id: userId }
})
```

**GraphQL:**
```typescript
const { data } = await executeGraphQLQuery(GET_USER, { id: userId })
```

### Step 2: Create GraphQL Queries
Add to `lib/graphql/queries.ts`:
```typescript
export const GET_USER = `
  query GetUser($id: String!) {
    user(id: $id) {
      id
      name
      email
      role
    }
  }
`
```

### Step 3: Update Action Files
Replace Prisma calls with GraphQL calls.

## 🔍 Detailed File Analysis

### library-actions.ts
**Prisma Usage:**
- `prisma.users.findUnique` - Get user data
- `prisma.books.findMany` - Get books
- `prisma.book_categories.findMany` - Get categories
- `prisma.book_borrowings.count` - Count borrowings
- `prisma.thesis_titles.findMany` - Get theses
- `prisma.thesis_titles.create` - Create thesis

**Required GraphQL Queries:**
- GET_USER
- GET_BOOKS
- GET_BOOK_CATEGORIES
- GET_BOOK_BORROWINGS
- GET_THESES
- CREATE_THESIS (mutation)

### student-actions.ts
**Prisma Usage:**
- `prisma.users.findUnique` - Get user
- `prisma.notifications.findMany` - Get notifications

**Required GraphQL Queries:**
- GET_USER
- GET_NOTIFICATIONS

### schedule-actions.ts
**Prisma Usage:**
- `prisma.users.findUnique` - Get user

**Required GraphQL Queries:**
- GET_USER

### laboratory-actions.ts
**Prisma Usage:**
- `prisma.students.findUnique` - Get student
- `prisma.laboratories.findMany` - Get labs

**Required GraphQL Queries:**
- GET_STUDENT
- GET_LABORATORIES

## 🎯 Next Immediate Steps

1. **Remove sync files:**
   ```bash
   rm lib/sync/dosen-sync.ts
   rm lib/graphql/sync-student-data.ts
   ```

2. **Create types file:**
   Create `types/models.ts` with common types (User, Student, etc.)

3. **Update menu-config.ts:**
   Define Role enum locally instead of importing from Prisma

4. **Start with smallest file:**
   Begin with `schedule-actions.ts` or `laboratory-actions.ts` (fewer Prisma calls)

5. **Test each file:**
   After refactoring, test thoroughly with GraphQL endpoint

## 📝 Template for Refactoring

```typescript
// Before (Prisma)
import { prisma } from '@/lib/prisma'

export async function getUser(userId: string) {
  const user = await prisma.users.findUnique({
    where: { id: userId }
  })
  return user
}

// After (GraphQL)
import { executeGraphQLQuery } from '@/lib/graphql/client'
import { GET_USER } from '@/lib/graphql/queries'

export async function getUser(userId: string) {
  const { data, error } = await executeGraphQLQuery(GET_USER, { id: userId })
  if (error) throw new Error(error)
  return data?.user
}
```

## ⚠️ Important Notes

1. **GraphQL Schema:** Pastikan endpoint GraphQL memiliki semua queries yang dibutuhkan
2. **Type Safety:** Pertimbangkan GraphQL Code Generator untuk type safety
3. **Error Handling:** GraphQL error handling berbeda dengan Prisma
4. **Pagination:** GraphQL biasanya menggunakan cursor-based pagination
5. **Mutations:** Untuk create/update/delete, butuh GraphQL mutations

## 🚀 Quick Wins

File yang bisa dihapus sekarang (tidak perlu refactor):
- `lib/sync/dosen-sync.ts` - Sync logic tidak diperlukan
- `lib/graphql/sync-student-data.ts` - Jika data langsung dari GraphQL

File yang mudah di-refactor (hanya read operations):
- `schedule-actions.ts`
- `laboratory-actions.ts` (read labs)

File yang lebih kompleks (ada create/update):
- `library-actions.ts` (ada create thesis)
- `student-actions.ts`
