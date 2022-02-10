import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Messages'
import { Conversation } from 'App/Models'

export default class MainsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { content, receiverId } = await request.validate(StoreValidator)

    if (receiverId === auth.user!.id) {
      return response.badRequest()
    }

    const existingConversation = await Conversation.query()
      .where({
        userIdOne: auth.user!.id,
        userIdTwo: receiverId
      })
      .orWhere({
        userIdOne: receiverId,
        userIdTwo: auth.user!.id
      })
      .first()

    if (existingConversation) {
      const message = await existingConversation.related('messages').create({
        content,
        userId: auth.user!.id
      })

      return message
    }

    const conversation = await Conversation.create({
      userIdOne: auth.user!.id,
      userIdTwo: receiverId
    })

    const message = await conversation.related('messages').create({
      content,
      userId: auth.user!.id
    })

    return message
  }
}
