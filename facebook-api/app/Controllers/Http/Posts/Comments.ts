import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Comment'
import { Comment, Post } from 'App/Models'

export default class CommentsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { content, postId } = await request.validate(StoreValidator)

    const post = await Post.findOrFail(postId)

    const user = auth.user!

    if (user.id !== post.userId) {
      return response.unauthorized()
    }

    return await post.related('comments').create({ content, userId: user.id })
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const { content, commentId } = await request.validate(UpdateValidator)

    const comment = await Comment.findOrFail(commentId)

    const user = auth.user!

    if (user.id !== comment.userId) {
      return response.unauthorized()
    }

    comment.merge({ content, userId: user.id })
    return await comment.save()
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const comment = await Comment.findOrFail(params.id)

    const user = auth.user!

    if (user.id !== comment.userId) {
      return response.unauthorized()
    }

    await comment.delete()
  }
}
