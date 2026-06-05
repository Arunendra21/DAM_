import accessRequestService from '../services/accessRequestService.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const createAccessRequest = asyncHandler(async (req, res) => {
  const { databaseId, accessLevel, reason, temporaryAccess, startDate, endDate } =
    req.validated

  const request = await accessRequestService.createAccessRequest(
    req.user.id,
    databaseId,
    accessLevel,
    reason,
    temporaryAccess,
    startDate,
    endDate
  )

  res.status(201).json({
    message: 'Access request created successfully',
    request,
  })
})

export const getAccessRequest = asyncHandler(async (req, res) => {
  const { id } = req.params

  const request = await accessRequestService.getAccessRequest(id)

  res.json(request)
})

export const listAccessRequests = asyncHandler(async (req, res) => {
  const { status, userId, databaseId, page = 1, limit = 10 } = req.query

  // Users can only see their own requests unless they're admin
  let filterUserId = userId
  if (!['SUPER_ADMIN', 'SECURITY_ADMIN'].includes(req.user.roles[0]?.role.name)) {
    filterUserId = req.user.id
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)

  const result = await accessRequestService.listAccessRequests({
    status,
    userId: filterUserId,
    databaseId,
    skip,
    take: parseInt(limit),
  })

  res.json(result)
})

export const approveAccessRequest = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { comments } = req.body

  const request = await accessRequestService.approveAccessRequest(
    id,
    req.user.id,
    comments
  )

  res.json({
    message: 'Access request approved',
    request,
  })
})

export const rejectAccessRequest = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { comments } = req.body

  const request = await accessRequestService.rejectAccessRequest(
    id,
    req.user.id,
    comments
  )

  res.json({
    message: 'Access request rejected',
    request,
  })
})

export const revokeAccessRequest = asyncHandler(async (req, res) => {
  const { id } = req.params

  const request = await accessRequestService.revokeAccessRequest(
    id,
    req.user.id
  )

  res.json({
    message: 'Access request revoked',
    request,
  })
})
