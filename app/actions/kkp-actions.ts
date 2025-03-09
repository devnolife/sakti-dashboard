"use server"

import { revalidatePath } from "next/cache"

// Types for KKP application
export interface Student {
  id: string
  name: string
  nim: string
  major: string
  semester: number
  email: string
  phone: string
  avatar?: string
}

export interface Supervisor {
  id: string
  name: string
  nip: string
  department: string
  email: string
}

export interface Company {
  id: string
  name: string
  address: string
  city: string
  contactPerson: string
  contactPhone: string
  website?: string
  logo?: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
  uploadDate: Date
  status: "verified" | "unverified" | "rejected"
}

export interface KkpApplication {
  id: string
  applicationNumber: string
  title: string
  description: string
  submissionDate: Date
  startDate: Date
  endDate: Date
  status: "pending" | "approved" | "rejected" | "in-review"
  student: Student
  groupMembers?: Student[]
  supervisor?: Supervisor
  company: Company
  documents: Document[]
  notes?: string
}

// Mock data for KKP applications - in a real app, this would be in a database
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
        status: "unverified",
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
    status: "in-review",
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
    company: {
      id: "comp-002",
      name: "PT Maju Bersama",
      address: "Jl. Gatot Subroto No. 15",
      city: "Jakarta",
      contactPerson: "Rina Susanti",
      contactPhone: "021-7654321",
      website: "www.majubersama.co.id",
      logo: "/placeholder.svg?height=40&width=40",
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
        status: "unverified",
      },
    ],
  },
  {
    id: "kkp-003",
    applicationNumber: "KKP/2023/003",
    title: "Pengembangan Aplikasi Mobile E-Commerce",
    description: "Pengembangan aplikasi mobile e-commerce untuk memudahkan pengguna dalam berbelanja online",
    submissionDate: new Date("2023-09-03"),
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-12-31"),
    status: "approved",
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
      id: "sup-001",
      name: "Dr. Bambang Suprapto",
      nip: "9876543210",
      department: "Informatika",
      email: "bambang.suprapto@example.com",
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
    },
    documents: [
      {
        id: "doc-006",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-3.pdf",
        uploadDate: new Date("2023-08-28"),
        status: "verified",
      },
      {
        id: "doc-007",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-3.pdf",
        uploadDate: new Date("2023-08-29"),
        status: "verified",
      },
      {
        id: "doc-008",
        name: "Transkrip Nilai",
        type: "transcript",
        url: "/documents/transkrip-3.pdf",
        uploadDate: new Date("2023-08-28"),
        status: "verified",
      },
      {
        id: "doc-009",
        name: "Surat Penerimaan",
        type: "acceptance-letter",
        url: "/documents/surat-penerimaan.pdf",
        uploadDate: new Date("2023-09-05"),
        status: "verified",
      },
    ],
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
    },
    documents: [
      {
        id: "doc-010",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-4.pdf",
        uploadDate: new Date("2023-09-01"),
        status: "rejected",
      },
      {
        id: "doc-011",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-4.pdf",
        uploadDate: new Date("2023-09-02"),
        status: "rejected",
      },
    ],
    notes: "Proposal tidak sesuai dengan kebutuhan institusi. Harap revisi dan ajukan kembali.",
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
    },
    documents: [
      {
        id: "doc-012",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-5.pdf",
        uploadDate: new Date("2023-09-03"),
        status: "verified",
      },
      {
        id: "doc-013",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-5.pdf",
        uploadDate: new Date("2023-09-04"),
        status: "unverified",
      },
      {
        id: "doc-014",
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
    status: "in-review",
    student: {
      id: "std-012",
      name: "Rini Susanti",
      nim: "1234567901",
      major: "Sistem Informasi",
      semester: 6,
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
        semester: 6,
        email: "hadi.santoso@example.com",
        phone: "081234567902",
      },
      {
        id: "std-014",
        name: "Lia Amalia",
        nim: "1234567903",
        major: "Sistem Informasi",
        semester: 6,
        email: "lia.amalia@example.com",
        phone: "081234567903",
      },
    ],
    company: {
      id: "comp-006",
      name: "PT Telkom Indonesia",
      address: "Jl. Jenderal Sudirman Kav. 52-53",
      city: "Jakarta",
      contactPerson: "Budi Hartono",
      contactPhone: "021-5240807",
      website: "www.telkom.co.id",
      logo: "/placeholder.svg?height=40&width=40",
    },
    documents: [
      {
        id: "doc-015",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-6.pdf",
        uploadDate: new Date("2023-09-04"),
        status: "verified",
      },
      {
        id: "doc-016",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-6.pdf",
        uploadDate: new Date("2023-09-05"),
        status: "verified",
      },
      {
        id: "doc-017",
        name: "Transkrip Nilai",
        type: "transcript",
        url: "/documents/transkrip-6.pdf",
        uploadDate: new Date("2023-09-04"),
        status: "verified",
      },
    ],
  },
  {
    id: "kkp-007",
    applicationNumber: "KKP/2023/007",
    title: "Pengembangan Aplikasi Mobile Pembelajaran",
    description: "Pengembangan aplikasi mobile pembelajaran untuk memudahkan siswa dalam belajar",
    submissionDate: new Date("2023-09-07"),
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-12-31"),
    status: "pending",
    student: {
      id: "std-015",
      name: "Joko Susilo",
      nim: "1234567904",
      major: "Informatika",
      semester: 7,
      email: "joko.susilo@example.com",
      phone: "081234567904",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    company: {
      id: "comp-007",
      name: "Kementerian Pendidikan dan Kebudayaan",
      address: "Jl. Jenderal Sudirman",
      city: "Jakarta",
      contactPerson: "Dr. Anita Dewi",
      contactPhone: "021-5731800",
      website: "www.kemdikbud.go.id",
      logo: "/placeholder.svg?height=40&width=40",
    },
    documents: [
      {
        id: "doc-018",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-7.pdf",
        uploadDate: new Date("2023-09-05"),
        status: "unverified",
      },
      {
        id: "doc-019",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-7.pdf",
        uploadDate: new Date("2023-09-06"),
        status: "unverified",
      },
    ],
  },
  {
    id: "kkp-008",
    applicationNumber: "KKP/2023/008",
    title: "Implementasi Sistem Informasi Rumah Sakit",
    description: "Implementasi sistem informasi rumah sakit untuk meningkatkan pelayanan pasien",
    submissionDate: new Date("2023-09-08"),
    startDate: new Date("2023-10-15"),
    endDate: new Date("2024-01-15"),
    status: "approved",
    student: {
      id: "std-016",
      name: "Sinta Dewi",
      nim: "1234567905",
      major: "Sistem Informasi",
      semester: 6,
      email: "sinta.dewi@example.com",
      phone: "081234567905",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    groupMembers: [
      {
        id: "std-017",
        name: "Budi Setiawan",
        nim: "1234567906",
        major: "Sistem Informasi",
        semester: 6,
        email: "budi.setiawan@example.com",
        phone: "081234567906",
      },
      {
        id: "std-018",
        name: "Rina Fitriani",
        nim: "1234567907",
        major: "Sistem Informasi",
        semester: 6,
        email: "rina.fitriani@example.com",
        phone: "081234567907",
      },
    ],
    supervisor: {
      id: "sup-002",
      name: "Dr. Hendra Wijaya",
      nip: "9876543211",
      department: "Sistem Informasi",
      email: "hendra.wijaya@example.com",
    },
    company: {
      id: "comp-008",
      name: "Rumah Sakit Cipto Mangunkusumo",
      address: "Jl. Diponegoro No. 71",
      city: "Jakarta",
      contactPerson: "Dr. Andi Wijaya",
      contactPhone: "021-3141592",
      website: "www.rscm.co.id",
      logo: "/placeholder.svg?height=40&width=40",
    },
    documents: [
      {
        id: "doc-020",
        name: "Surat Permohonan KKP",
        type: "application-letter",
        url: "/documents/surat-permohonan-8.pdf",
        uploadDate: new Date("2023-09-06"),
        status: "verified",
      },
      {
        id: "doc-021",
        name: "Proposal KKP",
        type: "proposal",
        url: "/documents/proposal-8.pdf",
        uploadDate: new Date("2023-09-07"),
        status: "verified",
      },
      {
        id: "doc-022",
        name: "Transkrip Nilai",
        type: "transcript",
        url: "/documents/transkrip-8.pdf",
        uploadDate: new Date("2023-09-06"),
        status: "verified",
      },
      {
        id: "doc-023",
        name: "Surat Penerimaan",
        type: "acceptance-letter",
        url: "/documents/surat-penerimaan-8.pdf",
        uploadDate: new Date("2023-09-10"),
        status: "verified",
      },
    ],
  },
]

// Function to get all KKP applications
export async function getKkpApplications() {
  // In a real app, this would fetch from a database
  return MOCK_KKP_APPLICATIONS
}

// Function to get a single KKP application by ID
export async function getKkpApplicationById(id: string) {
  // In a real app, this would fetch from a database
  return MOCK_KKP_APPLICATIONS.find((app) => app.id === id) || null
}

// Function to update KKP application status
export async function updateKkpApplicationStatus(
  id: string,
  newStatus: "pending" | "approved" | "rejected" | "in-review",
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

    // Add notes if provided (usually for rejections)
    if (notes) {
      MOCK_KKP_APPLICATIONS[applicationIndex].notes = notes
    }

    // If approved, add a supervisor if not already assigned
    if (newStatus === "approved" && !MOCK_KKP_APPLICATIONS[applicationIndex].supervisor) {
      MOCK_KKP_APPLICATIONS[applicationIndex].supervisor = {
        id: "sup-auto",
        name: "Dr. Auto Assigned",
        nip: "9876543299",
        department: MOCK_KKP_APPLICATIONS[applicationIndex].student.major,
        email: "auto.assigned@example.com",
      }

      // Add acceptance letter document
      const newDocId = `doc-${Math.floor(Math.random() * 1000)}`
      MOCK_KKP_APPLICATIONS[applicationIndex].documents.push({
        id: newDocId,
        name: "Surat Penerimaan",
        type: "acceptance-letter",
        url: `/documents/surat-penerimaan-${id}.pdf`,
        uploadDate: new Date(),
        status: "verified",
      })
    }

    // Revalidate the path to refresh the UI
    revalidatePath("/dashboard/staff_tu/kkp")

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
  status: "verified" | "unverified" | "rejected",
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

    // Revalidate the path to refresh the UI
    revalidatePath("/dashboard/staff_tu/kkp")

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

// Function to add notes to an application
export async function addApplicationNotes(applicationId: string, notes: string) {
  try {
    // In a real app, this would update a database record
    const applicationIndex = MOCK_KKP_APPLICATIONS.findIndex((app) => app.id === applicationId)

    if (applicationIndex === -1) {
      return { success: false, message: "Application not found" }
    }

    // Update the application notes
    MOCK_KKP_APPLICATIONS[applicationIndex].notes = notes

    // Revalidate the path to refresh the UI
    revalidatePath("/dashboard/staff_tu/kkp")

    return {
      success: true,
      message: "Notes added successfully",
      application: MOCK_KKP_APPLICATIONS[applicationIndex],
    }
  } catch (error) {
    console.error("Error adding notes to application:", error)
    return { success: false, message: "Failed to add notes" }
  }
}

// Function to generate approval letter
export async function generateApprovalLetter(applicationId: string) {
  try {
    // In a real app, this would generate a PDF and save it
    const application = MOCK_KKP_APPLICATIONS.find((app) => app.id === applicationId)

    if (!application) {
      return { success: false, message: "Application not found" }
    }

    // Check if application is approved
    if (application.status !== "approved") {
      return { success: false, message: "Cannot generate letter for non-approved application" }
    }

    // In a real app, this would return the URL to the generated PDF
    return {
      success: true,
      message: "Approval letter generated successfully",
      letterUrl: `/documents/approval-letter-${applicationId}.pdf`,
    }
  } catch (error) {
    console.error("Error generating approval letter:", error)
    return { success: false, message: "Failed to generate approval letter" }
  }
}

