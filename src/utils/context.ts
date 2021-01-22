import { createContext } from 'react';

export interface User {
  user_id: string
  username: string
  roles?: {
    role_id: number
    role_name: string
  }[]
  departments: {
    department_id: number
    department_name: string
  }[]
}

export const UserCtx = createContext<User | null>(null);