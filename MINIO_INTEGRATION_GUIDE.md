# MinIO Integration Guide - Ready to Use

## ✅ Setup Selesai!

Semua kode MinIO sudah siap. Ketika MinIO server aktif, semuanya akan langsung berfungsi.

### 📦 Yang Sudah Dikonfigurasi:

1. ✅ **Environment Variables** (.env)
   ```env
   # API Connection (untuk upload/delete - pakai IP)
   MINIO_ENDPOINT=103.151.145.21
   MINIO_PORT=990
   MINIO_USE_SSL=false
   MINIO_BUCKET_NAME=simtekmu

   # Public URL (untuk akses file - pakai domain)
   MINIO_PUBLIC_URL=http://minio.if.unismuh.ac.id:9000
   ```

   **Catatan Penting:**
   - **API Connection** menggunakan IP `103.151.145.21:990` karena ini untuk operasi internal (upload, delete)
   - **Public URL** menggunakan domain `minio.if.unismuh.ac.id:9000` untuk akses file dari browser
   - File yang diupload akan punya URL seperti: `http://minio.if.unismuh.ac.id:9000/simtekmu/1234567890-filename.pdf`

2. ✅ **MinIO Client** (`lib/minio-client.ts`)
   - Upload file
   - Delete file
   - Get file URL
   - List files

3. ✅ **API Endpoint** (`app/api/upload/route.ts`)
   - POST /api/upload untuk upload file
   - Mendukung File object & Base64

4. ✅ **Upload Helper** (`lib/upload-helper.ts`)
   - `uploadFile(file)` - Upload dari File object
   - `uploadBase64(base64, fileName)` - Upload dari base64
   - `uploadMultipleFiles(files[])` - Upload banyak file

5. ✅ **UI Component** (`components/ui/file-upload-minio.tsx`)
   - Ready-to-use upload component dengan preview
   - Drag & drop support
   - Progress indicator

## 🚀 Cara Integrasi ke Form Correspondence

### Option 1: Gunakan Component FileUploadMinio (Recommended)

```typescript
import { FileUploadMinio } from "@/components/ui/file-upload-minio"

// Di dalam component form
const [skDocument, setSkDocument] = useState<{name: string, url: string} | null>(null)

// Di render
<FileUploadMinio
  label="Upload SK PNS/ASN"
  accept="application/pdf"
  maxSize={10}
  onUploadComplete={(url, fileName) => {
    setSkDocument({ name: fileName, url: url })
    // Update form data
    setFormData({
      ...formData,
      additionalInfo: {
        ...formData.additionalInfo,
        skDocument: { name: fileName, url: url }
      }
    })
  }}
  currentFile={skDocument}
  onRemove={() => setSkDocument(null)}
/>
```

### Option 2: Manual Upload

```typescript
import { uploadFile } from "@/lib/upload-helper"

const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  try {
    setUploading(true)

    // Upload ke MinIO
    const fileUrl = await uploadFile(file)

    // Update form data dengan URL dari MinIO
    setFormData({
      ...formData,
      additionalInfo: {
        ...formData.additionalInfo,
        skDocument: {
          name: file.name,
          url: fileUrl,
          size: file.size,
          type: file.type
        }
      }
    })

    toast({ title: "File uploaded successfully" })
  } catch (error) {
    toast({
      title: "Upload failed",
      description: error.message,
      variant: "destructive"
    })
  } finally {
    setUploading(false)
  }
}
```

## 📄 Migrasi dari Base64 ke MinIO

### Before (Base64)
```typescript
// ❌ Simpan base64 di database (berat!)
const base64 = await fileToBase64(file)
formData.skDocument = {
  name: file.name,
  data: base64  // Besar banget!
}
```

### After (MinIO)
```typescript
// ✅ Upload ke MinIO, simpan URL
const fileUrl = await uploadFile(file)
formData.skDocument = {
  name: file.name,
  url: fileUrl  // Hanya URL, ringan!
}
```

## 🎯 Update Form Correspondence yang Ada

### File: `app/dashboard/mahasiswa/correspondence/new/page.tsx`

1. **Import helper**:
   ```typescript
   import { uploadFile } from "@/lib/upload-helper"
   ```

2. **Update state untuk menyimpan URL**:
   ```typescript
   const [uploadedFiles, setUploadedFiles] = useState<{
     skDocument?: { name: string, url: string },
     supportingDocument?: { name: string, url: string },
     paymentProof?: { name: string, url: string }
   }>({})
   ```

