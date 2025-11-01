# Dashboard Mahasiswa - GraphQL Endpoints Status

## ✅ Sudah Tersedia dan Terintegrasi

### 1. GET_PROFILE
- **Status**: ✅ Tersedia dan berfungsi
- **Digunakan di**: `context/auth-context.tsx`
- **Data yang didapat**:
  - `id`: ID user
  - `username`: Username (NIM)
  - `name`: Nama lengkap
  - `email`: Email mahasiswa
  - `phone`: Nomor telepon
  - `role`: Role user

### 2. SIGNIN (signin mutation)
- **Status**: ✅ Tersedia dan berfungsi
- **Digunakan di**: `context/auth-context.tsx`, `app/actions/auth-actions.ts`
- **Input**: 
  ```graphql
  mutation Signin($loginUserInput: SigninUserInput!) {
    signin(signinUserInput: $loginUserInput) {
      access_token
      user {
        id
        username
        role
      }
    }
  }
  ```

## ⏳ Belum Terintegrasi (Endpoint Ada di Schema)

### 3. GET_KRS_MAHASISWA
- **Status**: ✅ Tersedia dan terintegrasi (2025-10-30)
- **Digunakan di**: 
  - `app/actions/student-actions.ts` (getStudentKRS function)
  - `app/dashboard/mahasiswa/academic/page.tsx` (Academic Overview - KRS Tab)
- **Data yang didapat**:
  - `header.total_sks`: Total SKS semester ini
  - `header.total_matakuliah`: Total mata kuliah semester ini
  - `krs[]`: Array list mata kuliah dengan kode, nama, semester, SKS
- **Query GraphQL**:
  ```graphql
  query GetKrsMahasiswa($nim: String, $periode_krs: String) {
    getKrsMahasiswa(nim: $nim, periode_krs: $periode_krs) {
      header {
        total_sks
        total_matakuliah
      }
      krs {
        kode_matakuliah
        nama_matakuliah
        semester
        sks
      }
    }
  }
  ```
- **Note**: Parameters `nim` dan `periode_krs` bisa null (menggunakan user session)

### 4. GET_KHS_MAHASISWA
- **Status**: ✅ Tersedia dan terintegrasi (2025-10-30)
- **Digunakan di**: 
  - `app/actions/student-actions.ts` (getStudentKHS function)
  - `app/dashboard/mahasiswa/academic/page.tsx` (Academic Overview - KHS Tab)
- **Data yang didapat**:
  - `header.total_sks`: Total SKS yang sudah ditempuh
  - `header.total_bobot`: Total bobot nilai
  - `header.total_matakuliah`: Total mata kuliah
  - `header.ips`: Indeks Prestasi Semester (IPS/GPA)
  - `khs[]`: Array list nilai dengan kode, nama, semester, SKS, nilai, grade, bobot
