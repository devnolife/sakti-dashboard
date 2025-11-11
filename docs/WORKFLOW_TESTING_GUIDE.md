# Workflow System Testing Guide

## Prerequisites

Before testing the workflow system, you need admin users in the database:

### Required Admin Users

1. **Admin Umum** (admin_umum role)
   - Reviews initial letter requests
   - Forwards to WD1
   
2. **Dekan** (dekan role - used as WD1 for testing)
   - Approves/rejects/returns letter requests

### Creating Admin Users (Manual)

Run in psql or database client:

```sql
-- Create Admin Umum user
INSERT INTO dev.users (id, email, name, role, created_at, updated_at)
VALUES (
  'admin_umum_001',
  'admin.umum@unismuh.ac.id',
  'Admin Umum Test',
  'admin_umum',
  NOW(),
  NOW()
);

-- Create Dekan user (as WD1)
INSERT INTO dev.users (id, email, name, role, created_at, updated_at)
VALUES (
  'dekan_001',
  'dekan@unismuh.ac.id',
  'Dekan Test',
  'dekan',
  NOW(),
  NOW()
);
```

## Seeding Test Data

Once admin users exist, run:

```bash
npx tsx prisma/seeds/seed-workflow-test.ts
```

This creates:
- 5 requests in `initial_review` stage (assigned to Admin Umum)
- 3 requests in `wd1_approval` stage (assigned to WD1)
- 2 completed requests
- 1 rejected request

## Testing Workflow

### 1. Test Admin Umum Dashboard

**URL:** `/dashboard/admin_umum/correspondence`

**Actions to test:**
- View assigned requests (should see 5 in initial_review)
- Click "Teruskan ke WD1" button
- Add optional notes
- Verify request moves to WD1

**Expected behavior:**
- Request disappears from Admin Umum dashboard
- workflow_stage changes to "wd1_approval"
- workflow_history logs the "forwarded" action
- assigned_to changes to WD1 user ID

### 2. Test WD1 Dashboard

**URL:** `/dashboard/wd1/correspondence`

**Actions to test:**
- View requests awaiting approval (should see 3+ forwarded requests)
- Test "Setujui" (Approve):
  - Click approve button
  - Add optional notes
  - Verify request is marked complete
- Test "Revisi" (Return):
  - Click return button
  - Add revision notes (required)
  - Verify request goes back to Admin Umum
- Test "Tolak" (Reject):
  - Click reject button
  - Add rejection reason (required)
  - Verify request is marked rejected

**Expected behaviors:**
- **Approve:** workflow_stage → "completed", status → "approved"
- **Return:** workflow_stage → "initial_review", back to Admin Umum
- **Reject:** workflow_stage → "rejected", status → "rejected"
- All actions logged in workflow_history

### 3. Test Student Submission

**URL:** `/dashboard/mahasiswa/correspondence` or wherever student form is

**Actions to test:**
- Submit new letter request
- Verify auto-assignment:
  - "aktif" type → assigned to admin_umum
  - "kkp", "ujian", "cuti" → assigned to staff_tu
- Check workflow_stage is "initial_review"
- Check workflow_history has "submitted" action

**Expected behavior:**
- Request created with workflow_stage = "initial_review"
- assigned_to set to appropriate admin role
- Success message mentions admin review
- Request appears in Admin Umum dashboard

### 4. Test Workflow Timeline Component

**Usage in any detail view:**

```tsx
import { WorkflowTimeline } from "@/components/correspondence/workflow-timeline"

<WorkflowTimeline requestId={request.id} />
```

**Expected display:**
- Timeline shows all actions chronologically
- Each action has icon, label, actor role, timestamp
- Notes/comments displayed for each action
- Visual indicators (colors, icons) match action types

## Workflow Stage Diagram

```
Student Submit
     ↓
initial_review (Admin Umum reviews)
     ↓ [Forward]
wd1_approval (WD1 reviews)
     ↓ [Approve]
completed ✅

Alternative paths:
- Any stage → [Reject] → rejected ❌
- wd1_approval → [Return] → initial_review (revision cycle)
```

