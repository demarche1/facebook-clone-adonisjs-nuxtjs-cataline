import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
  computed
} from '@ioc:Adonis/Lucid/Orm'
import { UserKey, File, Post, Comment, Conversation, Message } from 'App/Models'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where('file_category', 'avatar')
  })
  public avatar: HasOne<typeof File>

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(() => Conversation)
  public conversations: HasMany<typeof Conversation>

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>

  // Seguidores
  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'following_id',
    pivotRelatedForeignKey: 'follower_id'
  })
  public followers: ManyToMany<typeof User>

  // Seguindo
  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'follower_id',
    pivotRelatedForeignKey: 'following_id'
  })
  public following: ManyToMany<typeof User>

  // Computeds
  @computed()
  public get isFollowing(): boolean {
    return this.$extras.isFollowing
  }

  @computed()
  public get postsCount(): number {
    return this.$extras.posts_count
  }

  @computed()
  public get followersCount(): number {
    return this.$extras.followers_count
  }

  @computed()
  public get followingCount(): number {
    return this.$extras.following_count
  }
}
