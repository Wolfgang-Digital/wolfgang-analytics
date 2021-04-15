export interface PipelineEntry {
  total: number
  id: number
  company_name: string
  date_added: string
  is_new: boolean
  country: string
  is_ongoing: boolean
  scope: string
  channels: string[]
  source: string
  source_comment?: string
  leads: string
  status: string
  last_updated: string
  details: string
  date_contacted?: string
  proposal_issue_date?: string
  meeting_date?: string
  follow_up_dates?: string[]
  success_probability?: number
  covid_impact?: string
  outcome?: string
  loss_reason?: string
  win_reason?: string
  date_closed?: string
  ppc_fmv?: number
  seo_fmv?: number
  content_fmv?: number
  email_fmv?: number
  social_fmv?: number
  creative_fmv?: number
  cro_fmv?: number
  analytics_fmv?: number
  total_fmv?: number
  ppc_12mv?: number
  seo_12mv?: number
  content_12mv?: number
  email_12mv?: number
  social_12mv?: number
  creative_12mv?: number
  cro_12mv?: number
  analytics_12mv?: number
  total_12mv?: number
  proposal_leads?: {
    user_id: string
    username: string
    email: string
  }[]
}

export interface PipelineFilter {
  column: string
  operator: string
  value: string | number
  displayValue?: string | number
}

export interface EnquirySnippet {
  company_name: string
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
  proposal_leads?: {
    user_id: string
    username: string
    email: string
  }[]
}

export interface MoneySnippet {
  ppc_fmv?: number | string
  seo_fmv?: number | string
  content_fmv?: number | string
  email_fmv?: number | string
  social_fmv?: number | string
  creative_fmv?: number | string
  cro_fmv?: number | string
  analytics_fmv?: number | string
  total_fmv?: number | string
  ppc_12mv?: number | string
  seo_12mv?: number | string
  content_12mv?: number | string
  email_12mv?: number | string
  social_12mv?: number | string
  creative_12mv?: number | string
  cro_12mv?: number | string
  analytics_12mv?: number | string
  total_12mv?: number | string
}