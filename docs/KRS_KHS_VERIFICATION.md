# Verifikasi Data KRS dan KHS

## ✅ Yang Sudah Dikonfigurasi:

### 1. GraphQL Queries (`lib/graphql/queries-superapps.ts`)
- ✅ `GET_KRS_MAHASISWA` - Parameter `nim` dan `periode_krs` nullable
- ✅ `GET_KHS_MAHASISWA` - Parameter `nim` dan `periode_krs` nullable

### 2. Server Actions (`app/actions/student-actions.ts`)
- ✅ `getStudentKRS(nim?, periode_krs?)` - Fetch data KRS
- ✅ `getStudentKHS(nim?, periode_krs?)` - Fetch data KHS

## 🔍 Cara Verifikasi Data Sudah Benar:

### Method 1: Via Test Script
```bash
# 1. Login ke dashboard dan copy token dari localStorage
# 2. Edit scripts/test-krs-khs.ts, set TOKEN variable
# 3. Run:
npx tsx scripts/test-krs-khs.ts
```

### Method 2: Via Browser Console
```javascript
// 1. Login ke dashboard
// 2. Buka DevTools (F12) > Console
// 3. Test KRS:
const { getStudentKRS } = await import('/app/actions/student-actions')
const krsResult = await getStudentKRS(null, null)
console.log('KRS Data:', krsResult)

// 4. Test KHS:
const { getStudentKHS } = await import('/app/actions/student-actions')
const khsResult = await getStudentKHS(null, null)
console.log('KHS Data:', khsResult)
```

### Method 3: Via GraphQL Playground
```
URL: https://superapps.if.unismuh.ac.id/graphql

Query KRS:
query {
  getKrsMahasiswa(nim: null, periode_krs: null) {
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

Query KHS:
query {
  getKhsMahasiswa(nim: null, periode_krs: null) {
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

## 📊 Expected Response Structure:

### KRS Response:
```json
{
  "data": {
    "getKrsMahasiswa": {
      "header": {
        "total_sks": 20,
        "total_matakuliah": 6
      },
      "krs": [
        {
          "kode_matakuliah": "TIF123",
          "nama_matakuliah": "Pemrograman Web",
          "semester": 3,
          "sks": 3
        },
        // ... more courses
      ]
    }
  }
}
```

### KHS Response:
```json
{
  "data": {
    "getKhsMahasiswa": {
      "header": {
        "total_sks": 20,
        "total_bobot": 68.5,
        "total_matakuliah": 6,
        "ips": 3.42
      },
      "khs": [
        {
          "kode_matakuliah": "TIF123",
          "nama_matakuliah": "Pemrograman Web",
          "semester": 3,
          "sks": 3,
          "grade": "A",
          "nilai": 85,
          "bobot": 12.0
        },
        // ... more courses
      ]
    }
  }
}
```

## ❓ Cara Cek Apakah Data Sudah Benar:

### ✅ Data KRS Benar Jika:
1. `header.total_sks` = jumlah total SKS mata kuliah yang diambil
2. `header.total_matakuliah` = jumlah array `krs.length`
3. Array `krs` berisi list mata kuliah dengan:
   - ✅ Kode mata kuliah ada
   - ✅ Nama mata kuliah ada
   - ✅ Semester terisi
   - ✅ SKS terisi dan sesuai

### ✅ Data KHS Benar Jika:
1. `header.total_sks` = total SKS semester ini
2. `header.total_matakuliah` = jumlah array `khs.length`
3. `header.total_bobot` = sum dari semua `khs[].bobot`
4. `header.ips` = total_bobot / total_sks (IPK semester)
5. Array `khs` berisi list nilai dengan:
   - ✅ Kode mata kuliah ada
   - ✅ Nama mata kuliah ada
   - ✅ Semester terisi
   - ✅ SKS terisi
   - ✅ Grade terisi (A, B, C, D, E)
   - ✅ Nilai angka terisi (0-100)
   - ✅ Bobot terisi (nilai kredit x SKS)

### 🔴 Data Salah Jika:
1. ❌ Response error atau null
2. ❌ Header tidak ada atau values null/undefined
3. ❌ Array kosong padahal mahasiswa sudah ada KRS/KHS
4. ❌ IPS calculation salah (ips ≠ total_bobot / total_sks)
5. ❌ Total mata kuliah tidak match dengan length array

## 🐛 Troubleshooting:

### Error: "Not authenticated"
- **Cause**: Token tidak ada atau expired
- **Fix**: Login ulang atau check token di cookies

### Error: "Failed to fetch KRS/KHS"
- **Cause**: GraphQL endpoint error atau user belum punya data
- **Fix**: Check di GraphQL Playground apakah query berhasil

### Data Kosong (empty array)
- **Cause**: Mahasiswa belum input KRS/KHS atau periode salah
- **Fix**: Check di database atau gunakan periode yang benar

### IPS/Bobot Tidak Sesuai
- **Cause**: Calculation error di backend
- **Fix**: Report ke backend team untuk fix calculation logic

## 📝 Next Steps:

Setelah verify data sudah benar:
1. ✅ Implementasi UI di `/dashboard/mahasiswa/academic`
2. ✅ Add tab KRS dan KHS
3. ✅ Display data dalam table/cards
4. ✅ Add export/print functionality
5. ✅ Add filter untuk periode semester
