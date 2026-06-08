import { Feature } from '@/types'

export const features: Feature[] = [
  {
    id: 'database-monitoring',
    title: 'Real-time Database Monitoring',
    description: 'Monitor all database activities in real-time with comprehensive query analysis and performance insights.',
    icon: 'activity',
    category: 'Monitoring',
    details: 'Track every database query, transaction, and operation with millisecond precision. Get detailed insights into query performance, resource utilization, and database health.',
  },
  {
    id: 'access-control',
    title: 'Database Access Control',
    description: 'Implement role-based access control (RBAC) and privileged access management (PAM) for your databases.',
    icon: 'shield-lock',
    category: 'Access Management',
    details: 'Manage user permissions, enforce least privilege principles, and monitor privileged user activities. Support for RBAC and attribute-based access control.',
  },
  {
    id: 'threat-detection',
    title: 'AI-Powered Threat Detection',
    description: 'Detect anomalies and suspicious activities using machine learning algorithms.',
    icon: 'alert-circle',
    category: 'Security',
    details: 'Advanced threat detection using ML models trained on millions of database transactions. Detect SQL injection attempts, unauthorized access patterns, and data exfiltration attempts.',
  },
  {
    id: 'compliance',
    title: 'Automated Compliance Reporting',
    description: 'Meet regulatory requirements with automated compliance reports for PCI-DSS, HIPAA, GDPR, SOX, and more.',
    icon: 'check-circle',
    category: 'Compliance',
    details: 'Generate compliance reports automatically. Support for PCI-DSS, HIPAA, GDPR, SOX, ISO 27001, FedRAMP, FISMA, and more.',
  },
  {
    id: 'audit-logs',
    title: 'Comprehensive Audit Logs',
    description: 'Maintain complete audit trails with searchable logs and session recording capabilities.',
    icon: 'list',
    category: 'Audit',
    details: 'Store comprehensive audit logs with full session recording. Search, filter, and analyze activities across your entire database infrastructure.',
  },
  {
    id: 'user-analytics',
    title: 'User Behavior Analytics',
    description: 'Analyze user behavior to detect insider threats and unusual activity patterns.',
    icon: 'trending-up',
    category: 'Analytics',
    details: 'Track user activities, detect behavior anomalies, and identify insider threats. Correlate activities across multiple databases.',
  },
  {
    id: 'siem-integration',
    title: 'SIEM Integration',
    description: 'Integrate with Splunk, ELK, QRadar, and other SIEM platforms.',
    icon: 'network',
    category: 'Integration',
    details: 'Send alerts and logs to your SIEM platform. Support for Splunk, Elastic Stack, IBM QRadar, ArcSight, and more.',
  },
  {
    id: 'api-access',
    title: 'Comprehensive REST API',
    description: 'Full-featured REST API for custom integrations and automation.',
    icon: 'code',
    category: 'Integration',
    details: 'Complete REST API with SDKs for Python, Go, Node.js, and Java. Integrate database monitoring into your applications.',
  },
]

export const featuresByCategory = features.reduce(
  (acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = []
    }
    acc[feature.category].push(feature)
    return acc
  },
  {} as Record<string, Feature[]>
)

