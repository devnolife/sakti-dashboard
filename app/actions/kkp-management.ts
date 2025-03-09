"use server"

import { revalidatePath } from "next/cache"
import type { KkpApplication, KkpStatus, KkpDocument, KkpDocumentStatus, KkpDocumentType } from "@/types/kkp"

// Mock data for KKP applications
const MOCK_KKP_APPLICATIONS: KkpApplication[] = [
  {
    id: "kkp-001",
    applicationNumber: "KKP/2023/001",
    title: "Pengembangan Sistem Informasi Keuangan",
    description: "Pengembangan sistem informasi keuangan berbasis web untuk memudahkan pengelolaan keuangan perusahaan",
    submissionDate: new Date("2023-09-01"),
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-12-31"),
    status: "pending",
    student: {
      id: "std-001",
      name: "Ahmad Fauzi",
      nim: "1234567890",
      major: "Informatika",
      semester: 5,
      email: "ahmad.fauzi@example.com",
      phone: "081234567890",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    groupMembers: [
      {
        id: "std-002",
        name: "Siti Nurhaliza",
        nim: "1234567891",
        major: "Informatika",
        semester: 5,
        email: "siti.nurhaliza@example.com",
        phone: "081234567891",
      },
      {
        id: "std-003",
        name: "Budi Santoso",
        nim: "1234567892",
        major: "Informatika",
        semester: 5,
        email: "budi.santoso@example.com",
        phone: "081234567892",
      },
    ],
    company: {
      id: "comp-001",
      name: "Bank Nasional Indonesia",
      address: "Jl. Sudirman No. 10",
      city: "Jakarta",
      contactPerson: "Hendra Wijaya",
      contactPhone: "021-1234567",
      website: "www.bni.co.id",
      logo: "/placeholder.svg?height=40&width=40",
      industry: "Banking & Finance",
    },
    documents: [
      {
        id: "doc-001",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan.pdf",
        uploadDate: new Date("2023-08-25"),
        status: "verified",
      },
      {
        id: "doc-002",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal.pdf",
        uploadDate: new Date("2023-08-28"),
        status: "pending",
      },
      {
        id: "doc-003",
        name: "Transkrip Nilai",
        type: "transcript",
        url: "/documents/transkrip.pdf",
        uploadDate: new Date("2023-08-25"),
        status: "verified",
      },
    ],
  },
  {
    id: "kkp-002",
    applicationNumber: "KKP/2023/002",
    title: "Implementasi Sistem Manajemen Inventaris",
    description: "Implementasi sistem manajemen inventaris untuk memudahkan pengelolaan barang di gudang",
    submissionDate: new Date("2023-09-02"),
    startDate: new Date("2023-10-15"),
    endDate: new Date("2024-01-15"),
    status: "approved",
    student: {
      id: "std-004",
      name: "Dewi Lestari",
      nim: "1234567893",
      major: "Sistem Informasi",
      semester: 6,
      email: "dewi.lestari@example.com",
      phone: "081234567893",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    groupMembers: [
      {
        id: "std-005",
        name: "Rudi Hartono",
        nim: "1234567894",
        major: "Sistem Informasi",
        semester: 6,
        email: "rudi.hartono@example.com",
        phone: "081234567894",
      },
    ],
    supervisor: {
      id: "lec-001",
      name: "Dr. Bambang Suprapto",
      nip: "9876543210",
      department: "Sistem Informasi",
      email: "bambang.suprapto@example.com",
      specialization: "Database Systems",
    },
    company: {
      id: "comp-002",
      name: "PT Maju Bersama",
      address: "Jl. Gatot Subroto No. 15",
      city: "Jakarta",
      contactPerson: "Rina Susanti",
      contactPhone: "021-7654321",
      website: "www.majubersama.co.id",
      logo: "/placeholder.svg?height=40&width=40",
      industry: "Logistics & Transportation",
    },
    documents: [
      {
        id: "doc-004",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-2.pdf",
        uploadDate: new Date("2023-08-30"),
        status: "verified",
      },
      {
        id: "doc-005",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-2.pdf",
        uploadDate: new Date("2023-08-31"),
        status: "verified",
      },
      {
        id: "doc-006",
        name: "Surat Penerimaan",
        type: "acceptance-letter",
        url: "/documents/surat-penerimaan-2.pdf",
        uploadDate: new Date("2023-09-10"),
        status: "verified",
      },
    ],
    approvedBy: "Dr. Hadi Santoso",
    approvedDate: new Date("2023-09-10"),
  },
  {
    id: "kkp-003",
    applicationNumber: "KKP/2023/003",
    title: "Pengembangan Aplikasi Mobile E-Commerce",
    description: "Pengembangan aplikasi mobile e-commerce untuk memudahkan pengguna dalam berbelanja online",
    submissionDate: new Date("2023-09-03"),
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-12-31"),
    status: "in-progress",
    student: {
      id: "std-006",
      name: "Andi Wijaya",
      nim: "1234567895",
      major: "Informatika",
      semester: 7,
      email: "andi.wijaya@example.com",
      phone: "081234567895",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    groupMembers: [
      {
        id: "std-007",
        name: "Nina Sari",
        nim: "1234567896",
        major: "Informatika",
        semester: 7,
        email: "nina.sari@example.com",
        phone: "081234567896",
      },
      {
        id: "std-008",
        name: "Dodi Pratama",
        nim: "1234567897",
        major: "Informatika",
        semester: 7,
        email: "dodi.pratama@example.com",
        phone: "081234567897",
      },
    ],
    supervisor: {
      id: "lec-002",
      name: "Dr. Siti Aminah",
      nip: "9876543211",
      department: "Informatika",
      email: "siti.aminah@example.com",
      specialization: "Mobile Application Development",
    },
    company: {
      id: "comp-003",
      name: "Tokopedia",
      address: "Jl. Prof. DR. Satrio No. 11",
      city: "Jakarta",
      contactPerson: "Joko Widodo",
      contactPhone: "021-9876543",
      website: "www.tokopedia.com",
      logo: "/placeholder.svg?height=40&width=40",
      industry: "E-Commerce",
    },
    documents: [
      {
        id: "doc-007",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-3.pdf",
        uploadDate: new Date("2023-08-28"),
        status: "verified",
      },
      {
        id: "doc-008",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-3.pdf",
        uploadDate: new Date("2023-08-29"),
        status: "verified",
      },
      {
        id: "doc-009",
        name: "Transkrip Nilai",
        type: "transcript",
        url: "/documents/transkrip-3.pdf",
        uploadDate: new Date("2023-08-28"),
        status: "verified",
      },
      {
        id: "doc-010",
        name: "Surat Penerimaan",
        type: "acceptance-letter",
        url: "/documents/surat-penerimaan-3.pdf",
        uploadDate: new Date("2023-09-05"),
        status: "verified",
      },
      {
        id: "doc-011",
        name: "Surat Penunjukan Pembimbing",
        type: "supervisor-letter",
        url: "/documents/surat-pembimbing-3.pdf",
        uploadDate: new Date("2023-09-10"),
        status: "verified",
      },
    ],
    approvedBy: "Dr. Hadi Santoso",
    approvedDate: new Date("2023-09-05"),
  },
  {
    id: "kkp-004",
    applicationNumber: "KKP/2023/004",
    title: "Analisis dan Pengembangan Sistem Informasi Akademik",
    description:
      "Analisis dan pengembangan sistem informasi akademik untuk meningkatkan efisiensi pengelolaan data akademik",
    submissionDate: new Date("2023-09-04"),
    startDate: new Date("2023-10-15"),
    endDate: new Date("2024-01-15"),
    status: "rejected",
    student: {
      id: "std-009",
      name: "Rina Wati",
      nim: "1234567898",
      major: "Sistem Informasi",
      semester: 6,
      email: "rina.wati@example.com",
      phone: "081234567898",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    company: {
      id: "comp-004",
      name: "Universitas Indonesia",
      address: "Jl. Margonda Raya No. 100",
      city: "Depok",
      contactPerson: "Dr. Hadi Santoso",
      contactPhone: "021-8765432",
      website: "www.ui.ac.id",
      logo: "/placeholder.svg?height=40&width=40",
      industry: "Education",
    },
    documents: [
      {
        id: "doc-012",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-4.pdf",
        uploadDate: new Date("2023-09-01"),
        status: "rejected",
        notes: "Format surat tidak sesuai dengan ketentuan",
      },
      {
        id: "doc-013",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-4.pdf",
        uploadDate: new Date("2023-09-02"),
        status: "rejected",
        notes: "Proposal tidak sesuai dengan kebutuhan institusi",
      },
    ],
    rejectedBy: "Dr. Hadi Santoso",
    rejectedDate: new Date("2023-09-10"),
    rejectionReason: "Proposal tidak sesuai dengan kebutuhan institusi. Harap revisi dan ajukan kembali.",
  },
  {
    id: "kkp-005",
    applicationNumber: "KKP/2023/005",
    title: "Pengembangan Sistem Informasi Perpustakaan",
    description: "Pengembangan sistem informasi perpustakaan untuk memudahkan pengelolaan buku dan peminjaman",
    submissionDate: new Date("2023-09-05"),
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-12-31"),
    status: "pending",
    student: {
      id: "std-010",
      name: "Dian Sastro",
      nim: "1234567899",
      major: "Informatika",
      semester: 5,
      email: "dian.sastro@example.com",
      phone: "081234567899",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    groupMembers: [
      {
        id: "std-011",
        name: "Agus Salim",
        nim: "1234567900",
        major: "Informatika",
        semester: 5,
        email: "agus.salim@example.com",
        phone: "081234567900",
      },
    ],
    company: {
      id: "comp-005",
      name: "Perpustakaan Nasional",
      address: "Jl. Salemba Raya No. 28",
      city: "Jakarta",
      contactPerson: "Siti Aminah",
      contactPhone: "021-5432109",
      website: "www.perpusnas.go.id",
      logo: "/placeholder.svg?height=40&width=40",
      industry: "Government",
    },
    documents: [
      {
        id: "doc-014",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-5.pdf",
        uploadDate: new Date("2023-09-03"),
        status: "verified",
      },
      {
        id: "doc-015",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-5.pdf",
        uploadDate: new Date("2023-09-04"),
        status: "pending",
      },
      {
        id: "doc-016",
        name: "Transkrip Nilai",
        type: "transcript",
        url: "/documents/transkrip-5.pdf",
        uploadDate: new Date("2023-09-03"),
        status: "verified",
      },
    ],
  },
  {
    id: "kkp-006",
    applicationNumber: "KKP/2023/006",
    title: "Implementasi Sistem Manajemen Proyek",
    description: "Implementasi sistem manajemen proyek untuk meningkatkan efisiensi pengelolaan proyek perusahaan",
    submissionDate: new Date("2023-09-06"),
    startDate: new Date("2023-10-15"),
    endDate: new Date("2024-01-15"),
    status: "completed",
    student: {
      id: "std-012",
      name: "Rini Susanti",
      nim: "1234567901",
      major: "Sistem Informasi",
      semester: 8,
      email: "rini.susanti@example.com",
      phone: "081234567901",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    groupMembers: [
      {
        id: "std-013",
        name: "Hadi Santoso",
        nim: "1234567902",
        major: "Sistem Informasi",
        semester: 8,
        email: "hadi.santoso@example.com",
        phone: "081234567902",
      },
      {
        id: "std-014",
        name: "Lia Amalia",
        nim: "1234567903",
        major: "Sistem Informasi",
        semester: 8,
        email: "lia.amalia@example.com",
        phone: "081234567903",
      },
    ],
    supervisor: {
      id: "lec-003",
      name: "Dr. Budi Hartono",
      nip: "9876543212",
      department: "Sistem Informasi",
      email: "budi.hartono@example.com",
      specialization: "Project Management",
    },
    company: {
      id: "comp-006",
      name: "PT Telkom Indonesia",
      address: "Jl. Jenderal Sudirman Kav. 52-53",
      city: "Jakarta",
      contactPerson: "Budi Hartono",
      contactPhone: "021-5240807",
      website: "www.telkom.co.id",
      logo: "/placeholder.svg?height=40&width=40",
      industry: "Telecommunications",
    },
    documents: [
      {
        id: "doc-017",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-6.pdf",
        uploadDate: new Date("2023-04-04"),
        status: "verified",
      },
      {
        id: "doc-018",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-6.pdf",
        uploadDate: new Date("2023-04-05"),
        status: "verified",
      },
      {
        id: "doc-019",
        name: "Transkrip Nilai",
        type: "transcript",
        url: "/documents/transkrip-6.pdf",
        uploadDate: new Date("2023-04-04"),
        status: "verified",
      },
      {
        id: "doc-020",
        name: "Surat Penerimaan",
        type: "acceptance-letter",
        url: "/documents/surat-penerimaan-6.pdf",
        uploadDate: new Date("2023-04-15"),
        status: "verified",
      },
      {
        id: "doc-021",
        name: "Surat Penunjukan Pembimbing",
        type: "supervisor-letter",
        url: "/documents/surat-pembimbing-6.pdf",
        uploadDate: new Date("2023-04-20"),
        status: "verified",
      },
      {
        id: "doc-022",
        name: "Laporan KKP",
        type: "report",
        url: "/documents/laporan-6.pdf",
        uploadDate: new Date("2023-08-10"),
        status: "verified",
      },
      {
        id: "doc-023",
        name: "Evaluasi KKP",
        type: "evaluation",
        url: "/documents/evaluasi-6.pdf",
        uploadDate: new Date("2023-08-15"),
        status: "verified",
      },
    ],
    approvedBy: "Dr. Hadi Santoso",
    approvedDate: new Date("2023-04-10"),
  },
]

// Function to get all KKP applications
export async function getAllKkpApplications() {
  // In a real app, this would fetch from a database
  return MOCK_KKP_APPLICATIONS
}

// Function to get KKP applications by status
export async function getKkpApplicationsByStatus(status: KkpStatus) {
  // In a real app, this would fetch from a database with filtering
  return MOCK_KKP_APPLICATIONS.filter((app) => app.status === status)
}

// Function to get a single KKP application by ID
export async function getKkpApplicationById(id: string) {
  // In a real app, this would fetch from a database
  return MOCK_KKP_APPLICATIONS.find((app) => app.id === id) || null
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
    // In a real app, this would update a database record
    const applicationIndex = MOCK_KKP_APPLICATIONS.findIndex((app) => app.id === id)

    if (applicationIndex === -1) {
      return { success: false, message: "Application not found" }
    }

    // Update the application status
    MOCK_KKP_APPLICATIONS[applicationIndex].status = newStatus

    // Add notes if provided
    if (notes) {
      MOCK_KKP_APPLICATIONS[applicationIndex].notes = notes
    }

    // Update approval or rejection information
    if (newStatus === "approved") {
      MOCK_KKP_APPLICATIONS[applicationIndex].approvedBy = userName
      MOCK_KKP_APPLICATIONS[applicationIndex].approvedDate = new Date()

      // Add acceptance letter document if not exists
      const hasAcceptanceLetter = MOCK_KKP_APPLICATIONS[applicationIndex].documents.some(
        (doc) => doc.type === "acceptance-letter",
      )

      if (!hasAcceptanceLetter) {
        const newDocId = `doc-${Math.floor(Math.random() * 10000)}`
        MOCK_KKP_APPLICATIONS[applicationIndex].documents.push({
          id: newDocId,
          name: "Surat Penerimaan",
          type: "acceptance-letter",
          url: `/documents/surat-penerimaan-${id}.pdf`,
          uploadDate: new Date(),
          status: "verified",
        })
      }
    } else if (newStatus === "rejected") {
      MOCK_KKP_APPLICATIONS[applicationIndex].rejectedBy = userName
      MOCK_KKP_APPLICATIONS[applicationIndex].rejectedDate = new Date()

      if (notes) {
        MOCK_KKP_APPLICATIONS[applicationIndex].rejectionReason = notes
      }
    }

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")
    revalidatePath("/dashboard/lecturer/kkp")

    return {
      success: true,
      message: `Application status updated to ${newStatus}`,
      application: MOCK_KKP_APPLICATIONS[applicationIndex],
    }
  } catch (error) {
    console.error("Error updating KKP application status:", error)
    return { success: false, message: "Failed to update application status" }
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
    // In a real app, this would update a database record
    const applicationIndex = MOCK_KKP_APPLICATIONS.findIndex((app) => app.id === applicationId)

    if (applicationIndex === -1) {
      return { success: false, message: "Application not found" }
    }

    const documentIndex = MOCK_KKP_APPLICATIONS[applicationIndex].documents.findIndex((doc) => doc.id === documentId)

    if (documentIndex === -1) {
      return { success: false, message: "Document not found" }
    }

    // Update the document status
    MOCK_KKP_APPLICATIONS[applicationIndex].documents[documentIndex].status = status

    // Add notes if provided
    if (notes) {
      MOCK_KKP_APPLICATIONS[applicationIndex].documents[documentIndex].notes = notes
    }

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")
    revalidatePath("/dashboard/lecturer/kkp")

    return {
      success: true,
      message: `Document status updated to ${status}`,
      document: MOCK_KKP_APPLICATIONS[applicationIndex].documents[documentIndex],
    }
  } catch (error) {
    console.error("Error verifying document:", error)
    return { success: false, message: "Failed to verify document" }
  }
}

// Function to assign supervisor to KKP application
export async function assignSupervisor(applicationId: string, supervisorId: string, supervisorName: string) {
  try {
    // In a real app, this would update a database record and fetch supervisor details
    const applicationIndex = MOCK_KKP_APPLICATIONS.findIndex((app) => app.id === applicationId)

    if (applicationIndex === -1) {
      return { success: false, message: "Application not found" }
    }

    // Create a mock supervisor object (in a real app, this would be fetched from the database)
    const supervisor = {
      id: supervisorId,
      name: supervisorName,
      nip: `NIP${Math.floor(Math.random() * 10000000)}`,
      department: MOCK_KKP_APPLICATIONS[applicationIndex].student.major,
      email: `${supervisorName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      specialization: "KKP Supervision",
    }

    // Assign the supervisor
    MOCK_KKP_APPLICATIONS[applicationIndex].supervisor = supervisor

    // Add supervisor letter document if not exists
    const hasSupervisorLetter = MOCK_KKP_APPLICATIONS[applicationIndex].documents.some(
      (doc) => doc.type === "supervisor-letter",
    )

    if (!hasSupervisorLetter) {
      const newDocId = `doc-${Math.floor(Math.random() * 10000)}`
      MOCK_KKP_APPLICATIONS[applicationIndex].documents.push({
        id: newDocId,
        name: "Surat Penunjukan Pembimbing",
        type: "supervisor-letter",
        url: `/documents/surat-pembimbing-${applicationId}.pdf`,
        uploadDate: new Date(),
        status: "verified",
      })
    }

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")
    revalidatePath("/dashboard/lecturer/kkp")

    return {
      success: true,
      message: `Supervisor ${supervisorName} assigned successfully`,
      application: MOCK_KKP_APPLICATIONS[applicationIndex],
    }
  } catch (error) {
    console.error("Error assigning supervisor:", error)
    return { success: false, message: "Failed to assign supervisor" }
  }
}

// Function to submit a new KKP application
export async function submitKkpApplication(applicationData: Partial<KkpApplication>) {
  try {
    // In a real app, this would create a new record in the database

    // Generate a new ID and application number
    const newId = `kkp-${String(MOCK_KKP_APPLICATIONS.length + 1).padStart(3, "0")}`
    const newApplicationNumber = `KKP/2023/${String(MOCK_KKP_APPLICATIONS.length + 1).padStart(3, "0")}`

    // Create the new application object
    const newApplication: KkpApplication = {
      id: newId,
      applicationNumber: newApplicationNumber,
      title: applicationData.title || "Untitled KKP Application",
      description: applicationData.description || "",
      submissionDate: new Date(),
      startDate: applicationData.startDate || new Date(),
      endDate: applicationData.endDate || new Date(),
      status: "pending",
      student: applicationData.student!,
      groupMembers: applicationData.groupMembers || [],
      company: applicationData.company!,
      documents: applicationData.documents || [],
    }

    // Add the new application to the mock data
    MOCK_KKP_APPLICATIONS.push(newApplication)

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/mahasiswa/kkp")
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")

    return {
      success: true,
      message: "KKP application submitted successfully",
      application: newApplication,
    }
  } catch (error) {
    console.error("Error submitting KKP application:", error)
    return { success: false, message: "Failed to submit KKP application" }
  }
}

// Function to upload a document for a KKP application
export async function uploadKkpDocument(
  applicationId: string,
  documentName: string,
  documentType: KkpDocumentType,
  documentUrl: string,
) {
  try {
    // In a real app, this would update a database record
    const applicationIndex = MOCK_KKP_APPLICATIONS.findIndex((app) => app.id === applicationId)

    if (applicationIndex === -1) {
      return { success: false, message: "Application not found" }
    }

    // Generate a new document ID
    const newDocId = `doc-${Math.floor(Math.random() * 10000)}`

    // Create the new document object
    const newDocument: KkpDocument = {
      id: newDocId,
      name: documentName,
      type: documentType,
      url: documentUrl,
      uploadDate: new Date(),
      status: "pending",
    }

    // Add the document to the application
    MOCK_KKP_APPLICATIONS[applicationIndex].documents.push(newDocument)

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/mahasiswa/kkp")
    revalidatePath("/dashboard/staff_tu/kkp")
    revalidatePath("/dashboard/prodi/kkp")
    revalidatePath("/dashboard/lecturer/kkp")

    return {
      success: true,
      message: "Document uploaded successfully",
      document: newDocument,
    }
  } catch (error) {
    console.error("Error uploading document:", error)
    return { success: false, message: "Failed to upload document" }
  }
}

