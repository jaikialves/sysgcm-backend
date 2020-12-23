import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Escala extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public data_inicio: DateTime

  @column()
  public data_fim: DateTime

  @column()
  public observacao: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
