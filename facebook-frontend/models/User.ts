export interface User {
  id: number
  name: string
  username: string
  email: string
  avatar?: {
    url: string
  }
}
