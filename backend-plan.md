# Backend Plan - Sakti Dashboard
Comprehensive API Backend Implementation Plan using Prisma + PostgreSQL

## 🎯 Project Overview
Sakti Dashboard adalah sistem manajemen akademik fakultas teknik yang mendukung berbagai role dan fitur administrasi. Backend ini akan menyediakan REST API untuk semua fitur yang ada di frontend.

## 🏗️ Tech Stack
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Backend**: Next.js API Routes (/api folder structure)
- **Authentication**: NextAuth.js / JWT + bcrypt
- **File Storage**: Local storage / AWS S3
- **Email Service**: NodeMailer / SendGrid
- **Document Generation**: PDFKit / Puppeteer

## 👥 User Roles & Permissions

### Primary Roles
1. **mahasiswa** - Students
2. **dosen** - Lecturers (with sub-roles)
3. **staff_tu** - Administrative Staff
4. **prodi** - Head of Study Program
5. **dekan** - Dean
6. **admin** - System Administrator
7. **admin_keuangan** - Finance Administrator
8. **admin_umum** - General Administrator
9. **laboratory_admin** - Laboratory Administrator
10. **reading_room_admin** - Library Administrator
11. **gkm** - Quality Control Group
12. **kepala_tata_usaha** - Head of Administrative Affairs

### Dosen Sub-roles
- **wakil_dekan_1** - Vice Dean I (Academic)
- **wakil_dekan_2** - Vice Dean II (Administration & Finance)
- **wakil_dekan_3** - Vice Dean III (Student Affairs)
- **wakil_dekan_4** - Vice Dean IV (Cooperation & Development)

## 🗄️ Database Schema (Prisma Models)

### 1. Authentication & User Management
```prisma
model User {
  id          String   @id @default(cuid())
  nidn       String   @unique
  password    String
  name        String
  avatar      String?
  role        Role     @default(mahasiswa)
  subRole     String?  // For dosen sub-roles
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  studentProfile     Student?
  lecturerProfile    Lecturer?
  staffProfile       Staff?

  // Activity logs
  sessions           Session[]
  auditLogs          AuditLog[]

  @@map("users")
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  action    String
  resource  String
  details   Json?
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@map("audit_logs")
}
```

### 2. Academic Profiles
```prisma
model Student {
  id            String   @id @default(cuid())
  userId        String   @unique
  nim           String   @unique
  major         String
  department    String
  semester      Int
  academicYear  String
  phone         String?
  address       String?
  guardian      Json?    // Parent/guardian info
  enrollDate    DateTime
  status        StudentStatus @default(active)
  gpa           Float?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Relations
  kkpApplications    KkpApplication[]
  examApplications   ExamApplication[]
  letterRequests     LetterRequest[]
  payments           Payment[]
  bookBorrowings     BookBorrowing[]
  thesesAuthored     ThesisTitle[]
  grades             Grade[]

  @@map("students")
}

model Lecturer {
  id             String   @id @default(cuid())
  userId         String   @unique
  nip            String   @unique
  department     String
  position       String   // Professor, Associate Professor, etc.
  specialization String?
  phone          String?
  office         String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Relations
  supervisedKkp      KkpApplication[] @relation("KkpSupervisor")
  supervisedTheses   ThesisTitle[]    @relation("ThesisSupervisor")
  examCommittees     ExamCommittee[]
  courses            Course[]

  @@map("lecturers")
}

model Staff {
  id         String   @id @default(cuid())
  userId     String   @unique
  nip        String?  @unique
  department String
  position   String
  phone      String?
  office     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("staff")
}
```

