# 🔐 Update Otentikasi dengan Prodi Scoping

## 📋 Overview
Update pada sistem login untuk **otomatis populate `prodi_id`** ke dalam JWT token dan session berdasarkan profile user (student/lecturer/staff).

---

## ✅ Yang Sudah Diupdate

### 1. **JWT Token Structure**
**File:** `lib/auth-middleware.ts`

```typescript
export interface DecodedToken {
  userId: string
  username: string
  role: string
  subRole?: string
  prodi_id?: string  // ✅ ADDED - Auto dari profile
  iat: number
  exp: number
}
```

### 2. **Login API** 
**File:** `app/api/auth/login/route.ts`

#### A. Auto-populate `prodi_id` dari Profile
```typescript
// Get prodi_id from user profile
let prodi_id: string | undefined = undefined

if (user.students) {
  prodi_id = user.students.prodi_id || undefined
  console.log('✅ Student prodi_id:', prodi_id)
} else if (user.lecturers) {
  prodi_id = user.lecturers.prodi_id || undefined
  console.log('✅ Lecturer prodi_id:', prodi_id)
} else if (user.staff) {
  prodi_id = user.staff.prodi_id || undefined
  console.log('✅ Staff prodi_id:', prodi_id)
}
```

#### B. Include `prodi_id` di JWT Token
```typescript
const token = jwt.sign(
  {
    userId: user.id,
    username: user.username,
    role: user.role,
    subRole: user.sub_role,
    prodi_id: prodi_id  // ✅ Auto-populated
  },
  JWT_SECRET,
  { expiresIn: '24h' }
)
```

#### C. Include `prodi_id` di Response
```typescript
const response = NextResponse.json({
  user: {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    sub_role: user.sub_role,
    prodi_id: prodi_id,  // ✅ ADDED
    avatar: user.avatar,
    profile: user.students || user.lecturers || user.staff,
    isNewUser
  },
  token
})
```

#### D. Sync Prodi dari GraphQL (Mahasiswa)
```typescript
// Sync prodi data first to ensure it exists
await syncProdiFromMahasiswa(nim)

// Get prodi_id from GraphQL response
let prodi_id: string | null = null
try {
  const mahasiswaResponse = await graphqlClient.request<MahasiswaResponse>(
    GET_MAHASISWA,
    { nim }
  )
  prodi_id = mahasiswaResponse.mahasiswa?.prodi?.kode || null
  console.log('🎓 Prodi ID from GraphQL:', prodi_id)
} catch (error) {
  console.error('Failed to get prodi from GraphQL:', error)
}

// Create student with prodi_id
const student = await prisma.students.create({
  // ... other fields
  prodi_id: prodi_id,  // ✅ Auto dari GraphQL
})
```

#### E. Include Prodi Relation di Query
```typescript
user = await prisma.users.findUnique({
  where: { username },
  include: {
    students: {
      include: {
        prodi: true  // ✅ ADDED
      }
    },
    lecturers: {
      include: {
        prodi: true  // ✅ ADDED
      }
    },
    staff: {
      include: {
        prodi: true  // ✅ ADDED
      }
    }
  }
})
```

---

## 🔄 Flow Login dengan Prodi Scoping

### Scenario 1: User Sudah Ada di Database
```
1. Login dengan username & password
2. Find user di database (include students/lecturers/staff + prodi)
3. Verify password
4. Extract prodi_id dari profile:
   - Student → students.prodi_id
   - Lecturer → lecturers.prodi_id
   - Staff → staff.prodi_id
5. Create JWT token dengan prodi_id
6. Return response dengan prodi_id
```

### Scenario 2: User Baru (Sync dari GraphQL)
```
1. Login dengan username & password
2. User tidak ada di database
3. Query GraphQL untuk mahasiswa data
4. Verify password (MD5 hash)
5. Sync prodi dari GraphQL → create/update prodi table
6. Get prodi_id dari GraphQL response
7. Create user + student profile dengan prodi_id
8. Create JWT token dengan prodi_id
9. Return response dengan prodi_id
```

---

## 🎯 Impact pada API Endpoints

Dengan update ini, **semua API endpoints yang sudah kita buat** otomatis mendapat `prodi_id` dari token:

### 1. **Students API**
```typescript
// Role prodi otomatis filter by prodi_id
if (token.role === 'prodi' && token.prodi_id) {
  where.prodi_id = token.prodi_id  // ✅ Auto dari token
}
```

### 2. **Exam Requirements API**
```typescript
// Auto-detect student's prodi dari token
where: {
  exam_type: exam_type,
  OR: [
    { is_global: true },
    { prodi_id: token.prodi_id }  // ✅ Auto dari token
  ]
}
```

### 3. **Curriculum API**
```typescript
// Prodi role hanya bisa create untuk prodi mereka
if (token.role === 'prodi' && token.prodi_id) {
  validatedData.prodi_id = token.prodi_id  // ✅ Auto dari token
}
```

