import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthStatus } from '@/lib/auth-middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authStatus = await getAuthStatus(request);
    if (!authStatus.isAuthenticated || !authStatus.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const template = await prisma.template_uploads.findUnique({
      where: { id: params.id },
      select: {
        variable_mapping: true,
        prodi_id: true,
        is_global: true
      }
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (authStatus.user.role === 'prodi') {
      const userProdi = await prisma.lecturers.findUnique({
        where: { user_id: authStatus.user.id },
        select: { prodi_id: true }
      });

      if (!template.is_global && template.prodi_id !== userProdi?.prodi_id) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: template.variable_mapping || {}
    });

  } catch (error) {
    console.error('Get variables error:', error);
    return NextResponse.json(
      { error: 'Failed to get variables' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authStatus = await getAuthStatus(request);
    if (!authStatus.isAuthenticated || !authStatus.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check role permissions
    const allowedRoles = ['admin_umum', 'prodi', 'admin', 'staff_tu'];
    if (!allowedRoles.includes(authStatus.user.role)) {
      return NextResponse.json(
        { error: 'Forbidden: Only admin_umum, prodi, and staff_tu can edit templates' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { variables } = body;

    if (!variables || typeof variables !== 'object') {
      return NextResponse.json(
        { error: 'Invalid variables format' },
        { status: 400 }
      );
    }

    // Get template
    const template = await prisma.template_uploads.findUnique({
      where: { id: params.id },
      select: {
        prodi_id: true,
        is_global: true
      }
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (authStatus.user.role === 'prodi') {
      const userProdi = await prisma.lecturers.findUnique({
        where: { user_id: authStatus.user.id },
        select: { prodi_id: true }
      });

      if (template.prodi_id !== userProdi?.prodi_id) {
        return NextResponse.json(
          { error: 'Forbidden: You can only edit templates for your prodi' },
          { status: 403 }
        );
      }
    }

    // Update variable_mapping
    const updatedTemplate = await prisma.template_uploads.update({
      where: { id: params.id },
      data: {
        variable_mapping: variables
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Variables saved successfully',
      data: updatedTemplate.variable_mapping
    });

  } catch (error) {
    console.error('Save variables error:', error);
    return NextResponse.json(
      { error: 'Failed to save variables' },
      { status: 500 }
    );
  }
}
