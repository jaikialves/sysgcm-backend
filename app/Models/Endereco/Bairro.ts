import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Endereco from 'App/Models/Endereco/Enderecos'
import Municipio from 'App/Models/Endereco/Municipio'

export default class Bairro extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public bairro: string

  @column()
  public codigo_bairro: string

  @column()
  public observacao: string

  @column({ serializeAs: null })
  public municipio_id: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @hasMany(() => Endereco, { localKey: 'id', foreignKey: 'endereco_id' })
  public bairros: HasMany<typeof Endereco>

  @belongsTo(() => Municipio, { localKey: 'id', foreignKey: 'municipio_id' })
  public municipio: BelongsTo<typeof Municipio>
}
