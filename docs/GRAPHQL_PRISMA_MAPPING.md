# GraphQL to Prisma Schema Mapping

**Purpose:** Map GraphQL data dari `https://sicekcok.if.unismuh.ac.id/graphql` ke Prisma schema sebagai **data source awal** untuk populate database.

---

## 📋 Mapping Strategy

GraphQL akan menjadi **Source of Truth** untuk:
- ✅ Data mahasiswa (profile, akademik)
- ✅ Data dosen (profile, bimbingan)
- ✅ Data nilai dan IPK
- ✅ Data prodi

Prisma akan menyimpan:
- ✅ Semua data dari GraphQL (synced)
- ✅ Data tambahan (KKP, surat, ujian, lab, dll)

---

## 1️⃣ **Student Mapping**

### GraphQL → Prisma

#### **User Model** (Authentication)
```typescript
// GraphQL: mahasiswa(nim)
{
  nim: "12345678"
  nama: "John Doe"
  email: "john@example.com"
}

// Maps to Prisma User:
{
  nidn: nim,                    // Use NIM as NIDN for students
  name: nama,
  password: "hashed_password",  // Generate initial password
  role: "mahasiswa",
  isActive: true,
  avatar: null
}
```

#### **Student Model** (Profile & Academic)
```typescript
// GraphQL: mahasiswaInfo(nim)
{
  nim: "12345678"
  nama: "John Doe"
  angkatan: 2020
  kodeProdi: "55201"
  namaProdi: "Teknik Informatika"
  nidnPa: "0901018901"
  namaPa: "Dr. Lecturer"
  ipk: 3.75
  totalSksLulus: 120
  totalSksSelesai: 125
  sksBerjalan: 15
  aktifTerakhirTa: "2023/2024 Ganjil"
  statusTerakhirTa: "Aktif"
  jumlahSemester: 7
  aktif: 6
  cuti: 0
  nonAktif: 1
  kkp: 1              // 0 = belum, 1 = sudah
  aik: 1
  proposal: 1
}

// Maps to Prisma Student:
{
  userId: user.id,                    // Foreign key to User
  nim: nim,
  major: namaProdi,
  department: "Fakultas Teknik",      // Default or from config
  semester: jumlahSemester,
  academicYear: aktifTerakhirTa,
  phone: null,                        // From mahasiswa() query
  address: null,                      // From mahasiswa() query
  guardian: null,                     // From mahasiswa() ayah/ibu
  enrollDate: new Date(angkatan, 8, 1), // Sept 1st of angkatan year
  status: statusTerakhirTa === "Aktif" ? "active" :
          statusTerakhirTa === "Cuti" ? "inactive" : "active",
  gpa: ipk,
  academicAdvisorId: lecturerId       // Map from nidnPa
}
```

#### **Student Extended Data** (from `mahasiswa()` query)
```typescript
// GraphQL: mahasiswa(nim)
{
  nim: "12345678"
  nama: "John Doe"
  jenisKelamin: "L"
  tempatLahir: "Makassar"
  tanggalLahir: "2002-01-15"
  nik: "7371011501020001"
  hp: "081234567890"
  email: "john@student.unismuh.ac.id"
  dosenPA: "0901018901"
  lulus: false
  tahunAkademikLulus: null
  tanggalLulus: null
  noSeriIjazah: null
  masaStudi: "7 semester"
  ayah: {
    nama: "Father Name"
    pekerjaan: "Entrepreneur"
    penghasilan: "5000000"
  }
  ibu: {
    nama: "Mother Name"
    pekerjaan: "Teacher"
  }
  wali: {
    nama: "Guardian Name"
  }
}

// Maps to Prisma Student (extended):
{
  phone: hp,
  address: null,                      // Not in GraphQL
  guardian: JSON.stringify({
    ayah: {
      nama: ayah.nama,
      pekerjaan: ayah.pekerjaan,
      penghasilan: ayah.penghasilan
    },
    ibu: {
      nama: ibu.nama,
      pekerjaan: ibu.pekerjaan
    },
    wali: wali ? {
      nama: wali.nama
    } : null
  }),
  status: lulus ? "graduated" : "active"
}
```

---

## 2️⃣ **Lecturer Mapping**

### GraphQL → Prisma

#### **User Model**
```typescript
// GraphQL: dosen(nidn)
{
  nidn: "0901018901"
  nama: "Dr. John Lecturer"
  gelar_depan: "Dr."
  gelar_belakang: "M.T., Ph.D."
  tempat_lahir: "Makassar"
  tanggal_lahir: "1989-01-01"
  email: "john.lecturer@unismuh.ac.id"
  prodiId: "55201"
}

// Maps to Prisma User:
{
  nidn: nidn,
  name: `${gelar_depan} ${nama} ${gelar_belakang}`.trim(),
  password: "hashed_password",        // Generate initial
  role: "dosen",
  subRole: null,                      // Set based on position
  isActive: true,
  avatar: null
}
```

