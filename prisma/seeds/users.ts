import { PrismaClient, Role } from '../../lib/generated/prisma'
import bcrypt from 'bcryptjs'

export async function seedUsers(prisma: PrismaClient) {
  // Indonesian names for realistic data
  const indonesianNames = [
    'Ahmad Fauzi', 'Siti Rahayu', 'Budi Santoso', 'Dewi Susanti', 'Eko Prasetyo',
    'Rina Wati', 'Joko Widodo', 'Ani Yudhoyono', 'Bambang Supriadi', 'Lina Marlina',
    'Dedi Kurniawan', 'Wati Sulistiawati', 'Agus Salim', 'Yuni Shara', 'Hendra Setiawan',
    'Maya Sari', 'Rudi Hartono', 'Nina Agustina', 'Dodi Sudrajat', 'Lia Indah',
    'Firman Utama', 'Sari Indah', 'Rizki Pratama', 'Dian Sastro', 'Surya Darma',
    'Mega Wati', 'Indra Gunawan', 'Putri Anggraini', 'Fajar Nugroho', 'Sinta Dewi'
  ]

  const departments = ['Informatika', 'Elektro', 'Pengairan', 'Arsitektur', 'PWK']
  const majors = ['Teknik Informatika', 'Teknik Elektro', 'Teknik Pengairan', 'Arsitektur', 'Perencanaan Wilayah dan Kota']

  const defaultPassword = await bcrypt.hash('password123', 10)

  // Create admin user
  await prisma.user.create({
    data: {
      nidn: 'ADMIN001',
      password: defaultPassword,
      name: 'Administrator',
      role: Role.admin,
      isActive: true
    }
  })

  // Create staff users
  const staffRoles = [
    { role: Role.staff_tu, count: 3 },
    { role: Role.admin_keuangan, count: 2 },
    { role: Role.laboratory_admin, count: 2 },
    { role: Role.reading_room_admin, count: 2 },
    { role: Role.admin_umum, count: 2 },
    { role: Role.kepala_tata_usaha, count: 1 }
  ]

  let staffIndex = 0
  for (const staffRole of staffRoles) {
    for (let i = 0; i < staffRole.count; i++) {
      const nip = `NIP${staffRole.role.toUpperCase()}${(i + 1).toString().padStart(2, '0')}`
      const nidn = `STAFF${(staffIndex + 1).toString().padStart(3, '0')}`

      const user = await prisma.user.create({
        data: {
          nidn,
          password: defaultPassword,
          name: indonesianNames[staffIndex % indonesianNames.length],
          role: staffRole.role,
          isActive: true
        }
      })

      await prisma.staff.create({
        data: {
          userId: user.id,
          nip,
          department: departments[staffIndex % departments.length],
          position: getPositionByRole(staffRole.role),
          phone: `+62812${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`
        }
      })

      staffIndex++
    }
  }

  // Create dosen with leadership sub-roles (Dekan, Wakil Dekan, Prodi, Sekretaris, GKM)
  const dosenLeadership = [
    { nidn: 'DEKAN001', name: 'Prof. Dr. Ahmad Dekan', subRole: 'dekan', position: 'Dekan', department: 'Fakultas Teknik' },
    { nidn: 'WD1001', name: 'Dr. Budi Wakil Dekan I', subRole: 'wakil_dekan_1', position: 'Wakil Dekan I', department: 'Fakultas Teknik' },
    { nidn: 'WD2001', name: 'Dr. Siti Wakil Dekan II', subRole: 'wakil_dekan_2', position: 'Wakil Dekan II', department: 'Fakultas Teknik' },
    { nidn: 'WD3001', name: 'Dr. Eko Wakil Dekan III', subRole: 'wakil_dekan_3', position: 'Wakil Dekan III', department: 'Fakultas Teknik' },
    { nidn: 'WD4001', name: 'Dr. Rina Wakil Dekan IV', subRole: 'wakil_dekan_4', position: 'Wakil Dekan IV', department: 'Fakultas Teknik' },
    { nidn: 'PRODI001', name: 'Dr. Joko Prodi Informatika', subRole: 'prodi', position: 'Kepala Prodi', department: 'Informatika' },
    { nidn: 'PRODI002', name: 'Dr. Dewi Prodi Elektro', subRole: 'prodi', position: 'Kepala Prodi', department: 'Elektro' },
    { nidn: 'PRODI003', name: 'Dr. Bambang Prodi Pengairan', subRole: 'prodi', position: 'Kepala Prodi', department: 'Pengairan' },
    { nidn: 'PRODI004', name: 'Dr. Lina Prodi Arsitektur', subRole: 'prodi', position: 'Kepala Prodi', department: 'Arsitektur' },
    { nidn: 'PRODI005', name: 'Dr. Agus Prodi PWK', subRole: 'prodi', position: 'Kepala Prodi', department: 'PWK' },
    { nidn: 'SEKPRODI001', name: 'Dr. Maya Sekretaris Prodi Informatika', subRole: 'sekretaris_prodi', position: 'Sekretaris Prodi', department: 'Informatika' },
    { nidn: 'SEKPRODI002', name: 'Dr. Rudi Sekretaris Prodi Elektro', subRole: 'sekretaris_prodi', position: 'Sekretaris Prodi', department: 'Elektro' },
    { nidn: 'GKM001', name: 'Dr. Indra GKM', subRole: 'gkm', position: 'Gugus Kendali Mutu', department: 'Fakultas Teknik' }
  ]

  for (const dosenData of dosenLeadership) {
    const user = await prisma.user.create({
      data: {
        nidn: dosenData.nidn,
        password: defaultPassword,
        name: dosenData.name,
        role: Role.dosen, // All are dosen with different sub-roles
        subRole: dosenData.subRole,
        isActive: true
      }
    })

    await prisma.lecturer.create({
      data: {
        userId: user.id,
        nip: `NIP${dosenData.nidn}`,
        department: dosenData.department,
        position: dosenData.position,
        specialization: getSpecialization(dosenData.department),
        phone: `+62813${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Office ${dosenData.department} 001`
      }
    })
  }

  // Create regular lecturers
  for (let i = 0; i < 20; i++) {
    const nip = `NIP${(19800000 + i * 1000 + Math.floor(Math.random() * 1000)).toString()}`
    const nidn = `DOSEN${(i + 1).toString().padStart(3, '0')}`

    const user = await prisma.user.create({
      data: {
        nidn,
        password: defaultPassword,
        name: indonesianNames[(i + 10) % indonesianNames.length], // Offset to avoid duplicate names
        role: Role.dosen,
        subRole: 'dosen',
        isActive: true
      }
    })

    await prisma.lecturer.create({
      data: {
        userId: user.id,
        nip,
        department: departments[i % departments.length],
        position: getLecturerPosition(),
        specialization: getSpecialization(departments[i % departments.length]),
        phone: `+62813${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Office ${departments[i % departments.length]} ${Math.floor(i / 5) + 1}`
      }
    })
  }

  // Create students
  for (let i = 0; i < 200; i++) {
    const year = 2020 + (i % 4) // Students from 2020-2023
    const deptIndex = i % departments.length
    const nim = `${year}${(deptIndex + 1).toString().padStart(2, '0')}${(i + 1).toString().padStart(4, '0')}`
    const nidn = nim // Use NIM as NIDN for students

    const user = await prisma.user.create({
      data: {
        nidn,
        password: defaultPassword,
        name: indonesianNames[i % indonesianNames.length],
        role: Role.mahasiswa,
        isActive: true
      }
    })

    await prisma.student.create({
      data: {
        userId: user.id,
        nim,
        major: majors[deptIndex],
        department: departments[deptIndex],
        semester: Math.floor(Math.random() * 8) + 1,
        academicYear: `${year}/${year + 1}`,
        phone: `+62814${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        address: `Jl. Example Street No. ${i + 1}, Jakarta`,
        enrollDate: new Date(year, 8, 1), // September 1st
        gpa: Math.random() * 1.5 + 2.5, // GPA between 2.5 - 4.0
        guardian: {
          name: `Guardian of ${indonesianNames[i % indonesianNames.length]}`,
          phone: `+6281${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
          relationship: 'Parent'
        }
      }
    })
  }

  console.log(`✅ Created ${staffIndex} staff users, ${dosenLeadership.length} dosen leadership, 20 regular lecturers, and 200 students`)
}

