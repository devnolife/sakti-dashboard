# 📋 Rencana Migrasi Prodi-Scoped Features

## 🎯 Overview
Dokumen ini berisi daftar lengkap semua file yang perlu diupdate setelah perubahan schema database untuk mendukung fitur scoped per program studi (prodi).

## 📊 Perubahan Schema

### Model yang Diubah (Tambah `prodi_id`)
1. **students** - `prodi_id: String?`
2. **lecturers** - `prodi_id: String?`, `is_homebase: Boolean @default(true)`
3. **staff** - `prodi_id: String?`
4. **courses** - `prodi_id: String?`
5. **academic_events** - `prodi_id: String?`, `is_global: Boolean @default(false)`
6. **exam_requirements** - `prodi_id: String?`, `is_global: Boolean @default(false)`
7. **budgets** - `prodi_id: String?`
8. **budget_allocations** - `prodi_id: String?`
9. **thesis_titles** - `prodi_id: String?`
10. **letter_types** - `prodi_id: String?`, `is_global: Boolean @default(false)`
11. **laboratory_admins** - `prodi_id: String?` (untuk tracking)

### Model Baru
1. **curriculum** - Kurikulum per prodi
2. **curriculum_courses** - Mata kuliah dalam kurikulum
3. **announcements** - Pengumuman (global atau per prodi)
4. **classrooms** - Ruang kelas per prodi
5. **reading_room_admins** - Admin ruang baca per prodi

---

## 📁 File yang Perlu Diupdate

### 🔴 PRIORITAS TINGGI - API Endpoints (17 files)

#### 1. Student Management
- **File**: `app/api/students/route.ts`
- **Perubahan**:
  - Tambah `prodi_id` di create student
  - Filter students berdasarkan `prodi_id` untuk role prodi
  - Include prodi relation di query
- **Impact**: HIGH - Core student management

- **File**: `app/api/dosen/students/route.ts`
- **Perubahan**:
  - Filter students berdasarkan `prodi_id` dosen
  - Show only students dari prodi yang sama
- **Impact**: MEDIUM

#### 2. Lecturer Management
- **File**: `app/api/auth/login/route.ts`
- **Perubahan**:
  - Populate `prodi_id` dari lecturer data saat login
  - Include prodi info di session
- **Impact**: HIGH - Authentication

#### 3. Exam & Requirements
- **File**: `app/api/student/exams/register/route.ts`
- **Perubahan**:
  - Check exam requirements berdasarkan `prodi_id` student
  - Filter only requirements yang `is_global=true` OR `prodi_id` match
- **Impact**: HIGH

- **File**: `app/api/student/exams/requirements/route.ts`
- **Perubahan**:
  - Fetch requirements filtered by student's `prodi_id`
  - Show global + prodi-specific requirements
- **Impact**: HIGH

- **File**: `app/api/student/exams/requirements/upload/route.ts`
- **Perubahan**:
  - Validate requirements belongs to student's prodi
- **Impact**: MEDIUM

- **File**: `app/api/dosen/exams/route.ts`
- **Perubahan**:
  - Filter exams by lecturer's `prodi_id`
  - Show only exams from same prodi
- **Impact**: MEDIUM

- **File**: `app/api/dosen/exams/grading/route.ts`
- **Perubahan**:
  - Filter by `prodi_id`
- **Impact**: MEDIUM

#### 4. KKP Management
- **File**: `app/api/kkp/applications/route.ts`
- **Perubahan**:
  - Auto-populate student's `prodi_id`
  - Filter applications by prodi for prodi role
- **Impact**: HIGH

- **File**: `app/api/kkp/requirements/route.ts`
- **Perubahan**:
  - Check if requirements are prodi-specific
- **Impact**: MEDIUM

- **File**: `app/api/kkp/locations/route.ts`
- **Perubahan**:
  - Could add prodi-specific filtering
- **Impact**: LOW

- **File**: `app/api/dosen/kkp/route.ts`
- **Perubahan**:
  - Filter by lecturer's `prodi_id`
- **Impact**: MEDIUM

#### 5. Thesis Management
- **File**: `app/api/dosen/thesis-titles/route.ts`
- **Perubahan**:
  - Add `prodi_id` when creating thesis
  - Filter by lecturer's `prodi_id`