### 3. KKP (Kerja Kerja Profesi) Management
```prisma
model KkpApplication {
  id                String      @id @default(cuid())
  applicationNumber String      @unique
  title             String
  description       String
  submissionDate    DateTime    @default(now())
  startDate         DateTime
  endDate           DateTime
  status            KkpStatus   @default(pending)
  notes             String?

  // Student Info
  studentId         String
  student           Student     @relation(fields: [studentId], references: [id])

  // Group Members (if any)
  groupMembers      Json?       // Array of student IDs for group projects

  // Supervisor
  supervisorId      String?
  supervisor        Lecturer?   @relation("KkpSupervisor", fields: [supervisorId], references: [id])

  // Company Info
  companyId         String
  company           Company     @relation(fields: [companyId], references: [id])

  // Documents
  documents         KkpDocument[]

  // Approval workflow
  approvals         KkpApproval[]

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  @@map("kkp_applications")
}

model Company {
  id              String   @id @default(cuid())
  name            String
  address         String
  city            String
  province        String?
  postalCode      String?
  contactPerson   String
  contactPosition String?
  contactEmail    String?
  contactPhone    String
  website         String?
  logo            String?
  industry        String
  description     String?
  isActive        Boolean  @default(true)

  kkpApplications KkpApplication[]

  @@map("companies")
}

model KkpDocument {
  id             String            @id @default(cuid())
  name           String
  type           KkpDocumentType
  url            String
  uploadDate     DateTime          @default(now())
  status         DocumentStatus    @default(pending)
  notes          String?
  fileSize       Int?
  mimeType       String?

  applicationId  String
  application    KkpApplication    @relation(fields: [applicationId], references: [id], onDelete: Cascade)

  @@map("kkp_documents")
}

model KkpApproval {
  id            String         @id @default(cuid())
  applicationId String
  approverRole  String         // staff_tu, prodi, dekan
  approverId    String?        // User who approved/rejected
  status        ApprovalStatus
  comments      String?
  approvedAt    DateTime?

  application   KkpApplication @relation(fields: [applicationId], references: [id], onDelete: Cascade)

  @@map("kkp_approvals")
}
```

### 4. Examination Management
```prisma
model ExamApplication {
  id              String          @id @default(cuid())
  title           String
  type            ExamType        // proposal, result, final
  status          ExamStatus      @default(pending)
  abstract        String?
  submissionDate  DateTime        @default(now())
  scheduledDate   DateTime?
  completionDate  DateTime?
  location        String?

  studentId       String
  student         Student         @relation(fields: [studentId], references: [id])

  // Advisors
  advisor1Id      String?
  advisor1        Lecturer?       @relation("ExamAdvisor1", fields: [advisor1Id], references: [id])
  advisor2Id      String?
  advisor2        Lecturer?       @relation("ExamAdvisor2", fields: [advisor2Id], references: [id])

  // Committee members
  committees      ExamCommittee[]
  documents       ExamDocument[]

  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  @@map("exam_applications")
}

model ExamCommittee {
  id           String          @id @default(cuid())
  examId       String
  lecturerId   String
  role         String          // chairman, secretary, member

  exam         ExamApplication @relation(fields: [examId], references: [id], onDelete: Cascade)
  lecturer     Lecturer        @relation(fields: [lecturerId], references: [id])

  @@unique([examId, lecturerId])
  @@map("exam_committees")
}

model ExamDocument {
  id        String          @id @default(cuid())
  name      String
  type      ExamDocumentType // payment_proof, transcript, proposal, etc.
  status    DocumentStatus   @default(pending)
  uploadDate DateTime        @default(now())
  verificationDate DateTime?
  fileUrl   String
  fileSize  Int?
  notes     String?

  examId    String
  exam      ExamApplication @relation(fields: [examId], references: [id], onDelete: Cascade)

  @@map("exam_documents")
}
```

