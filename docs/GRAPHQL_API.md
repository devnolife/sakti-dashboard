# GraphQL API Documentation
**Endpoint:** `https://superapps.if.unismuh.ac.id/graphql`

**Introspected:** 2025-10-27

---

## 📊 Summary
- **Total Queries:** 43
- **Total Mutations:** 22
- **Total Custom Types:** 37

---

## 🔍 Available Queries

### Authentication & User
- **`sayHello`** - Test query
  - Returns: `String`

- **`profile`** - Get current user profile (requires auth)
  - Returns: `UserProfile`

### Mahasiswa (Student) Queries

#### Basic Student Data
- **`mahasiswas`** - Get all students
  - Returns: `[MahasiswaSimak]`

- **`mahasiswa(nim: String!)`** - Get student by NIM
  - Args: `nim` (Student ID)
  - Returns: `MahasiswaSimak`

- **`mahasiswasByName(nama: String!)`** - Search students by name
  - Args: `nama` (Name)
  - Returns: `[MahasiswaSimak]`

- **`mahasiswaByEmail(email: String!)`** - Get student by email
  - Args: `email`
  - Returns: `MahasiswaSimak`

- **`mahasiswasByProdi(kode_prodi: String!)`** - Get students by program
  - Args: `kode_prodi` (Program code)
  - Returns: `[MahasiswaSimak]`

#### Academic Records
- **`getKrsMahasiswa(nim: String!, periode_krs: String!)`** - Get KRS (Study Plan)
  - Args: 
    - `nim` - Student ID
    - `periode_krs` - Academic period (e.g., "20241")
  - Returns: `KrsWithHeaderOutput`

- **`getKhsMahasiswa(nim: String!, periode_krs: String!)`** - Get KHS (Grade Report)
  - Args:
    - `nim` - Student ID
    - `periode_krs` - Academic period
  - Returns: `KhsWithHeaderOutput`

- **`getAllTranskripMahasiswa(nim: String!)`** - Get complete transcript
  - Args: `nim` - Student ID
  - Returns: `TranskripWithHeaderOutput`

### KKP (Internship/Praktik Kerja) Queries

#### KKP Management
- **`getAllKkps`** - Get all KKPs
  - Returns: `[Kkp]`

- **`getKkp(id: String!)`** - Get KKP by ID
  - Args: `id`
  - Returns: `Kkp`

- **`cekKkpMahasiswa(nim: String!)`** - Check student KKP status
  - Args: `nim`
  - Returns: `Boolean`

#### KKP Approvals
- **`getAllApprovalStatuses`** - Get all approval status types
  - Returns: `[ApprovalStatus]`

- **`getAllKkpApprovals`** - Get all KKP approvals
  - Returns: `[KkpApproval]`

- **`getKkpApproval(id: String!)`** - Get KKP approval by ID
  - Args: `id`
  - Returns: `KkpApproval`

#### KKP Mahasiswa (Student's KKP)
- **`getAllKkpMahasiswas`** - Get all student KKPs
  - Returns: `[KkpMahasiswa]`

- **`getKkpMahasiswa(id: String!)`** - Get student KKP by ID
  - Args: `id`
  - Returns: `KkpMahasiswa`

- **`getMahasiswaKkpSyaratWithApproval(nim: String!)`** - Get student KKP requirements with approval status
  - Args: `nim`
  - Returns: `[MahasiswaKkpSyaratApprovalOutput]`

- **`getAllApprovedMahasiswa`** - Get all approved students
  - Returns: `[ApprovedMahasiswaOutput]`

- **`getAllApprovedMahasiswaStats`** - Get approval statistics
  - Returns: `[KkpMahasiswaApprovalStatsOutput]`

#### KKP Requirements (Syarat)
- **`getAllKkpSyarat`** - Get all KKP requirements
  - Returns: `[KkpSyarat]`

- **`getKkpSyaratByKodeProdi(kodeProdi: String!)`** - Get requirements by program
  - Args: `kodeProdi`
  - Returns: `[KkpSyarat]`

- **`getKkpSyarat(id: String!)`** - Get requirement by ID
  - Args: `id`
  - Returns: `KkpSyarat`

- **`getKkpMahasiswaSyarat(id: String!)`** - Get student's requirement
  - Args: `id`
  - Returns: `KkpMahasiswaSyarat`

