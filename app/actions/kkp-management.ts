"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import type { KkpApplication, KkpStatus, KkpDocumentStatus, KkpDocumentType } from "@/types/kkp"

// Helper function to transform database data to KkpApplication type
function transformToKkpApplication(dbApplication: any): KkpApplication {
  return {
    id: dbApplication.id,
    applicationNumber: dbApplication.application_number || "",
    title: dbApplication.title,
    description: dbApplication.description || "",
    submission_date: dbApplication.submission_date,
    start_date: dbApplication.start_date,
    end_date: dbApplication.end_date,
    status: dbApplication.status as KkpStatus,
    notes: dbApplication.notes,
    student: {
      id: dbApplication.students?.id || "",
      name: dbApplication.students?.name || "",
      nim: dbApplication.students?.nim || "",
      major: dbApplication.students?.prodi?.nama || "",
      semester: dbApplication.students?.semester || 0,
      email: dbApplication.students?.email || "",
      phone: dbApplication.students?.phone || "",
      avatar: dbApplication.students?.avatar || undefined,
    },
    groupMembers: dbApplication.group_members || [],
    supervisor: dbApplication.lecturers ? {
      id: dbApplication.lecturers.id,
      name: dbApplication.lecturers.name,
      nip: dbApplication.lecturers.nip || "",
      department: dbApplication.lecturers.prodi?.nama || "",
      email: dbApplication.lecturers.email || "",
      specialization: dbApplication.lecturers.specialization || "",
    } : undefined,
    company: {
      id: dbApplication.companies?.id || "",
      name: dbApplication.companies?.name || "",
      address: dbApplication.companies?.address || "",
      city: dbApplication.companies?.city || "",
      contactPerson: dbApplication.companies?.contact_person || "",
      contactPhone: dbApplication.companies?.contact_phone || "",
      website: dbApplication.companies?.website || "",
      logo: dbApplication.companies?.logo || undefined,
      industry: dbApplication.companies?.industry || "",
    },
    documents: (dbApplication.kkp_documents || []).map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      type: doc.type as KkpDocumentType,
      url: doc.url,
      uploadDate: doc.upload_date,
      status: doc.status as KkpDocumentStatus,
      notes: doc.notes,
    })),
    approvedBy: dbApplication.kkp_approvals?.find((a: any) => a.status === "approved")?.approver_id,
    approvedDate: dbApplication.kkp_approvals?.find((a: any) => a.status === "approved")?.approved_at,
    rejectedBy: dbApplication.kkp_approvals?.find((a: any) => a.status === "rejected")?.approver_id,
    rejectedDate: dbApplication.kkp_approvals?.find((a: any) => a.status === "rejected")?.approved_at,
    rejectionReason: dbApplication.kkp_approvals?.find((a: any) => a.status === "rejected")?.comments,
  }
}

// Function to get all KKP applications
export async function getAllKkpApplications(): Promise<KkpApplication[]> {
  try {
    const applications = await prisma.kkp_applications.findMany({
      include: {
        students: {
          include: {
            prodi: true,
          }
        },
        lecturers: {
          include: {
            prodi: true,
          }
        },
        companies: true,
        kkp_documents: true,
        kkp_approvals: true,
      },
      orderBy: {
        submission_date: 'desc'
      }
    })

    return applications.map(transformToKkpApplication)
  } catch (error) {
    console.error("Error fetching KKP applications:", error)
    return []
  }
}

// Function to get KKP applications by status
export async function getKkpApplicationsByStatus(status: KkpStatus): Promise<KkpApplication[]> {
  try {
    const applications = await prisma.kkp_applications.findMany({
      where: {
        status: status
      },
      include: {
        students: {
          include: {
            prodi: true,
          }
        },
        lecturers: {
          include: {
            prodi: true,
          }
        },
        companies: true,
        kkp_documents: true,
        kkp_approvals: true,
      },
      orderBy: {
        submission_date: 'desc'
      }
    })

    return applications.map(transformToKkpApplication)
  } catch (error) {
    console.error("Error fetching KKP applications by status:", error)
    return []
  }
}

// Function to get a single KKP application by ID
export async function getKkpApplicationById(id: string): Promise<KkpApplication | null> {
  try {
    const application = await prisma.kkp_applications.findUnique({
      where: { id },
      include: {
        students: {
          include: {
            prodi: true,
          }
        },
        lecturers: {
          include: {
            prodi: true,
          }
        },
        companies: true,
        kkp_documents: true,
        kkp_approvals: true,
      },
    })

    if (!application) return null

    return transformToKkpApplication(application)
  } catch (error) {
    console.error("Error fetching KKP application:", error)
    return null
  }
}

// Function to update KKP application status
export async function updateKkpApplicationStatus(
  id: string,
  newStatus: KkpStatus,
  userId: string,
  userName: string,
  notes?: string,
) {
  try {
    // Update the application status
    const updatedApplication = await prisma.kkp_applications.update({
      where: { id },
      data: {
        status: newStatus,
        notes: notes || undefined,
        updated_at: new Date(),
      },
      include: {
        students: {
          include: {
            prodi: true,
          }
        },
        lecturers: {
          include: {
            prodi: true,
          }
        },
        companies: true,
        kkp_documents: true,
        kkp_approvals: true,
      },
    })

    // Create approval record
    await prisma.kkp_approvals.create({
      data: {
        id: `approval-${Date.now()}`,
        application_id: id,
        approver_role: 'staff_tu',
        approver_id: userId,
        status: newStatus === 'approved' ? 'approved' : newStatus === 'rejected' ? 'rejected' : 'pending',
        comments: notes,
        approved_at: new Date(),
      }
    })

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")
    revalidatePath("/dashboard/lecturer/kkp")

    return {
      success: true,
      message: `Status permintaan berhasil diubah menjadi ${newStatus}`,
      application: transformToKkpApplication(updatedApplication),
    }
  } catch (error) {
    console.error("Error updating KKP application status:", error)
    return { success: false, message: "Gagal memperbarui status permintaan" }
  }
}

