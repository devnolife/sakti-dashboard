# Sistem Korespondensi Dinamis - Admin Umum

## Ringkasan

Sistem ini memungkinkan Admin Umum membuat jenis surat dengan **field dinamis** yang dapat diisi oleh mahasiswa. Setiap jenis surat dapat memiliki field custom dengan berbagai tipe input (teks, angka, tanggal, file, dll).

## Alur Kerja

### 1. Admin Umum Membuat Jenis Surat
1. Login sebagai Admin Umum
2. Buka menu **Korespondensi → Jenis Surat**
3. Klik **"+ Tambah Jenis Surat"**
4. Isi informasi dasar:
   - Judul Surat
   - Deskripsi
   - Pihak yang Menyetujui
   - Estimasi Hari
   - Dokumen Diperlukan

5. **Tambahkan Field Dinamis**:
   - Klik **"+ Tambah Field"**
   - Atur properti field:
     * **Label**: Nama field yang ditampilkan
     * **Tipe**: text, number, date, email, phone, textarea, file, select
     * **Required**: Centang jika wajib diisi
     * **Placeholder**: Hint untuk mahasiswa
     * **Help Text**: Penjelasan tambahan
     * **Validasi**: Min/max value, file types, file size

6. Contoh Field untuk "Surat Keterangan Magang":
   ```
   Field 1:
   - Label: Nama Perusahaan
   - Type: text
   - Required: ✓
   - Placeholder: PT. Contoh Indonesia
   
   Field 2:
   - Label: Alamat Perusahaan
   - Type: textarea
   - Required: ✓
   
   Field 3:
   - Label: Tanggal Mulai
   - Type: date
   - Required: ✓
   
   Field 4:
   - Label: Tanggal Selesai
   - Type: date
   - Required: ✓
   
   Field 5:
   - Label: Surat Permohonan Perusahaan
   - Type: file
   - Required: ✓
   - File Types: pdf, jpg, png
   - Max Size: 5 MB
   ```

### 2. Mahasiswa Mengajukan Surat
1. Login sebagai Mahasiswa
2. Buka menu **Korespondensi → Ajukan Surat**
3. Pilih jenis surat (contoh: "Surat Keterangan Magang")
4. Isi semua field dinamis yang telah dibuat Admin Umum
5. Upload file jika diperlukan
6. Klik **"Ajukan Surat"**

### 3. Data Tersimpan ke Database
Data form mahasiswa disimpan ke tabel `correspondence_requests`:
```json
{
  "id": "cr-1699512345678",
  "letter_type_id": "lt-1699512300000",
  "student_id": "std-001",
  "form_data": {
    "field-1699512310001": "PT. Maju Jaya",
    "field-1699512310002": "Jl. Sudirman No. 123, Jakarta",
    "field-1699512310003": "2024-01-15",
    "field-1699512310004": "2024-03-15",
    "field-1699512310005": "[File Object]"
  },
  "status": "pending",
  "created_at": "2024-11-09T10:00:00Z"
}
```

## Schema Database

### Tabel: `letter_types`
```prisma
model letter_types {
  id                      String                    @id
  title                   String                    @unique
  description             String
  approval_role           ApprovalRole
  estimated_days          Int
  required_documents      String[]
  additional_fields       Json?                     // Array of DynamicField
  prodi_id                String?
  is_global               Boolean                   @default(false)
  is_active               Boolean                   @default(true)
  template                String?
  created_at              DateTime                  @default(now())
  updated_at              DateTime                  @updatedAt
  prodi                   prodi?                    @relation(fields: [prodi_id], references: [kode])
  correspondence_requests correspondence_requests[]
}
```

**Field `additional_fields` berisi JSON array seperti:**
```json
[
  {
    "id": "field-1699512310001",
    "label": "Nama Perusahaan",
    "type": "text",
    "required": true,
    "placeholder": "PT. Contoh Indonesia",
    "helpText": "Nama lengkap perusahaan tempat magang"
  },
  {
    "id": "field-1699512310002",
    "label": "Surat Permohonan",
    "type": "file",
    "required": true,
    "validation": {
      "fileTypes": ["pdf", "jpg", "png"],
      "maxFileSize": 5
    }
  }
]
```

### Tabel: `correspondence_requests`
```prisma
model correspondence_requests {
  id              String            @id
  letter_type_id  String
  student_id      String
  form_data       Json              // Data dari field dinamis
  attachments     Json?             // File uploads
  status          ApprovalStatus    @default(pending)
  rejection_note  String?
  approved_by     String?
  approved_at     DateTime?
  created_at      DateTime          @default(now())
  updated_at      DateTime          @updatedAt
  letter_types    letter_types      @relation(fields: [letter_type_id], references: [id])
  students        students          @relation(fields: [student_id], references: [id])
  approver        users?            @relation("ApprovedBy", fields: [approved_by], references: [id])
}
```

