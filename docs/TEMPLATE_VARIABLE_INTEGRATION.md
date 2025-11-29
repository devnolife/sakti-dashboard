# Document Management - Template Variable Editor Integration

## Overview

This implementation integrates the template variable editor functionality from `/test` page into the Document Management system at `/dashboard/staff_tu/document-management/templates`. Staff TU can now upload DOCX documents, mark variables interactively, and save variable configurations to the database for bulk document generation.

## Key Features

### 1. **Template Upload with Database Integration**
- Upload DOCX files via `/api/templates/upload`
- Automatic storage in MinIO
- Metadata extracted using `TemplateAnalyzer`
- Stores in `template_uploads` database table

### 2. **Interactive Variable Editor**
- **Select Mode**: Click and drag to select text and define variables
- **Edit Mode**: Click on highlighted variables to edit their properties
- **Undo/Redo**: Full history tracking for all variable operations
- **Variable Types**: Text, Number, Date

### 3. **Template Management**
- **Preview**: View template with HTML rendering
- **Edit Variables**: Interactive editor with dual modes
- **Download Options**:
  - **DOCX**: Original or with `{{variable}}` placeholders
  - **HTML**: Fully styled with variable information
  - **JSON**: Variable mapping configuration

### 4. **Role-Based Access**
- **Prodi Users**: See their prodi templates + global templates
- **Admin**: See all templates with filtering
- Controlled via `/api/templates` endpoints

### 5. **Category Filtering**
- Filter by: Surat, Sertifikat, Laporan
- Search by name or description
- Global/Prodi badge indicators

## Architecture

### Components

#### 1. **InlineTemplateVariableEditor**
**Location**: `components/templates/inline-template-variable-editor.tsx`

Extracted from test page, provides:
- Dual-mode editing (Select/Edit)
- Real-time HTML preview
- Variable management sidebar
- Undo/Redo functionality

#### 2. **Template Page**
**Location**: `app/dashboard/staff_tu/document-management/templates/page.tsx`

Main page featuring:
- Template list with cards
- Upload dialog
- Preview dialog
- Integration with variable editor
- Download functionality

### Libraries

#### 1. **Template Utilities**
**Location**: `lib/template-utils.ts`

Utilities for:
- `convertDocxToHtml()`: DOCX to HTML with style mapping
- `extractRawText()`: Extract plain text from DOCX
- `replaceDocxVariables()`: Replace text with `{{variables}}` using PizZip
- `generateFullHTMLDocument()`: Create complete HTML with variable info

#### 2. **Type Definitions**
**Location**: `types/template.ts`

Shared types:
- `TemplateVariable`: Variable definition with position info
- `MockTemplate`: In-memory template representation
- `TemplateData`: Database template model
- `TemplatePreview`: API preview response

### API Integration

#### Upload Template
```typescript
POST /api/templates/upload
Content-Type: multipart/form-data

{
  file: File,
  name: string,
  description?: string,
  category: 'surat' | 'sertifikat' | 'laporan',
  is_global: boolean
}
```

#### Get Templates
```typescript
GET /api/templates?category=surat&prodi_id=xxx
Response: { data: TemplateData[], total, page, limit }
```

#### Get Preview
```typescript
GET /api/templates/:id/preview
Response: { html, rawText, detectedFields, variableMapping }
```

#### Save Variables
```typescript
POST /api/templates/:id/variables
Content-Type: application/json

{
  variables: Record<string, TemplateVariable>
}
```

## Usage Flow

### 1. Upload Template

```typescript
// User clicks "Upload Template"
// Fills form: file, name, description, category, is_global
// System:
// - Uploads file to MinIO
// - Extracts text and analyzes with TemplateAnalyzer
// - Saves to database with detected fields
// - Refreshes template list
```

### 2. Define Variables

```typescript
// User clicks "Variables" on template card
// System fetches preview from API
// Opens InlineTemplateVariableEditor
// User:
// - Switches to Select Mode
// - Selects text in preview
// - Defines variable key, label, type
// - Repeats for all variables
// - Clicks Save
// System saves to database via API
```

### 3. Download with Variables

