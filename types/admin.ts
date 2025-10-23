// Types for Admin System Management

export interface SystemConfig {
  id: string
  key: string
  value: string
  description?: string
  category: 'general' | 'academic' | 'payment' | 'library' | 'notification' | 'integration'
  type: 'string' | 'number' | 'boolean' | 'json'
  updated_at: Date
}

export interface AcademicYear {
  id: string
  year: string
  semester: 'ganjil' | 'genap'
  start_date: Date
  end_date: Date
  is_active: boolean
  registration_start?: Date
  registration_end?: Date
  exam_start?: Date
  exam_end?: Date
}

export interface ApprovalWorkflow {
  id: string
  name: string
  type: 'kkp' | 'exam' | 'letter' | 'payment'
  steps: ApprovalStep[]
  is_active: boolean
  description?: string
}

export interface ApprovalStep {
  order: number
  role: string
  required: boolean
  auto_approve_conditions?: Record<string, any>
  timeout_hours?: number
}

export interface NotificationTemplate {
  id: string
  name: string
  type: 'email' | 'push' | 'sms'
  event: string
  subject?: string
  body: string
  variables: string[]
  is_active: boolean
}

export interface DocumentTemplate {
  id: string
  name: string
  type: 'letter' | 'certificate' | 'report'
  category: string
  file_url: string
  variables: string[]
  description?: string
  is_active: boolean
}

export interface Department {
  id: string
  code: string
  name: string
  faculty: string
  head_id?: string
  is_active: boolean
}

export interface IntegrationConfig {
  id: string
  name: string
  type: 'graphql' | 'rest' | 'soap'
  endpoint: string
  auth_type: 'none' | 'basic' | 'bearer' | 'api_key'
  credentials?: Record<string, any>
  sync_enabled: boolean
  sync_interval?: number
  last_sync?: Date
  is_active: boolean
}

export interface SystemStats {
  database: {
    size: string
    tables: number
    records: number
  }
  storage: {
    used: string
    available: string
    percentage: number
  }
  performance: {
    avgResponseTime: number
    requestsPerMinute: number
    errorRate: number
  }
  cache: {
    hitRate: number
    size: string
  }
}

export interface AuditLog {
  id: string
  user_id: string
  user_name: string
  user_role: string
  action: string
  resource: string
  details?: any
  ip_address?: string
  user_agent?: string
  created_at: Date
}

export interface BackupSchedule {
  id: string
  name: string
  frequency: 'daily' | 'weekly' | 'monthly'
  time: string
  retention_days: number
  is_active: boolean
  last_backup?: Date
  next_backup?: Date
}

