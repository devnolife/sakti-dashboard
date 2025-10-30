# GraphQL API Documentation - Superapps

**Endpoint:** `https://superapps.if.unismuh.ac.id/graphql`  
**Last Updated:** 2025-10-30  
**Total Queries:** 47  
**Total Mutations:** 24

---

## 🔐 Authentication

### Login Flow

1. **LOGIN Mutation** - Get access token
```graphql
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    access_token
  }
}
```

2. **GET_PROFILE Query** - Get user profile (requires Bearer token)
```graphql
query {
  profile {
    username
    fullname
    department
    role
  }
}
```

**Example Usage:**
```typescript
// Step 1: Login
const loginResult = await executeGraphQLQuery(LOGIN, {
  username: "105841102021",
  password: "SamaSemua"
})
const { access_token } = loginResult.data.login

// Step 2: Get Profile
const client = createAuthenticatedClient(access_token)
const profileResult = await executeGraphQLQuery(GET_PROFILE, {}, client)
const user = profileResult.data.profile
```

---

## 👨‍🎓 Mahasiswa (Student) Queries

### Basic Queries
- `GET_ALL_MAHASISWAS` - Get all students
- `GET_MAHASISWA_BY_NIM` - Get student by NIM
- `GET_MAHASISWAS_BY_NAME` - Search students by name
- `GET_MAHASISWA_BY_EMAIL` - Get student by email
- `GET_MAHASISWAS_BY_PRODI` - Get students by program

### Academic Records
- `GET_KRS_MAHASISWA` - Get KRS (Study Plan Card)
  - Args: `nim`, `periode_krs`
  - Returns: header (total_sks, total_matakuliah) + krs data
  
- `GET_KHS_MAHASISWA` - Get KHS (Study Result Card)
  - Args: `nim`, `periode_krs`
  - Returns: header (total_sks, total_bobot, ips) + khs data with grades
  
- `GET_TRANSKRIP_MAHASISWA` - Get full transcript
  - Args: `nim`
  - Returns: header (total_sks, ipk) + complete transcript

**Example:**
```graphql
query GetKhsMahasiswa($nim: String!, $periode_krs: String!) {
  getKhsMahasiswa(nim: $nim, periode_krs: $periode_krs) {
    header {
      total_sks
      total_bobot
      total_matakuliah
      ips
    }
    khs {
      kode_matakuliah
      nama_matakuliah
      semester
      sks
      grade
      nilai
      bobot
    }
  }
}
```

---

## 👨‍🏫 Dosen (Lecturer) Queries

- `GET_ALL_DOSENS` - Get all lecturers
- `GET_DOSEN_BY_NIDN` - Get lecturer by NIDN
- `GET_DOSENS_BY_NAME` - Search lecturers by name
- `GET_DOSEN_BY_EMAIL` - Get lecturer by email

**Fields:**
- `nidn` - National Lecturer ID Number
- `nama` - Full name
- `email` - Email address
- `hp` - Phone number

---

## 🏛️ Fakultas & Prodi Queries

### Fakultas (Faculty)
- `GET_ALL_FAKULTAS` - Get all faculties
- `GET_FAKULTAS_BY_ID` - Get faculty by ID

**Fakultas Fields:**
- `kode_fakultas` - Faculty code
- `nama_fakultas` - Faculty name (Indonesian)
- `nama_fakultas_eng` - Faculty name (English)
- `dekan` - Dean name

### Prodi (Study Program)
- `GET_ALL_PRODIS` - Get all study programs
- `GET_PRODI_BY_ID` - Get program by ID
- `GET_PRODI_BY_KODE` - Get program by code

**Prodi Fields:**
- `kode_prodi` - Program code
- `nama_prodi` - Program name
- `gelar_pendek` - Short degree (e.g., "S.Kom")
- `gelar_panjang` - Full degree
- `total_sks_lulus` - Total SKS required to graduate
- `nidn_ketua_prodi` - Program head's NIDN

---

## 📋 KKP (Kerja Kuliah Praktek) System

### Main KKP Queries
- `GET_ALL_KKPS` - Get all KKP records
- `GET_KKP_BY_ID` - Get specific KKP
- `CEK_KKP_MAHASISWA` - Check if student has KKP (returns Boolean)

### KKP Mahasiswa
- `GET_ALL_KKP_MAHASISWAS` - All student KKP registrations
- `GET_KKP_MAHASISWA_BY_ID` - Specific student KKP
- `GET_MAHASISWA_KKP_SYARAT_WITH_APPROVAL` - Get requirements with approval status
- `GET_ALL_APPROVED_MAHASISWA` - List of approved students
- `GET_ALL_APPROVED_MAHASISWA_STATS` - Approval statistics per student

**Example - Check Requirements:**
```graphql
query GetMahasiswaKkpSyaratWithApproval($nim: String!) {
  getMahasiswaKkpSyaratWithApproval(nim: $nim) {
    mahasiswa_nim
    syarat_id
    syarat_nama
    latest_kelengkapan {
      kelengkapan_id
      uploaded_file_id
      keterangan
      updated_at
    }
    latest_approval {
      approval_id
      approval_status_id
      approval_status_nama
      updated_at
    }
  }
}
```

### KKP Syarat (Requirements)
- `GET_ALL_KKP_SYARAT` - All requirements
- `GET_KKP_SYARAT_BY_KODE_PRODI` - Requirements by program
- `GET_KKP_SYARAT_BY_ID` - Specific requirement
- `GET_KKP_MAHASISWA_SYARAT` - Student's requirement status
- `GET_APPROVAL_TIMELINE` - Timeline of approvals

