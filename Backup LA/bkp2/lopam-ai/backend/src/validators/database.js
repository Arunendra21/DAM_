import { z } from 'zod'

export const createDatabaseSchema = z.object({
  name: z.string().min(1, 'Database name is required').max(255),
  description: z.string().optional(),
  type: z.enum(['MYSQL', 'POSTGRESQL', 'ORACLE', 'SQL_SERVER', 'MONGODB']),
  host: z.string().min(1, 'Host is required'),
  port: z.number().int().min(1).max(65535),
  username: z.string().min(1, 'Username is required'),
  password: z.string().optional(),
  database: z.string().min(1, 'Database name is required'),
  environment: z.enum(['production', 'staging', 'development']),
  businessOwner: z.string().optional(),
  dataClassification: z.enum(['public', 'internal', 'confidential', 'restricted']).optional(),
  requiresMFA: z.boolean().default(false),
  encryptedConnection: z.boolean().default(true),
})

export const updateDatabaseSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  host: z.string().min(1).optional(),
  port: z.number().int().min(1).max(65535).optional(),
  username: z.string().min(1).optional(),
  password: z.string().optional(),
  database: z.string().min(1).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  businessOwner: z.string().optional(),
  dataClassification: z.enum(['public', 'internal', 'confidential', 'restricted']).optional(),
  requiresMFA: z.boolean().optional(),
  encryptedConnection: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

export const validateDatabaseInput = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse(req.body)
    req.validated = validated
    next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      })
    }
    next(error)
  }
}
