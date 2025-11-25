-- AlterTable
ALTER TABLE "letter_requests" ADD COLUMN     "qr_code_url" TEXT,
ADD COLUMN     "signature" TEXT,
ADD COLUMN     "signature_data" JSONB,
ADD COLUMN     "signed_at" TIMESTAMP(3),
ADD COLUMN     "signed_by" TEXT,
ADD COLUMN     "verification_count" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "signature_verifications" (
    "id" TEXT NOT NULL,
    "letter_request_id" TEXT NOT NULL,
    "verified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "signature_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template_uploads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "file_url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_type" TEXT NOT NULL DEFAULT 'docx',
    "category" TEXT NOT NULL DEFAULT 'surat',
    "prodi_id" TEXT,
    "is_global" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "detected_fields" JSONB,
    "metadata" JSONB,
    "variable_mapping" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "uploaded_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laboratory_certificates" (
    "id" TEXT NOT NULL,
    "verification_id" TEXT NOT NULL,
    "certificate_title" TEXT NOT NULL,
    "participant_name" TEXT NOT NULL,
    "program_name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meetings" INTEGER NOT NULL,
    "total_score" INTEGER NOT NULL,
    "materials" INTEGER NOT NULL,
    "attendance_rate" INTEGER NOT NULL,
    "assignment_completion" INTEGER NOT NULL,
    "participation_score" INTEGER NOT NULL,
    "overall_grade" TEXT NOT NULL,
    "learning_hours" INTEGER NOT NULL,
    "weekly_data" INTEGER[],
    "learning_velocity" INTEGER NOT NULL,
    "collaboration_score" INTEGER NOT NULL,
    "problem_solving_efficiency" INTEGER NOT NULL,
    "competencies" JSONB NOT NULL,
    "technologies" TEXT[],
    "qr_code_url" TEXT,
    "prodi_id" TEXT NOT NULL,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laboratory_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "signature_verifications_letter_request_id_idx" ON "signature_verifications"("letter_request_id");

-- CreateIndex
CREATE INDEX "template_uploads_prodi_id_idx" ON "template_uploads"("prodi_id");

-- CreateIndex
CREATE INDEX "template_uploads_uploaded_by_idx" ON "template_uploads"("uploaded_by");

-- CreateIndex
CREATE INDEX "template_uploads_is_active_idx" ON "template_uploads"("is_active");

-- CreateIndex
CREATE INDEX "template_uploads_category_idx" ON "template_uploads"("category");

-- CreateIndex
CREATE UNIQUE INDEX "laboratory_certificates_verification_id_key" ON "laboratory_certificates"("verification_id");

-- CreateIndex
CREATE INDEX "laboratory_certificates_prodi_id_idx" ON "laboratory_certificates"("prodi_id");

-- CreateIndex
CREATE INDEX "laboratory_certificates_verification_id_idx" ON "laboratory_certificates"("verification_id");

-- CreateIndex
CREATE INDEX "laboratory_certificates_created_by_idx" ON "laboratory_certificates"("created_by");

-- CreateIndex
CREATE INDEX "laboratory_certificates_created_at_idx" ON "laboratory_certificates"("created_at");

-- AddForeignKey
ALTER TABLE "signature_verifications" ADD CONSTRAINT "signature_verifications_letter_request_id_fkey" FOREIGN KEY ("letter_request_id") REFERENCES "letter_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template_uploads" ADD CONSTRAINT "template_uploads_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template_uploads" ADD CONSTRAINT "template_uploads_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_certificates" ADD CONSTRAINT "laboratory_certificates_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE CASCADE ON UPDATE CASCADE;