### 5. Thesis Management
```prisma
model ThesisTitle {
  id              String         @id @default(cuid())
  title           String
  abstract        String
  keywords        String[]
  submissionDate  DateTime       @default(now())
  status          ThesisStatus   @default(pending)
  year            Int
  similarityScore Float?
  digitalCopy     Boolean        @default(false)
  documentUrl     String?
  externalLink    String?

  authorId        String
  author          Student        @relation(fields: [authorId], references: [id])

  supervisorId    String?
  supervisor      Lecturer?      @relation("ThesisSupervisor", fields: [supervisorId], references: [id])

  department      String

  // Similarity analysis
  similarTheses   ThesisSimilarity[] @relation("SourceThesis")
  similarToTheses ThesisSimilarity[] @relation("TargetThesis")

  // Review history
  reviews         ThesisReview[]

  // Archive info
  archiveInfo     ThesisArchive?

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@map("thesis_titles")
}

model ThesisSimilarity {
  id                    String      @id @default(cuid())
  sourceThesisId        String
  targetThesisId        String
  similarityPercentage  Float

  sourceThesis          ThesisTitle @relation("SourceThesis", fields: [sourceThesisId], references: [id], onDelete: Cascade)
  targetThesis          ThesisTitle @relation("TargetThesis", fields: [targetThesisId], references: [id], onDelete: Cascade)

  @@unique([sourceThesisId, targetThesisId])
  @@map("thesis_similarities")
}

model ThesisReview {
  id         String      @id @default(cuid())
  thesisId   String
  reviewerId String
  action     String      // submitted, reviewed, approved, rejected
  comments   String?
  reviewDate DateTime    @default(now())

  thesis     ThesisTitle @relation(fields: [thesisId], references: [id], onDelete: Cascade)

  @@map("thesis_reviews")
}

model ThesisArchive {
  id          String      @id @default(cuid())
  thesisId    String      @unique
  archiveDate DateTime    @default(now())
  location    String
  physicalId  String?
  digitalId   String?
  notes       String?

  thesis      ThesisTitle @relation(fields: [thesisId], references: [id], onDelete: Cascade)

  @@map("thesis_archives")
}
```

### 6. Payment & Finance Management
```prisma
model Payment {
  id            String        @id @default(cuid())
  amount        Decimal       @db.Decimal(12,2)
  description   String
  category      PaymentCategory
  status        PaymentStatus @default(pending)
  dueDate       DateTime
  paidDate      DateTime?
  semester      String
  academicYear  String
  receiptNumber String?
  paymentMethod String?
  notes         String?

  studentId     String
  student       Student       @relation(fields: [studentId], references: [id])

  // Payment items breakdown
  items         PaymentItem[]

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@map("payments")
}

model PaymentItem {
  id           String          @id @default(cuid())
  name         String
  description  String?
  amount       Decimal         @db.Decimal(10,2)
  category     PaymentCategory
  semester     String
  academicYear String
  dueDate      DateTime
  isRequired   Boolean         @default(true)
  isRecurring  Boolean         @default(false)

  paymentId    String?
  payment      Payment?        @relation(fields: [paymentId], references: [id])

  createdAt    DateTime        @default(now())

  @@map("payment_items")
}

model Budget {
  id          String      @id @default(cuid())
  name        String
  description String?
  totalAmount Decimal     @db.Decimal(15,2)
  usedAmount  Decimal     @default(0) @db.Decimal(15,2)
  category    String
  department  String?
  fiscalYear  String
  status      BudgetStatus @default(active)

  allocations BudgetAllocation[]
  expenses    Expense[]

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@map("budgets")
}

model BudgetAllocation {
  id          String   @id @default(cuid())
  budgetId    String
  department  String
  amount      Decimal  @db.Decimal(12,2)
  description String?

  budget      Budget   @relation(fields: [budgetId], references: [id], onDelete: Cascade)

  @@map("budget_allocations")
}

model Expense {
  id          String      @id @default(cuid())
  budgetId    String
  amount      Decimal     @db.Decimal(10,2)
  description String
  category    String
  expenseDate DateTime
  receipt     String?     // Receipt file URL
  status      ExpenseStatus @default(pending)
  approvedBy  String?
  approvedAt  DateTime?

  budget      Budget      @relation(fields: [budgetId], references: [id])

  createdAt   DateTime    @default(now())

  @@map("expenses")
}
```

