# 🎯 Admin Comprehensive System Guide

## Overview

Admin dalam sistem ini **bukan hanya CRUD user**, tapi **mengatur dan mengontrol SEMUA aspek operasional aplikasi** secara end-to-end.

---

## 🏗️ Arsitektur Admin System

### 1. **System Configuration Management**
**Path**: `/api/admin/system-config`

Admin dapat mengatur semua konfigurasi sistem secara dinamis tanpa perlu deploy ulang:

#### **Fitur**:
- ✅ **General Settings** - Nama aplikasi, logo, timezone, bahasa default
- ✅ **Academic Settings** - Tahun akademik, semester, batas SKS
- ✅ **Payment Settings** - Gateway config, biaya admin, metode pembayaran
- ✅ **Library Settings** - Durasi pinjam, denda, quota
- ✅ **Notification Settings** - SMTP config, push notification keys
- ✅ **Integration Settings** - API endpoints, auth tokens

#### **API Endpoints**:
```typescript
GET    /api/admin/system-config?category=academic
POST   /api/admin/system-config
PUT    /api/admin/system-config?key=academic_max_sks
DELETE /api/admin/system-config?key=old_config
```

#### **Data Structure**:
```typescript
{
  id: string
  key: string (unique)
  value: string
  description: string
  category: 'general' | 'academic' | 'payment' | 'library' | 'notification' | 'integration'
  updated_at: Date
}
```

#### **Usage Example**:
```typescript
// Create/Update config
POST /api/admin/system-config
{
  "key": "academic_max_sks_per_semester",
  "value": "24",
  "description": "Maximum SKS mahasiswa dapat ambil per semester",
  "category": "academic"
}

// Get all academic configs
GET /api/admin/system-config?category=academic

// Update specific config
PUT /api/admin/system-config?key=academic_max_sks_per_semester
{
  "value": "26"
}
```

---

### 2. **Master Data Management**
**Path**: `/api/admin/master-data/*`

Admin mengatur semua data master yang menjadi dasar operasional sistem.

#### **A. Program Studi Management**
**Endpoint**: `/api/admin/master-data/prodi`

```typescript
// Create prodi
POST /api/admin/master-data/prodi
{
  "kode": "D3TI",
  "nama": "D3 Teknik Informatika",
  "jenjang": "D3",
  "fakultas": "Fakultas Teknik",
  "akreditasi": "A"
}

// Update prodi
PUT /api/admin/master-data/prodi?kode=D3TI
{
  "akreditasi": "Unggul"
}

// Get all prodi
GET /api/admin/master-data/prodi?fakultas=Fakultas%20Teknik

// Delete prodi
DELETE /api/admin/master-data/prodi?kode=OLD_PRODI
```

#### **B. Department Management**
**Endpoint**: `/api/admin/master-data/departments`

```typescript
// Create department
POST /api/admin/master-data/departments
{
  "code": "DEPT_TI",
  "name": "Departemen Teknik Informatika",
  "faculty": "Fakultas Teknik",
  "head_id": "lecturer_id_xxx",
  "is_active": true
}
```

#### **C. Category Management**
Admin dapat membuat kategori untuk:
- Buku perpustakaan
- Jenis dokumen
- Tipe surat
- Kategori pembayaran
- dll.

---

### 3. **Approval Workflow Management**
**Path**: `/api/admin/workflows`

Admin dapat **konfigurasi alur persetujuan** untuk setiap proses bisnis tanpa coding.

#### **Workflow Types**:
- `kkp` - Kerja Praktek
- `exam` - Ujian (Proposal, Hasil, Tutup)
- `letter` - Pengajuan Surat
- `payment` - Verifikasi Pembayaran

