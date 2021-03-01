import { DateTime } from 'luxon'
import {
  afterFind,
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  scope,
} from '@ioc:Adonis/Lucid/Orm'

import Estado from 'App/Modules/Endereco/Models/Estado'
import Bairro from 'App/Modules/Endereco/Models/Bairro'
import DadosPessoais from 'App/Modules/Gcm/Models/DadosPessoais'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public codigo_ibge: string

  @column({ serializeAs: 'cidade' })
  public municipio: string

  @column()
  public gentilico: string

  @column({ serializeAs: null })
  public estado_id: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @hasMany(() => Bairro, { localKey: 'id', foreignKey: 'bairro_id' })
  public enderecos: HasMany<typeof Bairro>

  @belongsTo(() => Estado, { localKey: 'id', foreignKey: 'estado_id' })
  public estado: BelongsTo<typeof Estado>

  @hasOne(() => DadosPessoais, { localKey: 'id', foreignKey: 'municipio_nascimento_id' })
  public dados_pessoais: HasOne<typeof DadosPessoais>

  /* --------------------------------- HOOKS --------------------------------- */

  @afterFind()
  public static async preload(municipio: Municipio): Promise<void> {
    await municipio.preload('estado')
  }

  /* --------------------------------- SCOPES --------------------------------- */

  public static scopeSearchQuery = scope((query, search, state) => {
    const search_fields = ['codigo_ibge', 'municipio', 'gentilico']
    let str_return = ''

    search_fields.forEach((element: string, index: number) => {
      str_return = `${str_return} ${index !== 0 ? ' or ' : ' '} ${element} ilike '%${search}%'`
    })

    return query.whereRaw(
      `(${str_return}) and estado_id = (select id from estados where sigla ilike '${state}')`
    )
  })
}
