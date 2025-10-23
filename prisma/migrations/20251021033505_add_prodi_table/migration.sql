/*
  Warnings:

  - The primary key for the `prodi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kode_prodi` on the `prodi` table. All the data in the column will be lost.
  - Added the required column `fakultas` to the `prodi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenjang` to the `prodi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode` to the `prodi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prodi" DROP CONSTRAINT "prodi_pkey",
DROP COLUMN "kode_prodi",
ADD COLUMN     "akreditasi" TEXT,
ADD COLUMN     "fakultas" TEXT NOT NULL,
ADD COLUMN     "jenjang" TEXT NOT NULL,
ADD COLUMN     "kode" TEXT NOT NULL,
ADD CONSTRAINT "prodi_pkey" PRIMARY KEY ("kode");
