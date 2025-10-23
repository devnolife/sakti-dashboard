# 🌍 Multi-Bahasa (Internationalization) - SINTEKMu Dashboard

## Status Implementasi: ✅ READY

Sistem multi-bahasa sudah **fully integrated** dan siap digunakan!

---

## 🎯 Apa yang Sudah Dibuat?

### ✅ 1. Sistem Core
- **Hook useI18n** untuk akses i18n di komponen (`lib/i18n.ts`)
- **I18nProvider** untuk wrap aplikasi (`components/providers/i18n-provider.tsx`)
- **Translations Database** dengan 200+ keys (`lib/translations.ts`)
- **Language Switcher UI** dengan dropdown menu (`components/language-switcher.tsx`)

### ✅ 2. Bahasa yang Didukung
- 🇮🇩 **Bahasa Indonesia** (default)
- 🇺🇸 **English**

### ✅ 3. Integrasi UI
- Language switcher terintegrasi di **NavUser** (sidebar)
- Preferensi bahasa disimpan di **localStorage**
- Auto-load bahasa saat page refresh

### ✅ 4. Translations Categories (200+ keys)

#### Common (Umum) - 35+ keys
- Buttons: save, cancel, submit, edit, delete, dll.
- Status: loading, error, success, warning, info
- Actions: view, download, upload, search, filter

#### Auth (Autentikasi) - 7 keys
- Login, register, password, email, dll.

#### Navigation (Navigasi) - 9 keys
- Semua role: mahasiswa, dosen, admin, dekan, dll.

#### Student (Mahasiswa) - 25+ keys
- Dashboard, GPA, credits, attendance, courses, schedule

#### Academic (Akademik) - 17 keys
- Semester, course, instructor, grade, exam, assignment

#### Admin - 40+ keys
- Dashboard, users, reports, master data, calendar
- Workflows, integrations, document templates

#### Library (Perpustakaan) - 7 keys
- Books, borrow, return, history, available

#### Laboratory (Lab) - 6 keys
- Schedule, equipment, booking, inventory

#### Exams (Ujian) - 6 keys
- Schedule, results, upcoming, past exams

#### Correspondence (Surat) - 8 keys
- Inbox, outbox, drafts, sent, archive

#### KKP - 8 keys
- Team creation, location, submission, supervisor

#### Payment (Pembayaran) - 6 keys
- Overview, history, pending, completed

### ✅ 5. Dokumentasi Lengkap
- **Quick Start Guide** (`docs/I18N_QUICK_START.md`)
- **Comprehensive Guide** (`docs/I18N_MULTILANGUAGE_GUIDE.md`)
- **Usage Examples** (`components/examples/i18n-example.tsx`)

### ✅ 6. Contoh Implementasi
- **Admin Dashboard** (`components/admin/comprehensive-admin-dashboard.tsx`)
- **NavUser** dengan language switcher (`components/nav-user.tsx`)
- **10+ Examples** berbagai use cases

---

## 🚀 Cara Menggunakan

### Untuk User (Non-Technical)

1. **Buka aplikasi**
2. **Lihat sidebar** (kiri atau bawah)
3. **Klik icon user** di bagian footer sidebar
4. **Klik icon globe/languages** di sebelah user menu
5. **Pilih bahasa**: 🇮🇩 Bahasa Indonesia atau 🇺🇸 English
6. **Selesai!** Semua text akan berubah

**Bahasa tersimpan otomatis** - tidak perlu setting ulang setiap kali login!

### Untuk Developer

#### Quick Start (30 detik)

```tsx
'use client'

import { useI18n } from '@/lib/i18n'

export function MyPage() {
  const { t } = useI18n()
  
  return (
    <div>
      <h1>{t('admin.dashboard')}</h1>
      <button>{t('common.save')}</button>
    </div>
  )
}
```

#### Dengan Parameter

```tsx
const { t } = useI18n()
const userName = "Ahmad"

// Di translations: 'student.welcome': 'Selamat datang, {{name}}!'
t('student.welcome', { name: userName })
// Output: "Selamat datang, Ahmad!"
```

#### Check Current Language

```tsx
const { locale, setLocale } = useI18n()

console.log(locale) // 'id' atau 'en'

// Switch programmatically
setLocale('en')
```

---

## 📚 Dokumentasi

### 1. Quick Start (Baca Dulu!)
**File:** `docs/I18N_QUICK_START.md`

Panduan singkat 5 langkah untuk mulai menggunakan i18n. Perfect untuk quick reference!

**Isi:**
- 5 langkah mudah
- Common translations
- Contoh code
- Troubleshooting

