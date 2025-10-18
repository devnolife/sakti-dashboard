# 🔐 Admin Module - Quick Start Guide

## 📚 Table of Contents
- [Overview](#overview)
- [Quick Access](#quick-access)
- [Features](#features)
- [API Reference](#api-reference)
- [Components](#components)
- [Usage Examples](#usage-examples)

---

## 🎯 Overview

Admin Module memberikan kontrol penuh terhadap sistem SAKTI Dashboard. Admin memiliki **wildcard permission** (`*`) untuk mengakses semua fitur.

### Key Statistics
- **Total Users**: 3,124+
- **Active Sessions**: 234
- **Pending Approvals**: 47
- **System Models**: 28 database models

---

## 🚀 Quick Access

### Menu Navigation
```
Sidebar → Admin Control (Shield Icon)
├── Admin Dashboard       - Overview & statistics
├── User Management       - CRUD all users
├── System Config         - Application settings
├── Master Data          - Companies, categories, templates
├── System Monitoring    - Real-time tracking
├── Approval Override    - Emergency controls
└── Audit Logs          - Activity tracking
```

### Direct URLs
- Dashboard: `/dashboard/admin`
- Users: `/dashboard/admin/users`
- Config: `/dashboard/admin/config`
- Companies: `/dashboard/admin/companies`
- Monitoring: `/dashboard/admin/monitoring`
- Override: `/dashboard/admin/approval-override`
- Audit: `/dashboard/admin/audit-logs`

---

## ✨ Features

### 1. User Management (`/dashboard/admin/users`)

**Capabilities:**
- ✅ View all 3,124+ users
- ✅ Create new users (all roles)
- ✅ Edit user details
- ✅ Reset passwords
- ✅ Activate/Deactivate accounts
- ✅ Delete users
- ✅ Export to CSV/JSON
- ✅ Bulk import (planned)

**Supported Roles:**
```typescript
- admin                    // Full system access
- mahasiswa               // Students
- dosen                   // Lecturers
- staff_tu                // Academic staff
- prodi                   // Program head
- dekan                   // Dean
- admin_keuangan          // Finance admin
- admin_umum              // General admin
- laboratory_admin        // Lab admin
- reading_room_admin      // Library admin
- kepala_tata_usaha       // Admin head
```

**Usage:**
```tsx
import UserFormDialog from "@/components/admin/dialogs/user-form-dialog"

// Create new user
<UserFormDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  onSubmit={handleCreateUser}
/>

// Edit existing user
<UserFormDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  user={selectedUser}
  onSubmit={handleUpdateUser}
/>
```

---

### 2. System Configuration (`/dashboard/admin/config`)

**Categories:**

#### 🔐 Authentication
```typescript
{
  session_timeout: 86400,          // seconds (24h)
  password_min_length: 6,          // characters
  max_login_attempts: 5            // attempts
}
```

#### 🎓 Academic
```typescript
{
  current_semester: "Ganjil 2024/2025",
  kkp_min_credits: 110,            // SKS
  thesis_min_credits: 130          // SKS
}
```

#### 💰 Payment
```typescript
{
  late_fee_percentage: 10,         // %
  payment_deadline_days: 30        // days
}
```

#### 📚 Library
```typescript
{
  max_borrow_books: 3,             // books
  borrow_period_days: 14,          // days
  fine_per_day: 1000              // Rp
}
```

**API Call:**
```typescript
// Update config
await fetch('/api/admin/config', {
  method: 'PUT',
  body: JSON.stringify({
    key: 'academic.current_semester',
    value: 'Ganjil 2024/2025',
    category: 'academic'
  })
})
```

---

### 3. Master Data Management (`/dashboard/admin/companies`)

**Companies Management:**
```tsx
import CompanyFormDialog from "@/components/admin/dialogs/company-form-dialog"

<CompanyFormDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  company={selectedCompany}
  onSubmit={handleSaveCompany}
/>
```

**Book Categories:**
```tsx
import BookCategoryDialog from "@/components/admin/dialogs/book-category-dialog"

<BookCategoryDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  category={selectedCategory}
  onSubmit={handleSaveCategory}
/>
```

**Letter Types:**
```tsx
import LetterTypeDialog from "@/components/admin/dialogs/letter-type-dialog"

<LetterTypeDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  letterType={selectedType}
  onSubmit={handleSaveLetterType}
/>
```

---

### 4. System Monitoring (`/dashboard/admin/monitoring`)

**Real-time Metrics:**
- KKP Applications: 47 (12 pending)
- Exam Applications: 63 (18 pending)
- Payments: Rp 450M (45 overdue)
- Active Students: 2,845

**Tabs:**
- KKP Applications
- Exam Applications
- Payments

---

### 5. Approval Override (`/dashboard/admin/approval-override`)

⚠️ **Emergency Controls - Use with Caution**

**Supported Modules:**
```typescript
type Module = 'kkp' | 'exam' | 'letter' | 'payment'
```

**API Call:**
```typescript
await fetch('/api/admin/override', {
  method: 'POST',
  body: JSON.stringify({
    module: 'kkp',
    itemId: 'xxx',
    action: 'approve', // or 'reject'
    reason: 'Emergency approval due to...'
  })
})
```

**Important:**
- All override actions are logged
- Minimum 10 characters reason required
- Creates audit trail automatically

---

### 6. Audit Logs (`/dashboard/admin/audit-logs`)

**Tracked Actions:**
```typescript
type Action =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'APPROVE'
  | 'REJECT'
  | 'VERIFY'
  | 'LOGIN'
  | 'LOGOUT'
  | 'ADMIN_OVERRIDE'
```

**Log Information:**
- Timestamp
- User details
- Action type
- Resource type
- IP Address
- User Agent
- JSON details

**Export:**
```typescript
import { exportAuditLogs } from '@/lib/admin/export-utils'

exportAuditLogs(logs, 'csv') // or 'json'
```

---

## 📡 API Reference

### Statistics API
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

### User Management API
```typescript
// Get users
GET /api/users?page=1&limit=10&role=mahasiswa&search=john

// Create user
POST /api/users
Body: {
  nidn: "1234567890",
  name: "John Doe",
  role: "mahasiswa",
  password: "secret123",
  isActive: true
}

// Update user
PUT /api/users?id=xxx
Body: { name: "John Updated", isActive: false }

// Delete user
DELETE /api/users?id=xxx
```

### Config API
```typescript
// Get all configs
GET /api/admin/config?category=academic

// Update config
PUT /api/admin/config
Body: {
  key: "academic.current_semester",
  value: "Ganjil 2024/2025",
  category: "academic"
}
```

### Companies API
```typescript
// Get companies
GET /api/admin/companies?page=1&search=tech

// Create company
POST /api/admin/companies
Body: {
  name: "PT Tech Indonesia",
  city: "Jakarta",
  industry: "Technology",
  contactPerson: "John Manager",
  contactPhone: "+62812345678",
  // ... other fields
}

// Update company
PUT /api/admin/companies?id=xxx

// Delete company
DELETE /api/admin/companies?id=xxx
```

### Book Categories API
```typescript
// Get categories
GET /api/admin/book-categories

// Create category
POST /api/admin/book-categories
Body: {
  code: "CS",
  name: "Computer Science",
  description: "CS books..."
}

// Update category
PUT /api/admin/book-categories?id=xxx

// Delete category (only if no books)
DELETE /api/admin/book-categories?id=xxx
```

### Letter Types API
```typescript
// Get letter types
GET /api/admin/letter-types

// Create letter type
POST /api/admin/letter-types
Body: {
  title: "Surat Keterangan Aktif",
  description: "Certificate of active enrollment",
  approvalRole: "staff_tu",
  estimatedDays: 3,
  requiredDocuments: ["KTM", "KRS"]
}

// Update letter type
PUT /api/admin/letter-types?id=xxx

// Delete letter type (only if no requests)
DELETE /api/admin/letter-types?id=xxx
```

### Override API
```typescript
// Get pending approvals
GET /api/admin/override/pending?module=kkp

// Override approval
POST /api/admin/override
Body: {
  module: "kkp",
  itemId: "xxx",
  action: "approve",
  reason: "Emergency approval..."
}
```

---

## 🧩 Components

### Dialog Components
```typescript
// User Form
import UserFormDialog from "@/components/admin/dialogs/user-form-dialog"

// Company Form
import CompanyFormDialog from "@/components/admin/dialogs/company-form-dialog"

// Book Category Form
import BookCategoryDialog from "@/components/admin/dialogs/book-category-dialog"

// Letter Type Form
import LetterTypeDialog from "@/components/admin/dialogs/letter-type-dialog"
```

### Page Components
```typescript
// User Management
import UserManagement from "@/components/admin/users/user-management"

// System Config
import SystemConfig from "@/components/admin/config/system-config"

// Companies Management
import CompaniesManagement from "@/components/admin/companies/companies-management"

// Monitoring Dashboard
import MonitoringDashboard from "@/components/admin/monitoring/monitoring-dashboard"

// Approval Override
import ApprovalOverride from "@/components/admin/approval-override/approval-override"

// Audit Logs
import AuditLogs from "@/components/admin/audit-logs/audit-logs"
```

---

## 💡 Usage Examples

### Create New User
```typescript
const handleCreateUser = async (data: any) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      toast.success('User created successfully')
      refreshUsers()
    }
  } catch (error) {
    toast.error('Failed to create user')
  }
}
```

### Update System Config
```typescript
const updateConfig = async (key: string, value: string) => {
  await fetch('/api/admin/config', {
    method: 'PUT',
    body: JSON.stringify({ key, value })
  })
}

// Update current semester
await updateConfig('academic.current_semester', 'Ganjil 2024/2025')
```

### Export Data
```typescript
import {
  exportUsers,
  exportCompanies,
  exportAuditLogs
} from '@/lib/admin/export-utils'

// Export users to CSV
exportUsers(users, 'csv')

// Export companies to JSON
exportCompanies(companies, 'json')

// Export audit logs
exportAuditLogs(logs, 'csv')
```

### Admin Override
```typescript
const handleOverride = async (itemId: string, action: 'approve' | 'reject') => {
  const reason = prompt('Provide reason for override:')
  if (!reason || reason.length < 10) {
    alert('Reason must be at least 10 characters')
    return
  }

  await fetch('/api/admin/override', {
    method: 'POST',
    body: JSON.stringify({
      module: 'kkp',
      itemId,
      action,
      reason
    })
  })
}
```

---

## 🔒 Security Notes

1. **Admin Only**: All admin endpoints require admin role
2. **Audit Logging**: All critical actions are logged
3. **Permission Check**: Every API call validates permissions
4. **Override Warning**: Override actions show warning dialogs
5. **IP Tracking**: All actions tracked with IP address

---

## 📖 Additional Resources

- **Full Documentation**: See `ADMIN_MODULE_DOCS.md`
- **Database Schema**: See `prisma/schema.prisma`
- **API Middleware**: See `lib/auth-middleware.ts`
- **Menu Config**: See `lib/menu-config.ts`

---

## 🆘 Troubleshooting

### Common Issues

**Q: Cannot access admin pages**
A: Ensure your user has `role: "admin"` in database

**Q: API returns 403 Forbidden**
A: Check if user has admin permissions

**Q: Cannot delete category/letter type**
A: Ensure no related records exist (books, requests)

**Q: Override not working**
A: Provide reason with minimum 10 characters

---

## 📝 Quick Reference Card

```
ADMIN SHORTCUTS
===============

Users:          /dashboard/admin/users
Config:         /dashboard/admin/config
Companies:      /dashboard/admin/companies
Monitoring:     /dashboard/admin/monitoring
Override:       /dashboard/admin/approval-override
Audit Logs:     /dashboard/admin/audit-logs

API ENDPOINTS
=============

Statistics:     GET  /api/admin/statistics
Config:         PUT  /api/admin/config
Companies:      GET  /api/admin/companies
Override:       POST /api/admin/override
Book Category:  GET  /api/admin/book-categories
Letter Types:   GET  /api/admin/letter-types

PERMISSIONS
===========

Admin Role:     admin (wildcard: *)
Check:          hasPermission(role, '*')
Audit:          Auto-logged for all actions
```

---

**Last Updated**: 2025-01-18
**Version**: 1.0.0
**Maintained By**: SAKTI Dashboard Team