#### **Workflow Structure**:
```typescript
{
  name: "KKP Regular Workflow",
  type: "kkp",
  steps: [
    {
      order: 1,
      role: "prodi",
      required: true,
      timeout_hours: 48
    },
    {
      order: 2,
      role: "dekan",
      required: true,
      auto_approve_conditions: {
        "student.gpa": { gte: 3.5 }
      },
      timeout_hours: 72
    }
  ],
  is_active: true
}
```

#### **API Usage**:
```typescript
// Create workflow
POST /api/admin/workflows
{
  "name": "Exam Proposal Fast Track",
  "type": "exam",
  "steps": [
    { "order": 1, "role": "prodi", "required": true },
    { "order": 2, "role": "staff_tu", "required": true }
  ],
  "is_active": true
}

// Get all workflows
GET /api/admin/workflows?type=kkp

// Update workflow
PUT /api/admin/workflows?key=workflow_kkp_1234
{
  "steps": [...updated_steps]
}
```

---

### 4. **Notification Management**
**Path**: `/api/admin/notifications/templates`

Admin mengatur **semua template notifikasi** untuk email, push, dan SMS.

#### **Template Structure**:
```typescript
{
  name: "KKP Approved Email",
  type: "email",
  event: "kkp_approved",
  subject: "KKP Anda Telah Disetujui - {{student_name}}",
  body: `
    Halo {{student_name}},
    
    Selamat! Pengajuan KKP Anda telah disetujui.
    
    Detail:
    - Judul: {{kkp_title}}
    - Perusahaan: {{company_name}}
    - Tanggal Mulai: {{start_date}}
    
    Silakan cek dashboard untuk informasi lebih lanjut.
  `,
  variables: ["student_name", "kkp_title", "company_name", "start_date"],
  is_active: true
}
```

#### **API Usage**:
```typescript
// Create notification template
POST /api/admin/notifications/templates
{
  "name": "Payment Reminder",
  "type": "email",
  "event": "payment_due",
  "subject": "Tagihan Pembayaran - {{amount}}",
  "body": "Template content with {{variables}}",
  "variables": ["student_name", "amount", "due_date"],
  "is_active": true
}

// Get templates by type
GET /api/admin/notifications/templates?type=email&event=kkp_approved

// Update template
PUT /api/admin/notifications/templates?key=notif_template_xxx
```

---

### 5. **Document Template Management**
**Path**: `/api/admin/document-templates`

Admin mengatur **template dokumen** untuk surat, sertifikat, dan laporan.

#### **Template Types**:
- `letter` - Surat-surat resmi
- `certificate` - Sertifikat
- `report` - Laporan

#### **Template Structure**:
```typescript
{
  name: "Surat Keterangan Mahasiswa Aktif",
  type: "letter",
  category: "academic",
  file_url: "https://storage.com/templates/surat_aktif.docx",
  variables: [
    "student_name",
    "student_nim",
    "student_prodi",
    "current_semester",
    "issue_date",
    "letter_number"
  ],
  description: "Template untuk surat keterangan mahasiswa aktif",
  is_active: true
}
```

#### **API Usage**:
```typescript
// Create template
POST /api/admin/document-templates
{
  "name": "Certificate of Completion",
  "type": "certificate",
  "category": "lab",
  "file_url": "https://...",
  "variables": ["student_name", "lab_name", "completion_date"],
  "is_active": true
}

// Get templates by type
GET /api/admin/document-templates?type=letter&category=academic

// Generate document from template
POST /api/admin/document-templates/generate
{
  "template_key": "doc_template_xxx",
  "data": {
    "student_name": "John Doe",
    "student_nim": "1234567",
    ...
  }
}
```

---

### 6. **Academic Calendar Management**
**Path**: `/api/admin/academic-calendar`

Admin mengatur **kalender akademik** untuk mengontrol periode akademik.

#### **Structure**:
```typescript
{
  year: "2024/2025",
  semester: "ganjil",
  start_date: "2024-08-01",
  end_date: "2024-12-31",
  is_active: true,
  registration_start: "2024-07-15",
  registration_end: "2024-07-31",
  exam_start: "2024-12-01",
  exam_end: "2024-12-20"
}
```

