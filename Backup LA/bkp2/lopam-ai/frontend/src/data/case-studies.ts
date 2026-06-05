export const caseStudies = [
  {
    id: 'fortune-500-bank',
    title: 'Fortune 500 Bank Achieves 100% PCI-DSS Compliance',
    slug: 'fortune-500-bank-compliance',
    industry: 'Banking',
    clientName: 'Major US Bank',
    clientLogoUrl: '/images/logos/bank-logo.svg',
    featuredImageUrl: '/images/case-studies/bank.jpg',
    challenge: `A Fortune 500 bank with a complex database environment spanning 150+ databases across multiple data centers struggled to:

- Maintain consistent compliance across all systems
- Track privileged user access
- Detect suspicious database activities
- Meet audit requirements efficiently`,
    solution: `Deployed Lopam AI across all databases to:

- Enable real-time monitoring of all database activities
- Implement privileged access management
- Automate compliance reporting for PCI-DSS
- Centralize audit logs for investigation`,
    results: `Within 6 months of deployment:

- Achieved 100% PCI-DSS compliance
- Detected and prevented 2,400+ suspicious activities
- Reduced audit preparation time by 75%
- Improved incident response time from days to minutes
- Achieved < 2% false positive rate`,
    metrics: {
      'Compliance Score': '100%',
      'Deployment Time': '6 weeks',
      'Threats Detected': '2,400+',
      'False Positive Rate': '< 2%',
      'Audit Time Reduction': '75%',
      'Cost Savings': '$2.3M annually',
    },
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'healthcare-provider',
    title: 'Healthcare Provider Prevents HIPAA Violations',
    slug: 'healthcare-hipaa-prevention',
    industry: 'Healthcare',
    clientName: 'Regional Health Network',
    clientLogoUrl: '/images/logos/healthcare-logo.svg',
    featuredImageUrl: '/images/case-studies/healthcare.jpg',
    challenge: `A regional healthcare provider managing patient data across multiple hospitals faced:

- Complex HIPAA compliance requirements
- Patient data security concerns
- Lack of visibility into database access
- Audit readiness challenges`,
    solution: `Implemented Lopam AI's healthcare-specific monitoring:

- Set up PHI (Protected Health Information) access tracking
- Enabled session recording for all database access
- Automated HIPAA compliance reporting
- Implemented emergency access logging`,
    results: `Achieved HIPAA audit readiness and prevented breaches:

- 100% HIPAA compliance in audit
- Zero unauthorized access incidents
- Detected and prevented 156 suspicious access attempts
- Reduced audit preparation time by 80%
- Achieved emergency access audit trail
- Improved incident response time to < 5 minutes`,
    metrics: {
      'HIPAA Compliance': '100%',
      'Unauthorized Access Attempts': '0',
      'Suspicious Attempts Prevented': '156',
      'Audit Time Reduction': '80%',
      'Incident Response Time': '< 5 minutes',
      'Patient Trust Score': '+34%',
    },
    publishedAt: new Date('2024-02-20'),
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'government-agency',
    title: 'Government Agency Secures Classified Databases',
    slug: 'government-fedramp-security',
    industry: 'Government',
    clientName: 'US Federal Agency',
    clientLogoUrl: '/images/logos/government-logo.svg',
    featuredImageUrl: '/images/case-studies/government.jpg',
    challenge: `A US federal agency required:

- FedRAMP and FISMA compliance
- Monitoring of classified databases
- On-premises deployment in air-gapped environment
- Complex audit requirements`,
    solution: `Deployed Lopam AI in secure government environment:

- On-premises deployment on classified network
- Air-gapped configuration without internet connectivity
- Integrated with government SIEM systems
- Automated FedRAMP/FISMA reporting`,
    results: `Successfully secured classified infrastructure:

- Achieved FedRAMP authorization
- Passed FISMA compliance assessment
- Zero unauthorized access incidents
- Complete audit trail for classified data access
- Real-time threat detection on classified systems
- Full support for multi-agency coordination`,
    metrics: {
      'FedRAMP Status': 'Authorized',
      'FISMA Compliance': '100%',
      'Unauthorized Access': '0',
      'Deployment Complexity': 'Managed successfully',
      'Audit Passes': '100%',
      'Classified Data Incidents': '0',
    },
    publishedAt: new Date('2024-03-10'),
    createdAt: new Date('2024-03-10'),
  },
]

export const caseStudyById = caseStudies.reduce(
  (acc, study) => {
    acc[study.id] = study
    return acc
  },
  {} as Record<string, typeof caseStudies[0]>
)

export const caseStudiesByIndustry = caseStudies.reduce(
  (acc, study) => {
    if (!acc[study.industry]) {
      acc[study.industry] = []
    }
    acc[study.industry].push(study)
    return acc
  },
  {} as Record<string, typeof caseStudies>
)
