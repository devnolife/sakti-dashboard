import { PrismaClient } from '../../lib/generated/prisma'

export async function seedSystemConfigs(prisma: PrismaClient) {
  const configs = [
    // Authentication settings
    {
      key: 'auth.session_timeout',
      value: '86400', // 24 hours in seconds
      description: 'Session timeout in seconds',
      category: 'auth'
    },
    {
      key: 'auth.password_min_length',
      value: '6',
      description: 'Minimum password length',
      category: 'auth'
    },
    {
      key: 'auth.max_login_attempts',
      value: '5',
      description: 'Maximum login attempts before account lockout',
      category: 'auth'
    },
    // Application settings
    {
      key: 'app.name',
      value: 'SIMTEK-FT UNSRI',
      description: 'Application name',
      category: 'app'
    },
    {
      key: 'app.version',
      value: '1.0.0',
      description: 'Current application version',
      category: 'app'
    },
    {
      key: 'app.maintenance_mode',
      value: 'false',
      description: 'Enable/disable maintenance mode',
      category: 'app'
    },
    // Academic settings
    {
      key: 'academic.current_semester',
      value: 'Ganjil 2024/2025',
      description: 'Current active academic semester',
      category: 'academic'
    },
    {
      key: 'academic.kkp_min_credits',
      value: '110',
      description: 'Minimum credits required to apply for KKP',
      category: 'academic'
    },
    {
      key: 'academic.thesis_min_credits',
      value: '130',
      description: 'Minimum credits required to apply for thesis',
      category: 'academic'
    },
    // Payment settings
    {
      key: 'payment.late_fee_percentage',
      value: '10',
      description: 'Late payment fee percentage',
      category: 'payment'
    },
    {
      key: 'payment.payment_deadline_days',
      value: '30',
      description: 'Payment deadline in days from due date',
      category: 'payment'
    },
    // Library settings
    {
      key: 'library.max_borrow_books',
      value: '3',
      description: 'Maximum number of books a student can borrow',
      category: 'library'
    },
    {
      key: 'library.borrow_period_days',
      value: '14',
      description: 'Book borrowing period in days',
      category: 'library'
    },
    {
      key: 'library.fine_per_day',
      value: '1000',
      description: 'Fine amount per day for overdue books (in Rupiah)',
      category: 'library'
    },
    // Notification settings
    {
      key: 'notification.email_enabled',
      value: 'true',
      description: 'Enable email notifications',
      category: 'notification'
    },
    {
      key: 'notification.sms_enabled',
      value: 'false',
      description: 'Enable SMS notifications',
      category: 'notification'
    },
    // File upload settings
    {
      key: 'upload.max_file_size_mb',
      value: '10',
      description: 'Maximum file upload size in MB',
      category: 'upload'
    },
    {
      key: 'upload.allowed_extensions',
      value: 'pdf,doc,docx,jpg,jpeg,png',
      description: 'Allowed file extensions for upload',
      category: 'upload'
    },
    // Faculty information
    {
      key: 'faculty.name',
      value: 'Fakultas Teknik',
      description: 'Faculty name',
      category: 'faculty'
    },
    {
      key: 'faculty.university',
      value: 'Universitas Sriwijaya',
      description: 'University name',
      category: 'faculty'
    },
    {
      key: 'faculty.address',
      value: 'Jl. Raya Palembang - Prabumulih Km. 32, Indralaya, Sumatera Selatan',
      description: 'Faculty address',
      category: 'faculty'
    },
    {
      key: 'faculty.phone',
      value: '+62711580069',
      description: 'Faculty phone number',
      category: 'faculty'
    },
    {
      key: 'faculty.email',
      value: 'ft@unsri.ac.id',
      description: 'Faculty email address',
      category: 'faculty'
    },
    {
      key: 'faculty.website',
      value: 'https://ft.unsri.ac.id',
      description: 'Faculty website URL',
      category: 'faculty'
    }
  ]

  const createdConfigs = []
  for (const config of configs) {
    const created = await prisma.systemConfig.create({
      data: config
    })
    createdConfigs.push(created)
  }

  console.log(`✅ Created ${createdConfigs.length} system configurations`)
  return createdConfigs
}