3. **Update file upload handler**:
   ```typescript
   const handleFileUpload = async (
     file: File,
     fieldName: 'skDocument' | 'supportingDocument' | 'paymentProof'
   ) => {
     try {
       const fileUrl = await uploadFile(file)

       setUploadedFiles(prev => ({
         ...prev,
         [fieldName]: { name: file.name, url: fileUrl }
       }))

       // Update form data
       setFormData({
         ...formData,
         additionalInfo: {
           ...formData.additionalInfo,
           [fieldName]: { name: file.name, url: fileUrl }
         }
       })
     } catch (error) {
       console.error('Upload error:', error)
       toast({ title: "Upload failed", variant: "destructive" })
     }
   }
   ```

4. **Update preview untuk show file dari URL**:
   ```typescript
   {uploadedFiles.skDocument && (
     <div className="mt-2">
       <p className="text-sm font-medium mb-2">File: {uploadedFiles.skDocument.name}</p>

       {/* Preview PDF dari MinIO URL */}
       <iframe
         src={uploadedFiles.skDocument.url}
         className="w-full border rounded"
         style={{ height: '400px' }}
       />

       {/* Link download */}
       <a
         href={uploadedFiles.skDocument.url}
         target="_blank"
         className="text-sm text-primary hover:underline mt-2 inline-block"
       >
         Download File
       </a>
     </div>
   )}
   ```

## 📊 Database Schema Update

Simpan URL file di database, bukan base64:

```typescript
// Sebelum submit ke database
const letterRequestData = {
  ...formData,
  additionalInfo: {
    ...formData.additionalInfo,
    // URL dari MinIO, bukan base64
    skDocument: uploadedFiles.skDocument?.url,
    supportingDocument: uploadedFiles.supportingDocument?.url,
    paymentProof: uploadedFiles.paymentProof?.url,
  }
}
```

## 🔒 Security Notes

### Production Checklist:

1. ✅ **Validate File Types**:
   ```typescript
   const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
   if (!allowedTypes.includes(file.type)) {
     throw new Error('File type not allowed')
   }
   ```

2. ✅ **Limit File Size** (sudah ada di component):
   ```typescript
   const maxSize = 10 * 1024 * 1024 // 10MB
   if (file.size > maxSize) {
     throw new Error('File too large')
   }
   ```

3. ✅ **Sanitize File Names**:
   ```typescript
   const sanitizeFileName = (name: string) => {
     return name.replace(/[^a-zA-Z0-9.-]/g, '_')
   }
   ```

4. ⚠️ **Access Control**:
   - Pastikan bucket policy sesuai kebutuhan
   - Private untuk dokumen sensitif
   - Public read untuk file yang perlu diakses umum

## 📝 Testing Checklist

Ketika MinIO server sudah aktif:

1. ✅ Run test: `npm run minio:test`
2. ✅ Upload file kecil (< 1MB)
3. ✅ Upload file besar (5-10MB)
4. ✅ Upload berbagai tipe file (PDF, JPG, PNG)
5. ✅ Test preview file
6. ✅ Test download file
7. ✅ Test delete file
8. ✅ Test error handling (file terlalu besar, type tidak valid)

## 🎨 UI/UX Tips

### Show Loading State:
```typescript
{uploading ? (
  <div className="flex items-center gap-2">
    <Loader2 className="w-4 h-4 animate-spin" />
    <span>Uploading...</span>
  </div>
) : (
  <Button>Upload File</Button>
)}
```

### Show Upload Progress (Optional):
```typescript
const [uploadProgress, setUploadProgress] = useState(0)

// Di upload handler
// MinIO client mendukung progress callback
```

### Error Messages:
```typescript
try {
  await uploadFile(file)
} catch (error) {
  if (error.message.includes('Network')) {
    toast({ title: "Koneksi internet bermasalah" })
  } else if (error.message.includes('size')) {
    toast({ title: "File terlalu besar" })
  } else {
    toast({ title: "Gagal upload file" })
  }
}
```

## 🔄 Next Steps

1. **Tunggu MinIO server aktif**
2. **Test koneksi**: `npm run minio:test`
3. **Integrate ke form** menggunakan salah satu option di atas
4. **Test upload & preview**
5. **Update database schema** untuk simpan URL instead of base64
6. **Deploy & monitor**

## 💡 Troubleshooting

### MinIO Server Mati
```bash
# Cek status server
curl https://103.151.145.21:990/minio/health/live

# Atau tunggu saja sampai aktif
```

### Upload Error
- Cek koneksi internet
- Cek MinIO server status
- Cek credentials di .env
- Lihat browser console untuk error details

### Preview Tidak Muncul
- Pastikan URL valid
- Cek bucket policy (harus allow public read untuk preview)
- Cek CORS settings di MinIO

## 📞 Support

Jika ada masalah, cek:
1. Browser console
2. Network tab (lihat request/response)
3. MinIO server logs
4. .env configuration
