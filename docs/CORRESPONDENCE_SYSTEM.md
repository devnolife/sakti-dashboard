# 📋 Sistem Persuratan UNISMUH - Dokumentasi Lengkap

> **Last Updated:** 11 November 2025  
> **Version:** 1.0  
> **Author:** System Documentation

---

## 📌 Daftar Isi

1. [Format Nomor Surat](#format-nomor-surat)
2. [Aturan Counter](#aturan-counter)
3. [Hubungan Letter Types dengan Jenis Surat](#hubungan-letter-types-dengan-jenis-surat)
4. [Contoh-Contoh Kasus](#contoh-contoh-kasus)
5. [Database Schema](#database-schema)
6. [Alur Penerbitan Surat](#alur-penerbitan-surat)

---

## 📝 Format Nomor Surat

### **A. Surat Fakultas (Scope: Fakultas/Umum)**

Format nomor surat untuk surat yang diterbitkan di tingkat fakultas:

```
XXX/KODE/05/BULAN/HIJRI/MASEHI
```

**Contoh:**
```
003/A/05/XI/1447/2025
```

**Penjelasan Komponen:**
- `XXX` = Counter 3 digit (001, 002, 003, ...)
- `KODE` = Kode Jenis Surat (A, B, C, D)
- `05` = Kode UNISMUH (WAJIB untuk semua surat fakultas)
- `BULAN` = Bulan dalam Romawi (I, II, III, ..., XII)
- `HIJRI` = Tahun Hijriah (contoh: 1447)
- `MASEHI` = Tahun Masehi (contoh: 2025)

---

### **B. Surat Prodi (Scope: Prodi)**

Format nomor surat untuk surat yang diterbitkan di tingkat program studi:

```
XXX/KODE_PRODI/KODE/BULAN/HIJRI/MASEHI
```

**Contoh:**
```
003/IF/A/XI/1447/2025
```

**Penjelasan Komponen:**
- `XXX` = Counter 3 digit (001, 002, 003, ...)
- `KODE_PRODI` = Kode Program Studi (IF, SI, TI, dll)
- `KODE` = Kode Jenis Surat (A, B, C, D)
- `BULAN` = Bulan dalam Romawi (I, II, III, ..., XII)
- `HIJRI` = Tahun Hijriah (contoh: 1447)
- `MASEHI` = Tahun Masehi (contoh: 2025)

---

## 🔢 Aturan Counter

### **1. Counter Surat Fakultas (Scope: Fakultas)**

#### Karakteristik:
- ✅ **SHARED** untuk semua jenis surat fakultas
- ✅ **SEQUENTIAL** tanpa memandang jenis surat (A/B/C/D)
- ✅ **Reset otomatis** setiap tahun baru
- ✅ **Tidak tergantung** pada prodi

#### Contoh Penomoran:
```
Januari 2025 - Fakultas:
1. Surat KKP (Jenis C)     → 001/C/05/I/1446/2025
2. Surat Ujian (Jenis A)   → 002/A/05/I/1446/2025  ← Counter lanjut!
3. Surat Cuti (Jenis B)    → 003/B/05/I/1446/2025  ← Counter lanjut!
4. Surat KKP (Jenis C)     → 004/C/05/I/1446/2025  ← Counter lanjut!
```

**Counter berjalan secara berurutan (001, 002, 003, ...) tanpa memperhatikan jenis surat apa yang diterbitkan.**

---

### **2. Counter Surat Prodi (Scope: Prodi)**

#### Karakteristik:
- ✅ **TERPISAH** per program studi
- ✅ **SEQUENTIAL** per prodi
- ✅ **Reset otomatis** setiap tahun baru
- ✅ **Independen** antar prodi

#### Contoh Penomoran:
```
Januari 2025 - Prodi Informatika (IF):
1. Surat KKP (Jenis C)     → 001/IF/C/I/1446/2025
2. Surat Ujian (Jenis A)   → 002/IF/A/I/1446/2025
3. Surat Cuti (Jenis B)    → 003/IF/B/I/1446/2025

Januari 2025 - Prodi Sistem Informasi (SI):
1. Surat KKP (Jenis C)     → 001/SI/C/I/1446/2025  ← Counter dimulai dari 001 lagi!
2. Surat Ujian (Jenis A)   → 002/SI/A/I/1446/2025
3. Surat Cuti (Jenis B)    → 003/SI/B/I/1446/2025
```

**Setiap prodi memiliki counter sendiri yang berjalan independen.**

---

### **3. Reset Counter Tahun Baru**

Counter akan direset menjadi 001 saat:
- ✅ Tahun Masehi berganti (contoh: 2025 → 2026)
- ✅ Berlaku untuk counter fakultas dan prodi

**Contoh:**
```
Desember 2025:
- Surat terakhir → 125/A/05/XII/1447/2025

Januari 2026:
- Surat pertama → 001/A/05/I/1448/2026  ← Reset ke 001!
```

---

## 🔗 Hubungan Letter Types dengan Jenis Surat

### **Konsep Relasi**

```
letter_types (Ketentuan Surat)
    ↓ memiliki field
jenis_surat_id (Link ke A/B/C/D)
    ↓ memiliki field
scope (fakultas/prodi)
    ↓ menghasilkan
Format Nomor Surat yang sesuai
```

### **Field Baru di Table `letter_types`**

| Field | Type | Description | Contoh |
|-------|------|-------------|---------|
| `jenis_surat_id` | Int | Link ke table jenis_surat (A/B/C/D) | `3` (untuk jenis C) |
| `scope` | Enum | Scope surat: 'fakultas' atau 'prodi' | `'prodi'` |

### **Mapping Ketentuan Surat**

| Ketentuan Surat | Jenis Surat | Scope | Format |
|-----------------|-------------|-------|---------|
| Kuliah Kerja Profesi (KKP) | C | prodi | `XXX/IF/C/BULAN/HIJRI/MASEHI` |
| Ujian Proposal | A | prodi | `XXX/IF/A/BULAN/HIJRI/MASEHI` |
| Ujian Skripsi | A | prodi | `XXX/IF/A/BULAN/HIJRI/MASEHI` |
| Surat Cuti | B | fakultas | `XXX/B/05/BULAN/HIJRI/MASEHI` |
| Surat Aktif Kuliah | A | fakultas | `XXX/A/05/BULAN/HIJRI/MASEHI` |
| Surat Keterangan | D | fakultas | `XXX/D/05/BULAN/HIJRI/MASEHI` |

---

## 💡 Contoh-Contoh Kasus

### **Kasus 1: Penerbitan Surat Mixed (Fakultas + Prodi)**

**Scenario:**
- Prodi IF menerbitkan 2 surat KKP
- Fakultas menerbitkan 1 surat cuti
- Prodi SI menerbitkan 1 surat ujian

**Hasil Penomoran:**

```
Tanggal: 10 November 2025

1. Prodi IF - KKP #1:
   → 001/IF/C/XI/1447/2025
   (Counter prodi IF: 1)

2. Fakultas - Cuti #1:
   → 001/B/05/XI/1447/2025
   (Counter fakultas: 1)

3. Prodi IF - KKP #2:
   → 002/IF/C/XI/1447/2025
   (Counter prodi IF: 2)

4. Prodi SI - Ujian #1:
   → 001/SI/A/XI/1447/2025
   (Counter prodi SI: 1)
```

**Catatan:**
- Counter Prodi IF: 1 → 2
- Counter Fakultas: 1
- Counter Prodi SI: 1
- Semua counter independen!

---

### **Kasus 2: Tampilan Dashboard Admin Prodi**

**Scenario:** Admin Prodi IF login ke dashboard

**Yang Ditampilkan:**

```
📊 Nomor Terakhir Per Ketentuan Surat

┌─────────────────────────────────────────────────┐
│ Kuliah Kerja Profesi (KKP)                      │
│ Nomor: 005/IF/C/XI/1447/2025                    │
│ Jenis: C - PERGURUAN TINGGI & INSTANSI SEPIHAK │
│ Tanggal: 10 November 2025 pukul 14:30          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Ujian Proposal                                   │
│ Nomor: 003/IF/A/XI/1447/2025                    │
│ Jenis: A - UNSUR PIMPINAN                       │
│ Tanggal: 09 November 2025 pukul 10:15          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Surat Aktif Kuliah                               │
│ Nomor: 001/IF/B/XI/1447/2025                    │
│ Jenis: B - Berhubungan dengan Muhammadiyah      │
│ Tanggal: 08 November 2025 pukul 09:00          │
└─────────────────────────────────────────────────┘
```

**Catatan:**
- Hanya menampilkan surat dari **Prodi IF**
- Dikelompokkan per **ketentuan surat** (letter_types)
- Menampilkan **jenis surat** (A/B/C/D)
- Menampilkan **nomor terakhir** yang diterbitkan

---

### **Kasus 3: Tampilan Dashboard Admin Fakultas**

**Scenario:** Admin Fakultas/Staff TU login ke dashboard

**Yang Ditampilkan:**

```
📊 Nomor Terakhir Per Ketentuan Surat

┌─────────────────────────────────────────────────┐
│ Surat Cuti Kuliah                                │
│ Nomor: 012/B/05/XI/1447/2025                    │
│ Jenis: B - Berhubungan dengan Muhammadiyah      │
│ Tanggal: 10 November 2025 pukul 15:20          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Surat Aktif Kuliah                               │
│ Nomor: 008/A/05/XI/1447/2025                    │
│ Jenis: A - UNSUR PIMPINAN                       │
│ Tanggal: 09 November 2025 pukul 11:45          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Surat Keterangan                                 │
│ Nomor: 005/D/05/XI/1447/2025                    │
│ Jenis: D - SURAT KELUAR                         │
│ Tanggal: 07 November 2025 pukul 14:00          │
└─────────────────────────────────────────────────┘
```

**Catatan:**
- Hanya menampilkan surat **scope fakultas**
- Format nomor dengan `/05/` (kode UNISMUH)
- Counter fakultas **shared** untuk semua jenis

---

## 🗄️ Database Schema

### **Table: `letter_types`**

```sql
CREATE TABLE letter_types (
  id                      String PRIMARY KEY,
  title                   String UNIQUE,
  description             String,
  approval_role           ApprovalRole,
  estimated_days          Int,
  required_documents      String[],
  additional_fields       Json?,
  prodi_id                String?,
  is_global               Boolean DEFAULT false,
  is_active               Boolean DEFAULT true,
  template                String?,
  
  -- NEW FIELDS
  jenis_surat_id          Int,          -- Link ke jenis_surat (A/B/C/D)
  scope                   LetterScope,  -- 'fakultas' atau 'prodi'
  
  created_at              DateTime DEFAULT now(),
  updated_at              DateTime updatedAt
)
```

**Enum: `LetterScope`**
```sql
enum LetterScope {
  fakultas
  prodi
}
```

---

### **Table: `surat`**

```sql
CREATE TABLE surat (
  id                   Int PRIMARY KEY AUTOINCREMENT,
  nomor_surat          String UNIQUE,
  id_jenis_surat       Int?,
  id_instansi          Int?,
  id_kode_kategori     Int?,
  id_masalah_surat     Int?,
  bulan                String,
  tahun_hijriah        String,
  tahun_masehi         String,
  perihal              String,
  keterangan           String?,
  id_prodi             String?,
  letter_request_id    String?,
  signed_document_id   String?,
  
  -- NEW FIELD
  kode_prodi           String?,  -- Kode prodi untuk format surat prodi
  
  created_at           DateTime DEFAULT now(),
  updated_at           DateTime updatedAt
)
```

---

### **Table: `count_surat`**

```sql
CREATE TABLE count_surat (
  id          Int PRIMARY KEY AUTOINCREMENT,
  jenis       String,
  counter     Int DEFAULT 0,
  tahun       String?,
  prodi_id    String?,
  
  -- NEW FIELD
  scope       LetterScope,  -- 'fakultas' atau 'prodi'
  
  UNIQUE(jenis, tahun, prodi_id, scope)
)
```

**Catatan Unique Constraint:**
- Counter fakultas: `UNIQUE(jenis='FAKULTAS', tahun, scope='fakultas')`
- Counter prodi: `UNIQUE(jenis='PRODI_XXX', tahun, prodi_id, scope='prodi')`

---

### **Table: `jenis_surat`** (Existing)

```sql
CREATE TABLE jenis_surat (
  id      Int PRIMARY KEY,
  nama    String,
  kode    String UNIQUE  -- A, B, C, D
)
```

**Data:**
| id | kode | nama |
|----|------|------|
| 1 | A | UNSUR PIMPINAN |
| 2 | B | Berhubungan dengan Muhammadiyah |
| 3 | C | PERGURUAN TINGGI & INSTANSI SEPIHAK |
| 4 | D | SURAT KELUAR |

---

## 🔄 Alur Penerbitan Surat

### **Flow Diagram:**

```
┌─────────────────────────────────────────────────────────┐
│ 1. Mahasiswa Ajukan Permohonan Surat                    │
│    - Pilih jenis surat (KKP, Ujian, Cuti, dll)          │
│    - Isi form data                                       │
│    - Upload dokumen pendukung                            │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Sistem Simpan ke Table `correspondence_requests`     │
│    - Status: pending                                     │
│    - Link ke letter_types                                │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Admin/Staff TU Review Permohonan                      │
│    - Cek kelengkapan dokumen                             │
│    - Approve atau Reject                                 │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Jika Approved: Sistem Generate Nomor Surat           │
│    a. Ambil letter_type data:                            │
│       - jenis_surat_id (A/B/C/D)                         │
│       - scope (fakultas/prodi)                           │
│                                                           │
│    b. Cek counter berdasarkan scope:                     │
│       - Fakultas: ambil counter shared                   │
│       - Prodi: ambil counter per prodi                   │
│                                                           │
│    c. Generate nomor surat:                              │
│       - Fakultas: XXX/KODE/05/BULAN/HIJRI/MASEHI        │
│       - Prodi: XXX/KODE_PRODI/KODE/BULAN/HIJRI/MASEHI   │
│                                                           │
│    d. Increment counter                                  │
│                                                           │
│    e. Simpan ke table `surat`                            │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Generate PDF Surat                                    │
│    - Gunakan template dari letter_types                  │
│    - Isi data mahasiswa dan nomor surat                  │
│    - Simpan signed_document_id                           │
└────────────────────────┬────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 6. Notifikasi ke Mahasiswa                               │
│    - Status: approved                                     │
│    - Surat siap diunduh                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Query Patterns

### **1. Get Counter Fakultas**

```typescript
const counterFakultas = await prisma.count_surat.findUnique({
  where: {
    jenis_tahun_prodi_id_scope: {
      jenis: 'FAKULTAS',
      tahun: '2025',
      prodi_id: null,
      scope: 'fakultas'
    }
  }
})
```

---

### **2. Get Counter Prodi**

```typescript
const counterProdi = await prisma.count_surat.findUnique({
  where: {
    jenis_tahun_prodi_id_scope: {
      jenis: 'PRODI_IF',
      tahun: '2025',
      prodi_id: '55202',
      scope: 'prodi'
    }
  }
})
```

---

### **3. Get Nomor Terakhir Per Letter Type (Dashboard Admin Prodi)**

```typescript
const latestSuratPerLetterType = await prisma.surat.findMany({
  where: {
    id_prodi: '55202',  // Prodi IF
    letter_request_id: { not: null }
  },
  include: {
    correspondence_requests: {
      include: {
        letter_types: {
          include: {
            jenis_surat: true
          }
        }
      }
    }
  },
  orderBy: {
    created_at: 'desc'
  }
})

// Group by letter_type_id and get latest
const groupedByLetterType = latestSuratPerLetterType.reduce((acc, surat) => {
  const letterTypeId = surat.correspondence_requests?.letter_types?.id
  if (!letterTypeId) return acc
  
  if (!acc[letterTypeId] || surat.created_at > acc[letterTypeId].created_at) {
    acc[letterTypeId] = surat
  }
  return acc
}, {})
```

---

## ✅ Checklist Implementasi

### **Phase 1: Database & Schema**
- [ ] Update `schema.prisma` dengan field baru
- [ ] Buat enum `LetterScope`
- [ ] Update constraint unique di `count_surat`
- [ ] Jalankan `prisma migrate dev`

### **Phase 2: Seed Data**
- [ ] Update seed `letter_types` dengan `jenis_surat_id` dan `scope`
- [ ] Seed counter fakultas
- [ ] Seed counter prodi untuk testing
- [ ] Generate sample surat dengan format baru

### **Phase 3: Utility Functions**
- [ ] Buat `generateNomorSurat()` function
- [ ] Buat `getOrCreateCounter()` function
- [ ] Buat `incrementCounter()` function
- [ ] Buat `resetCounterIfNewYear()` function

### **Phase 4: API Updates**
- [ ] Update API surat creation
- [ ] Update API statistics untuk dashboard
- [ ] Update API counter management

### **Phase 5: UI Components**
- [ ] Update `NumberingSystemCard`
- [ ] Update `NextNumbersCard`
- [ ] Update surat creation form

### **Phase 6: Testing**
- [ ] Test counter fakultas (shared)
- [ ] Test counter prodi (terpisah)
- [ ] Test format nomor surat fakultas
- [ ] Test format nomor surat prodi
- [ ] Test reset counter tahun baru
- [ ] Test dashboard admin prodi
- [ ] Test dashboard admin fakultas

---

## 🔒 Business Rules

1. **Nomor surat TIDAK BISA diubah** setelah diterbitkan
2. **Counter TIDAK BISA dikurangi** (hanya increment)
3. **Format nomor surat HARUS sesuai** dengan scope (fakultas/prodi)
4. **Kode UNISMUH (05) WAJIB** untuk surat fakultas
5. **Counter reset otomatis** setiap tahun baru (tidak manual)
6. **Setiap letter_type HARUS memiliki** `jenis_surat_id` dan `scope`
7. **Counter fakultas HARUS shared** untuk semua jenis surat fakultas
8. **Counter prodi HARUS terpisah** per prodi

---

## 📞 Support & Contact

Untuk pertanyaan atau klarifikasi lebih lanjut mengenai sistem persuratan, hubungi:

- **Developer Team:** Development Team
- **System Owner:** Staff TU / Bagian Persuratan
- **Technical Lead:** Backend Lead

---

**END OF DOCUMENTATION**