#### **API Usage**:
```typescript
// Create academic year
POST /api/admin/academic-calendar
{
  "year": "2024/2025",
  "semester": "ganjil",
  "start_date": "2024-08-01",
  "end_date": "2024-12-31",
  "is_active": true,
  "registration_start": "2024-07-15",
  "registration_end": "2024-07-31"
}

// Get active academic year
GET /api/admin/academic-calendar?is_active=true

// Set academic year as active (deactivate others)
PUT /api/admin/academic-calendar?key=academic_year_2024_ganjil
{
  "is_active": true  // This will deactivate all others
}
```

---

### 7. **Integration Management**
**Path**: `/api/admin/integrations`

Admin mengatur **semua integrasi external** tanpa perlu akses ke code.

#### **Integration Types**:
- `graphql` - GraphQL APIs (SIMAK, etc)
- `rest` - REST APIs
- `soap` - SOAP Web Services

#### **Structure**:
```typescript
{
  name: "SIMAK GraphQL Integration",
  type: "graphql",
  endpoint: "https://simak.example.com/graphql",
  auth_type: "bearer",
  credentials: {
    "token": "Bearer eyJxxxxx..."
  },
  sync_enabled: true,
  sync_interval: 3600, // seconds
  last_sync: "2024-01-15T10:30:00Z",
  is_active: true
}
```

#### **API Usage**:
```typescript
// Create integration
POST /api/admin/integrations
{
  "name": "Payment Gateway",
  "type": "rest",
  "endpoint": "https://payment-api.com/v1",
  "auth_type": "api_key",
  "credentials": {
    "api_key": "sk_live_xxx"
  },
  "sync_enabled": false,
  "is_active": true
}

// Test integration connection
PATCH /api/admin/integrations?key=integration_xxx&action=test

// Trigger manual sync
PATCH /api/admin/integrations?key=integration_xxx&action=sync

// Get all integrations
GET /api/admin/integrations?type=graphql&is_active=true
```

---

## 📊 Comprehensive Admin Dashboard

### **Dashboard Features**:

#### **1. System Overview**
- Total configurations
- Active users
- System alerts
- API call statistics

#### **2. Tabs Navigation**:

##### **System Tab**:
- System Configuration
- Master Data Management
- User Management

##### **Academic Tab**:
- Academic Calendar
- Approval Workflows
- Course Management

##### **Operations Tab**:
- Notification Management
- Document Templates
- Backup & Recovery

##### **Integrations Tab**:
- API Integrations
- Sync Management
- API Documentation

##### **Monitoring Tab**:
- System Monitoring (CPU, Memory, Disk)
- Audit Logs
- Analytics & Reports

#### **3. Quick Actions**:
- Add User
- Edit Config
- Backup Now
- View Logs
- Monitor System
- Override Approval

---

## 🔐 Security & Permissions

### **Admin Permissions**:
```typescript
const adminPermissions = {
  // Full CRUD on everything
  system_config: ['create', 'read', 'update', 'delete'],
  master_data: ['create', 'read', 'update', 'delete'],
  workflows: ['create', 'read', 'update', 'delete'],
  notifications: ['create', 'read', 'update', 'delete'],
  document_templates: ['create', 'read', 'update', 'delete'],
  academic_config: ['create', 'read', 'update', 'delete'],
  integrations: ['create', 'read', 'update', 'delete'],
  users: ['create', 'read', 'update', 'delete'],
  audit_logs: ['read'],
  reports: ['read', 'export'],
  backup: ['create', 'restore'],
  override: ['approve', 'reject'] // Emergency override
}
```

