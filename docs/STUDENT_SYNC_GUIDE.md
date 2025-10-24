# Student Data Sync with GraphQL

## Overview

Sistem ini secara otomatis mengambil dan menyinkronkan data mahasiswa dari GraphQL API (`https://sicekcok.if.unismuh.ac.id/graphql`) setelah login berhasil. Data yang diambil akan disimpan ke database lokal menggunakan Prisma.

## Fitur

- ✅ Auto-sync saat login mahasiswa
- ✅ Mendukung data lengkap mahasiswa termasuk:
  - Data pribadi (NIM, nama, NIK, dll)
  - Data orang tua (ayah)
  - Data KHS (Kartu Hasil Studi)
  - Data dosen pembimbing akademik
  - Data program studi
- ✅ API endpoint untuk manual sync
- ✅ React hook untuk mengakses data mahasiswa
- ✅ Error handling yang robust

## Alur Kerja

```
1. Mahasiswa Login
   ↓
2. Validasi kredensial di database lokal
   ↓
3. [AUTO] Fetch data dari GraphQL API
   ↓
4. Sync data ke database lokal
   ↓
5. Login sukses dengan data terbaru
```

## GraphQL Query

Query yang digunakan untuk mengambil data mahasiswa:

```graphql
query Mahasiswa($nim: String!) {
  mahasiswa(nim: $nim) {
    nim
    kodeProdi
    angkatan
    nama
    jenisKelamin
    tempatLahir
    tanggalLahir
    nik
    hp
    email
    dosenPA
    semesterAwal
    tahunAkademikLulus
    tanggalLulus
    lulus
    noSeriIjazah
    masaStudi
    dosenPenasehat {
      nidn
      nama
      gelar_depan
      gelar_belakang
      tempat_lahir
      tanggal_lahir
      email
      prodiId
    }
    ayah {
      nim
      nik
      nama
      alamat
      hp
      email
      pendidikan
      pekerjaan
      instansi
      jabatan
      penghasilan
      status
    }
    khs {
      id
      nim
      tahunAkademik
      ips
      sksSmt
      ipk
      sksTotal
      statusMahasiswa
    }
    prodi {
      id
      kodeFakultas
      kodeProdi
      namaProdi
      namaProdiEng
      statusProdi
      emailProdi
      kodeNim
      gelarPendek
      gelarPanjang
      gelarEng
    }
  }
}
```

## Mapping ke Prisma Schema

### Students Table
- `nim` → `students.nim`
- `kodeProdi` → `students.prodi_id`
- `hp` → `students.phone`
- `tempatLahir` → `students.address`
- Data ayah → `students.guardian` (JSON field)
- IPK dari KHS terbaru → `students.gpa`
- `last_sync_at` → Updated setiap sync

### Lecturers Table (Dosen Penasehat)
- `dosenPA` digunakan untuk mencari dosen di table `lecturers`
- `academic_advisor_id` di-update jika dosen ditemukan

### Prodi Table
- Data prodi dari GraphQL disinkronkan ke table `prodi`
- Jika prodi belum ada, akan dibuat record baru

## Penggunaan

### 1. Auto-Sync saat Login

Tidak perlu konfigurasi tambahan. Data mahasiswa akan otomatis di-sync setiap kali login berhasil.

```typescript
// lib/auth.ts
// Sudah terintegrasi dengan NextAuth
if (user.role === 'mahasiswa' && user.students?.nim) {
  await syncStudentDataFromGraphQL(user.students.nim)
}
```

### 2. Manual Sync via API

#### GET Request (Read Profile)
```typescript
// Mengambil profil mahasiswa yang sudah tersimpan
const response = await fetch('/api/student/sync')
const data = await response.json()

// Force sync dari GraphQL
const response = await fetch('/api/student/sync?sync=true')
const data = await response.json()
```

#### POST Request (Force Sync)
```typescript
// Sync data mahasiswa tertentu (butuh permission)
const response = await fetch('/api/student/sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nim: '105841109518' })
})
```

### 3. Menggunakan React Hook

#### Basic Usage
```typescript
import { useStudentProfile } from '@/hooks/use-student-profile'

function StudentDashboard() {
  const { profile, loading, error, syncProfile } = useStudentProfile()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Welcome, {profile?.users.name}</h1>
      <p>NIM: {profile?.nim}</p>
      <p>GPA: {profile?.gpa}</p>
      <button onClick={syncProfile}>Refresh Data</button>
    </div>
  )
}
```