#### **Lecturer Model**
```typescript
// Maps to Prisma Lecturer:
{
  userId: user.id,
  nip: nidn,                          // Use NIDN as NIP
  department: "Teknik Informatika",   // From prodiId mapping
  position: "Dosen",                  // Default, can be updated
  specialization: null,               // Not in GraphQL
  phone: null,                        // Not in GraphQL
  office: null                        // Not in GraphQL
}
```

---

## 3️⃣ **Course & Grade Mapping**

### GraphQL → Prisma

#### **Grade Data** (from `mahasiswa.khs`)
```typescript
// GraphQL: mahasiswa(nim).khs
[
  {
    kodeMk: "IF101"
    namaMk: "Pemrograman Dasar"
    sks: 3
    nilai: "A"
    nilaiAngka: 4.0
    semester: "1"
    tahunAkademik: "2020/2021"
  }
]

// Maps to Prisma Course (if not exists):
{
  code: kodeMk,
  name: namaMk,
  credits: sks,
  semester: parseInt(semester),
  department: "Teknik Informatika",
  isActive: true,
  lecturerId: null                    // Not in GraphQL KHS
}

// Maps to Prisma Grade:
{
  studentId: student.id,
  courseId: course.id,
  score: nilaiAngka * 25,             // Convert to 0-100 scale
  letterGrade: nilai,
  semester: semester,
  academicYear: tahunAkademik
}
```

---

## 4️⃣ **Prodi Mapping**

### GraphQL → Prisma

```typescript
// GraphQL: getAllProdi()
[
  {
    kode: "55201"
    nama: "Teknik Informatika"
    jenjang: "S1"
    fakultas: "Teknik"
    akreditasi: "B"
  }
]

// No direct Prisma model, but used for:
// - Student.major
// - Student.department
// - Course.department
// - Validation in forms

// Can create SystemConfig entries:
{
  key: `prodi_${kode}`,
  value: JSON.stringify({
    kode,
    nama,
    jenjang,
    fakultas,
    akreditasi
  }),
  category: "prodi"
}
```

---

## 5️⃣ **PA (Pembimbing Akademik) Relationship**

### GraphQL → Prisma

```typescript
// GraphQL: paDosen() for logged-in dosen
[
  {
    nim: "12345678"
    nama: "Student 1"
    // ... mahasiswaInfo fields
  }
]

// GraphQL: mahasiswaInfo(nim).nidnPa
"0901018901"

// Maps to Prisma Student.academicAdvisorId:
{
  academicAdvisorId: lecturer.id      // Foreign key
}

// Lecturer can query:
lecturer.adviseeStudents              // All PA students
```

---

## 📊 **Data Sync Strategy**

### **Initial Data Population**

1. **Sync All Prodi**
   ```typescript
   // Fetch from getAllProdi()
   // Store in SystemConfig or create Prodi table
   ```

2. **Sync All Dosen**
   ```typescript
   // Fetch all dosen (need API endpoint or iterate)
   // Create User + Lecturer records
   ```

3. **Sync All Mahasiswa**
   ```typescript
   // For each mahasiswa:
   //   1. Fetch mahasiswaInfo(nim)
   //   2. Fetch mahasiswa(nim) for extended data
   //   3. Create User + Student records
   //   4. Link to academicAdvisor (dosen)
   ```

4. **Sync Grades**
   ```typescript
   // For each mahasiswa:
   //   1. Fetch mahasiswa(nim).khs
   //   2. Create/update Course records
   //   3. Create Grade records
   ```

### **Incremental Sync**

- **Daily/Hourly Sync:** Update IPK, SKS, status from `mahasiswaInfo`
- **Semester Sync:** Update grades from `khs`
- **Profile Sync:** Update contact info from `mahasiswa`

---

## 🔧 **Implementation Plan**

### **Phase 1: Data Fetching Layer**

Create GraphQL client utilities:

```typescript
// lib/graphql/client.ts
import { GraphQLClient } from 'graphql-request'

export const graphqlClient = new GraphQLClient(
  'https://sicekcok.if.unismuh.ac.id/graphql'
)

// lib/graphql/queries.ts
export const GET_MAHASISWA_INFO = `
  query getMahasiswaInfo($nim: String!) {
    mahasiswaInfo(nim: $nim) {
      nim
      nama
      angkatan
      kodeProdi
      namaProdi
      nidnPa
      namaPa
      ipk
      totalSksLulus
      # ... all fields
    }
  }
