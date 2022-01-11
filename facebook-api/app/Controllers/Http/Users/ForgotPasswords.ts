import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPassword'
import User from 'App/Models/User'
import { UserKey } from 'App/Models'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ForgotPasswordsController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)

    const user = await User.findByOrFail('email', email)

    const key = faker.datatype.uuid() + user.id

    await user.related('keys').create({ key })

    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

    await Mail.send((message) => {
      message
        .from('contato@facebook.com')
        .to(user.email)
        .subject('Recuperação de senha')
        .htmlView('emails/forgot_password', { link, name: user.name })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)

    const user = await userKey.related('user').query().firstOrFail()

    return user
  }

  public async update({ request, response }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    const user = await userKey.related('user').query().firstOrFail()

    user.password = password

    await user.save()

    response.ok({ message: 'Password was updated!' })
  }
}
