import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthStatus } from '@/lib/auth-middleware';
import mammoth from 'mammoth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authStatus = await getAuthStatus(request);
    if (!authStatus.isAuthenticated || !authStatus.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get template from database
    const template = await prisma.template_uploads.findUnique({
      where: { id },
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
    // Convert relative URL to absolute URL
    const fileUrl = template.file_url.startsWith('http')
      ? template.file_url
      : `${request.nextUrl.origin}${template.file_url}`;

    console.log('Fetching file from:', fileUrl);

    let fileResponse;
    try {
      fileResponse = await fetch(fileUrl);
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch template file', details: fetchError instanceof Error ? fetchError.message : 'Network error' },
        { status: 500 }
      );
    }

    if (!fileResponse.ok) {
      console.error('File response not ok:', fileResponse.status, fileResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to download template file', status: fileResponse.status },
        { status: 500 }
      );
    }

    let arrayBuffer;
    try {
      arrayBuffer = await fileResponse.arrayBuffer();
    } catch (bufferError) {
      console.error('Buffer error:', bufferError);
      return NextResponse.json(
        { error: 'Failed to read file buffer' },
        { status: 500 }
      );
    }

    // Convert ArrayBuffer to Buffer for mammoth
    const buffer = Buffer.from(arrayBuffer);

    let htmlResult;
    try {
      // Convert DOCX to HTML with enhanced style mappings
      htmlResult = await mammoth.convertToHtml(
        { buffer },
        {
          styleMap: [
            // Document Title - centered, large, bold
            "p[style-name='Title'] => h1.text-3xl.font-bold.text-center.mb-6.mt-4:fresh",
            "p[style-name='Subtitle'] => h2.text-xl.font-semibold.text-center.mb-4.text-gray-600:fresh",

            // Headings - hierarchical styling
            "p[style-name='Heading 1'] => h2.text-2xl.font-bold.mt-6.mb-3.border-b.border-gray-300.pb-2:fresh",
            "p[style-name='Heading 2'] => h3.text-xl.font-bold.mt-5.mb-2:fresh",
            "p[style-name='Heading 3'] => h4.text-lg.font-semibold.mt-4.mb-2:fresh",
            "p[style-name='Heading 4'] => h5.text-base.font-semibold.mt-3.mb-1:fresh",

            // Body text - proper spacing and line height
            "p[style-name='Normal'] => p.mb-3.leading-relaxed.text-justify:fresh",
            "p[style-name='Body Text'] => p.mb-3.leading-relaxed:fresh",

            // Lists
            "p[style-name='List Paragraph'] => p.ml-6.mb-2:fresh",

            // Special formatting
            "r[style-name='Strong'] => strong.font-bold",
            "r[style-name='Emphasis'] => em.italic",
            "p[style-name='Quote'] => blockquote.border-l-4.border-primary.pl-4.italic.my-4.text-gray-700:fresh",

            // Alignment
            "p[style-name='align-center'] => p.text-center:fresh",
            "p[style-name='align-right'] => p.text-right:fresh",
          ],
          includeDefaultStyleMap: true,
          convertImage: mammoth.images.imgElement((image) => {
            return image.read("base64").then((imageBuffer) => {
              return {
                src: `data:${image.contentType};base64,${imageBuffer}`,
              };
            });
          }),
        }
      );
    } catch (mammothError) {
      console.error('Mammoth conversion error:', mammothError);
      return NextResponse.json(
        { error: 'Failed to convert DOCX to HTML', details: mammothError instanceof Error ? mammothError.message : 'Unknown error' },
        { status: 500 }
      );
    }

    // Extract raw text
    let textResult;
    try {
      textResult = await mammoth.extractRawText({ buffer });
    } catch (textError) {
      console.error('Text extraction error:', textError);
      textResult = { value: '' };
    }

    return NextResponse.json({
      html: htmlResult.value,
      rawText: textResult.value,
      detectedFields: template.detected_fields,
      variableMapping: template.variable_mapping || {},
    });

  } catch (error) {
    console.error('Template preview error:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
