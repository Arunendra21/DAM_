-- Lopam AI Database Schema
-- PostgreSQL 13+

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email CITEXT UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  company_size VARCHAR(50),
  country VARCHAR(100),
  phone VARCHAR(20),
  mfa_enabled BOOLEAN DEFAULT FALSE,
  mfa_secret VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended
  role VARCHAR(50) DEFAULT 'user', -- admin, user, viewer
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  CONSTRAINT valid_status CHECK (status IN ('active', 'inactive', 'suspended')),
  CONSTRAINT valid_role CHECK (role IN ('admin', 'user', 'viewer'))
);

-- Contact Form Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email CITEXT NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  inquiry_type VARCHAR(50), -- general, sales, support, partnership
  status VARCHAR(50) DEFAULT 'pending', -- pending, responded, closed
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_inquiry_type CHECK (inquiry_type IN ('general', 'sales', 'support', 'partnership')),
  CONSTRAINT valid_submission_status CHECK (status IN ('pending', 'responded', 'closed'))
);

-- Demo Requests
CREATE TABLE demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email CITEXT NOT NULL,
  company VARCHAR(255),
  database_type VARCHAR(100),
  num_databases INTEGER,
  preferred_date DATE,
  preferred_time TIME,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, scheduled, completed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  scheduled_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_demo_status CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled'))
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  category VARCHAR(100),
  tags VARCHAR(255)[] DEFAULT '{}',
  featured_image_url VARCHAR(255),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?$')
);

-- Case Studies
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  industry VARCHAR(100),
  challenge TEXT,
  solution TEXT,
  results TEXT,
  client_name VARCHAR(255),
  client_logo_url VARCHAR(255),
  featured_image_url VARCHAR(255),
  metrics JSONB,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?$')
);

-- Feature Requests
CREATE TABLE feature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  votes INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'open', -- open, planned, implemented, rejected
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_feature_status CHECK (status IN ('open', 'planned', 'implemented', 'rejected'))
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_type VARCHAR(50), -- starter, professional, enterprise, custom
  billing_cycle VARCHAR(20), -- monthly, annual
  status VARCHAR(50) DEFAULT 'active', -- active, paused, cancelled
  start_date DATE,
  end_date DATE,
  auto_renew BOOLEAN DEFAULT TRUE,
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancelled_at TIMESTAMP,
  CONSTRAINT valid_plan CHECK (plan_type IN ('starter', 'professional', 'enterprise', 'custom')),
  CONSTRAINT valid_billing_cycle CHECK (billing_cycle IN ('monthly', 'annual')),
  CONSTRAINT valid_sub_status CHECK (status IN ('active', 'paused', 'cancelled'))
);

-- Website Analytics
CREATE TABLE page_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path VARCHAR(255),
  session_id VARCHAR(255),
  user_agent TEXT,
  ip_address INET,
  referrer VARCHAR(255),
  time_on_page INTEGER,
  cta_clicked VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Careers - Job Openings
CREATE TABLE job_openings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  location VARCHAR(255),
  job_level VARCHAR(50), -- junior, mid, senior, lead, manager
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  status VARCHAR(50) DEFAULT 'open', -- open, closed, filled
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_job_level CHECK (job_level IN ('junior', 'mid', 'senior', 'lead', 'manager')),
  CONSTRAINT valid_job_status CHECK (status IN ('open', 'closed', 'filled'))
);

-- Careers - Job Applications
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES job_openings(id) ON DELETE CASCADE,
  applicant_name VARCHAR(255),
  email CITEXT,
  phone VARCHAR(20),
  resume_url VARCHAR(255),
  cover_letter TEXT,
  linkedin_profile VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewing, interview, offer, rejected, hired
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_app_status CHECK (status IN ('pending', 'reviewing', 'interview', 'offer', 'rejected', 'hired'))
);

-- Newsletter Subscriptions
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email CITEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT TRUE,
  subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribe_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

CREATE INDEX idx_demo_requests_user_id ON demo_requests(user_id);
CREATE INDEX idx_demo_requests_email ON demo_requests(email);
CREATE INDEX idx_demo_requests_status ON demo_requests(status);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);

CREATE INDEX idx_case_studies_slug ON case_studies(slug);
CREATE INDEX idx_case_studies_industry ON case_studies(industry);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

CREATE INDEX idx_page_analytics_page_path ON page_analytics(page_path);
CREATE INDEX idx_page_analytics_session_id ON page_analytics(session_id);
CREATE INDEX idx_page_analytics_created_at ON page_analytics(created_at);

CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_email ON job_applications(email);
CREATE INDEX idx_job_applications_status ON job_applications(status);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
