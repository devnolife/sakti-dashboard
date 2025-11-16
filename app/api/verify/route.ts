import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyQRCodeData } from '@/lib/signature-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const encodedData = searchParams.get('data');
    const signature = searchParams.get('signature');

    if (!encodedData || !signature) {
      return NextResponse.json(
        { error: 'Missing verification parameters' },
        { status: 400 }
      );
    }

    const verification = verifyQRCodeData(encodedData, signature);

    if (!verification.valid) {
      return NextResponse.json({
        success: false,
        error: verification.error,
      });
    }

    const document = await prisma.letter_requests.findUnique({
      where: { id: verification.data!.documentId },
      include: {
        students: {
          select: {
            nim: true,
            users: {
              select: { name: true }
            }
          }
        }
      }
    });

    if (!document) {
      return NextResponse.json({
        success: false,
        error: 'Document not found in database',
      });
    }

    await prisma.signature_verifications.create({
      data: {
        letter_request_id: document.id,
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
        is_valid: true,
      }
    });

    await prisma.letter_requests.update({
      where: { id: document.id },
      data: {
        verification_count: {
          increment: 1
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        documentNumber: document.letter_number,
        issueDate: document.created_at,
        studentName: document.students?.users.name,
        studentNim: document.students?.nim,
        status: document.status,
        signedBy: verification.data!.signerName,
        signedAt: new Date(verification.data!.timestamp),
        verificationCount: document.verification_count + 1,
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}