`

export const GET_MAHASISWA = `
  query getMahasiswa($nim: String!) {
    mahasiswa(nim: $nim) {
      nim
      nama
      hp
      email
      # ... all fields
      khs {
        kodeMk
        namaMk
        # ...
      }
    }
  }
`
```

### **Phase 2: Sync Functions**

Create sync utilities:

```typescript
// lib/sync/student-sync.ts
export async function syncStudent(nim: string) {
  // 1. Fetch from GraphQL
  const [info, data] = await Promise.all([
    graphqlClient.request(GET_MAHASISWA_INFO, { nim }),
    graphqlClient.request(GET_MAHASISWA, { nim })
  ])

  // 2. Find or create User
  const user = await prisma.users.upsert({
    where: { nidn: nim },
    update: { name: data.nama },
    create: {
      nidn: nim,
      name: data.nama,
      password: await hash(DEFAULT_PASSWORD),
      role: 'mahasiswa'
    }
  })

  // 3. Find or create Student
  const student = await prisma.student.upsert({
    where: { nim },
    update: {
      gpa: info.ipk,
      semester: info.jumlahSemester,
      // ... other fields
    },
    create: {
      userId: user.id,
      nim,
      major: info.namaProdi,
      // ... other fields
    }
  })

  // 4. Sync grades
  await syncStudentGrades(student.id, data.khs)

  return student
}
```

### **Phase 3: API Endpoints**

Create sync endpoints:

```typescript
// app/api/sync/student/route.ts
export async function POST(request: Request) {
  const { nim } = await request.json()

  const student = await syncStudent(nim)

  return NextResponse.json({ success: true, student })
}

// app/api/sync/all-students/route.ts
// Sync all students (admin only)
```

### **Phase 4: Background Jobs**

Setup cron jobs for periodic sync:

```typescript
// Using Vercel Cron or similar
// Every 6 hours: sync active students
// Daily: sync all students
// Weekly: full sync including historical data
```

---

## ✅ **Field Mapping Summary**

| GraphQL Field | Prisma Model | Prisma Field | Notes |
|---------------|--------------|--------------|-------|
| **mahasiswaInfo** | | | |
| `nim` | Student | `nim` | Primary identifier |
| `nama` | User | `name` | Student name |
| `angkatan` | Student | `enrollDate` | Convert to date |
| `kodeProdi` | - | - | Use for validation |
| `namaProdi` | Student | `major` | Major/study program |
| `nidnPa` | Student | `academicAdvisorId` | Foreign key to Lecturer |
| `ipk` | Student | `gpa` | Direct mapping |
| `totalSksLulus` | - | - | Calculate from Grades |
| `jumlahSemester` | Student | `semester` | Current semester |
| `aktifTerakhirTa` | Student | `academicYear` | Academic year |
| **mahasiswa** | | | |
| `hp` | Student | `phone` | Phone number |
| `email` | User | - | Not in User model |
| `nik` | - | - | Store in Student.guardian JSON |
| `jenisKelamin` | - | - | Store in Student.guardian JSON |
| `ayah/ibu/wali` | Student | `guardian` | JSON field |
| `lulus` | Student | `status` | graduated/active |
| `khs[]` | Grade | - | Array → create multiple |
| **dosen** | | | |
| `nidn` | User | `nidn` | Primary identifier |
| `nama` | User | `name` | With gelar |
| `email` | - | - | Not in User model |
| `prodiId` | Lecturer | `department` | Map to dept name |

---

## 🚀 **Next Steps**

1. ✅ Install GraphQL client: `npm install graphql-request graphql`
2. ✅ Create GraphQL client utility
3. ✅ Create query definitions
4. ✅ Create sync functions
5. ✅ Create API endpoints
6. ✅ Test with sample data
7. ✅ Create admin UI for manual sync
8. ✅ Setup automatic sync schedule

---

## 📝 **Notes**

### **Missing Fields in GraphQL**
- User avatar
- Student address
- Lecturer specialization, phone, office
- Course schedules

**Solution:** Allow manual input or leave null, update later

### **Data Conflicts**
If Prisma data differs from GraphQL:
- **Strategy:** GraphQL is source of truth for academic data
- **Exception:** User-modified data (avatar, preferences) stays in Prisma
- **Merge:** Combine both sources, GraphQL for academic, Prisma for app-specific

### **Authentication**
- Some GraphQL queries need auth token
- Store admin/service token in env
- Use for background sync jobs
