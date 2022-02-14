import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Conversation } from 'App/Models'

export default class MainsController {
  public async index({ auth }: HttpContextContract) {
    const conversations = await Conversation.query()
      .where({ userIdOne: auth.user!.id })
      .orWhere({ userIdTwo: auth.user!.id })

    return conversations
  }

  public async show({ params, response, auth }: HttpContextContract) {
    const conversation = await Conversation.findOrFail(params.id)

    if (![conversation.userIdOne, conversation.userIdTwo].includes(auth.user!.id)) {
      return response.unauthorized()
    }

    await conversation.load('messages')

    return conversation
  }
}
