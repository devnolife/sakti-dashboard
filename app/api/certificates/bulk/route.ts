import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { generateCertificatePDF, generatePDFPassword } from "@/lib/pdf-generator"
import { uploadFile } from "@/lib/minio-client"
import { generateSignatureData, type DocumentSignature } from "@/lib/signature-utils"
import QRCode from 'qrcode'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if user is laboratory_admin
    if (session.user.role !== "laboratory_admin") {
      return NextResponse.json(
        { error: "Only laboratory admins can create certificates" },
        { status: 403 }
      )
    }

    // Get prodi from laboratory_admin
    const labAdmin = await prisma.laboratory_admins.findFirst({
      where: {
        user_id: session.user.id
      },
      select: {
        prodi_id: true
      }
    })

    if (!labAdmin || !labAdmin.prodi_id) {
      return NextResponse.json(
        { error: "Laboratory admin prodi not found" },
        { status: 404 }
      )
    }

    const body = await req.json()
    const { certificates } = body

    if (!Array.isArray(certificates) || certificates.length === 0) {
      return NextResponse.json(
        { error: "Invalid certificates data" },
        { status: 400 }
      )
    }

    // Process each certificate: generate PDF, upload to MinIO, then save to DB
    const successfulCerts: string[] = []
    const failedCerts: string[] = []

    for (const cert of certificates) {
      try {
        // Generate unique password for this certificate
        const pdfPassword = generatePDFPassword()

        // Generate PDF with digital signature protection
        const pdfBuffer = await generateCertificatePDF(cert, pdfPassword)

        // Upload PDF to MinIO
        const fileName = `certificate-${cert.verificationId}.pdf`
        const pdfUrl = await uploadFile(pdfBuffer, fileName, 'application/pdf')

        // Generate Digital Signature (HMAC-SHA256)
        const signaturePayload: DocumentSignature = {
          documentId: cert.verificationId, // Using verification_id as document ID
          documentNumber: cert.verificationId,
          issueDate: cert.issueDate,
          signerName: session.user.name || "Laboratory Admin",
          signerRole: "laboratory_admin",
          timestamp: Date.now(),
        }

        const signatureData = generateSignatureData(
          cert.verificationId,
          cert.verificationId,
          cert.issueDate,
          session.user.name || "Laboratory Admin",
          "laboratory_admin"
        )

        // Generate QR Code for signature verification
        const qrCodeBuffer = await QRCode.toBuffer(signatureData.qrCodeData, {
          width: 300,
          margin: 2,
          errorCorrectionLevel: 'M'
        })

        // Upload QR Code to MinIO
        const qrFileName = `qr-signature-${cert.verificationId}.png`
        const qrSignatureUrl = await uploadFile(qrCodeBuffer, qrFileName, 'image/png')

        // Prepare certificate data for database
        const certData = {
          verification_id: cert.verificationId,
          certificate_title: cert.certificateTitle,
          participant_name: cert.name,
          program_name: cert.program,
          subtitle: cert.subtitle,
          issue_date: new Date(cert.issueDate),

          // Stats
          meetings: cert.stats.meetings,
          total_score: cert.stats.totalScore,
          materials: cert.stats.materials,
          attendance_rate: cert.stats.attendanceRate,
          assignment_completion: cert.stats.assignmentCompletion,
          participation_score: cert.stats.participationScore,

          // Grades
          overall_grade: cert.grades.overall,

          // Learning Time
          learning_hours: cert.learningTime.hours,
          weekly_data: cert.learningTime.weeklyData,

          // Analytics
          learning_velocity: cert.analytics.learningVelocity,
          collaboration_score: cert.analytics.collaborationScore,
          problem_solving_efficiency: cert.analytics.problemSolvingEfficiency,

          // Competencies (JSON)
          competencies: cert.competencies,

          // Technologies
          technologies: cert.technologies,

          // QR Code (optional)
          qr_code_url: cert.qrCodeUrl || null,

          // PDF Storage
          pdf_url: pdfUrl,
          pdf_password: pdfPassword,

          // Digital Signature
          signature: signatureData.signature,
          signature_data: signatureData.data,
          qr_signature_url: qrSignatureUrl,
          signed_at: new Date(),
          signed_by: `${session.user.name || "Admin"} (${session.user.role})`,
          verification_count: 0,

          // Prodi Association
          prodi_id: labAdmin.prodi_id,
          created_by: session.user.id,
        }

        // Insert into database (upsert to handle duplicates)
        await prisma.laboratory_certificates.upsert({
          where: {
            verification_id: cert.verificationId
          },
          create: certData,
          update: {
            ...certData,
            updated_at: new Date()
          }
        })

        successfulCerts.push(cert.verificationId)
      } catch (error: any) {
        console.error(`Failed to process certificate ${cert.verificationId}:`, error)
        failedCerts.push(cert.verificationId)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${successfulCerts.length} of ${certificates.length} certificates`,
      count: successfulCerts.length,
      successful: successfulCerts,
      failed: failedCerts,
      totalProcessed: certificates.length
    })

  } catch (error: any) {
    console.error("Error saving certificates:", error)
    return NextResponse.json(
      { error: error.message || "Failed to save certificates" },
      { status: 500 }
    )
  }
}
