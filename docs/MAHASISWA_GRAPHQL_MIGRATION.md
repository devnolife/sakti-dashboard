# Migrasi Dashboard Mahasiswa ke GraphQL Penuh

## Status Migrasi

### ✅ Sudah Menggunakan GraphQL
1. **Dashboard Utama** (`/dashboard/mahasiswa`)
   - KRS: `GET_KRS_MAHASISWA`
   - KHS: `GET_KHS_MAHASISWA`
   - Profile: `GET_PROFILE`

### ❌ Masih Menggunakan API Routes
1. **Academic Page** (`/dashboard/mahasiswa/academic`)
   - Saat ini: `fetch('/api/student/academic')`
   - Seharusnya: GraphQL `GET_KRS_MAHASISWA` + `GET_KHS_MAHASISWA`

2. **Grades Page** (`/dashboard/mahasiswa/grades`)
   - Saat ini: `fetch('/api/student/grades')`
   - Seharusnya: GraphQL `GET_KHS_MAHASISWA` atau `GET_TRANSKRIP_MAHASISWA`

3. **Courses Page** (`/dashboard/mahasiswa/courses`)
   - Saat ini: `fetch('/api/student/courses')`
   - Seharusnya: GraphQL `GET_KRS_MAHASISWA`

4. **Profile/Correspondence Pages**
   - Saat ini: `fetch('/api/student/profile')`
   - Seharusnya: GraphQL `GET_PROFILE`

## GraphQL Queries Tersedia

### Untuk Courses/KRS
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

### Untuk Grades/KHS
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

### Untuk Transkrip Lengkap
```graphql
query GetTranskripMahasiswa($nim: String!) {
  getAllTranskripMahasiswa(nim: $nim) {
    header {
      total_sks_program
      total_sks_lulus
      total_matakuliah_program
      total_matakuliah_lulus
      ipk
    }
    transkrip {
      kode_matakuliah
      nama_matakuliah
      semester
      sks
      periode_krs
      status_nilai
      grade
      nilai
      bobot
    }
  }
}
```

## Plan Migrasi

### Step 1: Buat Server Actions Baru
File: `app/actions/academic-actions.ts`
- `getStudentCourses()` - menggunakan `GET_KRS_MAHASISWA`
- `getStudentGrades()` - menggunakan `GET_KHS_MAHASISWA`
- `getStudentTranscript()` - menggunakan `GET_TRANSKRIP_MAHASISWA`

### Step 2: Update Pages
1. **app/dashboard/mahasiswa/courses/page.tsx**
   - Ganti `fetch('/api/student/courses')` dengan `getStudentCourses()`

2. **app/dashboard/mahasiswa/grades/page.tsx**
   - Ganti `fetch('/api/student/grades')` dengan `getStudentGrades()`

3. **app/dashboard/mahasiswa/academic/page.tsx**
   - Ganti `fetch('/api/student/academic')` dengan kombinasi `getStudentCourses()` dan `getStudentGrades()`

### Step 3: Remove API Routes (Optional)
Setelah semua halaman menggunakan GraphQL, hapus:
- `app/api/student/courses/route.ts`
- `app/api/student/grades/route.ts`
- `app/api/student/academic/route.ts`

## Benefits

1. **Single Source of Truth**: Semua data dari GraphQL backend
2. **Real-time Data**: Selalu sync dengan server
3. **Simplified Architecture**: Tidak perlu maintain API routes
4. **Better Performance**: Lebih efisien dengan GraphQL
5. **Easier Maintenance**: Satu tempat untuk semua queries

## Testing

Setelah migrasi, test:
1. Login sebagai mahasiswa
2. Akses `/dashboard/mahasiswa` - harus menampilkan data KRS/KHS
3. Akses `/dashboard/mahasiswa/courses` - harus menampilkan list courses
4. Akses `/dashboard/mahasiswa/grades` - harus menampilkan nilai
5. Akses `/dashboard/mahasiswa/academic` - harus menampilkan info akademik

## Notes

- Token GraphQL sudah tersimpan di cookies setelah login
- Server actions sudah handle authentication dengan token
- Error handling sudah ada di `executeGraphQLQuery()`


