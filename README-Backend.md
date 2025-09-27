# Sakti Dashboard Backend API

Backend API sistem informasi manajemen akademik Fakultas Teknik Universitas Sriwijaya.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm atau yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp .env.local.example .env
```

Edit `.env` dengan konfigurasi database PostgreSQL Anda.

3. Generate Prisma client dan push database schema:
```bash
npm run db:generate
npm run db:push
```

4. Seed database dengan data dummy:
```bash
npm run db:seed
```

5. Jalankan development server:
```bash
npm run dev
```

API akan berjalan di `http://localhost:3000/api`

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 dengan App Router
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js + JWT
- **Validation**: Zod
- **Password Hashing**: bcryptjs

### Database Schema
Database terdiri dari 25+ models dengan relasi yang kompleks:

#### Core Models:
- **User**: Base user dengan role-based access
- **Student**: Profile mahasiswa
- **Lecturer**: Profile dosen
- **Staff**: Profile staff administrasi

#### Academic Models:
- **KkpApplication**: Aplikasi Kerja Kerja Profesi
- **ExamApplication**: Aplikasi ujian (proposal, hasil, tutup)
- **ThesisTitle**: Judul dan data skripsi/thesis
- **Course**: Mata kuliah dan jadwal
- **Grade**: Nilai mahasiswa

#### Administrative Models:
- **Payment**: Pembayaran mahasiswa
- **LetterRequest**: Permintaan surat keterangan
- **Book**: Buku perpustakaan
- **BookBorrowing**: Peminjaman buku

#### Supporting Models:
- **Company**: Perusahaan mitra KKP
- **Notification**: Sistem notifikasi
- **AuditLog**: Log aktivitas pengguna

## 🔐 Authentication & Authorization

### Role-Based Access Control (RBAC)

#### Roles:
- **mahasiswa**: Akses data pribadi dan aplikasi
- **dosen**: Akses supervised students dan courses
- **staff_tu**: Administrasi mahasiswa dan surat
- **prodi**: Approval akademik dan manajemen prodi
- **dekan**: Approval tingkat fakultas
- **admin**: Full system access
- **admin_keuangan**: Manajemen keuangan dan pembayaran
- **laboratory_admin**: Manajemen laboratorium
- **reading_room_admin**: Manajemen perpustakaan
- **gkm**: Quality assurance dan evaluasi
- **kepala_tata_usaha**: Administrasi kepegawaian

### Login Credentials (Setelah Seeding)
- **Admin**: NIDN: `ADMIN001`, Password: `password123`
- **Staff**: NIDN: `STAFF001-013`, Password: `password123`
- **Dosen**: NIDN: `DOSEN001-030`, Password: `password123`
- **Mahasiswa**: NIDN: sama dengan NIM, Password: `password123`

## 📡 API Endpoints

### Authentication
```
POST /api/auth/login          # Login dengan NIDN & password
GET  /api/auth/me             # Get current user info
POST /api/auth/logout         # Logout
```

### User Management
```
GET    /api/users             # List users (admin only)
POST   /api/users             # Create user (admin only)
GET    /api/users/:id         # Get user detail
PUT    /api/users/:id         # Update user
DELETE /api/users/:id         # Delete user
```

### Students
```
GET    /api/students          # List students
POST   /api/students          # Create student profile
GET    /api/students/:id      # Get student detail
PUT    /api/students/:id      # Update student
GET    /api/students/:id/payments       # Student payments
GET    /api/students/:id/grades         # Student grades
GET    /api/students/:id/kkp-applications  # Student KKP apps
```

### KKP Management
```
GET    /api/kkp/applications  # List KKP applications
POST   /api/kkp/applications  # Create KKP application
GET    /api/kkp/applications/:id        # Get application detail
PUT    /api/kkp/applications/:id        # Update application
PUT    /api/kkp/applications/:id/status # Update status
POST   /api/kkp/applications/:id/assign-supervisor # Assign supervisor

GET    /api/kkp/companies     # List partner companies
POST   /api/kkp/companies     # Create company
```

### Payments
```
GET    /api/payments          # List payments
POST   /api/payments          # Create payment
GET    /api/payments/:id      # Get payment detail
PUT    /api/payments/:id      # Update payment
POST   /api/payments/:id/verify  # Verify payment (admin_keuangan)
```

### Library Management
```
GET    /api/library/books     # List books
POST   /api/library/books     # Add book (admin)
GET    /api/library/books/:id # Get book detail
POST   /api/library/books/:id/borrow  # Borrow book
POST   /api/library/books/:id/return  # Return book

GET    /api/library/borrowings # List borrowings
GET    /api/library/categories # List categories
```

## 🗃️ Database Seeding

Database seeding menghasilkan data dummy yang realistis:

### Generated Data:
- **243 Users**: 1 admin, 13 staff, 30 dosen, 200 mahasiswa
- **15 Companies**: Perusahaan mitra untuk KKP
- **110+ Books**: Koleksi perpustakaan dengan 10 kategori
- **6 Letter Types**: Template surat keterangan
- **24 System Configs**: Konfigurasi sistem

### Departments:
- Teknik Informatika
- Teknik Elektro
- Teknik Pengairan
- Arsitektur
- Perencanaan Wilayah dan Kota (PWK)

## 🛡️ Security Features

### Input Validation
- Zod schema validation untuk semua input
- SQL injection prevention melalui Prisma ORM
- XSS protection dengan input sanitization

### Authentication Security
- Password hashing dengan bcryptjs
- JWT tokens dengan expiration
- Session management dengan database storage
- Rate limiting (planned)

### Audit Logging
- User activity tracking
- IP address logging
- Resource access monitoring

## 📊 Performance Features

### Database Optimization
- Strategic indexing pada field yang sering di-query
- Efficient Prisma queries dengan selective includes
- Pagination pada semua list endpoints

### Caching Strategy
- Generated Prisma client caching
- Database connection pooling

## 🧪 Development Scripts

```bash
# Database
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed database dengan dummy data

# Development
npm run dev           # Start development server
npm run build         # Build production
npm run start         # Start production server
npm run lint          # Run ESLint
```

## 📝 API Response Format

### Success Response
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": [...] // Optional validation errors
}
```

## 🔄 Workflow Examples

### KKP Application Flow
1. Student creates KKP application
2. Staff TU reviews documents
3. Prodi approves application
4. Supervisor assignment
5. Document generation

### Payment Verification Flow
1. Student uploads payment proof
2. Admin Keuangan verifies payment
3. System updates payment status
4. Notification to student

### Book Borrowing Flow
1. Student searches books
2. Librarian processes borrowing
3. System tracks due dates
4. Automatic fine calculation

## 🚧 Roadmap

- [ ] Email notifications
- [ ] File upload handling
- [ ] Report generation
- [ ] Mobile API optimization
- [ ] Real-time notifications
- [ ] Advanced search & filtering
- [ ] Batch operations
- [ ] Data export features

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes dengan proper validation
4. Add tests jika diperlukan
5. Submit pull request

## 📞 Support

Untuk pertanyaan teknis atau bug reports, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ untuk Fakultas Teknik Universitas Sriwijaya**