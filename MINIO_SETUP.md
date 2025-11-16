# MinIO Setup Guide

## 📦 Apa itu MinIO?

MinIO adalah object storage server yang kompatibel dengan Amazon S3 API. Digunakan untuk menyimpan file seperti foto, dokumen, PDF, dll dengan performa tinggi.

## 🚀 Quick Start

### MinIO Server (External)

Server MinIO sudah running di:
- **Endpoint**: 103.151.145.21:990
- **Protocol**: HTTPS (SSL enabled)
- **Bucket**: correspondence-files

Tidak perlu setup Docker, server sudah siap digunakan!

## 📝 Environment Variables

Sudah dikonfigurasi di `.env`:

```env
MINIO_ENDPOINT=103.151.145.21
MINIO_PORT=990
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=NfTGaBQHPnetL8lNZvrb
MINIO_SECRET_KEY=B2ypIasMJA3zD3ofbneA9Ov3brvF3m37cvz6KYsj
MINIO_BUCKET_NAME=correspondence-files
```

⚠️ **Jangan commit file `.env` ke Git!** Credentials harus tetap private.

## 💻 Cara Menggunakan

### Upload File dari Form

```typescript
import { uploadFile } from '@/lib/upload-helper'

// Di component
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  try {
    const fileUrl = await uploadFile(file)
    console.log('File uploaded:', fileUrl)
    // Simpan fileUrl ke database atau state
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
```

### Upload Base64 Data

```typescript
import { uploadBase64 } from '@/lib/upload-helper'

// Untuk data yang sudah dalam format base64
const base64Data = 'data:image/png;base64,iVBORw0KGgo...'
const fileUrl = await uploadBase64(base64Data, 'photo.png')
```

### Upload Multiple Files

```typescript
import { uploadMultipleFiles } from '@/lib/upload-helper'

const files = Array.from(fileInput.files)
const urls = await uploadMultipleFiles(files)
console.log('All files uploaded:', urls)
```

### Server-Side Upload (API Route/Server Action)

```typescript
import { uploadFile, uploadFromBase64 } from '@/lib/minio-client'

// Upload buffer
const buffer = Buffer.from(fileData)
const url = await uploadFile(buffer, 'document.pdf', 'application/pdf')

// Upload dari base64
const url = await uploadFromBase64(base64Data, 'image.jpg')
```

## 🔧 MinIO Client Functions

### Client-Side (Browser)

```typescript
// lib/upload-helper.ts
uploadFile(file: File): Promise<string>
uploadBase64(base64: string, fileName: string): Promise<string>
uploadMultipleFiles(files: File[]): Promise<string[]>
fileToBase64(file: File): Promise<string>
```

### Server-Side (API/Server Actions)

```typescript
// lib/minio-client.ts
uploadFile(buffer, fileName, contentType): Promise<string>
uploadFromBase64(base64Data, fileName): Promise<string>
deleteFile(fileName): Promise<void>
getFileUrl(fileName, expiry?): Promise<string>
listFiles(): Promise<string[]>
```

## 📂 Struktur Bucket

```
correspondence-files/
├── 1234567890-document.pdf
├── 1234567891-photo.jpg
├── 1234567892-sk-document.pdf
└── ...
```

File disimpan dengan format: `{timestamp}-{originalFileName}`

## 🔒 Security

### Production Setup

1. **Ganti Credentials**:
   ```env
   MINIO_ACCESS_KEY=your-secure-access-key
   MINIO_SECRET_KEY=your-secure-secret-key-min-8-chars
   ```

2. **Enable SSL**:
   ```env
   MINIO_USE_SSL=true
   MINIO_ENDPOINT=minio.yourdomain.com
   ```

3. **Bucket Policy** (Optional):
   - Private: Hanya authenticated users yang bisa akses
   - Public Read: Siapapun bisa download (sudah diset by default)

## 🐛 Troubleshooting

### MinIO Container Tidak Start

```bash
# Lihat logs
docker-compose -f docker-compose.minio.yml logs -f

# Restart container
docker-compose -f docker-compose.minio.yml restart
```

### Connection Error

- Pastikan MinIO container running: `docker ps`
- Cek network: `docker network ls`
- Cek port: http://localhost:9000/minio/health/live

### Upload Error

```typescript
// Debug mode - lihat error details
try {
  const url = await uploadFile(file)
} catch (error) {
  console.error('Upload error:', error)
  // Cek apakah bucket exists
  // Cek apakah MinIO running
}
```

## 📊 Monitoring

### Via MinIO Console

1. Buka http://localhost:9001
2. Login dengan credentials
3. Lihat:
   - Buckets
   - Objects/Files
   - Storage usage
   - Access logs

### Via API

```bash
# Health check
curl http://localhost:9000/minio/health/live

# List buckets
curl http://localhost:9000/ -H "Authorization: AWS4-HMAC-SHA256..."
```

## 🔄 Migration dari Base64

### Before (Base64 di Database)
```typescript
// Simpan file sebagai base64 string
const base64 = await fileToBase64(file)
// Simpan base64 ke database (besar!)
```

### After (MinIO)
```typescript
// Upload ke MinIO
const fileUrl = await uploadFile(file)
// Simpan hanya URL ke database (kecil!)
```

## 🌐 Integration Examples

### Correspondence Form

```typescript
// Di correspondence form
const handleFileUpload = async (file: File) => {
  setUploading(true)
  try {
    const url = await uploadFile(file)

    // Update form data
    setFormData({
      ...formData,
      skDocument: {
        name: file.name,
        url: url,
        size: file.size,
        type: file.type
      }
    })

    toast({ title: "File uploaded successfully" })
  } catch (error) {
    toast({
      title: "Upload failed",
      variant: "destructive"
    })
  } finally {
    setUploading(false)
  }
}
```

## 📦 Backup & Restore

### Backup MinIO Data

```bash
# Backup volume
docker run --rm \
  -v minio_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/minio-backup.tar.gz /data
```

### Restore MinIO Data

```bash
# Restore volume
docker run --rm \
  -v minio_data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/minio-backup.tar.gz -C /
```

## 🎯 Best Practices

1. **File Naming**: Gunakan timestamp untuk unique names
2. **File Size**: Limit upload size di frontend (max 10MB recommended)
3. **File Types**: Validasi file type sebelum upload
4. **Cleanup**: Delete old files yang tidak terpakai
5. **Caching**: Set proper cache headers untuk performa

## 📚 Resources

- [MinIO Documentation](https://min.io/docs/minio/linux/index.html)
- [MinIO Client SDK](https://min.io/docs/minio/linux/developers/javascript/minio-javascript.html)
- [S3 API Reference](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
