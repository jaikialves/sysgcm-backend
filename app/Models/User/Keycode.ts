import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import User from './User'

export default class Keycode extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: string

  @column()
  public keycode: string

  @column()
  public gcm_id: string

  @column()
  public role: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'gcm_id' })
  public user: BelongsTo<typeof User>

  /* --------------------------------- HOOKS --------------------------------- */
}
