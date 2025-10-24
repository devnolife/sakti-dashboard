# 📊 Analisis Fitur yang Perlu Di-Scope Per Prodi

## 🎯 Tujuan
Identifikasi semua fitur/tabel yang perlu di-scope per prodi agar dalam 1x schema update, semua kebutuhan terakomodasi untuk menghindari multiple migrations di masa depan.

---

## 📋 Hasil Analisis

### ✅ **1. LABORATORIES (Lab)** 
**Status:** Sudah di-update ✅

```prisma
model laboratories {
  prodi_id String?
  prodi    prodi? @relation(...)
}
```

**Alasan:** 
- Setiap prodi punya lab sendiri (Lab Informatika, Lab Sipil, dll)
- Admin lab berbeda per prodi

---

### 🔴 **2. COURSES (Mata Kuliah)**
**Status:** PERLU UPDATE ❗

**Saat ini:**
```prisma
model courses {
  department String  // String biasa, tidak relasi
}
```

**Harus jadi:**
```prisma
model courses {
  department String?  // Backward compatibility
  prodi_id   String?
  prodi      prodi? @relation(...)
}
```

**Alasan:**
- Mata kuliah SANGAT spesifik per prodi
- Kode MK, kurikulum, SKS berbeda per prodi
- Perlu filter courses by prodi untuk jadwal, KRS, dll
- **IMPACT TINGGI** - banyak fitur tergantung courses

---

### 🔴 **3. BUDGETS (Anggaran)**
**Status:** PERLU UPDATE ❗

**Saat ini:**
```prisma
model budgets {
  department String?  // String biasa
}

model budget_allocations {
  department String   // String biasa
}
```

**Harus jadi:**
```prisma
model budgets {
  department String?
  prodi_id   String?
  prodi      prodi? @relation(...)
}

model budget_allocations {
  department String?
  prodi_id   String?
  prodi      prodi? @relation(...)
}
```

**Alasan:**
- Anggaran fakultas dialokasikan per prodi
- Budget lab, kegiatan, dll per prodi
- Prodi perlu tracking budget mereka sendiri

---

### 🔴 **4. LECTURERS (Dosen)**
**Status:** PERLU UPDATE ❗

**Saat ini:**
```prisma
model lecturers {
  department String  // String biasa
}
```

**Harus jadi:**
```prisma
model lecturers {
  department String?
  prodi_id   String?
  is_homebase Boolean @default(true)  // Homebase vs non-homebase
  prodi       prodi? @relation(...)
}
```

**Alasan:**
- Dosen ada yang homebase di 1 prodi tapi ngajar di prodi lain
- Perlu tahu dosen mana saja yang di prodi X
- Untuk assignment Kaprodi, admin prodi, dll
- **IMPACT SEDANG-TINGGI**

---

### 🔴 **5. STAFF (Staff TU/Admin)**
**Status:** PERLU UPDATE ❗

**Saat ini:**
```prisma
model staff {
  department String  // String biasa
}
```

**Harus jadi:**
```prisma
model staff {
  department String?
  prodi_id   String?
  prodi      prodi? @relation(...)
}
```

**Alasan:**
- Ada staff TU yang khusus handle 1 prodi
- Perlu permission scoping per prodi
- **IMPACT SEDANG**

---

### 🟡 **6. STUDENTS (Mahasiswa)**
**Status:** SEBAGIAN OK, BISA DIPERBAIKI

**Saat ini:**
```prisma
model students {
  major      String  // Nama prodi (string)
  department String  // Fakultas (string)
}
```

**Bisa ditingkatkan:**
```prisma
model students {
  major      String?  // Backward compatibility
  department String?  // Backward compatibility
  prodi_id   String
  prodi      prodi @relation(...)
}
```

**Alasan:**
- Mahasiswa pasti belong to 1 prodi
- Data prodi (akreditasi, jenjang) bisa diambil langsung
- Konsistensi data lebih baik
- **IMPACT RENDAH-SEDANG** (sudah ada major/dept tapi bisa lebih baik)

---

### 🔴 **7. EXAM REQUIREMENTS (Persyaratan Ujian)**
**Status:** PERLU UPDATE ❗

**Saat ini:**
```prisma
model exam_requirements {
  exam_type   ExamType
  title       String
  // TIDAK ADA prodi/department
}
```

