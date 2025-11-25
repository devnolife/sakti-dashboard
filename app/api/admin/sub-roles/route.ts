import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth-middleware'

// Define sub roles sebagai reference data
const SUB_ROLES = [
  {
    id: '1',
    code: 'wakil_dekan_1',
    displayName: 'Wakil Dekan I',
    description: 'Wakil Dekan Bidang Akademik',
    parentRole: 'dekan',
    isActive: true,
  },
  {
    id: '2',
    code: 'wakil_dekan_2',
    displayName: 'Wakil Dekan II',
    description: 'Wakil Dekan Bidang Umum & Keuangan',
    parentRole: 'dekan',
    isActive: true,
  },
  {
    id: '3',
    code: 'wakil_dekan_3',
    displayName: 'Wakil Dekan III',
    description: 'Wakil Dekan Bidang Kemahasiswaan',
    parentRole: 'dekan',
    isActive: true,
  },
  {
    id: '4',
    code: 'wakil_dekan_4',
    displayName: 'Wakil Dekan IV',
    description: 'Wakil Dekan Bidang Kerjasama',
    parentRole: 'dekan',
    isActive: true,
  },
  {
    id: '5',
    code: 'sekretaris_prodi',
    displayName: 'Sekretaris Prodi',
    description: 'Sekretaris Program Studi',
    parentRole: 'prodi',
    isActive: true,
  },
  {
    id: '6',
    code: 'koordinator_prodi',
    displayName: 'Koordinator Prodi',
    description: 'Koordinator Program Studi',
    parentRole: 'prodi',
    isActive: true,
  },
]

// Storage untuk sub roles tambahan (di production sebaiknya pakai database)
let customSubRoles: any[] = []

// GET - Get all sub roles
export async function GET(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const parentRole = searchParams.get('parentRole')

    let subRoles = [...SUB_ROLES, ...customSubRoles]

    // Filter by parent role if specified
    if (parentRole) {
      subRoles = subRoles.filter(sr => sr.parentRole === parentRole)
    }

    // Get user counts from database (simplified - just return 0 for now)
    const subRolesWithCounts = subRoles.map(sr => ({
      ...sr,
      userCount: 0, // TODO: Count from users table where sub_role = sr.code
      createdAt: '2024-01-01',
    }))

    return NextResponse.json({
      success: true,
      data: subRolesWithCounts
    })
  } catch (error) {
    console.error('Error fetching sub roles:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new sub role
export async function POST(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { code, displayName, description, parentRole, isActive } = body

    // Validate required fields
    if (!code || !displayName || !parentRole) {
      return NextResponse.json(
        { error: 'Code, displayName, and parentRole are required' },
        { status: 400 }
      )
    }

    // Check if code already exists
    const allSubRoles = [...SUB_ROLES, ...customSubRoles]
    if (allSubRoles.some(sr => sr.code === code)) {
      return NextResponse.json(
        { error: 'Sub role code already exists' },
        { status: 400 }
      )
    }

    // Create new sub role
    const newSubRole = {
      id: `custom-${Date.now()}`,
      code,
      displayName,
      description: description || '',
      parentRole,
      isActive: isActive !== false,
      createdAt: new Date().toISOString(),
    }

    customSubRoles.push(newSubRole)

    return NextResponse.json({
      success: true,
      message: 'Sub role created successfully',
      data: newSubRole
    })
  } catch (error) {
    console.error('Error creating sub role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
