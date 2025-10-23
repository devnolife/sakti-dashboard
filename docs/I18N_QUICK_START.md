# 🌍 Quick Start - Multi Bahasa (i18n)

## Cara Menggunakan (5 Langkah Mudah)

### 1️⃣ Import Hook

```tsx
import { useI18n } from '@/lib/i18n'
```

### 2️⃣ Gunakan dalam Component

```tsx
'use client'

export function MyComponent() {
  const { t, locale, setLocale } = useI18n()
  
  return (
    <div>
      <h1>{t('admin.dashboard')}</h1>
    </div>
  )
}
```

### 3️⃣ Tambah Translation Baru

Edit file `lib/translations.ts`:

```typescript
export const translations = {
  id: {
    'my.new.key': 'Teks Bahasa Indonesia'
  },
  en: {
    'my.new.key': 'English Text'
  }
}
```

### 4️⃣ Gunakan dengan Parameter

```tsx
// Di translations.ts
'welcome.message': 'Selamat datang, {{name}}!'

// Di component
t('welcome.message', { name: 'Ahmad' })
// Output: "Selamat datang, Ahmad!"
```

### 5️⃣ Switch Bahasa

Language switcher sudah tersedia di **sidebar** (NavUser component). User tinggal klik dan pilih bahasa!

---

## 📦 Translations yang Sudah Ada

### Common (Umum)
```tsx
t('common.dashboard')    // Dashboard
t('common.save')         // Simpan / Save
t('common.cancel')       // Batal / Cancel
t('common.loading')      // Memuat... / Loading...
t('common.error')        // Terjadi kesalahan / An error occurred
```

### Admin
```tsx
t('admin.dashboard')          // Dashboard Admin / Admin Dashboard
t('admin.welcome')            // Selamat datang di Dashboard Admin
t('admin.users')              // Pengguna / Users
t('admin.total_users')        // Total Pengguna / Total Users
t('admin.reports')            // Laporan / Reports
t('admin.add_new')            // Tambah Baru / Add New
```

### Student (Mahasiswa)
```tsx
t('student.dashboard')        // Dashboard Mahasiswa / Student Dashboard
t('student.gpa')              // IPK Saat Ini / Current GPA
t('student.courses')          // Mata Kuliah / Courses
t('student.schedule')         // Jadwal / Schedule
```

### Library (Perpustakaan)
```tsx
t('library.title')            // Perpustakaan / Library
t('library.books')            // Buku / Books
t('library.borrow')           // Pinjam / Borrow
t('library.return')           // Kembalikan / Return
```

### Exam (Ujian)
```tsx
t('exam.schedule')            // Jadwal Ujian / Exam Schedule
t('exam.results')             // Hasil Ujian / Exam Results
t('exam.upcoming')            // Ujian Mendatang / Upcoming Exams
```

Dan masih banyak lagi! Lihat `lib/translations.ts` untuk daftar lengkap.

---

## ✅ Contoh Lengkap

```tsx
'use client'

import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function AdminDashboard() {
  const { t, locale } = useI18n()
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          {t('admin.dashboard')}
        </h1>
        <p className="text-muted-foreground">
          {t('admin.welcome')}
        </p>
        <p className="text-sm">Current language: {locale}</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.total_users')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">1,234</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.active_students')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">856</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.total_courses')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">42</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Actions */}
      <div className="flex gap-4">
        <Button>{t('admin.add_new')}</Button>
        <Button variant="outline">{t('admin.export')}</Button>
        <Button variant="outline">{t('common.refresh')}</Button>
      </div>
    </div>
  )
}
```

---

## 🎯 Naming Convention

Gunakan format: `[kategori].[nama]`

**Good:**
- ✅ `common.save`
- ✅ `admin.dashboard`
- ✅ `student.welcome`
- ✅ `admin.reports.academic`

**Bad:**
- ❌ `Save`
- ❌ `AdminDashboard`
- ❌ `student_welcome`

---

## 🚀 Tips & Tricks

### Tip 1: Gunakan untuk semua teks user-facing
```tsx
❌ <button>Save</button>
✅ <button>{t('common.save')}</button>
```

### Tip 2: Parameter untuk dynamic content
```tsx
❌ `Welcome back, ${userName}`
✅ t('student.welcome', { name: userName })
```

### Tip 3: Check translation exists
```typescript
const key = 'admin.dashboard'
console.log(translations.id[key]) // Check ID
console.log(translations.en[key]) // Check EN
```

### Tip 4: Get current locale
```tsx
const { locale } = useI18n()
console.log(locale) // 'id' or 'en'
```

### Tip 5: Change locale programmatically
```tsx
const { setLocale } = useI18n()
setLocale('en') // Switch to English
setLocale('id') // Switch to Indonesian
```

---

## 📝 Checklist untuk Developer

Saat membuat halaman baru:

- [ ] Import `useI18n` hook
- [ ] Replace semua hardcoded text dengan `t('key')`
- [ ] Tambah translations di `lib/translations.ts` untuk **ID dan EN**
- [ ] Test switch bahasa
- [ ] Check layout tidak rusak

---

## 🔗 Link Penting

- **Dokumentasi Lengkap:** `docs/I18N_MULTILANGUAGE_GUIDE.md`
- **Translation File:** `lib/translations.ts`
- **Hook File:** `lib/i18n.ts`
- **Language Switcher:** `components/language-switcher.tsx`

---

## ❓ Troubleshooting

**Problem:** Translation tidak muncul, muncul key-nya

**Solusi:** Key belum ditambahkan di `lib/translations.ts`

```typescript
// Tambahkan di translations.ts
id: { 'your.key': 'Teks Indonesia' }
en: { 'your.key': 'English Text' }
```

---

**Problem:** "useI18n must be used within an I18nProvider"

**Solusi:** Pastikan component ada di dalam I18nProvider (sudah setup di `app/layout.tsx`)

---

**Happy Coding! 🚀**

