# 📚 ADMIN MODULE DOCUMENTATION

## 🎯 Overview
Dokumentasi lengkap untuk Admin Utama Module yang memberikan kontrol penuh terhadap sistem SAKTI Dashboard.

---

## 🔐 Admin Permissions

Admin memiliki **wildcard permission** (`*`) yang memberikan akses ke semua fitur sistem:

```typescript
// lib/auth-middleware.ts
const PERMISSIONS = {
  admin: ['*'], // Admin has all permissions
  // ... other roles
}
```

---

## 📂 Struktur File

### Pages (app/dashboard/admin/)
```
admin/
├── page.tsx                    # Main admin dashboard
├── users/
│   └── page.tsx               # User management
├── config/
│   └── page.tsx               # System configuration
├── companies/
│   └── page.tsx               # Master data management
├── monitoring/
│   └── page.tsx               # System monitoring
├── approval-override/
│   └── page.tsx               # Approval override
└── audit-logs/
    └── page.tsx               # Audit logs viewer
```

### Components (components/admin/)
```
admin/
├── users/
│   └── user-management.tsx
├── config/
│   └── system-config.tsx
├── companies/
│   └── companies-management.tsx
├── monitoring/
│   └── monitoring-dashboard.tsx
├── approval-override/
│   └── approval-override.tsx
└── audit-logs/
    └── audit-logs.tsx
```

### API Routes (app/api/admin/)
```
admin/
├── statistics/
│   └── route.ts              # System statistics
├── config/
│   └── route.ts              # System config CRUD
├── companies/
│   └── route.ts              # Companies CRUD
└── override/
    └── route.ts              # Approval override
```

---

## 🎨 Fitur Admin Module

### 1. **Admin Dashboard** (`/dashboard/admin`)
Dashboard utama dengan overview sistem.

**Features:**
- Total users statistics
- Pending approvals count
- Active sessions monitoring
- System health status
- Quick access cards ke semua modul
- Recent activity feed

**Statistics Displayed:**
- Total Users: 3,124
- Pending Approvals: 47
- Active Sessions: 234
- System Health: Healthy

---

### 2. **User Management** (`/dashboard/admin/users`)
Manajemen lengkap semua users di sistem.

**Features:**
- ✅ View all users dengan filtering & search
- ✅ Filter by role (mahasiswa, dosen, staff, admin, dll)
- ✅ Create new users
- ✅ Edit user details
- ✅ Reset password
- ✅ Activate/Deactivate accounts
- ✅ Delete users
- ✅ Bulk operations (import/export)

**User Roles Supported:**
- Admin
- Mahasiswa
- Dosen
- Staff TU
- Prodi
- Dekan
- Admin Keuangan
- Admin Umum
- Laboratory Admin
- Reading Room Admin
- Kepala Tata Usaha

**Statistics:**
- Total Users: 3,124
- Active Users: 2,987 (95.6%)
- Inactive Users: 137 (4.4%)
- New This Month: 234 (+18%)

---

### 3. **System Configuration** (`/dashboard/admin/config`)
Konfigurasi parameter sistem secara realtime.

**Configuration Categories:**

#### 🔐 **Authentication Settings**
- Session Timeout: 86400s (24 hours)
- Minimum Password Length: 6 characters
- Maximum Login Attempts: 5 attempts

#### 🎓 **Academic Settings**
- Current Semester: "Ganjil 2024/2025"
- Minimum Credits for KKP: 110 SKS
- Minimum Credits for Thesis: 130 SKS

#### 💰 **Payment Settings**
- Late Payment Fee: 10%
- Payment Deadline: 30 days

#### 📚 **Library Settings**
- Max Books Per Student: 3 books
- Borrow Period: 14 days
- Fine Per Day: Rp 1,000

#### 🔔 **Notification Settings**
- Email Notifications: Enabled
- SMS Notifications: Disabled

#### 📤 **Upload Settings**
- Max File Size: 10 MB
- Allowed Extensions: pdf,doc,docx,jpg,jpeg,png

#### 🏢 **Faculty Information**
- Faculty Name: Fakultas Teknik
- University: Universitas Sriwijaya
- Address: Jl. Raya Palembang - Prabumulih Km. 32
- Phone: +62711580069
- Email: ft@unsri.ac.id
- Website: https://ft.unsri.ac.id

---

### 4. **Master Data Management** (`/dashboard/admin/companies`)
Manajemen data master sistem.

**Tabs:**

#### 🏢 **Companies Management**
Perusahaan partner untuk KKP mahasiswa.

**Features:**
- CRUD companies
- Search & filter
- Track active/inactive status
- View KKP applications count per company

**Fields:**
- Company Name
- City & Province
- Industry
- Contact Person & Phone
- Email & Website
- Logo
- Status (Active/Inactive)

#### 📚 **Book Categories**
Kategori buku perpustakaan.

**Features:**
- CRUD book categories
- Track books count per category
- Code & Name management

**Example:**
- CS - Computer Science (234 books)
- EE - Electrical Engineering (187 books)
- ME - Mechanical Engineering (156 books)