### KKP Instansi (Institution)
- `GET_ALL_KKP_INSTANSI` - All institutions
- `GET_KKP_INSTANSI_BY_ID` - Specific institution
- `GET_ALL_INSTANSI_APPROVED` - Approved institutions
- `GET_ALL_KKP_INSTANSI_APPROVALS` - Institution approvals
- `GET_KKP_INSTANSI_APPROVAL_BY_ID` - Specific approval

### KKP Instansi Bagian (Department)
- `GET_ALL_KKP_INSTANSI_BAGIANS` - All departments
- `GET_KKP_INSTANSI_BAGIAN_BY_ID` - Specific department
- `GET_ALL_KKP_INSTANSI_BAGIAN_APPROVALS` - Department approvals

### Approval System
- `GET_ALL_APPROVAL_STATUSES` - All approval status types
- `GET_ALL_KKP_APPROVALS` - All KKP approvals
- `GET_KKP_APPROVAL_BY_ID` - Specific approval

---

## 🔄 Mutations

### Authentication
- `signin` - Sign in (returns token + user data)
- `signup` - Create new user account
- `changePassword` - Change user password
- `createUser` - Admin: Create user account

### Prodi Management
- `createProdi` - Create new study program
- `updateProdi` - Update program information
- `removeProdi` - Delete study program

### KKP Operations
- `createKkp` - Create KKP record
- `createKkpApproval` - Create approval record

### KKP Syarat (Requirements)
- `createKkpSyarat` - Create requirement
- `updateKkpSyarat` - Update requirement
- `removeKkpSyarat` - Delete requirement

### KKP Instansi
- `ajukanKkpInstansi` - Submit institution
- `createKkpInstansiApproval` - Approve institution

### KKP Instansi Bagian
- `createKkpInstansiBagian` - Create department
- `updateKkpInstansiBagian` - Update department
- `removeKkpInstansiBagian` - Delete department
- `createKkpInstansiBagianApproval` - Approve department
- `updateKkpInstansiBagianApproval` - Update approval
- `removeKkpInstansiBagianApproval` - Remove approval

### KKP Mahasiswa Syarat Kelengkapan
- `createKkpMahasiswaSyaratKelengkapan` - Submit requirement document
- `createKkpMahasiswaSyaratKelengkapanApproval` - Approve document
- `updateKkpMahasiswaSyaratKelengkapanApproval` - Update approval
- `removeKkpMahasiswaSyaratKelengkapanApproval` - Remove approval

---

## 📊 Common Response Types

### UserProfile
```typescript
{
  username: string
  fullname: string | null
  department: string | null
  role: string | null  // "Mahasiswa", "Dosen", "Admin", etc.
}
```

### MahasiswaSimak
```typescript
{
  nim: string
  nama: string
  hp: string
  email: string
  prodi_kode_prodi: string
}
```

### Dosen
```typescript
{
  nidn: string
  nama: string
  email: string
  hp: string
}
```

### KhsWithHeaderOutput
```typescript
{
  header: {
    total_sks: number
    total_bobot: number
    total_matakuliah: number
    ips: number
  }
  khs: Array<{
    kode_matakuliah: string
    nama_matakuliah: string
    semester: number
    sks: number
    grade: string
    nilai: number
    bobot: number
  }>
}
```

---

## 🛠️ Usage Examples

### Import Queries/Mutations
```typescript
import { 
  LOGIN, 
  GET_PROFILE,
  GET_MAHASISWA_BY_NIM,
  GET_KHS_MAHASISWA,
  CREATE_KKP
} from '@/lib/graphql/mutations-superapps'

import {
  GET_ALL_DOSENS,
  GET_TRANSKRIP_MAHASISWA
} from '@/lib/graphql/queries-superapps'
```

### Execute Query
```typescript
import { executeGraphQLQuery, createAuthenticatedClient } from '@/lib/graphql/client'

// Without auth
const result = await executeGraphQLQuery(GET_MAHASISWA_BY_NIM, { nim: "105841102021" })

// With auth
const client = createAuthenticatedClient(access_token)
const result = await executeGraphQLQuery(GET_PROFILE, {}, client)
```

### Full Login Example
```typescript
async function loginUser(username: string, password: string) {
  // Step 1: Login
  const loginResult = await executeGraphQLQuery(LOGIN, { username, password })
  
  if (loginResult.error) {
    throw new Error(loginResult.error)
  }
  
  const { access_token } = loginResult.data.login
  
  // Step 2: Get Profile
  const client = createAuthenticatedClient(access_token)
  const profileResult = await executeGraphQLQuery(GET_PROFILE, {}, client)
  
  if (profileResult.error) {
    throw new Error(profileResult.error)
  }
  
  const user = profileResult.data.profile
  
  // Store token and user data
  localStorage.setItem('graphql-token', access_token)
  localStorage.setItem('user', JSON.stringify(user))
  
  return { user, token: access_token }
}
```

---

## 📝 Notes

1. **Authentication Required:** Most queries require Bearer token in header
2. **Array Returns:** Queries returning arrays may return `null` if empty (check introspection)
3. **Error Handling:** Always check `error` field in response
4. **Token Storage:** Store access_token securely (localStorage for client, httpOnly cookies for server)
5. **Role-Based Access:** Some queries/mutations require specific roles

---

## 🔗 Quick Reference Files

- **Queries:** `lib/graphql/queries-superapps.ts`
- **Mutations:** `lib/graphql/mutations-superapps.ts`
- **Client:** `lib/graphql/client.ts`
- **Full Schema:** `docs/GRAPHQL_SCHEMA.json`
- **Summary:** `docs/GRAPHQL_SUMMARY.json`