### 7. Correspondence & Letters Management
```prisma
model LetterRequest {
  id             String        @id @default(cuid())
  type           String        // Type of letter requested
  title          String
  purpose        String
  description    String
  status         LetterStatus  @default(submitted)
  requestDate    DateTime      @default(now())
  approvedDate   DateTime?
  completedDate  DateTime?
  rejectedReason String?
  additionalInfo Json?         // Additional form fields

  studentId      String
  student        Student       @relation(fields: [studentId], references: [id])

  // Approval workflow
  approvalRole   ApprovalRole  // Who needs to approve
  approvedBy     String?       // User ID who approved

  // Attachments
  attachments    LetterAttachment[]

  // Generated letter
  generatedLetter String?      // File path/URL to generated letter
  letterNumber    String?      // Official letter number

  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  @@map("letter_requests")
}

model LetterAttachment {
  id           String        @id @default(cuid())
  name         String
  uploadDate   DateTime      @default(now())
  url          String        // File storage URL
  fileSize     Int?
  mimeType     String?

  requestId    String
  request      LetterRequest @relation(fields: [requestId], references: [id], onDelete: Cascade)

  @@map("letter_attachments")
}

model LetterType {
  id                String   @id @default(cuid())
  title             String   @unique
  description       String
  approvalRole      ApprovalRole
  estimatedDays     Int
  requiredDocuments String[] // Array of required document types
  additionalFields  Json?    // Dynamic form fields configuration
  isActive          Boolean  @default(true)
  template          String?  // Letter template

  @@map("letter_types")
}
```

### 8. Library Management
```prisma
model Book {
  id               String     @id @default(cuid())
  title            String
  author           String
  publisher        String
  publicationYear  Int
  isbn             String     @unique
  categoryId       String
  coverImage       String?
  description      String?
  pageCount        Int?
  location         String     // Physical location in library
  status           BookStatus @default(available)
  addedDate        DateTime   @default(now())
  lastBorrowedDate DateTime?
  borrowCount      Int        @default(0)

  category         BookCategory    @relation(fields: [categoryId], references: [id])
  borrowings       BookBorrowing[]

  @@map("books")
}

model BookCategory {
  id          String  @id @default(cuid())
  code        String  @unique
  name        String
  description String?
  isActive    Boolean @default(true)

  books       Book[]

  @@map("book_categories")
}

model BookBorrowing {
  id          String          @id @default(cuid())
  borrowDate  DateTime        @default(now())
  dueDate     DateTime
  returnDate  DateTime?
  status      BorrowingStatus @default(active)
  notes       String?
  fine        Decimal?        @db.Decimal(8,2)

  bookId      String
  book        Book            @relation(fields: [bookId], references: [id])

  studentId   String
  student     Student         @relation(fields: [studentId], references: [id])

  @@map("book_borrowings")
}
```

### 9. Academic Courses & Grades
```prisma
model Course {
  id          String   @id @default(cuid())
  code        String   @unique
  name        String
  description String?
  credits     Int
  semester    Int
  department  String
  isActive    Boolean  @default(true)

  lecturerId  String?
  lecturer    Lecturer? @relation(fields: [lecturerId], references: [id])

  grades      Grade[]
  schedules   CourseSchedule[]

  @@map("courses")
}

model Grade {
  id         String      @id @default(cuid())
  score      Float
  letterGrade String     // A, B+, B, etc.
  semester   String
  academicYear String

  studentId  String
  student    Student     @relation(fields: [studentId], references: [id])

  courseId   String
  course     Course      @relation(fields: [courseId], references: [id])

  createdAt  DateTime    @default(now())

  @@unique([studentId, courseId, semester, academicYear])
  @@map("grades")
}

model CourseSchedule {
  id        String   @id @default(cuid())
  courseId  String
  day       String   // Monday, Tuesday, etc.
  startTime String   // HH:MM format
  endTime   String   // HH:MM format
  room      String
  building  String?
  semester  String
  academicYear String

  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@map("course_schedules")
}
```

