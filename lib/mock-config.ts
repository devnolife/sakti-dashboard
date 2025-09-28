// Mock configuration for development/testing
// In production, this would come from authentication context

export const MOCK_STUDENT_ID = "cmfzd9liq00019yg6yfg6uj41"

// Helper function to get current student ID
// In real app, this would get from auth context/session
export function getCurrentStudentId(): string {
  // TODO: Replace with actual auth context
  return MOCK_STUDENT_ID
}
