// ============================================
// DATABASE INVENTORY DATA
// ============================================
export const databaseInventoryData = [
  {
    id: 1,
    name: 'ProductionDB-01',
    type: 'PostgreSQL',
    owner: 'Database Admin',
    environment: 'Production',
    size: '245 GB',
    status: 'Healthy',
    lastBackup: '2024-06-03 23:45',
    connectionCount: 1250,
  },
  {
    id: 2,
    name: 'AnalyticsDB-02',
    type: 'MySQL',
    owner: 'Analytics Team',
    environment: 'Production',
    size: '512 GB',
    status: 'Healthy',
    lastBackup: '2024-06-03 22:30',
    connectionCount: 850,
  },
  {
    id: 3,
    name: 'UserServiceDB',
    type: 'PostgreSQL',
    owner: 'Platform Team',
    environment: 'Production',
    size: '128 GB',
    status: 'Warning',
    lastBackup: '2024-06-02 21:15',
    connectionCount: 2100,
  },
  {
    id: 4,
    name: 'MongoCluster-03',
    type: 'MongoDB',
    owner: 'Data Engineering',
    environment: 'Staging',
    size: '756 GB',
    status: 'Healthy',
    lastBackup: '2024-06-03 20:00',
    connectionCount: 340,
  },
  {
    id: 5,
    name: 'OracleFinance',
    type: 'Oracle',
    owner: 'Finance Team',
    environment: 'Production',
    size: '890 GB',
    status: 'Critical',
    lastBackup: '2024-05-30 18:00',
    connectionCount: 560,
  },
  {
    id: 6,
    name: 'SQLServer-Legacy',
    type: 'SQL Server',
    owner: 'Legacy Systems',
    environment: 'Legacy',
    size: '340 GB',
    status: 'Healthy',
    lastBackup: '2024-06-03 19:30',
    connectionCount: 280,
  },
  {
    id: 7,
    name: 'CacheDB-Redis-01',
    type: 'Redis',
    owner: 'Infrastructure',
    environment: 'Production',
    size: '45 GB',
    status: 'Healthy',
    lastBackup: '2024-06-03 23:00',
    connectionCount: 4500,
  },
  {
    id: 8,
    name: 'ReportDB-03',
    type: 'PostgreSQL',
    owner: 'Analytics',
    environment: 'Production',
    size: '678 GB',
    status: 'Healthy',
    lastBackup: '2024-06-03 21:45',
    connectionCount: 420,
  },
]

// ============================================
// USER MANAGEMENT DATA
// ============================================
export const usersData = [
  {
    id: 1,
    name: 'John Admin',
    email: 'john.admin@company.com',
    role: 'Administrator',
    department: 'IT',
    lastLogin: '2024-06-04 09:15',
    status: 'Active',
    createdAt: '2023-01-15',
  },
  {
    id: 2,
    name: 'Sarah DBA',
    email: 'sarah.dba@company.com',
    role: 'DBA',
    department: 'Database',
    lastLogin: '2024-06-04 08:45',
    status: 'Active',
    createdAt: '2023-02-20',
  },
  {
    id: 3,
    name: 'Mike Analyst',
    email: 'mike.analyst@company.com',
    role: 'Analyst',
    department: 'Analytics',
    lastLogin: '2024-06-03 17:30',
    status: 'Active',
    createdAt: '2023-03-10',
  },
  {
    id: 4,
    name: 'Emma Security',
    email: 'emma.security@company.com',
    role: 'Security Officer',
    department: 'Security',
    lastLogin: '2024-06-04 07:00',
    status: 'Active',
    createdAt: '2022-11-01',
  },
  {
    id: 5,
    name: 'David Dev',
    email: 'david.dev@company.com',
    role: 'Developer',
    department: 'Engineering',
    lastLogin: '2024-05-28 16:45',
    status: 'Inactive',
    createdAt: '2023-04-12',
  },
  {
    id: 6,
    name: 'Lisa Auditor',
    email: 'lisa.auditor@company.com',
    role: 'Auditor',
    department: 'Compliance',
    lastLogin: '2024-06-02 14:20',
    status: 'Active',
    createdAt: '2023-06-01',
  },
]