#### 📄 **Letter Types**
Template surat yang tersedia.

**Features:**
- CRUD letter types
- Configure approval role
- Manage templates
- Active/Inactive status

**Example:**
- Surat Keterangan Aktif Kuliah (Staff TU)
- Surat Rekomendasi (Dekan)
- Surat Izin Penelitian (Prodi)

---

### 5. **System Monitoring** (`/dashboard/admin/monitoring`)
Monitoring aktivitas sistem realtime.

**Overview Statistics:**
- KKP Applications: 47 total (12 pending, 28 approved)
- Exam Applications: 63 total (18 pending, 35 scheduled)
- Payments: Rp 450M (2,345 paid, 45 overdue)
- Active Students: 2,845 (+12%)

**Monitoring Tabs:**

#### 📋 **KKP Applications**
Monitor semua pengajuan KKP.

**Columns:**
- Student Name
- KKP Title
- Company
- Status (Pending/Approved/Rejected)
- Submission Date

#### 🎓 **Exam Applications**
Monitor pendaftaran ujian.

**Columns:**
- Student Name
- Exam Type (Proposal/Final)
- Thesis Title
- Status (Pending/Scheduled/Completed)
- Exam Date

#### 💳 **Payments**
Monitor transaksi pembayaran.

**Columns:**
- Student Name
- Amount
- Category (Tuition/Exam/KKP/Other)
- Status (Pending/Completed/Failed)
- Due Date

---

### 6. **Approval Override** (`/dashboard/admin/approval-override`)
⚠️ **Emergency approval controls** - Use with caution!

**Features:**
- Override normal approval workflow
- Force approve/reject any pending request
- All actions are audited and logged
- Requires detailed reason for override

**Supported Modules:**
- KKP Applications
- Exam Applications
- Letter Requests
- Payment Verifications

**Warning:**
```
⚠️ Admin Override Powers
This feature allows you to bypass normal approval workflows.
All override actions are logged and audited.
Use only in emergency situations or when normal workflow cannot proceed.
```

**Override Process:**
1. Select pending item
2. Choose action (Approve/Reject)
3. Provide detailed reason (minimum 10 characters)
4. Confirm action
5. Automatic audit log created

**Statistics:**
- Total Pending: 47
- KKP Approvals: 12
- Exam Approvals: 18
- Other Approvals: 17

---

### 7. **Audit Logs** (`/dashboard/admin/audit-logs`)
Tracking lengkap semua aktivitas sistem.

**Features:**
- View all user actions
- Filter by action type
- Search by user/resource
- Export logs
- Detailed information per action

**Tracked Actions:**
- CREATE - New records created
- UPDATE - Records modified
- DELETE - Records deleted
- APPROVE - Approvals granted
- REJECT - Requests rejected
- VERIFY - Verifications performed
- LOGIN - User logins
- LOGOUT - User logouts
- ADMIN_OVERRIDE - Admin override actions

**Log Information:**
- Timestamp
- User Name & ID
- Action Type (badge colored)
- Resource Type
- Details (JSON)
- IP Address
- User Agent

**Statistics:**
- Total Actions: 15,234 (all time)
- Today: 234 activities
- Active Users (24h): 89
- Critical Actions: 12 (deletes & overrides)

---

## 🔌 API Endpoints

### 1. **Statistics API**
```typescript
GET /api/admin/statistics

Response:
{
  users: {
    total: 3124,
    active: 2987,
    inactive: 137
  },
  breakdown: {
    students: 2845,
    lecturers: 142,
    staff: 137
  },
  pendingApprovals: {
    kkp: 12,
    exams: 28,
    payments: 7,
    total: 47
  },
  activeSessions: 234
}
```

### 2. **Config API**
```typescript
GET /api/admin/config?category=academic
PUT /api/admin/config

Body:
{
  key: "academic.current_semester",
  value: "Ganjil 2024/2025",
  description: "Current active semester",
  category: "academic"
}
```

### 3. **Override API**
```typescript
POST /api/admin/override

Body:
{
  module: "kkp" | "exam" | "letter" | "payment",
  itemId: "xxx",
  action: "approve" | "reject",
  reason: "Detailed reason..."
}

GET /api/admin/override/pending?module=kkp
```

### 4. **Companies API**
```typescript
GET /api/admin/companies?page=1&limit=20&search=tech
POST /api/admin/companies
PUT /api/admin/companies?id=xxx
DELETE /api/admin/companies?id=xxx

Body:
{
  name: "PT Tech Indonesia",
  city: "Jakarta",
  industry: "Technology",
  contactPerson: "John Manager",
  contactPhone: "+62812345678",
  ...
}
```

---

## 🔒 Security & Permissions

### Admin-Only Middleware
Semua endpoint admin dilindungi dengan middleware:

```typescript
const token = await authMiddleware(request)
if (token instanceof NextResponse) return token

if (!hasPermission(token.role as string, '*')) {
  return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
}
```

