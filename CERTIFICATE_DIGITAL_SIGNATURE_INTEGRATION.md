# 🔐 Certificate Digital Signature Integration

## Overview

Sistem sertifikat laboratorium telah **TERINTEGRASI PENUH** dengan sistem digital signature menggunakan **HMAC-SHA256**. Setiap sertifikat yang disimpan akan otomatis:

1. ✅ **Generate PDF** dengan password protection
2. ✅ **Upload PDF** ke MinIO object storage
3. 🔐 **Create Digital Signature** menggunakan HMAC-SHA256
4. 📱 **Generate QR Code** untuk verifikasi signature
5. ☁️ **Upload QR Code** ke MinIO
6. 💾 **Save semua data** ke database (PDF URL, password, signature, QR URL)

---

## 🎯 Fitur Lengkap

### 1. **PDF Generation & Protection**
- Professional 2-page certificate (front & back)
- Password protection unik per certificate
- Border, typography, QR code embedded

### 2. **Digital Signature (HMAC-SHA256)**
- **Tamper-proof**: Perubahan data apapun invalidates signature
- **Secret key based**: Hanya server yang punya secret key
- **Timing-safe comparison**: Mencegah timing attacks
- **Unique per certificate**: Setiap sertifikat punya signature unik

### 3. **QR Code Verification**
- QR code berisi: verification URL + signature
- Scan QR → Redirect ke halaman verifikasi publik
- Real-time verification dengan database
- Tracking: Increment verification count setiap kali discan

### 4. **MinIO Storage**
- **PDF Files**: `certificate-{verificationId}.pdf`
- **QR Codes**: `qr-signature-{verificationId}.png`
- Permanent URLs yang dapat diakses kapan saja

---

## 🔧 Technical Architecture

### Database Schema

```typescript
model laboratory_certificates {
  // Basic Info
  id                String   @id @default(cuid())
  verification_id   String   @unique
  certificate_title String
  participant_name  String
  program_name      String

  // PDF Storage (MinIO)
  pdf_url           String?   // URL to PDF in MinIO
  pdf_password      String?   // Password for PDF protection

  // Digital Signature (HMAC-SHA256)
  signature         String?   // HMAC-SHA256 hash
  signature_data    Json?     // Signed data (for audit)
  qr_signature_url  String?   // URL to QR code in MinIO
  signed_at         DateTime? // When signature was created
  signed_by         String?   // Who signed (name + role)
  verification_count Int      @default(0) // Times verified

  // Prodi Association
  prodi_id          String
  created_by        String?

  // Timestamps
  created_at        DateTime  @default(now())
  updated_at        DateTime  @updatedAt

  // Relations
  prodi             prodi     @relation(...)
}
```

### Signature Algorithm

```typescript
// 1. Prepare signature payload
const signaturePayload: DocumentSignature = {
  documentId: verificationId,
  documentNumber: verificationId,
  issueDate: issueDate,
  signerName: "Laboratory Admin",
  signerRole: "laboratory_admin",
  timestamp: Date.now(),
}

// 2. Generate HMAC-SHA256 signature
const signature = HMAC-SHA256(
  JSON.stringify(signaturePayload),
  SECRET_KEY
)

// 3. Create verification URL
const encodedData = base64url(JSON.stringify(signaturePayload))
const verificationUrl = `${BASE_URL}/verify-certificate/${encodedData}/${signature}`

// 4. Generate QR Code
const qrCode = QRCode.generate(verificationUrl)
```

---

## 📊 Integration Flow

### Certificate Creation Flow

```
User Uploads Excel
    ↓
For Each Certificate:
    ↓
1. Generate PDF (2 pages)
    ↓
2. Create Random Password
    ↓
3. Upload PDF to MinIO → Get PDF URL
    ↓
4. Generate Digital Signature (HMAC-SHA256)
    ↓
5. Create Signature Payload
    ↓
6. Generate QR Code with Verification URL
    ↓
7. Upload QR Code to MinIO → Get QR URL
    ↓
8. Save Everything to Database:
   - PDF URL & Password
   - Signature & Signature Data
   - QR URL & Signed Info
    ↓
Success! Certificate is ready
```

### Verification Flow

