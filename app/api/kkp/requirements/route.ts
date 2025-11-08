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

    const user_id = (token as any).sub
    if (!user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Cari student berdasarkan user_id
    const student = await prisma.students.findUnique({ where: { user_id } })
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const requirements = await prisma.kkp_requirements.findMany({
      where: { student_id: student.id },
      orderBy: { created_at: 'desc' }
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
      const uploaded = requirements.find(req => req.requirement_type === required.type)
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
    const user_id = (token as any).sub
    if (!user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const requirement_type = formData.get('requirementType') as string

    if (!file || !requirement_type) {
      return NextResponse.json({ error: 'File and requirement type are required' }, { status: 400 })
    }

    const student = await prisma.students.findUnique({ where: { user_id } })
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
    const fileName = `${student.id}_${requirement_type}_${timestamp}${extension}`
    const filePath = path.join(uploadDir, fileName)
    const relativePath = `/uploads/persyaratan-kkp/${fileName}`

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    const existingRequirement = await prisma.kkp_requirements.findUnique({
      where: { student_id_requirement_type: { student_id: student.id, requirement_type: requirement_type as any } }
    })

    let requirement
    if (existingRequirement) {
      requirement = await prisma.kkp_requirements.update({
        where: { id: existingRequirement.id },
        data: {
          file_name: fileName,
          original_file_name: originalName,
          file_path: relativePath,
          file_size: file.size,
          mime_type: file.type,
          status: 'pending',
          notes: null,
          verified_at: null,
          verified_by: null
        }
      })
    } else {
      requirement = await prisma.kkp_requirements.create({
        data: {
          id: `kkpreq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          student_id: student.id,
          requirement_type: requirement_type as any,
          file_name: fileName,
          original_file_name: originalName,
          file_path: relativePath,
          file_size: file.size,
          mime_type: file.type,
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
