"use server"

import { prisma } from "@/lib/prisma"
import { LetterType } from "@/types/correspondence"

// Get all active letter types from database
export async function getLetterTypes(prodiId?: string): Promise<LetterType[]> {
  try {
    const where: any = {
      is_active: true
    }

    // Filter by prodi or global
    if (prodiId) {
      where.OR = [
        { prodi_id: prodiId },
        { is_global: true }
      ]
    } else {
      where.is_global = true
    }

    const letterTypes = await prisma.letter_types.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        approval_role: true,
        estimated_days: true,
        required_documents: true,
        additional_fields: true,
        prodi_id: true,
        is_global: true,
        prodi: {
          select: {
            kode: true,
            nama: true
          }
        }
      },
      orderBy: {
        title: 'asc'
      }
    })

    return letterTypes.map(type => ({
      id: type.id,
      title: type.title,
      description: type.description,
      approvalRole: type.approval_role as any,
      estimatedDays: type.estimated_days,
      requiredDocuments: type.required_documents,
      additionalFields: type.additional_fields as any,
      prodiId: type.prodi_id || undefined,
      isGlobal: type.is_global
    }))
  } catch (error) {
    console.error('Error fetching letter types:', error)
    return []
  }
}

// Get letter types as object for backward compatibility
export async function getLetterTypesAsObject(): Promise<Record<string, any>> {
  try {
    const types = await getLetterTypes()
    const result: Record<string, any> = {}

    types.forEach(type => {
      const key = type.title.toLowerCase().replace(/\s+/g, '_')
      result[key] = {
        title: type.title,
        description: type.description,
        approvalRole: type.approvalRole,
        estimatedDays: type.estimatedDays,
        requiredDocuments: type.requiredDocuments,
        additionalFields: type.additionalFields
      }
    })

    return result
  } catch (error) {
    console.error('Error fetching letter types as object:', error)
    return {}
  }
}