// Function to verify a document
export async function verifyDocument(
  applicationId: string,
  documentId: string,
  status: KkpDocumentStatus,
  notes?: string,
) {
  try {
    await prisma.kkp_documents.update({
      where: { id: documentId },
      data: {
        status: status,
        notes: notes || undefined,
      }
    })

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")
    revalidatePath("/dashboard/lecturer/kkp")

    return {
      success: true,
      message: `Status dokumen berhasil diubah menjadi ${status}`,
    }
  } catch (error) {
    console.error("Error verifying document:", error)
    return { success: false, message: "Gagal memverifikasi dokumen" }
  }
}

// Function to assign supervisor to KKP application
export async function assignSupervisor(applicationId: string, supervisorId: string, supervisorName: string) {
  try {
    const updatedApplication = await prisma.kkp_applications.update({
      where: { id: applicationId },
      data: {
        supervisor_id: supervisorId,
        updated_at: new Date(),
      },
      include: {
        students: {
          include: {
            prodi: true,
          }
        },
        lecturers: {
          include: {
            prodi: true,
          }
        },
        companies: true,
        kkp_documents: true,
        kkp_approvals: true,
      },
    })

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")
    revalidatePath("/dashboard/lecturer/kkp")

    return {
      success: true,
      message: `Pembimbing ${supervisorName} berhasil ditugaskan`,
      application: transformToKkpApplication(updatedApplication),
    }
  } catch (error) {
    console.error("Error assigning supervisor:", error)
    return { success: false, message: "Gagal menugaskan pembimbing" }
  }
}

// Function to submit a new KKP application
export async function submitKkpApplication(applicationData: {
  title: string
  description: string
  startDate: Date
  endDate: Date
  studentId: string
  companyId: string
  groupMembers?: any[]
}) {
  try {
    // Generate application number
    const count = await prisma.kkp_applications.count()
    const year = new Date().getFullYear()
    const applicationNumber = `KKP/${year}/${String(count + 1).padStart(3, "0")}`

    const newApplication = await prisma.kkp_applications.create({
      data: {
        id: `kkp-${Date.now()}`,
        application_number: applicationNumber,
        title: applicationData.title,
        description: applicationData.description,
        start_date: applicationData.startDate,
        end_date: applicationData.endDate,
        student_id: applicationData.studentId,
        company_id: applicationData.companyId,
        group_members: applicationData.groupMembers || [],
        status: 'pending',
        updated_at: new Date(),
      },
      include: {
        students: {
          include: {
            prodi: true,
          }
        },
        companies: true,
        kkp_documents: true,
        kkp_approvals: true,
      },
    })

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/mahasiswa/kkp")
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")

    return {
      success: true,
      message: "Permintaan KKP berhasil diajukan",
      application: transformToKkpApplication(newApplication),
    }
  } catch (error) {
    console.error("Error submitting KKP application:", error)
    return { success: false, message: "Gagal mengajukan permintaan KKP" }
  }
}

// Function to upload a document for a KKP application
export async function uploadKkpDocument(
  applicationId: string,
  documentName: string,
  documentType: KkpDocumentType,
  documentUrl: string,
  fileSize?: number,
  mimeType?: string,
) {
  try {
    const newDocument = await prisma.kkp_documents.create({
      data: {
        id: `doc-${Date.now()}`,
        name: documentName,
        type: documentType,
        url: documentUrl,
        application_id: applicationId,
        file_size: fileSize,
        mime_type: mimeType,
        status: 'pending',
      }
    })

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/mahasiswa/kkp")
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")
    revalidatePath("/dashboard/lecturer/kkp")

    return {
      success: true,
      message: "Dokumen berhasil diunggah",
      document: newDocument,
    }
  } catch (error) {
    console.error("Error uploading document:", error)
    return { success: false, message: "Gagal mengunggah dokumen" }
  }
}

// Function to get KKP statistics
export async function getKkpStatistics() {
  try {
    const [total, pending, approved, rejected, inProgress, completed] = await Promise.all([
      prisma.kkp_applications.count(),
      prisma.kkp_applications.count({ where: { status: 'pending' } }),
      prisma.kkp_applications.count({ where: { status: 'approved' } }),
      prisma.kkp_applications.count({ where: { status: 'rejected' } }),
      prisma.kkp_applications.count({ where: { status: 'in_progress' } }),
      prisma.kkp_applications.count({ where: { status: 'completed' } }),
    ])

    return {
      total,
      pending,
      approved,
      rejected,
      inProgress,
      completed,
    }
  } catch (error) {
    console.error("Error fetching KKP statistics:", error)
    return {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      inProgress: 0,
      completed: 0,
    }
  }
}