## Tipe Field yang Tersedia

| Tipe | Deskripsi | Validasi |
|------|-----------|----------|
| **text** | Input teks biasa | min, max length |
| **number** | Input angka | min, max value |
| **date** | Pemilih tanggal | - |
| **email** | Input email | Format email valid |
| **phone** | Input telepon | Format telepon valid |
| **textarea** | Teks panjang (multi-line) | min, max length |
| **file** | Upload file | fileTypes, maxFileSize |
| **select** | Dropdown pilihan | options array |

## API Endpoints

### Admin Umum

#### POST `/api/admin-umum/letter-types`
Membuat jenis surat baru dengan field dinamis

**Request Body:**
```json
{
  "title": "Surat Keterangan Magang",
  "description": "Surat untuk keperluan magang mahasiswa",
  "approval_role": "dekan",
  "estimated_days": 3,
  "required_documents": ["KTM", "KRS"],
  "additional_fields": [
    {
      "id": "field-1699512310001",
      "label": "Nama Perusahaan",
      "type": "text",
      "required": true,
      "placeholder": "PT. Contoh Indonesia"
    }
  ],
  "is_global": true
}
```

### Mahasiswa

#### GET `/api/correspondence/letter-types`
Mengambil daftar jenis surat yang tersedia untuk mahasiswa

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "lt-1699512300000",
      "title": "Surat Keterangan Magang",
      "description": "...",
      "additional_fields": [ /* array of DynamicField */ ]
    }
  ]
}
```

#### POST `/api/student/correspondence-requests`
Mahasiswa mengajukan surat dengan mengisi field dinamis

**Request Body:**
```json
{
  "letter_type_id": "lt-1699512300000",
  "form_data": {
    "field-1699512310001": "PT. Maju Jaya",
    "field-1699512310002": "Jl. Sudirman No. 123",
    "field-1699512310003": "2024-01-15"
  }
}
```

#### GET `/api/student/correspondence-requests`
Melihat daftar pengajuan surat mahasiswa

**Query Params:**
- `status`: pending | approved | rejected

## Component Files

### Admin Umum
1. **`components/admin-umum/letter-types-manager.tsx`**
   - UI untuk CRUD jenis surat
   - Integrasi dengan DynamicFieldsBuilder

2. **`components/admin-umum/dynamic-fields-builder.tsx`**
   - Form builder untuk membuat field dinamis
   - Drag & drop ordering
   - Validasi per field type

### Mahasiswa
1. **`components/student/student-correspondence-form.tsx`**
   - Menampilkan daftar jenis surat
   - Form dinamis berdasarkan additional_fields
   - Validasi client-side
   - Submit ke API

## Cara Testing

### 1. Login sebagai Admin Umum
```
Username: admin_umum1
Password: password123
```

### 2. Buat Jenis Surat Baru
- Navigasi: `/dashboard/admin_umum/letter-types`
- Tambah jenis surat dengan field dinamis
- Contoh: Surat Magang, Surat Penelitian, Surat Aktif Kuliah

### 3. Login sebagai Mahasiswa
```
Username: 2001010001 (NIM mahasiswa)
Password: password123
```

### 4. Ajukan Surat
- Navigasi: `/dashboard/mahasiswa/correspondence`
- Pilih jenis surat
- Isi field dinamis
- Submit pengajuan

### 5. Cek Database
```sql
-- Lihat letter types
SELECT * FROM "dev"."letter_types";

-- Lihat correspondence requests
SELECT * FROM "dev"."correspondence_requests";

-- Lihat form_data yang disubmit mahasiswa
SELECT id, letter_type_id, form_data, status 
FROM "dev"."correspondence_requests";
```

## Keunggulan Sistem

1. **Fleksibel**: Admin Umum bisa membuat jenis surat baru tanpa coding
2. **Dinamis**: Field dapat ditambah/dikurang sesuai kebutuhan
3. **Validasi**: Built-in validation untuk setiap tipe field
4. **User-Friendly**: Interface drag & drop, mudah digunakan
5. **Scalable**: Struktur JSON memungkinkan field kompleks

## Troubleshooting

### Field tidak muncul di form mahasiswa
- Pastikan jenis surat dalam status **Aktif**
- Cek `is_active = true` di database

### Validasi file gagal
- Pastikan file type sesuai dengan `validation.fileTypes`
- Cek ukuran file tidak melebihi `validation.maxFileSize`

### Form data tidak tersimpan
- Cek console browser untuk error
- Pastikan semua required fields terisi
- Verify API endpoint `/api/student/correspondence-requests` berjalan

## Next Steps

1. Implementasi approval workflow untuk Dekan/Kaprodi
2. Generate PDF surat otomatis berdasarkan template
3. Notifikasi email saat surat disetujui/ditolak
4. Dashboard statistics untuk Admin Umum
5. Export data pengajuan ke Excel
