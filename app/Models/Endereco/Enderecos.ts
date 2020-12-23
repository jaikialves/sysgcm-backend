import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Bairro from 'App/Models/Endereco/Bairro'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public logradouro: string

  @column()
  public numero: string

  @column()
  public complemento: string

  @column()
  public cep: string

  @column()
  public codigo_endereco: string

  @column()
  public bairro_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* ------------------------------------------------------------------------ */

  @belongsTo(() => Bairro, { localKey: 'uuid', foreignKey: 'bairro_id' })
  public bairro: BelongsTo<typeof Bairro>
}
