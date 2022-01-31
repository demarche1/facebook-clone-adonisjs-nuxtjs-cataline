import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: 'like' | 'love' | 'haha' | 'sad' | 'angry'

  @column()
  public userId: number

  @column()
  public postId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
