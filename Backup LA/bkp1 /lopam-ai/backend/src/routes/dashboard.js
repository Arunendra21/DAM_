import express from 'express'
import {
  getDashboardStats,
  getRecentActivities,
  getRecentSecurityAlerts,
  getAccessRequestStats,
  getComplianceStatus,
  getUserStats,
  getDatabaseStats,
  getMonthlyStats,
} from '../controllers/dashboardController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// All dashboard routes require authentication
router.use(authenticate)

router.get('/stats', getDashboardStats)
router.get('/activities', getRecentActivities)
router.get('/security-alerts', getRecentSecurityAlerts)
router.get('/access-requests/stats', getAccessRequestStats)
router.get('/compliance', getComplianceStatus)
router.get('/users', getUserStats)
router.get('/databases', getDatabaseStats)
router.get('/monthly', getMonthlyStats)

export default router