// ============================================
// ACCESS REQUESTS DATA
// ============================================
export const accessRequestsData = [
  {
    id: 'REQ-001',
    user: 'John Developer',
    database: 'ProductionDB-01',
    requestedAccess: 'SELECT',
    duration: '30 days',
    status: 'Pending',
    requestedDate: '2024-06-04 10:30',
    reason: 'Data analysis for Q2 reporting',
  },
  {
    id: 'REQ-002',
    user: 'Sarah Analyst',
    database: 'AnalyticsDB-02',
    requestedAccess: 'SELECT, INSERT',
    duration: '7 days',
    status: 'Approved',
    requestedDate: '2024-06-03 15:45',
    approvedDate: '2024-06-03 16:20',
    reason: 'ETL pipeline updates',
  },
  {
    id: 'REQ-003',
    user: 'Mike Intern',
    database: 'UserServiceDB',
    requestedAccess: 'SELECT',
    duration: '60 days',
    status: 'Rejected',
    requestedDate: '2024-06-02 11:00',
    reason: 'Insufficient clearance',
  },
  {
    id: 'REQ-004',
    user: 'Emma DBA',
    database: 'OracleFinance',
    requestedAccess: 'SELECT, INSERT, UPDATE, DELETE',
    duration: '90 days',
    status: 'Pending',
    requestedDate: '2024-06-04 09:15',
    reason: 'Finance system maintenance',
  },
  {
    id: 'REQ-005',
    user: 'Alex Viewer',
    database: 'ReportDB-03',
    requestedAccess: 'SELECT',
    duration: '30 days',
    status: 'Approved',
    requestedDate: '2024-06-01 13:30',
    approvedDate: '2024-06-01 14:00',
    reason: 'Monthly report generation',
  },
]

// ============================================
// ACTIVITY LOGS DATA
// ============================================
export const activityLogsData = [
  {
    id: 1,
    timestamp: '2024-06-04 10:45',
    user: 'Sarah DBA',
    action: 'Database Connection',
    database: 'ProductionDB-01',
    severity: 'info',
    details: 'Connected to ProductionDB-01',
  },
  {
    id: 2,
    timestamp: '2024-06-04 10:30',
    user: 'John Admin',
    action: 'User Created',
    database: '-',
    severity: 'info',
    details: 'New user account created',
  },
  {
    id: 3,
    timestamp: '2024-06-04 09:50',
    user: 'Mike Analyst',
    action: 'Query Executed',
    database: 'AnalyticsDB-02',
    severity: 'warning',
    details: 'Long-running query detected (15 min)',
  },
  {
    id: 4,
    timestamp: '2024-06-04 09:15',
    user: 'Unknown',
    action: 'Failed Login Attempt',
    database: '-',
    severity: 'critical',
    details: 'Multiple failed login attempts detected',
  },
  {
    id: 5,
    timestamp: '2024-06-04 08:30',
    user: 'Emma Security',
    action: 'Policy Updated',
    database: '-',
    severity: 'info',
    details: 'Access control policy modified',
  },
  {
    id: 6,
    timestamp: '2024-06-04 07:45',
    user: 'System',
    action: 'Backup Started',
    database: 'ProductionDB-01',
    severity: 'info',
    details: 'Scheduled backup initiated',
  },
]

// ============================================
// SECURITY ALERTS DATA
// ============================================
export const securityAlertsData = [
  {
    id: 1,
    title: 'Unauthorized Access Attempt',
    description: 'Multiple failed login attempts from IP 192.168.1.105',
    level: 'critical',
    timestamp: '2024-06-04 09:15',
    database: 'ProductionDB-01',
    affectedUsers: 3,
  },
  {
    id: 2,
    title: 'Suspicious Query Detected',
    description: 'Unusual SQL pattern detected in UserServiceDB',
    level: 'high',
    timestamp: '2024-06-04 08:45',
    database: 'UserServiceDB',
    affectedUsers: 1,
  },
  {
    id: 3,
    title: 'Privilege Escalation Attempt',
    description: 'User attempted to execute admin-level command',
    level: 'critical',
    timestamp: '2024-06-04 07:30',
    database: 'OracleFinance',
    affectedUsers: 1,
  },
  {
    id: 4,
    title: 'Data Export Detected',
    description: 'Large data export from ReportDB-03 (500MB)',
    level: 'high',
    timestamp: '2024-06-03 23:50',
    database: 'ReportDB-03',
    affectedUsers: 1,
  },
  {
    id: 5,
    title: 'Certificate Expiration Warning',
    description: 'SSL certificate expiring in 14 days',
    level: 'medium',
    timestamp: '2024-06-03 15:30',
    database: 'All',
    affectedUsers: 0,
  },
]

