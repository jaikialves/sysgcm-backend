import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from 'App/Models/Endereco/Municipio'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Municipio, { localKey: 'uuid', foreignKey: 'estado_id' })
  public estado: HasMany<typeof Municipio>
}
