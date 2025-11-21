import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export interface DecodedToken {
  [x: string]: any
  userId: string
  username: string
  role: string
  subRole?: string
  prodi_id?: string
  iat: number
  exp: number
}

/**
 * Middleware to verify JWT token from Authorization header
 */
export async function authMiddleware(request: NextRequest): Promise<DecodedToken | NextResponse> {
  try {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken
      return decoded
    } catch (jwtError: any) {
      if (jwtError.name === 'TokenExpiredError') {
        return NextResponse.json({ error: 'Token expired' }, { status: 401 })
      }
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * Role-based permission checking
 */
export function hasPermission(role: string, action: string, resource: string): boolean {
  // Admin has full access to everything
  if (role === 'admin') {
    return true
  }

  // Define permissions for each role
  const permissions: Record<string, Record<string, string[]>> = {
    dekan: {
      read: ['users', 'system_config', 'master_data', 'reports', 'audit_logs'],
      update: ['users'],
      create: [],
      delete: []
    },
    prodi: {
      read: ['users', 'master_data', 'reports'],
      update: ['users'],
      create: [],
      delete: []
    },
    staff_tu: {
      read: ['users', 'reports'],
      update: [],
      create: [],
      delete: []
    },
    admin_umum: {
      read: ['users', 'document_templates', 'notifications', 'master_data'],
      update: ['document_templates', 'notifications'],
      create: ['document_templates', 'notifications'],
      delete: ['document_templates']
    },
    admin_keuangan: {
      read: ['users', 'reports', 'payments'],
      update: ['payments'],
      create: [],
      delete: []
    }
  }

  const rolePermissions = permissions[role]
  if (!rolePermissions) {
    return false
  }

  const actionPermissions = rolePermissions[action]
  if (!actionPermissions) {
    return false
  }

  return actionPermissions.includes(resource)
}

/**
 * Check if user has specific role
 */
export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole) || userRole === 'admin'
}

/**
 * Extract user ID from request
 */
export async function getUserId(request: NextRequest): Promise<string | null> {
  const token = await authMiddleware(request)
  if (token instanceof NextResponse) {
    return null
  }
  return token.userId
}

/**
 * Verify authentication and return user info
 * Returns { authenticated: boolean, user?: DecodedToken }
 */
export async function verifyAuth(request: NextRequest): Promise<{
  authenticated: boolean
  user?: DecodedToken
}> {
  try {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { authenticated: false }
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken
      return { authenticated: true, user: decoded }
    } catch (jwtError: any) {
      console.error('JWT verification error:', jwtError.message)
      return { authenticated: false }
    }
  } catch (error) {
    console.error('Auth verification error:', error)
    return { authenticated: false }
  }
}

/**
 * Get authentication status with user info
 * Alias for verifyAuth with clearer naming
 */
export async function getAuthStatus(request: NextRequest): Promise<{
  isAuthenticated: boolean
  user?: DecodedToken
}> {
  const result = await verifyAuth(request)
  return {
    isAuthenticated: result.authenticated,
    user: result.user
  }
}
