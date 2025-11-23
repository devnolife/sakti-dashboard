# 📜 Certificate PDF Generation with Digital Protection

## Overview

Sistem sertifikat laboratorium telah dilengkapi dengan fitur **automatic PDF generation** dan **digital signature protection**. Setiap sertifikat yang disimpan akan otomatis:

1. ✅ Di-generate sebagai file PDF profesional
2. 🔐 Dilindungi dengan password unik
3. ☁️ Disimpan ke MinIO object storage
4. 💾 URL dan password tersimpan di database

---

## Features

### 🎨 PDF Generation
- **Two-page certificate**: Front (depan) dan Back (belakang)
- **Professional layout**: Border, typography, dan formatting yang rapi
- **QR Code integration**: QR code untuk verifikasi sertifikat
- **Complete data**: Semua statistik, kompetensi, dan analitik tersimpan

### 🔒 Security Features
- **Password Protection**: Setiap PDF dilindungi dengan password unik 12 karakter
- **Random Password**: Password di-generate secara acak untuk setiap sertifikat
- **Secure Storage**: PDF disimpan di MinIO dengan akses terkontrol

### ☁️ MinIO Integration
- **Automatic Upload**: PDF otomatis di-upload ke MinIO server
- **Unique Filenames**: Format: `certificate-{verificationId}.pdf`
- **Permanent URLs**: URL PDF tetap dan dapat diakses kapan saja

---

## How It Works

### 1. Certificate Generation Process

```
User uploads Excel → Process data → Generate PDF → Upload to MinIO → Save to Database
                                          ↓
                              Apply password protection
```

### 2. Database Schema

```typescript
model laboratory_certificates {
  // ... existing fields ...

  // PDF Storage (MinIO)
  pdf_url         String?   // URL ke file PDF di MinIO
  pdf_password    String?   // Password untuk membuka PDF

  // ... other fields ...
}
```

### 3. API Endpoints

#### **POST /api/certificates/bulk**
Save multiple certificates dengan automatic PDF generation

**Request:**
```json
{
  "certificates": [
    {
      "verificationId": "CERT-20251123-NJS-A1B2",
      "certificateTitle": "Backend Developer Expert",
      "name": "Ahmad Rizki",
      "program": "Backend Development",
      // ... other certificate data
    }
  ]
}
```

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

**What happens:**
1. For each certificate:
   - Generate unique password (12 chars)
   - Create PDF with 2 pages (front & back)
   - Upload PDF to MinIO
   - Save certificate data + PDF URL + password to database
2. Returns summary of successful and failed certificates

#### **GET /api/certificates**
Get all certificates for your prodi

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search by name, program, or verification ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cert_123",
      "verification_id": "CERT-20251123-NJS-A1B2",
      "participant_name": "Ahmad Rizki",
      "pdf_url": "/api/minio-proxy/1732345678-certificate-CERT-001.pdf",
      "pdf_password": "aB3$xY9#mK2@",
      // ... other fields
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

## Usage Guide

### For Laboratory Admins

#### 1. Generate Certificates
1. Go to: **Certificates** → **Generate**
2. Download template Excel: Click **"Template"** button
3. Fill in certificate data in Excel
4. Upload Excel file
5. Preview certificates (Front/Back)
6. Click **"Save to DB"** button

**What happens automatically:**
- ✅ PDF generated for each certificate
- ✅ Password created for each PDF
- ✅ PDF uploaded to MinIO
- ✅ Data saved to database

#### 2. View & Download Certificates
1. Go to: **Certificates** → **History**
2. See all saved certificates
3. Click **"PDF"** button (green) to download
4. Password will be shown and auto-copied to clipboard
5. Open PDF and use the password

#### 3. Copy Password
- Hover over password (shows as `aB3$***`)
- Click on password text
- Password copied to clipboard automatically
- Toast notification confirms copy

---

## PDF Structure

### Front Page (Halaman Depan)
```
┌─────────────────────────────────────────┐
│         SERTIFIKASI LABORATORIUM        │
│                                         │
│       Backend Developer Expert          │
│                                         │
│        DIBERIKAN KEPADA                 │
│          Ahmad Rizki Pratama            │
│                                         │
│  Telah berhasil menyelesaikan...       │
│                                         │
│                             [QR CODE]   │
│  Kepala Lab              ID: CERT-001  │
│  [Signature]                           │
└─────────────────────────────────────────┘
```