- **Impact**: HIGH

#### 6. Dashboard & Statistics
- **File**: `app/api/dosen/dashboard/route.ts`
- **Perubahan**:
  - All statistics filtered by `prodi_id`
  - Student count, exam count, etc per prodi
- **Impact**: HIGH

- **File**: `app/api/admin/dashboard/comprehensive/route.ts`
- **Perubahan**:
  - Add prodi breakdown in statistics
  - Add prodi filter option
- **Impact**: MEDIUM

- **File**: `app/api/admin/statistics/route.ts`
- **Perubahan**:
  - Group statistics by prodi
  - Add prodi dimension
- **Impact**: MEDIUM

#### 7. Master Data
- **File**: `app/api/admin/master-data/departments/route.ts`
- **Perubahan**:
  - Link departments to prodi
  - Show prodi information
- **Impact**: MEDIUM

---

### 🟡 PRIORITAS SEDANG - Actions (5 files)

#### 1. Academic Actions
- **File**: `app/actions/academic-actions.ts`
- **Perubahan**:
  - Add prodi filtering for courses
  - Add prodi filtering for academic events
  - Support `is_global` flag
- **Impact**: MEDIUM

#### 2. Laboratory Actions
- **File**: `app/actions/laboratory-actions.ts`
- **Perubahan**:
  - Filter labs by prodi
  - Handle laboratory_admins with prodi_id
- **Impact**: MEDIUM

#### 3. Library Actions
- **File**: `app/actions/library-actions.ts`
- **Perubahan**:
  - Potentially add prodi-specific book collections
  - Reading room admin management
- **Impact**: LOW-MEDIUM

#### 4. Correspondence/Letter Operations
- **File**: `app/actions/correspondence/letter-operations.ts`
- **File**: `app/actions/correspondence/letter-operations-new.ts`
- **Perubahan**:
  - Filter letter_types by prodi
  - Support global and prodi-specific letter types
  - Check `is_global` flag
- **Impact**: HIGH

---

### 🟢 FILE BARU - API Endpoints yang Perlu Dibuat

#### 1. Curriculum Management
```
app/api/admin/curriculum/route.ts
- GET: List all curriculum (with prodi filter)
- POST: Create new curriculum for prodi

app/api/admin/curriculum/[id]/route.ts
- GET: Get curriculum details + courses
- PUT: Update curriculum
- DELETE: Delete curriculum

app/api/admin/curriculum/[id]/courses/route.ts
- GET: List courses in curriculum
- POST: Add course to curriculum
- DELETE: Remove course from curriculum

app/api/prodi/curriculum/route.ts
- GET: List curriculum for logged-in prodi
- POST: Create curriculum (auto-assign prodi_id)
```

#### 2. Announcements
```
app/api/announcements/route.ts
- GET: List announcements (global + user's prodi)
- POST: Create announcement (admin/prodi)

app/api/announcements/[id]/route.ts
- GET: Get announcement detail
- PUT: Update announcement
- DELETE: Delete announcement

app/api/prodi/announcements/route.ts
- GET: Prodi-specific announcements
- POST: Create prodi announcement
```

#### 3. Classrooms
```
app/api/admin/classrooms/route.ts
- GET: List all classrooms (with prodi filter)
- POST: Create classroom

app/api/admin/classrooms/[id]/route.ts
- PUT: Update classroom
- DELETE: Delete classroom

app/api/prodi/classrooms/route.ts
- GET: Classrooms for specific prodi
- POST: Create classroom for prodi
```

#### 4. Reading Room Admins
```
app/api/admin/reading-room-admins/route.ts
- GET: List all reading room admins
- POST: Assign admin to prodi

app/api/admin/reading-room-admins/[id]/route.ts
- DELETE: Remove admin assignment
```

---

### 🔵 KOMPONEN UI - File yang Perlu Update/Buat

