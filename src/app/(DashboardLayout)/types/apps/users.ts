export interface UserType {
  id: number
  foto: string
  first_name: string
  last_name: string
  email: string
  telefone: string
  is_staff: boolean
  is_active: number
  categoria: string
}

export interface GallaryType {
  id: string
  cover: string
  name: string
  time: string
}
