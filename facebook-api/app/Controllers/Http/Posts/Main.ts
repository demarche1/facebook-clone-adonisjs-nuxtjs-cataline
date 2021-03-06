import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User, Post } from 'App/Models'
import { StoreValidator, UpdateValidator } from 'App/Validators/Post/Main'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export default class Main {
  public async index({ request, auth }: HttpContextContract) {
    const { username } = request.qs()

    const user = (await User.findBy('username', username || '')) || auth.user!

    await user.load('posts', (query) => {
      query.preload('media')

      query.withCount('comments')

      query.preload('user', (query) => {
        query.select(['id', 'name', 'username'])
        query.preload('avatar')
      })

      query.preload('comments', (query) => {
        query.preload('user', (query) => {
          query.select(['id', 'name', 'username'])
          query.preload('avatar')
        })
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'like')
        query.as('like')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'love')
        query.as('love')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'haha')
        query.as('haha')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'sad')
        query.as('sad')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'angry')
        query.as('angry')
      })

      query.preload('reactions', () => {
        query.where('userId', auth.user!.id).first()
      })
    })

    return user.posts
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    const post = await auth.user!.related('posts').create(data)

    return post
  }

  public async update({ request, auth, params, response }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)

    const post = await Post.findOrFail(params.id)

    if (post.userId !== auth.user!.id) {
      return response.unauthorized()
    }

    await post.merge(data).save()
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    if (post.userId !== auth.user!.id) {
      return response.unauthorized()
    }

    await post.load('media')

    if (post.media) {
      fs.unlinkSync(Application.tmpPath('uploads', post.media.fileName))

      await post.media.delete()
    }

    await post.delete()
  }
}
