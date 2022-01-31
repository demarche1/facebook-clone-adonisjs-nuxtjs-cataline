import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const reactionsTypes = ['like', 'love', 'haha', 'sad', 'angry'] as const

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.enum(reactionsTypes),
    postId: schema.number([rules.exists({ table: 'posts', column: 'id' })])
  })

  public messages = {}
}