- **Query GraphQL**:
  ```graphql
  query GetKhsMahasiswa($nim: String, $periode_krs: String) {
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
- **Note**: Parameters `nim` dan `periode_krs` bisa null (menggunakan user session)

### 5. GET_MAHASISWA_BY_NIM
- **Status**: ⏳ Tersedia tapi belum diintegrasikan
- **Diperlukan untuk**:
  - Status mahasiswa (`student.status`: active/suspended/graduated/dropped_out)
  - Semester saat ini (`student.semester`)
  - Data lengkap mahasiswa (prodi, fakultas, angkatan, dll)
- **Query GraphQL**:
  ```graphql
  query GetMahasiswaByNim($nim: String!) {
    mahasiswa(nim: $nim) {
      id
      nim
      nama
      email
      no_hp
      jenis_kelamin
      tempat_lahir
      tanggal_lahir
      nik
      id_prodi
      semester_awal
      masa_studi
      tahun_akademik_lulus
      no_seri_ijazah
      tanggal_sk_yudisium
      last_sync_at
      prodi {
        nama_prodi
        fakultas {
          nama_fakultas
        }
      }
    }
  }
  ```
- **Tampilan sekarang**: "Belum ada data" dengan label "Endpoint: GET_MAHASISWA_BY_NIM"

### 6. GET_TRANSKRIP_MAHASISWA
- **Status**: ⏳ Tersedia tapi belum diintegrasikan
- **Diperlukan untuk**:
  - Transkrip lengkap mahasiswa
  - Halaman transkrip akademik
- **Query GraphQL**:
  ```graphql
  query GetTranskrip($nim: String!) {
    transkripts(nim: $nim) {
      id_transkrip
      nim
      id_matkul
      nilai
      grade
      bobot
      sks
      nama_matkul
      kode_matkul
    }
  }
  ```

## ❌ Belum Ada di Schema

### 7. GET_JADWAL_MAHASISWA
- **Status**: ❌ Belum tersedia
- **Diperlukan untuk**:
  - Jadwal kuliah mingguan (`weeklySchedule`)
- **Tampilan sekarang**: "Belum ada data" dengan label "Endpoint: GET_JADWAL_MAHASISWA (jadwal kuliah)"
- **Perlu dibuat**: Query untuk mendapatkan jadwal kuliah berdasarkan NIM dan periode

### 8. GET_KKP_MAHASISWA
- **Status**: ❓ Perlu dicek di schema
- **Diperlukan untuk**:
  - Status KKP mahasiswa (`kkpStatus`)
  - Perusahaan tempat KKP
  - Tanggal pengajuan
- **Tampilan sekarang**: Hanya muncul jika ada data, jika tidak ada menunjukkan "Endpoint: GET_KKP_MAHASISWA"

### 9. Deadline/Notification Endpoint
- **Status**: ❌ Belum tersedia
- **Diperlukan untuk**:
  - Upcoming deadlines (`upcomingDeadlines`)
  - Notifikasi penting
- **Tampilan sekarang**: "Belum ada data" dengan label "Endpoint: Belum tersedia"
- **Perlu dibuat**: Sistem notifikasi/deadline terintegrasi

### 10. Payment Endpoint
- **Status**: ❌ Belum tersedia
- **Diperlukan untuk**:
  - Pembayaran tertunda (`pendingPayments`)
  - Riwayat pembayaran
- **Perlu dibuat**: Query untuk status pembayaran mahasiswa

## 📋 Prioritas Implementasi

### Priority 1 - Critical (Data Akademik Utama)
1. ✅ **GET_PROFILE** - Sudah terintegrasi
2. ✅ **GET_KRS_MAHASISWA** - Sudah terintegrasi (Academic page)
3. ✅ **GET_KHS_MAHASISWA** - Sudah terintegrasi (Academic page)
4. ⏳ **GET_MAHASISWA_BY_NIM** - Status, semester, data lengkap

### Priority 2 - Important (Data Pendukung)
5. ❌ **GET_JADWAL_MAHASISWA** - Jadwal mingguan
6. ⏳ **GET_TRANSKRIP_MAHASISWA** - Transkrip lengkap

### Priority 3 - Nice to Have (Fitur Tambahan)
7. ❌ **Deadline/Notification System** - Pengingat dan notifikasi
8. ❌ **Payment System** - Status pembayaran
9. ❓ **GET_KKP_MAHASISWA** - Status KKP

## 🔧 Cara Implementasi

### Step 1: Test Query di GraphQL Playground
```bash
# Buka GraphQL Playground
# URL: https://superapps.if.unismuh.ac.id/graphql
```

### Step 2: Update `lib/graphql/queries-superapps.ts`
Tambahkan query yang diperlukan jika belum ada.

### Step 3: Create API Action
Buat function di `app/actions/student-actions.ts` untuk fetch data:
```typescript
export async function getStudentKRS(nim: string) {
  try {
    const token = getTokenFromCookies()
    const client = createAuthenticatedClient(token)
    
    const data = await executeGraphQLQuery(
      GET_KRS_MAHASISWA,
      { nim, periode_krs: getCurrentPeriode() },
      client
    )
    
    return { success: true, data: data.krs_mahasiswas }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

### Step 4: Integrate to Dashboard
Update `app/dashboard/mahasiswa/page.tsx`:
```typescript
useEffect(() => {
  const fetchData = async () => {
    if (user?.username) {
      const krsResult = await getStudentKRS(user.username)
      if (krsResult.success) {
        // Update studentData with real KRS data
      }
    }
  }
  fetchData()
}, [user])
```

## 📝 Notes

- Semua endpoint yang menunjukkan "Belum ada data" sudah memiliki null-safe rendering
- Dashboard tidak akan crash meskipun data belum tersedia
- Endpoint name ditampilkan untuk memudahkan tracking implementasi
- Token disimpan di localStorage (client-side only untuk sekarang)

## 🔐 Authentication Flow

1. User login dengan NIM dan password
2. SIGNIN mutation mengembalikan `access_token` dan data `user`
3. Token disimpan di localStorage
4. Dashboard menggunakan token untuk query data
5. Jika token expired, user harus login ulang

## 📊 Current Dashboard Data Structure

```typescript
const studentData = {
  student: {
    id: user.id || '',
    nim: user.username || '',
    name: user.name || 'Nama tidak tersedia',
    email: user.email || '-',
    phone: user.phone || '-',
    role: user.role || 'mahasiswa',
    status: null, // TODO: GET_MAHASISWA_BY_NIM
    semester: null, // TODO: GET_MAHASISWA_BY_NIM
    gpa: null, // TODO: GET_KHS_MAHASISWA
    // ... other fields
  },
  academicInfo: {
    currentSemester: user.username?.substring(0, 4) || '-',
    totalCredits: null, // TODO: GET_KHS_MAHASISWA
    gpa: null, // TODO: GET_KHS_MAHASISWA
    currentCredits: null, // TODO: GET_KRS_MAHASISWA
  },
  currentSemester: {
    credits: null, // TODO: GET_KRS_MAHASISWA
    courses: null, // TODO: GET_KRS_MAHASISWA
  },
  upcomingDeadlines: [], // TODO: Create endpoint
  currentCourses: [], // TODO: GET_KRS_MAHASISWA
  weeklySchedule: [], // TODO: GET_JADWAL_MAHASISWA
  kkpStatus: null, // TODO: GET_KKP_MAHASISWA
  pendingPayments: null, // TODO: Create payment endpoint
}
```
