import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Estado from 'App/Models/Endereco/Estado'
import Bairro from 'App/Models/Endereco/Bairro'

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

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ------------------------------------------------------------------------ */

  @hasMany(() => Bairro, { localKey: 'uuid', foreignKey: 'bairro_id' })
  public enderecos: HasMany<typeof Bairro>

  @belongsTo(() => Estado, { localKey: 'uuid', foreignKey: 'estado_id' })
  public estado: BelongsTo<typeof Estado>
}
