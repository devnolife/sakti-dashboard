import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { authMiddleware } from '@/lib/auth-middleware'

// GET: Ambil semua persyaratan KKP untuk mahasiswa tertentu (userId dari auth)
export async function GET(request: NextRequest) {
  try {
    // Gunakan authMiddleware untuk mendapatkan token/user
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) {
      return token // unauthorized / invalid token response
    }

    const userId = (token as any).sub
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Cari student berdasarkan userId
    const student = await prisma.student.findUnique({ where: { userId } })
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const requirements = await prisma.kkpRequirement.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: 'desc' }
    })

    const requiredTypes = [
      { type: 'payment_proof_kkp_plus', name: 'Bukti Pembayaran KKP Plus', description: 'Bukti pembayaran biaya KKP Plus' },
      { type: 'transcript_125_sks', name: 'Transkrip Nilai Minimal 125 SKS', description: 'Transkrip nilai yang menunjukkan minimal 125 SKS telah diselesaikan' },
      { type: 'competency_certificate', name: 'Sertifikat Kompetensi', description: 'Minimal 1 dokumen sertifikat kompetensi sesuai bidang informatika' },
      { type: 'practicum_control_card', name: 'Kartu Kontrol Praktikum', description: 'Kartu kontrol praktikum yang telah lengkap' },
      { type: 'falaq_practicum', name: 'Praktikum Ilmu Falaq', description: 'Bukti telah menyelesaikan praktikum ilmu falaq' },
      { type: 'quran_reading_certificate', name: "Surat Keterangan Baca Al-Qur'an", description: "Surat keterangan kemampuan membaca Al-Qur'an" },
      { type: 'academic_advisor_card', name: 'Kartu Kontrol PA', description: 'Kartu kontrol Penasehat Akademik dari semester 1 s/d semester berjalan' },
      { type: 'dad_certificate', name: 'Sertifikat DAD / Keterangan Lulus DAD', description: 'Sertifikat atau keterangan lulus Diklat Awal Dakwah (DAD)' }
    ]

    const result = requiredTypes.map(required => {
      const uploaded = requirements.find(req => req.requirementType === required.type)
      return { ...required, uploaded: uploaded || null, isUploaded: !!uploaded }
    })

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error fetching KKP requirements:', error)
    return NextResponse.json({ error: 'Failed to fetch KKP requirements' }, { status: 500 })
  }
}

// POST: Upload file persyaratan KKP (userId dari auth)
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) {
      return token
    }
    const userId = (token as any).sub
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const requirementType = formData.get('requirementType') as string

    if (!file || !requirementType) {
      return NextResponse.json({ error: 'File and requirement type are required' }, { status: 400 })
    }

    const student = await prisma.student.findUnique({ where: { userId } })
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
    }
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'persyaratan-kkp')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const timestamp = Date.now()
    const originalName = file.name
    const extension = path.extname(originalName)
    const fileName = `${student.id}_${requirementType}_${timestamp}${extension}`
    const filePath = path.join(uploadDir, fileName)
    const relativePath = `/uploads/persyaratan-kkp/${fileName}`

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    const existingRequirement = await prisma.kkpRequirement.findUnique({
      where: { studentId_requirementType: { studentId: student.id, requirementType: requirementType as any } }
    })

    let requirement
    if (existingRequirement) {
      requirement = await prisma.kkpRequirement.update({
        where: { id: existingRequirement.id },
        data: {
          fileName,
          originalFileName: originalName,
          filePath: relativePath,
            fileSize: file.size,
          mimeType: file.type,
          status: 'pending',
          notes: null,
          verifiedAt: null,
          verifiedBy: null
        }
      })
    } else {
      requirement = await prisma.kkpRequirement.create({
        data: {
          studentId: student.id,
          requirementType: requirementType as any,
          fileName,
          originalFileName: originalName,
          filePath: relativePath,
          fileSize: file.size,
          mimeType: file.type,
          status: 'pending'
        }
      })
    }

    return NextResponse.json({ success: true, message: 'File uploaded successfully', data: requirement })
  } catch (error) {
    console.error('Error uploading KKP requirement:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
