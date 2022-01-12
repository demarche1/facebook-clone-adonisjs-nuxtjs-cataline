import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/Register'
import { User, UserKey } from 'App/Models'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UserRegisterController {
  public async store({ request }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { email, redirectUrl } = await request.validate(StoreValidator)

      const user = new User()

      user.email = email

      user.useTransaction(trx)

      await user.save()

      const key = faker.datatype.uuid() + user.id

      user.related('keys').create({ key })

      const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

      await Mail.send((message) => {
        message.to(user.email)
        message.from('contato@facebook.com')
        message.subject('Confirmação de email')
        message.htmlView('emails/verify-email', { link })
      })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)

    await userKey.load('user')

    return userKey.user
  }

  public async update({ response, request }: HttpContextContract) {
    const { key, name, password } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    await userKey.load('user')

    const username = name.split(' ')[0].toLowerCase() + userKey.user.id

    userKey.user.merge({ name, username, password })

    await userKey.user.save()

    await userKey.delete()

    return response.ok({ message: 'User has been created' })
  }
}
