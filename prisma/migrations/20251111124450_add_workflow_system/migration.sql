-- AlterTable
ALTER TABLE "letter_requests" ADD COLUMN     "assigned_to" TEXT,
ADD COLUMN     "forwarded_at" TIMESTAMP(3),
ADD COLUMN     "forwarded_by" TEXT,
ADD COLUMN     "wd1_approved_at" TIMESTAMP(3),
ADD COLUMN     "wd1_approved_by" TEXT,
ADD COLUMN     "wd1_notes" TEXT,
ADD COLUMN     "workflow_stage" TEXT NOT NULL DEFAULT 'initial_review';

-- CreateTable
CREATE TABLE "workflow_history" (
    "id" TEXT NOT NULL,
    "letter_request_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "actor_role" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workflow_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_assignments" (
    "id" TEXT NOT NULL,
    "letter_type_id" TEXT NOT NULL,
    "initial_role" TEXT NOT NULL,
    "approval_role" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_assignments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workflow_history" ADD CONSTRAINT "workflow_history_letter_request_id_fkey" FOREIGN KEY ("letter_request_id") REFERENCES "letter_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
