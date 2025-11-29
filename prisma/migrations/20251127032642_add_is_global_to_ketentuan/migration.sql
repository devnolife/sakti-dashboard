/*
  Warnings:

  - You are about to drop the column `jenis` on the `count_surat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tahun,prodi_id,scope]` on the table `count_surat` will be added. If there are existing duplicate values, this will fail.
  - Made the column `tahun` on table `count_surat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prodi_id` on table `count_surat` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "surat" DROP CONSTRAINT "surat_id_jenis_surat_fkey";

-- DropIndex
DROP INDEX "count_surat_jenis_tahun_prodi_id_scope_key";

-- AlterTable
ALTER TABLE "count_surat" DROP COLUMN "jenis",
ALTER COLUMN "tahun" SET NOT NULL,
ALTER COLUMN "tahun" SET DEFAULT '2025',
ALTER COLUMN "prodi_id" SET NOT NULL,
ALTER COLUMN "prodi_id" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ketentuan_surat" ADD COLUMN     "is_global" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "prodi_id" TEXT;

-- AlterTable
ALTER TABLE "signed_documents" ADD COLUMN     "counter_id" INTEGER,
ADD COLUMN     "scope" VARCHAR(20);

-- AlterTable
ALTER TABLE "surat" ADD COLUMN     "counter_id" INTEGER;

-- CreateIndex
CREATE INDEX "count_surat_scope_prodi_id_tahun_idx" ON "count_surat"("scope", "prodi_id", "tahun");

-- CreateIndex
CREATE UNIQUE INDEX "count_surat_tahun_prodi_id_scope_key" ON "count_surat"("tahun", "prodi_id", "scope");

-- AddForeignKey
ALTER TABLE "signed_documents" ADD CONSTRAINT "signed_documents_counter_id_fkey" FOREIGN KEY ("counter_id") REFERENCES "count_surat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surat" ADD CONSTRAINT "surat_counter_id_fkey" FOREIGN KEY ("counter_id") REFERENCES "count_surat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ketentuan_surat" ADD CONSTRAINT "ketentuan_surat_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;