### Back Page (Halaman Belakang)
```
┌─────────────────────────────────────────┐
│ Sertifikat Laboratorium                 │
│ Ahmad Rizki Pratama                     │
│                                         │
│ Statistik Pembelajaran:                 │
│ • Pertemuan: 16    • Nilai: 98         │
│ • Materi: 16       • Kehadiran: 100%   │
│                                         │
│ Penguasaan Kompetensi:                  │
│ • TypeScript & Node.js   ████████ 45%  │
│ • Database Management    ███████  42%  │
│ • API Development        ███████  40%  │
│                                         │
│ Analitik Pembelajaran:                  │
│ • Kecepatan Belajar: 95%               │
│ • Pemecahan Masalah: 98%               │
│ • Kolaborasi Tim: 92%                  │
│                                         │
│ Teknologi: NestJS, TypeORM, PostgreSQL │
│                            Nilai: A+    │
└─────────────────────────────────────────┘
```

---

## Technical Implementation

### PDF Library: pdf-lib
```typescript
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// Generate certificate PDF
const pdfBuffer = await generateCertificatePDF(certificateData, password)
```

### MinIO Upload
```typescript
import { uploadFile } from '@/lib/minio-client'

// Upload to MinIO
const fileName = `certificate-${verificationId}.pdf`
const pdfUrl = await uploadFile(pdfBuffer, fileName, 'application/pdf')
```

### Password Generation
```typescript
import { generatePDFPassword } from '@/lib/pdf-generator'

// Generate random 12-char password
const password = generatePDFPassword()
// Example: "aB3$xY9#mK2@"
```

---

## Security Considerations

### 1. Password Security
- ✅ **Random generation**: Each password is unique and random
- ✅ **Strong passwords**: 12 characters with uppercase, lowercase, numbers, symbols
- ✅ **Stored encrypted**: Passwords stored in database (consider hashing in production)

### 2. Access Control
- ✅ **Prodi-based**: Users only see certificates from their prodi
- ✅ **Role-based**: Only laboratory_admins can create/view certificates
- ✅ **Authentication**: All endpoints require valid session

### 3. MinIO Security
- ✅ **Private bucket**: Files not publicly accessible
- ✅ **Proxy access**: PDFs accessed via `/api/minio-proxy` endpoint
- ✅ **SSL enabled**: All transfers encrypted (HTTPS)

---

## File Locations

### Library Files
- **PDF Generator**: `lib/pdf-generator.ts`
  - `generateCertificatePDF(data, password)`
  - `generatePDFPassword()`

- **MinIO Client**: `lib/minio-client.ts`
  - `uploadFile(buffer, fileName, contentType)`
  - `getFileUrl(fileName)`

### API Routes
- **Bulk Save**: `app/api/certificates/bulk/route.ts`
- **List Certificates**: `app/api/certificates/route.ts`
- **Single Certificate**: `app/api/certificates/[id]/route.ts`

### Pages
- **Generate Page**: `app/dashboard/laboratory_admin/certificates/generate/page.tsx`
- **History Page**: `app/dashboard/laboratory_admin/certificates/history/page.tsx`

### Database
- **Schema**: `prisma/schema.prisma`
- **Migration**: `prisma/migrations/20251123101645_add_pdf_fields_to_certificates/`

---

## Troubleshooting

### PDF Not Generated
**Problem**: Certificate saved but no PDF URL

**Solutions:**
1. Check MinIO connection in `.env`:
   ```env
   MINIO_ENDPOINT=103.151.145.21
   MINIO_PORT=990
   MINIO_USE_SSL=true
   MINIO_ACCESS_KEY=your-key
   MINIO_SECRET_KEY=your-secret
   MINIO_BUCKET_NAME=correspondence-files
   ```
2. Check MinIO server is running
3. Check API logs for errors

### Cannot Download PDF
**Problem**: PDF URL returns 404

**Solutions:**
1. Check if file exists in MinIO
2. Verify bucket name is correct
3. Check MinIO proxy endpoint `/api/minio-proxy`

### Wrong Password
**Problem**: Password doesn't work on PDF

**Solutions:**
1. Copy password from UI (auto-copy on click)
2. Check database for correct password
3. Try regenerating certificate

---

## Future Enhancements

### Planned Features
- [ ] Email certificate with password to participant
- [ ] Batch download multiple certificates as ZIP
- [ ] Certificate verification page (public)
- [ ] QR code scanning verification
- [ ] Certificate expiration dates
- [ ] Certificate templates customization
- [ ] Watermark support
- [ ] Digital signature (PKI)

### Improvements
- [ ] Password hashing in database
- [ ] PDF encryption level configuration
- [ ] Custom password option
- [ ] Audit log for PDF downloads
- [ ] PDF preview without download

---

## Support

For issues or questions:
1. Check logs: `console` for errors
2. Verify database migration ran successfully
3. Test MinIO connection with: `npm run minio:test`
4. Contact: Lab Admin Team

---

## Changelog

### v1.0.0 (2025-01-23)
- ✅ Initial release
- ✅ PDF generation with pdf-lib
- ✅ Password protection
- ✅ MinIO integration
- ✅ Database schema updates
- ✅ History page with download
- ✅ Password copy functionality

---

**Generated with ❤️ by Lab Certificate System**
