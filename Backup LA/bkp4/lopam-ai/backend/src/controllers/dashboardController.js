import dashboardService from '../services/dashboardService.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStats()
  res.json(stats)
})

export const getRecentActivities = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query
  const activities = await dashboardService.getRecentActivities(parseInt(limit))
  res.json(activities)
})

export const getRecentSecurityAlerts = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query
  const alerts = await dashboardService.getRecentSecurityAlerts(parseInt(limit))
  res.json(alerts)
})

export const getAccessRequestStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getAccessRequestStats()
  res.json(stats)
})

export const getComplianceStatus = asyncHandler(async (req, res) => {
  const compliance = await dashboardService.getComplianceStatus()
  res.json(compliance)
})

export const getUserStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getUserStats()
  res.json(stats)
})

export const getDatabaseStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDatabaseStats()
  res.json(stats)
})

export const getMonthlyStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getMonthlyStats()
  res.json(stats)
})
