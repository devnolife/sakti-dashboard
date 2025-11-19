# MinIO Preview Setup - Penjelasan Lengkap

## Cara Kerja MinIO dengan Domain

### 1. Dua URL yang Berbeda

MinIO menggunakan **dua jenis koneksi** yang berbeda:

#### A. API Connection (Backend)
- **Tujuan:** Upload, delete, dan manajemen file dari aplikasi
- **Endpoint:** `103.151.145.21:990` (HTTP)
- **Digunakan oleh:** Server Next.js (lib/minio-client.ts)
- **Tidak terlihat oleh user**

#### B. Public URL (Frontend)
- **Tujuan:** Akses file dari browser untuk preview/download
- **Endpoint:** `http://minio.if.unismuh.ac.id:9000`
- **Digunakan oleh:** Browser user (iframe, img tag, link download)
- **Terlihat oleh user**

---

## 2. Kenapa Perlu Dua URL?

### Masalah yang Dipecahkan:

**Sebelumnya (pakai IP saja):**
```
Upload: 103.151.145.21:990 ✅
Preview: http://103.151.145.21:990/simtekmu/file.pdf ❌ (kurang profesional)
```

**Sekarang (pakai domain untuk preview):**
```
Upload: 103.151.145.21:990 ✅ (internal, tidak terlihat user)
Preview: http://minio.if.unismuh.ac.id:9000/simtekmu/file.pdf ✅ (profesional!)
```

---

## 3. Alur Upload & Preview

```
1. User pilih file di browser
   ↓
2. File dikirim ke Next.js API (/api/upload)
   ↓
3. Next.js upload ke MinIO via IP (103.151.145.21:990)
   ↓
4. MinIO simpan file di bucket "simtekmu"
   ↓
5. Next.js generate URL dengan domain:
   http://minio.if.unismuh.ac.id:9000/simtekmu/12345-file.pdf
   ↓
6. URL dikembalikan ke browser
   ↓
7. Browser bisa langsung preview via iframe/img tag
```

---

## 4. Konfigurasi di .env

```env
# API Connection - untuk operasi backend
MINIO_ENDPOINT=103.151.145.21        # IP server MinIO
MINIO_PORT=990                        # Port untuk API
MINIO_USE_SSL=false                   # HTTP (bukan HTTPS)
MINIO_ACCESS_KEY=NfTGaBQHPnetL8lNZvrb
MINIO_SECRET_KEY=B2ypIasMJA3zD3ofbneA9Ov3brvF3m37cvz6KYsj
MINIO_BUCKET_NAME=simtekmu

# Public URL - untuk akses file dari browser
MINIO_PUBLIC_URL=http://minio.if.unismuh.ac.id:9000
```

---

## 5. Cara Preview File

### A. PDF Preview (menggunakan iframe)
```typescript
<iframe
  src="http://minio.if.unismuh.ac.id:9000/simtekmu/12345-document.pdf"
  className="w-full h-96 border rounded"
/>
```

### B. Image Preview (menggunakan img)
```typescript
<img
  src="http://minio.if.unismuh.ac.id:9000/simtekmu/12345-photo.jpg"
  alt="Preview"
  className="max-w-md"
/>
```

### C. Download Link
```typescript
<a
  href="http://minio.if.unismuh.ac.id:9000/simtekmu/12345-file.pdf"
  target="_blank"
  download
>
  Download File
</a>
```

---

## 6. Testing Preview

### Langkah Testing:

1. **Buka halaman test:**
   ```
   http://localhost:3002/test/minio-upload
   ```

2. **Upload file (PDF atau gambar)**

3. **Lihat hasilnya:**
   - Tab "Component Upload" - pakai komponen siap pakai
   - Tab "Manual Upload" - pakai custom code
   - Keduanya akan menampilkan:
     - ✅ Nama file
     - ✅ URL file (dengan domain!)
     - ✅ Preview (iframe untuk PDF, img untuk gambar)
     - ✅ Tombol copy URL
     - ✅ Tombol open in new tab

4. **Verifikasi URL:**
   - URL harus mengandung: `minio.if.unismuh.ac.id`
   - Bukan: `103.151.145.21`

---

## 7. Troubleshooting Preview

### Preview tidak muncul?

**Cek 1: Bucket policy**
Bucket harus allow public read. Test dengan:
```bash
npm run minio:test
```

**Cek 2: CORS settings**
MinIO perlu CORS untuk iframe preview. Sudah di-set di bucket policy.

**Cek 3: URL format**
URL harus seperti ini:
```
http://minio.if.unismuh.ac.id:9000/simtekmu/filename.pdf
```

**Cek 4: Browser console**
Buka DevTools → Console, cek ada error atau tidak.

### File terupload tapi URL masih pakai IP?

Restart dev server:
```bash
npm run dev
```

Environment variables baru akan dimuat setelah restart.

---

## 8. Production Checklist

Sebelum deploy ke production:

- [ ] Update MINIO_PUBLIC_URL ke HTTPS jika tersedia
- [ ] Verifikasi bucket policy (public read untuk preview)
- [ ] Test upload & preview dari berbagai device
- [ ] Test download dari berbagai browser
- [ ] Set proper CORS policy
- [ ] Monitor storage usage

---

## 9. Keamanan

### File Privat vs Publik:

**Publik (dengan domain):**
- Siapa saja bisa akses dengan URL
- Cocok untuk: sertifikat, surat yang sudah di-approve
- Preview langsung bisa dibuka

**Privat (dengan presigned URL):**
- URL ada expiry time
- Cocok untuk: dokumen sensitif, draft
- Perlu re-generate URL berkala

**Cara switch:**
Comment `MINIO_PUBLIC_URL` di .env jika mau pakai presigned URL:
```env
# MINIO_PUBLIC_URL=http://minio.if.unismuh.ac.id:9000
```

---

## 10. Kesimpulan

**Status sekarang:**
✅ MinIO sudah bisa digunakan
✅ Upload pakai IP (stabil)
✅ Preview pakai domain (profesional)
✅ Test page ready di `/test/minio-upload`

**Yang perlu dilakukan:**
1. Test upload & preview di `/test/minio-upload`
2. Jika berhasil, integrate ke form correspondence
3. Ganti base64 storage dengan MinIO URLs
4. Deploy!

**Support:**
- Test: `npm run minio:test`
- Dev server: `http://localhost:3002/test/minio-upload`
- Dokumentasi: Baca `MINIO_INTEGRATION_GUIDE.md`