### 10. System Configuration & Logs
```prisma
model SystemConfig {
  id    String @id @default(cuid())
  key   String @unique
  value String
  description String?
  category String? // auth, payment, notification, etc.

  updatedAt DateTime @updatedAt

  @@map("system_configs")
}

model Notification {
  id        String            @id @default(cuid())
  userId    String
  title     String
  message   String
  type      NotificationType  @default(info)
  isRead    Boolean           @default(false)
  data      Json?             // Additional notification data

  createdAt DateTime          @default(now())
  readAt    DateTime?

  @@map("notifications")
}

model FileUpload {
  id        String   @id @default(cuid())
  filename  String
  originalName String
  path      String
  size      Int
  mimeType  String
  uploadedBy String
  category  String?  // document, image, etc.

  createdAt DateTime @default(now())

  @@map("file_uploads")
}
```

## 📝 Enums Definition
```prisma
enum Role {
  mahasiswa
  dosen
  prodi
  staff_tu
  dekan
  admin
  laboratory_admin
  reading_room_admin
  admin_umum
  admin_keuangan
  gkm
  kepala_tata_usaha
}

enum StudentStatus {
  active
  inactive
  graduated
  dropped_out
  suspended
}

enum KkpStatus {
  pending
  approved
  rejected
  in_progress
  completed
}

enum KkpDocumentType {
  application_letter
  proposal
  transcript
  acceptance_letter
  supervisor_letter
  report
  evaluation
}

enum DocumentStatus {
  pending
  verified
  rejected
}

enum ApprovalStatus {
  pending
  approved
  rejected
}

enum ExamType {
  proposal
  result
  final
  other
}

enum ExamStatus {
  applicant
  pending
  scheduled
  completed
  passed
  failed
  cancelled
}

enum ExamDocumentType {
  payment_proof
  transcript
  proposal
  supervisor_approval
  other
}

enum ThesisStatus {
  pending
  approved
  rejected
  archived
}

enum PaymentCategory {
  laboratory
  exam
  kkp
  tuition
  other
}

enum PaymentStatus {
  pending
  completed
  failed
  refunded
}

enum BudgetStatus {
  active
  inactive
  closed
}

enum ExpenseStatus {
  pending
  approved
  rejected
  paid
}

enum LetterStatus {
  submitted
  in_review
  approved
  completed
  rejected
}

enum ApprovalRole {
  staff_tu
  prodi
  dekan
  none
}

enum BookStatus {
  available
  borrowed
  reserved
  maintenance
}

enum BorrowingStatus {
  active
  returned
  overdue
  lost
}

enum NotificationType {
  info
  warning
  error
  success
}
```

## 🔐 Authentication & Authorization

### JWT Token Structure
```javascript
{
  userId: string,
  nidn: string,
  role: Role,
  subRole?: string,
  sessionId: string,
  iat: number,
  exp: number
}
```

### Permission Matrix
- **Public**: Login, Register (if allowed), Password reset
- **mahasiswa**: Own profile, payments, applications, grades, library
- **dosen**: Students data (supervised), grades, courses, evaluations
- **staff_tu**: Student records, letter requests, general admin
- **prodi**: Department data, approvals, academic oversight
- **dekan**: Faculty-wide access, final approvals
- **admin**: Full system access
- **admin_keuangan**: Payment management, budget tracking
- **laboratory_admin**: Lab equipment, schedules, usage
- **reading_room_admin**: Library management, book cataloging
- **gkm**: Quality metrics, evaluations, reporting
- **kepala_tata_usaha**: Administrative oversight, staff management

## 🚀 Next.js API Routes Structure

