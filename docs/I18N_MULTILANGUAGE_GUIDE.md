# Panduan Multi-Bahasa (i18n) - SINTEKMu Dashboard

## 📖 Daftar Isi
1. [Pengenalan](#pengenalan)
2. [Arsitektur Sistem](#arsitektur-sistem)
3. [Cara Penggunaan](#cara-penggunaan)
4. [Menambah Terjemahan Baru](#menambah-terjemahan-baru)
5. [Menambah Bahasa Baru](#menambah-bahasa-baru)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Pengenalan

Sistem Multi-Bahasa (Internationalization/i18n) memungkinkan aplikasi SINTEKMu Dashboard untuk mendukung berbagai bahasa. Saat ini, aplikasi mendukung:

- 🇮🇩 **Bahasa Indonesia** (default)
- 🇺🇸 **English**

### Fitur Utama
- ✅ Switch bahasa secara real-time
- ✅ Penyimpanan preferensi bahasa di localStorage
- ✅ Interpolasi parameter dinamis
- ✅ Type-safe translations
- ✅ Mudah untuk menambah bahasa baru

---

## Arsitektur Sistem

### Struktur File

```
├── lib/
│   ├── i18n.ts              # Context dan Hook
│   └── translations.ts       # Semua translations
├── components/
│   ├── providers/
│   │   └── i18n-provider.tsx # Provider Component
│   └── language-switcher.tsx # UI untuk switch bahasa
└── app/
    └── layout.tsx            # Root layout dengan I18nProvider
```

### Komponen Utama

#### 1. **i18n.ts** - Context & Hook
```typescript
// Tipe locale yang didukung
export type Locale = 'id' | 'en'

// Interface context
export interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
}

// Hook untuk menggunakan i18n
export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
```

#### 2. **translations.ts** - Data Terjemahan
```typescript
export const translations = {
  id: {
    'common.dashboard': 'Dashboard',
    'common.save': 'Simpan',
    // ... more translations
  },
  en: {
    'common.dashboard': 'Dashboard',
    'common.save': 'Save',
    // ... more translations
  }
}
```

#### 3. **i18n-provider.tsx** - Provider
Provider yang membungkus aplikasi dan menyediakan fungsi i18n ke semua komponen.

#### 4. **language-switcher.tsx** - UI Component
Dropdown menu untuk memilih bahasa.

---

## Cara Penggunaan

### 1. Menggunakan Hook `useI18n` di Component

```tsx
'use client'

import { useI18n } from '@/lib/i18n'

export function MyComponent() {
  const { t, locale } = useI18n()
  
  return (
    <div>
      <h1>{t('common.dashboard')}</h1>
      <p>{t('student.welcome', { name: 'John' })}</p>
      <p>Current language: {locale}</p>
    </div>
  )
}
```

### 2. Interpolasi Parameter

Untuk teks dengan parameter dinamis, gunakan placeholder `{{param}}`:

```typescript
// Di translations.ts
{
  'student.welcome': 'Selamat datang kembali, {{name}}. Ini adalah ringkasan akademik Anda.',
}

// Di component
const { t } = useI18n()
const greeting = t('student.welcome', { name: userName })
```

### 3. Menggunakan Language Switcher

Language switcher sudah terintegrasi di **NavUser** component (sidebar):

```tsx
import { LanguageSwitcher } from '@/components/language-switcher'

// Sudah ada di NavUser component
<LanguageSwitcher />
```

### 4. Contoh Lengkap - Admin Dashboard

```tsx
'use client'

import { useI18n } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AdminDashboard() {
  const { t } = useI18n()
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          {t('admin.dashboard')}
        </h1>
        <p className="text-muted-foreground">
          {t('admin.welcome')}
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.total_users')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.active_students')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">856</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Actions */}
      <div className="flex gap-4">
        <Button>{t('admin.add_new')}</Button>
        <Button variant="outline">{t('admin.export')}</Button>
        <Button variant="outline">{t('admin.refresh')}</Button>
      </div>
    </div>
  )
}
```

---

## Menambah Terjemahan Baru

### 1. Buka `lib/translations.ts`

### 2. Tambahkan key baru di kedua bahasa

```typescript
export const translations = {
  id: {
    // ... existing translations
    'feature.new_feature': 'Fitur Baru',
    'feature.description': 'Ini adalah deskripsi fitur baru',
  },
  en: {
    // ... existing translations
    'feature.new_feature': 'New Feature',
    'feature.description': 'This is a new feature description',
  }
}
```

### 3. Gunakan di component

```tsx
const { t } = useI18n()
console.log(t('feature.new_feature'))
```

### Konvensi Penamaan Key

Gunakan format hierarkis dengan dot notation:

```
[kategori].[sub-kategori].[nama]
```

**Contoh:**
- `common.save` - Umum, simpan
- `admin.dashboard` - Admin, dashboard
- `student.welcome` - Mahasiswa, welcome
- `correspondence.inbox` - Surat menyurat, inbox
- `admin.reports.academic` - Admin, laporan, akademik

---

## Menambah Bahasa Baru

### 1. Update Type di `lib/i18n.ts`

```typescript
// Tambahkan bahasa baru
export type Locale = 'id' | 'en' | 'ar' // Tambah 'ar' untuk Arabic
```

### 2. Tambah Translations di `lib/translations.ts`

```typescript
export const translations = {
  id: { /* ... */ },
  en: { /* ... */ },
  ar: { // Bahasa baru
    'common.dashboard': 'لوحة القيادة',
    'common.save': 'حفظ',
    // ... semua translations
  }
} as const
```

### 3. Update Language Switcher

Edit `components/language-switcher.tsx`:

```typescript
const languages = {
  id: {
    name: 'Bahasa Indonesia',
    flag: '🇮🇩'
  },
  en: {
    name: 'English',
    flag: '🇺🇸'
  },
  ar: { // Tambah bahasa baru
    name: 'العربية',
    flag: '🇸🇦'
  }
} as const
```

---

## Best Practices

### ✅ DO's

1. **Selalu gunakan translation keys** untuk teks yang terlihat user
   ```tsx
   ✅ <h1>{t('admin.dashboard')}</h1>
   ❌ <h1>Dashboard Admin</h1>
   ```

2. **Gunakan parameter untuk dynamic content**
   ```tsx
   ✅ t('student.welcome', { name: userName })
   ❌ `Welcome back, ${userName}`
   ```

3. **Konsisten dengan naming convention**
   ```typescript
   ✅ 'admin.user_management'
   ✅ 'admin.total_users'
   ❌ 'AdminUserManagement'
   ❌ 'total_users_admin'
   ```

4. **Test di kedua bahasa**
   - Pastikan layout tidak rusak saat switch bahasa
   - Text panjang dalam satu bahasa mungkin pendek di bahasa lain

5. **Gunakan `useI18n` di client components**
   ```tsx
   'use client' // Penting!
   
   import { useI18n } from '@/lib/i18n'
   ```

### ❌ DON'Ts

1. **Jangan hardcode text**
   ```tsx
   ❌ <button>Save</button>
   ✅ <button>{t('common.save')}</button>
   ```

2. **Jangan lupa menambah translation di semua bahasa**
   ```typescript
   ❌ Hanya menambah di 'id' saja
   ✅ Tambah di 'id' dan 'en'
   ```

3. **Jangan gunakan HTML di translation**
   ```typescript
   ❌ 'welcome': '<strong>Welcome</strong> back!'
   ✅ 'welcome': 'Welcome back!'
   ```

4. **Jangan translate technical terms**
   ```typescript
   ❌ 'error.404': 'Tidak Ditemukan 404'
   ✅ 'error.not_found': 'Halaman Tidak Ditemukan'
   ```

---

## Kategori Translation yang Sudah Ada

### 1. Common (Umum)
- `common.dashboard`, `common.save`, `common.cancel`, dll.
- Digunakan di seluruh aplikasi

### 2. Auth (Autentikasi)
- `auth.login`, `auth.password`, `auth.email`, dll.
- Login, register, forgot password

### 3. Navigation (Navigasi)
- `nav.mahasiswa`, `nav.dosen`, `nav.admin`, dll.
- Menu navigasi per role

### 4. Student (Mahasiswa)
- `student.dashboard`, `student.welcome`, `student.gpa`, dll.
- Dashboard dan fitur mahasiswa

### 5. Academic (Akademik)
- `academic.semester`, `academic.course`, `academic.grade`, dll.
- Fitur akademik

### 6. Admin
- `admin.dashboard`, `admin.users`, `admin.reports`, dll.
- Dashboard admin dan manajemen

### 7. Library (Perpustakaan)
- `library.books`, `library.borrow`, `library.return`, dll.

### 8. Laboratory (Laboratorium)
- `lab.schedule`, `lab.equipment`, `lab.booking`, dll.

### 9. Exams (Ujian)
- `exam.schedule`, `exam.results`, `exam.upcoming`, dll.

### 10. Correspondence (Surat Menyurat)
- `correspondence.inbox`, `correspondence.drafts`, dll.

### 11. KKP (Kuliah Kerja Praktis)
- `kkp.title`, `kkp.team_creation`, dll.

### 12. Payment (Pembayaran)
- `payment.title`, `payment.pending`, `payment.completed`, dll.

---

## Contoh Penggunaan per Halaman

### Student Dashboard

```tsx
'use client'

import { useI18n } from '@/lib/i18n'

export function StudentDashboard() {
  const { t } = useI18n()
  const studentName = "Ahmad"
  
  return (
    <div>
      <h1>{t('student.dashboard')}</h1>
      <p>{t('student.welcome', { name: studentName })}</p>
      
      <div className="stats">
        <div>
          <h3>{t('student.gpa')}</h3>
          <p>3.85</p>
        </div>
        <div>
          <h3>{t('student.credits')}</h3>
          <p>120 SKS</p>
        </div>
      </div>
      
      <button>{t('common.view')}</button>
    </div>
  )
}
```

### Library Page

```tsx
'use client'

import { useI18n } from '@/lib/i18n'

export function LibraryPage() {
  const { t } = useI18n()
  
  return (
    <div>
      <h1>{t('library.title')}</h1>
      
      <input 
        placeholder={t('library.search')}
      />
      
      <div className="books">
        <button>{t('library.borrow')}</button>
        <button>{t('library.return')}</button>
      </div>
      
      <h2>{t('library.history')}</h2>
    </div>
  )
}
```

### Admin Reports

```tsx
'use client'

import { useI18n } from '@/lib/i18n'

export function AdminReports() {
  const { t } = useI18n()
  
  return (
    <div>
      <h1>{t('admin.reports')}</h1>
      
      <div className="report-types">
        <button>{t('admin.reports.academic')}</button>
        <button>{t('admin.reports.financial')}</button>
        <button>{t('admin.reports.student')}</button>
        <button>{t('admin.reports.attendance')}</button>
      </div>
      
      <button>{t('admin.reports.generate')}</button>
      <button>{t('admin.reports.download')}</button>
    </div>
  )
}
```

---

## Troubleshooting

### Problem: Translation tidak muncul / muncul key-nya

**Kemungkinan Penyebab:**
1. Key tidak ada di `translations.ts`
2. Typo dalam key name
3. Component tidak di-wrap dengan I18nProvider

**Solusi:**
```typescript
// 1. Check apakah key ada
console.log(translations.id['your.key'])
console.log(translations.en['your.key'])

// 2. Check typo
// WRONG: t('admin.dashbord')
// RIGHT: t('admin.dashboard')

// 3. Check provider di layout.tsx
<I18nProvider>
  {children}
</I18nProvider>
```

### Problem: "useI18n must be used within an I18nProvider"

**Penyebab:** Component tidak di-wrap dengan I18nProvider

**Solusi:** Pastikan di `app/layout.tsx`:
```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
```

### Problem: Bahasa tidak tersimpan setelah refresh

**Penyebab:** localStorage tidak terisi

**Solusi:** Check browser console:
```typescript
// Check localStorage
console.log(localStorage.getItem('locale'))

// Set manually untuk test
localStorage.setItem('locale', 'en')
```

### Problem: Parameter interpolation tidak berfungsi

**Penyebab:** Format placeholder salah

**Solusi:**
```typescript
// WRONG
'welcome': 'Hello {name}'
t('welcome', { name: 'John' })

// RIGHT
'welcome': 'Hello {{name}}'
t('welcome', { name: 'John' })
```

---

## Testing Multi-Language

### Manual Testing Checklist

- [ ] Switch language dari ID ke EN
- [ ] Refresh page, bahasa masih tersimpan
- [ ] Semua text berubah sesuai bahasa
- [ ] Layout tidak rusak (text overflow, wrapping)
- [ ] Parameter interpolation berfungsi
- [ ] Button dan form labels ter-translate
- [ ] Error messages ter-translate

### Testing per Page

```tsx
// Test helper
const testTranslations = (keys: string[]) => {
  const { locale } = useI18n()
  keys.forEach(key => {
    const value = translations[locale][key]
    if (!value) {
      console.error(`Missing translation: ${key} in ${locale}`)
    }
  })
}

// Usage
testTranslations([
  'admin.dashboard',
  'admin.welcome',
  'admin.total_users'
])
```

---

## Ringkasan Quick Start

### Untuk Developer Baru

1. **Import hook di component:**
   ```tsx
   import { useI18n } from '@/lib/i18n'
   ```

2. **Use hook dalam component:**
   ```tsx
   const { t } = useI18n()
   ```

3. **Replace hardcoded text:**
   ```tsx
   <h1>{t('admin.dashboard')}</h1>
   ```

4. **Tambah translation baru di `lib/translations.ts`:**
   ```typescript
   id: { 'my.key': 'Teks Indonesia' }
   en: { 'my.key': 'English Text' }
   ```

5. **Test switch bahasa** menggunakan LanguageSwitcher di sidebar

---

## Resources

- **File Penting:**
  - `lib/i18n.ts` - Context & Hook
  - `lib/translations.ts` - Semua translations
  - `components/language-switcher.tsx` - UI switcher
  - `components/providers/i18n-provider.tsx` - Provider

- **Contoh Implementasi:**
  - `components/admin/comprehensive-admin-dashboard.tsx`
  - `components/nav-user.tsx`

---

## Kontribusi

Jika Anda menambah halaman atau fitur baru:

1. ✅ Gunakan `useI18n` hook
2. ✅ Tambah translations untuk ID dan EN
3. ✅ Test di kedua bahasa
4. ✅ Update dokumentasi jika perlu

---

**Last Updated:** October 2024
**Version:** 1.0.0
**Maintainer:** SINTEKMu Development Team

