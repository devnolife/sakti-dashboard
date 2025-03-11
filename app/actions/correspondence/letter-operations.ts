"use server"

import { LetterRequest, LetterStatus } from "@/types/correspondence"
import { MOCK_LETTER_REQUESTS } from "./mock-data"

// Submit a new letter request
export async function submitLetterRequest(
  formData: FormData,
): Promise<{ success: boolean; message: string; requestId?: string }> {
  // In a real app, this would create a new record in a database
  
  // Mock implementation
  return {
    success: true,
    message: "Permohonan surat berhasil diajukan",
    requestId: `letter-${Date.now()}`,
  }
}

// Update the status of an existing letter request
export async function updateLetterRequestStatus(
  requestId: string,
  newStatus: LetterStatus,
  notes?: string,
  updatedBy?: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // In a real app, this would update a database record
    const requestIndex = MOCK_LETTER_REQUESTS.findIndex((req) => req.id === requestId)

    if (requestIndex === -1) {
      return { success: false, message: "Permohonan surat tidak ditemukan" }
    }

    // Update the request status
    MOCK_LETTER_REQUESTS[requestIndex].status = newStatus

    // Add notes if provided
    if (notes) {
      MOCK_LETTER_REQUESTS[requestIndex].rejectedReason = notes
    }

    // Update updatedBy if provided
    if (updatedBy) {
      MOCK_LETTER_REQUESTS[requestIndex].approvedBy = updatedBy
    }

    // If status is approved, set approvedDate
    if (newStatus === "approved") {
      MOCK_LETTER_REQUESTS[requestIndex].approvedDate = new Date().toISOString()
    }

    // If status is completed, set completedDate
    if (newStatus === "completed") {
      MOCK_LETTER_REQUESTS[requestIndex].completedDate = new Date().toISOString()
    }

    return {
      success: true,
      message: `Status permohonan surat berhasil diperbarui menjadi ${newStatus}`,
    }
  } catch (error) {
    console.error("Error updating letter request status:", error)
    return { success: false, message: "Gagal memperbarui status permohonan surat" }
  }
}

// Delete a letter request
export async function deleteLetterRequest(requestId: string): Promise<{ success: boolean; message: string }> {
  try {
    // In a real app, this would delete from a database
    const requestIndex = MOCK_LETTER_REQUESTS.findIndex((req) => req.id === requestId)

    if (requestIndex === -1) {
      return { success: false, message: "Permohonan surat tidak ditemukan" }
    }

    // Check if the request can be deleted (only draft or rejected)
    const request = MOCK_LETTER_REQUESTS[requestIndex]
    if (request.status !== "rejected") {
      return {
        success: false,
        message: "Hanya permohonan dengan status draft atau ditolak yang dapat dihapus",
      }
    }

    // Remove the request
    MOCK_LETTER_REQUESTS.splice(requestIndex, 1)

    return {
      success: true,
      message: "Permohonan surat berhasil dihapus",
    }
  } catch (error) {
    console.error("Error deleting letter request:", error)
    return { success: false, message: "Gagal menghapus permohonan surat" }
  }
} 
