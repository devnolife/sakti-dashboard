# Digital Signature System

Sistem tanda tangan digital dengan QR code verification untuk dokumen surat.

## 🔐 Fitur

- **Tanda Tangan Digital**: Setiap dokumen yang disetujui dapat ditandatangani secara digital menggunakan algoritma HMAC-SHA256
- **QR Code**: Generate QR code unik untuk setiap dokumen berdasarkan nomor surat dan timestamp
- **Verifikasi**: Scan QR code untuk memverifikasi keaslian dokumen
- **Tracking**: Mencatat jumlah kali dokumen diverifikasi
- **Keamanan**: Menggunakan cryptographic hash dengan secret key untuk mencegah pemalsuan
- **No Expiration**: QR code tidak memiliki masa kadaluarsa (sesuai permintaan)

## 📁 Struktur File

```
lib/
├── signature-utils.ts          # Utility untuk generate & verify signature
└── qrcode-generator.ts         # Generate QR code dalam berbagai format

app/
├── api/
│   ├── documents/[id]/sign/    # Endpoint untuk sign dokumen
│   └── verify/                 # Endpoint untuk verifikasi
└── verify/[data]/[signature]/  # Public verification page

components/correspondence/
├── sign-document-button.tsx    # Button & dialog untuk sign
├── signature-status-badge.tsx  # Badge untuk status signature
├── view-qrcode-button.tsx      # Button untuk lihat/download QR
└── index.ts                    # Barrel exports

prisma/schema.prisma
└── letter_requests             # Added signature fields
    ├── signature
    ├── signature_data
    ├── qr_code_url
    ├── signed_at
    ├── signed_by
    └── verification_count
└── signature_verifications     # New model untuk tracking
```

## 🔧 Setup

### 1. Environment Variables

Tambahkan ke `.env`:

```bash
# Secret key untuk HMAC signature (gunakan string random 32+ karakter)
SIGNATURE_SECRET_KEY=your-super-secret-key-minimum-32-characters

# Base URL aplikasi (untuk verification links)
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

Generate secret key dengan:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. Database Migration

```bash
npx prisma migrate dev --name add_digital_signatures
```

Migration ini akan:
- Menambahkan 6 field baru ke tabel `letter_requests`
- Membuat tabel baru `signature_verifications`

### 3. Install Dependencies

Dependencies sudah terinstall:
- `qrcode@1.5.4` - QR code generation
- `@types/qrcode@1.5.5` - TypeScript types
- `crypto` - Node.js built-in (HMAC-SHA256)

## 🚀 Usage

### Sign Document (Backend)

```typescript
// POST /api/documents/[id]/sign
import { signDocument, generateSignatureData } from '@/lib/signature-utils'
import { generateQRCodeBuffer } from '@/lib/qrcode-generator'

const documentData = {
  id: letter.id,
  documentNumber: letter.document_number,
  issueDate: letter.issue_date.toISOString(),
  studentName: letter.user.name,
  studentNim: letter.user.nim
}

const signatureData = generateSignatureData(documentData)
const signature = signDocument(signatureData)
const qrCodeBuffer = await generateQRCodeBuffer(verificationUrl)

// Upload QR to MinIO & save to database
```

### Sign Document (Frontend)

```typescript
import { SignDocumentButton } from '@/components/correspondence'

<SignDocumentButton
  documentId={letter.id}
  documentNumber={letter.document_number}
  onSuccess={() => {
    // Refresh data or show success message
  }}
/>
```

### Display Signature Status

```typescript
import { SignatureStatusBadge } from '@/components/correspondence'

<SignatureStatusBadge
  isSigned={!!letter.signature}
  signedAt={letter.signed_at}
  signedBy={letter.signed_by}
  verificationCount={letter.verification_count}
/>
```

### View QR Code

```typescript
import { ViewQRCodeButton } from '@/components/correspondence'

{letter.qr_code_url && (
  <ViewQRCodeButton
    qrCodeUrl={letter.qr_code_url}
    documentNumber={letter.document_number}
    verificationUrl={`${process.env.NEXT_PUBLIC_APP_URL}/verify/${data}/${signature}`}
  />
)}
```

### Verify Document

Scan QR code atau akses URL:
```
https://your-domain.com/verify/{base64url_data}/{signature_hash}
```

Data format (Base64URL encoded):
```json
{
  "id": 123,
  "documentNumber": "001/FT/2025",
  "issueDate": "2025-01-15T10:30:00Z",
  "studentName": "John Doe",
  "studentNim": "2021001",
  "timestamp": 1737196800000
}
```

## 🔒 Algoritma Keamanan

### 1. Signature Generation

```typescript
HMAC-SHA256(data + secret_key) → signature_hash
```

- **Data**: JSON object dengan ID, nomor surat, tanggal, mahasiswa, timestamp
- **Secret Key**: 32+ karakter random string dari environment variable
- **Output**: 64 karakter hex string (SHA256 hash)

### 2. QR Code Content

```
{base_url}/verify/{base64url_data}/{signature_hash}
```

- **base64url_data**: Base64URL encoding (URL-safe) dari document data
- **signature_hash**: HMAC-SHA256 signature untuk verifikasi

### 3. Verification Process

1. Decode Base64URL data dari QR
2. Re-compute HMAC-SHA256 dengan secret key yang sama
3. Compare signature menggunakan `timingSafeEqual` (prevent timing attacks)
4. Jika match: valid ✅
5. Jika tidak match: invalid ❌

### 4. Keamanan

- ✅ **Tamper-proof**: Perubahan data apapun akan mengubah signature
- ✅ **Secret key**: Hanya server yang tahu secret key
- ✅ **Timing-safe comparison**: Mencegah timing attack
- ✅ **Unique per document**: Setiap dokumen punya signature unik
- ✅ **No expiration**: QR code valid selamanya (sesuai requirement)

## 📊 Database Schema

### letter_requests (modified)

```prisma
model letter_requests {
  // ... existing fields ...
  
  signature          String?   // HMAC-SHA256 signature
  signature_data     Json?     // Data yang di-sign (untuk audit)
  qr_code_url        String?   // MinIO URL untuk QR code image
  signed_at          DateTime? // Timestamp signature dibuat
  signed_by          String?   // User yang sign (nama + role)
  verification_count Int       @default(0) // Jumlah kali diverifikasi
  
  verifications      signature_verifications[]
}
```

### signature_verifications (new)

```prisma
model signature_verifications {
  id              Int            @id @default(autoincrement())
  letter_id       Int
  verified_at     DateTime       @default(now())
  ip_address      String?
  user_agent      String?
  is_valid        Boolean
  
  letter          letter_requests @relation(fields: [letter_id], references: [id])
}
```

## 🧪 Testing

### 1. Sign Document

```bash
curl -X POST http://localhost:3000/api/documents/123/sign \
  -H "Cookie: your-session-cookie"