## Workflow Actions Reference

| Action | Actor | From Stage | To Stage | Required Data |
|--------|-------|------------|----------|---------------|
| `submitted` | Student | - | initial_review | request details |
| `forwarded` | Admin Umum | initial_review | wd1_approval | optional notes |
| `approved` | WD1 | wd1_approval | completed | optional notes |
| `rejected` | Admin/WD1 | any | rejected | reason (required) |
| `returned` | WD1 | wd1_approval | initial_review | notes (required) |

## API Functions Reference

### Workflow Service (`app/actions/correspondence/workflow.ts`)

```typescript
// Auto-assign request to admin based on letter type
assignLetterRequest(requestId: string, letterType: string)

// Forward from Admin to WD1
forwardToWD1(requestId: string, userId: string, notes?: string)

// Approve by WD1 (final approval)
approveByWD1(requestId: string, userId: string, notes?: string)

// Reject at any stage
rejectLetterRequest(requestId: string, userId: string, reason: string)

// Return for revision (WD1 → Admin)
returnForRevision(requestId: string, userId: string, notes: string)

// Get workflow history for request
getWorkflowHistory(requestId: string)

// Get requests assigned to specific user
getAssignedRequests(userId: string)
```

### Letter Request Actions (`app/actions/correspondence/letter-requests.ts`)

```typescript
// Create new request with auto-assignment
createLetterRequest(data: LetterRequestData)

// Wrapper functions for workflow actions
forwardLetterToWD1(requestId: string, userId: string, notes?: string)
approveLetterRequest(requestId: string, userId: string, notes?: string)
rejectRequest(requestId: string, userId: string, reason: string)
returnLetterForRevision(requestId: string, userId: string, notes: string)
```

## Database Schema Reference

### letter_requests (workflow fields)

```prisma
workflow_stage String @default("initial_review") // initial_review | wd1_approval | completed | rejected
assigned_to String? // User ID of current assignee
forwarded_by String? // User ID who forwarded
forwarded_at DateTime? // When forwarded
wd1_approved_by String? // User ID of WD1 approver
wd1_approved_at DateTime? // When approved
wd1_notes String? // WD1 notes/comments
```

### workflow_history

```prisma
id String @id
letter_request_id String // FK to letter_requests
action String // submitted | reviewed | forwarded | approved | rejected | returned
actor_id String // User ID who performed action
actor_role String // Role of actor
notes String? // Optional notes/comments
created_at DateTime // When action occurred
```

## Troubleshooting

### Issue: Admin dashboard shows no requests
**Solution:** 
1. Check admin user exists with correct role
2. Run seed script to create test data
3. Check assigned_to field matches admin user ID

### Issue: Forward button doesn't work
**Solution:**
1. Check user authentication (useAuth hook)
2. Verify forwardLetterToWD1 action is imported correctly
3. Check browser console for errors

### Issue: Workflow history not showing
**Solution:**
1. Check workflow_history table has records
2. Verify getWorkflowHistory is called with correct request ID
3. Check WorkflowTimeline component is rendering

### Issue: Stage transitions not working
**Solution:**
1. Check workflow.ts stage validation logic
2. Verify current workflow_stage before transition
3. Check workflow_history is being created

## Production Considerations

### Before deploying:

1. **Create real admin users** through proper user management
2. **Add email notifications** for workflow actions
3. **Implement PDF generation** when WD1 approves (TODO in workflow.ts:188)
4. **Add role-based access control** to dashboard routes
5. **Set up logging** for workflow actions
6. **Add audit trail UI** for admins to view all actions
7. **Implement letter numbering integration** with correspondence_requests table

### Security:

- Verify user permissions before each workflow action
- Validate workflow_stage before allowing transitions
- Sanitize user input (notes, reasons)
- Use server actions ("use server") for all mutations
- Implement rate limiting for action endpoints

### Performance:

- Index workflow_stage and assigned_to columns
- Consider pagination for large request lists
- Cache getAssignedRequests results
- Optimize workflow_history queries with proper includes
