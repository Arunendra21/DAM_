import express from 'express'
import {
  createDatabase,
  updateDatabase,
  deleteDatabase,
  getDatabase,
  listDatabases,
} from '../controllers/databaseController.js'
import { authenticate, authorize } from '../middleware/auth.js'
import {
  createDatabaseSchema,
  updateDatabaseSchema,
  validateDatabaseInput,
} from '../validators/database.js'

const router = express.Router()

// All database routes require authentication
router.use(authenticate)

// List databases
router.get('/', listDatabases)

// Get single database
router.get('/:id', getDatabase)

// Create database (DBA, SUPER_ADMIN)
router.post('/', authorize(['DBA', 'SUPER_ADMIN']), validateDatabaseInput(createDatabaseSchema), createDatabase)

// Update database (DBA, SUPER_ADMIN)
router.put('/:id', authorize(['DBA', 'SUPER_ADMIN']), validateDatabaseInput(updateDatabaseSchema), updateDatabase)

// Delete database (SUPER_ADMIN only)
router.delete('/:id', authorize(['SUPER_ADMIN']), deleteDatabase)

export default router