### Audit Logging
Setiap tindakan admin dicatat:

```typescript
await prisma.auditLog.create({
  data: {
    userId: token.sub!,
    action: 'CREATE',
    resource: 'User',
    details: { ... },
    ipAddress: request.ip,
    userAgent: request.headers.get('user-agent')
  }
})
```

---

## 🎯 Area Kontrol Admin

### 1. **User & Access Management** ⭐⭐⭐
- CRUD semua users (all roles)
- Role & sub-role assignment
- Account activation/deactivation
- Password reset
- Bulk operations

### 2. **Academic Management**
- KKP applications monitoring & override
- Exam applications control
- Thesis titles & archive
- Course & grade management
- Schedule configuration

### 3. **Financial Management**
- Payment verification & override
- Budget allocation & tracking
- Fee configuration
- Payment reports

### 4. **Administrative**
- Letter request approval override
- Document verification
- Template management

### 5. **Library Management**
- Book catalog CRUD
- Book categories management
- Borrowing rules configuration
- Fine settings

### 6. **Laboratory Management**
- Equipment management
- Schedule configuration
- Assistant management

### 7. **System Configuration** ⭐⭐⭐
- All system parameters
- Authentication settings
- Academic rules
- Payment settings
- Library settings
- Notification preferences
- Upload limits
- Faculty information

### 8. **Monitoring & Audit** ⭐⭐⭐
- Real-time activity monitoring
- Audit log viewing
- Statistics & analytics
- System health tracking

### 9. **Master Data**
- Companies (KKP partners)
- Book categories
- Letter types & templates
- Course catalog

---

## 📊 Database Models Managed

Admin memiliki akses penuh ke:

✅ **Users & Profiles**
- User, Student, Lecturer, Staff
- Session, Account

✅ **Academic**
- KkpApplication, KkpDocument, KkpApproval
- ExamApplication, ExamCommittee, ExamDocument
- ThesisTitle, ThesisReview, ThesisArchive
- Course, Grade, CourseSchedule

✅ **Financial**
- Payment, PaymentItem
- Budget, BudgetAllocation, Expense

✅ **Administrative**
- LetterRequest, LetterType, LetterAttachment
- FileUpload

✅ **Library**
- Book, BookCategory, BookBorrowing

✅ **System**
- SystemConfig
- AuditLog
- Notification

✅ **Master Data**
- Company

---

## 🚀 Usage Guide

### Accessing Admin Module
1. Login sebagai user dengan role `admin`
2. Navigate to sidebar menu "Admin Control"
3. Access sub-menu sesuai kebutuhan

### Menu Navigation
```
Admin Control (Shield icon)
├── Admin Dashboard
├── User Management
├── System Config
├── Master Data
├── System Monitoring
├── Approval Override
└── Audit Logs
```

### Common Tasks

#### Create New User
1. Go to User Management
2. Click "Add New User"
3. Fill form (NIDN, name, role, password)
4. Submit

#### Update System Config
1. Go to System Config
2. Select category tab
3. Modify values
4. Click "Save Changes"

#### Override Approval
1. Go to Approval Override
2. Filter by module if needed
3. Click Approve/Reject on item
4. Provide detailed reason
5. Confirm action

#### View Audit Logs
1. Go to Audit Logs
2. Use search or filter
3. View detailed log entries
4. Export if needed

---

## ⚠️ Important Notes

1. **Admin Override** - Use with caution, all actions are logged
2. **System Config** - Changes affect entire system immediately
3. **User Management** - Deactivating users will lock their accounts
4. **Audit Logs** - Cannot be deleted, permanent record
5. **Master Data** - Deleting may affect related records

---

## 🔄 Future Enhancements

Potential improvements:
- [ ] Bulk user import from CSV/Excel
- [ ] Advanced analytics dashboard
- [ ] System backup & restore
- [ ] Role permission customization UI
- [ ] Notification broadcast to all users
- [ ] System maintenance mode toggle
- [ ] API rate limiting configuration
- [ ] Multi-language support config

---

## 📝 Change Log

### Version 1.0.0 (Current)
- ✅ Complete admin dashboard
- ✅ User management CRUD
- ✅ System configuration UI
- ✅ Master data management
- ✅ Monitoring dashboards
- ✅ Approval override system
- ✅ Audit logs viewer
- ✅ API endpoints
- ✅ Permission system

---

## 👨‍💻 Developer Notes

### Adding New System Config
```typescript
// Add to prisma/seeds/system.ts
{
  key: 'category.setting_name',
  value: 'default_value',
  description: 'Description',
  category: 'category'
}
```

### Creating New Admin Page
1. Create page in `app/dashboard/admin/[feature]/page.tsx`
2. Create component in `components/admin/[feature]/`
3. Add API route in `app/api/admin/[feature]/route.ts`
4. Update menu in `lib/menu-config.ts`

### Permission Check Pattern
```typescript
if (!hasPermission(token.role as string, '*')) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

---

**Dokumen dibuat untuk SAKTI Dashboard - Admin Module v1.0**
