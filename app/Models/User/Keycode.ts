import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Keycode extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public keycode: string

  @column()
  public gcm_id: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