- **`getApprovalTimeline(nim: String!, kkp_syarat_id: String!)`** - Get approval timeline
  - Args:
    - `nim`
    - `kkp_syarat_id`
  - Returns: `[ApprovalOutput]`

#### KKP Instansi (Institution)
- **`getAllKkpInstansi`** - Get all institutions
  - Returns: `[KkpInstansiOutput]`

- **`getKkpInstansi(id: String!)`** - Get institution by ID
  - Args: `id`
  - Returns: `KkpInstansiOutput`

- **`getAllInstansiApproved`** - Get all approved institutions
  - Returns: `[KkpInstansi]`

- **`getAllKkpInstansiApprovals`** - Get all institution approvals
  - Returns: `[KkpInstansiApproval]`

- **`getKkpInstansiApproval(id: String!)`** - Get institution approval
  - Args: `id`
  - Returns: `KkpInstansiApproval`

#### KKP Instansi Bagian (Department)
- **`getAllKkpInstansiBagians`** - Get all departments
  - Returns: `[KkpInstansiBagianOutput]`

- **`getKkpInstansiBagian(id: String!)`** - Get department by ID
  - Args: `id`
  - Returns: `KkpInstansiBagianOutput`

- **`getAllKkpInstansiBagianApprovals`** - Get all department approvals
  - Returns: `[KkpInstansiBagianApproval]`

- **`getKkpInstansiBagianApproval(id: String!)`** - Get department approval
  - Args: `id`
  - Returns: `KkpInstansiBagianApproval`

#### KKP Kelengkapan (Completeness)
- **`getKkpMahasiswaSyaratKelengkapan(id: String!)`** - Get requirement completeness
  - Args: `id`
  - Returns: `KkpMahasiswaSyaratKelengkapanOutput`

- **`getAllKkpMahasiswaSyaratKelengkapanApprovals`** - Get all completeness approvals
  - Returns: `[KkpMahasiswaSyaratKelengkapanApproval]`

- **`getKkpMahasiswaSyaratKelengkapanApproval(id: String!)`** - Get completeness approval
  - Args: `id`
  - Returns: `KkpMahasiswaSyaratKelengkapanApproval`

### Faculty & Program Queries

- **`getAllFakultas`** - Get all faculties
  - Returns: `[Fakultas]`

- **`getFakultas(id: Int!)`** - Get faculty by ID
  - Args: `id`
  - Returns: `Fakultas`

- **`getAllProdis`** - Get all study programs
  - Returns: `[Prodi]`

- **`getProdi(id: Float!)`** - Get program by ID
  - Args: `id`
  - Returns: `Prodi`

- **`getProdiByKodeProdi(kodeProdi: String!)`** - Get program by code
  - Args: `kodeProdi`
  - Returns: `Prodi`

---

## 🔄 Available Mutations

### Authentication
- **`login(username: String!, password: String!)`** - Login user
  - Args:
    - `username`
    - `password`
  - Returns: `LoginResponse`

- **`signin(loginUserInput: SigninUserInput!)`** - Sign in user
  - Args: `loginUserInput`
  - Returns: `SigninResponse`

### KKP Mutations

#### KKP Creation
- **`createKkp(input: CreateKkpInput!)`** - Create new KKP
  - Args: `input`
  - Returns: `Kkp`

- **`createKkpApproval(input: CreateKkpApprovalInput!)`** - Create KKP approval
  - Args: `input`
  - Returns: `KkpApproval`

#### Program (Prodi) Management
- **`createProdi(createProdiInput: CreateProdiInput!)`** - Create study program
  - Args: `createProdiInput`
  - Returns: `Prodi`

- **`updateProdi(updateProdiInput: UpdateProdiInput!)`** - Update study program
  - Args: `updateProdiInput`
  - Returns: `Prodi`

- **`removeProdi(id: Float!)`** - Remove study program
  - Args: `id`
  - Returns: `Prodi`

#### KKP Requirements (Syarat)
- **`createKkpSyarat(input: CreateKkpSyaratInput!)`** - Create requirement
  - Args: `input`
  - Returns: `KkpSyarat`

