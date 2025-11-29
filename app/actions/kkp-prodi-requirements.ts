"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export interface KkpProdiRequirement {
  id: string
  prodi_id: string
  title: string
  description?: string
  required: boolean
  order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
  prodi?: {
    kode: string
    nama: string
  }
}

// Get all KKP requirements for a specific prodi
export async function getKkpProdiRequirements(prodiId: string): Promise<KkpProdiRequirement[]> {
  try {
    const requirements = await prisma.kkp_prodi_requirements.findMany({
      where: {
        prodi_id: prodiId,
        is_active: true,
      },
      include: {
        prodi: true,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return requirements.map(req => ({
      id: req.id,
      prodi_id: req.prodi_id,
      title: req.title,
      description: req.description || undefined,
      required: req.required,
      order: req.order,
      is_active: req.is_active,
      created_at: req.created_at,
      updated_at: req.updated_at,
      prodi: req.prodi ? {
        kode: req.prodi.kode,
        nama: req.prodi.nama,
      } : undefined,
    }))
  } catch (error) {
    console.error("Error fetching KKP prodi requirements:", error)
    return []
  }
}

// Get a single KKP prodi requirement by ID
export async function getKkpProdiRequirement(id: string): Promise<KkpProdiRequirement | null> {
  try {
    const requirement = await prisma.kkp_prodi_requirements.findUnique({
      where: { id },
      include: {
        prodi: true,
      },
    })

    if (!requirement) return null

    return {
      id: requirement.id,
      prodi_id: requirement.prodi_id,
      title: requirement.title,
      description: requirement.description || undefined,
      required: requirement.required,
      order: requirement.order,
      is_active: requirement.is_active,
      created_at: requirement.created_at,
      updated_at: requirement.updated_at,
      prodi: requirement.prodi ? {
        kode: requirement.prodi.kode,
        nama: requirement.prodi.nama,
      } : undefined,
    }
  } catch (error) {
    console.error("Error fetching KKP prodi requirement:", error)
    return null
  }
}

// Create a new KKP prodi requirement
export async function createKkpProdiRequirement(data: {
  prodi_id: string
  title: string
  description?: string
  required?: boolean
  order?: number
}): Promise<{ success: boolean; message: string; requirement?: KkpProdiRequirement }> {
  try {
    // Generate a new ID
    const id = `kkp-req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Get the highest order number for this prodi
    const maxOrder = await prisma.kkp_prodi_requirements.findFirst({
      where: { prodi_id: data.prodi_id },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const order = data.order ?? (maxOrder ? maxOrder.order + 1 : 0)

    const requirement = await prisma.kkp_prodi_requirements.create({
      data: {
        id,
        prodi_id: data.prodi_id,
        title: data.title,
        description: data.description,
        required: data.required ?? true,
        order,
        is_active: true,
        updated_at: new Date(),
      },
      include: {
        prodi: true,
      },
    })

    revalidatePath(`/dashboard/staff_tu/kkp/persyaratan`)

    return {
      success: true,
      message: "Persyaratan KKP berhasil ditambahkan",
      requirement: {
        id: requirement.id,
        prodi_id: requirement.prodi_id,
        title: requirement.title,
        description: requirement.description || undefined,
        required: requirement.required,
        order: requirement.order,
        is_active: requirement.is_active,
        created_at: requirement.created_at,
        updated_at: requirement.updated_at,
        prodi: requirement.prodi ? {
          kode: requirement.prodi.kode,
          nama: requirement.prodi.nama,
        } : undefined,
      },
    }
  } catch (error) {
    console.error("Error creating KKP prodi requirement:", error)
    return {
      success: false,
      message: "Gagal menambahkan persyaratan KKP",
    }
  }
}

// Update a KKP prodi requirement
export async function updateKkpProdiRequirement(
  id: string,
  data: {
    title?: string
    description?: string
    required?: boolean
    order?: number
    is_active?: boolean
  }
): Promise<{ success: boolean; message: string; requirement?: KkpProdiRequirement }> {
  try {
    const requirement = await prisma.kkp_prodi_requirements.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
      include: {
        prodi: true,
      },
    })

    revalidatePath(`/dashboard/staff_tu/kkp/persyaratan`)

    return {
      success: true,
      message: "Persyaratan KKP berhasil diperbarui",
      requirement: {
        id: requirement.id,
        prodi_id: requirement.prodi_id,
        title: requirement.title,
        description: requirement.description || undefined,
        required: requirement.required,
        order: requirement.order,
        is_active: requirement.is_active,
        created_at: requirement.created_at,
        updated_at: requirement.updated_at,
        prodi: requirement.prodi ? {
          kode: requirement.prodi.kode,
          nama: requirement.prodi.nama,
        } : undefined,
      },
    }
  } catch (error) {
    console.error("Error updating KKP prodi requirement:", error)
    return {
      success: false,
      message: "Gagal memperbarui persyaratan KKP",
    }
  }
}

// Delete a KKP prodi requirement (soft delete)
export async function deleteKkpProdiRequirement(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.kkp_prodi_requirements.update({
      where: { id },
      data: {
        is_active: false,
        updated_at: new Date(),
      },
    })

    revalidatePath(`/dashboard/staff_tu/kkp/persyaratan`)

    return {
      success: true,
      message: "Persyaratan KKP berhasil dihapus",
    }
  } catch (error) {
    console.error("Error deleting KKP prodi requirement:", error)
    return {
      success: false,
      message: "Gagal menghapus persyaratan KKP",
    }
  }
}

// Reorder KKP prodi requirements
export async function reorderKkpProdiRequirements(
  requirements: { id: string; order: number }[]
): Promise<{ success: boolean; message: string }> {
  try {
    // Update all requirements in a transaction
    await prisma.$transaction(
      requirements.map(req =>
        prisma.kkp_prodi_requirements.update({
          where: { id: req.id },
          data: { order: req.order, updated_at: new Date() },
        })
      )
    )

    revalidatePath(`/dashboard/staff_tu/kkp/persyaratan`)

    return {
      success: true,
      message: "Urutan persyaratan berhasil diperbarui",
    }
  } catch (error) {
    console.error("Error reordering KKP prodi requirements:", error)
    return {
      success: false,
      message: "Gagal memperbarui urutan persyaratan",
    }
  }
}
