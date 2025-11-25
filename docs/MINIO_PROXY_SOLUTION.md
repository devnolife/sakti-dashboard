# MinIO Proxy Solution - Solusi Mixed Content Problem

## ❌ Masalah yang Terjadi

### Mixed Content Error:
```
Aplikasi: https://yourapp.com (HTTPS)
MinIO: http://103.151.145.21:990 (HTTP)

❌ Browser blocks HTTP requests from HTTPS pages!
```

### Error di Browser Console:
```
Mixed Content: The page at 'https://...' was loaded over HTTPS,
but requested an insecure resource 'http://...'.
This request has been blocked.
```

---

## ✅ Solusi: Next.js API Proxy

### Cara Kerja:

```
┌─────────┐  HTTPS   ┌──────────────┐  HTTP   ┌───────┐
│ Browser │ ────────▶│  Next.js API │────────▶│ MinIO │
│         │          │    Proxy     │         │       │
│         │◀──────── │              │◀─────── │       │
└─────────┘  HTTPS   └──────────────┘  HTTP   └───────┘
```

**Keuntungan:**
1. ✅ Browser hanya komunikasi via HTTPS dengan Next.js
2. ✅ Next.js fetch file dari MinIO via HTTP (server-to-server, aman)
3. ✅ No mixed content warning!
4. ✅ Bisa add security/authentication layer
5. ✅ Bisa add caching untuk performa

---

## 🔧 Implementation

### 1. API Proxy Route
File: `app/api/minio-proxy/[...path]/route.ts`

```typescript
// Proxy semua request file ke MinIO
GET /api/minio-proxy/filename.pdf
  ↓
MinIO: simtekmu/filename.pdf
  ↓
Return file to browser (HTTPS)
```

### 2. Updated MinIO Client
File: `lib/minio-client.ts`

**Sebelum (Direct URL):**
```typescript
url = `http://103.151.145.21:990/simtekmu/file.pdf`  // ❌ HTTP!
```

**Sesudah (Proxy URL):**
```typescript
url = `/api/minio-proxy/file.pdf`  // ✅ Relative URL (ikut protokol page)
```

---

## 📝 Cara Menggunakan

### Upload File:
```typescript
import { uploadFile } from '@/lib/upload-helper'

const fileUrl = await uploadFile(file)
// Returns: "/api/minio-proxy/1234567890-document.pdf"
```

### Preview File:
```typescript
// PDF Preview
<iframe
  src="/api/minio-proxy/1234567890-document.pdf"
  className="w-full h-96"
/>

// Image Preview
<img
  src="/api/minio-proxy/1234567890-photo.jpg"
  alt="Preview"
/>

// Download Link
<a
  href="/api/minio-proxy/1234567890-file.pdf"
  download
>
  Download File
</a>
```

---

## 🚀 Keuntungan Tambahan

### 1. Security
Bisa add authentication di proxy:
```typescript
export async function GET(request: NextRequest) {
  // Check user authentication
  const session = await getSession(request)
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Check file access permissions
  if (!userHasAccessToFile(session.userId, fileName)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Proceed with file proxy...
}
```

### 2. Caching
Bisa cache file di CDN/edge:
```typescript
headers: {
  'Cache-Control': 'public, max-age=31536000, immutable',
}
```

### 3. Analytics
Bisa track file downloads:
```typescript
// Log file access
await logFileAccess(userId, fileName)
```

### 4. Transformasi
Bisa resize/compress image on-the-fly:
```typescript
// Resize image before sending to browser
if (fileName.endsWith('.jpg')) {
  const resized = await resizeImage(buffer)
  return new NextResponse(resized)
}
```

---

## 🧪 Testing

### Test di Development:
```bash
# Start server
npm run dev

# Test upload & preview
http://localhost:3002/test/minio-upload
```

### Test Proxy Endpoint:
```bash
# Upload file dulu via UI
# Kemudian test URL-nya

curl http://localhost:3002/api/minio-proxy/1234567890-test.pdf
# Should return the file
```

---

## 📊 Performance

### Proxy vs Direct:

**Direct MinIO URL:**
- ✅ Faster (no proxy overhead)
- ❌ Mixed content issues
- ❌ No security layer
- ❌ No caching control

**Proxy URL:**
- ✅ No mixed content issues ✨
- ✅ Can add security/auth
- ✅ Better caching control
- ✅ Can add transformation
- ⚠️ Slight overhead (minimal, ~10-20ms)

**Verdict:** Proxy approach lebih baik untuk production!

---

## 🔒 Security Considerations

### Public Files (Certificate, Surat):
```typescript
// No auth needed - anyone can access
export async function GET(request: NextRequest) {
  // Langsung proxy file
  const stream = await minioClient.getObject(bucketName, fileName)
  return new NextResponse(stream)
}
```

### Private Files (Draft, Personal Documents):
```typescript
// Need authentication
export async function GET(request: NextRequest) {
  // Check user session
  const session = await auth()
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Check ownership
  const file = await db.file.findUnique({ where: { name: fileName } })
  if (file.userId !== session.userId) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Proxy file
  const stream = await minioClient.getObject(bucketName, fileName)
  return new NextResponse(stream)
}
```

---

## 🌐 Production Deployment

### Vercel/Netlify:
```typescript
// Next.js API routes work out-of-the-box!
// No additional config needed
```

### Custom Server:
```typescript
// Make sure server supports API routes
// Usually automatic with Next.js
```

### CDN Caching:
```typescript
// Add cache headers for CDN
headers: {
  'Cache-Control': 'public, max-age=31536000',
  'CDN-Cache-Control': 'max-age=31536000',
}
```

---

## 📈 Monitoring

### Log File Access:
```typescript
console.log(`📥 File accessed: ${fileName}`)
console.log(`   User: ${session?.userId}`)
console.log(`   IP: ${request.ip}`)
console.log(`   Time: ${new Date().toISOString()}`)
```

### Error Tracking:
```typescript
try {
  // Proxy file
} catch (error) {
  // Send to error tracking service
  Sentry.captureException(error)

  return NextResponse.json({ error: 'Failed to load file' })
}
```

---

## ❓ FAQ

### Q: Apakah proxy membuat loading lebih lambat?
A: Overhead minimal (~10-20ms). Dengan caching, bisa lebih cepat dari direct access!

### Q: Apakah bisa pakai direct URL jika app di HTTP?
A: Bisa, tapi tidak recommended. Proxy approach lebih flexible.

### Q: Bagaimana dengan file besar (100MB+)?
A: Proxy menggunakan streaming, jadi memory usage minimal. File besar tetap lancar!

### Q: Bisa add watermark atau resize image?
A: Ya! Proxy bisa modify file sebelum dikirim ke browser.

### Q: Apakah secure?
A: Lebih secure dari direct access karena bisa add auth layer!

---

## 🎯 Kesimpulan

**Proxy Solution Benefits:**
✅ Solves mixed content (HTTPS/HTTP) problem
✅ Better security with auth layer
✅ Flexible - bisa add features (resize, watermark, etc)
✅ Better caching control
✅ Production-ready
✅ Works di Vercel/Netlify/Custom server

**URL Format:**
```
Before: http://103.151.145.21:990/simtekmu/file.pdf  ❌
After:  /api/minio-proxy/file.pdf                     ✅
```

**Testing:**
1. Upload file di `/test/minio-upload`
2. Lihat URL yang dihasilkan
3. Preview harus langsung muncul (no mixed content error!)
4. Works di HTTP dan HTTPS! 🎉
