import { Role } from './generated/prisma'

export interface MenuItem {
  id: string
  label: string
  icon: string
  href?: string
  children?: MenuItem[]
  badge?: string | number
  roles: (Role | string)[] // Include sub-roles as strings
}

export const menuConfig: MenuItem[] = [
  // Dashboard - Available for all roles
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    href: '/dashboard',
    roles: ['*'] // Available for all roles
  },

  // Academic Management - For Dekan and leadership
  {
    id: 'academic',
    label: 'Academic Management',
    icon: 'GraduationCap',
    roles: ['dekan', 'wakil_dekan_1', 'wakil_dekan_2', 'wakil_dekan_3', 'wakil_dekan_4'],
    children: [
      {
        id: 'academic-overview',
        label: 'Academic Overview',
        icon: 'TrendingUp',
        href: '/dashboard/academic/overview',
        roles: ['dekan', 'wakil_dekan_1']
      },
      {
        id: 'curriculum',
        label: 'Curriculum Management',
        icon: 'BookOpen',
        href: '/dashboard/academic/curriculum',
        roles: ['dekan', 'wakil_dekan_1']
      },
      {
        id: 'faculty-reports',
        label: 'Faculty Reports',
        icon: 'FileText',
        href: '/dashboard/academic/reports',
        roles: ['dekan', 'wakil_dekan_1', 'wakil_dekan_2']
      }
    ]
  },

  // Student Affairs - For WD3 and related staff
  {
    id: 'student-affairs',
    label: 'Student Affairs',
    icon: 'Users',
    roles: ['dekan', 'wakil_dekan_3', 'staff_tu'],
    children: [
      {
        id: 'student-services',
        label: 'Student Services',
        icon: 'UserCheck',
        href: '/dashboard/student-affairs/services',
        roles: ['wakil_dekan_3', 'staff_tu']
      },
      {
        id: 'student-organizations',
        label: 'Student Organizations',
        icon: 'Users2',
        href: '/dashboard/student-affairs/organizations',
        roles: ['wakil_dekan_3']
      }
    ]
  },

  // Finance & Administration - For WD2 and finance staff
  {
    id: 'finance',
    label: 'Finance & Budget',
    icon: 'DollarSign',
    roles: ['dekan', 'wakil_dekan_2', 'admin_keuangan'],
    children: [
      {
        id: 'budget-planning',
        label: 'Budget Planning',
        icon: 'PieChart',
        href: '/dashboard/admin_keuangan/budget/planning',
        roles: ['dekan', 'wakil_dekan_2', 'admin_keuangan']
      },
      {
        id: 'budget-tracking',
        label: 'Budget Tracking',
        icon: 'TrendingUp',
        href: '/dashboard/admin_keuangan/budget/tracking',
        roles: ['wakil_dekan_2', 'admin_keuangan']
      },
      {
        id: 'payment-verification',
        label: 'Payment Verification',
        icon: 'CreditCard',
        href: '/dashboard/admin_keuangan/payments/verification',
        roles: ['admin_keuangan']
      }
    ]
  },

  // Cooperation & Development - For WD4
  {
    id: 'cooperation',
    label: 'Cooperation & Development',
    icon: 'Handshake',
    roles: ['dekan', 'wakil_dekan_4'],
    children: [
      {
        id: 'partnerships',
        label: 'Industry Partnerships',
        icon: 'Building2',
        href: '/dashboard/cooperation/partnerships',
        roles: ['dekan', 'wakil_dekan_4']
      },
      {
        id: 'kkp-oversight',
        label: 'KKP Programs',
        icon: 'Briefcase',
        href: '/dashboard/cooperation/kkp',
        roles: ['wakil_dekan_4']
      }
    ]
  },

  // Program Study Management - For Prodi
  {
    id: 'prodi',
    label: 'Program Management',
    icon: 'School',
    roles: ['prodi', 'sekretaris_prodi'],
    children: [
      {
        id: 'kkp-approval',
        label: 'KKP Applications',
        icon: 'FileCheck',
        href: '/dashboard/prodi/kkp',
        roles: ['prodi', 'sekretaris_prodi']
      },
      {
        id: 'exam-scheduling',
        label: 'Exam Scheduling',
        icon: 'Calendar',
        href: '/dashboard/prodi/exams',
        roles: ['prodi', 'sekretaris_prodi']
      },
      {
        id: 'thesis-monitoring',
        label: 'Thesis Monitoring',
        icon: 'BookOpen',
        href: '/dashboard/prodi/thesis',
        roles: ['prodi', 'sekretaris_prodi']
      }
    ]
  },

  // Lecturer Functions
  {
    id: 'lecturer',
    label: 'Teaching & Research',
    icon: 'BookOpen',
    roles: ['dosen'],
    children: [
      {
        id: 'my-courses',
        label: 'My Courses',
        icon: 'Book',
        href: '/dashboard/lecturer/courses',
        roles: ['dosen']
      },
      {
        id: 'supervised-students',
        label: 'Supervised Students',
        icon: 'UserCheck',
        href: '/dashboard/lecturer/students',
        roles: ['dosen']
      },
      {
        id: 'grading',
        label: 'Grading',
        icon: 'ClipboardCheck',
        href: '/dashboard/lecturer/grading',
        roles: ['dosen']
      }
    ]
  },

  // Student Functions
  {
    id: 'student',
    label: 'My Academic',
    icon: 'User',
    roles: ['mahasiswa'],
    children: [
      {
        id: 'my-grades',
        label: 'My Grades',
        icon: 'Award',
        href: '/dashboard/student/grades',
        roles: ['mahasiswa']
      },
      {
        id: 'kkp-application',
        label: 'KKP Application',
        icon: 'FileText',
        href: '/dashboard/student/kkp',
        roles: ['mahasiswa']
      },
      {
        id: 'exam-registration',
        label: 'Exam Registration',
        icon: 'Calendar',
        href: '/dashboard/student/exams',
        roles: ['mahasiswa']
      },
      {
        id: 'letter-requests',
        label: 'Letter Requests',
        icon: 'Mail',
        href: '/dashboard/student/letters',
        roles: ['mahasiswa']
      }
    ]
  },

  // Administrative Functions
  {
    id: 'administration',
    label: 'Administration',
    icon: 'Settings',
    roles: ['staff_tu', 'kepala_tata_usaha'],
    children: [
      {
        id: 'letter-management',
        label: 'Letter Management',
        icon: 'FileText',
        href: '/dashboard/admin/letters',
        roles: ['staff_tu', 'kepala_tata_usaha']
      },
      {
        id: 'document-verification',
        label: 'Document Verification',
        icon: 'FileCheck',
        href: '/dashboard/admin/verification',
        roles: ['staff_tu']
      }
    ]
  },

  // Library Management
  {
    id: 'library',
    label: 'Library',
    icon: 'BookMarked',
    roles: ['reading_room_admin', 'mahasiswa', 'dosen'],
    children: [
      {
        id: 'book-catalog',
        label: 'Book Catalog',
        icon: 'Search',
        href: '/dashboard/library/catalog',
        roles: ['reading_room_admin', 'mahasiswa', 'dosen']
      },
      {
        id: 'book-management',
        label: 'Book Management',
        icon: 'Package',
        href: '/dashboard/library/management',
        roles: ['reading_room_admin']
      },
      {
        id: 'borrowing-history',
        label: 'Borrowing History',
        icon: 'History',
        href: '/dashboard/library/history',
        roles: ['reading_room_admin', 'mahasiswa', 'dosen']
      }
    ]
  },

  // Laboratory Management
  {
    id: 'laboratory',
    label: 'Laboratory',
    icon: 'Flask',
    roles: ['laboratory_admin', 'dosen'],
    children: [
      {
        id: 'lab-schedule',
        label: 'Lab Schedule',
        icon: 'Calendar',
        href: '/dashboard/lab/schedule',
        roles: ['laboratory_admin', 'dosen']
      },
      {
        id: 'equipment-management',
        label: 'Equipment',
        icon: 'Wrench',
        href: '/dashboard/lab/equipment',
        roles: ['laboratory_admin']
      }
    ]
  },

  // Quality Assurance
  {
    id: 'quality',
    label: 'Quality Assurance',
    icon: 'CheckCircle',
    roles: ['gkm'],
    children: [
      {
        id: 'evaluations',
        label: 'Evaluations',
        icon: 'ClipboardList',
        href: '/dashboard/quality/evaluations',
        roles: ['gkm']
      },
      {
        id: 'quality-reports',
        label: 'Quality Reports',
        icon: 'BarChart3',
        href: '/dashboard/quality/reports',
        roles: ['gkm']
      }
    ]
  },

  // System Administration
  {
    id: 'system',
    label: 'Admin Control',
    icon: 'Shield',
    roles: ['admin'],
    children: [
      {
        id: 'admin-dashboard',
        label: 'Admin Dashboard',
        icon: 'LayoutDashboard',
        href: '/dashboard/admin',
        roles: ['admin']
      },
      {
        id: 'user-management',
        label: 'User Management',
        icon: 'Users',
        href: '/dashboard/admin/users',
        roles: ['admin']
      },
      {
        id: 'system-config',
        label: 'System Config',
        icon: 'Settings',
        href: '/dashboard/admin/config',
        roles: ['admin']
      },
      {
        id: 'master-data',
        label: 'Master Data',
        icon: 'Database',
        href: '/dashboard/admin/companies',
        roles: ['admin']
      },
      {
        id: 'monitoring',
        label: 'System Monitoring',
        icon: 'Activity',
        href: '/dashboard/admin/monitoring',
        roles: ['admin']
      },
      {
        id: 'approval-override',
        label: 'Approval Override',
        icon: 'ShieldCheck',
        href: '/dashboard/admin/approval-override',
        roles: ['admin']
      },
      {
        id: 'audit-logs',
        label: 'Audit Logs',
        icon: 'FileText',
        href: '/dashboard/admin/audit-logs',
        roles: ['admin']
      }
    ]
  }
]

