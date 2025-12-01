import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

/**
 * GET /api/student/kkp/status
 * Mendapatkan status KKP mahasiswa saat ini
 *
 * Returns:
 * - status: "no_application" | "pending" | "approved" | "in_progress" | "rejected" | "completed"
 * - application: data aplikasi KKP jika ada
 * - requirements: data persyaratan jika belum ada aplikasi
 */
export async function GET() {
  try {
    // Get current user session
    const session = await getServerSession()

    // For demo purposes, get first student from database
    // In production, get from session: session?.user?.id or session?.user?.nim
    const student = await prisma.students.findFirst({
      select: {
        id: true,
        nim: true,
        prodi_id: true,
        users: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        nim: 'asc'
      }
    })

    if (!student) {
      // Return default response for demo if no students exist
      return NextResponse.json({
        status: "no_application",
        requirements: [],
        student: {
          id: "demo-id",
          nim: "demo-nim",
          name: "Demo Student",
        }
      })
    }

    // Check for existing KKP application
    const application = await prisma.kkp_applications.findFirst({
      where: { student_id: student.id },
      orderBy: { created_at: "desc" }, // Get latest application
      include: {
        companies: true,
        students: {
          select: {
            id: true,
            nim: true,
            users: {
              select: {
                name: true
              }
            }
          }
        },
        lecturers: {
          select: {
            id: true,
            nip: true,
            users: {
              select: {
                name: true
              }
            }
          }
        },
        kkp_approvals: {
          orderBy: { approved_at: "desc" }
        },
        kkp_documents: {
          where: {
            status: "verified"
          }
        }
      }
    })

    // If no application exists, return requirements status
    if (!application) {
      // Get KKP requirements from database based on student's prodi
      const prodiRequirements = await prisma.kkp_prodi_requirements.findMany({
        where: {
          prodi_id: student.prodi_id || undefined,
          is_active: true,
        },
        orderBy: {
          order: 'asc'
        },
        select: {
          id: true,
          title: true,
          description: true,
          required: true,
          order: true,
        }
      })

      // If no requirements configured, return message
      if (prodiRequirements.length === 0) {
        return NextResponse.json({
          status: "no_application",
          requirements: [],
          message: "Persyaratan Belum di Update",
          student: {
            id: student.id,
            nim: student.nim,
            name: student.users.name,
          }
        })
      }

      // Get student's uploaded requirements
      const studentRequirements = await prisma.kkp_requirements.findMany({
        where: { student_id: student.id },
        select: {
          id: true,
          requirement_type: true,
          file_name: true,
          original_file_name: true,
          file_path: true,
          status: true,
          notes: true,
          uploaded_at: true,
          verified_at: true,
        }
      })

      // Map prodi requirements with student's upload status
      const mappedRequirements = prodiRequirements.map(prodiReq => {
        // Find if student has uploaded this requirement
        // Match by title or create a mapping logic
        const studentReq = studentRequirements.find(sr =>
          sr.original_file_name?.toLowerCase().includes(prodiReq.title.toLowerCase())
        )

        return {
          id: prodiReq.id,
          title: prodiReq.title,
          description: prodiReq.description || "Upload dokumen yang diperlukan",
          type: prodiReq.title.toLowerCase().replace(/\s+/g, '_'),
          status: studentReq?.status || "pending",
          uploadedAt: studentReq?.uploaded_at,
          notes: studentReq?.notes,
          required: prodiReq.required,
        }
      })

      return NextResponse.json({
        status: "no_application",
        requirements: mappedRequirements,
        student: {
          id: student.id,
          nim: student.nim,
          name: student.users.name,
        }
      })
    }

    // If application exists, return based on status
    const response: any = {
      status: application.status,
      application: {
        id: application.id,
        applicationNumber: application.application_number,
        title: application.title,
        description: application.description,
        submissionDate: application.submission_date,
        startDate: application.start_date,
        endDate: application.end_date,
        status: application.status,
        notes: application.notes,
        groupMembers: application.group_members as any,
        company: {
          id: application.companies.id,
          name: application.companies.name,
          address: application.companies.address,
          city: application.companies.city,
          contactPerson: application.companies.contact_person,
          contactPhone: application.companies.contact_phone,
          contactEmail: application.companies.contact_email,
        },
        supervisor: application.lecturers ? {
          id: application.lecturers.id,
          nip: application.lecturers.nip,
          name: application.lecturers.users.name,
        } : null,
        approvals: application.kkp_approvals,
        documents: application.kkp_documents.map(doc => ({
          id: doc.id,
          name: doc.name,
          type: doc.type,
          url: doc.url,
          uploadDate: doc.upload_date,
          fileSize: doc.file_size,
          mimeType: doc.mime_type,
        })),
      },
      student: {
        id: student.id,
        nim: student.nim,
        name: student.users.name,
      }
    }

    // Add completion data if status is completed
    if (application.status === "completed") {
      // Get final scores/grades from related tables if exists
      // For now, return mock data
      response.completionData = {
        completionDate: application.updated_at,
        finalScore: 85, // TODO: Get from grades table
        grade: "A", // TODO: Get from grades table
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error("Error fetching KKP status:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