### 2. Comprehensive Guide (Panduan Lengkap)
**File:** `docs/I18N_MULTILANGUAGE_GUIDE.md`

Dokumentasi lengkap dengan detail implementasi, best practices, dan troubleshooting.

**Isi:**
- Arsitektur sistem
- Cara penggunaan detail
- Menambah translation baru
- Menambah bahasa baru
- Best practices & anti-patterns
- Testing checklist
- Troubleshooting lengkap

### 3. Examples (Contoh Kode)
**File:** `components/examples/i18n-example.tsx`

10+ contoh implementasi real-world untuk berbagai use cases.

**Contoh yang ada:**
1. Basic Usage
2. Parameter Interpolation
3. Conditional Rendering
4. Forms dengan i18n
5. Statistics Cards
6. Tables dengan i18n
7. Tabs Navigation
8. Notifications
9. Navigation Menu
10. Complete Dashboard

---

## 🎨 Fitur

### ✨ Real-time Language Switching
Switch bahasa tanpa reload page. Semua text berubah instant!

### 💾 Persistent Preferences
Bahasa yang dipilih tersimpan di localStorage. Auto-load saat user kembali.

### 🔄 Parameter Interpolation
```tsx
t('welcome', { name: 'Ahmad', role: 'Admin' })
// "Selamat datang, Ahmad (Admin)"
```

### 🎯 Type-Safe
TypeScript support dengan proper typing untuk locale dan translations.

### 📱 Responsive
Language switcher berfungsi sempurna di mobile dan desktop.

### 🚀 Easy to Extend
Tambah bahasa baru atau translations baru hanya dalam beberapa menit.

---

## 📦 File Structure

```
├── lib/
│   ├── i18n.ts                          # Core: Context & Hook
│   └── translations.ts                  # Database: 200+ translations
│
├── components/
│   ├── providers/
│   │   └── i18n-provider.tsx           # Provider Component
│   ├── language-switcher.tsx           # UI: Language Dropdown
│   ├── nav-user.tsx                    # Updated: dengan switcher
│   ├── admin/
│   │   └── comprehensive-admin-dashboard.tsx  # Example: i18n usage
│   └── examples/
│       └── i18n-example.tsx            # 10+ code examples
│
├── docs/
│   ├── I18N_README.md                  # This file
│   ├── I18N_QUICK_START.md            # Quick reference
│   └── I18N_MULTILANGUAGE_GUIDE.md    # Complete guide
│
└── app/
    └── layout.tsx                      # Root: I18nProvider setup
```

---

## 🔑 Key Translation Categories

### Complete List of Available Keys

```typescript
// COMMON (Paling sering dipakai)
t('common.dashboard')
t('common.save')
t('common.cancel')
t('common.submit')
t('common.loading')
t('common.error')
t('common.success')

// ADMIN
t('admin.dashboard')
t('admin.welcome')
t('admin.users')
t('admin.total_users')
t('admin.reports')
t('admin.master_data')

// STUDENT
t('student.dashboard')
t('student.gpa')
t('student.courses')
t('student.schedule')

// LIBRARY
t('library.title')
t('library.books')
t('library.borrow')

// LAB
t('lab.title')
t('lab.schedule')
t('lab.equipment')

// EXAM
t('exam.schedule')
t('exam.results')

// CORRESPONDENCE
t('correspondence.title')
t('correspondence.inbox')
```

**Dan 180+ keys lainnya!** Check `lib/translations.ts` untuk daftar lengkap.

---

## 🛠️ Development Workflow

### Saat Membuat Halaman Baru

1. **Import hook**
   ```tsx
   import { useI18n } from '@/lib/i18n'
   ```

2. **Use dalam component**
   ```tsx
   const { t } = useI18n()
   ```

3. **Replace hardcoded text**
   ```tsx
   ❌ <h1>Dashboard Admin</h1>
   ✅ <h1>{t('admin.dashboard')}</h1>
   ```

4. **Tambah translations jika perlu**
   Edit `lib/translations.ts`:
   ```typescript
   id: { 'new.key': 'Teks Indonesia' }
   en: { 'new.key': 'English Text' }
   ```

5. **Test di kedua bahasa**
   - Switch ke English
   - Check semua text
   - Check layout tidak rusak

### Checklist ✅

- [ ] Import `useI18n`
- [ ] Replace hardcoded text dengan `t('key')`
- [ ] Tambah translations (ID & EN)
- [ ] Test switch bahasa
- [ ] Check responsive layout

---

## 🎓 Best Practices

### ✅ DO

