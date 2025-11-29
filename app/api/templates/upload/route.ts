import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/minio-client';
import { getAuthStatus } from '@/lib/auth-middleware';
import mammoth from 'mammoth';

// Note: TemplateAnalyzer auto-detection disabled - using manual variable editor instead

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

    // Check role permissions (admin_umum, prodi, staff_tu, or admin)
    const allowedRoles = ['admin_umum', 'prodi', 'admin', 'staff_tu'];
    if (!allowedRoles.includes(authStatus.user.role)) {
      return NextResponse.json(
        { error: 'Forbidden: Only admin_umum, prodi, and staff_tu can upload templates' },
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
    const letter_type_id = formData.get('letter_type_id') as string | null;
    const ketentuan_id = formData.get('ketentuan_id') as string | null;

    // Parse variable_mapping from wizard step 2
    const variableMappingStr = formData.get('variable_mapping') as string | null;
    let variableMapping = null;
    if (variableMappingStr) {
      try {
        variableMapping = JSON.parse(variableMappingStr);
      } catch (parseError) {
        console.error('Error parsing variable_mapping:', parseError);
        // Continue without variable mapping - not critical
      }
    }

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
        where: { user_id: authStatus.user.userId },
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

    // Note: Auto-detection disabled - variables are now defined manually via Variable Editor
    // Just extract basic metadata (word count, etc.) if needed
    let metadata = null;

    try {
      // Extract raw text for basic info only
      const textResult = await mammoth.extractRawText({ buffer });
      const textContent = textResult.value;

      // Basic metadata with letter type id
      metadata = {
        wordCount: textContent.split(/\s+/).filter(Boolean).length,
        hasVariablePlaceholders: /\{\{[^}]+\}\}|\$\{[^}]+\}/.test(textContent),
        extractedAt: new Date().toISOString(),
        letter_type_id: letter_type_id || null
      };
    } catch (analyzeError) {
      console.error('Template metadata extraction error:', analyzeError);
      // Continue even if extraction fails - not critical
      metadata = {
        letter_type_id: letter_type_id || null
      };
    }

    // Upload to MinIO
    const folderPrefix = is_global ? 'templates/global' : `templates/prodi/${prodi_id || 'general'}`;
    const fileName = `${Date.now()}-${file.name}`;
    const minioPath = `${folderPrefix}/${fileName}`;

    const fileUrl = await uploadFile(buffer, minioPath, file.type);

    // Build data object for Prisma
    const createData: any = {
      name,
      description: description || null,
      file_url: fileUrl,
      file_name: file.name,
      file_size: file.size,
      file_type: 'docx',
      category,
      is_global,
      is_active: true,
      detected_fields: null, // Variables defined manually via Variable Editor
      variable_mapping: variableMapping as any, // From wizard step 2
      metadata: metadata as any,
      version: 1,
      uploader: {
        connect: { id: authStatus.user.userId }
      },
    };

    // Add prodi relation only if prodi_id is provided and not global
    if (!is_global && prodi_id) {
      createData.prodi = {
        connect: { kode: prodi_id }
      };
    }

    // Add ketentuan relation if ketentuan_id is provided
    if (ketentuan_id) {
      createData.ketentuan = {
        connect: { id: parseInt(ketentuan_id) }
      };
    }

    // Save to database
    const template = await prisma.template_uploads.create({
      data: createData,
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
