# 🔄 Sinkronisasi Data Dosen dari GraphQL

Dokumentasi lengkap untuk fitur sinkronisasi otomatis data dosen dari GraphQL API.

## 📋 Overview

Sistem ini secara otomatis mengambil dan menyinkronkan data dosen dari GraphQL API (sistem akademik pusat) ke database lokal. Sinkronisasi terjadi:

1. ✅ **Otomatis saat login** - Setiap dosen login dengan NIDN
2. ✅ **Manual via UI** - Dosen dapat trigger sync sendiri
3. ✅ **Batch sync** - Admin dapat sync semua dosen sekaligus
4. ✅ **Smart caching** - Skip sync jika data sudah update (< 24 jam)

---

## 🎯 Kapan Sinkronisasi Terjadi?

### 1. Otomatis Saat Login (Recommended)

Ketika dosen login menggunakan NIDN sebagai username, sistem akan:

```typescript
// lib/auth.ts
if (user.role === 'dosen' && user.lecturers?.nidn) {
  await syncDosenDataFromGraphQL(user.lecturers.nidn)
}
```

**Kondisi Skip Sync:**
- ✅ Data sudah di-sync dalam 24 jam terakhir
- ✅ Data sudah lengkap (email, tempat_lahir ada)

**Log Console:**
```
🔄 Syncing dosen data from GraphQL for NIDN: 0905078907
✅ Fetched dosen data from GraphQL: RIZKI YUSLIANA BAKTI
✅ Successfully synced dosen data for: RIZKI YUSLIANA BAKTI
✅ Dosen data synced for NIDN: 0905078907
```

### 2. Manual Sync via API

Dosen atau admin dapat trigger sync manual:

**Endpoint**: `POST /api/dosen/sync`

**Request Body:**
```json
{
  "nidn": "0905078907",
  "force": true  // Optional: force sync even if recent
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Dosen data synced successfully",
  "data": {
    "nidn": "0905078907",
    "nama": "RIZKI YUSLIANA BAKTI",
    "email": "rizki@example.com",
    ...
  }
}
```

### 3. Check Sync Status

**Endpoint**: `GET /api/dosen/sync`

**Response:**
```json
{
  "nidn": "0905078907",
  "nama": "RIZKI YUSLIANA BAKTI",
  "lastSync": "2025-11-01T10:30:00.000Z",
  "hoursSinceSync": 2.5,
  "needsSync": false,
  "dataComplete": true
}
```

### 4. Batch Sync (Admin Only)

Admin dapat sync semua dosen sekaligus:

**Request:**
```json
{
  "all": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Batch sync completed",
  "results": {
    "total": 59,
    "success": 57,
    "failed": 2,
    "errors": [
      {
        "nidn": "0000000001",
        "error": "Not found in GraphQL"
      }
    ]
  }
}
```

---

## 📊 Data yang Di-Sync

Data berikut akan di-update dari GraphQL ke database lokal:

| Field | Sumber | Update Logic |
|-------|--------|--------------|
| `nama` | GraphQL | Always update |
| `gelar_depan` | GraphQL | Update if exists |
| `gelar_belakang` | GraphQL | Update if exists |
| `tempat_lahir` | GraphQL | Update if exists |
| `tanggal_lahir` | GraphQL | Parse & update if valid |
| `email` | GraphQL | Update if exists |
| `prodi_id` | GraphQL | Update if exists |
| `updated_at` | System | Always update to current time |

**Data yang TIDAK berubah:**
- `nidn` - Primary key, tidak pernah berubah
- `jabatan_fungsional` - Dikelola lokal dari seed
- `sub_role` - Dikelola lokal (dekan, kaprodi, dll)
- `position` - Dikelola lokal

---

## 🔧 Implementasi Teknis

### File Structure

```
lib/
├── graphql/
│   ├── sync-dosen-data.ts        # Main sync logic
│   ├── sync-student-data.ts      # Similar pattern for mahasiswa
│   ├── queries.ts                # GraphQL query definitions
│   └── client.ts                 # GraphQL client setup
├── auth.ts                       # NextAuth config + auto-sync
components/
└── dosen/
    └── dosen-data-sync.tsx       # UI component for manual sync
app/
└── api/
    └── dosen/
        └── sync/
            └── route.ts          # API endpoints
```

