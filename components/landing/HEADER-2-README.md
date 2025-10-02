# Header 2 - EduLearn Education Landing Page

## 📋 Overview
Header 2 adalah komponen hero section untuk landing page edukasi dengan desain modern, menggunakan glassmorphism effects, gradient backgrounds, dan interactive elements.

## 🎨 Design Features

### Visual Elements:
- **Navbar** dengan logo, navigation links, dan contact button
- **Hero Section** dengan heading besar dan badge highlight
- **Background Graphics** dengan gradient overlay
- **Statistics Section** menampilkan jumlah active users
- **Call-to-Action** dengan email input dan Get Started button
- **Decorative Elements** seperti stars dan curved lines

### Design System:
- **Primary Color**: #0451D3 (Blue)
- **Secondary Color**: #FFFFFF (White)
- **Text Color**: #101012 (Dark)
- **Typography**: 
  - Geologica (Light, Regular, SemiBold, Bold)
  - Gabarito (SemiBold, Bold)

### Effects:
- Backdrop blur (glassmorphism)
- Gradient overlays
- Box shadows (inset)
- Hover transitions
- Opacity variations

## 📦 File Location
```
components/landing/header-2.tsx
```

## 🚀 Usage

### Basic Implementation:
```tsx
import Header2 from "@/components/landing/header-2";

export default function LandingPage() {
  return (
    <div>
      <Header2 />
      {/* Rest of your page content */}
    </div>
  );
}
```

### Demo Page:
Akses demo page di: `http://localhost:3000/landing-header-demo`

## 🖼️ Assets Required

Semua assets sudah tersedia di folder `public/`:
- `d07e5102f6877288d61ea963179f3a5d4b095fb5.svg` - Logo EduLearn
- `aedaf1d2d2c054d643cabcbf13e9dd7a71aa0e5f.svg` - Innovation icon
- `8710af10014c079e4dda4f1c10af35a07d7b9a2d.svg` - Cursor click icon
- `d10cdd6e60590316af174515a385b5c975d2b6b5.svg` - Star decoration
- `41642a946b697ad70b9a60f49850e2cb727f28ae.svg` - Background graphic
- `08189da0b1f3ae6650df0a80180c894ff4ab9e79.png` - Background pattern

## 🎯 Interactive Elements

### Navbar:
- Logo (clickable)
- Navigation links dengan hover effects
- Contact button dengan hover transition

### Hero Section:
- Email input field dengan glassmorphism
- Get Started button dengan hover animation
- Cursor icon yang bergerak saat hover

### Navigation Links:
- Home
- About Us
- Courses
- Features
- Testimonials

## 📱 Responsive Design
Komponen ini didesain untuk layar desktop dengan lebar 1440px. Untuk responsive design, perlu dilakukan penyesuaian:

### Breakpoints yang Disarankan:
- Desktop: 1440px+ (current)
- Tablet: 768px - 1439px (needs adjustment)
- Mobile: < 768px (needs adjustment)

## 🎨 Customization

### Mengubah Warna:
```tsx
// Primary color
className="bg-[#0451d3]" // Ganti dengan warna yang diinginkan

// Border color
className="border-[#0451d3]" // Ganti dengan warna yang diinginkan
```

### Mengubah Typography:
```tsx
// Heading size
className="text-[70px]" // Sesuaikan ukuran

// Font family
className="font-['Geologica',sans-serif]" // Ganti dengan font lain
```

### Mengubah Content:
Edit text content langsung di komponen:
- Heading: "Empower Your Future with Quality Education"
- Badge: "Flexible Online Learning"
- Statistics: "2.9M+ Active Users"
- Description: "Learn anytime, anywhere..."

## 🔧 Technical Details

### Dependencies:
- Next.js 14+ (untuk Image component)
- React 18+
- Tailwind CSS 3+

### Performance:
- Image optimization dengan Next.js Image
- Priority loading untuk critical images
- Lazy loading untuk decorative elements

### Accessibility:
- Semantic HTML structure
- Alt text untuk semua images
- Keyboard navigation support
- Focus states untuk interactive elements

## 🎭 Comparison with Other Headers

| Feature | Header 2 (EduLearn) |
|---------|---------------------|
| Style | Modern, Glassmorphism |
| Background | Gradient + Graphics |
| CTA | Email + Button |
| Navigation | Horizontal navbar |
| Stats | Yes (2.9M+ users) |
| Animations | Hover effects |
| Best For | Education platforms |

## 📝 Notes

### Font Installation:
Pastikan font Geologica dan Gabarito sudah ter-install. Jika belum, tambahkan di `next.config.js`:

```js
// next.config.js
module.exports = {
  // ... other configs
  // Add Google Fonts or custom fonts
}
```

Atau gunakan Google Fonts di `app/layout.tsx`:

```tsx
import { Geologica, Gabarito } from 'next/font/google';

const geologica = Geologica({ 
  subsets: ['latin'],
  variable: '--font-geologica',
});

const gabarito = Gabarito({ 
  subsets: ['latin'],
  variable: '--font-gabarito',
});
```

## 🐛 Known Issues
- Responsive design belum optimal untuk mobile
- Font loading mungkin perlu optimization
- Fixed positioning untuk navbar belum diimplementasikan

## 🚀 Future Improvements
- [ ] Responsive design untuk tablet dan mobile
- [ ] Sticky navbar saat scroll
- [ ] Animated scroll indicators
- [ ] Loading states untuk images
- [ ] Form validation untuk email input
- [ ] Integration dengan email service
- [ ] Animation on page load
- [ ] Dark mode support

## 📞 Support
Untuk pertanyaan atau issues, silakan buka issue di repository atau hubungi tim development.

---

**Created:** October 2, 2025
**Version:** 1.0.0
**Design Source:** Figma - EduLearn Education Landing Page
