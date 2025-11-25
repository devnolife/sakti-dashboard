# 🛡️ Admin System - Centralized User & System Management

## Overview

Sistem **Admin** adalah pusat kontrol untuk mengelola **SEMUA akun dan sistem** secara terpusat. Role `admin` memiliki akses penuh untuk:

- ✅ Manage semua user (mahasiswa, dosen, staff_tu, prodi, dekan, dll)
- ✅ Bulk operations (activate, deactivate, delete, change role)
- ✅ Create new users dengan role-specific data
- ✅ View comprehensive statistics
- ✅ Monitor system health
- ✅ Access control & security

---

## 🎯 Fitur Lengkap

### 1. **Dashboard Admin**
**Location**: `/dashboard/admin`

Menampilkan overview lengkap sistem:
- Total users, active/inactive users
- New users this month
- Breakdown users by role
- Statistics per prodi
- System statistics (surat, certificates, laboratories)
- Recent users activity

### 2. **User Management**
**Location**: `/dashboard/admin/users`

Fitur:
- ✅ View all users with pagination
- ✅ Search by username/name/email
- ✅ Filter by role
- ✅ View user details
- ✅ Edit user info
- ✅ Activate/deactivate users
- ✅ Delete users
- ✅ Reset password

### 3. **Bulk Operations**
**API**: `/api/admin/users/bulk`

Actions:
- `activate`: Activate multiple users
- `deactivate`: Deactivate multiple users
- `delete`: Delete multiple users (prevent self-delete)
- `change_role`: Change role for multiple users
- `reset_password`: Reset password for multiple users

### 4. **Create User**
**API**: `/api/admin/users/create`

Support semua role dengan data spesifik:
- **Mahasiswa**: NIM, major, semester, prodi
- **Dosen**: NIP, position, department, prodi
- **Staff TU**: Position, prodi
- **Laboratory Admin**: Prodi
- **Prodi/Dekan/Admin**: No additional data needed

---

## 📊 Database Schema

### Users Table
```typescript
model users {
  id         String   @id @default(cuid())
  username   String   @unique
  name       String
  email      String?
  password   String
  role       Role     // Enum: mahasiswa, dosen, staff_tu, prodi, dekan, admin, etc.
  sub_role   String?
  is_active  Boolean  @default(true)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  lecturers          lecturers[]
  students           students[]
  staff_tu           staff_tu[]
  laboratory_admins  laboratory_admins[]
}
```

### Role Enum
```typescript
enum Role {
  mahasiswa
  dosen
  staff_tu
  prodi
  dekan
  admin                 // ← Super Admin role
  laboratory_admin
  reading_room_admin
  admin_umum
  admin_keuangan
  gkm
  kepala_tata_usaha
}
```

---

## 🔐 API Endpoints

### 1. **GET /api/admin/users**

Get all users with pagination and filters

**Query Parameters:**
```typescript
{
  search?: string      // Search by username/name/email
  role?: string        // Filter by role (default: "all")
  page?: number        // Page number (default: 1)
  limit?: number       // Items per page (default: 10)
}
```

**Response:**
```json
{
  "users": [
    {
      "id": "user_123",
      "username": "stafftu_55202",
      "name": "Ahmad Staff",
      "role": "staff_tu",
      "is_active": true,
      "created_at": "2025-01-23T10:00:00Z",
      "staff_tu": [{
        "position": "Staff",
        "prodi_id": "IF"
      }]
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15
  },
  "stats": {
    "totalUsers": 150,
    "activeUsers": 140,
    "inactiveUsers": 10,
    "newThisMonth": 5
  }
}
```

### 2. **GET /api/admin/users/[id]**

