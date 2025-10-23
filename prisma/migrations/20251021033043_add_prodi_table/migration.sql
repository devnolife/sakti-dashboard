-- CreateEnum
CREATE TYPE "ApprovalRole" AS ENUM ('staff_tu', 'prodi', 'dekan', 'none');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('available', 'borrowed', 'reserved', 'maintenance');

-- CreateEnum
CREATE TYPE "BorrowingStatus" AS ENUM ('active', 'returned', 'overdue', 'lost');

-- CreateEnum
CREATE TYPE "BudgetStatus" AS ENUM ('active', 'inactive', 'closed');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('pending', 'verified', 'rejected');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('confirmed', 'pending', 'cancelled', 'completed');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('exam', 'class', 'lab', 'consultation', 'seminar', 'workshop', 'deadline', 'organization');

-- CreateEnum
CREATE TYPE "ExamDocumentType" AS ENUM ('payment_proof', 'transcript', 'proposal', 'supervisor_approval', 'pembayaran_bpp', 'biaya_komprehensif', 'surat_sk_pembimbing', 'surat_penyelesaian_kkp', 'transkrip_nilai_145', 'praktikum_ilmu_falaq', 'surat_publikasi_produk', 'bukti_publish_produk', 'surat_baca_alquran', 'sertifikat_dad', 'uji_plagiat_skripsi', 'kartu_kontrol_seminar', 'persetujuan_pembimbing', 'biaya_ujian_seminar', 'transkrip_nilai_hasil', 'sertifikat_praktikum', 'uji_plagiat_hasil', 'persetujuan_pembimbing_hasil', 'skripsi_6_rangkap', 'pembayaran_ujian', 'biaya_tambahan_wd2', 'pembayaran_wisuda_perpustakaan', 'uji_plagiat_tutup', 'persetujuan_pembimbing_tutup', 'skripsi_1_rangkap', 'berkas_loa_jurnal', 'transkrip_nilai_150', 'berkas_persyaratan_yudisium', 'other');

-- CreateEnum
CREATE TYPE "ExamStatus" AS ENUM ('applicant', 'pending', 'scheduled', 'completed', 'passed', 'failed', 'cancelled');

-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('proposal', 'result', 'final', 'closing', 'midterm', 'other');

-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('pending', 'approved', 'rejected', 'paid');

-- CreateEnum
CREATE TYPE "KkpDocumentType" AS ENUM ('application_letter', 'proposal', 'transcript', 'acceptance_letter', 'supervisor_letter', 'report', 'evaluation', 'payment_proof_kkp_plus', 'transcript_125_sks', 'competency_certificate', 'practicum_control_card', 'falaq_practicum', 'quran_reading_certificate', 'academic_advisor_card', 'dad_certificate');

-- CreateEnum
CREATE TYPE "KkpRequirementType" AS ENUM ('payment_proof_kkp_plus', 'transcript_125_sks', 'competency_certificate', 'practicum_control_card', 'falaq_practicum', 'quran_reading_certificate', 'academic_advisor_card', 'dad_certificate');