function getPositionByRole(role: Role): string {
  const positions = {
    [Role.staff_tu]: 'Staff Tata Usaha',
    [Role.admin_keuangan]: 'Administrator Keuangan',
    [Role.laboratory_admin]: 'Administrator Laboratorium',
    [Role.reading_room_admin]: 'Administrator Ruang Baca',
    [Role.admin_umum]: 'Administrator Umum',
    [Role.kepala_tata_usaha]: 'Kepala Tata Usaha',
    [Role.admin]: 'System Administrator',
    [Role.dosen]: 'Dosen',
    [Role.mahasiswa]: 'Mahasiswa'
  }
  return positions[role] || 'Staff'
}

function getLecturerPosition(): string {
  const positions = ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Profesor']
  return positions[Math.floor(Math.random() * positions.length)]
}

function getSpecialization(department: string): string {
  const specializations = {
    'Informatika': ['Artificial Intelligence', 'Software Engineering', 'Data Science', 'Cybersecurity', 'Computer Networks'],
    'Elektro': ['Power Systems', 'Electronics', 'Telecommunications', 'Control Systems', 'Renewable Energy'],
    'Pengairan': ['Hydraulics', 'Water Resources', 'Irrigation', 'Hydrology', 'Environmental Engineering'],
    'Arsitektur': ['Design Theory', 'Urban Planning', 'Building Technology', 'Heritage Conservation', 'Green Architecture'],
    'PWK': ['Urban Planning', 'Regional Development', 'Transportation Planning', 'Environmental Planning', 'GIS Applications']
  }

  const deptSpecs = specializations[department as keyof typeof specializations] || ['General']
  return deptSpecs[Math.floor(Math.random() * deptSpecs.length)]
}