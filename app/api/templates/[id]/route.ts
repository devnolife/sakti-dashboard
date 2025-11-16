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
          { error: 'Forbidden: You can only access templates for your prodi' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: template,
    });

  } catch (error) {
    console.error('Template fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const allowedRoles = ['admin_umum', 'prodi', 'admin'];
    if (!allowedRoles.includes(authStatus.user.role)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, is_active, category } = body;

    // Fetch existing template
    const existingTemplate = await prisma.template_uploads.findUnique({
      where: { id: params.id }
    });

    if (!existingTemplate) {
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

      if (existingTemplate.prodi_id !== userProdi?.prodi_id) {
        return NextResponse.json(
          { error: 'Forbidden: You can only update templates for your prodi' },
          { status: 403 }
        );
      }
    }

    // Update template
    const updatedTemplate = await prisma.template_uploads.update({
      where: { id: params.id },
      data: {
        name: name || existingTemplate.name,
        description: description !== undefined ? description : existingTemplate.description,
        is_active: is_active !== undefined ? is_active : existingTemplate.is_active,
        category: category || existingTemplate.category,
      },
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
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Template updated successfully',
      data: updatedTemplate,
    });

  } catch (error) {
    console.error('Template update error:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const allowedRoles = ['admin_umum', 'prodi', 'admin'];
    if (!allowedRoles.includes(authStatus.user.role)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Fetch existing template
    const existingTemplate = await prisma.template_uploads.findUnique({
      where: { id: params.id }
    });

    if (!existingTemplate) {
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

      if (existingTemplate.prodi_id !== userProdi?.prodi_id) {
        return NextResponse.json(
          { error: 'Forbidden: You can only delete templates for your prodi' },
          { status: 403 }
        );
      }
    }

    // Soft delete: set is_active to false
    await prisma.template_uploads.update({
      where: { id: params.id },
      data: { is_active: false }
    });

    return NextResponse.json({
      success: true,
      message: 'Template deleted successfully',
    });

  } catch (error) {
    console.error('Template delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}
