import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Bairro extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nome: string

  @column()
  public codigo_bairro: string

  @column()
  public observacao: string

  @column()
  public municipio_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
