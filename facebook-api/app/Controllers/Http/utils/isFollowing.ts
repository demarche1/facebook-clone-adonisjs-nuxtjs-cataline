import { User } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export const isFollowing = async (user: User, auth: AuthContract) => {
  const followingData = await Database.query().from('follows').where('follower_id', auth.user!.id)

  const isFollowing = followingData.filter((followers) => followers.following_id === user.id)

  user.$extras.isFollowing = isFollowing.length > 0 ? true : false
}