// ============================================
// COMPLIANCE REPORTS DATA
// ============================================
export const complianceReportsData = [
  {
    id: 1,
    standard: 'GDPR',
    lastAudit: '2024-05-15',
    compliance: 95,
    status: 'Compliant',
    violations: 2,
  },
  {
    id: 2,
    standard: 'HIPAA',
    lastAudit: '2024-04-20',
    compliance: 92,
    status: 'Compliant',
    violations: 3,
  },
  {
    id: 3,
    standard: 'SOC 2',
    lastAudit: '2024-03-10',
    compliance: 94,
    status: 'Compliant',
    violations: 2,
  },
  {
    id: 4,
    standard: 'ISO 27001',
    lastAudit: '2024-05-01',
    compliance: 97,
    status: 'Compliant',
    violations: 1,
  },
]

// ============================================
// BACKUP & RECOVERY DATA
// ============================================
export const backupDataData = [
  {
    id: 1,
    database: 'ProductionDB-01',
    backupTime: '2024-06-04 00:00',
    size: '245 GB',
    duration: '45 min',
    status: 'Completed',
    nextScheduled: '2024-06-05 00:00',
  },
  {
    id: 2,
    database: 'AnalyticsDB-02',
    backupTime: '2024-06-03 22:30',
    size: '512 GB',
    duration: '90 min',
    status: 'Completed',
    nextScheduled: '2024-06-04 22:30',
  },
  {
    id: 3,
    database: 'UserServiceDB',
    backupTime: '2024-06-04 02:00',
    size: '128 GB',
    duration: '30 min',
    status: 'In Progress',
    nextScheduled: '2024-06-05 02:00',
  },
  {
    id: 4,
    database: 'OracleFinance',
    backupTime: '2024-05-30 00:00',
    size: '890 GB',
    duration: '120 min',
    status: 'Failed',
    nextScheduled: '2024-06-05 00:00',
  },
  {
    id: 5,
    database: 'ReportDB-03',
    backupTime: '2024-06-03 21:45',
    size: '678 GB',
    duration: '75 min',
    status: 'Completed',
    nextScheduled: '2024-06-04 21:45',
  },
]

// ============================================
// ENCRYPTION MANAGEMENT DATA
// ============================================
export const encryptionKeysData = [
  {
    id: 'KEY-001',
    name: 'ProductionDB-Master-Key',
    algorithm: 'AES-256',
    status: 'Active',
    createdDate: '2023-01-15',
    expiryDate: '2025-01-15',
    rotationDue: '60 days',
    lastRotated: '2024-01-15',
  },
  {
    id: 'KEY-002',
    name: 'AnalyticsDB-Backup-Key',
    algorithm: 'AES-256',
    status: 'Active',
    createdDate: '2023-03-20',
    expiryDate: '2025-03-20',
    rotationDue: '45 days',
    lastRotated: '2024-03-20',
  },
  {
    id: 'KEY-003',
    name: 'Legacy-System-Key',
    algorithm: 'AES-128',
    status: 'Expired',
    createdDate: '2020-06-10',
    expiryDate: '2024-06-10',
    rotationDue: 'Overdue',
    lastRotated: '2022-06-10',
  },
  {
    id: 'KEY-004',
    name: 'Archive-Encryption-Key',
    algorithm: 'RSA-2048',
    status: 'Active',
    createdDate: '2023-07-01',
    expiryDate: '2026-07-01',
    rotationDue: '180 days',
    lastRotated: '2024-07-01',
  },
]

// ============================================
// AUDIT CENTER DATA
// ============================================
export const auditEventsData = [
  {
    id: 1,
    timestamp: '2024-06-04 10:30',
    user: 'Sarah DBA',
    action: 'Schema Modification',
    database: 'ProductionDB-01',
    details: 'Added new table: users_archive',
    status: 'Success',
  },
  {
    id: 2,
    timestamp: '2024-06-04 09:45',
    user: 'Mike Analyst',
    action: 'Data Export',
    database: 'AnalyticsDB-02',
    details: 'Exported 1000 rows from sales_data',
    status: 'Success',
  },
  {
    id: 3,
    timestamp: '2024-06-04 09:15',
    user: 'Unknown',
    action: 'Unauthorized Access',
    database: 'OracleFinance',
    details: 'Failed to access sensitive tables',
    status: 'Blocked',
  },
  {
    id: 4,
    timestamp: '2024-06-04 08:30',
    user: 'Emma Security',
    action: 'Policy Update',
    database: 'All',
    details: 'Updated access control policies',
    status: 'Success',
  },
]

