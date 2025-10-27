# GraphQL Migration Guide

## Overview
Branch `fetch-graphql` sekarang menggunakan GraphQL endpoint eksternal sebagai sumber data, bukan database lokal dengan Prisma.

## GraphQL Endpoint
```
https://superapps.if.unismuh.ac.id/graphql
```

## Setup

### 1. Environment Variables
Buat file `.env.local` dengan konfigurasi berikut:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://superapps.if.unismuh.ac.id/graphql
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 2. GraphQL Client
GraphQL client sudah dikonfigurasi di `lib/graphql/client.ts`:

```typescript
import { graphqlClient, createAuthenticatedClient, executeGraphQLQuery } from '@/lib/graphql/client'

// Untuk query tanpa autentikasi
const result = await executeGraphQLQuery(QUERY, variables)

// Untuk query dengan autentikasi
const authClient = createAuthenticatedClient(token)
const result = await executeGraphQLQuery(QUERY, variables, authClient)
```

### 3. GraphQL Queries
Query definitions tersedia di `lib/graphql/queries.ts`.

Contoh penggunaan:
```typescript
import { GET_MAHASISWA_INFO } from '@/lib/graphql/queries'
import { executeGraphQLQuery } from '@/lib/graphql/client'

const { data, error } = await executeGraphQLQuery(
  GET_MAHASISWA_INFO,
  { nim: '105841109520' }
)
```

## Perubahan dari Prisma

### Yang Dihapus:
- ✅ Folder `prisma/` (schema, migrations, seeds)
- ✅ File `lib/prisma.ts`
- ✅ Folder `lib/generated/` (Prisma client)
- ✅ Dependencies: `@prisma/client`, `@next-auth/prisma-adapter`, `prisma`
- ✅ Scripts: database seed, sync, migration commands
- ✅ Scripts files: check-database.ts, seed-prodi.ts, sync-prodi.ts, dll

### Yang Tetap:
- ✅ `graphql` & `graphql-request` packages
- ✅ `lib/graphql/` folder dengan client & queries
- ✅ NextAuth (akan perlu adaptasi tanpa PrismaAdapter)

## Next Steps

### 1. Update NextAuth Configuration
File `lib/auth.ts` perlu diupdate untuk tidak menggunakan PrismaAdapter:

```typescript
// Sebelumnya menggunakan PrismaAdapter
// Sekarang bisa menggunakan custom adapter atau JWT session
```

### 2. Migrasi Data Fetching
Semua komponen dan actions yang sebelumnya menggunakan Prisma perlu diupdate untuk menggunakan GraphQL:

```typescript
// Sebelumnya (Prisma):
const user = await prisma.user.findUnique({ where: { id } })

// Sekarang (GraphQL):
const { data } = await executeGraphQLQuery(GET_USER_QUERY, { id })
```

### 3. Type Generation (Optional)
Jika GraphQL schema tersedia, bisa generate types dengan:
```bash
pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript
```

## Testing GraphQL Endpoint

Anda bisa test endpoint dengan:

```typescript
import { graphqlClient } from '@/lib/graphql/client'

// Test query
const query = `
  query {
    mahasiswaInfo(nim: "105841109520") {
      nim
      nama
      prodi
    }
  }
`

const data = await graphqlClient.request(query)
console.log(data)
```

## Troubleshooting

### CORS Issues
Jika ada masalah CORS, pastikan endpoint GraphQL sudah mengizinkan origin dari aplikasi Next.js.

### Authentication
Jika endpoint memerlukan autentikasi, gunakan `createAuthenticatedClient(token)`.

### Type Safety
Untuk type safety yang lebih baik, pertimbangkan untuk menggunakan GraphQL Code Generator.

## File Structure

```
lib/
  graphql/
    client.ts           # GraphQL client configuration
    queries.ts          # GraphQL query definitions
    sync-student-data.ts # Sync utilities
```

## Useful Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Production
pnpm start
```

## Migration Checklist

- [x] Hapus Prisma schema & migrations
- [x] Hapus Prisma client & generated files
- [x] Update package.json dependencies
- [x] Update GraphQL endpoint
- [x] Buat .env.example dengan konfigurasi GraphQL
- [ ] Update NextAuth untuk tidak menggunakan PrismaAdapter
- [ ] Migrasi semua data fetching dari Prisma ke GraphQL
- [ ] Update components yang menggunakan Prisma types
- [ ] Test semua fitur dengan GraphQL endpoint

## Resources

- GraphQL Endpoint: https://superapps.if.unismuh.ac.id/graphql
- graphql-request docs: https://github.com/jasonkuhrt/graphql-request
- Next.js + GraphQL: https://nextjs.org/docs/app/building-your-application/data-fetching
