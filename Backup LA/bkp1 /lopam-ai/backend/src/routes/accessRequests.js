import express from 'express'
import {
  createAccessRequest,
  getAccessRequest,
  listAccessRequests,
  approveAccessRequest,
  rejectAccessRequest,
  revokeAccessRequest,
} from '../controllers/accessRequestController.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// List access requests
router.get('/', listAccessRequests)

// Get single request
router.get('/:id', getAccessRequest)

// Create access request (all authenticated users)
router.post('/', createAccessRequest)

// Approve request (SECURITY_ADMIN, SUPER_ADMIN)
router.post('/:id/approve', authorize(['SECURITY_ADMIN', 'SUPER_ADMIN']), approveAccessRequest)

// Reject request (SECURITY_ADMIN, SUPER_ADMIN)
router.post('/:id/reject', authorize(['SECURITY_ADMIN', 'SUPER_ADMIN']), rejectAccessRequest)

// Revoke request (DBA, SUPER_ADMIN)
router.post('/:id/revoke', authorize(['DBA', 'SUPER_ADMIN']), revokeAccessRequest)

export default router
