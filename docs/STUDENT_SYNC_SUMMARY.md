# Student GraphQL Data Sync - Implementation Summary

## 🎯 Tujuan

Mengimplementasikan fitur auto-sync data mahasiswa dari GraphQL API setelah login, menyimpan data ke database lokal, dan menyediakan interface untuk mengakses data tersebut.

## ✅ Fitur yang Diimplementasikan

### 1. Auto-Sync Saat Login
- Data mahasiswa otomatis diambil dari GraphQL setelah login berhasil
- Tidak mengganggu proses login (error di-handle gracefully)
- Log sync berhasil/gagal untuk debugging

### 2. GraphQL Query
Updated query untuk mengambil data lengkap:
- Data pribadi mahasiswa
- Data orang tua (ayah)
- Data KHS (Kartu Hasil Studi)
- Data dosen pembimbing akademik
- Data program studi

### 3. Data Sync Logic
Mapping data GraphQL ke Prisma schema:
- Update data mahasiswa di table `students`
- Sync data dosen pembimbing
- Sync data program studi
- Store data orang tua di field JSON

### 4. API Endpoints
**GET** `/api/student/sync`
- Retrieve current profile
- Add `?sync=true` untuk force sync dari GraphQL

**POST** `/api/student/sync`
- Force sync dengan NIM tertentu
- Support untuk admin sync student lain

### 5. React Hook
`useStudentProfile()` hook dengan fitur:
- Auto-fetch on mount
- Manual sync trigger
- Auto-sync interval
- Loading & error states
- Last sync timestamp

### 6. UI Component
`StudentProfileCard` - Ready-to-use component untuk menampilkan:
- Info akademik
- IPK
- Data dosen PA
- Data orang tua
- Refresh button

## 📁 Files Created/Modified

### Created Files ✨
1. `lib/graphql/sync-student-data.ts` - Core sync logic
2. `app/api/student/sync/route.ts` - API endpoints
3. `hooks/use-student-profile.tsx` - React hook
4. `components/student/student-profile-card.tsx` - UI component
5. `docs/STUDENT_SYNC_GUIDE.md` - Comprehensive documentation
6. `docs/STUDENT_SYNC_SUMMARY.md` - This file

### Modified Files 🔧
1. `lib/graphql/queries.ts` - Updated GraphQL query & types
2. `lib/auth.ts` - Integrated auto-sync on login

## 🚀 Quick Start

### Untuk Mahasiswa (Frontend)

```typescript
import { StudentProfileCard } from '@/components/student/student-profile-card'

function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <StudentProfileCard />
    </div>
  )
}
```

### Manual Sync (Advanced)

```typescript
import { useStudentProfile } from '@/hooks/use-student-profile'

function CustomComponent() {
  const { profile, syncProfile } = useStudentProfile()
  
  return (
    <button onClick={syncProfile}>
      Refresh Data
    </button>
  )
}
```

### Server-Side Usage

```typescript
import { getEnrichedStudentProfile } from '@/lib/graphql/sync-student-data'

// Dalam Server Component atau API Route
const profile = await getEnrichedStudentProfile('105841109518')
```

## 🔧 Configuration

### Environment Variables
```env
GRAPHQL_ENDPOINT=https://sicekcok.if.unismuh.ac.id/graphql
```

### Auto-Sync Settings

Bisa dikustomisasi di hook:
```typescript
useStudentProfile({
  autoSync: true,              // Auto-sync on mount
  syncInterval: 5 * 60 * 1000  // Re-sync every 5 minutes
})
```

## 📊 Data Flow

```
┌──────────────┐
│ Login Page   │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ Validate Credentials │
└──────┬───────────────┘
       │
       ▼
┌───────────────────────┐
│ Auto-Sync GraphQL     │◄─── lib/auth.ts
│ - Fetch mahasiswa     │
│ - Update DB           │
└──────┬────────────────┘
       │
       ▼
┌────────────────────┐
│ Login Success      │
│ - Session created  │
│ - Data synced      │
└────────────────────┘
```

## 🔒 Security

- ✅ Session-based authentication required
- ✅ Students can only access their own data
- ✅ Admin roles can sync for any student
- ✅ Validation di setiap endpoint

## 🧪 Testing

### Test Login & Auto-Sync
1. Login sebagai mahasiswa
2. Cek console untuk log "Student data synced for NIM: xxx"
3. Verifikasi data di database dengan:
   ```sql
   SELECT * FROM students WHERE nim = 'YOUR_NIM';
   ```

### Test API Endpoint
```bash
# GET - Retrieve profile
curl http://localhost:3000/api/student/sync \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"

# GET - Force sync
curl http://localhost:3000/api/student/sync?sync=true \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"

# POST - Force sync with NIM
curl -X POST http://localhost:3000/api/student/sync \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{"nim": "105841109518"}'
```

### Test React Hook
```typescript
// In a test component
const { profile, loading, error } = useStudentProfile({ autoSync: true })

console.log('Profile:', profile)
console.log('Loading:', loading)
console.log('Error:', error)
```

## 🐛 Troubleshooting

### Issue: Data tidak ter-sync saat login
**Solution:**
- Cek network ke GraphQL endpoint
- Verifikasi NIM valid di GraphQL API
- Cek error log di console/terminal

### Issue: "Student not found in local database"
**Solution:**
- Pastikan user sudah memiliki record di table `students`
- Check foreign key `user_id` di table students

### Issue: Dosen PA tidak ter-link
**Solution:**
- Pastikan dosen sudah ada di table `lecturers`
- Field `nip` harus match dengan `dosenPA` dari GraphQL

## 📖 Documentation

Untuk dokumentasi lengkap, lihat:
- `docs/STUDENT_SYNC_GUIDE.md` - Complete usage guide
- `docs/GRAPHQL_API_SCHEMA.md` - GraphQL schema reference
- `docs/GRAPHQL_PRISMA_MAPPING.md` - Data mapping guide

## 🎯 Next Steps

1. **Test dengan data real** - Login dengan akun mahasiswa yang valid
2. **Monitor performance** - Cek waktu sync
3. **Add error notification** - Toast/alert untuk user jika sync gagal
4. **Implement retry logic** - Retry otomatis jika sync gagal
5. **Add caching** - Redis untuk reduce load ke GraphQL API

## 🔄 Future Enhancements

- [ ] Sync data ibu dan wali mahasiswa
- [ ] Batch sync untuk multiple students
- [ ] Real-time sync via webhooks
- [ ] Data versioning & change tracking
- [ ] Sync scheduler untuk background jobs
- [ ] Analytics dashboard untuk track sync status

## 👥 Support

Jika ada pertanyaan atau issues:
1. Check dokumentasi lengkap di `docs/STUDENT_SYNC_GUIDE.md`
2. Lihat contoh implementasi di `components/student/student-profile-card.tsx`
3. Review code di `lib/graphql/sync-student-data.ts`

---

**Last Updated:** 2025-10-24
**Version:** 1.0.0
