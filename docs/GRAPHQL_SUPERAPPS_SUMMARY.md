# 🎯 GraphQL Superapps - Summary

## Endpoint
```
https://superapps.if.unismuh.ac.id/graphql
```

## 📊 API Overview

| Category | Count |
|----------|-------|
| **Total Queries** | 43 |
| **Total Mutations** | 22 |
| **Custom Types** | 37 |

---

## 🗂️ Main Categories

### 1. **Authentication & User** (2 queries, 2 mutations)
- Login/Signin
- User profile

### 2. **Mahasiswa (Student)** (7 queries)
- Get student data by NIM, email, name
- Search students by program
- Get all students

### 3. **Academic Records** (3 queries)
- **KRS** - Study Plan Card (Kartu Rencana Studi)
- **KHS** - Grade Report (Kartu Hasil Studi)
- **Transkrip** - Complete academic transcript

### 4. **KKP (Internship)** (31 queries, 20 mutations)
- KKP management
- Requirements (Syarat)
- Institutions (Instansi)
- Departments (Bagian)
- Approvals & completeness
- Student KKP tracking

### 5. **Faculty & Programs** (6 queries, 3 mutations)
- Fakultas management
- Prodi (Study Program) CRUD

---

## 🔑 Key Queries

### Student Data
```graphql
# Get student by NIM
mahasiswa(nim: String!): MahasiswaSimak

# Get student transcript
getAllTranskripMahasiswa(nim: String!): TranskripWithHeaderOutput

# Get KRS (study plan)
getKrsMahasiswa(nim: String!, periode_krs: String!): KrsWithHeaderOutput

# Get KHS (grades)
getKhsMahasiswa(nim: String!, periode_krs: String!): KhsWithHeaderOutput
```

### KKP (Internship)
```graphql
# Check KKP status
cekKkpMahasiswa(nim: String!): Boolean

# Get KKP requirements with approval
getMahasiswaKkpSyaratWithApproval(nim: String!): [MahasiswaKkpSyaratApprovalOutput]

# Get approval statistics
getAllApprovedMahasiswaStats: [KkpMahasiswaApprovalStatsOutput]

# Get all KKP
getAllKkps: [Kkp]
```

### Program & Faculty
```graphql
# Get all programs
getAllProdis: [Prodi]

# Get program by code
getProdiByKodeProdi(kodeProdi: String!): Prodi

# Get all faculties
getAllFakultas: [Fakultas]
```

---

## 🔄 Key Mutations

### Authentication
```graphql
login(username: String!, password: String!): LoginResponse
signin(loginUserInput: SigninUserInput!): SigninResponse
```

### KKP Management
```graphql
# Create KKP
createKkp(input: CreateKkpInput!): Kkp

# Submit institution
ajukanKkpInstansi(createKkpInstansiInput: CreateKkpInstansiInput!): KkpInstansi

# Create approval
createKkpApproval(input: CreateKkpApprovalInput!): KkpApproval
```

### Requirements
```graphql
createKkpSyarat(input: CreateKkpSyaratInput!): KkpSyarat
updateKkpSyarat(id: String!, input: UpdateKkpSyaratInput!): KkpSyarat
removeKkpSyarat(id: String!): KkpSyarat
```

---

## 📋 Important Types

### Academic Records

```typescript
// KRS (Study Plan)
type KrsWithHeaderOutput {
  header: {
    total_sks: number
    total_matakuliah: number
  }
  krs: Array<{
    kode_matakuliah: string
    nama_matakuliah: string
    semester: number
    sks: number
  }>
}

// KHS (Grades)
type KhsWithHeaderOutput {
  header: {
    total_sks: number
    total_bobot: number
    total_matakuliah: number
    ips: number  // Semester GPA
  }
  khs: Array<{
    kode_matakuliah: string
    nama_matakuliah: string
    sks: number
    grade: string
    nilai: number
    bobot: number
  }>
}

// Transcript
type TranskripWithHeaderOutput {
  header: {
    total_sks_program: number
    total_sks_lulus: number
    total_matakuliah_program: number
    total_matakuliah_lulus: number
    ipk: number  // Cumulative GPA
  }
  transkrip: Array<{
    kode_matakuliah: string
    nama_matakuliah: string
    semester: number
    sks: number
    periode_krs: string
    grade: string
    nilai: number
    bobot: number
  }>
}
```

### Student & Program

```typescript
type MahasiswaSimak {
  nim: string
  nama: string
  hp: string
  prodi_kode_prodi: string
}

type Prodi {
  id: string
  kode_prodi: string
  nama_prodi: string
  gelar_pendek: string
  gelar_panjang: string
  total_sks_lulus: number
  nidn_ketua_prodi: string
}

type Fakultas {
  id: string
  kode_fakultas: string
  nama_fakultas: string
  dekan: string
}
```

### KKP