#### Update Existing Components
```
components/admin/comprehensive-admin-dashboard.tsx
- Add prodi filter dropdown
- Group statistics by prodi
- Show prodi breakdown

components/dashboards/ (various)
- Add prodi context awareness
- Filter data by prodi

components/exam/ (various)
- Handle prodi-specific requirements
- Show global vs prodi requirements

components/kkp/ (various)
- Display prodi information
- Filter by prodi

components/laboratory/ (various)
- Lab assignment per prodi
- Multi-lab management UI
```

#### New Components Needed
```
components/curriculum/
- curriculum-list.tsx
- curriculum-form.tsx
- curriculum-courses.tsx
- course-selector.tsx

components/announcements/
- announcement-list.tsx
- announcement-form.tsx
- announcement-card.tsx

components/classrooms/
- classroom-list.tsx
- classroom-form.tsx
- classroom-schedule.tsx

components/admin/
- prodi-filter.tsx (reusable filter component)
- prodi-selector.tsx
- prodi-stats-card.tsx
```

---

## 🔄 Migration Strategy

### Phase 1: Core Data Models (COMPLETED ✅)
- [x] Update Prisma schema
- [x] Deploy schema changes to database

### Phase 2: Authentication & User Management (NEXT)
- [ ] Update login to include prodi context
- [ ] Update student/lecturer data to populate prodi_id
- [ ] Create middleware for prodi-based access control

### Phase 3: Student & Exam System
- [ ] Update student APIs with prodi filtering
- [ ] Update exam requirements to support global + prodi-specific
- [ ] Update exam registration to check prodi requirements

### Phase 4: Academic Management
- [ ] Update courses with prodi association
- [ ] Update academic events with prodi/global flags
- [ ] Create curriculum management system

### Phase 5: Administrative Features
- [ ] Update budgets with prodi allocation
- [ ] Update letter types with prodi/global support
- [ ] Create announcements system
- [ ] Create classroom management

### Phase 6: Laboratory & Reading Room
- [ ] Update lab admin assignments with prodi
- [ ] Create reading room admin management
- [ ] Multi-lab per prodi support

### Phase 7: UI Components & Dashboard
- [ ] Add prodi filters to all relevant pages
- [ ] Update dashboards with prodi-aware statistics
- [ ] Create prodi-specific views

### Phase 8: Testing & Documentation
- [ ] Test all prodi-scoped features
- [ ] Test global vs prodi-specific logic
- [ ] Update user documentation
- [ ] Create migration guide for existing data

---

## ⚠️ Breaking Changes & Considerations

### 1. Backward Compatibility
- Semua field `prodi_id` nullable untuk backward compatibility
- Existing data tetap berfungsi tanpa `prodi_id`
- Perlu migration script untuk populate existing data

### 2. Access Control
- Role `prodi` sekarang scope ke prodi tertentu
- Admin tetap bisa akses semua prodi
- Lecturer bisa lintas prodi dengan `is_homebase=false`

### 3. Data Migration Needed
```sql
-- Populate student prodi_id from major/department
-- Populate lecturer prodi_id from department
-- Set default is_global flags
-- Assign existing labs to prodi
```

### 4. Performance Considerations
- Add indexes pada semua `prodi_id` columns (sudah ditambahkan)
- Consider caching for prodi-specific queries
- Optimize joins dengan prodi table

---

## 📝 Next Steps

1. **Immediate** (Hari ini):
   - Update authentication & session management
   - Add prodi context to user session
   - Create prodi filter middleware

2. **Short Term** (Minggu ini):
   - Update semua student & exam APIs
   - Update course & academic event APIs
   - Create basic curriculum APIs

3. **Medium Term** (2 minggu):
   - Build announcements system
   - Build classroom management
   - Update all UI components

4. **Long Term** (1 bulan):
   - Complete multi-lab management
   - Advanced prodi analytics
   - Complete testing & documentation

---

## 🔗 Related Documentation
- `docs/MULTI_LAB_MANAGEMENT.md` - Lab admin per prodi
- `docs/PRODI_SCOPED_ANALYSIS.md` - Analisis fitur per prodi
- `prisma/schema.prisma` - Latest schema definition

---

**Status**: 🚀 Schema Ready - Implementation in Progress
**Last Updated**: 2025-10-23
**Total Files to Update**: 22 existing + 15+ new files
**Estimated Effort**: 3-4 weeks full implementation

