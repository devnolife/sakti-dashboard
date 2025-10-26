# 🔄 Login Redirect Logic - Dosen Sub-Roles

Dokumentasi tentang bagaimana sistem mengarahkan user setelah login, khususnya untuk Dosen dengan sub-role leadership.

---

## 🎯 Konsep Dasar

### Role vs Sub-Role

Di sistem ini, **Dekan, Wakil Dekan, GKM, dan Kepala Prodi** adalah:
- ✅ **Role di database:** `dosen` 
- ✅ **Sub-role di database:** `dekan`, `wakil_dekan_1`, `gkm`, `prodi`, dll
- ✅ **Dashboard:** Punya dashboard khusus sendiri

**Kenapa?**
Karena mereka secara struktural adalah **Dosen yang memiliki posisi leadership**, bukan role yang terpisah.

---

## 🚀 Alur Redirect Setelah Login

### 1️⃣ User dengan Sub-Role Leadership

Ketika login, user **langsung diarahkan ke dashboard sub-role mereka**, bukan dashboard dosen.

| Username | Role | Sub-Role | Redirect Ke |
|----------|------|----------|-------------|
| `dekan` | `dosen` | `dekan` | `/dashboard/dekan` |
| `wd1` | `dosen` | `wakil_dekan_1` | `/dashboard/dosen/vice-dean-1` |
| `wd2` | `dosen` | `wakil_dekan_2` | `/dashboard/dosen/vice-dean-2` |
| `wd3` | `dosen` | `wakil_dekan_3` | `/dashboard/dosen/vice-dean-3` |
| `wd4` | `dosen` | `wakil_dekan_4` | `/dashboard/dosen/vice-dean-4` |
| `gkm` | `dosen` | `gkm` | `/dashboard/gkm` |
| `kaprodi_s1ti` | `dosen` | `prodi` | `/dashboard/prodi` |
| `sekprodi_s1ti` | `dosen` | `sekretaris_prodi` | `/dashboard/dosen` |
| `dosen001` | `dosen` | `dosen` | `/dashboard/dosen` |

### 2️⃣ User Regular (Non-Dosen)

User dengan role biasa langsung ke dashboard role mereka:

| Role | Redirect Ke |
|------|-------------|
| `admin` | `/dashboard/admin` |
| `mahasiswa` | `/dashboard/mahasiswa` |
| `staff_tu` | `/dashboard/staff_tu` |
| `admin_keuangan` | `/dashboard/admin_keuangan` |
| dll | `/dashboard/{role}` |

---

## 🔐 Access Control

### Allowed Paths per User

Sistem mengecek apakah user boleh mengakses path tertentu berdasarkan sub-role mereka:

#### Dekan
```typescript
✅ /dashboard/dekan
✅ /dashboard/dekan/*
❌ /dashboard/dosen (tidak perlu akses ke dashboard dosen biasa)
```

#### Wakil Dekan I-IV
```typescript
✅ /dashboard/dosen/vice-dean-1 (untuk WD1)
✅ /dashboard/dosen/vice-dean-2 (untuk WD2)
✅ /dashboard/dosen/vice-dean-3 (untuk WD3)
✅ /dashboard/dosen/vice-dean-4 (untuk WD4)
```

#### GKM
```typescript
✅ /dashboard/gkm
✅ /dashboard/gkm/*
```

#### Kepala Prodi
```typescript
✅ /dashboard/prodi
✅ /dashboard/prodi/*
```

#### Sekretaris Prodi
```typescript
✅ /dashboard/dosen
✅ /dashboard/dosen/* (akses dashboard dosen)
```

#### Dosen Reguler
```typescript
✅ /dashboard/dosen
✅ /dashboard/dosen/*
```

---

## 💡 Multi Sub-Role Support

User bisa memiliki **multiple sub-roles** (dipisah koma di database).

Contoh:
```sql
sub_role = "dekan,gkm,prodi"
```

### Primary Sub-Role
**Sub-role pertama** dalam list adalah yang digunakan untuk default redirect.

Contoh:
- `"dekan,dosen"` → Redirect ke `/dashboard/dekan`
- `"prodi,dosen"` → Redirect ke `/dashboard/prodi`
- `"dosen"` → Redirect ke `/dashboard/dosen`

### Switching Sub-Roles
User dengan multiple sub-roles bisa switch menggunakan **role switcher** di UI:
- Dekan bisa akses dashboard GKM jika punya sub-role `gkm`
- Kepala Prodi bisa akses dashboard Dosen jika punya sub-role `dosen`