// Helper function to filter menu based on user role and sub-role
export function getMenuForUser(role: Role | string, subRole?: string): MenuItem[] {
  const userRoles = [role]
  if (subRole) {
    userRoles.push(subRole)
  }

  return menuConfig.filter(menuItem => {
    // Check if user has access to this menu item
    if (menuItem.roles.includes('*') ||
        menuItem.roles.some(itemRole => userRoles.includes(itemRole))) {

      // Filter children based on user roles
      if (menuItem.children) {
        menuItem.children = menuItem.children.filter(child =>
          child.roles.includes('*') ||
          child.roles.some(childRole => userRoles.includes(childRole))
        )
      }

      return true
    }

    return false
  })
}

// Helper function to get role display name including sub-role
export function getRoleDisplayName(role: Role | string, subRole?: string): string {
  const roleNames: Record<string, string> = {
    admin: 'Administrator',
    mahasiswa: 'Mahasiswa',
    dosen: 'Dosen',
    staff_tu: 'Staff Tata Usaha',
    prodi: 'Kepala Program Studi',
    dekan: 'Dekan',
    admin_keuangan: 'Administrator Keuangan',
    admin_umum: 'Administrator Umum',
    laboratory_admin: 'Administrator Laboratorium',
    reading_room_admin: 'Administrator Perpustakaan',
    gkm: 'Gugus Kendali Mutu',
    sekretaris_prodi: 'Sekretaris Program Studi',
    kepala_tata_usaha: 'Kepala Tata Usaha',
    wakil_dekan_1: 'Wakil Dekan I (Akademik)',
    wakil_dekan_2: 'Wakil Dekan II (Administrasi & Keuangan)',
    wakil_dekan_3: 'Wakil Dekan III (Kemahasiswaan)',
    wakil_dekan_4: 'Wakil Dekan IV (Kerjasama & Pengembangan)'
  }

  if (subRole && roleNames[subRole]) {
    return roleNames[subRole]
  }

  return roleNames[role as string] || role as string
}

