"use server"

// TODO: Replace with GraphQL queries
// import { prisma } from "@/lib/prisma"
import { LetterType } from "@/types/correspondence"

// Get all active letter types from database
export async function getLetterTypes(): Promise<LetterType[]> {
  console.log('⚠️ STUB: getLetterTypes')
  // TODO: Implement with GraphQL
  return []
}

export async function getLetterTypeByCode(code: string): Promise<LetterType | null> {
  console.log('⚠️ STUB: getLetterTypeByCode', code)
  // TODO: Implement with GraphQL
  return null
}

export async function getLetterTypeById(id: string): Promise<LetterType | null> {
  console.log('⚠️ STUB: getLetterTypeById', id)
  // TODO: Implement with GraphQL
  return null
}