### File Structure dalam /app/api/
```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── register/route.ts
│   │   ├── logout/route.ts
│   │   ├── me/route.ts
│   │   ├── forgot-password/route.ts
│   │   ├── reset-password/route.ts
│   │   └── change-password/route.ts
│   ├── users/
│   │   ├── route.ts                    # GET /api/users, POST /api/users
│   │   └── [id]/
│   │       ├── route.ts                # GET, PUT, DELETE /api/users/[id]
│   │       └── profile/route.ts        # GET, PUT /api/users/[id]/profile
│   ├── students/
│   │   ├── route.ts                    # GET /api/students, POST /api/students
│   │   └── [id]/
│   │       ├── route.ts                # GET, PUT, DELETE /api/students/[id]
│   │       ├── payments/route.ts       # GET /api/students/[id]/payments
│   │       ├── grades/route.ts         # GET /api/students/[id]/grades
│   │       ├── kkp-applications/route.ts
│   │       └── exam-applications/route.ts
│   ├── kkp/
│   │   ├── applications/
│   │   │   ├── route.ts                # GET, POST /api/kkp/applications
│   │   │   └── [id]/
│   │   │       ├── route.ts            # GET, PUT, DELETE /api/kkp/applications/[id]
│   │   │       ├── documents/route.ts  # POST /api/kkp/applications/[id]/documents
│   │   │       ├── status/route.ts     # PUT /api/kkp/applications/[id]/status
│   │   │       └── assign-supervisor/route.ts
│   │   └── companies/
│   │       ├── route.ts                # GET, POST /api/kkp/companies
│   │       └── [id]/route.ts           # GET, PUT, DELETE /api/kkp/companies/[id]
│   ├── exams/
│   │   └── applications/
│   │       ├── route.ts                # GET, POST /api/exams/applications
│   │       └── [id]/
│   │           ├── route.ts            # GET, PUT /api/exams/applications/[id]
│   │           ├── schedule/route.ts   # POST /api/exams/applications/[id]/schedule
│   │           ├── documents/route.ts  # POST /api/exams/applications/[id]/documents
│   │           └── status/route.ts     # PUT /api/exams/applications/[id]/status
│   ├── thesis/
│   │   └── titles/
│   │       ├── route.ts                # GET, POST /api/thesis/titles
│   │       └── [id]/
│   │           ├── route.ts            # GET, PUT, DELETE /api/thesis/titles/[id]
│   │           ├── similarity-check/route.ts
│   │           ├── similar/route.ts    # GET /api/thesis/titles/[id]/similar
│   │           └── archive/route.ts    # POST /api/thesis/titles/[id]/archive
│   ├── payments/
│   │   ├── route.ts                    # GET, POST /api/payments
│   │   ├── student/
│   │   │   └── [studentId]/route.ts    # GET /api/payments/student/[studentId]
│   │   └── [id]/
│   │       ├── route.ts                # GET, PUT /api/payments/[id]
│   │       └── verify/route.ts         # POST /api/payments/[id]/verify
│   ├── budgets/
│   │   ├── route.ts                    # GET, POST /api/budgets
│   │   └── [id]/
│   │       ├── route.ts                # GET, PUT /api/budgets/[id]
│   │       └── allocations/route.ts    # GET /api/budgets/[id]/allocations
│   ├── expenses/
│   │   ├── route.ts                    # GET, POST /api/expenses
│   │   └── [id]/
│   │       ├── route.ts                # GET, PUT /api/expenses/[id]
│   │       └── approve/route.ts        # PUT /api/expenses/[id]/approve
│   ├── letters/
│   │   ├── requests/
│   │   │   ├── route.ts                # GET, POST /api/letters/requests
│   │   │   └── [id]/
│   │   │       ├── route.ts            # GET, PUT /api/letters/requests/[id]
│   │   │       └── status/route.ts     # PUT /api/letters/requests/[id]/status
│   │   ├── types/route.ts              # GET /api/letters/types
│   │   ├── generate/
│   │   │   └── [requestId]/route.ts    # POST /api/letters/generate/[requestId]
│   │   └── download/
│   │       └── [requestId]/route.ts    # GET /api/letters/download/[requestId]
│   ├── library/
│   │   ├── books/
│   │   │   ├── route.ts                # GET, POST /api/library/books
│   │   │   └── [id]/
│   │   │       ├── route.ts            # GET, PUT, DELETE /api/library/books/[id]
│   │   │       ├── borrow/route.ts     # POST /api/library/books/[id]/borrow
│   │   │       └── return/route.ts     # POST /api/library/books/[id]/return
│   │   ├── borrowings/route.ts         # GET /api/library/borrowings
│   │   └── categories/
│   │       ├── route.ts                # GET, POST /api/library/categories
│   │       └── [id]/route.ts           # GET, PUT, DELETE /api/library/categories/[id]
│   ├── courses/
│   │   ├── route.ts                    # GET, POST /api/courses
│   │   └── [id]/
│   │       ├── route.ts                # GET, PUT /api/courses/[id]
│   │       └── schedules/route.ts      # GET /api/courses/[id]/schedules
│   ├── grades/
│   │   ├── route.ts                    # GET, POST /api/grades
│   │   ├── student/
│   │   │   └── [studentId]/route.ts    # GET /api/grades/student/[studentId]
│   │   └── [id]/route.ts               # GET, PUT /api/grades/[id]
│   ├── reports/
│   │   ├── student-statistics/route.ts
│   │   ├── payment-summary/route.ts
│   │   ├── kkp-statistics/route.ts
│   │   ├── exam-statistics/route.ts
│   │   ├── budget-analysis/route.ts
│   │   └── library-usage/route.ts
│   ├── files/
│   │   ├── upload/route.ts             # POST /api/files/upload
│   │   └── [id]/
│   │       ├── route.ts                # GET, DELETE /api/files/[id]
│   │       └── download/route.ts       # GET /api/files/[id]/download
│   └── notifications/
│       ├── route.ts                    # GET, POST /api/notifications
│       ├── read-all/route.ts           # PUT /api/notifications/read-all
│       └── [id]/
│           └── read/route.ts           # PUT /api/notifications/[id]/read
```

