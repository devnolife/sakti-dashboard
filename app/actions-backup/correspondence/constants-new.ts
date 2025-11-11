"use server"

import { prisma } from "@/lib/prisma"
import { LetterType } from "@/types/correspondence"

// Get all active letter types from database
export async function getLetterTypes(): Promise<LetterType[]> {
  try {
    const letterTypes = await prisma.letterType.findMany({
      where: { is_active: true },
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

// Legacy constant for backward compatibility - now uses database data
let CACHED_LETTER_TYPES: Record<string, any> = {}

// Initialize cache on first use
async function initializeLetterTypes() {
  if (Object.keys(CACHED_LETTER_TYPES).length === 0) {
    const types = await getLetterTypes()
    types.forEach(type => {
      const key = type.title.toLowerCase().replace(/\s+/g, '_')
      CACHED_LETTER_TYPES[key] = {
        title: type.title,
        description: type.description,
        approvalRole: type.approvalRole,
        estimatedDays: type.estimatedDays,
        requiredDocuments: type.requiredDocuments,
        additionalFields: type.additionalFields
      }
    })
  }
  return CACHED_LETTER_TYPES
}

// Export for backward compatibility
export { CACHED_LETTER_TYPES as LETTER_TYPES }

// Initialize on module load
initializeLetterTypes()
