export interface RegisterPayload {
  fullname: string
  username: string
  password: string
  password_confirmation?: string
}

export interface LoginPayload {
  username: string
  password: string
}