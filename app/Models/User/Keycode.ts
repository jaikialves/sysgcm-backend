import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Gcm from 'App/Models/Gcm/Gcm'

export default class Keycode extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: string

  @column()
  public keycode: string

  @column()
  public gcm_id: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
  /* ------------------------------------------------------------------------ */

  @hasOne(() => Gcm, { localKey: 'uuid', foreignKey: 'gcm_id' })
  public gcm: HasOne<typeof Gcm>

  /* ------------------------------------------------------------------------ */
}