- **`updateKkpSyarat(id: String!, input: UpdateKkpSyaratInput!)`** - Update requirement
  - Args:
    - `id`
    - `input`
  - Returns: `KkpSyarat`

- **`removeKkpSyarat(id: String!)`** - Remove requirement
  - Args: `id`
  - Returns: `KkpSyarat`

#### KKP Institution (Instansi)
- **`ajukanKkpInstansi(createKkpInstansiInput: CreateKkpInstansiInput!)`** - Submit institution
  - Args: `createKkpInstansiInput`
  - Returns: `KkpInstansi`

- **`createKkpInstansiApproval(input: CreateKkpInstansiApprovalInput!)`** - Create institution approval
  - Args: `input`
  - Returns: `KkpInstansiApproval`

#### KKP Institution Department (Bagian)
- **`createKkpInstansiBagian(createKkpInstansiBagianInput: CreateKkpInstansiBagianInput!)`** - Create department
  - Args: `createKkpInstansiBagianInput`
  - Returns: `KkpInstansiBagian`

- **`updateKkpInstansiBagian(id: String!, updateKkpInstansiBagianInput: UpdateKkpInstansiBagianInput!)`** - Update department
  - Args:
    - `id`
    - `updateKkpInstansiBagianInput`
  - Returns: `KkpInstansiBagian`

- **`removeKkpInstansiBagian(id: String!)`** - Remove department
  - Args: `id`
  - Returns: `KkpInstansiBagian`

- **`createKkpInstansiBagianApproval(createKkpInstansiBagianApprovalInput: CreateKkpInstansiBagianApprovalInput!)`** - Create department approval
  - Args: `createKkpInstansiBagianApprovalInput`
  - Returns: `KkpInstansiBagianApproval`

- **`updateKkpInstansiBagianApproval(id: String!, updateKkpInstansiBagianApprovalInput: UpdateKkpInstansiBagianApprovalInput!)`** - Update department approval
  - Args:
    - `id`
    - `updateKkpInstansiBagianApprovalInput`
  - Returns: `KkpInstansiBagianApproval`

- **`removeKkpInstansiBagianApproval(id: String!)`** - Remove department approval
  - Args: `id`
  - Returns: `KkpInstansiBagianApproval`

#### KKP Completeness (Kelengkapan)
- **`createKkpMahasiswaSyaratKelengkapan(createKkpMahasiswaSyaratKelengkapanInput: CreateKkpMahasiswaSyaratKelengkapanInput!)`** - Create completeness
  - Args: `createKkpMahasiswaSyaratKelengkapanInput`
  - Returns: `KkpMahasiswaSyaratKelengkapanOutput`

- **`createKkpMahasiswaSyaratKelengkapanApproval(createKkpMahasiswaSyaratKelengkapanApprovalInput: CreateKkpMahasiswaSyaratKelengkapanApprovalInput!)`** - Create completeness approval
  - Args: `createKkpMahasiswaSyaratKelengkapanApprovalInput`
  - Returns: `KkpMahasiswaSyaratKelengkapanApproval`

- **`updateKkpMahasiswaSyaratKelengkapanApproval(id: String!, updateKkpMahasiswaSyaratKelengkapanApprovalInput: UpdateKkpMahasiswaSyaratKelengkapanApprovalInput!)`** - Update completeness approval
  - Args:
    - `id`
    - `updateKkpMahasiswaSyaratKelengkapanApprovalInput`
  - Returns: `KkpMahasiswaSyaratKelengkapanApproval`

- **`removeKkpMahasiswaSyaratKelengkapanApproval(id: String!)`** - Remove completeness approval
  - Args: `id`
  - Returns: `KkpMahasiswaSyaratKelengkapanApproval`

---

## 📋 Main Types

### User & Authentication
```graphql
type UserProfile {
  # User profile fields
}

type LoginResponse {
  # Login response with token
}

type SigninResponse {
  # Sign in response
}
```

### Academic Structure
```graphql
type Fakultas {
  id: ID!
  kode_fakultas: String!
  nama_fakultas: String!
  nama_fakultas_eng: String
  dekan: String
  prodi: [Prodi]
}

type Prodi {
  id: ID!
  kode_prodi: String!
  nama_prodi: String!
  gelar_pendek: String
  gelar_panjang: String
  total_sks_lulus: Float
  fakultas: Fakultas
  mahasiswa: [Mahasiswa]
}
```

