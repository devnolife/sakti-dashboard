import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthStatus } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    const authStatus = await getAuthStatus(request);
    if (!authStatus.isAuthenticated || !authStatus.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const prodi = await prisma.prodi.findMany({
      select: {
        kode: true,
        nama: true,
        jenjang: true,
        fakultas: true,
      },
      orderBy: {
        nama: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: prodi,
    });

  } catch (error) {
    console.error('Prodi fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prodi' },
      { status: 500 }
    );
  }
}
