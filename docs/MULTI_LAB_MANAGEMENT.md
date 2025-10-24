# 🧪 Multi-Lab Management System

## Overview

Sistem Multi-Lab Management memungkinkan setiap prodi/jurusan memiliki laboratorium masing-masing dengan admin lab tersendiri. Sistem ini mendukung:

- ✅ Multiple labs per prodi
- ✅ Multiple admins per lab
- ✅ One admin can manage multiple labs
- ✅ Lab assignment tracking
- ✅ Primary admin designation

---

## 📊 Database Schema Changes

### 1. **Tabel Baru: `laboratory_admins`**

Tabel relasi many-to-many antara users (role: laboratory_admin) dengan laboratories.

```prisma
model laboratory_admins {
  id             String        @id
  user_id        String
  laboratory_id  String
  assigned_at    DateTime      @default(now())
  assigned_by    String?       // ID admin yang assign
  is_primary     Boolean       @default(false)  // Primary admin for this lab
  laboratories   laboratories  @relation(...)
  users          users         @relation(...)

  @@unique([user_id, laboratory_id])
  @@index([user_id])
  @@index([laboratory_id])
}
```

**Fields:**
- `id`: Primary key
- `user_id`: Reference ke users (must have role: laboratory_admin)
- `laboratory_id`: Reference ke laboratories
- `assigned_at`: Timestamp kapan admin di-assign
- `assigned_by`: Siapa yang assign (admin/dekan)
- `is_primary`: Flag untuk primary/head admin lab tersebut

### 2. **Update Tabel: `laboratories`**

Tambah field `prodi_id` untuk relasi dengan prodi.

```prisma
model laboratories {
  // ... existing fields
  prodi_id            String?
  laboratory_admins   laboratory_admins[]
  prodi               prodi?  @relation(...)
}
```

### 3. **Update Tabel: `prodi`**

Tambah relasi ke laboratories.

```prisma
model prodi {
  kode          String          @id
  nama          String
  jenjang       String
  fakultas      String
  akreditasi    String?
  laboratories  laboratories[]  // New relation
}
```

### 4. **Update Tabel: `users`**

Tambah relasi ke laboratory_admins.

```prisma
model users {
  // ... existing fields
  laboratory_admins laboratory_admins[]
}
```

---

## 🎯 Use Cases

### Case 1: Assign Admin Lab ke Lab Tertentu

```typescript
// Admin/Dekan assign user sebagai admin lab
await prisma.laboratory_admins.create({
  data: {
    id: generateId(),
    user_id: "user_123",
    laboratory_id: "lab_if_01",
    assigned_by: "admin_id",
    is_primary: true
  }
})
```

### Case 2: Get All Labs yang Dikelola Admin

```typescript
// Get labs untuk admin lab tertentu
const adminLabs = await prisma.laboratory_admins.findMany({
  where: {
    user_id: currentUserId
  },
  include: {
    laboratories: {
      include: {
        prodi: true
      }
    }
  }
})
```

### Case 3: Get All Admins untuk Lab Tertentu

```typescript
// Get semua admin untuk lab tertentu
const labAdmins = await prisma.laboratory_admins.findMany({
  where: {
    laboratory_id: "lab_if_01"
  },
  include: {
    users: {
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true
      }
    }
  }
})
```

### Case 4: Get Labs per Prodi

```typescript
// Get semua lab untuk prodi Informatika
const prodiLabs = await prisma.laboratories.findMany({
  where: {
    prodi_id: "55201"  // Kode prodi Informatika
  },
  include: {
    laboratory_admins: {
      include: {
        users: true
      }
    }
  }
})
```

---

## 🔧 Implementation Steps

### Step 1: Run Migration

```bash
npx prisma migrate dev --name add_multi_lab_management
```

### Step 2: Seed Data (Optional)

Buat seed data untuk testing:

```typescript
// prisma/seeds/seed-lab-admins.ts
import { prisma } from '@/lib/prisma'

async function seedLabAdmins() {
  // Assign admin lab untuk Lab Informatika
  await prisma.laboratory_admins.create({
    data: {
      id: 'lab_admin_1',
      user_id: 'user_lab_admin_if',
      laboratory_id: 'lab_if_programming',
      is_primary: true
    }
  })

  // Assign admin lab untuk Lab Sipil
  await prisma.laboratory_admins.create({
    data: {
      id: 'lab_admin_2',
      user_id: 'user_lab_admin_sipil',
      laboratory_id: 'lab_sipil_struktur',
      is_primary: true
    }
  })
}
```

### Step 3: Create API Endpoints

#### a. Assign Lab Admin

```typescript
// app/api/admin/laboratory-admins/assign/route.ts
POST /api/admin/laboratory-admins/assign
Body: {
  userId: string,
  laboratoryId: string,
  isPrimary?: boolean
}
```

#### b. Get Labs for Admin

```typescript
// app/api/laboratory-admins/my-labs/route.ts
GET /api/laboratory-admins/my-labs
```

#### c. Get Admins for Lab

```typescript
// app/api/admin/laboratory-admins/[labId]/route.ts
GET /api/admin/laboratory-admins/[labId]
```

#### d. Remove Lab Admin

```typescript
// app/api/admin/laboratory-admins/remove/route.ts
DELETE /api/admin/laboratory-admins/remove
Body: {
  userId: string,
  laboratoryId: string
}
```

### Step 4: Update UI Components

#### a. Lab Selection for Admin Lab

```tsx
// components/laboratory/lab-selector.tsx
export function LabSelector() {
  const { user } = useAuth()
  const [selectedLab, setSelectedLab] = useState<string>()
  
  // Fetch labs untuk admin ini
  useEffect(() => {
    if (user?.role === 'laboratory_admin') {
      fetchMyLabs()
    }
  }, [user])
  
  return (
    <Select value={selectedLab} onValueChange={setSelectedLab}>
      <SelectTrigger>
        <SelectValue placeholder="Pilih Laboratorium" />
      </SelectTrigger>
      <SelectContent>
        {myLabs.map(lab => (
          <SelectItem key={lab.id} value={lab.id}>
            {lab.name} - {lab.prodi?.nama}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
```

#### b. Admin Lab Management (for Admin/Dekan)

```tsx
// app/dashboard/admin/laboratory-admins/page.tsx
export function LabAdminManagement() {
  return (
    <div>
      <h1>Manajemen Admin Laboratorium</h1>
      
      {/* Table: Lab → Admins */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lab</TableHead>
            <TableHead>Prodi</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Map labs and their admins */}
        </TableBody>
      </Table>
      
      {/* Assign Admin Form */}
      <AssignLabAdminDialog />
    </div>
  )
}
```

---

## 📝 Business Rules

### 1. **Assignment Rules**

- ✅ User harus punya role `laboratory_admin`
- ✅ Satu lab bisa punya multiple admins
- ✅ Satu admin bisa manage multiple labs
- ✅ Harus ada minimal 1 primary admin per lab
- ✅ Only admin/dekan yang bisa assign/unassign

### 2. **Access Control**

- ✅ Lab admin hanya bisa akses lab yang di-assign ke mereka
- ✅ Primary admin punya privilege lebih (bisa assign admin lain?)
- ✅ Admin/Dekan bisa manage semua lab admins

### 3. **Data Integrity**

- ✅ Cascade delete: Hapus user → hapus semua assignment
- ✅ Cascade delete: Hapus lab → hapus semua assignment
- ✅ Unique constraint: User tidak bisa di-assign ke lab yang sama 2x

---

## 🎨 UI/UX Considerations

### 1. **Lab Admin Dashboard**

Saat login sebagai lab admin, user harus pilih lab mana yang akan dikelola (jika manage > 1 lab).