## 📊 Fake Data Generation Strategy

### 1. User & Authentication Data
- **50+ Users** across all roles
- **Students**: 200+ with different majors (Informatika, Elektro, Pengairan, Arsitektur, PWK)
- **Lecturers**: 30+ with different specializations
- **Staff**: 15+ across different administrative roles

### 2. Academic Data
- **KKP Applications**: 100+ with various statuses and companies
- **Exam Applications**: 80+ for different exam types
- **Thesis Titles**: 150+ with similarity analysis
- **Courses**: 50+ across departments with schedules
- **Grades**: 1000+ grade records

### 3. Financial Data
- **Payment Records**: 500+ student payments
- **Budget Allocations**: 20+ department budgets
- **Expenses**: 200+ expense records
- **Payment Items**: Standard fee structures

### 4. Administrative Data
- **Letter Requests**: 100+ correspondence requests
- **Companies**: 50+ partner companies for KKP
- **Book Catalog**: 500+ books with categories
- **Book Borrowings**: 300+ borrowing records

### 5. System Data
- **Audit Logs**: User activity tracking
- **Notifications**: System notifications
- **File Uploads**: Document management
- **System Configs**: Application settings

## 🔧 Next.js API Implementation Patterns

### Standard Route Handler Structure
```typescript
// app/api/[module]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

// GET /api/[module]
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Role-based access control
    if (!hasPermission(session.user.role, 'read')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await prisma.[model].findMany()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/[module]
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = schema.parse(body)

    const created = await prisma.[model].create({
      data: validatedData
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
```

### Dynamic Route Handler Structure
```typescript
// app/api/[module]/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: { id: string }
}

// GET /api/[module]/[id]
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params
    const data = await prisma.[model].findUnique({
      where: { id },
      include: { ... }
    })

    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
```

