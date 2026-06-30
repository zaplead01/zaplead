export interface ReportMetrics {
  totalLeads: number
  pipelineValue: number
  wonDeals: number
  conversionRate: number
}

export interface LeadsByDay {
  day: string
  leads: number
}

export interface LeadsByStage {
  stage: string
  total: number
}

export interface LeadsBySource {
  name: string
  value: number
}

export interface InactiveCustomer {
  id: string
  full_name: string
  company: string | null
  phone: string | null
  last_contact_at: string | null
}