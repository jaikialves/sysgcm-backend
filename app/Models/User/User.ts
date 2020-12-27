import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

import { roles } from '../Gcm/types/EnumTypes'
import Keycode from './Keycode'

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
  public role: roles

  @column()
  public avatar: string

  @column()
  public gcm_id: string

  @column()
  public rememberMeToken?: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* ------------------------------------------------------------------------ */

  @hasOne(() => Keycode, { localKey: 'gcm_id', foreignKey: 'id' })
  public keycode: HasOne<typeof Keycode>

  /* ------------------------------------------------------------------------ */

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
