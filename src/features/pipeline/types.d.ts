export interface PipelineEntry {
  total: number
  id: number
  company_name: string
  project_name?: string
  date_added: string
  is_new: boolean
  country: string
  channels: string[]
  source: string
  source_comment?: string
  status: string
  last_updated: string
  details: string
  pre_qual_score?: string
  success_probability?: number
  loss_reason?: string
  date_closed?: string
  ppc_12mv?: number
  seo_12mv?: number
  content_12mv?: number
  email_12mv?: number
  social_12mv?: number
  creative_12mv?: number
  cro_12mv?: number
  analytics_12mv?: number
  total_12mv?: number
  contact_email?: string
  actual_12mv?: number
  proposal_leads?: {
    user_id: string
    username: string
    email: string
  }[]
  channel_data?: ChannelData
  proposal_doc_link?: string
}

export type ChannelData = Record<string, {
  name: string
  duration: string
  outcome?: string
  won_revenue?: string
}>

export interface PipelineFilter {
  column: string
  operator: string
  value: string | number
  displayValue?: string | number
}

export interface EnquirySnippet {
  company_name: string
  project_name?: string
  date_added: Date
  is_new: boolean
  country: string
  is_ongoing: boolean
  scope: string
  channels: string[]
  source?: string
  source_comment?: string
  leads: string
  status: string
  date_closed?: Date
  pre_qual_score?: string
}

export interface ProposalSnippet {
  details: string
  date_contacted?: Date
  proposal_issue_date?: Date
  meeting_date?: Date
  follow_up_dates?: Date[]
  success_probability?: number
  covid_impact?: string
  outcome?: string
  loss_reason?: string
  win_reason?: string
  date_closed?: Date
  contact_email?: string
  proposal_leads?: {
    user_id: string
    username: string
    email: string
  }[]
  proposal_doc_link?: string
}

export interface MoneySnippet {
  ppc_12mv?: number | string
  seo_12mv?: number | string
  content_12mv?: number | string
  email_12mv?: number | string
  social_12mv?: number | string
  creative_12mv?: number | string
  cro_12mv?: number | string
  analytics_12mv?: number | string
  total_12mv?: number | string
  channel_data?: ChannelData
}

export interface PipelineOverview {
  duration?: string
  client_type?: string
  total: number
  open_enquiries: number
  wins: number
  pipeline_turnover: number
  estimated_won_revenue: number
  actual_won_revenue: number
  avg_velocity: number
  close_rate
  revenue_close_rate: number
}

export interface OverviewDownload extends Omit<PipelineOverview, 'client_type'> {
  date: string
}

export interface ChannelReport extends Omit<PipelineOverview, 'duration'> {
  channel: string
}