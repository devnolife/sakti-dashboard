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

    // Verify signature using HMAC-SHA256
    const verification = verifyQRCodeData(encodedData, signature);

    if (!verification.valid) {
      return NextResponse.json({
        success: false,
        error: verification.error,
      });
    }

    // Find certificate in database using verification_id
    const certificate = await prisma.laboratory_certificates.findUnique({
      where: { verification_id: verification.data!.documentNumber },
      include: {
        prodi: {
          select: {
            kode: true,
            nama: true
          }
        }
      }
    });

    if (!certificate) {
      return NextResponse.json({
        success: false,
        error: 'Certificate not found in database',
      });
    }

    // Increment verification count
    await prisma.laboratory_certificates.update({
      where: { id: certificate.id },
      data: {
        verification_count: {
          increment: 1
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        verificationId: certificate.verification_id,
        certificateTitle: certificate.certificate_title,
        participantName: certificate.participant_name,
        programName: certificate.program_name,
        issueDate: certificate.issue_date,
        overallGrade: certificate.overall_grade,
        prodiName: certificate.prodi.nama,
        signedBy: certificate.signed_by,
        signedAt: certificate.signed_at,
        verificationCount: certificate.verification_count + 1,
        isValid: true,
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
