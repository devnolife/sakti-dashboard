# ✅ GraphQL Superapps - Discovery Complete!

## 🎉 Summary

Berhasil melakukan **introspection** terhadap GraphQL endpoint:
```
https://superapps.if.unismuh.ac.id/graphql
```

### Hasil:
- ✅ **43 Queries** teridentifikasi
- ✅ **22 Mutations** teridentifikasi  
- ✅ **37 Custom Types** teridentifikasi
- ✅ **Semua Query & Mutation sudah dibuat** dalam file TypeScript

---

## 📁 Files Created

| File | Purpose | Status |
|------|---------|--------|
| `docs/GRAPHQL_SCHEMA.json` | Complete GraphQL schema | ✅ Generated |
| `docs/GRAPHQL_SUMMARY.json` | Structured summary | ✅ Generated |
| `docs/GRAPHQL_API.md` | Full API documentation | ✅ Created |
| `docs/GRAPHQL_SUPERAPPS_SUMMARY.md` | Quick reference guide | ✅ Created |
| `lib/graphql/queries-superapps.ts` | **All 43 queries ready to use** | ✅ Created |
| `lib/graphql/mutations-superapps.ts` | **All 22 mutations ready to use** | ✅ Created |
| `scripts/introspect-graphql.js` | Introspection tool | ✅ Created |

---

## 🚀 Quick Start

### 1. Import Queries
```typescript
import { 
  GET_MAHASISWA_BY_NIM,
  GET_TRANSKRIP_MAHASISWA,
  GET_KRS_MAHASISWA,
  GET_KHS_MAHASISWA,
  GET_ALL_PRODI,
  CEK_KKP_MAHASISWA
} from '@/lib/graphql/queries-superapps'
```

### 2. Import Mutations
```typescript
import {
  LOGIN,
  CREATE_KKP,
  AJUKAN_KKP_INSTANSI,
  CREATE_KKP_APPROVAL
} from '@/lib/graphql/mutations-superapps'
```

### 3. Execute Query
```typescript
import { executeGraphQLQuery } from '@/lib/graphql/client'

// Get student data
const { data, error } = await executeGraphQLQuery(
  GET_MAHASISWA_BY_NIM,
  { nim: '105841109520' }
)

// Get transcript
const transcript = await executeGraphQLQuery(
  GET_TRANSKRIP_MAHASISWA,
  { nim: '105841109520' }
)

// Get KHS
const khs = await executeGraphQLQuery(
  GET_KHS_MAHASISWA,
  { 
    nim: '105841109520',
    periode_krs: '20241'  // Semester 1, 2024
  }
)
```

### 4. Execute Mutation with Auth
```typescript
import { createAuthenticatedClient } from '@/lib/graphql/client'

// Login first
const { data } = await executeGraphQLQuery(LOGIN, {
  username: '105841109520',
  password: 'password'
})

if (data?.login?.token) {
  // Create authenticated client
  const authClient = createAuthenticatedClient(data.login.token)
  
  // Use for authenticated requests
  const result = await executeGraphQLQuery(
    CREATE_KKP,
    { input: { /* ... */ } },
    authClient
  )
}
```

---

## 📋 Available Queries Categories

### 1. **Student (Mahasiswa)** - 7 queries
- `GET_ALL_MAHASISWA` - Get all students
- `GET_MAHASISWA_BY_NIM` - Get by student ID
- `GET_MAHASISWA_BY_EMAIL` - Get by email
- `GET_MAHASISWA_BY_NAME` - Search by name
- `GET_MAHASISWA_BY_PRODI` - Get by program

### 2. **Academic Records** - 3 queries
- `GET_KRS_MAHASISWA` - Study Plan (KRS)
- `GET_KHS_MAHASISWA` - Grade Report (KHS)
- `GET_TRANSKRIP_MAHASISWA` - Complete Transcript

