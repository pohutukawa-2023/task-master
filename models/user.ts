export interface UserSnakeCase {
  id?: number
  username: string
  name: string
  email: string
  is_admin: boolean
}

export interface User {
  id: number
  username: string
  name: string
  email: string
  isAdmin: boolean
}

export interface UserData {
  username: string
  name: string
  email: string
  isAdmin: boolean
}
