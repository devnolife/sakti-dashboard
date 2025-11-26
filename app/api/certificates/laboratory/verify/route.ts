import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decryptCertificateData } from "@/lib/certificate-crypto";

/**
 * POST /api/certificates/laboratory/verify
 *
 * Verify laboratory certificate using encrypted data from QR code
 * Decrypts the data and looks up certificate in database
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { encryptedData } = body;

    if (!encryptedData || typeof encryptedData !== "string") {
      return NextResponse.json(
        { error: "Invalid encrypted data" },
        { status: 400 }
      );
    }

    // Decrypt the data to get certificate ID
    const decryptedData = decryptCertificateData(encryptedData);

    if (!decryptedData || !decryptedData.certificateId) {
      return NextResponse.json(
        {
          error: "Failed to decrypt certificate data",
          valid: false,
        },
        { status: 400 }
      );
    }

    const certificateId = decryptedData.certificateId;

    // Look up certificate in database
    const certificate = await prisma.laboratory_certificates.findUnique({
      where: {
        verification_id: certificateId,
      },
      select: {
        verification_id: true,
        certificate_title: true,
        participant_name: true,
        program_name: true,
        subtitle: true,
        issue_date: true,
        instructor_name: true,
        organization_name: true,
        month_roman: true,
        year_hijri: true,
        year_masehi: true,
        verification_count: true,
        created_at: true,
        prodi: {
          select: {
            nama: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        {
          error: "Certificate not found",
          valid: false,
          certificateId,
        },
        { status: 404 }
      );
    }

    // Increment verification count
    await prisma.laboratory_certificates.update({
      where: {
        verification_id: certificateId,
      },
      data: {
        verification_count: {
          increment: 1,
        },
        last_verified_at: new Date(),
      },
    });

    // Return certificate data
    return NextResponse.json({
      valid: true,
      certificate: {
        verificationId: certificate.verification_id,
        certificateTitle: certificate.certificate_title,
        participantName: certificate.participant_name,
        programName: certificate.program_name,
        subtitle: certificate.subtitle,
        issueDate: certificate.issue_date,
        instructorName: certificate.instructor_name,
        organizationName: certificate.organization_name,
        monthRoman: certificate.month_roman,
        yearHijri: certificate.year_hijri,
        yearMasehi: certificate.year_masehi,
        verificationCount: certificate.verification_count + 1,
        createdAt: certificate.created_at,
        prodi: certificate.prodi?.nama || "Unknown",
      },
    });
  } catch (error: any) {
    console.error("Error verifying certificate:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to verify certificate",
        valid: false,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/certificates/laboratory/verify?encryptedData={data}
 *
 * Alternative GET endpoint for verification (for direct URL access)
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const encryptedData = searchParams.get("encryptedData");

    if (!encryptedData) {
      return NextResponse.json(
        { error: "Missing encrypted data parameter" },
        { status: 400 }
      );
    }

    // Use the same logic as POST
    const decryptedData = decryptCertificateData(encryptedData);

    if (!decryptedData || !decryptedData.certificateId) {
      return NextResponse.json(
        {
          error: "Failed to decrypt certificate data",
          valid: false,
        },
        { status: 400 }
      );
    }

    const certificateId = decryptedData.certificateId;

    const certificate = await prisma.laboratory_certificates.findUnique({
      where: {
        verification_id: certificateId,
      },
      select: {
        verification_id: true,
        certificate_title: true,
        participant_name: true,
        program_name: true,
        subtitle: true,
        issue_date: true,
        instructor_name: true,
        organization_name: true,
        month_roman: true,
        year_hijri: true,
        year_masehi: true,
        verification_count: true,
        created_at: true,
        prodi: {
          select: {
            nama: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        {
          error: "Certificate not found",
          valid: false,
          certificateId,
        },
        { status: 404 }
      );
    }

    // Increment verification count
    await prisma.laboratory_certificates.update({
      where: {
        verification_id: certificateId,
      },
      data: {
        verification_count: {
          increment: 1,
        },
        last_verified_at: new Date(),
      },
    });

    return NextResponse.json({
      valid: true,
      certificate: {
        verificationId: certificate.verification_id,
        certificateTitle: certificate.certificate_title,
        participantName: certificate.participant_name,
        programName: certificate.program_name,
        subtitle: certificate.subtitle,
        issueDate: certificate.issue_date,
        instructorName: certificate.instructor_name,
        organizationName: certificate.organization_name,
        monthRoman: certificate.month_roman,
        yearHijri: certificate.year_hijri,
        yearMasehi: certificate.year_masehi,
        verificationCount: certificate.verification_count + 1,
        createdAt: certificate.created_at,
        prodi: certificate.prodi?.nama || "Unknown",
      },
    });
  } catch (error: any) {
    console.error("Error verifying certificate:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to verify certificate",
        valid: false,
      },
      { status: 500 }
    );
  }
}