export const featureDetails = {
  'database-monitoring': {
    title: 'Real-time Database Monitoring',
    description: 'Monitor all database activities with comprehensive query analysis and performance insights.',
    longDescription: `Lopam DAM provides real-time monitoring of all database activities. Track every query, transaction, and operation with millisecond precision. Get detailed insights into:

- Query performance and execution plans
- Resource utilization and bottlenecks
- Database health metrics
- Transaction logs
- Connection pooling
- Cache efficiency

Our monitoring engine captures and analyzes thousands of events per second, providing you with actionable insights to optimize database performance and security.`,
    features: [
      'Real-time query capture and analysis',
      'Performance metrics and baselines',
      'Query execution plans',
      'Resource utilization tracking',
      'Transaction monitoring',
      'Connection pooling analysis',
      'Cache efficiency metrics',
      'Slow query identification',
    ],
    databases: ['MySQL', 'PostgreSQL', 'Oracle', 'SQL Server', 'MongoDB'],
    benefits: [
      'Identify performance bottlenecks',
      'Optimize database queries',
      'Reduce infrastructure costs',
      'Improve application performance',
    ],
  },
  'access-control': {
    title: 'Database Access Control & PAM',
    description: 'Implement zero-trust access control for your databases.',
    longDescription: `Secure database access with role-based access control (RBAC) and privileged access management (PAM). Features include:

- Role-based access control (RBAC)
- Attribute-based access control (ABAC)
- Privileged user monitoring
- Just-in-time (JIT) access
- Multi-factor authentication
- Password rotation policies
- Session management
- Separation of duties`,
    features: [
      'Role-based access control',
      'Privileged access management',
      'Multi-factor authentication',
      'Just-in-time access provisioning',
      'Password policies and rotation',
      'Session management',
      'Access reviews and certifications',
      'Separation of duties enforcement',
    ],
    benefits: [
      'Implement zero-trust database security',
      'Reduce privileged account risks',
      'Meet compliance requirements',
      'Enforce least privilege principle',
    ],
  },
  'threat-detection': {
    title: 'AI-Powered Threat Detection',
    description: 'Detect threats using advanced machine learning.',
    longDescription: `Detect threats and anomalies using AI and machine learning:

- Anomaly detection for unusual access patterns
- SQL injection and command injection detection
- Data exfiltration detection
- Brute force attack detection
- Privilege escalation detection
- Unusual query pattern detection
- Risk scoring for database activities
- Automated alerting and response`,
    features: [
      'Machine learning-based anomaly detection',
      'SQL injection detection',
      'Brute force attack detection',
      'Data exfiltration detection',
      'Privilege escalation detection',
      'Risk scoring',
      'Automated response actions',
      'Threat correlation',
    ],
    benefits: [
      'Detect threats in real-time',
      'Reduce false positives',
      'Automate incident response',
      'Improve mean time to detection',
    ],
  },
  'compliance': {
    title: 'Automated Compliance Reporting',
    description: 'Meet regulatory requirements automatically.',
    longDescription: `Meet regulatory compliance requirements with automated reporting:

- PCI-DSS compliance reports
- HIPAA/HITECH compliance
- GDPR compliance
- SOX compliance
- ISO 27001 compliance
- FedRAMP compliance
- FISMA compliance
- Industry-specific reports`,
    features: [
      'PCI-DSS reporting',
      'HIPAA/HITECH compliance',
      'GDPR compliance',
      'SOX compliance',
      'ISO 27001 reporting',
      'FedRAMP/FISMA compliance',
      'Customizable report templates',
      'Scheduled report delivery',
    ],
    benefits: [
      'Meet compliance deadlines',
      'Reduce audit preparation time',
      'Maintain compliance automatically',
      'Demonstrate security posture',
    ],
  },
  'audit-logs': {
    title: 'Comprehensive Audit Logs & Session Recording',
    description: 'Maintain immutable audit trails with full context.',
    longDescription: `Maintain complete audit trails with session recording:

- Full activity audit logs
- Session recording and playback
- Query logging with parameters
- Connection logs
- Administrative actions
- Failed access attempts
- Data changes and who made them
- Immutable log storage`,
    features: [
      'Complete audit logging',
      'Session recording and playback',
      'Query logging with full context',
      'Connection tracking',
      'Administrative action logging',
      'Failed access attempt logging',
      'Data change tracking',
      'Immutable log storage',
      'Searchable logs',
      'Log retention policies',
    ],
    benefits: [
      'Meet audit requirements',
      'Investigate security incidents',
      'Prove compliance',
      'Support forensic analysis',
    ],
  },
}
