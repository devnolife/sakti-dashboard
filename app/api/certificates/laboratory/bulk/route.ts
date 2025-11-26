import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * POST /api/certificates/laboratory/bulk
 *
 * Bulk save laboratory certificates from Excel upload
 * Simplified version - only saves essential data from Excel
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is laboratory_admin
    if (session.user.role !== "laboratory_admin") {
      return NextResponse.json(
        { error: "Only laboratory admins can create certificates" },
        { status: 403 }
      );
    }

    // Get prodi from laboratory_admin
    const labAdmin = await prisma.laboratory_admins.findFirst({
      where: {
        user_id: session.user.id,
      },
      select: {
        prodi_id: true,
      },
    });

    if (!labAdmin || !labAdmin.prodi_id) {
      return NextResponse.json(
        { error: "Laboratory admin prodi not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { certificates } = body;

    if (!Array.isArray(certificates) || certificates.length === 0) {
      return NextResponse.json(
        { error: "Invalid certificates data" },
        { status: 400 }
      );
    }

    // Process each certificate - save minimal data from Excel
    const successfulCerts: string[] = [];
    const updatedCerts: string[] = [];
    const failedCerts: Array<{ id: string; error: string }> = [];

    for (const cert of certificates) {
      try {
        // Check if certificate already exists
        const existingCert = await prisma.laboratory_certificates.findUnique({
          where: {
            verification_id: cert.verificationId,
          },
        });

        // Prepare certificate data for database
        // Hanya data ESENSIAL yang dibaca dari Excel
        const certData = {
          verification_id: cert.verificationId,
          certificate_title: cert.certificateTitle,
          participant_name: cert.name,
          program_name: cert.program,
          subtitle: cert.subtitle,
          issue_date: new Date(cert.issueDate),

          // Metadata
          instructor_name:
            cert.instructorName || "Muhyiddin A.M Hayat, S.Kom., M.T",
          organization_name:
            cert.organizationName || "Laboratorium Informatika",
          month_roman: cert.monthRoman || "I",
          year_hijri: cert.yearHijri || "1446",
          year_masehi: cert.yearMasehi || new Date().getFullYear().toString(),

          // Prodi Association
          prodi_id: labAdmin.prodi_id,
          created_by: session.user.id,
        };

        if (existingCert) {
          // IMPORTANT: Preserve QR code data (verification_id & certificate number)
          // Only update certificate details, NOT the verification ID
          // This ensures QR codes remain valid even after re-generation
          await prisma.laboratory_certificates.update({
            where: {
              verification_id: cert.verificationId,
            },
            data: {
              // Update participant & program details
              certificate_title: certData.certificate_title,
              participant_name: certData.participant_name,
              program_name: certData.program_name,
              subtitle: certData.subtitle,
              issue_date: certData.issue_date,

              // Update metadata
              instructor_name: certData.instructor_name,
              organization_name: certData.organization_name,
              month_roman: certData.month_roman,
              year_hijri: certData.year_hijri,
              year_masehi: certData.year_masehi,

              // Keep existing QR code & verification data intact
              // verification_id: NOT CHANGED
              // verification_count: NOT RESET
              // qr_code_url: NOT CHANGED
              // signature: NOT CHANGED

              updated_at: new Date(),
            },
          });

          updatedCerts.push(cert.verificationId);
        } else {
          // Create new certificate
          await prisma.laboratory_certificates.create({
            data: {
              ...certData,
              verification_count: 0,
              created_at: new Date(),
              updated_at: new Date(),
            },
          });

          successfulCerts.push(cert.verificationId);
        }
      } catch (error: any) {
        console.error(
          `Failed to process certificate ${cert.verificationId}:`,
          error
        );
        failedCerts.push({
          id: cert.verificationId,
          error: error.message || "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${
        successfulCerts.length + updatedCerts.length
      } of ${certificates.length} certificates`,
      created: successfulCerts.length,
      updated: updatedCerts.length,
      failed: failedCerts.length,
      successfulIds: successfulCerts,
      updatedIds: updatedCerts,
      failedCerts: failedCerts,
      totalProcessed: certificates.length,
      note:
        updatedCerts.length > 0
          ? "Some certificates were updated. QR codes remain valid and unchanged."
          : "All certificates created successfully.",
    });
  } catch (error: any) {
    console.error("Error saving certificates:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save certificates" },
      { status: 500 }
    );
  }
}