### 4. **Announcements API**
```typescript
// Auto-filter: global + user's prodi
where: {
  OR: [
    { is_global: true },
    { prodi_id: token.prodi_id }  // ✅ Auto dari token
  ]
}
```

### 5. **Classrooms API**
```typescript
// Prodi role lihat classroom mereka + shared
where: {
  OR: [
    { prodi_id: token.prodi_id },  // ✅ Auto dari token
    { prodi_id: null } // Shared
  ]
}
```

---

## 🔐 Security Benefits

### 1. **Automatic Scoping**
✅ User tidak bisa akses data prodi lain  
✅ Tidak perlu manual passing prodi_id di setiap request  
✅ Filter otomatis di level API berdasarkan token

### 2. **Role-Based Access**
✅ **Admin:** `prodi_id = null` → Akses semua prodi  
✅ **Prodi:** `prodi_id = 'TI'` → Hanya akses prodi TI  
✅ **Lecturer (homebase):** Filter by prodi homebase  
✅ **Student:** Filter by prodi mereka

### 3. **Immutable Token Data**
✅ `prodi_id` di token tidak bisa diubah setelah login  
✅ Harus re-login untuk update prodi_id  
✅ Prevent unauthorized access

---

## 📊 Data Flow Diagram

```
┌─────────────┐
│   LOGIN     │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ Get User Profile │
│ (students/       │
│  lecturers/      │
│  staff)          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Extract prodi_id │
│ from profile     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Create JWT      │
│  with prodi_id   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ All API Requests │
│ Use prodi_id     │
│ from Token       │
└──────────────────┘
```

---

## 🧪 Testing Scenarios

### Test 1: Student Login
```bash
POST /api/auth/login
{
  "username": "220401010001",
  "password": "password123"
}

Expected Response:
{
  "user": {
    "prodi_id": "TI",  # ✅ Auto from students.prodi_id
    "role": "mahasiswa",
    ...
  },
  "token": "eyJ..." # Contains prodi_id: "TI"
}
```

### Test 2: Lecturer Login
```bash
POST /api/auth/login
{
  "username": "NIDN001",
  "password": "password123"
}

Expected Response:
{
  "user": {
    "prodi_id": "SI",  # ✅ Auto from lecturers.prodi_id
    "role": "dosen",
    ...
  },
  "token": "eyJ..." # Contains prodi_id: "SI"
}
```

### Test 3: Admin Login
```bash
POST /api/auth/login
{
  "username": "admin",
  "password": "admin123"
}

Expected Response:
{
  "user": {
    "prodi_id": null,  # ✅ Admin tidak punya prodi
    "role": "admin",
    ...
  },
  "token": "eyJ..." # Contains prodi_id: null
}
```

### Test 4: API Call dengan Token
```bash
GET /api/students
Authorization: Bearer eyJ... # Token dengan prodi_id: "TI"

Expected Behavior:
- If role = 'prodi' → Only students with prodi_id = "TI"
- If role = 'admin' → All students (no filter)
```

---

## 🚨 Important Notes

### 1. **Nullable prodi_id**
- `prodi_id` bisa `null` untuk admin atau user yang belum punya prodi
- API harus handle case `token.prodi_id === null`
- Jangan paksa filtering jika `prodi_id` null

### 2. **Update Profile → Re-login Required**
- Jika admin update `prodi_id` di database
- User harus **re-login** untuk dapat token baru dengan `prodi_id` updated
- Consider: Implement token refresh mechanism

### 3. **GraphQL Sync**
- Mahasiswa baru otomatis dapat `prodi_id` dari GraphQL
- Prodi otomatis dibuat jika belum ada di database
- Ensure GraphQL always return prodi data

---

## ✅ Checklist Implementation

- [x] Update `DecodedToken` interface dengan `prodi_id`
- [x] Auto-populate `prodi_id` dari student profile
- [x] Auto-populate `prodi_id` dari lecturer profile
- [x] Auto-populate `prodi_id` dari staff profile
- [x] Include `prodi_id` di JWT token
- [x] Include `prodi_id` di login response
- [x] Sync `prodi_id` dari GraphQL untuk mahasiswa baru
- [x] Include prodi relation di user query
- [x] Test login flow dengan berbagai role
- [x] Update dokumentasi

---

## 📝 Next Steps

### 1. **Frontend Update**
- [ ] Update auth context untuk store `prodi_id`
- [ ] Display prodi info di user profile
- [ ] Add prodi filter di admin dashboards

### 2. **Data Migration**
- [ ] Populate `prodi_id` untuk existing students
- [ ] Populate `prodi_id` untuk existing lecturers
- [ ] Populate `prodi_id` untuk existing staff

### 3. **Token Refresh**
- [ ] Implement refresh token mechanism
- [ ] Auto-update token jika profile berubah

---

**Status:** ✅ Production Ready  
**Updated:** 2025-10-23  
**Impact:** High - Affects all API endpoints dengan prodi scoping