**Harus jadi:**
```prisma
model exam_requirements {
  exam_type   ExamType
  title       String
  prodi_id    String?  // null = berlaku untuk semua prodi
  is_global   Boolean @default(false)
  prodi       prodi? @relation(...)
}
```

**Alasan:**
- Persyaratan ujian bisa BEDA per prodi!
- Prodi A mungkin butuh sertifikat X, Prodi B tidak
- Beberapa requirement global (untuk semua), beberapa spesifik prodi
- **IMPACT TINGGI**

---

### 🔴 **8. KKP REQUIREMENTS (Persyaratan KKP)**
**Status:** PERLU UPDATE ❗

**Saat ini:**
```prisma
model kkp_requirements {
  // Tidak ada scope prodi
}
```

**Harus jadi:**
```prisma
model kkp_requirements {
  prodi_id    String?
  is_global   Boolean @default(false)
  prodi       prodi? @relation(...)
}
```

**Alasan:**
- Sama seperti exam requirements
- Tiap prodi bisa beda persyaratan KKP
- **IMPACT SEDANG-TINGGI**

---

### 🟡 **9. THESIS (Skripsi)**
**Status:** SEBAGIAN OK

**Saat ini:**
```prisma
model thesis_titles {
  department String  // String biasa
}
```

**Bisa ditingkatkan:**
```prisma
model thesis_titles {
  department String?
  prodi_id   String?
  prodi      prodi? @relation(...)
}
```

**Alasan:**
- Thesis pasti per prodi
- Untuk statistik, filter, laporan per prodi
- **IMPACT RENDAH** (sudah ada department)

---

### 🔴 **10. READING ROOM/LIBRARY ADMIN**
**Status:** PERLU TABEL BARU ❗

**Seperti lab admin, tapi untuk perpustakaan:**

```prisma
model reading_room_admins {
  id              String @id
  user_id         String
  prodi_id        String?  // null = semua prodi
  scope           String   // "all", "prodi", "specific_section"
  assigned_at     DateTime @default(now())
  assigned_by     String?
  is_primary      Boolean @default(false)
  users           users @relation(...)
  prodi           prodi? @relation(...)
  
  @@unique([user_id, prodi_id])
}
```

**Alasan:**
- Fakultas besar bisa punya admin perpus per prodi
- Atau 1 admin handle semua
- Perlu fleksibilitas
- **IMPACT SEDANG**

---

### 🔴 **11. ACADEMIC CALENDAR**
**Status:** PERLU UPDATE ❗

**Saat ini:**
```prisma
model academic_events {
  // Tidak ada scope prodi
}
```

**Harus jadi:**
```prisma
model academic_events {
  prodi_id    String?  // null = event untuk semua prodi
  is_global   Boolean @default(false)
  prodi       prodi? @relation(...)
}
```

**Alasan:**
- Beberapa event global (Wisuda, Dies Natalis)
- Beberapa event per prodi (Ujian Prodi A, Seminar Prodi B)
- Jadwal berbeda per prodi
- **IMPACT TINGGI**

---

### 🟡 **12. ANNOUNCEMENTS/NOTIFICATIONS**
**Status:** PERLU ENHANCEMENT

**Saat ini:**
```prisma
model notifications {
  user_id String  // Individual user
  // Tidak ada broadcast per prodi
}
```

**Ditambah tabel baru:**
```prisma
model announcements {
  id          String @id
  title       String
  content     String
  type        String  // "global", "prodi", "role"
  prodi_id    String?
  target_role Role?
  is_urgent   Boolean @default(false)
  created_by  String
  created_at  DateTime @default(now())
  expires_at  DateTime?
  prodi       prodi? @relation(...)
}
```

**Alasan:**
- Pengumuman bisa untuk 1 prodi saja
- Atau global untuk semua
- **IMPACT SEDANG**

---

### 🟡 **13. DOCUMENT TEMPLATES**
**Status:** PERLU ENHANCEMENT

**Tambah field prodi:**

```prisma
model letter_types {
  prodi_id    String?  // null = template global
  is_global   Boolean @default(false)
  prodi       prodi? @relation(...)
}
```

