import { apiRequest } from './client'

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  inquiryType: 'general' | 'sales' | 'support' | 'partnership'
}

export interface DemoRequestData {
  name: string
  email: string
  company?: string
  databaseType?: string
  numDatabases?: number
  preferredDate?: string
  preferredTime?: string
  notes?: string
}

export interface NewsletterData {
  email: string
}

export interface JobApplicationData {
  jobId: string
  applicantName: string
  email: string
  phone?: string
  resumeUrl?: string
  coverLetter?: string
  linkedinProfile?: string
}

export interface FeatureRequestData {
  title: string
  description: string
  category: string
}

// Contact Form
export async function submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/contact', {
    method: 'POST',
    body: data,
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Failed to submit contact form',
  }
}

// Demo Request
export async function requestDemo(data: DemoRequestData): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/demo/request', {
    method: 'POST',
    body: data,
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Failed to request demo',
  }
}

// Newsletter Subscription
export async function subscribeNewsletter(data: NewsletterData): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/newsletter/subscribe', {
    method: 'POST',
    body: data,
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Failed to subscribe',
  }
}

// Job Application
export async function applyForJob(data: JobApplicationData): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/jobs/apply', {
    method: 'POST',
    body: data,
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Failed to submit application',
  }
}

// Feature Request
export async function submitFeatureRequest(data: FeatureRequestData): Promise<{ success: boolean; message: string }> {
  const response = await apiRequest('/api/feature-request', {
    method: 'POST',
    body: data,
    useAuth: false,
  })

  return {
    success: response.success,
    message: response.message || response.error || 'Failed to submit feature request',
  }
}

// Analytics Tracking
export interface AnalyticsEvent {
  eventName: string
  pagePath: string
  sessionId: string
  properties?: Record<string, unknown>
}

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  try {
    await apiRequest('/api/analytics/track-event', {
      method: 'POST',
      body: event,
      useAuth: false,
    })
  } catch (error) {
    // Silently fail for analytics
    console.debug('Analytics tracking failed:', error)
  }
}
