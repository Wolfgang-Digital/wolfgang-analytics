export interface SelectOption {
  label: string
  value: string
}

export interface APIPayloadAction<T> {
  meta: {
    arg: string
    requestId: string
  }
  payload: {
    success: boolean
    data?: T
    error?: string
  }
  type: string
}