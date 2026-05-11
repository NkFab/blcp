### Explain choice I made

why next and not react
why use server pages

what I could have done better?

- Caching?? Using react query
- Unit tests
- 

Features

**Authentication & Authorization:**

- JWT-based authentication with secure session management
- Four user roles: Applicant, Reviewer, Approver, and Admin with distinct permission boundaries
- Backend role enforcement on all API endpoints (returns 403 for unauthorized requests)
- **Maker-checker enforcement**: The reviewer of an application cannot be the same person who makes the final approval decision


**Workflow & State Machine:**

- Applications flow through: Draft -> Submitted -> Under Review -> (Additional Info Required) -> Reviewed -> Approved/Rejected
- Invalid state transitions are rejected at the API level with optimistic locking for concurrent access handling
- Final decisions (approved/rejected) are permanent


**Audit Trail:**

- Every action is recorded in an append-only audit log
- Each entry captures: user, action, timestamp, and state before/after
- The audit log cannot be modified or deleted, designed for legal evidence


**Document Handling:**

- File uploads with 5MB limit enforced server-side
- Document versioning (previous versions remain accessible)
- Metadata stored in database with simulated storage paths


**Pages Built:**

- Login page with demo credentials
- Dashboard with role-specific guidance
- Applications list with search and filtering
- New application form
- Application detail with workflow actions
- Users management (admin only)
- Audit log viewer (admin/approver)
- Profile page showing permissions