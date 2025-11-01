# Solusi: Request __nextjs_original-stack-frames 404

## Masalah
Next.js terus menerus melakukan request ke `/__nextjs_original-stack-frames` dan mendapatkan 404 error, menyebabkan console spam dan overhead development.

## Penyebab
Request ini terjadi karena Next.js error overlay di development mode mencoba fetch source maps untuk debugging error yang terjadi di aplikasi.

## Solusi yang Telah Diterapkan

### 1. API Route Handler
Telah dibuat route handler di `app/api/__nextjs_original-stack-frames/route.ts` yang:
- Menangani POST dan GET request
- Mengembalikan response kosong dengan format yang sesuai
- Menghentikan 404 error

### 2. Webpack Configuration
Telah diupdate `next.config.mjs` dengan:
- Konfigurasi source map yang lebih ringan (`eval-source-map`)
- Mengurangi overhead development tanpa menonaktifkan debugging sepenuhnya

## Cara Menggunakan

### Opsi 1: Gunakan Source Map Ringan (Recommended)
Konfigurasi saat ini menggunakan `eval-source-map` yang masih memungkinkan debugging tapi lebih cepat.

### Opsi 2: Nonaktifkan Source Map Sepenuhnya
Jika masih mengalami masalah, ubah di `next.config.mjs`:
```javascript
config.devtool = false  // Nonaktifkan source maps
```

### Opsi 3: Gunakan API Route Saja
Jika ingin tetap menggunakan source maps default, cukup gunakan API route yang sudah dibuat.

## Testing

1. Restart development server:
```bash
pnpm dev
```

2. Cek console browser - seharusnya tidak ada lagi request 404 ke `__nextjs_original-stack-frames`

3. Error overlay Next.js masih akan berfungsi normal untuk debugging

## Troubleshooting

Jika masalah masih terjadi:
1. Clear browser cache dan localStorage
2. Restart development server
3. Coba nonaktifkan browser extensions yang mungkin memicu request
4. Check apakah ada error di aplikasi yang menyebabkan error overlay aktif terus menerus

## Catatan
- Solusi ini tidak mempengaruhi production build
- Source maps tetap tersedia untuk debugging yang lebih baik
- API route akan mengembalikan response kosong jika source maps tidak tersedia

