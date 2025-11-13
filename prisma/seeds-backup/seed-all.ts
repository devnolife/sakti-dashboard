import { PrismaClient } from '../lib/generated/prisma';
import { hash } from 'bcryptjs';
import { seedMasterData } from './seeds/master-data-seed';
import { seedUsers } from './seeds/users';

const prisma = new PrismaClient();

// Helper function to safely create or skip if exists
async function safeCreate<T>(
  operation: () => Promise<T>,
  identifier: string
): Promise<T | null> {
  try {
    return await operation();
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log(`⏭️  Skipping ${identifier} - already exists`);
      return null;
    }
    throw error;
  }
}

async function main() {
  console.log('🌱 Starting seed...');

  // Seed master data first (prodi, etc)
  await seedMasterData();

  // Seed all users with their roles and sub-roles
  await seedUsers(prisma);

  // Skip the manual user seeding below as we now use seedUsers()
  console.log('\n✅ All seeding completed successfully!');
  return;

  // Optional: Clear existing data to avoid conflicts
  // Uncomment if you want to reset data on each seed
  /*
  console.log('🧹 Clearing existing seed data...');
  await prisma.course_schedules.deleteMany({});
  await prisma.grades.deleteMany({});
  await prisma.academic_consultations.deleteMany({});
  await prisma.kkp_documents.deleteMany({});
  await prisma.kkp_approvals.deleteMany({});
  await prisma.kkp_applications.deleteMany({});
  await prisma.kkp_requirements.deleteMany({});
  await prisma.kkp_locations.deleteMany({});
  await prisma.companies.deleteMany({});
  await prisma.lab_assignment_submissions.deleteMany({});
  await prisma.lab_assignments.deleteMany({});
  await prisma.lab_materials.deleteMany({});
  await prisma.lab_sessions.deleteMany({});
  await prisma.lab_registrations.deleteMany({});
  await prisma.lab_announcements.deleteMany({});
  await prisma.laboratories.deleteMany({});
  await prisma.book_borrowings.deleteMany({});
  await prisma.books.deleteMany({});
  await prisma.book_categories.deleteMany({});
  await prisma.budget_allocations.deleteMany({});
  await prisma.expenses.deleteMany({});
  await prisma.budgets.deleteMany({});
  await prisma.payment_items.deleteMany({});
  await prisma.payments.deleteMany({});
  await prisma.exam_documents.deleteMany({});
  await prisma.exam_committees.deleteMany({});
  await prisma.exam_student_requirements.deleteMany({});
  await prisma.exam_applications.deleteMany({});
  await prisma.exam_requirements.deleteMany({});
  await prisma.thesis_archives.deleteMany({});
  await prisma.thesis_reviews.deleteMany({});
  await prisma.thesis_similarities.deleteMany({});
  await prisma.thesis_titles.deleteMany({});
  await prisma.letter_attachments.deleteMany({});
  await prisma.letter_requests.deleteMany({});
  await prisma.letter_types.deleteMany({});
  await prisma.academic_events.deleteMany({});
  await prisma.notifications.deleteMany({});
  await prisma.system_configs.deleteMany({});
  await prisma.audit_logs.deleteMany({});
  await prisma.file_uploads.deleteMany({});
  console.log('✅ Cleared existing data');
  */

  // 1. Users & Related Entities
  console.log('👤 Seeding users...');

  // Admin user
  const adminUser = await prisma.users.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      id: 'admin-001',
      username: 'admin',
      password: await hash('admin123', 10),
      name: 'Administrator',
      role: 'admin',
      is_active: true,
      updated_at: new Date(),
    },
  });

  // Dekan
  const dekanUser = await prisma.users.upsert({
    where: { username: 'dekan001' },
    update: {},
    create: {
      id: 'dekan-001',
      username: 'dekan001',
      password: await hash('dekan123', 10),
      name: 'Prof. Dr. Ahmad Ridwan, M.Ag',
      role: 'dekan',
      is_active: true,
      updated_at: new Date(),
    },
  });

  // Staff TU
  const staffTUUser = await prisma.users.upsert({
    where: { username: 'stafftu001' },
    update: {},
    create: {
      id: 'stafftu-001',
      username: 'stafftu001',
      password: await hash('stafftu123', 10),
      name: 'Siti Aminah, S.Kom',
      role: 'staff_tu',
      is_active: true,
      updated_at: new Date(),
    },
  });

  await prisma.staff.upsert({
    where: { user_id: 'stafftu-001' },
    update: {},
    create: {
      id: 'staff-001',
      user_id: 'stafftu-001',
      nip: '198505152010012001',
      department: 'Tata Usaha',
      position: 'Staff Administrasi',
      phone: '081234567890',
      office: 'Gedung A Lantai 1',
    },
  });

  // Kepala Tata Usaha
  const katuUser = await prisma.users.upsert({
    where: { username: 'katu001' },
    update: {},
    create: {
      id: 'katu-001',
      username: 'katu001',
      password: await hash('katu123', 10),
      name: 'Drs. Muhammad Yusuf, M.M',
      role: 'kepala_tata_usaha',
      is_active: true,
      updated_at: new Date(),
    },
  });

  await prisma.staff.upsert({
    where: { user_id: 'katu-001' },
    update: {},
    create: {
      id: 'staff-002',
      user_id: 'katu-001',
      nip: '197612201998031002',
      department: 'Tata Usaha',
      position: 'Kepala Tata Usaha',
      phone: '081234567891',
      office: 'Gedung A Lantai 2',
    },
  });

  // Admin Keuangan
  const adminKeuanganUser = await prisma.users.upsert({
    where: { username: 'adminkeuangan001' },
    update: {},
    create: {
      id: 'adminkeuangan-001',
      username: 'adminkeuangan001',
      password: await hash('keuangan123', 10),
      name: 'Fatimah Zahra, S.E',
      role: 'admin_keuangan',
      is_active: true,
      updated_at: new Date(),
    },
  });

  await prisma.staff.upsert({
    where: { user_id: 'adminkeuangan-001' },
    update: {},
    create: {
      id: 'staff-003',
      user_id: 'adminkeuangan-001',
      nip: '199001102015032001',
      department: 'Keuangan',
      position: 'Admin Keuangan',
      phone: '081234567892',
      office: 'Gedung A Lantai 1',
    },
  });

  // Prodi
  const prodiUser = await prisma.users.upsert({
    where: { username: 'prodi001' },
    update: {},
    create: {
      id: 'prodi-001',
      username: 'prodi001',
      password: await hash('prodi123', 10),
      name: 'Dr. Nur Hidayat, M.T',
      role: 'prodi',
      is_active: true,
      updated_at: new Date(),
    },
  });

  // Dosen/Lecturers
  const dosen1User = await prisma.users.upsert({
    where: { username: 'dosen001' },
    update: {},
    create: {
      id: 'dosen-001',
      username: 'dosen001',
      password: await hash('dosen123', 10),
      name: 'Dr. Budi Santoso, M.Kom',
      role: 'dosen',
      is_active: true,
      updated_at: new Date(),
    },
  });

  const lecturer1 = await prisma.lecturers.upsert({
    where: { user_id: 'dosen-001' },
    update: {},
    create: {
      id: 'lecturer-001',
      user_id: 'dosen-001',
      nip: '198201012008011001',
      department: 'Teknik Informatika',
      position: 'Lektor',
      specialization: 'Artificial Intelligence',
      phone: '081234567893',
      office: 'Gedung B Lantai 3',
      email: 'budi.santoso@university.ac.id',
    },
  });

  const dosen2User = await prisma.users.upsert({
    where: { username: 'dosen002' },
    update: {},
    create: {
      id: 'dosen-002',
      username: 'dosen002',
      password: await hash('dosen123', 10),
      name: 'Dr. Rina Wijaya, M.Kom',
      role: 'dosen',
      is_active: true,
      updated_at: new Date(),
    },
  });

  const lecturer2 = await prisma.lecturers.upsert({
    where: { user_id: 'dosen-002' },
    update: {},
    create: {
      id: 'lecturer-002',
      user_id: 'dosen-002',
      nip: '198505152010012002',
      department: 'Teknik Informatika',
      position: 'Lektor Kepala',
      specialization: 'Data Science',
      phone: '081234567894',
      office: 'Gedung B Lantai 3',
      email: 'rina.wijaya@university.ac.id',
    },
  });

  const dosen3User = await prisma.users.upsert({
    where: { username: 'dosen003' },
    update: {},
    create: {
      id: 'dosen-003',
      username: 'dosen003',
      password: await hash('dosen123', 10),
      name: 'Ahmad Fauzi, M.T',
      role: 'dosen',
      is_active: true,
      updated_at: new Date(),
    },
  });

  const lecturer3 = await prisma.lecturers.upsert({
    where: { user_id: 'dosen-003' },
    update: {},
    create: {
      id: 'lecturer-003',
      user_id: 'dosen-003',
      nip: '199001012015011001',
      department: 'Teknik Informatika',
      position: 'Asisten Ahli',
      specialization: 'Software Engineering',
      phone: '081234567895',
      office: 'Gedung B Lantai 2',
      email: 'ahmad.fauzi@university.ac.id',
    },
  });

  // Students
  const student1User = await prisma.users.upsert({
    where: { username: '20210001' },
    update: {},
    create: {
      id: 'student-001',
      username: '20210001',
      password: await hash('mhs123', 10),
      name: 'Muhammad Rizki',
      role: 'mahasiswa',
      is_active: true,
      updated_at: new Date(),
    },
  });

  const student1 = await prisma.students.upsert({
    where: { user_id: 'student-001' },
    update: {},
    create: {
      id: 'student-001',
      user_id: 'student-001',
      nim: '20210001',
      major: 'Teknik Informatika',
      department: 'Fakultas Teknik',
      semester: 7,
      academic_year: '2024/2025',
      phone: '081234567896',
      address: 'Jl. Merdeka No. 10, Jakarta',
      enroll_date: new Date('2021-09-01'),
      status: 'active',
      gpa: 3.75,
      academic_advisor_id: 'lecturer-001',
      guardian: {
        name: 'Bapak Rizki',
        phone: '081234567800',
        relation: 'Ayah',
      },
    },
  });

  const student2User = await prisma.users.upsert({
    where: { username: '20210002' },
    update: {},
    create: {
      id: 'student-002',
      username: '20210002',
      password: await hash('mhs123', 10),
      name: 'Siti Nurhaliza',
      role: 'mahasiswa',
      is_active: true,
      updated_at: new Date(),
    },
  });

  const student2 = await prisma.students.upsert({
    where: { user_id: 'student-002' },
    update: {},
    create: {
      id: 'student-002',
      user_id: 'student-002',
      nim: '20210002',
      major: 'Teknik Informatika',
      department: 'Fakultas Teknik',
      semester: 7,
      academic_year: '2024/2025',
      phone: '081234567897',
      address: 'Jl. Sudirman No. 15, Jakarta',
      enroll_date: new Date('2021-09-01'),
      status: 'active',
      gpa: 3.85,
      academic_advisor_id: 'lecturer-002',
      guardian: {
        name: 'Ibu Haliza',
        phone: '081234567801',
        relation: 'Ibu',
      },
    },
  });

  const student3User = await prisma.users.upsert({
    where: { username: '20220001' },
    update: {},
    create: {
      id: 'student-003',
      username: '20220001',
      password: await hash('mhs123', 10),
      name: 'Andi Pratama',
      role: 'mahasiswa',
      is_active: true,
      updated_at: new Date(),
    },
  });

  const student3 = await prisma.students.upsert({
    where: { user_id: 'student-003' },
    update: {},
    create: {
      id: 'student-003',
      user_id: 'student-003',
      nim: '20220001',
      major: 'Teknik Informatika',
      department: 'Fakultas Teknik',
      semester: 5,
      academic_year: '2024/2025',
      phone: '081234567898',
      address: 'Jl. Thamrin No. 20, Jakarta',
      enroll_date: new Date('2022-09-01'),
      status: 'active',
      gpa: 3.50,
      academic_advisor_id: 'lecturer-001',
      guardian: {
        name: 'Bapak Pratama',
        phone: '081234567802',
        relation: 'Ayah',
      },
    },
  });

  // 2. Prodi
  console.log('🎓 Seeding prodi...');
  await prisma.prodi.upsert({
    where: { kode: 'IF' },
    update: {},
    create: {
      kode: 'IF',
      nama: 'Teknik Informatika',
      jenjang: 'S1',
      fakultas: 'Fakultas Teknik',
      akreditasi: 'A',
    },
  });

  await prisma.prodi.upsert({
    where: { kode: 'SI' },
    update: {},
    create: {
      kode: 'SI',
      nama: 'Sistem Informasi',
      jenjang: 'S1',
      fakultas: 'Fakultas Teknik',
      akreditasi: 'B',
    },
  });

  // 3. Courses
  console.log('📚 Seeding courses...');
  const course1 = await prisma.courses.upsert({
    where: { code: 'IF101' },
    update: {},
    create: {
      id: 'course-001',
      code: 'IF101',
      name: 'Algoritma dan Pemrograman',
      description: 'Mata kuliah dasar algoritma dan pemrograman',
      credits: 3,
      semester: 1,
      department: 'Teknik Informatika',
      lecturer_id: 'lecturer-001',
      is_active: true,
    },
  });

  const course2 = await prisma.courses.upsert({
    where: { code: 'IF201' },
    update: {},
    create: {
      id: 'course-002',
      code: 'IF201',
      name: 'Struktur Data',
      description: 'Mata kuliah struktur data dan algoritma lanjutan',
      credits: 3,
      semester: 2,
      department: 'Teknik Informatika',
      lecturer_id: 'lecturer-002',
      is_active: true,
    },
  });

  const course3 = await prisma.courses.upsert({
    where: { code: 'IF301' },
    update: {},
    create: {
      id: 'course-003',
      code: 'IF301',
      name: 'Basis Data',
      description: 'Mata kuliah sistem basis data',
      credits: 3,
      semester: 3,
      department: 'Teknik Informatika',
      lecturer_id: 'lecturer-003',
      is_active: true,
    },
  });

  // 4. Course Schedules
  console.log('📅 Seeding course schedules...');
  await prisma.course_schedules.upsert({
    where: { id: 'schedule-001' },
    update: {},
    create: {
      id: 'schedule-001',
      course_id: 'course-001',
      day: 'Senin',
      start_time: '08:00',
      end_time: '10:30',
      room: 'Lab A1',
      building: 'Gedung B',
      semester: 'Ganjil',
      academic_year: '2024/2025',
    },
  });

  await prisma.course_schedules.upsert({
    where: { id: 'schedule-002' },
    update: {},
    create: {
      id: 'schedule-002',
      course_id: 'course-002',
      day: 'Selasa',
      start_time: '13:00',
      end_time: '15:30',
      room: 'Lab A2',
      building: 'Gedung B',
      semester: 'Ganjil',
      academic_year: '2024/2025',
    },
  });

  // 5. Grades
  console.log('📊 Seeding grades...');
  await safeCreate(
    () => prisma.grades.create({
      data: {
        id: 'grade-001',
        student_id: 'student-001',
        course_id: 'course-001',
        score: 85,
        letter_grade: 'A',
        semester: 'Ganjil',
        academic_year: '2024/2025',
      },
    }),
    'grade-001'
  );

  await safeCreate(
    () => prisma.grades.create({
      data: {
        id: 'grade-002',
        student_id: 'student-001',
        course_id: 'course-002',
        score: 90,
        letter_grade: 'A',
        semester: 'Ganjil',
        academic_year: '2024/2025',
      },
    }),
    'grade-002'
  );

  // 6. Academic Consultations
  console.log('💬 Seeding academic consultations...');
  await prisma.academic_consultations.create({
    data: {
      id: 'consult-001',
      student_id: 'student-001',
      advisor_id: 'lecturer-001',
      date: new Date('2025-01-15'),
      uraian: 'Konsultasi Skripsi Bab 1',
      keterangan: 'Pembahasan latar belakang dan rumusan masalah',
      paraf: true,
      updated_at: new Date(),
    },
  });

  await prisma.academic_consultations.create({
    data: {
      id: 'consult-002',
      student_id: 'student-002',
      advisor_id: 'lecturer-002',
      date: new Date('2025-02-10'),
      uraian: 'Konsultasi KKP',
      keterangan: 'Pembahasan tempat dan topik KKP',
      paraf: false,
      updated_at: new Date(),
    },
  });

  // 7. Companies
  console.log('🏢 Seeding companies...');
  const company1 = await prisma.companies.create({
    data: {
      id: 'company-001',
      name: 'PT. Tech Indonesia',
      address: 'Jl. Gatot Subroto No. 100',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postal_code: '12870',
      contact_person: 'Bambang Sutrisno',
      contact_position: 'HR Manager',
      contact_email: 'hr@techindonesia.com',
      contact_phone: '021-5551234',
      website: 'https://techindonesia.com',
      industry: 'Information Technology',
      description: 'Perusahaan teknologi terkemuka di Indonesia',
      is_active: true,
    },
  });

  const company2 = await prisma.companies.create({
    data: {
      id: 'company-002',
      name: 'PT. Digital Nusantara',
      address: 'Jl. Sudirman No. 50',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postal_code: '12920',
      contact_person: 'Dewi Lestari',
      contact_position: 'Recruitment Manager',
      contact_email: 'recruitment@digitalnusantara.com',
      contact_phone: '021-5555678',
      website: 'https://digitalnusantara.com',
      industry: 'Digital Marketing',
      description: 'Agensi digital marketing terpercaya',
      is_active: true,
    },
  });

  // 8. KKP Locations
  console.log('📍 Seeding KKP locations...');
  const kkpLocation1 = await prisma.kkp_locations.create({
    data: {
      id: 'kkp-loc-001',
      name: 'PT. Tech Indonesia - Jakarta',
      address: 'Jl. Gatot Subroto No. 100',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      industry: 'Information Technology',
      positions: ['Software Developer', 'Data Analyst', 'UI/UX Designer'],
      quota: 5,
      remaining: 3,
      status: 'available',
      distance: 15.5,
      contact_person: 'Bambang Sutrisno',
      contact_email: 'hr@techindonesia.com',
      contact_phone: '021-5551234',
      description: 'Kesempatan magang di perusahaan IT terkemuka',
      is_active: true,
      company_id: 'company-001',
      created_by_id: 'student-001',
      updated_at: new Date(),
    },
  });

  // 9. KKP Applications
  console.log('📝 Seeding KKP applications...');
  const kkpApp1 = await prisma.kkp_applications.create({
    data: {
      id: 'kkp-app-001',
      application_number: 'KKP/2025/001',
      title: 'Pengembangan Sistem Informasi Manajemen',
      description: 'KKP di PT. Tech Indonesia untuk mengembangkan sistem informasi',
      submission_date: new Date('2025-01-10'),
      start_date: new Date('2025-03-01'),
      end_date: new Date('2025-06-30'),
      status: 'approved',
      student_id: 'student-001',
      supervisor_id: 'lecturer-001',
      company_id: 'company-001',
      group_members: ['20210001'],
      updated_at: new Date(),
    },
  });

  // 10. KKP Approvals
  console.log('✅ Seeding KKP approvals...');
  await prisma.kkp_approvals.create({
    data: {
      id: 'kkp-approval-001',
      application_id: 'kkp-app-001',
      approver_role: 'prodi',
      approver_id: 'prodi-001',
      status: 'approved',
      comments: 'Disetujui untuk melaksanakan KKP',
      approved_at: new Date('2025-01-15'),
    },
  });

  // 11. KKP Documents
  console.log('📄 Seeding KKP documents...');
  await prisma.kkp_documents.create({
    data: {
      id: 'kkp-doc-001',
      name: 'Surat Permohonan KKP',
      type: 'application_letter',
      url: '/uploads/kkp/application-001.pdf',
      upload_date: new Date('2025-01-10'),
      status: 'verified',
      file_size: 524288,
      mime_type: 'application/pdf',
      application_id: 'kkp-app-001',
    },
  });

  // 12. KKP Requirements
  console.log('📋 Seeding KKP requirements...');
  await prisma.kkp_requirements.create({
    data: {
      id: 'kkp-req-001',
      student_id: 'student-001',
      requirement_type: 'transcript_125_sks',
      file_name: 'transkrip-20210001.pdf',
      original_file_name: 'Transkrip Nilai.pdf',
      file_path: '/uploads/kkp/requirements/transkrip-20210001.pdf',
      file_size: 1048576,
      mime_type: 'application/pdf',
      status: 'verified',
      verified_at: new Date('2025-01-12'),
      verified_by: 'stafftu-001',
      updated_at: new Date(),
    },
  });

  // 13. Laboratories
  console.log('🔬 Seeding laboratories...');
  const lab1 = await prisma.laboratories.create({
    data: {
      id: 'lab-001',
      code: 'LAB-AI',
      name: 'Laboratorium Artificial Intelligence',
      description: 'Lab untuk praktikum AI dan Machine Learning',
      capacity: 30,
      credits: 1,
      semester: 'Ganjil',
      department: 'Teknik Informatika',
      location: 'Gedung B Lantai 4',
      category: 'Programming',
      status: 'active',
      instructor_id: 'lecturer-001',
      updated_at: new Date(),
    },
  });

  const lab2 = await prisma.laboratories.create({
    data: {
      id: 'lab-002',
      code: 'LAB-DB',
      name: 'Laboratorium Database',
      description: 'Lab untuk praktikum basis data',
      capacity: 25,
      credits: 1,
      semester: 'Ganjil',
      department: 'Teknik Informatika',
      location: 'Gedung B Lantai 3',
      category: 'Database',
      status: 'active',
      instructor_id: 'lecturer-003',
      updated_at: new Date(),
    },
  });

  // 14. Lab Registrations
  console.log('📝 Seeding lab registrations...');
  await prisma.lab_registrations.create({
    data: {
      id: 'lab-reg-001',
      student_id: 'student-001',
      laboratory_id: 'lab-001',
      status: 'approved',
      registered_at: new Date('2024-09-01'),
      progress: 60,
      updated_at: new Date(),
    },
  });

  // 15. Lab Sessions
  console.log('🗓️ Seeding lab sessions...');
  await prisma.lab_sessions.create({
    data: {
      id: 'lab-session-001',
      laboratory_id: 'lab-001',
      title: 'Pengenalan Machine Learning',
      description: 'Sesi pertama: Dasar-dasar ML',
      session_date: new Date('2025-02-15'),
      start_time: '09:00',
      end_time: '12:00',
      location: 'Gedung B Lantai 4',
      status: 'scheduled',
      updated_at: new Date(),
    },
  });

  // 16. Lab Materials
  console.log('📚 Seeding lab materials...');
  await prisma.lab_materials.create({
    data: {
      id: 'lab-mat-001',
      laboratory_id: 'lab-001',
      title: 'Modul Machine Learning Dasar',
      description: 'Modul pengenalan ML',
      type: 'PDF',
      file_url: '/materials/ml-intro.pdf',
      updated_at: new Date(),
    },
  });

  // 17. Lab Assignments
  console.log('📝 Seeding lab assignments...');
  await prisma.lab_assignments.create({
    data: {
      id: 'lab-assign-001',
      laboratory_id: 'lab-001',
      title: 'Tugas 1: Linear Regression',
      description: 'Implementasi algoritma regresi linear',
      due_date: new Date('2025-03-01'),
      max_score: 100,
      updated_at: new Date(),
    },
  });

  // 18. Lab Assignment Submissions
  console.log('📤 Seeding lab assignment submissions...');
  await prisma.lab_assignment_submissions.create({
    data: {
      id: 'lab-submit-001',
      student_id: 'student-001',
      assignment_id: 'lab-assign-001',
      registration_id: 'lab-reg-001',
      submitted_at: new Date('2025-02-28'),
      score: 85,
      feedback: 'Bagus, teruskan!',
      file_url: '/submissions/student-001-assign-001.zip',
      updated_at: new Date(),
    },
  });

  // 19. Lab Announcements
  console.log('📢 Seeding lab announcements...');
  await prisma.lab_announcements.create({
    data: {
      id: 'lab-announce-001',
      laboratory_id: 'lab-001',
      title: 'Perubahan Jadwal Praktikum',
      content: 'Jadwal praktikum minggu depan dimajukan menjadi hari Rabu',
      is_important: true,
      updated_at: new Date(),
    },
  });

  // 20. Book Categories
  console.log('📚 Seeding book categories...');
  const bookCat1 = await prisma.book_categories.create({
    data: {
      id: 'bookcat-001',
      code: 'IT',
      name: 'Information Technology',
      description: 'Buku-buku tentang teknologi informasi',
      is_active: true,
    },
  });

  const bookCat2 = await prisma.book_categories.create({
    data: {
      id: 'bookcat-002',
      code: 'PROG',
      name: 'Programming',
      description: 'Buku-buku pemrograman',
      is_active: true,
    },
  });

  // 21. Books
  console.log('📖 Seeding books...');
  const book1 = await prisma.books.create({
    data: {
      id: 'book-001',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      publisher: 'MIT Press',
      publication_year: 2022,
      isbn: '978-0262046305',
      category_id: 'bookcat-002',
      description: 'Comprehensive guide to algorithms',
      page_count: 1312,
      location: 'Rak A1',
      status: 'available',
      borrow_count: 5,
    },
  });

  const book2 = await prisma.books.create({
    data: {
      id: 'book-002',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      publisher: 'Prentice Hall',
      publication_year: 2008,
      isbn: '978-0132350884',
      category_id: 'bookcat-002',
      description: 'A Handbook of Agile Software Craftsmanship',
      page_count: 464,
      location: 'Rak A2',
      status: 'borrowed',
      borrow_count: 10,
      last_borrowed_date: new Date('2025-02-01'),
    },
  });

  // 22. Book Borrowings
  console.log('📚 Seeding book borrowings...');
  await prisma.book_borrowings.create({
    data: {
      id: 'borrow-001',
      student_id: 'student-002',
      book_id: 'book-002',
      borrow_date: new Date('2025-02-01'),
      due_date: new Date('2025-02-15'),
      status: 'active',
      notes: 'Dipinjam untuk referensi tugas akhir',
    },
  });

  // 23. Budgets
  console.log('💰 Seeding budgets...');
  const budget1 = await prisma.budgets.create({
    data: {
      id: 'budget-001',
      name: 'Anggaran Laboratorium 2025',
      description: 'Budget untuk operasional lab tahun 2025',
      total_amount: 100000000,
      used_amount: 25000000,
      category: 'Laboratory',
      department: 'Teknik Informatika',
      fiscal_year: '2025',
      status: 'active',
      updated_at: new Date(),
    },
  });

  // 24. Budget Allocations
  console.log('💵 Seeding budget allocations...');
  await prisma.budget_allocations.create({
    data: {
      id: 'budget-alloc-001',
      budget_id: 'budget-001',
      department: 'Lab AI',
      amount: 30000000,
      description: 'Alokasi untuk Lab AI',
    },
  });

  // 25. Expenses
  console.log('💸 Seeding expenses...');
  await prisma.expenses.create({
    data: {
      id: 'expense-001',
      budget_id: 'budget-001',
      amount: 5000000,
      description: 'Pembelian software lisensi',
      category: 'Software',
      expense_date: new Date('2025-01-15'),
      status: 'approved',
      approved_by: 'adminkeuangan-001',
      approved_at: new Date('2025-01-16'),
    },
  });

  // 26. Payments
  console.log('💳 Seeding payments...');
  await prisma.payments.create({
    data: {
      id: 'payment-001',
      student_id: 'student-001',
      amount: 5000000,
      description: 'Pembayaran SPP Semester Ganjil',
      category: 'tuition',
      status: 'completed',
      due_date: new Date('2024-09-30'),
      paid_date: new Date('2024-09-15'),
      semester: 'Ganjil',
      academic_year: '2024/2025',
      receipt_number: 'RCP/2024/001',
      payment_method: 'Bank Transfer',
      updated_at: new Date(),
    },
  });

  // 27. Payment Items
  console.log('💰 Seeding payment items...');
  await prisma.payment_items.create({
    data: {
      id: 'payment-item-001',
      name: 'Biaya Laboratorium AI',
      description: 'Biaya praktikum AI semester ganjil',
      amount: 500000,
      category: 'laboratory',
      semester: 'Ganjil',
      academic_year: '2024/2025',
      due_date: new Date('2024-09-30'),
      is_required: true,
      is_recurring: true,
      payment_id: 'payment-001',
    },
  });

  // 28. Exam Requirements
  console.log('📋 Seeding exam requirements...');
  await prisma.exam_requirements.create({
    data: {
      id: 'exam-req-001',
      exam_type: 'proposal',
      title: 'Transkrip Nilai 145 SKS',
      description: 'Transkrip nilai dengan minimal 145 SKS',
      required: true,
      order: 1,
      updated_at: new Date(),
    },
  });

  await prisma.exam_requirements.create({
    data: {
      id: 'exam-req-002',
      exam_type: 'proposal',
      title: 'Sertifikat DAD',
      description: 'Sertifikat DAD (Dauroh Arabiyah Diniyah)',
      required: true,
      order: 2,
      updated_at: new Date(),
    },
  });

  // 29. Exam Applications
  console.log('📝 Seeding exam applications...');
  const examApp1 = await prisma.exam_applications.create({
    data: {
      id: 'exam-app-001',
      student_id: 'student-001',
      title: 'Sistem Rekomendasi Berbasis Machine Learning',
      type: 'proposal',
      status: 'scheduled',
      abstract: 'Penelitian tentang pengembangan sistem rekomendasi menggunakan algoritma collaborative filtering',
      submission_date: new Date('2025-01-20'),
      scheduled_date: new Date('2025-03-15'),
      location: 'Ruang Sidang A',
      advisor_1_id: 'lecturer-001',
      advisor_2_id: 'lecturer-002',
      updated_at: new Date(),
    },
  });

  // 30. Exam Committees
  console.log('👥 Seeding exam committees...');
  await prisma.exam_committees.create({
    data: {
      id: 'exam-comm-001',
      exam_id: 'exam-app-001',
      lecturer_id: 'lecturer-001',
      role: 'Ketua Penguji',
    },
  });

  await prisma.exam_committees.create({
    data: {
      id: 'exam-comm-002',
      exam_id: 'exam-app-001',
      lecturer_id: 'lecturer-002',
      role: 'Penguji 1',
    },
  });

  // 31. Exam Documents
  console.log('📄 Seeding exam documents...');
  await prisma.exam_documents.create({
    data: {
      id: 'exam-doc-001',
      exam_id: 'exam-app-001',
      name: 'Transkrip Nilai',
      type: 'transkrip_nilai_145',
      status: 'verified',
      upload_date: new Date('2025-01-20'),
      verification_date: new Date('2025-01-22'),
      file_url: '/uploads/exams/transkrip-001.pdf',
      file_size: 2097152,
    },
  });

  // 32. Exam Student Requirements
  console.log('✅ Seeding exam student requirements...');
  await prisma.exam_student_requirements.create({
    data: {
      id: 'exam-stu-req-001',
      student_id: 'student-001',
      requirement_id: 'exam-req-001',
      completed: true,
      completed_at: new Date('2025-01-20'),
      file_url: '/uploads/requirements/transkrip-001.pdf',
      file_name: 'transkrip-20210001.pdf',
      file_size: 2097152,
      uploaded_at: new Date('2025-01-20'),
      verified_at: new Date('2025-01-22'),
      notes: 'Dokumen lengkap dan valid',
    },
  });

  // 33. Thesis Titles
  console.log('📄 Seeding thesis titles...');
  const thesis1 = await prisma.thesis_titles.create({
    data: {
      id: 'thesis-001',
      author_id: 'student-001',
      supervisor_id: 'lecturer-001',
      title: 'Sistem Rekomendasi Berbasis Machine Learning untuk E-Commerce',
      abstract: 'Penelitian ini membahas pengembangan sistem rekomendasi produk menggunakan algoritma collaborative filtering dan content-based filtering',
      keywords: ['Machine Learning', 'Recommendation System', 'E-Commerce', 'Collaborative Filtering'],
      submission_date: new Date('2025-01-15'),
      status: 'approved',
      year: 2025,
      similarity_score: 15.5,
      digital_copy: true,
      document_url: '/thesis/2025/thesis-001.pdf',
      department: 'Teknik Informatika',
      updated_at: new Date(),
    },
  });

  // 34. Thesis Reviews
  console.log('📝 Seeding thesis reviews...');
  await prisma.thesis_reviews.create({
    data: {
      id: 'thesis-rev-001',
      thesis_id: 'thesis-001',
      reviewer_id: 'lecturer-001',
      action: 'approved',
      comments: 'Judul sudah sesuai dengan minat penelitian',
      review_date: new Date('2025-01-18'),
    },
  });

  // 35. Thesis Archives
  console.log('📦 Seeding thesis archives...');
  await prisma.thesis_archives.create({
    data: {
      id: 'thesis-arch-001',
      thesis_id: 'thesis-001',
      archive_date: new Date('2025-02-01'),
      location: 'Perpustakaan Lantai 3 Rak A5',
      physical_id: 'ARCH-2025-001',
      digital_id: 'DARCH-2025-001',
      notes: 'Skripsi telah diarsipkan dalam bentuk fisik dan digital',
    },
  });

  // 36. Letter Types
  console.log('📝 Seeding letter types...');
  await prisma.letter_types.create({
    data: {
      id: 'letter-type-001',
      title: 'Surat Permohonan KKP',
      description: 'Surat permohonan pelaksanaan Kuliah Kerja Praktek',
      approval_role: 'prodi',
      estimated_days: 3,
      required_documents: ['Transkrip Nilai', 'KHS Terakhir'],
      is_active: true,
    },
  });

  await prisma.letter_types.create({
    data: {
      id: 'letter-type-002',
      title: 'Surat Keterangan Mahasiswa Aktif',
      description: 'Surat keterangan status mahasiswa aktif',
      approval_role: 'staff_tu',
      estimated_days: 1,
      required_documents: ['KTM'],
      is_active: true,
    },
  });

  // 37. Letter Requests
  console.log('📮 Seeding letter requests...');
  await prisma.letter_requests.create({
    data: {
      id: 'letter-req-001',
      student_id: 'student-001',
      type: 'Surat Permohonan KKP',
      title: 'Permohonan KKP di PT. Tech Indonesia',
      purpose: 'Keperluan pelaksanaan KKP',
      description: 'Saya bermaksud mengajukan permohonan KKP di PT. Tech Indonesia',
      status: 'approved',
      request_date: new Date('2025-01-05'),
      approved_date: new Date('2025-01-08'),
      approval_role: 'prodi',
      approved_by: 'prodi-001',
      letter_number: 'SK/KKP/2025/001',
      updated_at: new Date(),
    },
  });

  // 38. Letter Attachments
  console.log('📎 Seeding letter attachments...');
  await prisma.letter_attachments.create({
    data: {
      id: 'letter-attach-001',
      request_id: 'letter-req-001',
      name: 'Transkrip Nilai',
      upload_date: new Date('2025-01-05'),
      url: '/uploads/letters/transkrip-001.pdf',
      file_size: 1048576,
      mime_type: 'application/pdf',
    },
  });

  // 39. Academic Events
  console.log('📅 Seeding academic events...');
  await prisma.academic_events.create({
    data: {
      id: 'event-001',
      title: 'Ujian Proposal Skripsi',
      description: 'Ujian proposal skripsi mahasiswa tingkat akhir',
      start_date: new Date('2025-03-15T09:00:00'),
      end_date: new Date('2025-03-15T12:00:00'),
      location: 'Ruang Sidang A',
      type: 'exam',
      exam_type: 'proposal',
      status: 'confirmed',
      student_id: 'student-001',
      lecturer_id: 'lecturer-001',
      updated_at: new Date(),
    },
  });

  await prisma.academic_events.create({
    data: {
      id: 'event-002',
      title: 'Workshop Machine Learning',
      description: 'Workshop pengenalan ML untuk mahasiswa',
      start_date: new Date('2025-03-20T13:00:00'),
      end_date: new Date('2025-03-20T16:00:00'),
      location: 'Lab AI',
      type: 'workshop',
      status: 'confirmed',
      updated_at: new Date(),
    },
  });

  // 40. Notifications
  console.log('🔔 Seeding notifications...');
  await prisma.notifications.create({
    data: {
      id: 'notif-001',
      user_id: 'student-001',
      title: 'Persetujuan KKP',
      message: 'Pengajuan KKP Anda telah disetujui',
      type: 'success',
      is_read: false,
      data: {
        application_id: 'kkp-app-001',
        status: 'approved',
      },
    },
  });

  await prisma.notifications.create({
    data: {
      id: 'notif-002',
      user_id: 'student-001',
      title: 'Jadwal Ujian Proposal',
      message: 'Ujian proposal Anda dijadwalkan pada 15 Maret 2025',
      type: 'info',
      is_read: false,
      data: {
        exam_id: 'exam-app-001',
        date: '2025-03-15',
      },
    },
  });

  // 41. System Configs
  console.log('⚙️ Seeding system configs...');
  await prisma.system_configs.create({
    data: {
      id: 'config-001',
      key: 'academic_year',
      value: '2024/2025',
      description: 'Tahun akademik aktif',
      category: 'academic',
      updated_at: new Date(),
    },
  });

  await prisma.system_configs.create({
    data: {
      id: 'config-002',
      key: 'semester',
      value: 'Ganjil',
      description: 'Semester aktif',
      category: 'academic',
      updated_at: new Date(),
    },
  });

  // 42. Audit Logs
  console.log('📋 Seeding audit logs...');
  await prisma.audit_logs.create({
    data: {
      id: 'audit-001',
      user_id: 'admin-001',
      action: 'CREATE',
      resource: 'users',
      details: {
        username: 'dosen001',
        role: 'dosen',
      },
      ip_address: '192.168.1.100',
      user_agent: 'Mozilla/5.0',
    },
  });

  // 43. File Uploads
  console.log('📁 Seeding file uploads...');
  await prisma.file_uploads.create({
    data: {
      id: 'file-001',
      filename: 'proposal-20210001.pdf',
      original_name: 'Proposal Skripsi.pdf',
      path: '/uploads/proposals/proposal-20210001.pdf',
      size: 3145728,
      mime_type: 'application/pdf',
      uploaded_by: 'student-001',
      category: 'proposal',
    },
  });

  // 44. Role Configurations
  console.log('⚙️ Seeding role configurations...');
  const roleConfigs = [
    {
      id: 'role-config-001',
      role: 'admin',
      title: 'Administrator',
      subtitle: 'System Management',
      icon_name: 'Shield',
      description: 'Full system access and management',
      is_active: true,
    },
    {
      id: 'role-config-002',
      role: 'admin_umum',
      title: 'Admin Umum',
      subtitle: 'Management System',
      icon_name: 'Building2',
      description: 'General administrative tasks',
      is_active: true,
    },
    {
      id: 'role-config-003',
      role: 'dosen',
      title: 'Dosen',
      subtitle: 'Academic Portal',
      icon_name: 'GraduationCap',
      description: 'Lecturer portal for teaching and research',
      is_active: true,
    },
    {
      id: 'role-config-004',
      role: 'staff_tu',
      title: 'Staff TU',
      subtitle: 'Administrative Portal',
      icon_name: 'ClipboardList',
      description: 'Administrative staff portal',
      is_active: true,
    },
    {
      id: 'role-config-005',
      role: 'dekan',
      title: 'Dekan',
      subtitle: 'Faculty Management',
      icon_name: 'UserCheck',
      description: 'Dean portal for faculty management',
      is_active: true,
    },
    {
      id: 'role-config-006',
      role: 'mahasiswa',
      title: 'Mahasiswa',
      subtitle: 'Student Portal',
      icon_name: 'BookOpen',
      description: 'Student portal for academic activities',
      is_active: true,
    },
    {
      id: 'role-config-007',
      role: 'admin_keuangan',
      title: 'Admin Keuangan',
      subtitle: 'Finance Management',
      icon_name: 'DollarSign',
      description: 'Financial administration portal',
      is_active: true,
    },
    {
      id: 'role-config-008',
      role: 'kepala_tata_usaha',
      title: 'Kepala Tata Usaha',
      subtitle: 'Administration Head',
      icon_name: 'Users',
      description: 'Head of administrative office',
      is_active: true,
    },
    {
      id: 'role-config-009',
      role: 'prodi',
      title: 'Program Studi',
      subtitle: 'Academic Management',
      icon_name: 'School',
      description: 'Study program coordinator portal',
      is_active: true,
    },
    {
      id: 'role-config-010',
      role: 'gkm',
      title: 'GKM',
      subtitle: 'Student Affairs',
      icon_name: 'Users',
      description: 'Student affairs management',
      is_active: true,
    },
    {
      id: 'role-config-011',
      role: 'laboratory_admin',
      title: 'Laboratory Admin',
      subtitle: 'Lab Management',
      icon_name: 'FlaskConical',
      description: 'Laboratory administration and management',
      is_active: true,
    },
    {
      id: 'role-config-012',
      role: 'reading_room_admin',
      title: 'Reading Room Admin',
      subtitle: 'Library Management',
      icon_name: 'BookMarked',
      description: 'Reading room and library management',
      is_active: true,
    },
    {
      id: 'role-config-013',
      role: 'admin_umum',
      title: 'SIMAK',
      subtitle: 'Academic Information System',
      icon_name: 'Archive',
      description: 'Academic information system management',
      is_active: true,
    },
  ];

  for (const config of roleConfigs) {
    await prisma.role_configurations.upsert({
      where: { role: config.role as any },
      update: {},
      create: {
        ...config,
        updated_at: new Date(),
      },
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
