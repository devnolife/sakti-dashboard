// Mock configuration for development/testing
// In production, this would come from authentication context

export const MOCK_STUDENT_ID = "cmg3rxcbi00019yl0b38jhy03"

// Helper function to get current student ID
// In real app, this would get from auth context/session
export function getCurrentStudentId(): string {
  // TODO: Replace with actual auth context
  console.log('🆔 Using student_id:', MOCK_STUDENT_ID)
  return MOCK_STUDENT_ID
}
