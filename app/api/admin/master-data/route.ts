import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth-middleware'

// GET - Fetch all master data
export async function GET(req: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch programs (prodi)
    const programs = await prisma.prodi.findMany({
      orderBy: { nama: 'asc' }
    })

    // Format response
    const formattedPrograms = programs.map((p) => ({
      id: p.kode,
      code: p.kode,
      name: p.nama,
      status: 'active' as const,
      created_at: p.created_at.toISOString(),
      updated_at: p.updated_at.toISOString(),
      fakultas: p.fakultas,
      jenjang: p.jenjang,
      akreditasi: p.akreditasi,
    }))

    return NextResponse.json({
      programs: formattedPrograms,
      faculties: [], // TODO: Add faculties when model exists
    })
  } catch (error) {
    console.error('Error fetching master data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

