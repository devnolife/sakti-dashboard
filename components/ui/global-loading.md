# Global Loading Components

Komponen loading global dengan logo animasi untuk aplikasi dashboard.

## Components

### 1. GlobalLoading
Loading penuh untuk halaman dengan animasi logo yang muncul-hilang.

**Props:**
- `text?: string` - Text yang ditampilkan (default: "Loading...")
- `className?: string` - Additional CSS classes

**Penggunaan:**
```tsx
import { GlobalLoading } from "@/components/ui/global-loading"

export default function Loading() {
  return <GlobalLoading text="Loading dashboard..." />
}
```

### 2. GlobalLoadingOverlay
Loading overlay fullscreen dengan backdrop blur untuk digunakan sebagai modal loading.

**Props:**
- `text?: string` - Text yang ditampilkan (default: "Loading...")
- `className?: string` - Additional CSS classes

**Penggunaan:**
```tsx
import { GlobalLoadingOverlay } from "@/components/ui/global-loading"

export default function MyComponent() {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <>
      {isLoading && <GlobalLoadingOverlay text="Saving data..." />}
      {/* Your content */}
    </>
  )
}
```

### 3. GlobalLoadingCompact
Loading compact untuk inline usage (ukuran lebih kecil).

**Props:**
- `text?: string` - Text yang ditampilkan (default: "Loading...")
- `className?: string` - Additional CSS classes

**Penggunaan:**
```tsx
import { GlobalLoadingCompact } from "@/components/ui/global-loading"

export default function MyComponent() {
  return (
    <Card>
      <CardContent>
        <GlobalLoadingCompact text="Loading data..." />
      </CardContent>
    </Card>
  )
}
```

## Fitur Animasi

### Logo Animation
- **Opacity**: Fade in-out (0.3 → 1 → 0.3)
- **Scale**: Zoom subtle (0.95 → 1 → 0.95)
- **Duration**: 2 detik per cycle
- **Loop**: Infinite

### Text Animation
- **Opacity**: Fade in-out (0.5 → 1 → 0.5)
- **Duration**: 2 detik per cycle
- **Loop**: Infinite

### Dots Animation
- **Movement**: Bounce up-down (0 → -10px → 0)
- **Opacity**: Fade (0.3 → 1 → 0.3)
- **Duration**: 1.5 detik per cycle
- **Delay**: Staggered (0s, 0.2s, 0.4s)
- **Loop**: Infinite

## Contoh Implementasi

### Di file `loading.tsx` (Next.js)
```tsx
// app/dashboard/loading.tsx
import { GlobalLoading } from "@/components/ui/global-loading"

export default function DashboardLoading() {
  return <GlobalLoading text="Loading dashboard..." />
}
```

### Sebagai Overlay di Component
```tsx
"use client"

import { useState } from "react"
import { GlobalLoadingOverlay } from "@/components/ui/global-loading"

export default function FormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await submitData()
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      {isSubmitting && <GlobalLoadingOverlay text="Submitting form..." />}
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </>
  )
}
```

### Loading Inline
```tsx
import { GlobalLoadingCompact } from "@/components/ui/global-loading"

export default function DataCard() {
  const { data, isLoading } = useSWR('/api/data')
  
  if (isLoading) {
    return <GlobalLoadingCompact text="Loading..." className="p-4" />
  }
  
  return <div>{/* Render data */}</div>
}
```

## Customization

### Mengubah ukuran logo:
```tsx
// Edit di file global-loading.tsx
<Image
  src="/logo/logo.png"
  alt="Loading"
  width={150}  // Ubah sesuai kebutuhan
  height={150} // Ubah sesuai kebutuhan
  priority
  className="object-contain"
/>
```

### Mengubah kecepatan animasi:
```tsx
// Edit duration di motion.div
transition={{
  duration: 3, // Ubah dari 2 ke 3 untuk lebih lambat
  repeat: Infinity,
  ease: "easeInOut",
}}
```

### Mengubah warna dots:
```tsx
<motion.div
  className="h-2 w-2 rounded-full bg-blue-500" // Ubah bg-primary
  // ...
/>
```

## Dependencies
- `framer-motion` - Untuk animasi smooth
- `next/image` - Untuk optimasi gambar
- Logo harus tersedia di `/public/logo/logo.png`
