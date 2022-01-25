import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { User, File } from 'App/Models'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where('file_category', 'post')
  })
  public media: HasOne<typeof File>
}
