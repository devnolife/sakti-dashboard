-- AlterTable
ALTER TABLE "laboratory_certificates" ADD COLUMN     "qr_signature_url" TEXT,
ADD COLUMN     "signature" TEXT,
ADD COLUMN     "signature_data" JSONB,
ADD COLUMN     "signed_at" TIMESTAMP(3),
ADD COLUMN     "signed_by" TEXT,
ADD COLUMN     "verification_count" INTEGER NOT NULL DEFAULT 0;