// ============================================
// DATABASE DISCOVERY DATA
// ============================================
export const discoveredDatabasesData = [
  {
    id: 1,
    name: 'NewCloudDB-AWS-01',
    type: 'PostgreSQL',
    location: 'AWS RDS (us-east-1)',
    discoveredDate: '2024-06-04 08:00',
    status: 'New',
    owner: 'Unassigned',
    sensitivity: 'Unknown',
  },
  {
    id: 2,
    name: 'LegacyDatabase-On-Prem',
    type: 'Oracle',
    location: 'On-Premise DC-02',
    discoveredDate: '2024-06-02 14:30',
    status: 'Review',
    owner: 'Legacy Team',
    sensitivity: 'High',
  },
  {
    id: 3,
    name: 'TestDB-Azure-SQL',
    type: 'SQL Server',
    location: 'Azure SQL Database',
    discoveredDate: '2024-06-01 11:15',
    status: 'Classified',
    owner: 'QA Team',
    sensitivity: 'Low',
  },
  {
    id: 4,
    name: 'DataWarehouse-GCP-Bigquery',
    type: 'BigQuery',
    location: 'Google Cloud (us-central1)',
    discoveredDate: '2024-05-28 09:45',
    status: 'New',
    owner: 'Unassigned',
    sensitivity: 'Unknown',
  },
]

// ============================================
// DATA CLASSIFICATION DATA
// ============================================
export const dataClassificationData = [
  {
    id: 1,
    category: 'PII (Personally Identifiable Info)',
    count: 2450,
    databases: 'ProductionDB, UserServiceDB',
    riskLevel: 'Critical',
    encryption: 'Yes',
  },
  {
    id: 2,
    category: 'Financial Data',
    count: 890,
    databases: 'OracleFinance, ReportDB-03',
    riskLevel: 'Critical',
    encryption: 'Yes',
  },
  {
    id: 3,
    category: 'Health Data (HIPAA)',
    count: 1200,
    databases: 'UserServiceDB',
    riskLevel: 'Critical',
    encryption: 'Yes',
  },
  {
    id: 4,
    category: 'API Credentials',
    count: 450,
    databases: 'ProductionDB, AnalyticsDB-02',
    riskLevel: 'Critical',
    encryption: 'Yes',
  },
  {
    id: 5,
    category: 'Confidential Business Data',
    count: 3200,
    databases: 'All Databases',
    riskLevel: 'High',
    encryption: 'Partial',
  },
]

// ============================================
// RISK ASSESSMENT DATA
// ============================================
export const riskAssessmentData = [
  {
    id: 1,
    database: 'OracleFinance',
    riskScore: 85,
    riskLevel: 'Critical',
    vulnerabilities: 12,
    lastAssessed: '2024-06-03',
    recommendations: 5,
  },
  {
    id: 2,
    database: 'UserServiceDB',
    riskScore: 72,
    riskLevel: 'High',
    vulnerabilities: 8,
    lastAssessed: '2024-06-04',
    recommendations: 4,
  },
  {
    id: 3,
    database: 'ProductionDB-01',
    riskScore: 45,
    riskLevel: 'Medium',
    vulnerabilities: 3,
    lastAssessed: '2024-06-04',
    recommendations: 2,
  },
  {
    id: 4,
    database: 'AnalyticsDB-02',
    riskScore: 35,
    riskLevel: 'Low',
    vulnerabilities: 1,
    lastAssessed: '2024-06-03',
    recommendations: 1,
  },
]

