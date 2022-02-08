import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  computed
} from '@ioc:Adonis/Lucid/Orm'
import { User, File, Comment, Reaction } from 'App/Models'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: number

  // Computeds
  @computed()
  public get commentsCount(): number {
    return this.$extras.comments_count
  }

  @computed()
  public get reactionsCount() {
    return {
      like: this.$extras.like || 0,
      love: this.$extras.love || 0,
      haha: this.$extras.haha || 0,
      sad: this.$extras.sad || 0,
      angry: this.$extras.angry || 0
    }
  }

  @computed()
  public get activeReaction() {
    return this.reactions && this.reactions.length ? this.reactions[0].type : null
  }

  // Relations
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where('file_category', 'post')
  })
  public media: HasOne<typeof File>

  @hasMany(() => Reaction)
  public reactions: HasMany<typeof Reaction>
}
