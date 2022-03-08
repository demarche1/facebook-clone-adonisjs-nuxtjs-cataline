import { Reaction, User, Comment } from './index'

export interface Post {
  id: number,
  description: string,
  userId: number,
  media?: {
    url: string
  },
  reactions: Reaction[],
  user: User,
  comments: Comment[],
  commentsCount: number,
  reactionsCount: {
    like: number,
    love: number,
    haha: number,
    sad: number,
    angry: number
  }
}