-- CreateEnum
CREATE TYPE "KkpStatus" AS ENUM ('pending', 'approved', 'rejected', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "LabRegistrationStatus" AS ENUM ('pending', 'approved', 'rejected', 'completed', 'dropped');

-- CreateEnum
CREATE TYPE "LabSessionStatus" AS ENUM ('scheduled', 'ongoing', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "LabStatus" AS ENUM ('active', 'inactive', 'maintenance');

-- CreateEnum
CREATE TYPE "LetterStatus" AS ENUM ('submitted', 'in_review', 'approved', 'completed', 'rejected');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('info', 'warning', 'error', 'success');

-- CreateEnum
CREATE TYPE "PaymentCategory" AS ENUM ('laboratory', 'exam', 'kkp', 'tuition', 'other');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('mahasiswa', 'dosen', 'staff_tu', 'prodi', 'dekan', 'admin', 'laboratory_admin', 'reading_room_admin', 'admin_umum', 'admin_keuangan', 'gkm', 'kepala_tata_usaha');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('active', 'inactive', 'graduated', 'dropped_out', 'suspended');

-- CreateEnum
CREATE TYPE "ThesisStatus" AS ENUM ('pending', 'approved', 'rejected', 'archived');

-- CreateTable
CREATE TABLE "academic_consultations" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "uraian" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "paraf" BOOLEAN NOT NULL DEFAULT false,
    "student_id" TEXT NOT NULL,
    "advisor_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "type" "EventType" NOT NULL,
    "exam_type" "ExamType",
    "status" "EventStatus" NOT NULL DEFAULT 'confirmed',
    "student_id" TEXT,
    "course_id" TEXT,
    "lecturer_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "details" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_borrowings" (
    "id" TEXT NOT NULL,
    "borrow_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3),
    "status" "BorrowingStatus" NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "fine" DECIMAL(8,2),
    "book_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "book_borrowings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_categories" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "book_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publication_year" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "cover_image" TEXT,
    "description" TEXT,
    "page_count" INTEGER,
    "location" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'available',
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_borrowed_date" TIMESTAMP(3),
    "borrow_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_allocations" (
    "id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "description" TEXT,

    CONSTRAINT "budget_allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "total_amount" DECIMAL(15,2) NOT NULL,
    "used_amount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "department" TEXT,
    "fiscal_year" TEXT NOT NULL,
    "status" "BudgetStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT,
    "postal_code" TEXT,
    "contact_person" TEXT NOT NULL,
    "contact_position" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT NOT NULL,
    "website" TEXT,
    "logo" TEXT,
    "industry" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_schedules" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "building" TEXT,
    "semester" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,

    CONSTRAINT "course_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "credits" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "lecturer_id" TEXT,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_applications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ExamType" NOT NULL,
    "status" "ExamStatus" NOT NULL DEFAULT 'pending',
    "abstract" TEXT,
    "submission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduled_date" TIMESTAMP(3),
    "completion_date" TIMESTAMP(3),
    "location" TEXT,
    "student_id" TEXT NOT NULL,
    "advisor_1_id" TEXT,
    "advisor_2_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exam_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_committees" (
    "id" TEXT NOT NULL,
    "exam_id" TEXT NOT NULL,
    "lecturer_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "exam_committees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_documents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ExamDocumentType" NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'pending',
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verification_date" TIMESTAMP(3),
    "file_url" TEXT NOT NULL,
    "file_size" INTEGER,
    "notes" TEXT,
    "exam_id" TEXT NOT NULL,

    CONSTRAINT "exam_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_requirements" (
    "id" TEXT NOT NULL,
    "exam_type" "ExamType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exam_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_student_requirements" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "requirement_id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "file_url" TEXT,
    "file_name" TEXT,
    "file_size" INTEGER,
    "uploaded_at" TIMESTAMP(3),
    "verified_at" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "exam_student_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "expense_date" TIMESTAMP(3) NOT NULL,
    "receipt" TEXT,
    "status" "ExpenseStatus" NOT NULL DEFAULT 'pending',
    "approved_by" TEXT,
    "approved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_uploads" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "uploaded_by" TEXT NOT NULL,
    "category" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grades" (
    "id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "letter_grade" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kkp_applications" (
    "id" TEXT NOT NULL,
    "application_number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "submission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "KkpStatus" NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "student_id" TEXT NOT NULL,
    "group_members" JSONB,
    "supervisor_id" TEXT,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kkp_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kkp_approvals" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "approver_role" TEXT NOT NULL,
    "approver_id" TEXT,
    "status" "ApprovalStatus" NOT NULL,
    "comments" TEXT,
    "approved_at" TIMESTAMP(3),

    CONSTRAINT "kkp_approvals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kkp_documents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "KkpDocumentType" NOT NULL,
    "url" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "DocumentStatus" NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "file_size" INTEGER,
    "mime_type" TEXT,
    "application_id" TEXT,
    "location_id" TEXT,

    CONSTRAINT "kkp_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kkp_locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT,
    "industry" TEXT NOT NULL,
    "positions" JSONB NOT NULL,
    "quota" INTEGER NOT NULL DEFAULT 0,
    "remaining" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'available',
    "distance" DOUBLE PRECISION,
    "contact_person" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "company_id" TEXT,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kkp_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kkp_requirements" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "requirement_type" "KkpRequirementType" NOT NULL,
    "file_name" TEXT NOT NULL,
    "original_file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL DEFAULT 'application/pdf',
    "status" "DocumentStatus" NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified_at" TIMESTAMP(3),
    "verified_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kkp_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kkp_sub_locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "location_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kkp_sub_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_important" BOOLEAN NOT NULL DEFAULT false,
    "laboratory_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lab_announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_assignment_submissions" (
    "id" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" DOUBLE PRECISION,
    "feedback" TEXT,
    "file_url" TEXT,
    "student_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "registration_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lab_assignment_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_assignments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "max_score" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "laboratory_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lab_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_materials" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "file_url" TEXT,
    "external_url" TEXT,
    "laboratory_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lab_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_registrations" (
    "id" TEXT NOT NULL,
    "status" "LabRegistrationStatus" NOT NULL DEFAULT 'pending',
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade" TEXT,
    "student_id" TEXT NOT NULL,
    "laboratory_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lab_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_sessions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "session_date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "location" TEXT,
    "status" "LabSessionStatus" NOT NULL DEFAULT 'scheduled',
    "laboratory_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lab_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laboratories" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "capacity" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" "LabStatus" NOT NULL DEFAULT 'active',
    "instructor_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laboratories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "specialization" TEXT,
    "phone" TEXT,
    "office" TEXT,
    "email" TEXT,
    "last_sync_at" TIMESTAMP(3),

    CONSTRAINT "lecturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "letter_attachments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "file_size" INTEGER,
    "mime_type" TEXT,
    "request_id" TEXT NOT NULL,

    CONSTRAINT "letter_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "letter_requests" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "LetterStatus" NOT NULL DEFAULT 'submitted',
    "request_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_date" TIMESTAMP(3),
    "completed_date" TIMESTAMP(3),
    "rejected_reason" TEXT,
    "additional_info" JSONB,
    "student_id" TEXT NOT NULL,
    "approval_role" "ApprovalRole" NOT NULL,
    "approved_by" TEXT,
    "generated_letter" TEXT,
    "letter_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "letter_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "letter_types" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "approval_role" "ApprovalRole" NOT NULL,
    "estimated_days" INTEGER NOT NULL,
    "required_documents" TEXT[],
    "additional_fields" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "template" TEXT,

    CONSTRAINT "letter_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'info',
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "category" "PaymentCategory" NOT NULL,
    "semester" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "is_recurring" BOOLEAN NOT NULL DEFAULT false,
    "payment_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "description" TEXT NOT NULL,
    "category" "PaymentCategory" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "due_date" TIMESTAMP(3) NOT NULL,
    "paid_date" TIMESTAMP(3),
    "semester" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "receipt_number" TEXT,
    "payment_method" TEXT,
    "notes" TEXT,
    "student_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prodi" (
    "kode_prodi" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "prodi_pkey" PRIMARY KEY ("kode_prodi")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nip" TEXT,
    "department" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "phone" TEXT,
    "office" TEXT,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "academic_year" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "guardian" JSONB,
    "enroll_date" TIMESTAMP(3) NOT NULL,
    "status" "StudentStatus" NOT NULL DEFAULT 'active',
    "gpa" DOUBLE PRECISION,
    "academic_advisor_id" TEXT,
    "last_sync_at" TIMESTAMP(3),

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_configs" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thesis_archives" (
    "id" TEXT NOT NULL,
    "thesis_id" TEXT NOT NULL,
    "archive_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "physical_id" TEXT,
    "digital_id" TEXT,
    "notes" TEXT,

    CONSTRAINT "thesis_archives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thesis_reviews" (
    "id" TEXT NOT NULL,
    "thesis_id" TEXT NOT NULL,
    "reviewer_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "comments" TEXT,
    "review_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "thesis_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thesis_similarities" (
    "id" TEXT NOT NULL,
    "source_thesis_id" TEXT NOT NULL,
    "target_thesis_id" TEXT NOT NULL,
    "similarity_percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "thesis_similarities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thesis_titles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "keywords" TEXT[],
    "submission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ThesisStatus" NOT NULL DEFAULT 'pending',
    "year" INTEGER NOT NULL,
    "similarity_score" DOUBLE PRECISION,
    "digital_copy" BOOLEAN NOT NULL DEFAULT false,
    "document_url" TEXT,
    "external_link" TEXT,
    "author_id" TEXT NOT NULL,
    "supervisor_id" TEXT,
    "department" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "thesis_titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'mahasiswa',
    "sub_role" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "book_categories_code_key" ON "book_categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "courses_code_key" ON "courses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "exam_committees_exam_id_lecturer_id_key" ON "exam_committees"("exam_id", "lecturer_id");

-- CreateIndex
CREATE UNIQUE INDEX "exam_student_requirements_student_id_requirement_id_key" ON "exam_student_requirements"("student_id", "requirement_id");

-- CreateIndex
CREATE UNIQUE INDEX "grades_student_id_course_id_semester_academic_year_key" ON "grades"("student_id", "course_id", "semester", "academic_year");

-- CreateIndex
CREATE UNIQUE INDEX "kkp_applications_application_number_key" ON "kkp_applications"("application_number");

-- CreateIndex
CREATE UNIQUE INDEX "kkp_locations_name_address_key" ON "kkp_locations"("name", "address");

-- CreateIndex
CREATE UNIQUE INDEX "kkp_requirements_student_id_requirement_type_key" ON "kkp_requirements"("student_id", "requirement_type");

-- CreateIndex
CREATE UNIQUE INDEX "lab_assignment_submissions_student_id_assignment_id_key" ON "lab_assignment_submissions"("student_id", "assignment_id");

-- CreateIndex
CREATE UNIQUE INDEX "lab_registrations_student_id_laboratory_id_key" ON "lab_registrations"("student_id", "laboratory_id");

-- CreateIndex
CREATE UNIQUE INDEX "laboratories_code_key" ON "laboratories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "lecturers_user_id_key" ON "lecturers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "lecturers_nip_key" ON "lecturers"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "letter_types_title_key" ON "letter_types"("title");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "staff_user_id_key" ON "staff"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_nip_key" ON "staff"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_nim_key" ON "students"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "system_configs_key_key" ON "system_configs"("key");

-- CreateIndex
CREATE UNIQUE INDEX "thesis_archives_thesis_id_key" ON "thesis_archives"("thesis_id");

-- CreateIndex
CREATE UNIQUE INDEX "thesis_similarities_source_thesis_id_target_thesis_id_key" ON "thesis_similarities"("source_thesis_id", "target_thesis_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_nidn_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "academic_consultations" ADD CONSTRAINT "academic_consultations_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "lecturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_consultations" ADD CONSTRAINT "academic_consultations_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_events" ADD CONSTRAINT "academic_events_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_events" ADD CONSTRAINT "academic_events_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_events" ADD CONSTRAINT "academic_events_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_borrowings" ADD CONSTRAINT "book_borrowings_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_borrowings" ADD CONSTRAINT "book_borrowings_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "book_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_allocations" ADD CONSTRAINT "budget_allocations_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_schedules" ADD CONSTRAINT "course_schedules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_applications" ADD CONSTRAINT "exam_applications_advisor_1_id_fkey" FOREIGN KEY ("advisor_1_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_applications" ADD CONSTRAINT "exam_applications_advisor_2_id_fkey" FOREIGN KEY ("advisor_2_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_applications" ADD CONSTRAINT "exam_applications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_committees" ADD CONSTRAINT "exam_committees_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exam_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_committees" ADD CONSTRAINT "exam_committees_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_documents" ADD CONSTRAINT "exam_documents_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exam_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_student_requirements" ADD CONSTRAINT "exam_student_requirements_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "exam_requirements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_student_requirements" ADD CONSTRAINT "exam_student_requirements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_applications" ADD CONSTRAINT "kkp_applications_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_applications" ADD CONSTRAINT "kkp_applications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_applications" ADD CONSTRAINT "kkp_applications_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_approvals" ADD CONSTRAINT "kkp_approvals_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "kkp_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_documents" ADD CONSTRAINT "kkp_documents_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "kkp_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_documents" ADD CONSTRAINT "kkp_documents_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "kkp_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_locations" ADD CONSTRAINT "kkp_locations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_locations" ADD CONSTRAINT "kkp_locations_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_requirements" ADD CONSTRAINT "kkp_requirements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kkp_sub_locations" ADD CONSTRAINT "kkp_sub_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "kkp_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_announcements" ADD CONSTRAINT "lab_announcements_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_assignment_submissions" ADD CONSTRAINT "lab_assignment_submissions_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "lab_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_assignment_submissions" ADD CONSTRAINT "lab_assignment_submissions_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "lab_registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_assignment_submissions" ADD CONSTRAINT "lab_assignment_submissions_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_assignments" ADD CONSTRAINT "lab_assignments_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_materials" ADD CONSTRAINT "lab_materials_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_registrations" ADD CONSTRAINT "lab_registrations_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_registrations" ADD CONSTRAINT "lab_registrations_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_sessions" ADD CONSTRAINT "lab_sessions_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratories" ADD CONSTRAINT "laboratories_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "letter_attachments" ADD CONSTRAINT "letter_attachments_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "letter_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "letter_requests" ADD CONSTRAINT "letter_requests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_items" ADD CONSTRAINT "payment_items_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academic_advisor_id_fkey" FOREIGN KEY ("academic_advisor_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thesis_archives" ADD CONSTRAINT "thesis_archives_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "thesis_titles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thesis_reviews" ADD CONSTRAINT "thesis_reviews_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "thesis_titles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thesis_similarities" ADD CONSTRAINT "thesis_similarities_source_thesis_id_fkey" FOREIGN KEY ("source_thesis_id") REFERENCES "thesis_titles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thesis_similarities" ADD CONSTRAINT "thesis_similarities_target_thesis_id_fkey" FOREIGN KEY ("target_thesis_id") REFERENCES "thesis_titles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thesis_titles" ADD CONSTRAINT "thesis_titles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thesis_titles" ADD CONSTRAINT "thesis_titles_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "lecturers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