**Alasan:**
- Beberapa surat spesifik per prodi
- Template bisa beda (kop surat, TTD, dll)
- **IMPACT RENDAH-SEDANG**

---

### 🔴 **14. CLASSROOMS/FACILITIES**
**Status:** PERLU TABEL BARU ❗

```prisma
model classrooms {
  id          String @id
  code        String @unique
  name        String
  building    String
  floor       String?
  capacity    Int
  type        String  // "lecture", "lab", "meeting"
  facilities  Json?   // AC, projector, dll
  prodi_id    String?  // null = shared, ada = dedicated
  status      String @default("available")
  prodi       prodi? @relation(...)
}
```

**Alasan:**
- Beberapa ruang dedicated untuk 1 prodi
- Beberapa shared
- Untuk scheduling dan booking
- **IMPACT SEDANG**

---

### 🟡 **15. CURRICULUM**
**Status:** PERLU TABEL BARU ❗

```prisma
model curriculum {
  id          String @id
  prodi_id    String
  year        String  // "2020", "2023"
  name        String
  description String?
  is_active   Boolean @default(true)
  created_at  DateTime @default(now())
  prodi       prodi @relation(...)
  courses     curriculum_courses[]
  
  @@unique([prodi_id, year])
}

model curriculum_courses {
  id            String @id
  curriculum_id String
  course_id     String
  semester      Int
  is_required   Boolean @default(true)
  curriculum    curriculum @relation(...)
  courses       courses @relation(...)
  
  @@unique([curriculum_id, course_id])
}
```

**Alasan:**
- Kurikulum SANGAT spesifik per prodi
- Tiap prodi beda kurikulum
- Perubahan kurikulum per tahun
- **IMPACT TINGGI** untuk sistem KRS/akademik

---

### 🟡 **16. COURSE SCHEDULES**
**Status:** OK tapi bisa ditingkatkan

**Saat ini:**
```prisma
model course_schedules {
  course_id String
  // course sudah punya department
}
```

**Enhancement:**
- Tidak perlu ubah, karena courses akan punya prodi_id
- Bisa query via courses.prodi_id

---

## 📊 Priority Matrix

### 🔴 **HIGH PRIORITY** (Must Have)

1. **COURSES** - Impact sangat besar, core academic
2. **EXAM REQUIREMENTS** - Tiap prodi beda persyaratan
3. **KKP REQUIREMENTS** - Tiap prodi beda persyaratan
4. **ACADEMIC CALENDAR** - Event berbeda per prodi
5. **LECTURERS** - Assignment dan homebase
6. **CURRICULUM** - Core academic, sangat penting
7. **LABORATORY_ADMINS** - Sudah diimplementasi ✅

### 🟡 **MEDIUM PRIORITY** (Should Have)

8. **BUDGETS** - Financial management per prodi
9. **STAFF** - Assignment per prodi
10. **STUDENTS** - Improve relasi
11. **READING_ROOM_ADMINS** - Perpus management
12. **ANNOUNCEMENTS** - Communication per prodi
13. **CLASSROOMS** - Facility management
14. **THESIS** - Improve relasi

### 🟢 **LOW PRIORITY** (Nice to Have)

15. **DOCUMENT TEMPLATES** - Customization per prodi
16. **NOTIFICATIONS** - Enhancement

---

## 🎯 Rekomendasi Implementation

### **Phase 1: Core Academic** (CRITICAL)

```prisma
// 1. Update courses - MOST IMPORTANT
model courses {
  prodi_id String?
  prodi prodi? @relation(...)
}

// 2. Add curriculum system
model curriculum { ... }
model curriculum_courses { ... }

// 3. Update exam requirements
model exam_requirements {
  prodi_id String?
  is_global Boolean @default(false)
  prodi prodi? @relation(...)
}

// 4. Update kkp requirements  
// Similar to exam requirements
```

### **Phase 2: Personnel & Resources**

```prisma
// 5. Update lecturers
model lecturers {
  prodi_id String?
  is_homebase Boolean @default(true)
  prodi prodi? @relation(...)
}

// 6. Update staff
model staff {
  prodi_id String?
  prodi prodi? @relation(...)
}

// 7. Add reading room admins
model reading_room_admins { ... }

// 8. Add classrooms
model classrooms { ... }
```

