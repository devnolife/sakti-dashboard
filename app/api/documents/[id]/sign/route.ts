import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthStatus } from '@/lib/auth-middleware';
import { generateSignatureData } from '@/lib/signature-utils';
import { generateQRCodeBuffer } from '@/lib/qrcode-generator';
import { uploadFileToMinio } from '@/lib/minio-client';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authStatus = await getAuthStatus(request);
    if (!authStatus.isAuthenticated || !authStatus.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allowedRoles = ['dekan', 'wd1', 'wd2', 'wd3', 'admin_umum', 'staff_tu', 'prodi'];
    if (!allowedRoles.includes(authStatus.user.role)) {
      return NextResponse.json(
        { error: 'Forbidden: You do not have permission to sign documents' },
        { status: 403 }
      );
    }

    const letterRequest = await prisma.letter_requests.findUnique({
      where: { id: params.id },
      include: {
        students: {
          select: {
            nim: true,
            users: { select: { name: true } }
          }
        }
      }
    });

    if (!letterRequest) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    if (letterRequest.status !== 'approved' && letterRequest.status !== 'completed') {
      return NextResponse.json(
        { error: 'Only approved documents can be signed' },
        { status: 400 }
      );
    }

    const { signature, data, qrCodeData } = generateSignatureData(
      letterRequest.id,
      letterRequest.letter_number || 'DRAFT',
      letterRequest.created_at.toISOString(),
      authStatus.user.name,
      authStatus.user.role
    );

    const qrCodeBuffer = await generateQRCodeBuffer(qrCodeData);
    const qrCodePath = `signatures/${letterRequest.id}-qr-${Date.now()}.png`;
    const qrCodeUrl = await uploadFileToMinio(qrCodeBuffer, qrCodePath);

    const updatedLetter = await prisma.letter_requests.update({
      where: { id: params.id },
      data: {
        signature,
        signature_data: data as any,
        qr_code_url: qrCodeUrl,
        signed_at: new Date(),
        signed_by: authStatus.user.id,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Document signed successfully',
      data: {
        signature,
        qrCodeUrl,
        verificationUrl: qrCodeData,
        signedAt: updatedLetter.signed_at,
        signedBy: authStatus.user.name,
      }
    });

  } catch (error) {
    console.error('Sign document error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to sign document', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const letterRequest = await prisma.letter_requests.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        letter_number: true,
        signature: true,
        qr_code_url: true,
        signed_at: true,
        signed_by: true,
        verification_count: true,
      }
    });

    if (!letterRequest) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        isSigned: !!letterRequest.signature,
        qrCodeUrl: letterRequest.qr_code_url,
        signedAt: letterRequest.signed_at,
        verificationCount: letterRequest.verification_count,
      }
    });

  } catch (error) {
    console.error('Get signature status error:', error);
    return NextResponse.json(
      { error: 'Failed to get signature status' },
      { status: 500 }
    );
  }
}