import { User } from './index'

export interface Comment {
  id: number,
  content: string,
  userId: number,
  postId: 1,
  user: User
}
