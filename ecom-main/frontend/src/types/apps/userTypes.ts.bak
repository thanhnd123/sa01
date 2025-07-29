// Type Imports
import type { ThemeColor } from '@core/types'

export interface User {
  _id: string
  name: string
  username: string
  email: string
  password: string
  role: string
  team_id: string
  status: string
  avatar?: string
  avatarColor?: string
  token_admin?: string
  token_user?: string
  accessToken?: string
  team?: {
    _id: string
    name: string
  }
}

export type UsersType = {
  data: User[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}