```

Expected response:
```json
{
  "success": true,
  "signature": "abc123...",
  "qrCodeUrl": "https://minio.../qr-code-123.png",
  "verificationUrl": "https://domain.com/verify/..."
}
```

### 2. Verify Document

```bash
curl "http://localhost:3000/api/verify?data=eyJ...&signature=abc123..."
```

Expected response (valid):
```json
{
  "success": true,
  "data": {
    "documentNumber": "001/FT/2025",
    "issueDate": "2025-01-15T10:30:00Z",
    "studentName": "John Doe",
    "studentNim": "2021001",
    "status": "approved",
    "signedBy": "Dr. Dekan (dekan)",
    "signedAt": "2025-01-15T11:00:00Z",
    "verificationCount": 1
  }
}
```

### 3. Test Invalid Signature

Ubah salah satu parameter di URL verification → harus return error:
```json
{
  "success": false,
  "error": "Invalid signature"
}
```

## 🎨 UI Components

### SignDocumentButton

Dialog dengan 2 state:
1. **Before signing**: Konfirmasi + disclaimer
2. **After signing**: Success message + QR code preview

### SignatureStatusBadge

Badge dengan tooltip:
- 🕒 **Gray**: Belum ditandatangani
- ✅ **Green**: Sudah ditandatangani + verification count

### ViewQRCodeButton

Dialog dengan:
- QR code image preview (300x300px)
- Download button (save as PNG)
- Open verification URL button

## 📝 Integration Guide

### Letter Request List Page

```typescript
// Add to columns definition
{
  accessorKey: "signature",
  header: "Status Tanda Tangan",
  cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <SignatureStatusBadge
        isSigned={!!row.original.signature}
        signedAt={row.original.signed_at}
        signedBy={row.original.signed_by}
        verificationCount={row.original.verification_count}
      />
      {row.original.qr_code_url && (
        <ViewQRCodeButton
          qrCodeUrl={row.original.qr_code_url}
          documentNumber={row.original.document_number}
        />
      )}
    </div>
  ),
}
```

### Letter Request Detail Page

```typescript
{letter.status === 'approved' && !letter.signature && (
  <SignDocumentButton
    documentId={letter.id}
    documentNumber={letter.document_number}
    onSuccess={() => router.refresh()}
  />
)}
```

### Document Generation (docxtemplater)

Setelah generate DOCX, sign dokumen dan embed QR code:

```typescript
// 1. Generate DOCX file
const doc = new Docxtemplater(zip, { ... })
doc.render(data)
const buffer = doc.getZip().generate({ type: 'nodebuffer' })

// 2. Sign document
const signResult = await fetch(`/api/documents/${letterId}/sign`, {
  method: 'POST'
})
const { qrCodeUrl } = await signResult.json()

// 3. Download QR dan embed ke DOCX (optional)
// Atau tampilkan di halaman preview untuk user cetak manual
```

## 🔄 Migration Rollback

Jika perlu rollback:

```sql
-- Remove signature fields from letter_requests
ALTER TABLE letter_requests 
DROP COLUMN signature,
DROP COLUMN signature_data,
DROP COLUMN qr_code_url,
DROP COLUMN signed_at,
DROP COLUMN signed_by,
DROP COLUMN verification_count;

-- Drop signature_verifications table
DROP TABLE signature_verifications;
```

## ⚠️ Important Notes

1. **Secret Key**: Jangan commit `SIGNATURE_SECRET_KEY` ke Git! Simpan di `.env` dan `.env.local`
2. **Database Offline**: Migration pending sampai database online
3. **MinIO**: QR code disimpan di bucket `/qrcodes/`
4. **No Expiration**: QR code valid selamanya (tidak ada TTL check)
5. **Permissions**: Hanya role tertentu yang bisa sign (dekan, wd1-3, admin_umum, staff_tu, prodi)
6. **Status Check**: Dokumen harus status `approved` sebelum bisa di-sign

## 🎯 Next Steps

- [ ] Test signature system setelah database online
- [ ] Integrate ke existing letter request pages
- [ ] Add signature column to DataTable
- [ ] Embed QR code ke generated DOCX files
- [ ] Add audit log untuk signing activities
- [ ] Create admin dashboard untuk signature statistics
- [ ] Add bulk signing feature untuk multiple documents
- [ ] Export verification logs to CSV

## 📞 Support

Jika ada pertanyaan atau issue:
1. Check database connection
2. Verify environment variables
3. Test API endpoints dengan curl/Postman
4. Check MinIO bucket permissions
5. Review Prisma migration logs

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-15  
**Maintained by**: Development Team
