import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Estado from 'App/Models/Endereco/Estado'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public codigo_ibge: string

  @column()
  public municipio: string

  @column()
  public gentilico: string

  @column()
  public estado_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Estado, { localKey: 'uuid', foreignKey: 'estado_id' })
  public estado: BelongsTo<typeof Estado>
}
