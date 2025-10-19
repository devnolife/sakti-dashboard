# GraphQL API Schema Documentation

**Endpoint:** `https://sicekcok.if.unismuh.ac.id/graphql`

## 📋 Available Queries

### 1. **sayHello**
Simple hello query for testing
```graphql
query {
  sayHello
}
```

---

### 2. **cekcoknik**
Verifikasi data NIK dengan Dukcapil
```graphql
query {
  cekcoknik(
    nik: String!
    namaLengkap: String
    nkk: String
    jenisKelamin: String
    tempatLahir: String
    tanggalLahir: String
    statusKawin: String
    jenisPekerjaan: String
    namaLengkapIbuKandung: String
    alamat: String
    propId: String
    kabId: String
    kecId: String
    kelId: String
    propName: String
    kabName: String
    kecName: String
    kelName: String
    rt: String
    rw: String
    treshold: String
  )
}
```

---

### 3. **mahasiswa**
Get mahasiswa data by NIM
```graphql
query {
  mahasiswa(nim: String!) {
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
    ayah {
      # InfoAyahMahasiswa fields
    }
    ibu {
      # InfoIbuMahasiswa fields
    }
    wali {
      # InfoWaliMahasiswa fields
    }
    khs {
      # Array of KHS data
    }
    dosenPenasehat {
      nidn
      nama
      gelar_depan
      gelar_belakang
      email
    }
    prodi {
      # Prodi fields
    }
  }
}
```

**Available Fields:**
- `nim`: String! - Nomor Induk Mahasiswa
- `kodeProdi`: String - Kode Program Studi
- `angkatan`: Int - Tahun angkatan
- `nama`: String - Nama lengkap
- `jenisKelamin`: String - L/P
- `tempatLahir`: String
- `tanggalLahir`: Date
- `nik`: String - NIK KTP
- `hp`: String - Nomor HP
- `email`: String
- `dosenPA`: String - Kode dosen PA
- `semesterAwal`: String
- `tahunAkademikLulus`: String
- `tanggalLulus`: Date
- `lulus`: Boolean
- `noSeriIjazah`: String
- `masaStudi`: String
- `ayah`: InfoAyahMahasiswa
- `ibu`: InfoIbuMahasiswa
- `wali`: InfoWaliMahasiswa
- `khs`: [KHS]
- `dosenPenasehat`: Dosen
- `prodi`: Prodi

---

### 4. **mahasiswaInfo**
Get comprehensive mahasiswa info including academic progress
```graphql
query {
  mahasiswaInfo(nim: String!) {
    nim
    kodeProdi
    namaProdi
    kodePenasehat
    nidnPa
    namaPa
    angkatan
    nama
    sksBerjalan
    totalSksSelesai
    totalSksLulus
    totalNilaiXKredit
    ipk
    aktifTerakhirTa
    statusTerakhirTa
    aktif
    cuti
    nonAktif
    jumlahSemester
    kkp
    aik
    proposal
  }
}
```

**Available Fields:**
- `nim`: String! - NIM mahasiswa
- `kodeProdi`: String - Kode prodi
- `namaProdi`: String! - Nama program studi
- `kodePenasehat`: String
- `nidnPa`: String - NIDN dosen PA
- `namaPa`: String! - Nama dosen PA
- `angkatan`: Int! - Tahun angkatan
- `nama`: String! - Nama mahasiswa
- `sksBerjalan`: Float - SKS yang sedang diambil
- `totalSksSelesai`: Float - Total SKS selesai
- `totalSksLulus`: Float - Total SKS lulus
- `totalNilaiXKredit`: Float - Total nilai x kredit
- `ipk`: Float - IPK kumulatif
- `aktifTerakhirTa`: String - TA terakhir aktif
- `statusTerakhirTa`: String - Status terakhir
- `aktif`: Int - Jumlah semester aktif
- `cuti`: Int - Jumlah semester cuti
- `nonAktif`: Int - Jumlah semester non-aktif
- `jumlahSemester`: Int - Total semester
- `kkp`: Int - Status KKP (0/1)
- `aik`: Int - Status AIK (0/1)
- `proposal`: Int - Status proposal (0/1)

---

### 5. **mahasiswaNilaiRapor**
Get nilai rapor mahasiswa
```graphql
query {
  mahasiswaNilaiRapor(nim: String!)
}
```
Returns: Array of rapor data

