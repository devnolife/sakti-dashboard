import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadFileToMinio } from '@/lib/minio-client';
import { getAuthStatus } from '@/lib/auth-middleware';
import mammoth from 'mammoth';
import { TemplateAnalyzer } from '@/lib/template-analyzer';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authStatus = await getAuthStatus(request);
    if (!authStatus.isAuthenticated || !authStatus.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check role permissions (admin_umum or prodi)
    const allowedRoles = ['admin_umum', 'prodi', 'admin'];
    if (!allowedRoles.includes(authStatus.user.role)) {
      return NextResponse.json(
        { error: 'Forbidden: Only admin_umum and prodi can upload templates' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string || 'surat';
    const prodi_id = formData.get('prodi_id') as string | null;
    const is_global = formData.get('is_global') === 'true';

    // Validation
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Template name is required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.name.endsWith('.docx') && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return NextResponse.json(
        { error: 'Only .docx files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Role-specific validation for prodi users
    if (authStatus.user.role === 'prodi') {
      // Prodi users must specify their prodi and cannot create global templates
      if (is_global) {
        return NextResponse.json(
          { error: 'Prodi users cannot create global templates' },
          { status: 403 }
        );
      }

      // Get user's prodi from their profile
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

      // Ensure prodi_id matches user's prodi
      if (prodi_id && prodi_id !== userProdi.prodi_id) {
        return NextResponse.json(
          { error: 'You can only upload templates for your own prodi' },
          { status: 403 }
        );
      }
    }

    // Convert file to buffer for processing
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Analyze template using mammoth and TemplateAnalyzer
    let detectedFields = null;
    let metadata = null;

    try {
      const textResult = await mammoth.extractRawText({ arrayBuffer });
      const textContent = textResult.value;

      // Detect fields using TemplateAnalyzer
      detectedFields = TemplateAnalyzer.analyzeContent(textContent);
      metadata = TemplateAnalyzer.generateMetadata(textContent);
    } catch (analyzeError) {
      console.error('Template analysis error:', analyzeError);
      // Continue even if analysis fails
    }

    // Upload to MinIO
    const folderPrefix = is_global ? 'templates/global' : `templates/prodi/${prodi_id}`;
    const fileName = `${Date.now()}-${file.name}`;
    const minioPath = `${folderPrefix}/${fileName}`;

    const fileUrl = await uploadFileToMinio(buffer, minioPath);

    // Save to database
    const template = await prisma.template_uploads.create({
      data: {
        name,
        description: description || null,
        file_url: fileUrl,
        file_name: file.name,
        file_size: file.size,
        file_type: 'docx',
        category,
        prodi_id: is_global ? null : prodi_id,
        is_global,
        is_active: true,
        detected_fields: detectedFields as any,
        metadata: metadata as any,
        version: 1,
        uploaded_by: authStatus.user.id,
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
      message: 'Template uploaded successfully',
      data: template,
    });

  } catch (error) {
    console.error('Template upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload template', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
