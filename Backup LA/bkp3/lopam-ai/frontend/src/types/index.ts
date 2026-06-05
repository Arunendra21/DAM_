// Core Types for Lopam AI Platform

export type UserRole = 'admin' | 'user' | 'viewer'
export type SubscriptionPlan = 'starter' | 'professional' | 'enterprise' | 'custom'
export type DatabaseType = 'mysql' | 'postgresql' | 'oracle' | 'sqlserver' | 'mongodb' | 'mariadb' | 'redis' | 'cassandra' | 'rds' | 'azure-sql' | 'gcp-cloudsql'
export type InquiryType = 'general' | 'sales' | 'support' | 'partnership'
export type DemoStatus = 'pending' | 'scheduled' | 'completed' | 'cancelled'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  companyName: string
  companySize: string
  country: string
  phone?: string
  role: UserRole
  status: 'active' | 'inactive' | 'suspended'
  mfaEnabled: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  inquiryType: InquiryType
  status: 'pending' | 'responded' | 'closed'
  assignedTo?: string
  createdAt: Date
  respondedAt?: Date
}

export interface DemoRequest {
  id: string
  userId?: string
  name: string
  email: string
  company?: string
  databaseType?: DatabaseType
  numDatabases?: number
  preferredDate?: Date
  preferredTime?: string
  notes?: string
  status: DemoStatus
  createdAt: Date
  scheduledAt?: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: string
  category: string
  tags: string[]
  featuredImageUrl?: string
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  viewCount: number
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  industry: string
  challenge: string
  solution: string
  results: string
  clientName: string
  clientLogoUrl?: string
  featuredImageUrl?: string
  metrics: Record<string, string | number>
  publishedAt?: Date
  createdAt: Date
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  category: string
  details: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  company: string
  image?: string
  rating: number
}

export interface SolutionPage {
  industry: string
  title: string
  description: string
  challenges: Array<{
    title: string
    description: string
  }>
  complianceRequirements: string[]
  recommendedFeatures: string[]
  successMetrics: string[]
}
