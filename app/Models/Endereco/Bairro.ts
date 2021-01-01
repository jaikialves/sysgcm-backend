import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'

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

  /* --------------------------------- SCOPES --------------------------------- */

  public static scopeSearchQuery = scope((query, search) => {
    const search_fields = ['bairro', 'codigo_bairro']
    let str_return = ''

    search_fields.forEach((element: string, index: number) => {
      str_return = `${str_return} ${index !== 0 ? ' or ' : ' '} ${element} ilike '%${search}%'`
    })

    return query.whereRaw(`(${str_return})`)
  })
}