### 3. **KKP (Internship)** - 25+ queries
- `GET_ALL_KKP` - All KKPs
- `GET_KKP_BY_ID` - KKP details
- `CEK_KKP_MAHASISWA` - Check status
- `GET_ALL_KKP_MAHASISWA` - Student KKPs
- `GET_MAHASISWA_KKP_SYARAT_WITH_APPROVAL` - Requirements with approval
- `GET_ALL_APPROVED_MAHASISWA` - Approved students
- `GET_ALL_APPROVED_MAHASISWA_STATS` - Statistics
- And more...

### 4. **Program & Faculty** - 6 queries
- `GET_ALL_FAKULTAS` - All faculties
- `GET_FAKULTAS_BY_ID` - Faculty details
- `GET_ALL_PRODI` - All programs
- `GET_PRODI_BY_ID` - Program details
- `GET_PRODI_BY_KODE` - Program by code

### 5. **Approvals** - 6 queries
- `GET_ALL_APPROVAL_STATUSES` - Status types
- `GET_ALL_KKP_APPROVALS` - KKP approvals
- `GET_KKP_APPROVAL_BY_ID` - Approval details
- And more...

---

## 🔄 Available Mutations Categories

### 1. **Authentication** - 2 mutations
- `LOGIN` - Login user
- `SIGNIN` - Sign in user

### 2. **KKP Management** - 2 mutations
- `CREATE_KKP` - Create new KKP
- `CREATE_KKP_APPROVAL` - Approve KKP

### 3. **Program Management** - 3 mutations
- `CREATE_PRODI` - Create program
- `UPDATE_PRODI` - Update program
- `REMOVE_PRODI` - Delete program

### 4. **KKP Requirements** - 3 mutations
- `CREATE_KKP_SYARAT` - Create requirement
- `UPDATE_KKP_SYARAT` - Update requirement
- `REMOVE_KKP_SYARAT` - Delete requirement

### 5. **KKP Institution** - 2 mutations
- `AJUKAN_KKP_INSTANSI` - Submit institution
- `CREATE_KKP_INSTANSI_APPROVAL` - Approve institution

### 6. **KKP Department** - 6 mutations
- Create, update, remove departments
- Create, update, remove department approvals

### 7. **KKP Completeness** - 4 mutations
- Create, update, remove completeness records
- Approve completeness

---

## 💡 Common Use Cases

### Use Case 1: Display Student Dashboard
```typescript
// Get student info
const student = await executeGraphQLQuery(GET_MAHASISWA_BY_NIM, { nim })

// Get latest transcript
const transcript = await executeGraphQLQuery(GET_TRANSKRIP_MAHASISWA, { nim })

// Check KKP status
const hasKkp = await executeGraphQLQuery(CEK_KKP_MAHASISWA, { nim })

// Display:
// - Student name, program
// - IPK, total SKS
// - KKP status
```

### Use Case 2: Display Academic Records
```typescript
// Get KHS for current semester
const khs = await executeGraphQLQuery(GET_KHS_MAHASISWA, {
  nim,
  periode_krs: '20241'
})

// Display:
// - IPS (semester GPA)
// - List of courses with grades
// - Total SKS
```

