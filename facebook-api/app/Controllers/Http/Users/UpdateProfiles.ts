import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/User/UpdateProfile'

export default class UpdateProfilesController {
  public async show({ auth }: HttpContextContract) {
    const user = auth.user!

    await user.load('avatar')

    return user
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)

    const user = auth.user!

    user.merge(data)
    await user.save()

    return response.ok({ msg: 'User was updated!' })
  }

  public async destroy({ response, auth }: HttpContextContract) {
    const user = auth.user!

    await user.delete()

    response.ok({ msg: 'User was deleted' })
  }
}