```
┌─────────────────────────────────────┐
│ Pilih Laboratorium                  │
├─────────────────────────────────────┤
│ ○ Lab Pemrograman - Informatika     │
│ ○ Lab Jaringan - Informatika        │
│ ● Lab Basis Data - Informatika      │
└─────────────────────────────────────┘
        ↓
Dashboard Lab Basis Data
```

### 2. **Lab Filter by Prodi**

Admin bisa filter labs berdasarkan prodi:

```
[Filter Prodi: Informatika ▼]
  → Lab Pemrograman
  → Lab Jaringan
  → Lab Basis Data
  
[Filter Prodi: Sipil ▼]
  → Lab Struktur
  → Lab Beton
  → Lab Tanah
```

### 3. **Admin Assignment UI**

```
┌──────────────────────────────────────────┐
│ Assign Admin Lab                         │
├──────────────────────────────────────────┤
│ Lab: [Dropdown - semua labs]             │
│ Admin: [Dropdown - users role lab_admin] │
│ □ Set as Primary Admin                   │
│                                          │
│ [Cancel]  [Assign Admin]                 │
└──────────────────────────────────────────┘
```

---

## 🔐 Security & Permissions

### Middleware Check

```typescript
// lib/lab-admin-middleware.ts
export async function checkLabAccess(userId: string, labId: string) {
  const access = await prisma.laboratory_admins.findFirst({
    where: {
      user_id: userId,
      laboratory_id: labId
    }
  })
  
  if (!access) {
    throw new Error('Access denied to this laboratory')
  }
  
  return access
}
```

### API Protection

```typescript
// app/api/laboratory/[labId]/route.ts
export async function GET(req, { params }) {
  const { user } = await auth(req)
  
  // Check if user has access to this lab
  if (user.role === 'laboratory_admin') {
    await checkLabAccess(user.id, params.labId)
  }
  
  // ... proceed with request
}
```

---

## 📊 Example Data Structure

### Prodi → Labs → Admins

```
Informatika (55201)
├── Lab Pemrograman (lab_if_prog)
│   ├── Admin: Ahmad (Primary)
│   └── Admin: Budi
├── Lab Jaringan (lab_if_network)
│   └── Admin: Ahmad (Primary)
└── Lab Basis Data (lab_if_db)
    └── Admin: Citra (Primary)

Sipil (55202)
├── Lab Struktur (lab_sipil_struktur)
│   └── Admin: Dedi (Primary)
└── Lab Beton (lab_sipil_beton)
    └── Admin: Eka (Primary)
```

### Database Records

```json
// laboratory_admins
[
  {
    "id": "lab_admin_1",
    "user_id": "ahmad_id",
    "laboratory_id": "lab_if_prog",
    "is_primary": true
  },
  {
    "id": "lab_admin_2",
    "user_id": "budi_id",
    "laboratory_id": "lab_if_prog",
    "is_primary": false
  },
  {
    "id": "lab_admin_3",
    "user_id": "ahmad_id",
    "laboratory_id": "lab_if_network",
    "is_primary": true
  }
]
```

---

## 🚀 Next Steps

### Phase 1: Database & API ✅
- [x] Update schema
- [ ] Run migration
- [ ] Create API endpoints
- [ ] Add middleware

### Phase 2: UI Components
- [ ] Lab selector component
- [ ] Admin assignment dialog
- [ ] Lab admin management page
- [ ] Lab admin dashboard dengan filter

### Phase 3: Integration
- [ ] Update existing lab features
- [ ] Add access control
- [ ] Testing
- [ ] Documentation

---

## 📚 Related Files

- `prisma/schema.prisma` - Database schema
- `prisma/migrations/add_multi_lab_management/` - Migration files
- `app/api/admin/laboratory-admins/` - API endpoints (to be created)
- `components/laboratory/` - Lab components (to be created)
- `lib/lab-admin-middleware.ts` - Access control (to be created)

---

**Version:** 1.0.0  
**Last Updated:** October 2024  
**Status:** ✅ Schema Ready - Implementation Pending