```
User Scans QR Code
    ↓
Redirected to: /verify-certificate/{data}/{signature}
    ↓
1. Decode Base64URL data
    ↓
2. Re-compute HMAC-SHA256 with same secret key
    ↓
3. Compare signatures (timing-safe)
    ↓
4. If Match:
   - Query certificate from database
   - Increment verification_count
   - Return certificate details
    ↓
5. If Not Match:
   - Return error: "Invalid signature"
```

---

## 🚀 API Endpoints

### 1. **POST /api/certificates/bulk**

Generate certificates with digital signatures

**Request:**
```json
{
  "certificates": [
    {
      "verificationId": "CERT-20251123-NJS-A1B2",
      "certificateTitle": "Backend Developer",
      "name": "Ahmad Rizki",
      "program": "Backend Development",
      "issueDate": "2025-01-23",
      // ... other certificate data
    }
  ]
}
```

**Process:**
- Generate PDF for each certificate
- Create password protection
- Generate HMAC-SHA256 signature
- Generate QR code with verification URL
- Upload PDF + QR to MinIO
- Save to database

**Response:**
```json
{
  "success": true,
  "message": "Successfully processed 5 of 5 certificates",
  "count": 5,
  "successful": ["CERT-001", "CERT-002", ...],
  "failed": [],
  "totalProcessed": 5
}
```

### 2. **GET /api/certificates/verify**

Verify certificate signature

**Request:**
```
GET /api/certificates/verify?data={base64url_data}&signature={hmac_hash}
```

**Response (Valid):**
```json
{
  "success": true,
  "data": {
    "verificationId": "CERT-20251123-NJS-A1B2",
    "certificateTitle": "Backend Developer",
    "participantName": "Ahmad Rizki",
    "programName": "Backend Development",
    "issueDate": "2025-01-23T00:00:00.000Z",
    "overallGrade": "A+",
    "prodiName": "Teknik Informatika",
    "signedBy": "Admin Lab (laboratory_admin)",
    "signedAt": "2025-01-23T10:30:00.000Z",
    "verificationCount": 5,
    "isValid": true
  }
}
```

**Response (Invalid):**
```json
{
  "success": false,
  "error": "Invalid signature - document may have been tampered with"
}
```

### 3. **GET /api/certificates**

Get all certificates with signature info

**Response includes:**
- `signature`: HMAC-SHA256 hash
- `qr_signature_url`: URL to QR code
- `signed_at`: Timestamp
- `signed_by`: Signer info
- `verification_count`: Times verified

---

## 💻 Frontend Integration

### Certificate History Page

```typescript
// Display signature badge
{cert.signature && (
  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
    <Shield className="h-3 w-3" />
    Signed
  </Badge>
)}

// Download QR Code button
{cert.qr_signature_url && (
  <Button
    variant="default"
    size="sm"
    className="bg-blue-600 hover:bg-blue-700"
    onClick={() => window.open(cert.qr_signature_url!, '_blank')}
  >
    <QrCode className="h-4 w-4 mr-1" />
    QR
  </Button>
)}

// Download PDF with password
{cert.pdf_url && (
  <Button
    onClick={() => handleDownloadPDF(cert)}
  >
    <Download className="h-4 w-4 mr-1" />
    PDF
  </Button>
)}
```

### Public Verification Page

Location: `/verify-certificate/[data]/[signature]/page.tsx`

Features:
- ✅ Beautiful gradient design
- ✅ Real-time verification
- ✅ Show certificate details
- ✅ Display signature info
- ✅ Security indicators
- ✅ Verification count
- ✅ Invalid signature warnings

---

## 🔒 Security Features

### 1. **HMAC-SHA256 Signature**
```typescript
// Generate signature
const signature = crypto
  .createHmac('sha256', SECRET_KEY)
  .update(JSON.stringify(data))
  .digest('hex')

// Verify signature
const isValid = crypto.timingSafeEqual(
  Buffer.from(receivedSignature),
  Buffer.from(expectedSignature)
)
```

**Benefits:**
- ✅ Tamper-proof (any change invalidates signature)
- ✅ Secret key protection
- ✅ Timing attack resistance
- ✅ Industry-standard algorithm

### 2. **Password Protection**
```typescript
const password = generatePDFPassword() // 12 random chars
// Example: "aB3$xY9#mK2@"
```

