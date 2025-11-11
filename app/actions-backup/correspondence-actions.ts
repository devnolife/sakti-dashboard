// Export only the server action functions from individual files
// The "use server" directive is in those individual files instead of here

// Letter request query functions
export { 
  getLetterRequestsForApproval,
  getStudentLetterRequests,
  getLetterRequestById
} from './correspondence/letter-requests';

// Letter operation functions
export {
  submitLetterRequest,
  updateLetterRequestStatus,
  deleteLetterRequest
} from './correspondence/letter-operations';

// Export functions needed by client components
export { getLetterTypes, getLetterTypesAsObject } from './correspondence/constants';

