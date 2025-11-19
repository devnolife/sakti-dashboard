"use server"

import { prisma } from "@/lib/prisma"
import { getServerActionUserId } from "@/lib/auth-utils"
import { generateId } from "@/lib/utils"
import { uploadFile } from "@/lib/minio-client"
import { createLetterRequest } from "./letter-requests"

/**
 * Submit letter request dengan file upload ke MinIO
 * Fungsi ini handle FormData dari form mahasiswa
 */
export async function submitLetterRequestWithFiles(
  formData: FormData
): Promise<{ success: boolean; message: string; requestId?: string }> {
  try {
    // Get student ID from session
    const user_id = await getServerActionUserId()
    const user = await prisma.users.findUnique({
      where: { id: user_id },
      include: { students: true }
    })

    if (!user || !user.students) {
      return {
        success: false,
        message: "Profil mahasiswa tidak ditemukan"
      }
    }

    // Extract form data
    const letterType = formData.get('letterType') as string
    const purpose = formData.get('purpose') as string

    if (!letterType || !purpose) {
      return {
        success: false,
        message: "Jenis surat dan tujuan harus diisi"
      }
    }

    // Extract additional info
    const additionalInfo: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('additionalInfo[')) {
        const fieldName = key.match(/additionalInfo\[(.+)\]/)?.[1]
        if (fieldName) {
          additionalInfo[fieldName] = value
        }
      }
    }

    // Get letter type info
    const letterTypeInfo = await prisma.letter_types.findFirst({
      where: {
        OR: [
          { code: letterType },
          { title: letterType }
        ],
        OR: [
          { is_global: true },
          { prodi_id: user.students.prodi_id }
        ]
      }
    })

    const title = letterTypeInfo?.title || letterType
    const description = purpose

    // Upload files to MinIO
    const uploadedFiles: Array<{ name: string; url: string; mimeType: string; fileSize: number }> = []
    const files = formData.getAll('files[]') as File[]

    console.log(`📤 Uploading ${files.length} files to MinIO...`)
    console.log(`📋 Files received:`, files.map(f => ({ name: f.name, size: f.size, type: f.type })))

    if (files.length === 0) {
      console.warn('⚠️ No files found in FormData!')
    }

    for (const file of files) {
      console.log(`🔍 Processing file:`, {
        name: file.name,
        size: file.size,
        type: file.type,
        isFile: file instanceof File
      })

      if (file && file.size > 0) {
        try {
          console.log(`   📎 Uploading: ${file.name} (${file.size} bytes)`)

          // Convert File to Buffer
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          console.log(`   📦 Buffer created: ${buffer.length} bytes`)

          // Upload to MinIO
          const fileUrl = await uploadFile(buffer, file.name, file.type)

          uploadedFiles.push({
            name: file.name,
            url: fileUrl,
            mimeType: file.type,
            fileSize: file.size
          })

          console.log(`   ✅ Uploaded: ${file.name} -> ${fileUrl}`)
        } catch (error) {
          console.error(`   ❌ Failed to upload ${file.name}:`, error)
          console.error(`   ❌ Error details:`, error instanceof Error ? error.message : String(error))
          // Continue with other files even if one fails
        }
      } else {
        console.warn(`   ⚠️ Skipping invalid file:`, { name: file?.name, size: file?.size })
      }
    }

    console.log(`✅ Successfully uploaded ${uploadedFiles.length} of ${files.length} files`)

    // Create letter request with workflow
    const letterRequest = await createLetterRequest({
      studentId: user.students.id,
      type: letterType,
      title,
      purpose,
      description,
      additionalInfo,
    })

    // Create attachments in database
    if (uploadedFiles.length > 0) {
      await prisma.letter_attachments.createMany({
        data: uploadedFiles.map(file => ({
          id: generateId(),
          request_id: letterRequest.id,
          name: file.name,
          url: file.url,
          mime_type: file.mimeType,
          file_size: file.fileSize,
          upload_date: new Date()
        }))
      })

      console.log(`✅ Created ${uploadedFiles.length} attachment records`)
    }

    return {
      success: true,
      message: `Permohonan surat berhasil diajukan dengan ${uploadedFiles.length} lampiran`,
      requestId: letterRequest.id,
    }
  } catch (error) {
    console.error('❌ Error submitting letter request with files:', error)
    return {
      success: false,
      message: "Gagal mengajukan permohonan surat. Silakan coba lagi."
    }
  }
}