// Helper function to get primary dashboard route based on role
export function getPrimaryDashboardRoute(role: Role | string, subRole?: string): string {
  if (subRole) {
    switch (subRole) {
      case 'dekan':
        return '/dashboard/academic/overview'
      case 'wakil_dekan_1':
        return '/dashboard/academic/overview'
      case 'wakil_dekan_2':
        return '/dashboard/admin_keuangan'
      case 'wakil_dekan_3':
        return '/dashboard/student-affairs/services'
      case 'wakil_dekan_4':
        return '/dashboard/cooperation/partnerships'
      case 'prodi':
        return '/dashboard/prodi/kkp'
      case 'sekretaris_prodi':
        return '/dashboard/prodi/kkp'
      case 'gkm':
        return '/dashboard/quality/evaluations'
    }
  }

  switch (role) {
    case 'admin':
      return '/dashboard/admin/users'
    case 'mahasiswa':
      return '/dashboard/student/grades'
    case 'dosen':
      return '/dashboard/lecturer/courses'
    case 'staff_tu':
      return '/dashboard/admin/letters'
    case 'admin_keuangan':
      return '/dashboard/admin_keuangan'
    case 'laboratory_admin':
      return '/dashboard/lab/schedule'
    case 'reading_room_admin':
      return '/dashboard/library/management'
    case 'gkm':
      return '/dashboard/quality/evaluations'
    case 'kepala_tata_usaha':
      return '/dashboard/admin/letters'
    default:
      return '/dashboard'
  }
}