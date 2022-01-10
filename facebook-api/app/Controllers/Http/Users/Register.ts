import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/Register'
import { User, UserKey } from 'App/Models'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class UserRegisterController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)

    const user = await User.create({ email })
    await user.save()

    const key = faker.datatype.uuid() + user.id
    user.related('keys').create({ key })

    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

    await Mail.send((message) => {
      message.to(user.email)
      message.from('contato@facebook.com')
      message.subject('Confirmação de email')
      message.textView('emails/register', { link })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)

    const user = await userKey.related('user').query().firstOrFail()

    return user
  }

  public async update({ response, request }: HttpContextContract) {
    const { key, name, password } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    const user = await userKey.related('user').query().firstOrFail()

    const username = name.split(' ')[0].toLowerCase() + user.id

    user.merge({ name, username, password })
    await user.save()

    await userKey.delete()

    return response.ok({ message: 'User has been created' })
  }
}