### Student
```graphql
type MahasiswaSimak {
  nim: ID!
  nama: String!
  hp: String
  prodi_kode_prodi: String
  password: String
}

type Mahasiswa {
  nim: ID!
  nama: String!
  prodi_kode_prodi: String
  is_activated: Boolean
  created_at: Date
  updated_at: Date
  prodi: Prodi
}
```

### Academic Records
```graphql
type KrsWithHeaderOutput {
  header: KrsHeader
  krs: [KrsMahasiswaOutput]
}

type KrsHeader {
  total_sks: Int
  total_matakuliah: Int
}

type KrsMahasiswaOutput {
  kode_matakuliah: String
  nama_matakuliah: String
  semester: Float
  sks: Float
}

type KhsWithHeaderOutput {
  header: KhsHeader
  khs: [KhsMahasiswaOutput]
}

type KhsHeader {
  total_sks: Int
  total_bobot: Float
  total_matakuliah: Int
  ips: Float
}

type KhsMahasiswaOutput {
  kode_matakuliah: String
  nama_matakuliah: String
  semester: Float
  sks: Float
  grade: String
  nilai: Float
  bobot: Float
}

type TranskripWithHeaderOutput {
  header: TranskripHeader
  transkrip: [TranskripMahasiswaOutput]
}

type TranskripHeader {
  total_sks_program: Int
  total_sks_lulus: Int
  ipk: Float
}
```

### KKP (Internship)
```graphql
type Kkp {
  id: ID!
  prodi_kode_prodi: String
  no_surat: String
  tanggal_surat: Date
  no_sk_kkp: String
  instansi: String
  tempat: String
  mahasiswa_nim_ketua: String
  dosen_nidn_pembimbing_prodi: String
  nama_pembimbing_lapangan: String
  created_at: String
  updated_at: String
}

type KkpMahasiswa {
  id: ID!
  mahasiswa_nim: String
  kkp_id: String
  mahasiswa: Mahasiswa
  kkp: Kkp
  syarat: [KkpMahasiswaSyarat]
}

type KkpSyarat {
  id: ID!
  prodi_kode_prodi: String
  nama: String
  logo: String
  url_check: String
  is_upload_file: Boolean
  is_activated: Boolean
}

type KkpInstansi {
  id: ID!
  nama: String!
  alamat: String
  logo: String
  is_activated: Boolean
  bagian: [KkpInstansiBagian]
  approvals: [KkpInstansiApproval]
}

type ApprovalStatus {
  id: ID!
  nama: String!
  keterangan: String
}
```

---

## 💡 Usage Examples

### Get Student Data
```graphql
query GetStudent {
  mahasiswa(nim: "105841109520") {
    nim
    nama
    hp
    prodi_kode_prodi
  }
}
```

### Get Student KRS
```graphql
query GetKRS {
  getKrsMahasiswa(nim: "105841109520", periode_krs: "20241") {
    header {
      total_sks
      total_matakuliah
    }
    krs {
      kode_matakuliah
      nama_matakuliah
      sks
      semester
    }
  }
}
```

### Get Student Transcript
```graphql
query GetTranskrip {
  getAllTranskripMahasiswa(nim: "105841109520") {
    header {
      total_sks_lulus
      ipk
    }
    transkrip {
      kode_matakuliah
      nama_matakuliah
      sks
      grade
      nilai
    }
  }
}
```

### Login
```graphql
mutation Login {
  login(username: "105841109520", password: "your_password") {
    token
    user {
      nim
      nama
    }
  }
}
```

### Get All Programs
```graphql
query GetAllProdi {
  getAllProdis {
    id
    kode_prodi
    nama_prodi
    gelar_pendek
    total_sks_lulus
  }
}
```

---

## 🔐 Authentication

Most queries require authentication. Include JWT token in headers:

```typescript
const client = new GraphQLClient(endpoint, {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
```

---

## 📝 Notes

1. **Date Format:** Dates are typically in ISO 8601 format
2. **IDs:** Most IDs are String type
3. **Pagination:** Check if pagination is supported for list queries
4. **Error Handling:** Always check for `errors` in response

---

For complete schema details, see: `docs/GRAPHQL_SCHEMA.json`
