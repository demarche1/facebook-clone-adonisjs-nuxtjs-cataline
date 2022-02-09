import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { isFollowing } from '../utils/isFollowing'

export default class FollowingsController {
  public async index({ request, auth }: HttpContextContract) {
    const { username } = request.qs()

    console.log(username)

    const user = await User.query()
      .where('username', username)
      .preload('avatar')
      .preload('following')
      .firstOrFail()

    if (user.id !== auth.user!.id) {
      await isFollowing(user, auth)
    }

    return user
  }
}
