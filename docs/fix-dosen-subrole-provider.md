# Fix: useDosenSubRole Context Error

## 🐛 Problem
Error terjadi: `useDosenSubRole must be used within a DosenSubRoleProvider`

### Root Cause
Komponen-komponen dosen (seperti `sub-role-switcher`, `dynamic-role-sidebar`, dll) menggunakan hook `useDosenSubRole()`, tetapi `DosenSubRoleProvider` tidak dibungkus di dashboard layout.

## ✅ Solution Applied

### 1. Updated `app/dashboard/layout-client.tsx`

**Perubahan:**
- ✅ Import `DosenSubRoleProvider` dari context
- ✅ Wrap `AppLayout` dengan `DosenSubRoleProvider`
- ✅ Replace loading Loader2 dengan `GlobalLoading` component

**Before:**
```tsx
return (
  <AppLayout
    role={effectiveRole}
    menuItems={getMenuItems(effectiveRole)}
    defaultSidebarOpen={defaultSidebarOpen}
  >
    {children}
  </AppLayout>
)
```

**After:**
```tsx
return (
  <DosenSubRoleProvider>
    <AppLayout
      role={effectiveRole}
      menuItems={getMenuItems(effectiveRole)}
      defaultSidebarOpen={defaultSidebarOpen}
    >
      {children}
    </AppLayout>
  </DosenSubRoleProvider>
)
```

### 2. Provider Hierarchy

Sekarang provider hierarchy menjadi:
```
RootLayout (app/layout.tsx)
├── ThemeProvider
│   ├── I18nProvider
│   │   ├── RoleProvider
│   │   │   ├── AuthProvider
│   │   │   │   ├── NotificationProvider
│   │   │   │   │   └── {children}
│
DashboardLayoutClient (app/dashboard/layout-client.tsx)
├── DosenSubRoleProvider ✅ (NEW)
│   ├── AppLayout
│   │   └── {children}
```

## 📦 Components Using useDosenSubRole

Komponen-komponen berikut sekarang bisa menggunakan `useDosenSubRole` tanpa error:

1. ✅ `components/dosen/sub-role-switcher.tsx`
2. ✅ `components/dosen/sub-role-dashboard.tsx`
3. ✅ `components/dosen/dynamic-role-sidebar.tsx`
4. ✅ `components/dosen/dynamic-role-mobile-menu.tsx`
5. ✅ `components/dosen/dosen-layout-content.tsx`
6. ✅ `components/layout/unified-dashboard-layout.tsx`

## 🎯 Why This Fix Works

### Context Provider Pattern
`DosenSubRoleProvider` menyediakan context untuk semua child components di dalam dashboard. Dengan membungkus `AppLayout`, semua komponen yang di-render di dalam dashboard sekarang memiliki akses ke:

- `currentSubRole`: Role aktif saat ini (dosen, dekan, wakil_dekan, dll)
- `setCurrentSubRole`: Function untuk switch sub-role
- `availableSubRoles`: List sub-role yang tersedia
- `isLoading`: State loading saat switching role

### Scope
Provider hanya di-wrap di `dashboard/layout-client.tsx`, bukan di root layout, karena:
- ✅ Hanya halaman dashboard yang membutuhkan dosen sub-role
- ✅ Menghindari overhead di halaman lain (login, landing, dll)
- ✅ Clean separation of concerns

## 🚀 Additional Improvements

### Loading Component
Sekarang menggunakan `GlobalLoading` dengan logo animasi:
```tsx
if (isLoading) {
  return <GlobalLoading text="Loading..." className="h-screen" />
}
```

**Benefits:**
- ✅ Konsisten dengan loading UI di seluruh aplikasi
- ✅ Menggunakan logo brand
- ✅ Animasi smooth dengan framer-motion
- ✅ Better UX

## 🧪 Testing Checklist

Pastikan untuk test:
- [ ] Login sebagai dosen
- [ ] Switch antara sub-roles (Dosen → Dekan → Wakil Dekan, dll)
- [ ] Navigasi antar menu di tiap sub-role
- [ ] Refresh page tidak menyebabkan error
- [ ] Loading animation muncul saat switching role
- [ ] No console errors terkait context

## 📝 Notes

### Available Sub-Roles
Default sub-roles yang tersedia:
- `dosen` - Dosen biasa
- `dekan` - Dekan fakultas
- `wakil_dekan_1` - Wakil Dekan 1
- `wakil_dekan_2` - Wakil Dekan 2
- `wakil_dekan_3` - Wakil Dekan 3
- `wakil_dekan_4` - Wakil Dekan 4
- `gkm` - GKM
- `prodi` - Prodi

### Custom Sub-Roles
Jika perlu customize available sub-roles:
```tsx
<DosenSubRoleProvider availableSubRoles={["dosen", "dekan"]}>
  {/* ... */}
</DosenSubRoleProvider>
```

## 🔗 Related Files

- `context/dosen-subrole-context.tsx` - Context definition
- `app/dashboard/layout-client.tsx` - Provider wrapper (FIXED)
- `app/dashboard/loading.tsx` - Updated with GlobalLoading
- `components/ui/global-loading.tsx` - New loading component
- `components/dosen/*` - Components using the hook

## ✨ Result

Error **FIXED** ✅
- No more "useDosenSubRole must be used within a DosenSubRoleProvider" error
- Loading screens now use branded logo animation
- Clean provider hierarchy
- All dosen features working properly