**Benefits:**
- ✅ Unique per certificate
- ✅ Strong (uppercase, lowercase, numbers, symbols)
- ✅ Prevents unauthorized access

### 3. **MinIO Storage Security**
- ✅ SSL/HTTPS enabled
- ✅ Access control
- ✅ Proxy endpoint for better security

### 4. **Verification Tracking**
- ✅ Increment count on each verification
- ✅ Audit trail
- ✅ Detect suspicious activity

---

## 📱 QR Code Structure

### QR Code Content
```
https://your-domain.com/verify-certificate/{encodedData}/{signature}
```

### Encoded Data (Base64URL)
```json
{
  "documentId": "CERT-20251123-NJS-A1B2",
  "documentNumber": "CERT-20251123-NJS-A1B2",
  "issueDate": "2025-01-23",
  "signerName": "Laboratory Admin",
  "signerRole": "laboratory_admin",
  "timestamp": 1737619200000
}
```

### Signature
```
64-character HMAC-SHA256 hex string
Example: "a1b2c3d4e5f6...9899aabbccdd"
```

---

## 🎨 User Experience

### For Laboratory Admins

1. **Upload Excel** dengan data certificates
2. **Click "Save to DB"**
   - Loading indicator ditampilkan
   - Progress untuk setiap certificate
3. **Success Message**
   - "Successfully processed X certificates"
   - Saved indicator dengan checkmark
4. **View History**
   - See "Signed" badge untuk certificates yang sudah disignature
   - Click "QR" button untuk download QR code
   - Click "PDF" button untuk download PDF dengan password

### For Public Verification

1. **Scan QR Code** dari sertifikat
2. **Automatic Redirect** ke verification page
3. **Instant Verification**
   - Loading animation
   - Beautiful result page
4. **View Details**
   - Certificate info
   - Participant info
   - Signature info
   - Verification count

---

## 📁 File Structure

```
lib/
├── signature-utils.ts              # HMAC-SHA256 signature utilities
├── pdf-generator.ts                # PDF generation with protection
└── minio-client.ts                 # MinIO upload/download

app/api/certificates/
├── bulk/route.ts                   # Create certificates + signatures
├── verify/route.ts                 # Verify signature
├── route.ts                        # List certificates
└── [id]/route.ts                   # Single certificate ops

app/verify-certificate/
└── [data]/[signature]/page.tsx     # Public verification page

app/dashboard/laboratory_admin/certificates/
├── generate/page.tsx               # Generate & save certificates
└── history/page.tsx                # View, download, verify certificates

prisma/
├── schema.prisma                   # Database schema with signature fields
└── migrations/
    ├── 20251123101645_add_pdf_fields_to_certificates/
    └── 20251123102804_add_digital_signature_to_certificates/

Documentation/
├── CERTIFICATE_PDF_GUIDE.md                           # PDF generation guide
├── DIGITAL_SIGNATURE_GUIDE.md                         # Original signature system
└── CERTIFICATE_DIGITAL_SIGNATURE_INTEGRATION.md       # This document
```

---

## 🧪 Testing

### 1. Test Certificate Creation

```bash
# Upload certificates via UI or API
POST /api/certificates/bulk
{
  "certificates": [...]
}

# Verify response includes:
- PDF URL
- PDF password
- Signature
- QR signature URL
```

### 2. Test Verification

```bash
# Extract data and signature from QR URL
# Example: /verify-certificate/{data}/{signature}

GET /api/certificates/verify?data=eyJ...&signature=a1b2c3...

# Expected:
- success: true
- certificate data returned
- verification_count incremented
```

### 3. Test Invalid Signature

```bash
# Modify data or signature parameter
GET /api/certificates/verify?data=MODIFIED&signature=abc123

# Expected:
- success: false
- error: "Invalid signature"
```

---

## 🔧 Configuration

### Environment Variables

```env
# Digital Signature
SIGNATURE_SECRET_KEY=your-super-secret-key-min-32-chars

# MinIO
MINIO_ENDPOINT=103.151.145.21
MINIO_PORT=990
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET_NAME=correspondence-files

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Generate Secret Key

```bash
# Generate secure random key
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📊 Database Queries

### Get Signed Certificates

