import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { isFollowing } from '../utils/isFollowing'
export default class MainsController {
  public async show({ request, auth }: HttpContextContract) {
    const { username } = request.qs()

    const user = await User.query()
      .where({ username })
      .preload('avatar')
      .withCount('posts')
      .withCount('followers')
      .withCount('following')
      .firstOrFail()

    if (user.id !== auth.user!.id) {
      await isFollowing(user, auth)
    }

    return user
  }
}