#### Auto-Sync on Mount
```typescript
const { profile, loading } = useStudentProfile({ 
  autoSync: true 
})
```

#### Auto-Sync with Interval
```typescript
// Sync setiap 5 menit
const { profile, lastSyncTime } = useStudentProfile({ 
  autoSync: true,
  syncInterval: 5 * 60 * 1000 // 5 minutes
})
```

### 4. Direct Function Call

```typescript
import { syncStudentDataFromGraphQL, getEnrichedStudentProfile } from '@/lib/graphql/sync-student-data'

// Sync data
const result = await syncStudentDataFromGraphQL('105841109518')
if (result.success) {
  console.log('Data synced:', result.data)
}

// Get enriched profile
const profile = await getEnrichedStudentProfile('105841109518')
```

## Data Structure

### Student Profile Response

```typescript
{
  id: string
  nim: string
  prodi_id: string | null
  semester: number
  academic_year: string
  phone: string | null
  address: string | null
  guardian: {
    ayah: {
      nama: string
      nik: string
      alamat: string
      hp: string
      email: string
      pendidikan: string
      pekerjaan: string
      instansi: string
      jabatan: string
      penghasilan: string
      status: string
    }
  }
  gpa: number | null
  last_sync_at: Date | null
  users: {
    id: string
    username: string
    name: string
    avatar: string | null
    role: string
  }
  lecturers: {
    id: string
    nip: string
    email: string | null
    users: {
      name: string
    }
  } | null
  prodi: {
    kode: string
    nama: string
    jenjang: string
    fakultas: string
    akreditasi: string | null
  } | null
}
```

## Error Handling

Sistem dirancang dengan error handling yang robust:

1. **Login tidak gagal** meskipun sync error
2. **Log error** untuk debugging
3. **Graceful degradation** - menggunakan data lokal jika GraphQL gagal
4. **Retry mechanism** bisa ditambahkan di hook

```typescript
// Contoh handling error
const { error, syncProfile } = useStudentProfile()

if (error) {
  console.error('Sync failed:', error)
  // Tampilkan notifikasi ke user
  toast.error('Gagal mengambil data terbaru')
}
```

## Environment Variables

Pastikan environment variable sudah di-set:

```env
# GraphQL API Endpoint
GRAPHQL_ENDPOINT=https://sicekcok.if.unismuh.ac.id/graphql

# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Testing

### Test Auto-Sync
1. Login sebagai mahasiswa
2. Cek console log untuk konfirmasi sync
3. Verifikasi data di database

### Test Manual Sync
```bash
# Via curl
curl -X POST http://localhost:3000/api/student/sync \
  -H "Content-Type: application/json" \
  -d '{"nim": "105841109518"}' \
  -b "next-auth.session-token=YOUR_SESSION_TOKEN"
```

## Troubleshooting

### Data tidak ter-sync
1. Cek koneksi ke GraphQL API
2. Verifikasi NIM mahasiswa valid
3. Cek log error di console

### GPA tidak update
- GPA diambil dari KHS terbaru
- Jika tidak ada data KHS, GPA tidak berubah

### Dosen PA tidak ter-link
- Pastikan NIDN dosen ada di database lokal
- Field `nip` di table `lecturers` harus match dengan `dosenPA` dari GraphQL

## Best Practices

1. **Jangan terlalu sering sync** - Gunakan `last_sync_at` untuk throttle
2. **Cache data** - Simpan di state/context untuk menghindari fetch berulang
3. **Handle offline** - Berikan fallback jika API tidak tersedia
4. **Validate data** - Cek kevalidan data sebelum sync ke database

## Future Improvements

- [ ] Add sync untuk data ibu dan wali
- [ ] Implement retry mechanism
- [ ] Add batch sync untuk multiple students
- [ ] Add webhook untuk realtime sync
- [ ] Add data versioning untuk track changes
- [ ] Implement caching layer dengan Redis

## Files Modified/Created

1. ✅ `lib/graphql/queries.ts` - Updated query & types
2. ✅ `lib/graphql/sync-student-data.ts` - Sync logic (NEW)
3. ✅ `lib/auth.ts` - Integrated auto-sync
4. ✅ `app/api/student/sync/route.ts` - API endpoint (NEW)
5. ✅ `hooks/use-student-profile.tsx` - React hook (NEW)
6. ✅ `docs/STUDENT_SYNC_GUIDE.md` - Documentation (NEW)