```typescript
// DOCX Download:
// - Fetches original file from MinIO
// - Uses PizZip to replace text with {{placeholders}}
// - Downloads modified DOCX

// HTML Download:
// - Fetches preview HTML
// - Wraps with variable information page
// - Downloads complete HTML document

// JSON Download:
// - Fetches variable mapping from API
// - Creates JSON with metadata
// - Downloads configuration file
```

## Database Schema

```prisma
model template_uploads {
  id                String    @id @default(cuid())
  name              String
  description       String?
  file_url          String    // MinIO URL
  file_name         String
  file_size         Int
  file_type         String    @default("docx")
  category          String    @default("surat")
  prodi_id          String?
  is_global         Boolean   @default(false)
  is_active         Boolean   @default(true)
  detected_fields   Json?     // From TemplateAnalyzer
  metadata          Json?     // Template statistics
  variable_mapping  Json?     // User-defined variables
  version           Int       @default(1)
  uploaded_by       String
  created_at        DateTime  @default(now())
  updated_at        DateTime  @updatedAt
  
  prodi             prodi?    @relation(fields: [prodi_id])
  uploader          users     @relation(fields: [uploaded_by])
}
```

## Variable Structure

```typescript
interface TemplateVariable {
  id: string              // Unique identifier for DOM mapping
  key: string             // Variable key (e.g., "nama_mahasiswa")
  label: string           // Display label (e.g., "Nama Mahasiswa")
  type: 'text' | 'number' | 'date'
  textContent: string     // Original text from document
  startIndex: number      // Position in raw text
  endIndex: number        // End position
  htmlPosition?: string   // HTML path for precise positioning
}
```

## Example Workflow

### Creating a Certificate Template

1. **Upload**
   - File: `Sertifikat_Penghargaan.docx`
   - Category: Sertifikat
   - Global: Yes

2. **Define Variables**
   - Select "Ahmad Fauzi" → Create variable `nama_penerima`
   - Select "Juara 1" → Create variable `prestasi`
   - Select "15 Januari 2024" → Create variable `tanggal`
   - Select "Dr. John Doe" → Create variable `nama_penandatangan`

3. **Save & Use**
   - Variables saved to database
   - Download DOCX with `{{nama_penerima}}`, `{{prestasi}}`, etc.
   - Use in bulk generation system

## Advanced Features

### DOCX Variable Replacement

The system handles complex DOCX scenarios:

```typescript
// Handles text split across XML tags
// Original XML: <w:t>Ahmad</w:t><w:t> Fauzi</w:t>
// Replaces with: <w:t>{{nama}}</w:t>
// Preserves formatting
```

### HTML Generation

Complete HTML documents include:
- Variable information page (print-friendly)
- Highlighted variables in content
- Full styling preserved from DOCX
- Print CSS for proper page breaks

## Files Changed/Created

### Created
- ✅ `components/templates/inline-template-variable-editor.tsx`
- ✅ `lib/template-utils.ts`
- ✅ `types/template.ts` (enhanced)

### Modified
- ✅ `app/dashboard/staff_tu/document-management/templates/page.tsx` (complete rewrite)

### Backed Up
- ✅ `app/dashboard/staff_tu/document-management/templates/page-old-backup.tsx`

## Testing Checklist

- [ ] Upload DOCX template
- [ ] Open variable editor
- [ ] Select text and create variables
- [ ] Edit existing variables
- [ ] Delete variables
- [ ] Test undo/redo
- [ ] Save variables to database
- [ ] Download DOCX with placeholders
- [ ] Download HTML with variable info
- [ ] Download JSON configuration
- [ ] Test category filtering
- [ ] Test search functionality
- [ ] Test role-based visibility

## Future Enhancements

1. **Archive Page Implementation**
   - Display `is_active: false` templates
   - Restore functionality

2. **Bulk Certificate Generation**
   - CSV/Excel import
   - Batch replace variables
   - ZIP download of all files

3. **Template Versioning UI**
   - Track version history
   - Rollback capability
   - Diff viewer

4. **Advanced Variable Types**
   - Conditional sections
   - Repeating blocks (tables)
   - Calculated fields

## Dependencies

```json
{
  "mammoth": "^1.6.0",
  "pizzip": "^3.2.0",
  "file-saver": "^2.0.5"
}
```

## Notes

- Original test page preserved at `app/test/page.tsx`
- Old templates page backed up as `page-old-backup.tsx`
- All API routes already exist and functional
- Database schema already includes all necessary fields
