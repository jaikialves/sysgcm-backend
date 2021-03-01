import { DateTime } from 'luxon'
import {
  afterFind,
  BaseModel,
  beforeFind,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ModelQueryBuilderContract,
  scope,
} from '@ioc:Adonis/Lucid/Orm'

import Endereco from 'App/Modules/Endereco/Models/Enderecos'
import Municipio from 'App/Modules/Endereco/Models/Municipio'
import Gcm from 'App/Modules/Gcm/Models/Gcm'

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

  @column({ serializeAs: null })
  public is_deleted: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @hasMany(() => Endereco, { localKey: 'id', foreignKey: 'endereco_id' })
  public bairros: HasMany<typeof Endereco>

  @belongsTo(() => Municipio, { localKey: 'id', foreignKey: 'municipio_id' })
  public municipio: BelongsTo<typeof Municipio>

  /* --------------------------------- HOOKS --------------------------------- */

  @beforeFind()
  public static async ignoreDeleted(query: ModelQueryBuilderContract<typeof Gcm>): Promise<void> {
    query.whereNot('is_deleted', true)
  }

  @afterFind()
  public static async preload(bairro: Bairro): Promise<void> {
    await bairro.preload('municipio')
  }

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
