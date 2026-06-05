# Lopam AI DAM Backend

A production-ready Node.js/Express backend for the Database Access Management (DAM) platform.

## Features

- ✅ JWT Authentication with Refresh Tokens
- ✅ Role-Based Access Control (RBAC)
- ✅ Database Inventory Management
- ✅ Access Request Workflow
- ✅ Credential Vault
- ✅ Audit Logging
- ✅ Security Event Tracking
- ✅ Notification System
- ✅ Compliance Policies
- ✅ Reports Generation

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **Validation**: Zod
- **Logging**: Built-in logger

## Prerequisites

- Node.js 16+
- PostgreSQL 12+
- npm or yarn

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/lopam_dam
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key
# ... other variables
```

### 3. Initialize the Database

```bash
npm run prisma:generate
npm run migrate
npm run seed
```

This will:
- Generate Prisma client
- Run database migrations
- Seed default roles and admin user

### 4. Start the Server

#### Development

```bash
npm run dev
```

The server will restart automatically when you make changes.

#### Production

```bash
npm start
```

## API Documentation

### Base URL

```
http://localhost:8080
```

### Health Check

```bash
GET /health
```

### Authentication Endpoints

#### Register

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "emailOrUsername": "user@example.com",
  "password": "SecurePassword123!",
  "rememberMe": false
}

Response: 200 OK
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["USER"]
  }
}
```

#### Refresh Token

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response: 200 OK
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get Current User

```bash
GET /api/auth/me
Authorization: Bearer <accessToken>

Response: 200 OK
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["USER"],
    "mfaEnabled": false,
    "status": "active",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Logout

```bash
POST /api/auth/logout
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

#### Change Password

```bash
POST /api/auth/change-password
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "currentPassword": "SecurePassword123!",
  "newPassword": "NewSecurePassword456!"
}

Response: 200 OK
{
  "message": "Password changed successfully"
}
```

### Database Endpoints

#### List Databases

```bash
GET /api/databases?type=POSTGRESQL&environment=production&page=1&limit=10
Authorization: Bearer <accessToken>

Response: 200 OK
{
  "databases": [...],
  "total": 25,
  "page": 1
}
```

#### Get Database

```bash
GET /api/databases/:id
Authorization: Bearer <accessToken>

Response: 200 OK
{
  "id": "...",
  "name": "production-db",
  "type": "POSTGRESQL",
  "host": "db.example.com",
  "port": 5432,
  "environment": "production",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Create Database

```bash
POST /api/databases
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "production-db",
  "description": "Main production database",
  "type": "POSTGRESQL",
  "host": "db.example.com",
  "port": 5432,
  "username": "admin",
  "password": "secure-password",
  "database": "mydb",
  "environment": "production",
  "businessOwner": "John Doe",
  "dataClassification": "confidential",
  "requiresMFA": true,
  "encryptedConnection": true
}

Response: 201 Created
{
  "message": "Database created successfully",
  "database": {...}
}
```

#### Update Database

```bash
PUT /api/databases/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "production-db-updated",
  "description": "Updated description"
}

Response: 200 OK
{
  "message": "Database updated successfully",
  "database": {...}
}
```

#### Delete Database

```bash
DELETE /api/databases/:id
Authorization: Bearer <accessToken>

Response: 200 OK
{
  "message": "Database deleted successfully",
  "database": {...}
}
```

## Default Admin User

After seeding:

- **Email**: admin@lopam.ai
- **Username**: admin
- **Password**: Admin@123456

⚠️ **Change this password immediately in production!**

## Roles

### 1. SUPER_ADMIN
- Full system access
- Can manage users, roles, and permissions
- Can approve/reject all requests
- Can delete databases
- Full audit log access

### 2. SECURITY_ADMIN
- Security and access management
- Can approve/reject access requests
- Can manage MFA and security policies
- Can view security alerts
- Limited audit log access

### 3. DBA
- Database administration
- Can create, update, and manage databases
- Can grant database access
- Can manage credentials
- Can view database-related audit logs

### 4. AUDITOR
- Audit and compliance
- Read-only access to audit logs
- Can generate compliance reports
- Can view security events
- Cannot modify any data

### 5. USER
- Regular user
- Can request database access
- Can view their own access requests
- Can manage their own profile
- Limited audit log access (own activities only)

## Environment Variables

See `.env.example` for all available environment variables.

### Key Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `JWT_SECRET` | Yes | - | JWT signing secret |
| `JWT_REFRESH_SECRET` | Yes | - | Refresh token signing secret |
| `PORT` | No | 8080 | Server port |
| `NODE_ENV` | No | development | Environment (development, production) |
| `FRONTEND_URL` | No | http://localhost:3000 | Frontend URL for CORS |
| `SMTP_HOST` | No | - | Email server host |
| `SMTP_USER` | No | - | Email server username |
| `BCRYPT_ROUNDS` | No | 10 | Password hashing rounds |

## Database Schema

The schema includes the following main tables:

- `users` - User accounts
- `roles` - Role definitions
- `permissions` - Permission definitions
- `databases` - Database inventory
- `access_requests` - Access request workflow
- `approvals` - Approval chain
- `credential_vault` - Encrypted credentials
- `credential_checkouts` - Credential usage tracking
- `audit_logs` - Activity logging
- `security_events` - Security alerts and incidents
- `notifications` - User notifications
- `sessions` - Active sessions
- `reports` - Generated reports

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*(),.?":{}|<>)

## Security Features

- ✅ JWT with short expiration (15 minutes)
- ✅ Refresh tokens with longer expiration (7 days)
- ✅ bcryptjs password hashing (10 rounds)
- ✅ Account lockout after 5 failed attempts
- ✅ CORS protection
- ✅ Input validation with Zod
- ✅ Audit logging for all operations
- ✅ Role-based access control
- ✅ Database password encryption

## Development

### File Structure

```
backend/
├── src/
│   ├── controllers/        # HTTP request handlers
│   ├── routes/            # Express routes
│   ├── middleware/        # Express middleware
│   ├── services/          # Business logic
│   ├── validators/        # Zod schemas
│   ├── utils/             # Helper functions
│   ├── config/            # Configuration
│   └── server.js          # Express app setup
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Database seeding
├── package.json
├── .env.example
└── README.md
```

### Adding a New Feature

1. **Create validators** in `src/validators/`
2. **Create service** in `src/services/`
3. **Create controller** in `src/controllers/`
4. **Create routes** in `src/routes/`
5. **Add to `src/server.js`**

### Testing

```bash
npm test
```

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check Prisma setup
npm run prisma:generate
```

### Migration Issues

```bash
# Reset database (development only!)
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name <migration_name>
```

### Port Already in Use

```bash
# Change PORT in .env or use different port
PORT=8081 npm run dev
```

## Production Deployment

1. **Set environment variables** on server
2. **Run migrations**: `npm run migrate:deploy`
3. **Build**: `npm run build`
4. **Start**: `npm start`
5. **Use process manager** (PM2, systemd, etc.)

### PM2 Example

```bash
npm install -g pm2
pm2 start src/server.js --name "lopam-dam"
pm2 save
pm2 startup
```

## License

MIT

## Support

For issues and feature requests, please visit the project repository.
