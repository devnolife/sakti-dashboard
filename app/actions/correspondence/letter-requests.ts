"use server"

import { LetterRequest } from "@/types/correspondence"
import { MOCK_LETTER_REQUESTS } from "./mock-data"

// Get letter requests that need approval by a specific role
export async function getLetterRequestsForApproval(role: string): Promise<LetterRequest[]> {
  return MOCK_LETTER_REQUESTS.filter((req) => req.approvalRole === role)
}

// Get letter requests submitted by a specific student
export async function getStudentLetterRequests(studentId: string): Promise<LetterRequest[]> {
  return MOCK_LETTER_REQUESTS.filter((req) => req.studentId === studentId)
}

// Get a specific letter request by its ID
export async function getLetterRequestById(requestId: string): Promise<LetterRequest | null> {
  const request = MOCK_LETTER_REQUESTS.find((req) => req.id === requestId)
  return request || null
} 
