/*
  Warnings:

  - Added the required column `updated_at` to the `letter_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "letter_types" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "correspondence_requests" (
    "id" TEXT NOT NULL,
    "letter_type_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "form_data" JSONB NOT NULL,
    "attachments" JSONB,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'pending',
    "rejection_note" TEXT,
    "approved_by" TEXT,
    "approved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "correspondence_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "correspondence_requests" ADD CONSTRAINT "correspondence_requests_letter_type_id_fkey" FOREIGN KEY ("letter_type_id") REFERENCES "letter_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correspondence_requests" ADD CONSTRAINT "correspondence_requests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correspondence_requests" ADD CONSTRAINT "correspondence_requests_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
