"use server"

// TODO: Replace with GraphQL mutations
import type { LetterRequest } from "@/types/correspondence"

export async function createLetterRequest(data: any): Promise<LetterRequest> {
  console.log('⚠️ STUB: createLetterRequest', data)
  // TODO: Implement with GraphQL mutation
  throw new Error('Not implemented - use GraphQL mutation')
}

export async function updateLetterRequest(id: string, data: any): Promise<LetterRequest> {
  console.log('⚠️ STUB: updateLetterRequest', id, data)
  // TODO: Implement with GraphQL mutation
  throw new Error('Not implemented - use GraphQL mutation')
}

export async function deleteLetterRequest(id: string): Promise<void> {
  console.log('⚠️ STUB: deleteLetterRequest', id)
  // TODO: Implement with GraphQL mutation
  throw new Error('Not implemented - use GraphQL mutation')
}