### Middleware for Authentication & RBAC
```typescript
// lib/auth-middleware.ts
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function authMiddleware(request: NextRequest) {
  const token = await getToken({ req: request })

  if (!token) {
    throw new Error('Unauthorized')
  }

  return token
}

export function hasPermission(role: string, action: string, resource?: string): boolean {
  const permissions = {
    admin: ['*'],
    mahasiswa: ['read:own', 'create:own', 'update:own'],
    dosen: ['read:supervised', 'update:supervised', 'create:grades'],
    // ... other role permissions
  }

  return permissions[role]?.includes(`${action}:${resource}`) ||
         permissions[role]?.includes('*')
}
```

### Prisma Client Setup
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### File Upload Handler
```typescript
// app/api/files/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file = data.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`
    const path = join('./public/uploads', filename)

    await writeFile(path, buffer)

    // Save file info to database
    const fileRecord = await prisma.fileUpload.create({
      data: {
        filename,
        originalName: file.name,
        path: `/uploads/${filename}`,
        size: file.size,
        mimeType: file.type,
        uploadedBy: session.user.id
      }
    })

    return NextResponse.json(fileRecord)
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

## 🛠️ Implementation Steps

### Phase 1: Foundation (Week 1-2)
1. Setup PostgreSQL database
2. Initialize Prisma with basic models
3. Setup NextAuth.js authentication
4. Create basic API route structure
5. Implement role-based middleware

### Phase 2: Core Academic Features (Week 3-4)
1. Student management APIs
2. KKP application system with approval workflow
3. Exam application management APIs
4. Basic notification system

### Phase 3: Advanced Features (Week 5-6)
1. Thesis management with similarity checking
2. Payment and finance APIs
3. Letter request and generation system
4. File upload and management

### Phase 4: Additional Modules (Week 7-8)
1. Library management APIs
2. Course and grade management
3. Reports and analytics endpoints
4. System configuration APIs

### Phase 5: Testing & Documentation (Week 9-10)
1. API testing with Jest/Vitest
2. API documentation with OpenAPI
3. Database seeding scripts
4. Performance optimization

## 🔧 Database Seeding Script Structure
```bash
# Prisma seed command structure
npm run db:seed

# Seed files organization:
├── prisma/
│   ├── seed/
│   │   ├── index.ts           # Main seed orchestrator
│   │   ├── users.ts           # User and authentication data
│   │   ├── students.ts        # Student profiles and academic data
│   │   ├── lecturers.ts       # Lecturer profiles
│   │   ├── kkp.ts            # KKP applications and companies
│   │   ├── exams.ts          # Exam applications and schedules
│   │   ├── thesis.ts         # Thesis titles and similarity data
│   │   ├── payments.ts       # Payment and budget data
│   │   ├── letters.ts        # Letter requests and types
│   │   ├── library.ts        # Books and borrowing records
│   │   ├── courses.ts        # Courses and grades
│   │   └── system.ts         # System configs and notifications
```

## 🔐 Security Considerations
- **Input Validation**: Zod schemas for all inputs
- **Rate Limiting**: API rate limiting implementation
- **File Upload Security**: File type validation, size limits
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Prevention**: Input sanitization
- **CORS Configuration**: Proper CORS setup
- **Password Security**: bcrypt hashing, strength requirements
- **Session Management**: Secure session handling
- **Audit Logging**: Comprehensive activity logging

## 📈 Performance Optimization
- **Database Indexing**: Strategic indexes on frequently queried fields
- **Query Optimization**: Efficient Prisma queries with includes
- **Caching Strategy**: Redis for frequently accessed data
- **File Storage**: Optimized file storage and CDN integration
- **Pagination**: Consistent pagination across all list endpoints
- **Background Jobs**: Queue system for heavy operations

## 🧪 Testing Strategy
- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **Database Tests**: Database operation testing
- **Authentication Tests**: Security and authorization testing
- **Load Testing**: Performance under load
- **End-to-End Tests**: Complete workflow testing

This comprehensive backend plan provides a solid foundation for implementing the Sakti Dashboard API with all required features, proper authentication, role management, and extensive fake data for development and testing purposes.