```typescript
type Kkp {
  id: string
  prodi_kode_prodi: string
  no_surat: string
  tanggal_surat: Date
  instansi: string
  tempat: string
  mahasiswa_nim_ketua: string
  dosen_nidn_pembimbing_prodi: string
  nama_pembimbing_lapangan: string
}

type KkpMahasiswa {
  id: string
  mahasiswa_nim: string
  kkp_id: string
  mahasiswa: MahasiswaSimak
  kkp: Kkp
  syarat: [KkpMahasiswaSyarat]
}

type KkpSyarat {
  id: string
  prodi_kode_prodi: string
  nama: string
  logo: string
  is_upload_file: boolean
  is_activated: boolean
}
```

---

## 💡 Usage Examples

### Get Student Transcript
```typescript
import { executeGraphQLQuery } from '@/lib/graphql/client'
import { GET_TRANSKRIP_MAHASISWA } from '@/lib/graphql/queries-superapps'

const { data, error } = await executeGraphQLQuery(
  GET_TRANSKRIP_MAHASISWA,
  { nim: '105841109520' }
)

if (data) {
  console.log('IPK:', data.getAllTranskripMahasiswa.header.ipk)
  console.log('SKS Lulus:', data.getAllTranskripMahasiswa.header.total_sks_lulus)
}
```

### Get KHS
```typescript
import { GET_KHS_MAHASISWA } from '@/lib/graphql/queries-superapps'

const { data, error } = await executeGraphQLQuery(
  GET_KHS_MAHASISWA,
  { 
    nim: '105841109520',
    periode_krs: '20241'  // Semester 1, 2024
  }
)

if (data) {
  console.log('IPS:', data.getKhsMahasiswa.header.ips)
  console.log('Mata Kuliah:', data.getKhsMahasiswa.khs.length)
}
```

### Check KKP Status
```typescript
import { CEK_KKP_MAHASISWA } from '@/lib/graphql/queries-superapps'

const { data, error } = await executeGraphQLQuery(
  CEK_KKP_MAHASISWA,
  { nim: '105841109520' }
)

if (data) {
  console.log('Has KKP:', data.cekKkpMahasiswa)
}
```

### Login
```typescript
import { LOGIN } from '@/lib/graphql/mutations-superapps'
import { createAuthenticatedClient, executeGraphQLQuery } from '@/lib/graphql/client'

const { data, error } = await executeGraphQLQuery(
  LOGIN,
  { 
    username: '105841109520',
    password: 'your_password'
  }
)

if (data?.login?.token) {
  // Use token for authenticated requests
  const authClient = createAuthenticatedClient(data.login.token)
  // Now use authClient for other queries
}
```

---

## 📁 File Structure

```
lib/graphql/
├── client.ts                    # GraphQL client setup
├── queries-superapps.ts         # 43 queries (NEW!)
├── mutations-superapps.ts       # 22 mutations (NEW!)
└── queries.ts                   # Old queries (deprecated)

docs/
├── GRAPHQL_API.md              # Full API documentation
├── GRAPHQL_SCHEMA.json         # Complete schema
└── GRAPHQL_SUMMARY.json        # Structured summary
```

---

## 🔐 Authentication

Most queries require authentication. Use token in headers:

```typescript
import { createAuthenticatedClient } from '@/lib/graphql/client'

const token = 'your-jwt-token'
const authClient = createAuthenticatedClient(token)

const { data } = await executeGraphQLQuery(QUERY, variables, authClient)
```

---

## 📝 Important Notes

1. **Periode KRS Format:** 
   - Format: `YYYYS` (Year + Semester)
   - Example: `20241` = Semester 1, 2024
   - Example: `20242` = Semester 2, 2024

2. **NIM (Student ID):**
   - Format: String (not number)
   - Example: `"105841109520"`

3. **Kode Prodi (Program Code):**
   - Format: String
   - Example: `"55201"` for Teknik Informatika

4. **Date Fields:**
   - ISO 8601 format
   - Example: `"2024-10-27T00:00:00.000Z"`

5. **Boolean Flags:**
   - `is_activated`: Active/inactive status
   - `is_upload_file`: Whether file upload required
   - `get_approved`: Approval status

---

## 🚀 Next Steps

1. ✅ **Schema discovered** - 43 queries, 22 mutations
2. ✅ **Queries file created** - `lib/graphql/queries-superapps.ts`
3. ✅ **Mutations file created** - `lib/graphql/mutations-superapps.ts`
4. ✅ **Documentation created** - `docs/GRAPHQL_API.md`

### To Do:
- [ ] Test authentication flow
- [ ] Test key queries with real data
- [ ] Update types in `types/models.ts` to match GraphQL schema
- [ ] Refactor action files to use GraphQL
- [ ] Create helper functions for common operations

---

## 📚 Resources

- **API Documentation:** `docs/GRAPHQL_API.md`
- **Queries:** `lib/graphql/queries-superapps.ts`
- **Mutations:** `lib/graphql/mutations-superapps.ts`
- **Full Schema:** `docs/GRAPHQL_SCHEMA.json`
- **Endpoint:** `https://superapps.if.unismuh.ac.id/graphql`

---

**Last Updated:** 2025-10-27  
**Introspection Tool:** `scripts/introspect-graphql.js`
