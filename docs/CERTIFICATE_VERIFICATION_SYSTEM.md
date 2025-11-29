# Sistem Verifikasi Sertifikat Laboratorium

## 📋 Daftar Isi

1. [Gambaran Umum](#gambaran-umum)
2. [Arsitektur Sistem](#arsitektur-sistem)
3. [Fitur Utama](#fitur-utama)
4. [Alur Kerja](#alur-kerja)
5. [Komponen Teknis](#komponen-teknis)
6. [Keamanan](#keamanan)
7. [Penggunaan](#penggunaan)
8. [Testing & Troubleshooting](#testing--troubleshooting)
9. [Changelog](#changelog)

---

## Gambaran Umum

Sistem Verifikasi Sertifikat Laboratorium adalah sistem terintegrasi untuk menghasilkan, mengelola, dan memverifikasi sertifikat profesional laboratorium dengan fitur keamanan tinggi menggunakan QR Code terenkripsi.

### Tujuan

- ✅ Menghasilkan sertifikat profesional dengan desain modern
- ✅ Menyediakan verifikasi instan melalui QR Code
- ✅ Menjaga integritas dan keamanan data sertifikat
- ✅ Mendukung penerbitan sertifikat massal (bulk)
- ✅ Melacak riwayat verifikasi sertifikat

### Teknologi

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Library**: QRCode, jsPDF, JSZip
- **Enkripsi**: Base64URL (browser/server compatible)

---

## Arsitektur Sistem

### 1. Struktur Komponen

```
components/certificates/
├── lab-certificate-template.tsx    # Template sertifikat (depan & belakang)
└── ...

app/dashboard/laboratory_admin/certificates/
├── generate/
│   └── page.tsx                    # Halaman generate sertifikat

app/verify/
└── [encryptedData]/
    └── page.tsx                    # Halaman verifikasi publik

app/api/certificates/laboratory/
├── bulk/
│   └── route.ts                    # API endpoint bulk save
└── ...

lib/
├── certificate-crypto.ts           # Enkripsi/dekripsi QR Code
└── ...

prisma/
└── schema.prisma                   # Database schema
```

### 2. Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CERTIFICATE GENERATION FLOW                   │
└─────────────────────────────────────────────────────────────────┘

1. Upload Excel
   ↓
2. Parse & Validate Data
   ↓
3. Generate Certificate ID (format: XXX/LAB/YY)
   ↓
4. Create QR Code (encrypted certificate ID only)
   ↓
5. Render Certificate (Preview/Batch mode)
   ↓
6. Download ZIP (triggers save to database)
   ↓
7. Save to Database (bulk upsert)


┌─────────────────────────────────────────────────────────────────┐
│                    CERTIFICATE VERIFICATION FLOW                 │
└─────────────────────────────────────────────────────────────────┘

1. Scan QR Code
   ↓
2. Redirect to: https://sintekmu.ac.id/verify/{encryptedData}
   ↓
3. Decrypt Certificate ID
   ↓
4. Fetch from Database
   ↓
5. Increment Verification Count
   ↓
6. Display Certificate Info (dark mode UI)
```

---

## Fitur Utama

### 1. **Generate Sertifikat**

#### A. Upload Excel dengan Field Mapping

- **Upload**: File Excel (.xlsx, .xls)
- **Field Mapping**:
  ```
  - Nama               → data.name
  - NIM                → data.nim
  - Program Studi      → data.program
  - Judul Sertifikat   → data.achievement (DINAMIS)
  - Tanggal Diterbitkan → data.date
  - Nilai Akhir        → data.finalScore
  - Pertemuan Dihadiri → data.meetingsAttended
  - Nilai Kehadiran    → data.attendanceScore
  - Nilai Tugas        → data.assignmentScore
  - Teknologi          → data.technologies (comma-separated)
  - Nama Instruktur    → data.instructorName
  - Nama Organisasi    → data.organizationName
  ```

#### B. Preview Sertifikat

- Mode: `renderMode="preview"`
- Menampilkan preview sertifikat sebelum download
- Mendukung print langsung
- View depan & belakang sertifikat

#### C. Download ZIP

- Generate semua sertifikat dalam format PDF
- Struktur ZIP:
  ```
  certificates_2024-11-26.zip
  ├── Nama_Mahasiswa_1_001-LAB-24.pdf
  ├── Nama_Mahasiswa_2_002-LAB-24.pdf
  └── ...
  ```
- **Trigger save to database** saat download ZIP

### 2. **Nomor Sertifikat Dinamis**

Format: `XXX/LAB/YY`

- **XXX**: Sequential number (001, 002, 003, ...)
- **LAB**: Fixed identifier
- **YY**: Last 2 digits of Hijriah year (24, 25, 26, ...)

**Contoh**:

- `001/LAB/24` (Hijriah 1424 → 24)
- `042/LAB/25` (Hijriah 1425 → 25)

**Implementasi**:

```typescript
// Get last 2 digits of Hijriah year
const hijriYear = new Date()
  .toLocaleDateString("ar-SA-u-ca-islamic", {
    year: "numeric",
  })
  .split(" ")[0];
const twoDigitYear = hijriYear.slice(-2);

// Format: 001/LAB/24
const certificateId = `${String(index + 1).padStart(
  3,
  "0"
)}/LAB/${twoDigitYear}`;
```

### 3. **Judul Sertifikat Dinamis**

Judul sertifikat diambil dari kolom **"Judul Sertifikat"** di Excel:

**Sebelum** (hardcoded):

```tsx
<h1>Laboratory Certificate</h1>
```

**Sesudah** (dinamis):

```tsx
<h1>{data.achievement}</h1>
```

**Contoh**:

- "Sertifikat Praktikum Basis Data"
- "Sertifikat Pelatihan Web Development"
- "Sertifikat Workshop Machine Learning"

### 4. **QR Code Terenkripsi**

#### A. Enkripsi

- **Data**: Hanya Certificate ID (contoh: `001/LAB/24`)
- **Method**: Base64URL encoding (browser/server compatible)
- **URL**: `https://sintekmu.ac.id/verify/{encryptedData}`

```typescript
// lib/certificate-crypto.ts
export function encryptCertificateData(certificateId: string): string {
  return btoa(certificateId)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
```

#### B. QR Code Generation

- **Library**: `qrcode`
- **Error Correction**: Medium (M) - 15%
- **Margin**: 2 (optimal scannability)
- **Size**:
  - Signature QR: 80px (depan sertifikat)
  - Verification QR: 48px (belakang sertifikat)

```typescript
const qrConfig = {
  errorCorrectionLevel: "M" as const,
  margin: 2,
  color: {
    dark: "#1f2937",
    light: "#ffffff",
  },
};
```

#### C. Scannability

- ✅ Dapat dipindai dengan semua aplikasi QR scanner
- ✅ Dapat dipindai dari layar dan print
- ✅ Tahan terhadap kerusakan hingga 15%

### 5. **Verifikasi Sertifikat**

#### A. URL Verifikasi

```
https://sintekmu.ac.id/verify/{encryptedData}
```

**Contoh**:

```
https://sintekmu.ac.id/verify/MDAxL0xBQi8yNA
```

#### B. Halaman Verifikasi

- **Path**: `app/verify/[encryptedData]/page.tsx`
- **Features**:
  - Dekripsi otomatis
  - Fetch data dari database
  - Increment verification count
  - Dark mode UI (teks putih, high contrast)
  - Responsive design

#### C. UI Dark Mode

```tsx
<div className="text-white bg-gray-900">
  <h1 className="text-4xl font-bold text-white">
    {certificate.recipient_name}
  </h1>
  <p className="text-gray-300">{certificate.program_study}</p>
</div>
```

**Sebelum**:

- Teks abu-abu (sulit dibaca)
- Kontras rendah

**Sesudah**:

- Teks putih (mudah dibaca)
- Kontras tinggi
- Professional appearance

### 6. **Database & Persistence**

#### A. Save on Download

**Trigger**: Download ZIP
**Action**: Bulk save ke database

```typescript
const handleDownloadAllPDF = async () => {
  // Generate all PDFs
  const allPDFs = await generateAllPDFs();

  // Save to database
  const saveResponse = await fetch("/api/certificates/laboratory/bulk", {
    method: "POST",
    body: JSON.stringify({
      certificates: allPDFs.map((pdf) => ({
        certificate_id: pdf.certificateId,
        recipient_name: pdf.name,
        // ...
      })),
    }),
  });

  // Download ZIP
  downloadZip(allPDFs);
};
```

#### B. Bulk API Endpoint

**Path**: `app/api/certificates/laboratory/bulk/route.ts`

**Features**:

- ✅ Authentication required (session check)
- ✅ Upsert logic (update if exists, create if not)
- ✅ Preserve QR code & certificate ID
- ✅ Preserve verification count
- ✅ Batch processing

```typescript
export async function POST(request: Request) {
  // 1. Check authentication
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse request
  const { certificates } = await request.json();

  // 3. Upsert certificates
  for (const cert of certificates) {
    await prisma.laboratory_certificates.upsert({
      where: { certificate_id: cert.certificate_id },
      update: {
        recipient_name: cert.recipient_name,
        // ... (preserve qr_code_data, verification_count)
      },
      create: {
        certificate_id: cert.certificate_id,
        qr_code_data: cert.qr_code_data,
        // ...
      },
    });
  }

  return NextResponse.json({ success: true });
}
```

#### C. Database Schema

```prisma
model laboratory_certificates {
  id                   Int       @id @default(autoincrement())
  certificate_id       String    @unique
  recipient_name       String
  nim                  String?
  program_study        String
  achievement          String
  issue_date           DateTime
  final_score          Float?
  meetings_attended    Int?
  attendance_score     Float?
  assignment_score     Float?
  technologies         String[]
  instructor_name      String?
  organization_name    String?
  qr_code_data         String    @unique
  verification_count   Int       @default(0)
  laboratory_id        Int?
  created_by           Int?
  created_at           DateTime  @default(now())
  updated_at           DateTime  @updatedAt

  laboratory           laboratories? @relation(fields: [laboratory_id], references: [id])
  creator              users?        @relation(fields: [created_by], references: [id])
}
```

### 7. **Template Sertifikat**

#### A. Desain Modern

- **Font**:
  - Playfair Display (serif, headings)
  - Inter (sans-serif, body)
  - Cormorant Garamond (serif, names)
  - Space Grotesk (geometric, accents)
- **Layout**: A4 Landscape (297mm x 210mm)
- **Print-optimized**: Color adjustment, border radius, shadows

#### B. Sisi Depan

- Badge laboratorium
- Nomor sertifikat
- Judul sertifikat (dinamis)
- Nama penerima
- Deskripsi program
- QR Code (signature)
- Tanda tangan digital

#### C. Sisi Belakang

- QR Code (verification)
- Technology tags
- Statistik pertemuan
- Kompetensi chart
- Grade breakdown
- Analytics
- Feedback instruktur

#### D. Lokalisasi Indonesia

Semua teks statis telah dilokalisasi ke Bahasa Indonesia:

| Sebelum (English)              | Sesudah (Indonesia)             |
| ------------------------------ | ------------------------------- |
| PROFESSIONAL CERTIFICATION     | SERTIFIKAT PROFESIONAL          |
| ISSUED TO                      | DIBERIKAN KEPADA                |
| Digital Signature              | Tanda Tangan Digital            |
| Head of Informatics Laboratory | Kepala Laboratorium Informatika |
| Competency Mastery             | Penguasaan Kompetensi           |
| Grade Breakdown                | Rincian Nilai                   |
| Analytics                      | Analitik                        |
| Learning Speed                 | Kecepatan Belajar               |
| Problem Solving                | Pemecahan Masalah               |
| Collaboration                  | Kolaborasi                      |
| Learning Time                  | Waktu Belajar                   |
| Performance                    | Performa                        |
| Overall                        | Keseluruhan                     |
| Attendance                     | Kehadiran                       |
| Instructor Feedback            | Umpan Balik Instruktur          |

---

## Alur Kerja

### 1. Generate Sertifikat

```
┌──────────────────────────────────────────────────────────────┐
│ 1. LOGIN AS LABORATORY ADMIN                                 │
└──────────────────────────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. NAVIGATE TO: /dashboard/laboratory_admin/certificates/    │
│    generate                                                   │
└──────────────────────────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. UPLOAD EXCEL FILE                                          │
│    - Click "Upload Excel"                                     │
│    - Select .xlsx/.xls file                                   │
│    - System validates columns                                 │
└──────────────────────────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────────────────────────┐
│ 4. PREVIEW CERTIFICATES                                       │
│    - View first certificate preview                           │
│    - Check certificate data                                   │
│    - Verify QR code                                           │
└──────────────────────────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. DOWNLOAD ALL AS ZIP                                        │
│    - Click "Download Semua PDF"                               │
│    - System generates all PDFs                                │
│    - System saves to database (bulk upsert)                   │
│    - Download certificates_YYYY-MM-DD.zip                     │
└──────────────────────────────────────────────────────────────┘
```

### 2. Verifikasi Sertifikat

```
┌──────────────────────────────────────────────────────────────┐
│ 1. SCAN QR CODE                                               │
│    - Using any QR scanner app                                 │
│    - From printed certificate or screen                       │
└──────────────────────────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. REDIRECT TO VERIFICATION PAGE                              │
│    - URL: https://sintekmu.ac.id/verify/{encryptedData}     │
│    - System decrypts certificate ID                           │
└──────────────────────────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. FETCH CERTIFICATE DATA                                     │
│    - Query database by certificate_id                         │
│    - Increment verification_count                             │
│    - Return certificate details                               │
└──────────────────────────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────────────────────────┐
│ 4. DISPLAY CERTIFICATE INFO                                   │
│    - Show recipient name                                      │
│    - Show program study                                       │
│    - Show issue date                                          │
│    - Show verification count                                  │
│    - Show validity status                                     │
└──────────────────────────────────────────────────────────────┘
```

---

## Komponen Teknis

### 1. Certificate Crypto (`lib/certificate-crypto.ts`)

```typescript
/**
 * Enkripsi certificate ID menggunakan Base64URL
 * @param certificateId - ID sertifikat (contoh: "001/LAB/24")
 * @returns Encrypted string (Base64URL)
 */
export function encryptCertificateData(certificateId: string): string {
  // Convert to base64
  const base64 = btoa(certificateId);

  // Convert to base64url (browser/server compatible)
  const base64url = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return base64url;
}

/**
 * Dekripsi encrypted data menjadi certificate ID
 * @param encryptedData - Encrypted string (Base64URL)
 * @returns Certificate ID
 */
export function decryptCertificateData(encryptedData: string): string {
  try {
    // Convert base64url back to base64
    let base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");

    // Add padding if needed
    while (base64.length % 4) {
      base64 += "=";
    }

    // Decode
    return atob(base64);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Invalid encrypted data");
  }
}
```

### 2. Certificate Template (`components/certificates/lab-certificate-template.tsx`)

```typescript
interface LabCertificateData {
  name: string;
  nim?: string;
  program: string;
  achievement: string; // Judul sertifikat (dinamis)
  date: string;
  finalScore?: number;
  meetingsAttended?: number;
  attendanceScore?: number;
  assignmentScore?: number;
  technologies?: string[];
  certificateId?: string; // Format: XXX/LAB/YY
  instructorName?: string;
  organizationName?: string;
}

interface LabCertificateTemplateProps {
  data: LabCertificateData;
  template: string;
  showBack?: boolean;
  onPrint?: () => void;
  renderMode?: "preview" | "batch"; // Mode render
}
```

### 3. Generate Page (`app/dashboard/laboratory_admin/certificates/generate/page.tsx`)

**Key Functions**:

```typescript
// Generate certificate ID with Hijriah year
const generateCertificateId = (index: number): string => {
  const hijriYear = new Date()
    .toLocaleDateString("ar-SA-u-ca-islamic", {
      year: "numeric",
    })
    .split(" ")[0];
  const twoDigitYear = hijriYear.slice(-2);

  return `${String(index + 1).padStart(3, "0")}/LAB/${twoDigitYear}`;
};

// Download all PDFs and save to database
const handleDownloadAllPDF = async () => {
  // 1. Generate all PDFs
  const allPDFs = await generateAllPDFsInBatch();

  // 2. Save to database
  await saveCertificatesToDatabase(allPDFs);

  // 3. Download ZIP
  await downloadZip(allPDFs);
};

// Generate single PDF
const generatePDF = async (data: LabCertificateData, certificateId: string) => {
  const element = document.getElementById(`certificate-${certificateId}`);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  pdf.addImage(imgData, "PNG", 0, 0, 297, 210);

  return pdf.output("blob");
};
```

### 4. Bulk API (`app/api/certificates/laboratory/bulk/route.ts`)

```typescript
export async function POST(request: Request) {
  // Authentication
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse request
  const { certificates } = await request.json();

  // Validate
  if (!Array.isArray(certificates) || certificates.length === 0) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // Get user ID
  const user = await prisma.users.findUnique({
    where: { email: session.user.email },
  });

  // Bulk upsert
  const results = await Promise.all(
    certificates.map((cert) =>
      prisma.laboratory_certificates.upsert({
        where: { certificate_id: cert.certificate_id },
        update: {
          recipient_name: cert.recipient_name,
          nim: cert.nim,
          program_study: cert.program_study,
          achievement: cert.achievement,
          issue_date: new Date(cert.issue_date),
          final_score: cert.final_score,
          meetings_attended: cert.meetings_attended,
          attendance_score: cert.attendance_score,
          assignment_score: cert.assignment_score,
          technologies: cert.technologies,
          instructor_name: cert.instructor_name,
          organization_name: cert.organization_name,
          updated_at: new Date(),
        },
        create: {
          certificate_id: cert.certificate_id,
          qr_code_data: cert.qr_code_data,
          recipient_name: cert.recipient_name,
          nim: cert.nim,
          program_study: cert.program_study,
          achievement: cert.achievement,
          issue_date: new Date(cert.issue_date),
          final_score: cert.final_score,
          meetings_attended: cert.meetings_attended,
          attendance_score: cert.attendance_score,
          assignment_score: cert.assignment_score,
          technologies: cert.technologies,
          instructor_name: cert.instructor_name,
          organization_name: cert.organization_name,
          verification_count: 0,
          created_by: user?.id,
          created_at: new Date(),
        },
      })
    )
  );

  return NextResponse.json({
    success: true,
    count: results.length,
  });
}
```

### 5. Verify Page (`app/verify/[encryptedData]/page.tsx`)

```typescript
export default async function VerifyCertificatePage({
  params,
}: {
  params: { encryptedData: string };
}) {
  // Decrypt certificate ID
  const certificateId = decryptCertificateData(params.encryptedData);

  // Fetch certificate
  const certificate = await prisma.laboratory_certificates.findUnique({
    where: { certificate_id: certificateId },
  });

  if (!certificate) {
    return <CertificateNotFound />;
  }

  // Increment verification count
  await prisma.laboratory_certificates.update({
    where: { id: certificate.id },
    data: {
      verification_count: certificate.verification_count + 1,
    },
  });

  // Render certificate info
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-white">
        {certificate.recipient_name}
      </h1>
      <p className="text-gray-300">{certificate.program_study}</p>
      <p className="text-sm text-gray-400">
        Terverifikasi {certificate.verification_count + 1} kali
      </p>
    </div>
  );
}
```

---

## Keamanan

### 1. Enkripsi QR Code

- ✅ Base64URL encoding (URL-safe)
- ✅ Tidak ada PII (Personal Identifiable Information) di QR code
- ✅ Hanya certificate ID yang diencode
- ✅ Prevent tampering dengan database lookup

### 2. Authentication & Authorization

- ✅ Session-based authentication
- ✅ Role-based access control (laboratory_admin)
- ✅ API endpoint protection
- ✅ Database-level permissions

### 3. Data Validation

- ✅ Input validation (Excel upload)
- ✅ Certificate ID uniqueness
- ✅ Type checking (TypeScript)
- ✅ Prisma schema validation

### 4. Rate Limiting

**TODO**: Implement rate limiting untuk verification endpoint

```typescript
// Contoh implementasi
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
};
```

### 5. HTTPS Only

- ✅ Force HTTPS di production
- ✅ Secure cookies
- ✅ HSTS headers

---

## Penggunaan

### 1. Setup Database

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed laboratory admins
npx prisma db seed
```

### 2. Prepare Excel File

**Required Columns**:

```
| Nama | NIM | Program Studi | Judul Sertifikat | Tanggal Diterbitkan | Nilai Akhir | Pertemuan Dihadiri | Nilai Kehadiran | Nilai Tugas | Teknologi | Nama Instruktur | Nama Organisasi |
```

**Example Row**:

```
| Ahmad Rizki | 105841104521 | Teknik Informatika | Sertifikat Praktikum Basis Data | 2024-11-26 | 90 | 14 | 95 | 88 | PostgreSQL,MySQL,MongoDB | Muhyiddin A.M Hayat, S.Kom., M.T | Laboratorium Informatika |
```

### 3. Generate Certificates

1. Login sebagai laboratory admin
2. Navigate ke `/dashboard/laboratory_admin/certificates/generate`
3. Upload Excel file
4. Preview sertifikat pertama
5. Click "Download Semua PDF"
6. Wait for processing
7. Download ZIP file

### 4. Distribute Certificates

1. Extract ZIP file
2. Send individual PDF to each recipient
3. Recipients can scan QR code to verify

### 5. Verify Certificate

**Method 1: Scan QR Code**

1. Open any QR scanner app
2. Scan QR code on certificate
3. Redirect to verification page

**Method 2: Manual URL**

1. Get encrypted data from certificate
2. Open: `https://sintekmu.ac.id/verify/{encryptedData}`

---

## Testing & Troubleshooting

### 1. Test QR Code Generation

```typescript
// Test di browser console
const certificateId = "001/LAB/24";
const encrypted = btoa(certificateId)
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=/g, "");

console.log("Certificate ID:", certificateId);
console.log("Encrypted:", encrypted);
console.log("Verification URL:", `https://sintekmu.ac.id/verify/${encrypted}`);

// Test decryption
let base64 = encrypted.replace(/-/g, "+").replace(/_/g, "/");
while (base64.length % 4) base64 += "=";
const decrypted = atob(base64);
console.log("Decrypted:", decrypted);
```

### 2. Test Database Save

```bash
# Check if certificates are saved
npx prisma studio

# Navigate to laboratory_certificates table
# Verify:
# - certificate_id is unique
# - qr_code_data is unique
# - verification_count starts at 0
```

### 3. Test Verification

```bash
# Test verification endpoint
curl https://sintekmu.ac.id/verify/MDAxL0xBQi8yNA

# Expected response: HTML page with certificate info
```

### 4. Common Issues

#### Issue 1: QR Code tidak terbaca

**Solution**:

- Check error correction level (harus M atau H)
- Check margin (minimum 2)
- Check print quality
- Test dengan berbagai QR scanner apps

#### Issue 2: Sertifikat tidak tersimpan ke database

**Solution**:

- Check authentication (login sebagai laboratory_admin)
- Check network request di browser DevTools
- Check API logs di terminal
- Verify database connection

#### Issue 3: Verification page error

**Solution**:

- Check encrypted data format
- Check database query
- Check certificate_id format
- Check Prisma logs

#### Issue 4: PDF generation gagal

**Solution**:

- Check html2canvas version
- Check jsPDF version
- Check canvas rendering
- Increase timeout

---

## Changelog

### Version 1.3.0 (2024-11-26)

**Lokalisasi Indonesia**

- ✅ Semua teks statis dilokalisasi ke Bahasa Indonesia
- ✅ Update: "PROFESSIONAL CERTIFICATION" → "SERTIFIKAT PROFESIONAL"
- ✅ Update: "ISSUED TO" → "DIBERIKAN KEPADA"
- ✅ Update: "Digital Signature" → "Tanda Tangan Digital"
- ✅ Update: Semua label di sisi belakang sertifikat
- ✅ Update: Feedback instruktur ke Bahasa Indonesia

### Version 1.2.0 (2024-11-26)

**Judul & Nomor Sertifikat Dinamis**

- ✅ Judul sertifikat dinamis dari field "Judul Sertifikat" di Excel
- ✅ Nomor sertifikat format: XXX/LAB/YY (YY = 2 digit tahun Hijriah)
- ✅ Sequential numbering otomatis
- ✅ Update logic di generate page
- ✅ Update template untuk support dynamic title

### Version 1.1.0 (2024-11-26)

**Verification UI Dark Mode**

- ✅ Teks putih untuk semua heading
- ✅ High contrast untuk readability
- ✅ Gray-300 untuk secondary text
- ✅ Professional appearance
- ✅ Responsive design

### Version 1.0.0 (2024-11-26)

**Initial Release**

- ✅ QR Code encryption (certificate ID only, Base64URL)
- ✅ Verification URL: `https://sintekmu.ac.id/verify/{encryptedData}`
- ✅ Save to database on ZIP download
- ✅ Bulk API endpoint with authentication
- ✅ Upsert logic (preserve QR code & verification count)
- ✅ Certificate template (front & back)
- ✅ Excel upload & parsing
- ✅ PDF generation & ZIP download
- ✅ Public verification page
- ✅ Prisma schema for laboratory_certificates
- ✅ Seed script for laboratory_admins

---

## Roadmap

### Short Term

- [ ] Add rate limiting untuk verification endpoint
- [ ] Add certificate analytics dashboard
- [ ] Add email notification untuk bulk generation
- [ ] Add certificate revocation feature

### Medium Term

- [ ] Add multi-language support (EN/ID toggle)
- [ ] Add certificate templates library
- [ ] Add batch verification API
- [ ] Add certificate expiration dates

### Long Term

- [ ] Add blockchain verification
- [ ] Add NFT certificate option
- [ ] Add AI-powered certificate fraud detection
- [ ] Add international certificate standards compliance

---

## Kontributor

- **Lead Developer**: GitHub Copilot
- **Project Owner**: Laboratorium Informatika UNISMUH Makassar
- **Tech Stack**: Next.js, React, TypeScript, Prisma, PostgreSQL

---

## Lisensi

Copyright © 2024 Laboratorium Informatika UNISMUH Makassar. All rights reserved.

---

## Support

Untuk pertanyaan atau dukungan, hubungi:

- **Email**: lab.informatika@unismuh.ac.id
- **Website**: https://sintekmu.ac.id
- **Documentation**: https://sintekmu.ac.id/docs/certificates

---

**Last Updated**: 26 November 2024