```tsx
// 1. Gunakan t() untuk semua text
✅ <button>{t('common.save')}</button>

// 2. Parameter untuk dynamic content
✅ t('welcome', { name: userName })

// 3. Consistent naming
✅ 'admin.user_management'
✅ 'student.gpa'

// 4. Test di kedua bahasa
✅ Test ID dan EN
```

### ❌ DON'T

```tsx
// 1. Hardcode text
❌ <button>Save</button>

// 2. Concat strings
❌ `Welcome, ${userName}`

// 3. Inconsistent naming
❌ 'AdminUserManagement'
❌ 'userMgmt'

// 4. Skip translation
❌ Hanya tambah di ID, lupa EN
```

---

## 🐛 Troubleshooting

### Translation tidak muncul?

**Check:**
1. Key sudah ada di `lib/translations.ts`?
2. Typo dalam key name?
3. Sudah ada di kedua bahasa (ID & EN)?

### "useI18n must be used within provider"?

**Fix:**
Pastikan component ada dalam `<I18nProvider>` (sudah ada di `app/layout.tsx`)

### Bahasa tidak tersimpan setelah refresh?

**Check:**
localStorage di browser:
```js
localStorage.getItem('locale') // Should return 'id' or 'en'
```

### Layout rusak saat switch bahasa?

**Solution:**
- Check text overflow
- Test dengan text panjang
- Use ellipsis untuk long text

---

## 📈 Statistics

- **Total Translation Keys:** 200+
- **Supported Languages:** 2 (ID, EN)
- **Categories:** 12
- **Components Updated:** 3
- **Documentation Files:** 4
- **Example Implementations:** 10+

---

## 🎯 Next Steps

### Untuk melengkapi implementasi:

1. **Update Menu Items** (Optional)
   - Tambah translation keys ke `config/menu-items.tsx`
   - Update `role-sidebar.tsx` untuk gunakan translations

2. **Update Halaman Lain** (Gradual)
   - Student dashboard pages
   - Library pages
   - Lab pages
   - Exam pages
   - Correspondence pages

3. **Tambah Bahasa Baru** (Jika diperlukan)
   - Arabic (AR)
   - Mandarin (ZH)
   - Dll.

### Prioritas

**High Priority:**
- ✅ Core system (DONE)
- ✅ Admin dashboard (DONE)
- ⏳ Student dashboard
- ⏳ Most used pages

**Medium Priority:**
- ⏳ Menu items
- ⏳ Form validations
- ⏳ Error messages

**Low Priority:**
- ⏳ Email templates
- ⏳ PDF documents

---

## 👥 Team

### How to Contribute

1. **Menambah translation baru:**
   Edit `lib/translations.ts`

2. **Update halaman:**
   Replace hardcoded text dengan `t()`

3. **Tambah contoh:**
   Add to `components/examples/i18n-example.tsx`

4. **Update docs:**
   Edit documentation files

### Coding Standards

- Always add translations for BOTH languages
- Use proper naming convention
- Test before commit
- Update documentation

---

## 📞 Support

### Dokumentasi
- **Quick Start:** `docs/I18N_QUICK_START.md`
- **Full Guide:** `docs/I18N_MULTILANGUAGE_GUIDE.md`
- **Examples:** `components/examples/i18n-example.tsx`

### Files to Check
- **Hook:** `lib/i18n.ts`
- **Translations:** `lib/translations.ts`
- **Provider:** `components/providers/i18n-provider.tsx`
- **Switcher:** `components/language-switcher.tsx`

---

## ✨ Features Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Core i18n System | ✅ | Ready |
| Indonesian Language | ✅ | 200+ keys |
| English Language | ✅ | 200+ keys |
| Language Switcher UI | ✅ | In sidebar |
| Local Storage | ✅ | Auto-save |
| Parameter Interpolation | ✅ | {{param}} |
| Type Safety | ✅ | TypeScript |
| Documentation | ✅ | Complete |
| Examples | ✅ | 10+ cases |
| Admin Dashboard | ✅ | Implemented |
| NavUser | ✅ | Implemented |

---

**Version:** 1.0.0  
**Last Updated:** October 2024  
**Status:** ✅ Production Ready  
**Maintainer:** SINTEKMu Development Team

---

## 🚀 Start Using Now!

1. **Read:** `docs/I18N_QUICK_START.md` (5 menit)
2. **Copy example** dari `components/examples/i18n-example.tsx`
3. **Implement** di halaman Anda
4. **Test** dengan switch bahasa
5. **Done!** 🎉

**Happy Coding!** 🌍

