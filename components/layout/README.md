# Modern Dashboard Layout Components

## Overview
Komponen layout modern yang telah dioptimasi untuk dashboard dengan sidebar dan header yang responsif.

## Components

### 1. DashboardLayout
Layout wrapper utama yang mengombinasikan sidebar dan header.

```tsx
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function Page() {
  return (
    <DashboardLayout>
      <div>Your page content here</div>
    </DashboardLayout>
  )
}
```

### 2. ModernSidebar
Sidebar modern dengan fitur:
- ✅ Collapsible (dapat diperkecil/diperbesar)
- ✅ Mobile responsive dengan overlay
- ✅ Smooth animations dengan Framer Motion
- ✅ Tooltip support saat collapsed
- ✅ Role-based menu items
- ✅ User profile section

### 3. ModernHeader
Header modern dengan fitur:
- ✅ Dynamic page title berdasarkan route
- ✅ Smart search bar yang expandable
- ✅ Notification center dengan badge
- ✅ Theme toggle (dark/light mode)
- ✅ Enhanced user dropdown menu
- ✅ Glass morphism effect dengan backdrop blur

## Z-Index Layers
Layout menggunakan sistem z-index yang terorganisir:
- `z-sidebar` (40): Desktop sidebar
- `z-mobile-overlay` (45): Mobile sidebar dan overlay
- `z-header` (50): Header
- `z-dropdown` (60): Dropdown menus
- `z-modal` (70): Modal dialogs
- `z-toast` (80): Toast notifications

## CSS Custom Properties
- `--header-height`: Tinggi header (default: 7rem)

## Styling Features

### Scroll Behavior
- Smooth scrolling dengan `scroll-behavior: smooth`
- Custom scrollbar styling yang minimal
- Header tetap fixed dengan proper z-index

### Spacing & Layout
- Automatic content spacing dengan `.content-spacing`
- Header spacer untuk mencegah content jumping
- Responsive margin dan padding

### Browser Support
- Fallback untuk browser tanpa `backdrop-filter`
- Enhanced focus states untuk accessibility
- Button hover effects yang smooth

## Breaking Changes dari Komponen Lama

### Sidebar
- `components/layout/sidebar.tsx` → `components/layout/modern-sidebar.tsx`
- `components/role-sidebar.tsx` → deprecated, gunakan `ModernSidebar`
- `components/role/role-sidebar.tsx` → consolidated

### Header
- `components/layout/header.tsx` → `components/layout/modern-header.tsx`
- `components/common/header.tsx` → deprecated

## Migration Guide

### Dari sidebar lama:
```tsx
// OLD
import Sidebar from "@/components/layout/sidebar"
<Sidebar activeSection={section} setActiveSection={setSection} />

// NEW
import DashboardLayout from "@/components/layout/dashboard-layout"
<DashboardLayout>
  {/* Your content */}
</DashboardLayout>
```

### Dari header lama:
```tsx
// OLD
import Header from "@/components/layout/header"
<Header />

// NEW
// Header sudah included di DashboardLayout
import DashboardLayout from "@/components/layout/dashboard-layout"
```

## Performance
- Code splitting ready
- Lazy loading support
- Optimized animations dengan Framer Motion
- Minimal bundle size impact

## Accessibility
- ARIA labels untuk screen readers
- Keyboard navigation support
- Focus management
- High contrast support