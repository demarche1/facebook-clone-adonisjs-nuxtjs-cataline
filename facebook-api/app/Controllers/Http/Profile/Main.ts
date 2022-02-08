import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

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
      const isFollowing = await Database.query()
        .from('follows')
        .where('follower_id', auth.user!.id)
        .first()

      user.$extras.isFollowing = isFollowing ? true : false
    }

    return user
  }
}
