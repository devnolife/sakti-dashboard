import { PrismaClient } from '../../lib/generated/prisma'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  console.log('==== Seeding letter_requests...')

  // Get prodi IF
  const prodi = await prisma.prodi.findFirst({
    where: { kode: '55202' }
  })

  if (!prodi) {
    console.log('Prodi IF tidak ditemukan')
    return
  }

  // Get students from IF
  const students = await prisma.students.findMany({
    where: { prodi_id: '55202' },
    take: 20
  })

  if (students.length === 0) {
    console.log('Tidak ada students')
    return
  }

  const letterTypes = [
    { type: 'kkp', title: 'Surat Permohonan KKP', purpose: 'Mengajukan KKP' },
    { type: 'ujian', title: 'Surat Permohonan Ujian Proposal', purpose: 'Mengajukan ujian proposal' },
    { type: 'cuti', title: 'Surat Permohonan Cuti Kuliah', purpose: 'Mengajukan cuti kuliah' },
    { type: 'aktif', title: 'Surat Keterangan Aktif Kuliah', purpose: 'Keterangan masih aktif kuliah' },
  ]

  const statuses = ['submitted', 'in_review', 'approved', 'completed']
  const approvalRoles = ['staff_tu', 'prodi', 'dekan']

  // Create 15 letter requests
  for (let i = 0; i < 15; i++) {
    const student = students[Math.floor(Math.random() * students.length)]
    const letterType = letterTypes[Math.floor(Math.random() * letterTypes.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const approvalRole = approvalRoles[Math.floor(Math.random() * approvalRoles.length)]

    const daysAgo = Math.floor(Math.random() * 30)
    const requestDate = new Date()
    requestDate.setDate(requestDate.getDate() - daysAgo)

    const request = await prisma.letter_requests.create({
      data: {
        id: nanoid(),
        type: letterType.type,
        title: letterType.title,
        purpose: letterType.purpose,
        description: `Saya mengajukan permohonan ${letterType.title} untuk keperluan akademik.`,
        status: status as any,
        request_date: requestDate,
        approved_date: status === 'approved' || status === 'completed' ? new Date(requestDate.getTime() + 2 * 24 * 60 * 60 * 1000) : null,
        completed_date: status === 'completed' ? new Date(requestDate.getTime() + 5 * 24 * 60 * 60 * 1000) : null,
        student_id: student.id,
        approval_role: approvalRole as any,
        letter_number: status === 'completed' ? `LR-${String(i + 1).padStart(3, '0')}/IF/${new Date().getFullYear()}` : null,
        created_at: requestDate,
        updated_at: new Date()
      }
    })

    console.log(`  OK: ${request.title} (${request.status})`)
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
