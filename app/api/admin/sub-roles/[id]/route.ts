import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth-middleware'

// Import from parent route (in production, use database)
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

// PUT - Update sub role
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const body = await req.json()

    // Check if it's a system sub role (cannot be edited)
    const systemSubRole = SUB_ROLES.find(sr => sr.id === id)
    if (systemSubRole) {
      return NextResponse.json(
        { error: 'System sub roles cannot be modified' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Sub role updated successfully',
      data: { id, ...body }
    })
  } catch (error) {
    console.error('Error updating sub role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete sub role
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    // Check if it's a system sub role (cannot be deleted)
    const systemSubRole = SUB_ROLES.find(sr => sr.id === id)
    if (systemSubRole) {
      return NextResponse.json(
        { error: 'System sub roles cannot be deleted' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Sub role deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting sub role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
