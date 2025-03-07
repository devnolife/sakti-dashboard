"use server"

import { revalidatePath } from "next/cache"
import type { InternshipApplication, InternshipStatus } from "@/types/internship"

// Mock data for demonstration purposes
const mockInternshipApplications: InternshipApplication[] = [
  {
    id: "app-001",
    studentId: "std-001",
    studentName: "Ahmad Fauzi",
    studentNIM: "1234567890",
    companyName: "PT Teknologi Indonesia",
    companyAddress: "Jl. Sudirman No. 123, Jakarta",
    position: "Software Developer Intern",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    status: "pending",
    applicationDate: new Date("2023-05-15"),
    documents: [
      {
        id: "doc-001",
        name: "CV",
        url: "/documents/cv.pdf",
        type: "application/pdf",
      },
      {
        id: "doc-002",
        name: "Surat Permohonan",
        url: "/documents/surat-permohonan.pdf",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "app-002",
    studentId: "std-002",
    studentName: "Siti Nurhaliza",
    studentNIM: "0987654321",
    companyName: "PT Maju Bersama",
    companyAddress: "Jl. Gatot Subroto No. 456, Jakarta",
    position: "Marketing Intern",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-09-30"),
    status: "pending",
    applicationDate: new Date("2023-06-10"),
    documents: [
      {
        id: "doc-003",
        name: "CV",
        url: "/documents/cv-siti.pdf",
        type: "application/pdf",
      },
      {
        id: "doc-004",
        name: "Surat Permohonan",
        url: "/documents/surat-permohonan-siti.pdf",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "app-003",
    studentId: "std-003",
    studentName: "Budi Santoso",
    studentNIM: "1122334455",
    companyName: "PT Karya Digital",
    companyAddress: "Jl. Thamrin No. 789, Jakarta",
    position: "UI/UX Designer Intern",
    startDate: new Date("2023-06-15"),
    endDate: new Date("2023-09-15"),
    status: "approved",
    applicationDate: new Date("2023-05-20"),
    documents: [
      {
        id: "doc-005",
        name: "CV",
        url: "/documents/cv-budi.pdf",
        type: "application/pdf",
      },
      {
        id: "doc-006",
        name: "Surat Permohonan",
        url: "/documents/surat-permohonan-budi.pdf",
        type: "application/pdf",
      },
    ],
    feedback: "Aplikasi disetujui. Silakan lanjutkan dengan proses selanjutnya.",
    reviewedBy: "Dr. Hadi Wijaya",
    reviewedAt: new Date("2023-05-25"),
  },
  {
    id: "app-004",
    studentId: "std-004",
    studentName: "Dewi Lestari",
    studentNIM: "5566778899",
    companyName: "PT Solusi Pintar",
    companyAddress: "Jl. Kuningan No. 101, Jakarta",
    position: "Data Analyst Intern",
    startDate: new Date("2023-07-15"),
    endDate: new Date("2023-10-15"),
    status: "rejected",
    applicationDate: new Date("2023-06-05"),
    documents: [
      {
        id: "doc-007",
        name: "CV",
        url: "/documents/cv-dewi.pdf",
        type: "application/pdf",
      },
      {
        id: "doc-008",
        name: "Surat Permohonan",
        url: "/documents/surat-permohonan-dewi.pdf",
        type: "application/pdf",
      },
    ],
    feedback: "Posisi tidak sesuai dengan jurusan. Silakan ajukan kembali dengan posisi yang lebih relevan.",
    reviewedBy: "Dr. Hadi Wijaya",
    reviewedAt: new Date("2023-06-10"),
  },
  {
    id: "app-005",
    studentId: "std-005",
    studentName: "Rini Susanti",
    studentNIM: "9988776655",
    companyName: "PT Global Teknologi",
    companyAddress: "Jl. Rasuna Said No. 202, Jakarta",
    position: "Business Analyst Intern",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-11-30"),
    status: "in_progress",
    applicationDate: new Date("2023-07-01"),
    documents: [
      {
        id: "doc-009",
        name: "CV",
        url: "/documents/cv-rini.pdf",
        type: "application/pdf",
      },
      {
        id: "doc-010",
        name: "Surat Permohonan",
        url: "/documents/surat-permohonan-rini.pdf",
        type: "application/pdf",
      },
    ],
    feedback: "Aplikasi disetujui. Silakan mulai magang sesuai jadwal.",
    reviewedBy: "Dr. Hadi Wijaya",
    reviewedAt: new Date("2023-07-05"),
  },
]

// Get all internship applications
export async function getInternshipApplications(): Promise<InternshipApplication[]> {
  // In a real application, this would fetch data from a database
  return mockInternshipApplications
}

// Get internship application by ID
export async function getInternshipApplicationById(id: string): Promise<InternshipApplication | undefined> {
  // In a real application, this would fetch data from a database
  return mockInternshipApplications.find((app) => app.id === id)
}

// Update internship application status
export async function updateInternshipStatus(
  id: string,
  status: InternshipStatus,
  feedback: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // In a real application, this would update the database
    const applicationIndex = mockInternshipApplications.findIndex((app) => app.id === id)

    if (applicationIndex === -1) {
      return { success: false, message: "Aplikasi tidak ditemukan" }
    }

    mockInternshipApplications[applicationIndex] = {
      ...mockInternshipApplications[applicationIndex],
      status,
      feedback,
      reviewedBy: "Dr. Hadi Wijaya", // This would be the current user in a real application
      reviewedAt: new Date(),
    }

    revalidatePath("/dashboard/prodi/internship-approval")

    return {
      success: true,
      message:
        status === "approved"
          ? "Aplikasi berhasil disetujui"
          : status === "rejected"
            ? "Aplikasi berhasil ditolak"
            : "Status aplikasi berhasil diperbarui",
    }
  } catch (error) {
    console.error("Error updating internship status:", error)
    return { success: false, message: "Terjadi kesalahan saat memperbarui status aplikasi" }
  }
}

