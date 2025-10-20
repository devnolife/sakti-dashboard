import { PrismaClient } from '../../lib/generated/prisma'

const prisma = new PrismaClient()

async function addMockData() {
  console.log('📝 Adding mock data for student dashboard...')

  // Get student
  const student = await prisma.students.findFirst({
    where: { nim: '2021010001' }
  })

  if (!student) {
    console.error('Student not found')
    return
  }

  const user = await prisma.users.findUnique({
    where: { id: student.userId }
  })

  if (!user) {
    console.error('User not found')
    return
  }

  // Add some payments
  const payments = [
    {
      description: 'SPP Semester Ganjil 2025',
      amount: 5500000,
      dueDate: new Date('2025-12-31'),
      status: 'pending' as const,
      category: 'tuition' as const,
      semester: 'Ganjil',
      academic_year: '2025'
    },
    {
      description: 'Biaya Praktikum Lab',
      amount: 350000,
      dueDate: new Date('2025-11-15'),
      status: 'pending' as const,
      category: 'laboratory' as const,
      semester: 'Ganjil',
      academic_year: '2025'
    }
  ]

  for (const payment of payments) {
    // Check if payment exists
    const existingPayment = await prisma.payments.findFirst({
      where: {
        student_id: student.id,
        description: payment.description,
        academic_year: payment.academicYear,
        semester: payment.semester
      }
    })

    if (!existingPayment) {
      await prisma.payments.create({
        data: {
          ...payment,
          student_id: student.id
        }
      })
    }
  }
  console.log('✅ Added payment data')

  // Add notifications
  const notifications = [
    {
      title: 'Pembayaran SPP',
      message: 'Jangan lupa melakukan pembayaran SPP sebelum tanggal jatuh tempo',
      type: 'warning' as const,
      user_id: user.id
    },
    {
      title: 'Jadwal Ujian Tengah Semester',
      message: 'Jadwal UTS telah dipublikasikan. Silakan cek portal akademik',
      type: 'info' as const,
      user_id: user.id
    },
    {
      title: 'Pendaftaran KKP Dibuka',
      message: 'Periode pendaftaran KKP untuk semester depan telah dibuka',
      type: 'info' as const,
      user_id: user.id
    }
  ]

  for (const notif of notifications) {
    await prisma.notification.create({
      data: notif
    })
  }
  console.log('✅ Added notification data')

  // Add exam application
  await prisma.exam_applications.create({
    data: {
      student_id: student.id,
      type: 'proposal',
      title: 'Proposal Tugas Akhir: Sistem Manajemen Dashboard',
      status: 'pending',
      scheduled_date: new Date('2025-11-20'),
      abstract: 'Proposal ini membahas pengembangan sistem manajemen dashboard untuk universitas.'
    }
  })
  console.log('✅ Added exam application')

  console.log('🎉 Mock data added successfully!')
}

addMockData()
  .catch((e) => {
    console.error('Error:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
