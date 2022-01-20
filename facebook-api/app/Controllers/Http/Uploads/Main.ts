import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

export default class UploadController {
  public async show({ response, params }: HttpContextContract) {
    return response.download(Application.tmpPath('uploads', params.file))
  }
}
