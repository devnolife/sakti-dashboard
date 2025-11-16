import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthStatus } from '@/lib/auth-middleware';
import mammoth from 'mammoth';

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

    // Get template from database
    const template = await prisma.template_uploads.findUnique({
      where: { id: params.id },
      include: {
        prodi: {
          select: {
            kode: true,
            nama: true,
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

    // Download DOCX file from MinIO URL
    const fileResponse = await fetch(template.file_url);
    if (!fileResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to download template file' },
        { status: 500 }
      );
    }

    const arrayBuffer = await fileResponse.arrayBuffer();

    // Convert DOCX to HTML with style mappings
    const htmlResult = await mammoth.convertToHtml(
      { arrayBuffer },
      {
        styleMap: [
          "p[style-name='Title'] => h1:fresh",
          "p[style-name='Heading 1'] => h2:fresh",
          "p[style-name='Heading 2'] => h3:fresh",
          "r[style-name='Strong'] => strong",
          "p[style-name='Normal'] => p:fresh"
        ]
      }
    );

    // Extract raw text
    const textResult = await mammoth.extractRawText({ arrayBuffer });

    return NextResponse.json({
      success: true,
      data: {
        html: htmlResult.value,
        rawText: textResult.value,
        detectedFields: template.detected_fields,
        variableMapping: template.variable_mapping || null,
      }
    });

  } catch (error) {
    console.error('Template preview error:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}