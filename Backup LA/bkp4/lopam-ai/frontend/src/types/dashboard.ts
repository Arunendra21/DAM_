export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
export type QueryType = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DROP' | 'GRANT'
export type AlertStatus = 'active' | 'investigating' | 'resolved'

export interface SecurityAlert {
  id: string
  timestamp: Date
  database: string
  user: string
  queryType: QueryType
  query: string
  riskScore: number
  severity: AlertSeverity
  ipAddress: string
  status: AlertStatus
}

export interface ActivityLogEntry {
  id: string
  timestamp: Date
  database: string
  user: string
  action: string
  queryType: QueryType
  query: string
  status: 'success' | 'failed'
  duration: number
}

export interface ComplianceMetric {
  name: string
  value: number
  max: number
  status: 'compliant' | 'warning' | 'critical'
}

export interface ThreatDataPoint {
  hour: number
  day: string
  count: number
}

export interface SecurityScore {
  overall: number
  database: number
  access: number
  compliance: number
  encryption: number
}
