'use server'
import { ReactNode } from 'react'

export interface IToken {
  accessToken?: string
  refreshToken?: string
}

export interface IUser {
  id?: string
  nivel?: string[]
  last_login?: null
  first_name?: null
  last_name?: null
  email?: string
  telefone?: null
  foto?: null
  is_active?: boolean
  is_staff?: boolean
  categoria?: string
}

export interface IImputData {
  email: string
  password: string
}

export interface IAuthContext extends IToken {
  authenticate: (value: IImputData) => Promise<void>
  logout: () => void
  user: IUser
}

export interface IAuthProvider {
  children: ReactNode
}
