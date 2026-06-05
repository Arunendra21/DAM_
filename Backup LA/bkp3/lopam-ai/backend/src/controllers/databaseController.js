import databaseService from '../services/databaseService.js'
import { asyncHandler } from '../middleware/errorHandler.js'

export const createDatabase = asyncHandler(async (req, res) => {
  const database = await databaseService.createDatabase(
    req.user.id,
    req.validated
  )

  res.status(201).json({
    message: 'Database created successfully',
    database,
  })
})

export const updateDatabase = asyncHandler(async (req, res) => {
  const { id } = req.params

  const database = await databaseService.updateDatabase(
    req.user.id,
    id,
    req.validated
  )

  res.json({
    message: 'Database updated successfully',
    database,
  })
})

export const deleteDatabase = asyncHandler(async (req, res) => {
  const { id } = req.params

  const database = await databaseService.deleteDatabase(req.user.id, id)

  res.json({
    message: 'Database deleted successfully',
    database,
  })
})

export const getDatabase = asyncHandler(async (req, res) => {
  const { id } = req.params

  const database = await databaseService.getDatabase(id)

  res.json(database)
})

export const listDatabases = asyncHandler(async (req, res) => {
  const { type, environment, isActive, page = 1, limit = 10, search } =
    req.query

  if (search) {
    const databases = await databaseService.searchDatabases(search)
    return res.json(databases)
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)

  const result = await databaseService.listDatabases({
    type,
    environment,
    isActive: isActive === 'true',
    skip,
    take: parseInt(limit),
  })

  res.json(result)
})
