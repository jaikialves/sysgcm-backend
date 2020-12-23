import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'

export default class Estado extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public codigo_ibge: number

  @column()
  public uf: string

  @column()
  public sigla: string

  @column()
  public gentilico: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ------------------------------------------------------------------------ */

  @hasMany(() => Municipio, { localKey: 'uuid', foreignKey: 'estado_id' })
  public municipios: HasMany<typeof Municipio>
}
