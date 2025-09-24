import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { Role } from './generated/prisma'

export async function authMiddleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return token
}

// Permission matrix for role-based access control
const PERMISSIONS = {
  admin: ['*'], // Admin has all permissions
  mahasiswa: ['read:own', 'create:own', 'update:own'],
  dosen: [
    'read:own', 'update:own', 'create:own',
    'read:supervised', 'update:supervised',
    'create:grades', 'update:grades',
    'read:courses', 'update:courses'
  ],
  staff_tu: [
    'read:students', 'update:students',
    'read:letters', 'update:letters', 'create:letters',
    'read:documents', 'update:documents'
  ],
  prodi: [
    'read:students', 'update:students',
    'read:applications', 'update:applications', 'approve:applications',
    'read:letters', 'approve:letters',
    'read:courses', 'create:courses', 'update:courses',
    'read:grades', 'update:grades'
  ],
  dekan: [
    'read:faculty', 'update:faculty',
    'approve:major', 'approve:final',
    'read:budget', 'approve:budget'
  ],
  admin_keuangan: [
    'read:payments', 'update:payments', 'verify:payments',
    'read:budget', 'create:budget', 'update:budget',
    'read:expenses', 'create:expenses', 'approve:expenses'
  ],
  laboratory_admin: [
    'read:lab', 'update:lab', 'manage:equipment',
    'read:schedules', 'create:schedules', 'update:schedules'
  ],
  reading_room_admin: [
    'read:library', 'update:library',
    'read:books', 'create:books', 'update:books', 'delete:books',
    'read:borrowings', 'update:borrowings'
  ],
  admin_umum: [
    'read:general', 'update:general',
    'read:letters', 'create:letters'
  ],
  gkm: [
    'read:quality', 'update:quality',
    'read:evaluations', 'create:evaluations',
    'read:reports'
  ],
  kepala_tata_usaha: [
    'read:administration', 'update:administration',
    'manage:staff', 'approve:administrative'
  ]
}

export function hasPermission(
  role: Role | string,
  action: string,
  resource?: string,
  subRole?: string
): boolean {
  const userPermissions = PERMISSIONS[role as keyof typeof PERMISSIONS] || []

  // Admin has all permissions
  if (userPermissions.includes('*')) {
    return true
  }

  // Check sub-role specific permissions
  if (subRole) {
    const subRolePermissions = getSubRolePermissions(subRole)
    if (subRolePermissions.length > 0) {
      const permission = resource ? `${action}:${resource}` : action
      if (subRolePermissions.includes('*') || subRolePermissions.includes(permission)) {
        return true
      }
    }
  }

  // Check base role permission
  const permission = resource ? `${action}:${resource}` : action
  return userPermissions.includes(permission)
}

function getSubRolePermissions(subRole: string): string[] {
  const subRolePermissions: Record<string, string[]> = {
    'dekan': ['*'], // Dekan has all permissions
    'wakil_dekan_1': [
      'read:faculty', 'update:faculty',
      'read:curriculum', 'update:curriculum',
      'read:academic', 'update:academic',
      'approve:academic'
    ],
    'wakil_dekan_2': [
      'read:faculty', 'update:faculty',
      'read:budget', 'update:budget', 'approve:budget',
      'read:administration', 'update:administration'
    ],
    'wakil_dekan_3': [
      'read:faculty', 'update:faculty',
      'read:students', 'update:students',
      'read:student-affairs', 'update:student-affairs',
      'approve:student-affairs'
    ],
    'wakil_dekan_4': [
      'read:faculty', 'update:faculty',
      'read:cooperation', 'update:cooperation',
      'read:partnerships', 'update:partnerships',
      'approve:partnerships'
    ],
    'prodi': [
      'read:department', 'update:department',
      'read:applications', 'update:applications', 'approve:applications',
      'read:curriculum', 'update:curriculum',
      'read:students', 'update:students'
    ]
  }

  return subRolePermissions[subRole] || []
}

export function requireAuth(requiredPermission?: string) {
  return async (request: NextRequest, context: any) => {
    const token = await authMiddleware(request)

    if (token instanceof NextResponse) {
      return token // Return error response
    }

    // Check permission if specified
    if (requiredPermission && !hasPermission(token.role as string, requiredPermission)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Add user info to context
    context.user = {
      id: token.sub,
      role: token.role,
      subRole: token.subRole,
      nidn: token.nidn
    }

    return null // Continue to handler
  }
}

// Helper function to check if user owns the resource
export function isResourceOwner(userId: string, resourceUserId: string): boolean {
  return userId === resourceUserId
}

// Helper function to check if user can access student data
export function canAccessStudent(userRole: string, userId: string, studentUserId: string): boolean {
  if (hasPermission(userRole, 'read', 'students') || hasPermission(userRole, '*')) {
    return true
  }

  if (userRole === 'mahasiswa') {
    return isResourceOwner(userId, studentUserId)
  }

  return false
}