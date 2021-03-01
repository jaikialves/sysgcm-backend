import { DateTime } from 'luxon'
import {
  afterCreate,
  BaseModel,
  beforeFind,
  beforeSave,
  column,
  hasOne,
  manyToMany,
  HasOne,
  ManyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'

import Hash from '@ioc:Adonis/Core/Hash'

import Keycode from './Keycode'
import Role from './Role'
import Gcm from 'App/Modules/Gcm/Models/Gcm'
import Escala from 'App/Modules/Gcm/Models/Escala'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nome_usuario: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatar: string

  @column()
  public gcm_id: string

  @column()
  public role_id: string

  @column()
  public rememberMeToken?: string

  @column()
  public status: boolean

  @column({ serializeAs: null })
  public is_deleted: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @hasOne(() => Keycode, { localKey: 'gcm_id', foreignKey: 'id' })
  public keycode: HasOne<typeof Keycode>

  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'role_user',
  })
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Escala, {
    localKey: 'id',
    pivotForeignKey: 'gcm_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'escala_id',
    pivotTable: 'escala_gcm',
  })
  public escalas: ManyToMany<typeof Escala>

  @hasOne(() => Gcm, { localKey: 'gcm_id', foreignKey: 'id' })
  public gcm: HasOne<typeof Gcm>

  /* --------------------------------- HOOKS --------------------------------- */

  @beforeFind()
  public static async ignoreDeleted(query: ModelQueryBuilderContract<typeof User>): Promise<void> {
    query.whereNot('is_deleted', true)
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterCreate()
  public static async attachRole(user: User): Promise<void> {
    await user.related('roles').attach([user.role_id])
  }
  /*
  @afterFetch()
  public static async preload(user: User): Promise<void> {
    //await user.preload('gcm')
  }*/
}
