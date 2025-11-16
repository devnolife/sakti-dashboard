import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthStatus } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authStatus = await getAuthStatus(request);
    if (!authStatus.isAuthenticated || !authStatus.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const prodi_id = searchParams.get('prodi_id');
    const is_global = searchParams.get('is_global');
    const is_active = searchParams.get('is_active');

    // Build where clause
    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (is_active !== null && is_active !== undefined) {
      where.is_active = is_active === 'true';
    } else {
      where.is_active = true; // Default to active only
    }

    // Role-based filtering
    if (authStatus.user.role === 'prodi') {
      // Prodi users can only see their own prodi templates + global templates
      const userProdi = await prisma.lecturers.findUnique({
        where: { user_id: authStatus.user.id },
        select: { prodi_id: true }
      });

      if (!userProdi?.prodi_id) {
        return NextResponse.json(
          { error: 'User prodi not found' },
          { status: 400 }
        );
      }

      where.OR = [
        { is_global: true },
        { prodi_id: userProdi.prodi_id }
      ];
    } else if (authStatus.user.role === 'admin_umum' || authStatus.user.role === 'admin') {
      // Admin umum can filter by prodi or global
      if (is_global !== null && is_global !== undefined) {
        where.is_global = is_global === 'true';
      }
      if (prodi_id && prodi_id !== 'all') {
        where.prodi_id = prodi_id;
      }
    } else {
      // Other roles: only show global templates
      where.is_global = true;
    }

    // Fetch templates
    const templates = await prisma.template_uploads.findMany({
      where,
      include: {
        prodi: {
          select: {
            kode: true,
            nama: true,
          }
        },
        uploader: {
          select: {
            id: true,
            name: true,
            role: true,
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: templates,
      count: templates.length,
    });

  } catch (error) {
    console.error('Template fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