---

## 🛠️ Implementasi Teknis

### File: `context/auth-context.tsx`

```typescript
// Login redirect logic
if (user.role === 'dosen' && user.subRole) {
  const primarySubRole = user.subRole.split(',')[0].trim()
  
  switch (primarySubRole) {
    case 'dekan':
      router.push('/dashboard/dekan')
      return
    case 'wakil_dekan_1':
      router.push('/dashboard/dosen/vice-dean-1')
      return
    // ... dll
  }
}
```

### Allowed Paths Logic

```typescript
// Check access
const allowedPaths: string[] = []

if (user.role === 'dosen' && user.subRole) {
  const userSubRoles = user.subRole.split(',').map(role => role.trim())
  
  userSubRoles.forEach(subRole => {
    switch (subRole) {
      case 'dekan':
        allowedPaths.push('/dashboard/dekan')
        break
      // ... dll
    }
  })
}
```

---

## 🧪 Testing

### Test Case 1: Login sebagai Dekan
```
Username: dekan
Password: password123
Expected: Redirect ke /dashboard/dekan
```

### Test Case 2: Login sebagai Wakil Dekan I
```
Username: wd1
Password: password123
Expected: Redirect ke /dashboard/dosen/vice-dean-1
```

### Test Case 3: Login sebagai Kepala Prodi
```
Username: kaprodi_s1ti
Password: password123
Expected: Redirect ke /dashboard/prodi
```

### Test Case 4: Login sebagai Dosen Reguler
```
Username: dosen001
Password: password123
Expected: Redirect ke /dashboard/dosen
```

### Test Case 5: Unauthorized Access
```
User: dosen001 (dosen reguler)
Tries to access: /dashboard/dekan
Expected: Redirect ke /dashboard/dosen
```

---

## 📝 Database Structure

### Table: users
```sql
{
  id: string
  username: string
  role: 'dosen' | 'admin' | 'mahasiswa' | ...
  sub_role: string | null  -- 'dekan', 'wakil_dekan_1', etc
}
```

### Example Data
```sql
-- Dekan
username: 'dekan'
role: 'dosen'
sub_role: 'dekan'

-- Wakil Dekan I
username: 'wd1'
role: 'dosen'
sub_role: 'wakil_dekan_1'

-- Kepala Prodi dengan akses dosen
username: 'kaprodi_s1ti'
role: 'dosen'
sub_role: 'prodi,dosen'
```

---

## 🔄 Update History

### Version 1.1 (Current)
- ✅ Auto redirect dosen leadership ke dashboard sub-role
- ✅ Support multiple sub-roles
- ✅ Primary sub-role detection
- ✅ Proper access control per sub-role

### Version 1.0 (Old - FIXED)
- ❌ Semua dosen redirect ke `/dashboard/dosen`
- ❌ Dekan tidak bisa akses `/dashboard/dekan`

---

## 🎯 Best Practices

1. **Primary Sub-Role First**: Taruh sub-role utama di posisi pertama
   ```sql
   sub_role: 'dekan,dosen'  ✅ Good
   sub_role: 'dosen,dekan'  ⚠️  Will redirect to dosen dashboard
   ```

2. **Single Sub-Role untuk Leadership**: Leadership roles biasanya hanya punya 1 sub-role
   ```sql
   dekan -> 'dekan'
   wd1 -> 'wakil_dekan_1'
   ```

3. **Multiple Sub-Roles untuk Staff**: Staff yang merangkap bisa punya multiple
   ```sql
   kaprodi -> 'prodi,dosen'  (bisa akses dashboard prodi dan dosen)
   ```

---

## 🐛 Troubleshooting

### Problem: User redirect ke dashboard yang salah

**Solusi:**
1. Cek `sub_role` di database
2. Pastikan sub_role ada di switch statement
3. Cek console log untuk melihat redirect path

### Problem: User tidak bisa akses dashboard tertentu

**Solusi:**
1. Cek apakah user punya sub_role yang sesuai
2. Pastikan path ada di `allowedPaths`
3. Cek di browser DevTools → Network untuk melihat redirect

### Problem: Redirect loop

**Solusi:**
1. Pastikan primary sub_role valid
2. Cek apakah dashboard page exist
3. Clear browser cache dan cookies

---

**Last Updated:** October 2025
**Version:** 1.1.0

