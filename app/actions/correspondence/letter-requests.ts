"use server"

// TODO: Replace with GraphQL queries
import type { LetterRequest } from "@/types/correspondence"

export async function getLetterRequests(): Promise<LetterRequest[]> {
  console.log('⚠️ STUB: getLetterRequests')
  // TODO: Implement with GraphQL query
  return []
}

export async function getLetterRequestById(id: string): Promise<LetterRequest | null> {
  console.log('⚠️ STUB: getLetterRequestById', id)
  // TODO: Implement with GraphQL query
  return null
}

export async function getMyLetterRequests(userId: string): Promise<LetterRequest[]> {
  console.log('⚠️ STUB: getMyLetterRequests', userId)
  // TODO: Implement with GraphQL query
  return []
}