```sql
SELECT
  verification_id,
  participant_name,
  signature,
  signed_at,
  signed_by,
  verification_count
FROM laboratory_certificates
WHERE signature IS NOT NULL
ORDER BY signed_at DESC;
```

### Get Verification Statistics

```sql
SELECT
  COUNT(*) as total_certificates,
  COUNT(signature) as signed_certificates,
  SUM(verification_count) as total_verifications,
  AVG(verification_count) as avg_verifications_per_cert
FROM laboratory_certificates;
```

### Get Most Verified Certificates

```sql
SELECT
  verification_id,
  participant_name,
  program_name,
  verification_count
FROM laboratory_certificates
WHERE signature IS NOT NULL
ORDER BY verification_count DESC
LIMIT 10;
```

---

## ⚠️ Important Notes

1. **Secret Key Security**
   - ❌ NEVER commit `SIGNATURE_SECRET_KEY` to Git
   - ✅ Store in `.env` and `.env.local`
   - ✅ Use different keys for dev/staging/production

2. **Signature Immutability**
   - ❌ Once signed, data should NOT be modified
   - ✅ If data changes, re-sign with new signature
   - ✅ Keep old signature in audit log

3. **QR Code Permanence**
   - ✅ QR codes are permanent (no expiration)
   - ✅ URLs are stable and won't change
   - ✅ Verification works forever

4. **MinIO Storage**
   - ✅ Both PDF and QR stored in same bucket
   - ✅ Unique filenames prevent conflicts
   - ✅ SSL/HTTPS for secure transfer

5. **Verification Tracking**
   - ✅ Count increments on each scan
   - ✅ Can detect suspicious patterns
   - ✅ Useful for analytics

---

## 🎯 Next Steps & Enhancements

### Planned Features
- [ ] Email certificate dengan QR code ke participant
- [ ] Batch QR code download (ZIP)
- [ ] Certificate revocation system
- [ ] Advanced analytics dashboard
- [ ] Blockchain anchoring (optional)
- [ ] Multi-language verification page
- [ ] Mobile app for scanning
- [ ] Export verification logs

### Improvements
- [ ] Add RSA digital signatures (PKI)
- [ ] Certificate templates customization
- [ ] Watermark on PDF
- [ ] Certificate expiration dates
- [ ] Re-issuance workflow
- [ ] Admin panel for signature management

---

## 📚 References

### Technologies Used
- **HMAC-SHA256**: Industry-standard message authentication
- **pdf-lib**: PDF generation and manipulation
- **qrcode**: QR code generation
- **MinIO**: S3-compatible object storage
- **Prisma**: Type-safe database ORM
- **Next.js**: Full-stack React framework

### Resources
- [HMAC-SHA256 Specification](https://tools.ietf.org/html/rfc2104)
- [Digital Signature Guide](DIGITAL_SIGNATURE_GUIDE.md)
- [MinIO Documentation](MINIO_SETUP.md)
- [PDF Generation Guide](CERTIFICATE_PDF_GUIDE.md)

---

## 📞 Support

### Troubleshooting

**Problem**: Signature verification fails
**Solution**:
1. Check `SIGNATURE_SECRET_KEY` is same on all environments
2. Verify QR code is not corrupted
3. Check database migration ran successfully

**Problem**: QR code not generated
**Solution**:
1. Check MinIO connection
2. Verify bucket exists and is accessible
3. Check API logs for errors

**Problem**: PDF password doesn't work
**Solution**:
1. Copy password from UI (auto-copy on click)
2. Check database for correct password
3. Try downloading PDF again

---

## ✅ Integration Checklist

- [x] Schema migration for signature fields
- [x] HMAC-SHA256 signature generation
- [x] QR code generation with verification URL
- [x] MinIO upload for PDF and QR
- [x] Database storage of all signature data
- [x] Bulk API updated with signature logic
- [x] Verification API endpoint
- [x] Public verification page
- [x] History page with signature display
- [x] QR code download button
- [x] Signature badge indicator
- [x] Documentation complete

---

**Version**: 2.0.0
**Last Updated**: 2025-01-23
**Status**: ✅ PRODUCTION READY

**Integration**: Digital Signature + PDF Protection + MinIO Storage = **COMPLETE**

🎉 **Sistem Sertifikat dengan Digital Signature HMAC-SHA256 Siap Digunakan!**