### Core Function

```typescript
// lib/graphql/sync-dosen-data.ts

export async function syncDosenDataFromGraphQL(nidn: string): Promise<{
  success: boolean
  error?: string
  data?: any
}> {
  // 1. Fetch from GraphQL
  const { data, error } = await executeGraphQLQuery<DosenResponse>(
    GET_DOSEN,
    { nidn },
    graphqlClient
  )

  // 2. Find in local database
  const lecturer = await prisma.lecturers.findUnique({
    where: { nidn }
  })

  // 3. Check if needs sync (< 24h)
  const hoursSinceSync = calculateHoursSinceSync(lecturer.updated_at)
  if (hoursSinceSync < 24 && dataComplete) {
    return { success: true, error: 'Already up to date' }
  }

  // 4. Update database
  const updatedLecturer = await prisma.lecturers.update({
    where: { nidn },
    data: {
      nama: data.dosen.nama,
      email: data.dosen.email,
      // ... other fields
      updated_at: new Date()
    }
  })

  return { success: true, data: updatedLecturer }
}
```

### GraphQL Query

```graphql
query Dosen($nidn: String!) {
  dosen(nidn: $nidn) {
    nidn
    nama
    gelar_depan
    gelar_belakang
    tempat_lahir
    tanggal_lahir
    email
    prodiId
    mahasiswa {
      nim
      nama
    }
  }
}
```

---

## 🎨 UI Component Usage

### Dashboard Dosen

Tambahkan komponen sync di dashboard dosen:

```tsx
import { DosenDataSync } from '@/components/dosen/dosen-data-sync'

export default function DosenDashboard() {
  return (
    <div className="space-y-6">
      <h1>Dashboard Dosen</h1>
      
      {/* Sync Component */}
      <DosenDataSync />
      
      {/* Other dashboard content */}
    </div>
  )
}
```

### Component Features

- 📊 **Status Indicator** - Badge showing data completeness
- ⏰ **Last Sync Time** - Human-readable timestamp
- 🔄 **Manual Sync Button** - Force sync with loading state
- ⚠️ **Alerts** - Warning if data needs update
- 🎯 **Smart Caching** - Shows "already synced" message

---

## 🔐 Permissions & Security

### Role-Based Access

| Endpoint | Admin | Dosen | Mahasiswa | Staff |
|----------|-------|-------|-----------|-------|
| `GET /api/dosen/sync` | ❌ | ✅ Own data | ❌ | ❌ |
| `POST /api/dosen/sync` (single) | ✅ Any NIDN | ✅ Own NIDN | ❌ | ❌ |
| `POST /api/dosen/sync` (batch) | ✅ | ❌ | ❌ | ❌ |

### Authentication Check

```typescript
const session = await getServerAuthSession()

if (!session?.user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

if (session.user.role !== 'dosen' && session.user.role !== 'admin') {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

// Dosen can only sync own data
if (session.user.role === 'dosen' && session.user.username !== nidn) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

---

## 🚨 Error Handling

### Common Errors

#### 1. GraphQL API Not Responding

**Error:**
```
❌ Failed to fetch dosen data from GraphQL: Network error
```

**Solution:**
- Check GraphQL endpoint URL in `.env`
- Verify API server is running
- Check network connectivity

#### 2. Lecturer Not Found in Local DB

**Error:**
```
⚠️ Lecturer with NIDN 0905078907 not found in local database
```

**Solution:**
- Run seed: `npx tsx prisma/seed-dosen-only.ts`
- Verify NIDN is correct
- Check if user exists in `users` table

#### 3. Invalid Date Format

**Error:**
```
Invalid Date: Cannot parse tanggal_lahir
```

**Solution:**
- GraphQL should return ISO 8601 format
- Check date format in GraphQL response
- Fallback to null if invalid

#### 4. Prodi Not Found

**Warning:**
```
⚠️ Prodi 55202 not found in database, skipping prodi sync
```

**Solution:**
- Run master data seed first
- Create prodi manually in database
- Sync will continue without prodi_id

---

## ⚡ Performance Considerations

### Smart Caching (24-hour rule)

```typescript
const hoursSinceSync = (now - lastSync) / (1000 * 60 * 60)

