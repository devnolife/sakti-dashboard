# 🔍 Analisis Masalah: Data GraphQL Tidak Tersimpan ke Database

## Checklist Debugging

### 1. ✅ Schema Database
- [x] Field baru sudah ditambahkan ke `students` model
- [ ] **Perlu dicek:** Apakah migration sudah dijalankan?
- [ ] **Perlu dicek:** Apakah Prisma Client sudah di-generate ulang?

**Action Required:**
```bash
npx prisma migrate dev --name add_student_fields
npx prisma generate
```

---

### 2. ⚠️ GraphQL Connection
- [ ] **Perlu dicek:** Apakah GraphQL endpoint bisa diakses?
- [ ] **Perlu dicek:** Apakah NIM valid dan ada data di GraphQL?
- [ ] **Perlu dicek:** Apakah response GraphQL sesuai struktur yang diharapkan?

**Test Command:**
```bash
npx tsx scripts/test-graphql-sync.ts YOUR_NIM
```

---

### 3. ⚠️ Database Records
- [ ] **Perlu dicek:** Apakah student dengan NIM tersebut sudah ada di database lokal?
- [ ] **Perlu dicek:** Apakah ada foreign key constraint yang menghambat?

**Test Command:**
```bash
npx tsx scripts/check-database.ts YOUR_NIM
```

---

### 4. ⚠️ Sync Logic
**Kemungkinan masalah:**

#### A. Student tidak ditemukan di database lokal
```typescript
const student = await prisma.students.findUnique({
  where: { nim }
})

if (!student) {
  return { success: false, error: 'Student not found in local database' }
}
```
❌ **Masalah:** Jika student belum ada di DB, sync akan gagal!

**Solusi:** Ubah dari `update` ke `upsert` (create or update)

---

#### B. Prisma Client belum ter-regenerate
❌ **Masalah:** Field baru belum ada di Prisma Client types

**Solusi:** 
```bash
npx prisma generate
```

---

#### C. Date parsing error
```typescript
const parseTanggalLahir = mahasiswaData.tanggalLahir 
  ? new Date(mahasiswaData.tanggalLahir) 
  : null
```
❌ **Masalah:** Format tanggal dari GraphQL mungkin tidak valid

---

#### D. GraphQL Error tidak tertangkap
```typescript
if (error || !data?.mahasiswa) {
  console.error('Failed to fetch student data from GraphQL:', error)
  return { success: false, error: error || 'No data returned from GraphQL' }
}
```
❌ **Masalah:** Error di-return tapi tidak di-log dengan detail

---

## 🔧 Kemungkinan Root Cause

### **PALING MUNGKIN:** Student record belum ada di database

Kode saat ini menggunakan `prisma.students.update()` yang **HANYA BERFUNGSI** jika record sudah ada.

```typescript
// CURRENT CODE (❌ Problem)
const student = await prisma.students.findUnique({ where: { nim } })
if (!student) {
  return { success: false, error: 'Student not found in local database' }
}
```

Jika mahasiswa login pertama kali tapi **belum ada record** di table `students`, maka sync akan **GAGAL**.

---

## ✅ Solusi yang Disarankan

### Option 1: Gunakan `upsert` (RECOMMENDED)
```typescript
// Update OR Create jika belum ada
const updatedStudent = await prisma.students.upsert({
  where: { nim },
  update: { /* data update */ },
  create: { /* data create */ }
})
```

### Option 2: Check dan create manual
```typescript
let student = await prisma.students.findUnique({ where: { nim } })

if (!student) {
  // Create new student record
  student = await prisma.students.create({
    data: { /* initial data from GraphQL */ }
  })
} else {
  // Update existing student
  student = await prisma.students.update({
    where: { nim },
    data: { /* data from GraphQL */ }
  })
}
```

---

## 🧪 Testing Steps

1. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

2. **Run migration (if needed)**
   ```bash
   npx prisma migrate dev --name add_student_graphql_fields
   ```

3. **Check database**
   ```bash
   npx tsx scripts/check-database.ts
   ```

4. **Test GraphQL sync**
   ```bash
   npx tsx scripts/test-graphql-sync.ts YOUR_NIM
   ```

5. **Try login dan check console log**
   - Login sebagai mahasiswa
   - Buka browser console dan server terminal
   - Check log: "Student data synced for NIM: xxx"

---

## 📝 Next Actions

1. [ ] Generate Prisma Client
2. [ ] Run migration
3. [ ] Test dengan script check-database.ts
4. [ ] Test dengan script test-graphql-sync.ts
5. [ ] Update sync function untuk support `upsert`
6. [ ] Test login mahasiswa
7. [ ] Verify data di database

---

**Priority:** HIGH - Data tidak tersimpan adalah masalah critical yang harus segera diselesaikan.
