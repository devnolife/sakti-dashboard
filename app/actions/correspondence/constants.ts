"use server"

import { prisma } from "@/lib/prisma"
import { LetterType } from "@/types/correspondence"

// Get all active letter types from database
export async function getLetterTypes(): Promise<LetterType[]> {
  try {
    const letterTypes = await prisma.letterType.findMany({
      where: { isActive: true },
      orderBy: { title: 'asc' }
    })

    return letterTypes.map(type => ({
      id: type.id,
      title: type.title,
      description: type.description,
      approvalRole: type.approvalRole as any,
      estimatedDays: type.estimatedDays,
      requiredDocuments: type.requiredDocuments,
      additionalFields: type.additionalFields as any
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