// ============================================
// POLICIES DATA
// ============================================
export const policiesData = [
  {
    id: 'POL-001',
    name: 'Production Database Access Policy',
    type: 'Access Control',
    status: 'Active',
    lastUpdated: '2024-05-15',
    appliedTo: 'ProductionDB-01, AnalyticsDB-02',
    approver: 'John Admin',
  },
  {
    id: 'POL-002',
    name: 'Data Encryption Standard',
    type: 'Encryption',
    status: 'Active',
    lastUpdated: '2024-06-01',
    appliedTo: 'All Databases',
    approver: 'Emma Security',
  },
  {
    id: 'POL-003',
    name: 'Quarterly Compliance Audit',
    type: 'Compliance',
    status: 'Draft',
    lastUpdated: '2024-06-03',
    appliedTo: 'All Databases',
    approver: 'Lisa Auditor',
  },
  {
    id: 'POL-004',
    name: 'Backup & Recovery SLA',
    type: 'Recovery',
    status: 'Active',
    lastUpdated: '2024-04-20',
    appliedTo: 'Production Databases',
    approver: 'Sarah DBA',
  },
]

// ============================================
// INTEGRATIONS DATA
// ============================================
export const integrationsData = [
  {
    id: 1,
    platform: 'IBM Guardium',
    status: 'Connected',
    lastSync: '2024-06-04 10:30',
    syncStatus: 'Healthy',
    version: '12.1.1',
  },
  {
    id: 2,
    platform: 'Thales CipherTrust',
    status: 'Connected',
    lastSync: '2024-06-04 09:45',
    syncStatus: 'Healthy',
    version: '2.0.5',
  },
  {
    id: 3,
    platform: 'AWS RDS',
    status: 'Connected',
    lastSync: '2024-06-04 08:15',
    syncStatus: 'Healthy',
    version: 'API v3',
  },
  {
    id: 4,
    platform: 'Azure SQL',
    status: 'Connected',
    lastSync: '2024-06-04 07:00',
    syncStatus: 'Healthy',
    version: 'API v2',
  },
  {
    id: 5,
    platform: 'Google Cloud SQL',
    status: 'Disconnected',
    lastSync: '2024-06-02 14:30',
    syncStatus: 'Error',
    version: 'API v3',
  },
]

// ============================================
// SYSTEM HEALTH DATA
// ============================================
export const systemHealthData = {
  cpu: 64,
  memory: 71,
  disk: 58,
  network: 45,
  apiLatency: 234,
  queryResponseTime: 128,
  databaseAvailability: 99.8,
  backupStatus: 'Healthy',
}

// ============================================
// QUERY MONITORING DATA
// ============================================
export const queryMonitoringData = [
  {
    id: 1,
    queryId: 'QRY-12345',
    database: 'ProductionDB-01',
    user: 'Sarah DBA',
    status: 'Running',
    type: 'SELECT',
    duration: '12 min',
    rows: 450000,
    startTime: '2024-06-04 10:33',
  },
  {
    id: 2,
    queryId: 'QRY-12346',
    database: 'AnalyticsDB-02',
    user: 'Mike Analyst',
    status: 'Running',
    type: 'SELECT',
    duration: '45 sec',
    rows: 12500,
    startTime: '2024-06-04 10:44',
  },
  {
    id: 3,
    queryId: 'QRY-12347',
    database: 'UserServiceDB',
    user: 'John Admin',
    status: 'Slow',
    type: 'UPDATE',
    duration: '8 min 30 sec',
    rows: 500,
    startTime: '2024-06-04 09:36',
  },
  {
    id: 4,
    queryId: 'QRY-12348',
    database: 'ReportDB-03',
    user: 'Mike Analyst',
    status: 'Failed',
    type: 'DELETE',
    duration: '2 min 15 sec',
    rows: 0,
    startTime: '2024-06-04 10:42',
  },
]

// Chart data for Query Monitoring
export const queryVolumeChartData = [
  { time: '00:00', select: 1200, insert: 400, update: 300, delete: 150 },
  { time: '04:00', select: 2100, insert: 600, update: 450, delete: 200 },
  { time: '08:00', select: 3400, insert: 900, update: 650, delete: 350 },
  { time: '12:00', select: 5200, insert: 1400, update: 900, delete: 450 },
  { time: '16:00', select: 4800, insert: 1200, update: 800, delete: 400 },
  { time: '20:00', select: 3200, insert: 800, update: 500, delete: 250 },
]

export const queryExecutionChartData = [
  { query: 'Slow Queries', count: 45, avgTime: 125 },
  { query: 'Normal Queries', count: 8920, avgTime: 45 },
  { query: 'Failed Queries', count: 23, avgTime: 0 },
]
