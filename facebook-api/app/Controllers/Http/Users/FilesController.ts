import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/User/File'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'

export default class FilesController {
  public async update({ request, auth }: HttpContextContract) {
    const response = Database.transaction(async (trx) => {
      const { file } = await request.validate(UpdateValidator)

      const user = auth.user!.useTransaction(trx)

      const searchPayload = {
        ownerId: user.id
      }

      const savePayload = {
        fileCategory: 'avatar' as any,
        fileName: `${new Date().getTime()}.${file.extname}`
      }

      const avatar = await user.related('avatar').firstOrCreate(searchPayload, savePayload)

      await file.move(Application.tmpPath('uploads'), {
        name: avatar.fileName,
        overwrite: true
      })

      return avatar
    })
    return response
  }
}
