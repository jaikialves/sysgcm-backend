import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  hasOne,
  HasOne,
  scope,
} from '@ioc:Adonis/Lucid/Orm'

import Bairro from 'App/Models/Endereco/Bairro'
import Gcm from '../Gcm/Gcm'

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
  public nome_local: string

  @column()
  public codigo_endereco: string

  @column()
  public observacao: string

  @column({ serializeAs: null })
  public bairro_id: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @belongsTo(() => Bairro, { localKey: 'id', foreignKey: 'bairro_id' })
  public bairro: BelongsTo<typeof Bairro>

  @hasOne(() => Gcm, { localKey: 'id', foreignKey: 'endereco_id' })
  public gcm: HasOne<typeof Gcm>

  /* --------------------------------- SCOPES --------------------------------- */

  public static scopeSearchQuery = scope((query, search) => {
    const search_fields = ['logradouro', 'numero', 'cep', 'nome_local', 'codigo_endereco']
    let str_return = ''

    search_fields.forEach((element: string, index: number) => {
      str_return = `${str_return} ${index !== 0 ? ' or ' : ' '} ${element} ilike '%${search}%'`
    })

    return query.whereRaw(`(${str_return})`)
  })
}