### **Phase 3: Events & Communication**

```prisma
// 9. Update academic events
model academic_events {
  prodi_id String?
  is_global Boolean @default(false)
  prodi prodi? @relation(...)
}

// 10. Add announcements
model announcements { ... }

// 11. Update budgets
model budgets {
  prodi_id String?
  prodi prodi? @relation(...)
}
```

### **Phase 4: Enhancements**

```prisma
// 12. Improve students
model students {
  prodi_id String
  prodi prodi @relation(...)
}

// 13. Improve thesis
model thesis_titles {
  prodi_id String?
  prodi prodi? @relation(...)
}

// 14. Update letter types
model letter_types {
  prodi_id String?
  is_global Boolean @default(false)
  prodi prodi? @relation(...)
}
```

---

## 📝 Migration Strategy

### **Option A: Big Bang** (1 Migration)
✅ Semua sekaligus
❌ Risky, testing berat
❌ Downtime lama

### **Option B: Incremental** (Recommended)
✅ Per phase, 2-3 minggu sekali
✅ Testing lebih mudah
✅ Rollback lebih aman
❌ Lebih lama selesai

### **Option C: Hybrid**
✅ Phase 1 & 2 jadi 1 migration (core)
✅ Phase 3 & 4 nanti kalau perlu
✅ **RECOMMENDED**

---

## 🔧 Implementation Checklist

### Schema Changes
- [ ] Add prodi_id to courses
- [ ] Add prodi_id to lecturers (+ is_homebase)
- [ ] Add prodi_id to staff
- [ ] Add prodi_id to budgets & budget_allocations
- [ ] Add prodi_id to exam_requirements (+ is_global)
- [ ] Add prodi_id to kkp_requirements (+ is_global)
- [ ] Add prodi_id to academic_events (+ is_global)
- [ ] Add prodi_id to students (improve)
- [ ] Add prodi_id to thesis_titles
- [ ] Create curriculum table
- [ ] Create curriculum_courses table
- [ ] Create reading_room_admins table
- [ ] Create announcements table
- [ ] Create classrooms table
- [ ] Update prodi table with all relations

### API Updates
- [ ] Prodi management endpoints
- [ ] Filter by prodi untuk semua resources
- [ ] Curriculum management
- [ ] Classroom management
- [ ] Announcements management

### UI Updates
- [ ] Prodi selector components
- [ ] Admin prodi dashboard
- [ ] Curriculum management UI
- [ ] Enhanced filtering di semua pages

---

## 💡 Benefits

### ✅ **Data Integrity**
- Foreign key constraints
- Referential integrity
- No typo di nama prodi

### ✅ **Performance**
- Efficient JOIN queries
- Index on prodi_id
- Faster filtering

### ✅ **Flexibility**
- Global vs prodi-specific items
- Multi-prodi support untuk dosen
- Dedicated vs shared resources

### ✅ **Reporting**
- Mudah buat laporan per prodi
- Statistik per prodi
- Comparison antar prodi

### ✅ **Access Control**
- Prodi admin hanya lihat data prodi mereka
- Better permission scoping
- Audit trail per prodi

---

## 🎯 Kesimpulan

**Yang HARUS di-update untuk mendukung management per prodi:**

1. ✅ **laboratories** - Done
2. 🔴 **courses** - CRITICAL
3. 🔴 **exam_requirements** - HIGH
4. 🔴 **kkp_requirements** - HIGH  
5. 🔴 **academic_events** - HIGH
6. 🔴 **lecturers** - HIGH
7. 🔴 **curriculum** (new table) - CRITICAL
8. 🟡 **budgets** - MEDIUM
9. 🟡 **staff** - MEDIUM
10. 🟡 **students** - MEDIUM (improve)
11. 🟡 **reading_room_admins** (new) - MEDIUM
12. 🟡 **announcements** (new) - MEDIUM
13. 🟡 **classrooms** (new) - MEDIUM
14. 🟢 **thesis_titles** - LOW
15. 🟢 **letter_types** - LOW

**Total:** 7 HIGH priority + 1 Done = **8 Critical Changes**

---

**Recommendation:** 
Lakukan Phase 1 & 2 dalam 1 migration besar (10-12 changes), sisanya bisa bertahap.


