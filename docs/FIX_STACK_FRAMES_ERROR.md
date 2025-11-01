# Mengatasi Error: POST /__nextjs_original-stack-frames 404

## 🔴 Masalah
Next.js development server terus-menerus melakukan request ke `/__nextjs_original-stack-frames` dan mendapatkan 404 error.

```
POST /__nextjs_original-stack-frames 404 in 23ms
POST /__nextjs_original-stack-frames 404 in 24ms
POST /__nextjs_original-stack-frames 404 in 23ms
POST /__nextjs_original-stack-frames 404 in 25ms
```

## 🔍 Penyebab
Request ini terjadi karena:
1. Next.js error overlay di browser mencoba fetch source maps untuk debugging
2. Ada error runtime di aplikasi yang menyebabkan error overlay aktif
3. Source maps tidak tersedia atau tidak dapat di-load
4. Cache browser atau Next.js yang corrupt

## ✅ Solusi yang Diterapkan

### 1. API Route Handler
Telah dibuat route handler di `app/api/__nextjs_original-stack-frames/route.ts` yang menangani request dan mengembalikan response kosong.

### 2. Webpack Configuration
Di `next.config.mjs` telah ditambahkan:
- `config.devtool = false` - Nonaktifkan source maps di development
- `onDemandEntries` - Optimasi untuk mengurangi overhead
- `devIndicators.buildActivity = false` - Nonaktifkan indicator

### 3. Error Message Handling
Di `lib/graphql/client.ts` dan auth files, error message sudah di-normalize untuk menghindari error yang menyebabkan overlay aktif.

## 🚀 Cara Mengatasi

### Opsi 1: Gunakan Script Otomatis (Recommended)

**Windows (PowerShell):**
```powershell
.\fix-next-error.ps1
```

**Linux/Mac (Bash):**
```bash
bash fix-next-error.sh
```

Script ini akan:
1. Stop development server yang sedang berjalan
2. Hapus folder `.next` dan cache
3. Berikan opsi untuk restart server

### Opsi 2: Manual Steps

#### Step 1: Stop Development Server
```bash
# Tekan Ctrl+C di terminal
```

#### Step 2: Clean Build & Cache
```bash
# Hapus folder .next
Remove-Item -Recurse -Force .next  # PowerShell
# atau
rm -rf .next                        # Bash

# Hapus cache node_modules (opsional)
Remove-Item -Recurse -Force node_modules/.cache  # PowerShell
# atau
rm -rf node_modules/.cache                        # Bash
```

#### Step 3: Restart Server
```bash
pnpm dev
```

#### Step 4: Clear Browser Cache
1. Tekan `Ctrl+Shift+Delete`
2. Clear cache dan cookies
3. Atau gunakan Incognito/Private mode untuk testing

## 🔧 Troubleshooting

### Jika masih terjadi setelah restart:

#### 1. Cek Console Browser untuk Error
Buka DevTools (F12) dan lihat jika ada error JavaScript yang menyebabkan error overlay aktif.

**Contoh error umum:**
- TypeError: Cannot read property of undefined
- Network errors (gagal fetch data)
- Import errors (module tidak ditemukan)

**Solusi:** Fix error tersebut terlebih dahulu.

#### 2. Nonaktifkan Error Overlay Sementara
Tambahkan di file yang error (sementara):
```javascript
// Nonaktifkan error overlay
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    e.preventDefault()
  })
  window.addEventListener('unhandledrejection', (e) => {
    e.preventDefault()
  })
}
```

#### 3. Clear All Cache
```bash
# Stop server
# Hapus semua cache
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules/.cache
Remove-Item -Recurse -Force .next/cache

# Install ulang dependencies (jika perlu)
Remove-Item -Recurse -Force node_modules
pnpm install

# Restart
pnpm dev
```

#### 4. Cek Port Conflict
Pastikan tidak ada process lain yang menggunakan port 3000:

**Windows:**
```powershell
# Cek port 3000
netstat -ano | findstr :3000

# Kill process (ganti PID dengan angka yang muncul)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Cek port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

#### 5. Restart Komputer
Jika semua cara di atas tidak berhasil, restart komputer untuk clear semua memory cache.

## 📝 Catatan Penting

### Efek Samping Nonaktifkan Source Maps
- **Pro:**
  - Menghentikan request berulang
  - Build lebih cepat
  - Mengurangi memory usage

- **Cons:**
  - Debugging lebih sulit (baris error tidak akurat)
  - Stack trace tidak detail

### Jika Perlu Source Maps untuk Debugging
Edit `next.config.mjs`:
```javascript
webpack: (config, { dev, isServer }) => {
  if (dev) {
    // Gunakan source map ringan
    config.devtool = 'eval-cheap-source-map'  // Lebih cepat
    // atau
    config.devtool = 'eval-source-map'         // Lebih detail
  }
  return config
},
```

## ✅ Verifikasi Solusi Berhasil

Setelah restart, cek:
1. ✅ Terminal tidak ada lagi log `POST /__nextjs_original-stack-frames 404`
2. ✅ Browser console tidak ada error merah
3. ✅ Aplikasi berjalan normal
4. ✅ Page load lebih cepat

## 🆘 Jika Masih Belum Teratasi

1. **Cek apakah ada error di aplikasi:**
   - Buka browser DevTools (F12)
   - Tab Console - lihat error
   - Tab Network - cek failed requests

2. **Share log lengkap:**
   - Terminal output
   - Browser console errors
   - Network tab di DevTools

3. **Verifikasi file config:**
   ```bash
   # Cek next.config.mjs
   cat next.config.mjs
   
   # Cek API route
   cat app/api/__nextjs_original-stack-frames/route.ts
   ```

## 📚 Referensi

- [Next.js Error Overlay](https://nextjs.org/docs/app/building-your-application/configuring/error-handling)
- [Webpack devtool options](https://webpack.js.org/configuration/devtool/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)

---

**Last Updated:** 2025-10-30  
**Status:** ✅ Solusi telah diterapkan  
**Next Action:** Clean build dan restart server


