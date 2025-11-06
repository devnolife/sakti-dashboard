-- CreateTable
CREATE TABLE "rekomendasi_judul" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "bidang_keilmuan" TEXT NOT NULL,
    "metodologi" TEXT NOT NULL,
    "tingkat_kesulitan" TEXT NOT NULL,
    "estimasi_waktu" TEXT NOT NULL,
    "prerequisites" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'Tersedia',
    "dosen_id" TEXT NOT NULL,
    "prodi_kode" TEXT NOT NULL,
    "student_id" TEXT,
    "diambil_oleh" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rekomendasi_judul_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rekomendasi_judul_dosen_id_idx" ON "rekomendasi_judul"("dosen_id");

-- CreateIndex
CREATE INDEX "rekomendasi_judul_prodi_kode_idx" ON "rekomendasi_judul"("prodi_kode");

-- CreateIndex
CREATE INDEX "rekomendasi_judul_status_idx" ON "rekomendasi_judul"("status");

-- CreateIndex
CREATE INDEX "rekomendasi_judul_student_id_idx" ON "rekomendasi_judul"("student_id");

-- AddForeignKey
ALTER TABLE "rekomendasi_judul" ADD CONSTRAINT "rekomendasi_judul_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "lecturers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rekomendasi_judul" ADD CONSTRAINT "rekomendasi_judul_prodi_kode_fkey" FOREIGN KEY ("prodi_kode") REFERENCES "prodi"("kode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rekomendasi_judul" ADD CONSTRAINT "rekomendasi_judul_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;
