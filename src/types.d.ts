export interface SelectOption {
  label: string
  value: string
}

export interface Property {
  id: string
  accountId: string
  name: string
  views: View[]
  accountEmail: string
  accountName: string
}

export interface View {
  id: string
  name: string
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