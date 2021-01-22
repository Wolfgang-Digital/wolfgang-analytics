export type Pillar = {
  value: {
    name: string
    action: string
    behaviour: string
  }
};

export type Metric = {
  value: string
};

export type Question = {
  value: {
    section: string
    questions: {
      value: string
    }[]
  }
};

export interface ReviewFormData {
  pillars: Pillar[]
  metrics: Metric[]
  questions: Question[]
}

export interface ManagerFormData {
  pillars?: Record<string, {
    score: number
    note?: string
  }>
  metrics: Record<string, {
    value: number
    note?: string
  }>
}

export type EmployeeFormData = Record<string, Record<string, string>>

export interface Review {
  review_id: number
  employee_id: string
  employee_name: string
  department: string
  manager_id: string
  manager_name: string
  created_on: string
  form_data: ReviewFormData
}

export interface ReviewTemplate {
  name: string
  pillars: Pillar[]
  metrics: Metric[]
  questions: Question[]
}

export interface ReviewResponse extends Review {
  responses: {
    response_id: number
    review_date: string
    manager_form_data?: ManagerFormData
    employee_form_data?: EmployeeFormData
  }[]
}

export interface FilledReview {
  pillars: {
    name: string
    action: string
    behaviour: string
    score?: number
    note?: string
    delta?: number
  }[]
  metrics: {
    name: string
    value?: number
    note?: string
    delta?: number
  }[]
  questions: {
    section: string
    value: string
    answer?: string
  }[]
}

export type ResponseUpdate = ReviewResponse['responses'][number]