Get single user detail

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "username": "dosen123",
    "name": "Dr. Ahmad",
    "role": "dosen",
    "lecturers": [{
      "nip": "198012345678901234",
      "position": "Lektor Kepala",
      "department": "Fakultas Teknik",
      "prodi": {
        "kode": "IF",
        "nama": "Teknik Informatika"
      }
    }]
  }
}
```

### 3. **PATCH /api/admin/users/[id]**

Update user

**Request:**
```json
{
  "name": "New Name",
  "email": "newemail@example.com",
  "role": "dosen",
  "is_active": true,
  "password": "newpassword"  // Optional
}
```

### 4. **DELETE /api/admin/users/[id]**

Delete user

**Notes:**
- Cannot delete yourself
- Will cascade delete related records

### 5. **POST /api/admin/users/bulk**

Bulk operations on multiple users

**Request:**
```json
{
  "action": "activate",  // activate, deactivate, delete, change_role, reset_password
  "userIds": ["user_1", "user_2", "user_3"],
  "data": {              // Optional, depends on action
    "role": "dosen",     // For change_role
    "password": "new123" // For reset_password
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully activate 3 users",
  "count": 3
}
```

### 6. **POST /api/admin/users/create**

Create new user

**Request:**
```json
{
  "username": "dosen123",
  "name": "Dr. Ahmad Fauzi",
  "email": "ahmad@example.com",
  "password": "password123",
  "role": "dosen",
  "prodi_id": "IF",
  "additional_data": {
    "nip": "198012345678901234",
    "position": "Lektor Kepala",
    "department": "Fakultas Teknik"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "user_new",
    "username": "dosen123",
    "name": "Dr. Ahmad Fauzi",
    "role": "dosen"
  }
}
```

### 7. **GET /api/admin/stats**

Get comprehensive system statistics

**Response:**
```json
{
  "success": true,
  "stats": {
    "users": {
      "total": 150,
      "active": 140,
      "inactive": 10,
      "newThisMonth": 5,
      "byRole": {
        "mahasiswa": 100,
        "dosen": 30,
        "staff_tu": 10,
        "prodi": 3,
        "dekan": 1,
        "laboratory_admin": 4,
        "admin_umum": 2
      }
    },
    "prodi": [
      {
        "kode": "IF",
        "nama": "Teknik Informatika",
        "_count": {
          "students": 50,
          "lecturers": 15,
          "laboratory_admins": 2,
          "staff_tu": 3
        }
      }
    ],
    "system": {
      "letterRequests": 450,
      "pendingLetters": 23,
      "certificates": 120,
      "laboratories": 5
    },
    "recentUsers": [...]
  }
}
```

---

## 💻 UI Components

### 1. **SuperAdminDashboard**
**File**: `components/admin/super-admin-dashboard.tsx`

Features:
- Main statistics cards (total, active, inactive, new users)
- Tabs:
  - **User by Role**: Breakdown users by role dengan icons
  - **Data by Prodi**: Statistics per program studi
  - **System Stats**: Overall system statistics
- Recent users list
- Quick actions buttons

### 2. **CreateUserDialog**
**File**: `components/admin/dialogs/create-user-dialog.tsx`

Features:
- Dynamic form berdasarkan role
- Role selection
- Prodi selection (conditional)
- Role-specific fields:
  - Dosen: NIP, position, department
  - Mahasiswa: NIM, major, semester
  - Staff TU: Position
- Validation
- Success toast notification

### 3. **UserManagement**
**File**: `components/admin/users/user-management.tsx`

Features:
- User list dengan pagination
- Search & filter
- Bulk select
- Bulk actions toolbar
- Edit user dialog
- Delete confirmation
- Activate/deactivate toggle

---

## 🚀 Usage Guide

### Untuk Admin

#### 1. **Akses Dashboard**
```
Login sebagai admin → /dashboard/admin
```

Anda akan melihat:
- Total users dan statistik
- Breakdown by role
- Data per prodi
- System statistics
- Recent activity

#### 2. **Manage Users**
```
Dashboard → User Management
atau langsung ke /dashboard/admin/users
```

Actions:
- **View**: Lihat semua user dengan filter
- **Search**: Cari by username/name/email
- **Filter**: Filter by role
- **Edit**: Click user → Edit button
- **Delete**: Click user → Delete button
- **Activate/Deactivate**: Toggle switch

#### 3. **Create New User**
```
User Management → Create User button
```

Steps:
1. Click "Create User"
2. Fill form:
   - Username (required)
   - Full Name (required)
   - Email (optional)
   - Password (required)
   - Role (required)
3. Select Prodi (if applicable)
4. Fill role-specific data:
   - **Dosen**: NIP, Position, Department
   - **Mahasiswa**: NIM, Major, Semester
   - **Staff TU**: Position
5. Click "Create User"
6. Success! User dibuat dengan relasi yang sesuai

#### 4. **Bulk Operations**
```
User Management → Select multiple users → Bulk Actions
```

Available actions:
- **Activate**: Aktifkan users terpilih
- **Deactivate**: Non-aktifkan users terpilih
- **Delete**: Hapus users terpilih (confirm first!)
- **Change Role**: Ubah role untuk users terpilih
- **Reset Password**: Reset password ke default

#### 5. **View Statistics**
```
Dashboard → Tabs
```

Tabs:
- **User by Role**: Lihat distribusi user per role
- **Data by Prodi**: Lihat statistik per program studi
- **System Stats**: Lihat overall system statistics

---

## 🔒 Security & Permissions

### Authorization Check
```typescript
// Every admin endpoint checks:
if (!session || session.user.role !== "admin") {
  return NextResponse.json(
    { error: "Unauthorized - Admin access required" },
    { status: 403 }
  )
}
```

### Self-Protection
```typescript
// Cannot delete yourself
if (userIds.includes(session.user.id)) {
  return NextResponse.json(
    { error: "Cannot delete your own account" },
    { status: 400 }
  )
}
```

### Password Hashing
```typescript
import bcrypt from "bcryptjs"

// Create user
const hashedPassword = await bcrypt.hash(password, 10)

// Update password
if (password) {
  updateData.password = await bcrypt.hash(password, 10)
}
```

---

## 📁 File Structure

```
app/
├── dashboard/admin/
│   ├── page.tsx                    # Main admin dashboard
│   ├── users/page.tsx              # User management page
│   ├── roles/page.tsx              # Role management
│   └── ...other admin pages
│
├── api/admin/
│   ├── users/
│   │   ├── route.ts                # GET all users
│   │   ├── [id]/route.ts           # GET, PATCH, DELETE user
│   │   ├── bulk/route.ts           # POST bulk operations
│   │   ├── create/route.ts         # POST create user
│   │   └── reset-password/route.ts # POST reset password
│   └── stats/route.ts              # GET system statistics

components/admin/
├── super-admin-dashboard.tsx       # Main dashboard component
├── users/
│   ├── user-management.tsx         # User list & management
│   └── edit-user-dialog.tsx        # Edit user form
└── dialogs/
    ├── create-user-dialog.tsx      # Create user form
    └── user-form-dialog.tsx        # Generic user form
```

---

## 🎨 UI Features

### Dashboard Cards
- **Total Users**: Total semua user
- **Active Users**: User yang is_active = true (green)
- **Inactive Users**: User yang is_active = false (red)
- **New This Month**: User baru bulan ini (purple)

### Role Icons & Colors
```typescript
const roleIcons = {
  mahasiswa: GraduationCap,      // Student
  dosen: BookOpen,               // Lecturer
  staff_tu: Users,               // Staff
  prodi: Shield,                 // Program Head
  dekan: Shield,                 // Dean
  laboratory_admin: Activity,    // Lab Admin
  admin_umum: Settings,          // General Admin
  admin_keuangan: BarChart3,     // Finance Admin
  kepala_tata_usaha: FileText    // Head of Administration
}
```

### Tabs
1. **User by Role**: Grid cards dengan icon dan count
2. **Data by Prodi**: List cards dengan breakdown per prodi
3. **System Stats**: Statistics untuk letter requests, certificates, labs

---

## 📊 Statistics Breakdown

### User Statistics
- Total users
- Active vs Inactive
- New users this month
- Distribution by role (9 roles)

### Prodi Statistics
Per program studi:
- Total mahasiswa
- Total dosen
- Total lab admins
- Total staff TU

### System Statistics
- Total letter requests
- Pending letter requests
- Total certificates
- Total laboratories

---

## 🧪 Testing

### 1. Test Create User

**Dosen:**
```json
{
  "username": "dosen_test",
  "name": "Dr. Test Dosen",
  "password": "password123",
  "role": "dosen",
  "prodi_id": "IF",
  "additional_data": {
    "nip": "198012345678901234",
    "position": "Lektor",
    "department": "Fakultas Teknik"
  }
}
```

**Mahasiswa:**
```json
{
  "username": "mhs_test",
  "name": "Ahmad Mahasiswa",
  "password": "password123",
  "role": "mahasiswa",
  "prodi_id": "IF",
  "additional_data": {
    "nim": "2021123456",
    "major": "Teknik Informatika",
    "semester": 5
  }
}
```

### 2. Test Bulk Operations

**Activate Multiple:**
```bash
POST /api/admin/users/bulk
{
  "action": "activate",
  "userIds": ["user_1", "user_2", "user_3"]
}
```

**Change Role:**
```bash
POST /api/admin/users/bulk
{
  "action": "change_role",
  "userIds": ["user_1", "user_2"],
  "data": { "role": "dosen" }
}
```

### 3. Test Statistics

```bash
GET /api/admin/stats

# Should return:
- Total users
- Breakdown by role
- Prodi statistics
- System statistics
- Recent users
```

---

## ⚠️ Important Notes

1. **Admin Role Only**
   - Semua endpoint protected dengan role check
   - Hanya user dengan `role = "admin"` yang bisa akses

2. **Self-Protection**
   - Admin tidak bisa delete/deactivate diri sendiri
   - Prevent accidental lockout

3. **Cascade Delete**
   - Delete user akan cascade ke:
     - lecturers
     - students
     - staff_tu
     - laboratory_admins
     - Dan relasi lainnya

4. **Password Security**
   - Semua password di-hash dengan bcrypt
   - Salt rounds: 10

5. **Validation**
   - Username must be unique
   - Required fields validated
   - Role-specific data validated

---

## 🎯 Next Steps & Enhancements

### Planned Features
- [ ] Export users to Excel/CSV
- [ ] Import users from Excel
- [ ] Audit log for admin actions
- [ ] Email notification for new users
- [ ] Password strength meter
- [ ] Two-factor authentication for admin
- [ ] Advanced filtering (by prodi, date range, status)
- [ ] User activity monitoring
- [ ] Bulk edit users
- [ ] User groups/permissions

### Improvements
- [ ] Add user profile pictures
- [ ] Add user last login tracking
- [ ] Add user session management
- [ ] Add rate limiting for bulk operations
- [ ] Add confirmation emails
- [ ] Add password reset via email
- [ ] Add LDAP/SSO integration

---

## 📞 Support & Troubleshooting

### Common Issues

**Problem**: Cannot create user
**Solution**:
- Check all required fields
- Ensure username is unique
- Verify prodi_id exists (for dosen/mahasiswa/staff_tu)

**Problem**: Bulk operation fails
**Solution**:
- Check user IDs are valid
- Ensure action is supported
- Cannot delete yourself

**Problem**: Statistics not loading
**Solution**:
- Check database connection
- Verify admin permissions
- Check browser console for errors

---

## 📚 Related Documentation

- [Digital Signature Guide](DIGITAL_SIGNATURE_GUIDE.md)
- [Certificate System](CERTIFICATE_DIGITAL_SIGNATURE_INTEGRATION.md)
- [Seed Guide](docs/SEED_GUIDE.md)

---

**Version**: 1.0.0
**Last Updated**: 2025-01-23
**Role**: `admin` (dapat handle **SEMUA** sistem)

🎉 **Admin System untuk Management Terpusat - SIAP DIGUNAKAN!**
