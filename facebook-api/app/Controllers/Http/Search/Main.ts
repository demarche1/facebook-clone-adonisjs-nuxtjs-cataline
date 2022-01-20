import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'

export default class SearchController {
  public async index({ request }: HttpContextContract) {
    const { keyword } = request.qs()

    const result = await User.query().whereRaw(
      `name LIKE "%${keyword}%" OR username LIKE "%${keyword}%" OR email LIKE "%${keyword}%"`
    )

    return result
  }
}
