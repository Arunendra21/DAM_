export const blogPosts = [
  {
    id: 'post-1',
    title: 'PCI-DSS 4.0: Database Monitoring Requirements Explained',
    slug: 'pci-dss-4-database-monitoring',
    excerpt: 'Complete guide to PCI-DSS 4.0 database monitoring requirements for payment card industry compliance.',
    category: 'Compliance',
    tags: ['PCI-DSS', 'compliance', 'payments'],
    content: `# PCI-DSS 4.0: Database Monitoring Requirements

PCI-DSS 4.0 introduces stricter requirements for database monitoring and activity logging. Organizations must:

## Key Requirements

1. **Real-time Monitoring**: Monitor all database access and activities in real-time
2. **Audit Logging**: Maintain complete audit logs of all database activities
3. **Access Control**: Implement role-based access control for database users
4. **Query Logging**: Log all database queries and modifications
5. **Alert System**: Implement automated alerting for suspicious activities

## Implementation with Lopam AI

Lopam AI helps meet these requirements by:
- Providing real-time database activity monitoring
- Maintaining comprehensive audit logs
- Automating compliance reporting
- Detecting suspicious activities automatically

Learn how to achieve PCI-DSS 4.0 compliance today.`,
    publishedAt: new Date('2024-01-20'),
    createdAt: new Date('2024-01-20'),
    viewCount: 1240,
    authorId: 'author-1',
  },
  {
    id: 'post-2',
    title: 'SQL Injection Attacks: Detection and Prevention',
    slug: 'sql-injection-detection',
    excerpt: 'Learn how to detect and prevent SQL injection attacks targeting your databases.',
    category: 'Security',
    tags: ['security', 'SQL injection', 'threats'],
    content: `# SQL Injection Attacks: Detection and Prevention

SQL injection remains one of the most common database attacks. Here's how to protect your databases.

## What is SQL Injection?

SQL injection attacks occur when malicious SQL code is injected into input fields...

## Detection Methods

1. **Pattern Analysis**: Detect suspicious SQL patterns
2. **Behavioral Analysis**: Identify unusual query patterns
3. **Query Parsing**: Analyze query structure for injection indicators

## Prevention Strategies

- Use parameterized queries
- Implement input validation
- Deploy Web Application Firewalls
- Monitor database activities
- Regular security testing

Lopam AI detects SQL injection attempts automatically and alerts your security team.`,
    publishedAt: new Date('2024-02-10'),
    createdAt: new Date('2024-02-10'),
    viewCount: 2150,
    authorId: 'author-2',
  },
  {
    id: 'post-3',
    title: 'Zero Trust Database Access: A Complete Guide',
    slug: 'zero-trust-database-access',
    excerpt: 'Implement zero trust principles for secure database access management.',
    category: 'Best Practices',
    tags: ['security', 'access control', 'zero-trust'],
    content: `# Zero Trust Database Access: A Complete Guide

Zero trust security principles applied to database access provide maximum protection against insider threats and compromised credentials.

## Zero Trust Principles

1. Never trust, always verify
2. Assume breach mentality
3. Principle of least privilege
4. Continuous monitoring
5. Explicit access approval

## Implementation Steps

1. Identify all database users
2. Implement multi-factor authentication
3. Deploy just-in-time access
4. Monitor all activities
5. Regular access reviews

Lopam AI enables zero trust database access with privileged access management and behavioral analytics.`,
    publishedAt: new Date('2024-02-25'),
    createdAt: new Date('2024-02-25'),
    viewCount: 1890,
    authorId: 'author-1',
  },
  {
    id: 'post-4',
    title: 'HIPAA Compliance for Healthcare Databases',
    slug: 'hipaa-compliance-healthcare',
    excerpt: 'Ensure HIPAA compliance for healthcare databases with proper monitoring and access controls.',
    category: 'Compliance',
    tags: ['HIPAA', 'healthcare', 'compliance'],
    content: `# HIPAA Compliance for Healthcare Databases

Healthcare organizations must implement strict controls to protect patient health information (PHI).

## HIPAA Requirements for Databases

- Audit controls and activity logging
- Access controls and authentication
- Encryption and decryption
- Emergency access procedures
- Risk assessment and management

## Lopam AI for HIPAA Compliance

Our platform provides:
- PHI access monitoring
- Emergency access logging
- Automated compliance reports
- Audit trail maintenance
- Breach detection

Deploy with confidence knowing your patient data is protected.`,
    publishedAt: new Date('2024-03-05'),
    createdAt: new Date('2024-03-05'),
    viewCount: 1650,
    authorId: 'author-3',
  },
  {
    id: 'post-5',
    title: 'Detecting Insider Threats with User Behavior Analytics',
    slug: 'insider-threat-detection',
    excerpt: 'Use behavioral analytics to detect insider threats before they cause damage.',
    category: 'Security',
    tags: ['insider threats', 'analytics', 'detection'],
    content: `# Detecting Insider Threats with User Behavior Analytics

Insider threats are a growing concern. User behavior analytics can detect anomalous activities.

## Behavioral Analytics Features

- Establish user baselines
- Detect deviations from normal behavior
- Identify suspicious patterns
- Correlate events across systems
- Generate risk scores

## Detection Examples

- Unusual access times
- Accessing unusual data
- Large data downloads
- Failed access attempts
- Privilege escalations

Lopam AI's behavioral analytics detect insider threats in real-time.`,
    publishedAt: new Date('2024-03-15'),
    createdAt: new Date('2024-03-15'),
    viewCount: 2340,
    authorId: 'author-2',
  },
]

export const blogPostsByCategory = blogPosts.reduce(
  (acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = []
    }
    acc[post.category].push(post)
    return acc
  },
  {} as Record<string, typeof blogPosts>
)

export const blogPostBySlug = blogPosts.reduce(
  (acc, post) => {
    acc[post.slug] = post
    return acc
  },
  {} as Record<string, typeof blogPosts[0]>
)
