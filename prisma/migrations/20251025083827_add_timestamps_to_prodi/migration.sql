-- CreateEnum
CREATE TYPE "AnnouncementPriority" AS ENUM ('low', 'normal', 'high', 'urgent');

-- AlterTable
ALTER TABLE "academic_events" ADD COLUMN     "is_global" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prodi_id" TEXT;

-- AlterTable
ALTER TABLE "budget_allocations" ADD COLUMN     "prodi_id" TEXT,
ALTER COLUMN "department" DROP NOT NULL;

-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "prodi_id" TEXT;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "prodi_id" TEXT,
ALTER COLUMN "department" DROP NOT NULL;

-- AlterTable
ALTER TABLE "exam_requirements" ADD COLUMN     "is_global" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prodi_id" TEXT;

-- AlterTable
ALTER TABLE "laboratories" ADD COLUMN     "prodi_id" TEXT;

-- AlterTable
ALTER TABLE "lecturers" ADD COLUMN     "is_homebase" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "prodi_id" TEXT,
ALTER COLUMN "department" DROP NOT NULL;

-- AlterTable
ALTER TABLE "letter_types" ADD COLUMN     "is_global" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prodi_id" TEXT;

-- AlterTable
ALTER TABLE "prodi" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "staff" ADD COLUMN     "prodi_id" TEXT,
ALTER COLUMN "department" DROP NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "angkatan" INTEGER,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "jenis_kelamin" TEXT,
ADD COLUMN     "lulus" BOOLEAN,
ADD COLUMN     "masa_studi" TEXT,
ADD COLUMN     "nik" TEXT,
ADD COLUMN     "no_seri_ijazah" TEXT,
ADD COLUMN     "prodi_id" TEXT,
ADD COLUMN     "semester_awal" TEXT,
ADD COLUMN     "tahun_akademik_lulus" TEXT,
ADD COLUMN     "tanggal_lahir" TIMESTAMP(3),
ADD COLUMN     "tanggal_lulus" TIMESTAMP(3),
ADD COLUMN     "tempat_lahir" TEXT,
ALTER COLUMN "major" DROP NOT NULL,
ALTER COLUMN "department" DROP NOT NULL;

-- AlterTable
ALTER TABLE "thesis_titles" ADD COLUMN     "prodi_id" TEXT,
ALTER COLUMN "department" DROP NOT NULL;

-- CreateTable
CREATE TABLE "laboratory_admins" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "laboratory_id" TEXT NOT NULL,
    "prodi_id" TEXT,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "laboratory_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum" (
    "id" TEXT NOT NULL,
    "prodi_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_courses" (
    "id" TEXT NOT NULL,
    "curriculum_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "is_mandatory" BOOLEAN NOT NULL DEFAULT true,
    "semester" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curriculum_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "prodi_id" TEXT,
    "is_global" BOOLEAN NOT NULL DEFAULT false,
    "priority" "AnnouncementPriority" NOT NULL DEFAULT 'normal',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "floor" INTEGER,
    "capacity" INTEGER NOT NULL,
    "prodi_id" TEXT,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "facilities" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_room_admins" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "prodi_id" TEXT,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reading_room_admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "laboratory_admins_user_id_idx" ON "laboratory_admins"("user_id");

-- CreateIndex
CREATE INDEX "laboratory_admins_laboratory_id_idx" ON "laboratory_admins"("laboratory_id");

-- CreateIndex
CREATE INDEX "laboratory_admins_prodi_id_idx" ON "laboratory_admins"("prodi_id");

-- CreateIndex
CREATE UNIQUE INDEX "laboratory_admins_user_id_laboratory_id_key" ON "laboratory_admins"("user_id", "laboratory_id");

-- CreateIndex
CREATE INDEX "curriculum_prodi_id_idx" ON "curriculum"("prodi_id");

-- CreateIndex
CREATE INDEX "curriculum_courses_curriculum_id_idx" ON "curriculum_courses"("curriculum_id");

-- CreateIndex
CREATE INDEX "curriculum_courses_course_id_idx" ON "curriculum_courses"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_courses_curriculum_id_course_id_key" ON "curriculum_courses"("curriculum_id", "course_id");

-- CreateIndex
CREATE INDEX "announcements_prodi_id_idx" ON "announcements"("prodi_id");

-- CreateIndex
CREATE INDEX "announcements_published_idx" ON "announcements"("published");

-- CreateIndex
CREATE INDEX "announcements_created_at_idx" ON "announcements"("created_at");

-- CreateIndex
CREATE INDEX "classrooms_prodi_id_idx" ON "classrooms"("prodi_id");

-- CreateIndex
CREATE INDEX "classrooms_is_available_idx" ON "classrooms"("is_available");

-- CreateIndex
CREATE INDEX "reading_room_admins_user_id_idx" ON "reading_room_admins"("user_id");

-- CreateIndex
CREATE INDEX "reading_room_admins_prodi_id_idx" ON "reading_room_admins"("prodi_id");

-- CreateIndex
CREATE UNIQUE INDEX "reading_room_admins_user_id_prodi_id_key" ON "reading_room_admins"("user_id", "prodi_id");

-- AddForeignKey
ALTER TABLE "academic_events" ADD CONSTRAINT "academic_events_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_allocations" ADD CONSTRAINT "budget_allocations_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_requirements" ADD CONSTRAINT "exam_requirements_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratories" ADD CONSTRAINT "laboratories_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "letter_types" ADD CONSTRAINT "letter_types_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thesis_titles" ADD CONSTRAINT "thesis_titles_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_admins" ADD CONSTRAINT "laboratory_admins_laboratory_id_fkey" FOREIGN KEY ("laboratory_id") REFERENCES "laboratories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_admins" ADD CONSTRAINT "laboratory_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_admins" ADD CONSTRAINT "laboratory_admins_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculum" ADD CONSTRAINT "curriculum_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculum_courses" ADD CONSTRAINT "curriculum_courses_curriculum_id_fkey" FOREIGN KEY ("curriculum_id") REFERENCES "curriculum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculum_courses" ADD CONSTRAINT "curriculum_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_room_admins" ADD CONSTRAINT "reading_room_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_room_admins" ADD CONSTRAINT "reading_room_admins_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("kode") ON DELETE SET NULL ON UPDATE CASCADE;
