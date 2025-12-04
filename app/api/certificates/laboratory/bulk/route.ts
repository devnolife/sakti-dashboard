import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadCertificatePDFFromBase64 } from "@/lib/certificate-upload";

/**
 * POST /api/certificates/laboratory/bulk
 *
 * Bulk save laboratory certificates from Excel upload
 * Now includes automatic PDF upload to MinIO storage
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

    // Process each certificate - save data + upload PDF to MinIO
    const successfulCerts: string[] = [];
    const updatedCerts: string[] = [];
    const skippedCerts: string[] = [];
    const failedCerts: Array<{ id: string; error: string }> = [];

    // Get highest certificate number for generating new numbers
    const allCerts = await prisma.laboratory_certificates.findMany({
      select: { verification_id: true },
      orderBy: { created_at: "desc" },
    });

    let highestNumber = 0;
    for (const c of allCerts) {
      const match = c.verification_id.match(/^(\d{3})\//);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > highestNumber) highestNumber = num;
      }
    }
    let nextNumber = highestNumber + 1;

    for (const cert of certificates) {
      try {
        // Normalize data for composite key matching (trim whitespace, case-insensitive)
        const normalizedNim = (cert.nim || "").toString().trim();
        const normalizedProgram = (cert.program || "").toString().trim();
        const normalizedTitle = (cert.certificateTitle || "").toString().trim();

        // STRATEGY: Check by COMPOSITE KEY (NIM + Program + Certificate Title)
        // This allows one student to have MULTIPLE certificates from different labs/programs
        const existingCertByComposite =
          await prisma.laboratory_certificates.findFirst({
            where: {
              participant_nim: normalizedNim,
              program_name: normalizedProgram,
              certificate_title: normalizedTitle,
              prodi_id: labAdmin.prodi_id,
            },
          });

        if (existingCertByComposite) {
          console.log(`✅ FOUND existing certificate:`, {
            id: existingCertByComposite.verification_id,
            currentName: existingCertByComposite.participant_name,
            newName: cert.name,
          });
        } else {
          console.log(`❌ NO existing certificate found - will create new`);

          // Debug: Check if similar certificate exists with different composite key values
          const similarCerts = await prisma.laboratory_certificates.findMany({
            where: {
              OR: [
                { participant_nim: normalizedNim },
                {
                  participant_name: {
                    contains: cert.name,
                    mode: "insensitive",
                  },
                },
              ],
              prodi_id: labAdmin.prodi_id,
            },
            select: {
              verification_id: true,
              participant_nim: true,
              participant_name: true,
              program_name: true,
              certificate_title: true,
            },
            take: 5,
          });

          if (similarCerts.length > 0) {
            console.log(
              `🔎 Found ${similarCerts.length} similar certificates:`
            );
          }
        }

        // DECISION LOGIC:
        // 1. If (NIM + Program + Title) exists → UPDATE (fix typo/data, preserve certificate number & QR code)
        // 2. If not exists → CREATE NEW with next available certificate number

        if (existingCertByComposite) {
          // Case 1: Same NIM + Program + Title → UPDATE existing certificate (fix typo/data)
          console.log(
            `📝 Updating certificate for NIM ${cert.nim} - ${cert.certificateTitle} (Preserve number: ${existingCertByComposite.verification_id})`
          );

          // Check if data actually changed (prevent unnecessary updates)
          const hasChanges =
            existingCertByComposite.participant_name !== cert.name ||
            existingCertByComposite.subtitle !== (cert.subtitle || null);

          if (!hasChanges) {
            console.log(
              `⏭️ Skipping update for ${existingCertByComposite.verification_id} - No changes detected`
            );
            skippedCerts.push(existingCertByComposite.verification_id);
            continue; // Skip if no changes
          }

          // Upload PDF to MinIO if provided (use existing verification_id for update)
          let pdfUrl: string | null = null;

          if (cert.pdfBase64) {
            try {
              pdfUrl = await uploadCertificatePDFFromBase64(
                cert.pdfBase64,
                existingCertByComposite.verification_id, // Use existing number
                cert.name
              );
              console.log(
                `✅ PDF uploaded for ${existingCertByComposite.verification_id}`
              );
            } catch (uploadError: any) {
              console.error(
                `⚠️ Failed to upload PDF for ${existingCertByComposite.verification_id}:`,
                uploadError
              );
            }
          }

          // Prepare certificate data for database
          // Parse issue date
          let parsedIssueDate: Date;
          try {
            parsedIssueDate = new Date(cert.issueDate);
            if (isNaN(parsedIssueDate.getTime())) {
              parsedIssueDate = new Date();
            }
          } catch (e) {
            parsedIssueDate = new Date();
          }

          // UPDATE EXISTING CERTIFICATE (Fix typo/data, preserve certificate number & QR)
          await prisma.laboratory_certificates.update({
            where: {
              id: existingCertByComposite.id,
            },
            data: {
              // Update changeable fields
              participant_name: cert.name,
              subtitle: cert.subtitle || null,
              issue_date: parsedIssueDate,

              // Update PDF URL if new PDF is uploaded
              ...(pdfUrl && { pdf_url: pdfUrl }),

              // PRESERVE: verification_id, QR code, signature, verification_count
              // participant_nim, program_name, certificate_title (composite key)

              updated_at: new Date(),
            },
          });

          updatedCerts.push(existingCertByComposite.verification_id);
          console.log(
            `✅ Updated certificate ${existingCertByComposite.verification_id} for NIM ${cert.nim} - ${cert.certificateTitle}`
          );
        } else {
          // Case 2: NEW CERTIFICATE (composite key not found)
          // Generate new certificate number
          const certNumber = nextNumber++;
          const no = String(certNumber).padStart(3, "0");

          // Extract month, year from cert data
          const monthRoman = cert.monthRoman || "I";
          const fullHijri = cert.yearHijri || "1446";
          const hijri = fullHijri.slice(-2);
          const masehi = cert.yearMasehi || new Date().getFullYear().toString();

          const newVerificationId = `${no}/IF/20222/A.5-II/${monthRoman}/${hijri}/${masehi}`;

          console.log(
            `✨ Creating NEW certificate for NIM ${cert.nim} - ${cert.certificateTitle} (Number: ${newVerificationId})`
          );

          // Upload PDF to MinIO if provided (use new verification_id)
          let pdfUrl: string | null = null;

          if (cert.pdfBase64) {
            try {
              pdfUrl = await uploadCertificatePDFFromBase64(
                cert.pdfBase64,
                newVerificationId,
                cert.name
              );
              console.log(`✅ PDF uploaded for ${newVerificationId}`);
            } catch (uploadError: any) {
              console.error(
                `⚠️ Failed to upload PDF for ${newVerificationId}:`,
                uploadError
              );
            }
          }

          // Parse issue date
          let parsedIssueDate: Date;
          try {
            parsedIssueDate = new Date(cert.issueDate);
            if (isNaN(parsedIssueDate.getTime())) {
              parsedIssueDate = new Date();
            }
          } catch (e) {
            parsedIssueDate = new Date();
          }

          // CREATE NEW CERTIFICATE
          await prisma.laboratory_certificates.create({
            data: {
              verification_id: newVerificationId,
              certificate_title: normalizedTitle,
              participant_name: cert.name,
              participant_nim: normalizedNim,
              program_name: normalizedProgram,
              subtitle: cert.subtitle || null,
              issue_date: parsedIssueDate,
              pdf_url: pdfUrl,
              prodi_id: labAdmin.prodi_id,
              created_by: session.user.id,
              verification_count: 0,
              weekly_data: [],
              technologies: [],
              created_at: new Date(),
              updated_at: new Date(),
            },
          });

          successfulCerts.push(newVerificationId);
          console.log(
            `✅ Created new certificate ${newVerificationId} for NIM ${cert.nim} - ${cert.certificateTitle}`
          );
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
      skipped: skippedCerts.length,
      failed: failedCerts.length,
      successfulIds: successfulCerts,
      updatedIds: updatedCerts,
      skippedIds: skippedCerts,
      failedCerts: failedCerts,
      totalProcessed: certificates.length,
      note:
        updatedCerts.length > 0
          ? `${updatedCerts.length} certificates updated (name/data fixed). Certificate numbers & QR codes preserved. ${skippedCerts.length} skipped (no changes).`
          : skippedCerts.length > 0
          ? `${skippedCerts.length} certificates skipped (no changes detected).`
          : "All certificates created successfully with auto-generated numbers.",
    });
  } catch (error: any) {
    console.error("Error saving certificates:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save certificates" },
      { status: 500 }
    );
  }
}