---

### 6. **mahasiswaUser**
Get mahasiswa user account info
```graphql
query {
  mahasiswaUser(nim: String!) {
    # MahasiswaUser fields
  }
}
```

---

### 7. **dosen**
Get dosen data by NIDN
```graphql
query {
  dosen(nidn: String!) {
    nidn
    nama
    gelar_depan
    gelar_belakang
    tempat_lahir
    tanggal_lahir
    email
    prodiId
    mahasiswa {
      # List of mahasiswa under this dosen
    }
  }
}
```

**Available Fields:**
- `nidn`: String! - NIDN dosen
- `nama`: String - Nama dosen
- `gelar_depan`: String - Gelar depan
- `gelar_belakang`: String - Gelar belakang
- `tempat_lahir`: String
- `tanggal_lahir`: Date
- `email`: String
- `prodiId`: String - ID program studi
- `mahasiswa`: [Mahasiswa] - Daftar mahasiswa bimbingan

---

### 8. **profileDosen**
Get current logged-in dosen profile (requires auth)
```graphql
query {
  profileDosen {
    nidn
    nama
    gelar_depan
    gelar_belakang
    email
    # ... other dosen fields
  }
}
```

---

### 9. **paDosen**
Get list of mahasiswa PA for current dosen (requires auth)
```graphql
query {
  paDosen
}
```
Returns: Array of mahasiswa data

---

### 10. **infoMahasiswaPa**
Get mahasiswa PA info by NIM (requires auth as dosen)
```graphql
query {
  infoMahasiswaPa(nim: String!) {
    # MahasiswaInfo fields
  }
}
```

---

### 11. **profile**
Get current user profile (requires auth)
```graphql
query {
  profile {
    # UserProfile fields
  }
}
```

---

### 12. **getAllProdi**
Get all program studi
```graphql
query {
  getAllProdi {
    # Array of Prodi
  }
}
```

---

### 13. **getProdi**
Get specific prodi by ID
```graphql
query {
  getProdi(id: String!) {
    # Prodi fields
  }
}
```

---

### 14. **pesertaYudisium**
Get list of yudisium participants by prodi and batch
```graphql
query {
  pesertaYudisium(
    kodeProdi: String!
    yudisiumKe: Int!
  )
}
```
**Description:** Mendapatkan daftar peserta yudisium berdasarkan kode prodi dan yudisium ke-

---

## 🎯 Recommended Queries for Integration

### For Mahasiswa Dashboard:
1. ✅ **mahasiswaInfo** - Complete academic info (IPK, SKS, status)
2. ✅ **mahasiswa** - Personal data and relationships
3. ✅ **mahasiswaNilaiRapor** - Grade history

### For Dosen Dashboard:
1. ✅ **profileDosen** - Dosen profile
2. ✅ **paDosen** - List of PA students
3. ✅ **infoMahasiswaPa** - Detailed PA student info

### For Admin/Prodi:
1. ✅ **getAllProdi** - All study programs
2. ✅ **getProdi** - Specific prodi details
3. ✅ **pesertaYudisium** - Graduation participants

### For Authentication/Verification:
1. ✅ **profile** - Current user profile
2. ✅ **cekcoknik** - NIK verification with Dukcapil

---

## 🔐 Authentication

Some queries require authentication token in headers:
```
Authorization: Bearer <token>
```

Queries requiring auth:
- `profileDosen`
- `paDosen`
- `infoMahasiswaPa`
- `profile`

---

## 📝 Notes

1. **Date Format**: Date fields use custom scalar type `Date`
2. **Required Fields**: Fields marked with `!` are required
3. **Nested Queries**: Can query nested objects (dosen, prodi, etc.)
4. **Arrays**: Some fields return arrays/lists of data

---

## 🚀 Next Steps

To integrate this GraphQL API:

1. Install GraphQL client (e.g., `graphql-request`, `apollo-client`)
2. Create GraphQL client utility
3. Define TypeScript types based on schema
4. Create API action functions
5. Update existing endpoints to use GraphQL data

Example integration:
```typescript
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://sicekcok.if.unismuh.ac.id/graphql')

async function getMahasiswaInfo(nim: string) {
  const query = `
    query {
      mahasiswaInfo(nim: "${nim}") {
        nim
        nama
        ipk
        totalSksLulus
        # ... other fields
      }
    }
  `
  return await client.request(query)
}
```