if (hoursSinceSync < 24 && dataComplete) {
  console.log('⏭️ Skipping sync - data already fresh')
  return { success: true, error: 'Already up to date' }
}
```

**Benefits:**
- ✅ Reduces GraphQL API calls
- ✅ Faster login process
- ✅ Lower server load
- ✅ Better user experience

### Batch Sync Rate Limiting

```typescript
for (const nidn of nidnList) {
  await syncDosenDataFromGraphQL(nidn)
  
  // 100ms delay between requests
  await new Promise(resolve => setTimeout(resolve, 100))
}
```

**Prevents:**
- ❌ API rate limiting
- ❌ Server overload
- ❌ Connection timeout

---

## 📈 Monitoring & Logging

### Console Logs

```bash
# Success Flow
🔄 Syncing dosen data from GraphQL for NIDN: 0905078907
✅ Fetched dosen data from GraphQL: RIZKI YUSLIANA BAKTI
✅ Successfully synced dosen data for: RIZKI YUSLIANA BAKTI
✅ Updated user name for: RIZKI YUSLIANA BAKTI

# Skip Flow
🔄 Syncing dosen data from GraphQL for NIDN: 0905078907
⏭️ Dosen data already synced recently (5h ago), skipping...

# Error Flow
🔄 Syncing dosen data from GraphQL for NIDN: 0905078907
❌ Failed to fetch dosen data from GraphQL: Network timeout
```

### Metrics to Track

- Total syncs per day
- Success vs failure rate
- Average sync duration
- API response time
- Cache hit rate

---

## 🧪 Testing

### Manual Test (Login)

1. Login dengan NIDN: `0905078907`
2. Password: `password123`
3. Check console for sync logs
4. Verify data in Prisma Studio

### API Test (cURL)

```bash
# Check sync status
curl -X GET http://localhost:3000/api/dosen/sync \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"

# Manual sync
curl -X POST http://localhost:3000/api/dosen/sync \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{"nidn": "0905078907", "force": true}'

# Batch sync (admin only)
curl -X POST http://localhost:3000/api/dosen/sync \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ADMIN_TOKEN" \
  -d '{"all": true}'
```

### Database Verification

```sql
-- Check sync timestamp
SELECT nidn, nama, email, updated_at 
FROM lecturers 
WHERE nidn = '0905078907';

-- Find dosen needing sync (> 24h)
SELECT nidn, nama, updated_at,
  EXTRACT(EPOCH FROM (NOW() - updated_at))/3600 as hours_since_sync
FROM lecturers
WHERE updated_at < NOW() - INTERVAL '24 hours'
  OR email IS NULL
  OR tempat_lahir IS NULL;
```

---

## 🔄 Migration from Old System

Jika sebelumnya data dosen tidak pernah di-sync:

```bash
# 1. Backup database
pg_dump -U username database_name > backup_before_sync.sql

# 2. Run initial sync for all dosen (admin only)
# Via API or create script:
npx tsx scripts/initial-dosen-sync.ts

# 3. Verify results
npx prisma studio
```

**Script contoh:**
```typescript
// scripts/initial-dosen-sync.ts
import { syncMultipleDosenFromGraphQL } from '@/lib/graphql/sync-dosen-data'
import { prisma } from '@/lib/prisma'

async function main() {
  const allDosen = await prisma.lecturers.findMany({
    select: { nidn: true }
  })

  const nidnList = allDosen
    .filter(d => d.nidn)
    .map(d => d.nidn as string)

  const results = await syncMultipleDosenFromGraphQL(nidnList)
  
  console.log('Sync completed:', results)
}

main()
```

---

## 📚 References

- [NextAuth Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [SINTA API Documentation](https://sinta.kemdikbud.go.id/)

---

## 📝 Changelog

### Version 1.0.0 (November 2025)
- ✅ Auto-sync on login for dosen
- ✅ Manual sync via API
- ✅ UI component for self-service sync
- ✅ Batch sync for admin
- ✅ Smart 24-hour caching
- ✅ Error handling & logging
- ✅ Permission & security checks

---

**Last Updated**: November 1, 2025  
**Maintainer**: DevNoLife Team
