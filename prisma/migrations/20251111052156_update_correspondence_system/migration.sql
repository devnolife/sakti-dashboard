-- AlterTable
ALTER TABLE "letter_types" ADD COLUMN     "jenis_surat_id" INTEGER,
ADD COLUMN     "scope" TEXT NOT NULL DEFAULT 'fakultas';

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "prodi" VARCHAR(100),
    "template_path" VARCHAR(255),
    "description" TEXT,
    "version" VARCHAR(10) DEFAULT '1.0',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "max_filesize_mb" INTEGER DEFAULT 10,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_fields" (
    "id" SERIAL NOT NULL,
    "document_id" INTEGER,
    "field_name" VARCHAR(255) NOT NULL,
    "field_type" VARCHAR(50) NOT NULL,
    "is_required" BOOLEAN DEFAULT true,
    "default_value" TEXT,
    "validation_rules" TEXT,
    "help_text" VARCHAR(500),
    "display_order" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "document_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_templates" (
    "id" SERIAL NOT NULL,
    "document_id" INTEGER NOT NULL,
    "template_name" VARCHAR(255) NOT NULL,
    "file_path" VARCHAR(500) NOT NULL,
    "file_type" VARCHAR(10) NOT NULL DEFAULT 'docx',
    "file_size" INTEGER,
    "checksum" VARCHAR(64),
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "document_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "color_hex" VARCHAR(7) DEFAULT '#3B82F6',
    "icon" VARCHAR(50),
    "sort_order" INTEGER DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "document_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nbm" VARCHAR(50),
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "role" VARCHAR(100) NOT NULL,
    "department" VARCHAR(100),
    "prodi" VARCHAR(100),
    "public_key" TEXT NOT NULL,
    "private_key" TEXT NOT NULL,
    "key_id" VARCHAR(32) NOT NULL,
    "signature_image_path" VARCHAR(500),
    "position_title" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_signed_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "signers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signed_documents" (
    "id" TEXT NOT NULL,
    "document_type" VARCHAR(50) NOT NULL,
    "prodi" VARCHAR(100) NOT NULL,
    "document_content" TEXT NOT NULL,
    "document_hash" VARCHAR(64) NOT NULL,
    "no_surat" VARCHAR(100),
    "file_path" VARCHAR(500),
    "file_size" INTEGER,
    "qr_code_data" TEXT NOT NULL,
    "qr_code_image" VARCHAR(500),
    "total_signatures_required" INTEGER NOT NULL DEFAULT 3,
    "total_signatures_received" INTEGER NOT NULL DEFAULT 0,
    "is_complete" BOOLEAN NOT NULL DEFAULT false,
    "created_by" VARCHAR(255),
    "approved_by" VARCHAR(255),
    "priority_level" VARCHAR(20) DEFAULT 'normal',
    "expiry_date" TIMESTAMP(6),
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "status_notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(6),
    "last_updated_at" TIMESTAMP(6) NOT NULL,
    "document_id" INTEGER,

    CONSTRAINT "signed_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_signatures" (
    "id" SERIAL NOT NULL,
    "signed_doc_id" TEXT NOT NULL,
    "signer_id" INTEGER NOT NULL,
    "signature_data" TEXT NOT NULL,
    "signature_hash" VARCHAR(64) NOT NULL,
    "signer_info" TEXT NOT NULL,
    "algorithm" VARCHAR(50) NOT NULL DEFAULT 'EdDSA',
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "document_signatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_logs" (
    "id" SERIAL NOT NULL,
    "signed_doc_id" TEXT NOT NULL,
    "verifier_ip" VARCHAR(45),
    "verifier_agent" TEXT,
    "verification_method" VARCHAR(50) NOT NULL,
    "verification_result" BOOLEAN NOT NULL,
    "verification_details" TEXT,
    "verified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_signature_config" (
    "id" SERIAL NOT NULL,
    "document_type" VARCHAR(50) NOT NULL,
    "required_signature_count" INTEGER NOT NULL DEFAULT 1,
    "required_roles" TEXT[],
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "document_signature_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_config" (
    "id" SERIAL NOT NULL,
    "config_key" VARCHAR(100) NOT NULL,
    "config_value" TEXT NOT NULL,
    "description" TEXT,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_history" (
    "id" SERIAL NOT NULL,
    "signed_doc_id" TEXT NOT NULL,
    "action" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "performed_by" VARCHAR(255),
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "metadata" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_notifications" (
    "id" SERIAL NOT NULL,
    "recipient" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL DEFAULT 'info',
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(6),
    "related_doc_id" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surat" (
    "id" SERIAL NOT NULL,
    "nomor_surat" TEXT NOT NULL,
    "id_jenis_surat" INTEGER,
    "id_instansi" INTEGER,
    "id_kode_kategori" INTEGER,
    "id_masalah_surat" INTEGER,
    "bulan" TEXT NOT NULL,
    "tahun_hijriah" TEXT NOT NULL,
    "tahun_masehi" TEXT NOT NULL,
    "perihal" TEXT NOT NULL,
    "keterangan" TEXT,
    "id_prodi" TEXT,
    "kode_prodi" TEXT,
    "letter_request_id" TEXT,
    "signed_document_id" TEXT,
    "scope" TEXT NOT NULL DEFAULT 'fakultas',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "count_surat" (
    "id" SERIAL NOT NULL,
    "jenis" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "tahun" TEXT,
    "prodi_id" TEXT,
    "scope" TEXT NOT NULL DEFAULT 'fakultas',

    CONSTRAINT "count_surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masalah_surat" (
    "id" SERIAL NOT NULL,
    "masalah" TEXT NOT NULL,
    "kode" TEXT NOT NULL,

    CONSTRAINT "masalah_surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tujuan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "id_jenis" SMALLINT NOT NULL,

    CONSTRAINT "tujuan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jenis_surat" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kode" TEXT NOT NULL,

    CONSTRAINT "jenis_surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ketentuan_surat" (
    "id" SERIAL NOT NULL,
    "id_tujuan" INTEGER NOT NULL,
    "id_masalah" INTEGER NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "id_jenis" INTEGER NOT NULL,
    "id_count" INTEGER,
    "format_template" TEXT,
    "description" TEXT,

    CONSTRAINT "ketentuan_surat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "documents_type_prodi_key" ON "documents"("type", "prodi");

-- CreateIndex
CREATE UNIQUE INDEX "document_templates_document_id_template_name_key" ON "document_templates"("document_id", "template_name");

-- CreateIndex
CREATE UNIQUE INDEX "document_categories_name_key" ON "document_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "signers_nbm_key" ON "signers"("nbm");

-- CreateIndex
CREATE UNIQUE INDEX "signers_key_id_key" ON "signers"("key_id");

-- CreateIndex
CREATE UNIQUE INDEX "signers_email_key" ON "signers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "document_signatures_signed_doc_id_signer_id_key" ON "document_signatures"("signed_doc_id", "signer_id");

-- CreateIndex
CREATE UNIQUE INDEX "document_signature_config_document_type_key" ON "document_signature_config"("document_type");

-- CreateIndex
CREATE UNIQUE INDEX "system_config_config_key_key" ON "system_config"("config_key");

-- CreateIndex
CREATE UNIQUE INDEX "surat_nomor_surat_key" ON "surat"("nomor_surat");

-- CreateIndex
CREATE UNIQUE INDEX "count_surat_jenis_tahun_prodi_id_scope_key" ON "count_surat"("jenis", "tahun", "prodi_id", "scope");

-- CreateIndex
CREATE UNIQUE INDEX "masalah_surat_kode_key" ON "masalah_surat"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "jenis_surat_kode_key" ON "jenis_surat"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "ketentuan_surat_nama_key" ON "ketentuan_surat"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "ketentuan_surat_id_tujuan_id_masalah_id_jenis_key" ON "ketentuan_surat"("id_tujuan", "id_masalah", "id_jenis");

-- AddForeignKey
ALTER TABLE "letter_types" ADD CONSTRAINT "letter_types_jenis_surat_id_fkey" FOREIGN KEY ("jenis_surat_id") REFERENCES "jenis_surat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_fields" ADD CONSTRAINT "document_fields_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "document_templates" ADD CONSTRAINT "document_templates_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signed_documents" ADD CONSTRAINT "signed_documents_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_signatures" ADD CONSTRAINT "document_signatures_signed_doc_id_fkey" FOREIGN KEY ("signed_doc_id") REFERENCES "signed_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_signatures" ADD CONSTRAINT "document_signatures_signer_id_fkey" FOREIGN KEY ("signer_id") REFERENCES "signers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_logs" ADD CONSTRAINT "verification_logs_signed_doc_id_fkey" FOREIGN KEY ("signed_doc_id") REFERENCES "signed_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_history" ADD CONSTRAINT "document_history_signed_doc_id_fkey" FOREIGN KEY ("signed_doc_id") REFERENCES "signed_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_id_instansi_fkey" FOREIGN KEY ("id_instansi") REFERENCES "tujuan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_id_jenis_surat_fkey" FOREIGN KEY ("id_jenis_surat") REFERENCES "count_surat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_id_kode_kategori_fkey" FOREIGN KEY ("id_kode_kategori") REFERENCES "jenis_surat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_id_masalah_surat_fkey" FOREIGN KEY ("id_masalah_surat") REFERENCES "masalah_surat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_id_prodi_fkey" FOREIGN KEY ("id_prodi") REFERENCES "prodi"("kode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tujuan" ADD CONSTRAINT "tujuan_id_jenis_fkey" FOREIGN KEY ("id_jenis") REFERENCES "jenis_surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ketentuan_surat" ADD CONSTRAINT "ketentuan_surat_id_count_fkey" FOREIGN KEY ("id_count") REFERENCES "count_surat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ketentuan_surat" ADD CONSTRAINT "ketentuan_surat_id_jenis_fkey" FOREIGN KEY ("id_jenis") REFERENCES "jenis_surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ketentuan_surat" ADD CONSTRAINT "ketentuan_surat_id_masalah_fkey" FOREIGN KEY ("id_masalah") REFERENCES "masalah_surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ketentuan_surat" ADD CONSTRAINT "ketentuan_surat_id_tujuan_fkey" FOREIGN KEY ("id_tujuan") REFERENCES "tujuan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
