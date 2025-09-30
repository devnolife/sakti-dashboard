"use server"

import { LetterStatus } from "@/types/correspondence"
import { prisma } from "@/lib/prisma"
import { getServerActionUserId } from "@/lib/auth-utils"

// Submit a new letter request
export async function submitLetterRequest(
  type: string,
  title: string,
  purpose: string,
  description: string,
  additionalInfo?: any,
  attachments?: Array<{ name: string; url: string; mimeType?: string; fileSize?: number }>
): Promise<{ success: boolean; message: string; requestId?: string }> {
  try {
    // Get student ID from session
    const userId = await getServerActionUserId()
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { studentProfile: true }
    })

    if (!user || !user.studentProfile) {
      return {
        success: false,
        message: "Student profile not found"
      }
    }

    // Get letter type info to determine approval role
    const letterType = await prisma.letterType.findFirst({
      where: { title: title }
    })

    const approvalRole = letterType?.approvalRole || 'staff_tu'

    // Create letter request
    const letterRequest = await prisma.letterRequest.create({
      data: {
        type,
        title,
        purpose,
        description,
        studentId: user.studentProfile.id,
        approvalRole: approvalRole as any,
        additionalInfo: additionalInfo || {},
        status: 'submitted'
      }
    })

    // Create attachments if provided
    if (attachments && attachments.length > 0) {
      await prisma.letterAttachment.createMany({
        data: attachments.map(att => ({
          requestId: letterRequest.id,
          name: att.name,
          url: att.url,
          mimeType: att.mimeType,
          fileSize: att.fileSize
        }))
      })
    }

    return {
      success: true,
      message: "Permohonan surat berhasil diajukan",
      requestId: letterRequest.id,
    }
  } catch (error) {
    console.error('Error submitting letter request:', error)
    return {
      success: false,
      message: "Gagal mengajukan permohonan surat"
    }
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
    const updateData: any = {
      status: newStatus,
      updatedAt: new Date()
    }

    // Add notes if provided
    if (notes) {
      updateData.rejectedReason = notes
    }

    // Update updatedBy if provided
    if (updatedBy) {
      updateData.approvedBy = updatedBy
    }

    // Set appropriate dates based on status
    if (newStatus === "approved") {
      updateData.approvedDate = new Date()
    } else if (newStatus === "completed") {
      updateData.completedDate = new Date()
    }

    const updatedRequest = await prisma.letterRequest.update({
      where: { id: requestId },
      data: updateData
    })

    return {
      success: true,
      message: `Status permohonan berhasil diubah menjadi ${newStatus}`
    }
  } catch (error) {
    console.error('Error updating letter request status:', error)
    return {
      success: false,
      message: "Gagal mengubah status permohonan"
    }
  }
}

// Delete a letter request (only if not yet approved)
export async function deleteLetterRequest(
  requestId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const request = await prisma.letterRequest.findUnique({
      where: { id: requestId }
    })

    if (!request) {
      return {
        success: false,
        message: "Permohonan surat tidak ditemukan"
      }
    }

    // Only allow deletion if not yet approved
    if (request.status === 'approved' || request.status === 'completed') {
      return {
        success: false,
        message: "Permohonan yang sudah disetujui tidak dapat dihapus"
      }
    }

    await prisma.letterRequest.delete({
      where: { id: requestId }
    })

    return {
      success: true,
      message: "Permohonan surat berhasil dihapus"
    }
  } catch (error) {
    console.error('Error deleting letter request:', error)
    return {
      success: false,
      message: "Gagal menghapus permohonan surat"
    }
  }
}