### **Audit Logging**:
Semua aksi admin **dicatat** secara otomatis:
```typescript
{
  user_id: "admin_xxx",
  action: "update_system_config",
  resource: "system_config",
  details: {
    key: "academic_max_sks",
    oldValue: "24",
    newValue: "26"
  },
  ip_address: "192.168.1.1",
  user_agent: "Mozilla/5.0...",
  created_at: "2024-01-15T10:30:00Z"
}
```

---

## 🚀 Usage Scenarios

### **Scenario 1: Mengubah Alur Approval KKP**
```typescript
// Admin login ke dashboard
// Navigate to: Academic > Approval Workflows
// Edit workflow "KKP Regular"

PUT /api/admin/workflows?key=workflow_kkp_regular
{
  "steps": [
    { "order": 1, "role": "prodi", "required": true, "timeout_hours": 24 },
    { "order": 2, "role": "wakil_dekan_1", "required": true, "timeout_hours": 48 }
  ]
}

// ✅ Semua KKP baru akan follow alur baru ini
// ✅ Tidak perlu deploy code
// ✅ Logged di audit trail
```

### **Scenario 2: Menambah Template Notifikasi Baru**
```typescript
// Navigate to: Operations > Notifications

POST /api/admin/notifications/templates
{
  "name": "Exam Schedule Released",
  "type": "email",
  "event": "exam_schedule_released",
  "subject": "Jadwal Ujian {{exam_type}} Telah Dirilis",
  "body": "Mahasiswa {{student_name}},\n\nJadwal ujian {{exam_type}} telah dirilis...",
  "variables": ["student_name", "exam_type", "exam_date", "location"],
  "is_active": true
}

// ✅ System akan otomatis kirim email dengan template ini
// ✅ Template bisa diubah kapan saja tanpa coding
```

### **Scenario 3: Setup Integrasi Baru**
```typescript
// Navigate to: Integrations > API Integrations

POST /api/admin/integrations
{
  "name": "New Payment Gateway",
  "type": "rest",
  "endpoint": "https://new-payment.com/api/v2",
  "auth_type": "bearer",
  "credentials": {
    "token": "Bearer xxx..."
  },
  "sync_enabled": false,
  "is_active": false  // Test dulu
}

// Test connection
PATCH /api/admin/integrations?key=integration_xxx&action=test

// Kalau sukses, activate
PUT /api/admin/integrations?key=integration_xxx
{
  "is_active": true
}

// ✅ System langsung bisa pakai gateway baru
// ✅ Old gateway still active (fallback)
```

---

## 📈 Benefits

### **1. Zero-Downtime Configuration**
Admin bisa mengubah **semua aspek sistem** tanpa:
- ❌ Deploy ulang
- ❌ Restart server
- ❌ Akses ke code
- ❌ Developer involvement

### **2. Complete Control**
Admin memiliki kontrol penuh atas:
- ✅ System behavior
- ✅ Business workflows
- ✅ User notifications
- ✅ Document generation
- ✅ External integrations
- ✅ Academic calendar
- ✅ Master data

### **3. Transparency & Accountability**
Semua aksi admin:
- ✅ Logged dengan detail lengkap
- ✅ Traceable (who, what, when, where)
- ✅ Auditable untuk compliance
- ✅ Revertable (bisa rollback)

### **4. Scalability**
System dirancang untuk:
- ✅ Handle multiple configs
- ✅ Support complex workflows
- ✅ Manage many integrations
- ✅ Scale dengan pertumbuhan user

---

## 🎯 Summary

**Admin bukan sekadar "user manager"**, tapi **System Administrator** yang:
1. **Mengkonfigurasi** semua aspek sistem
2. **Mengatur** alur bisnis dan workflow
3. **Mengelola** master data dan templates
4. **Monitoring** sistem real-time
5. **Mengintegrasikan** dengan system external
6. **Membuat keputusan** kritis (override approvals)
7. **Membackup & restore** data
8. **Menganalisis** performa sistem

**Semua dalam satu dashboard** yang powerful, user-friendly, dan comprehensive! 🚀