### Use Case 3: KKP Application
```typescript
// 1. Check requirements
const requirements = await executeGraphQLQuery(
  GET_KKP_SYARAT_BY_PRODI,
  { kodeProdi: student.prodi_kode_prodi }
)

// 2. Submit institution
const institution = await executeGraphQLQuery(
  AJUKAN_KKP_INSTANSI,
  { createKkpInstansiInput: { /* ... */ } },
  authClient
)

// 3. Create KKP
const kkp = await executeGraphQLQuery(
  CREATE_KKP,
  { input: { /* ... */ } },
  authClient
)
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[GRAPHQL_SUPERAPPS_SUMMARY.md](./GRAPHQL_SUPERAPPS_SUMMARY.md)** | ⭐ **START HERE** - Quick reference |
| **[GRAPHQL_API.md](./GRAPHQL_API.md)** | Complete API documentation |
| **GRAPHQL_SCHEMA.json** | Full GraphQL schema (JSON) |
| **GRAPHQL_SUMMARY.json** | Structured summary (JSON) |

---

## 🔧 Tools

### Introspection Tool
```bash
# Re-run introspection if schema changes
node scripts/introspect-graphql.js
```

This will regenerate:
- `docs/GRAPHQL_SCHEMA.json`
- `docs/GRAPHQL_SUMMARY.json`

---

## 🎯 Next Steps

### Immediate
- [x] Discover GraphQL schema
- [x] Create query files
- [x] Create mutation files
- [x] Create documentation

### Short Term
- [ ] Test authentication flow
- [ ] Test key queries with real data
- [ ] Create helper functions for common patterns
- [ ] Update `types/models.ts` to match GraphQL types

### Medium Term
- [ ] Refactor `app/actions/student-actions.ts` to use GraphQL
- [ ] Refactor other action files
- [ ] Create composable hooks for data fetching
- [ ] Add error handling utilities

---

## 💻 Example: Complete Flow

```typescript
import { executeGraphQLQuery, createAuthenticatedClient } from '@/lib/graphql/client'
import { LOGIN } from '@/lib/graphql/mutations-superapps'
import { 
  GET_MAHASISWA_BY_NIM,
  GET_TRANSKRIP_MAHASISWA,
  CEK_KKP_MAHASISWA 
} from '@/lib/graphql/queries-superapps'

async function getStudentDashboardData(username: string, password: string) {
  // 1. Login
  const { data: loginData, error: loginError } = await executeGraphQLQuery(LOGIN, {
    username,
    password
  })

  if (loginError || !loginData?.login?.token) {
    throw new Error('Login failed')
  }

  const token = loginData.login.token
  const nim = loginData.login.user.nim
  
  // 2. Create authenticated client
  const authClient = createAuthenticatedClient(token)

  // 3. Fetch student data in parallel
  const [student, transcript, hasKkp] = await Promise.all([
    executeGraphQLQuery(GET_MAHASISWA_BY_NIM, { nim }, authClient),
    executeGraphQLQuery(GET_TRANSKRIP_MAHASISWA, { nim }, authClient),
    executeGraphQLQuery(CEK_KKP_MAHASISWA, { nim }, authClient)
  ])

  return {
    student: student.data?.mahasiswa,
    transcript: transcript.data?.getAllTranskripMahasiswa,
    hasKkp: hasKkp.data?.cekKkpMahasiswa,
    token
  }
}

// Usage
const dashboardData = await getStudentDashboardData('105841109520', 'password')
console.log('IPK:', dashboardData.transcript?.header.ipk)
console.log('Has KKP:', dashboardData.hasKkp)
```

---

## ⚡ Performance Tips

1. **Use Parallel Queries:**
   ```typescript
   const [data1, data2, data3] = await Promise.all([
     executeGraphQLQuery(QUERY1, vars1),
     executeGraphQLQuery(QUERY2, vars2),
     executeGraphQLQuery(QUERY3, vars3),
   ])
   ```

2. **Reuse Authenticated Client:**
   ```typescript
   const authClient = createAuthenticatedClient(token)
   // Reuse for multiple queries
   ```

3. **Select Only Needed Fields:**
   - Modify queries to request only required fields
   - Reduces payload size

---

## 🔐 Security Notes

1. **Never commit `.env.local`** with real credentials
2. **Store tokens securely** (httpOnly cookies, secure storage)
3. **Validate user input** before sending to GraphQL
4. **Handle errors properly** - don't expose sensitive info

---

**Status:** ✅ Complete  
**Date:** 2025-10-27  
**Ready for:** Implementation & Testing

---

**Next:** Start refactoring action files to use these queries! 🚀
