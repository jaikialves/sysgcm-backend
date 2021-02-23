import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
import { atribuicao } from './types/EnumTypes'

import DadosPessoais from './DadosPessoais'
import Endereco from 'App/Modules/Endereco/Models/Enderecos'
import User from 'App/Modules/User/Models/User'

export default class Gcm extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nome_guerra: string

  @column({ serializeAs: null })
  public dados_pessoais_id: string

  @column({ serializeAs: null })
  public endereco_id: string

  @column()
  public atribuicao: atribuicao

  @column()
  public historico: string

  @column({ serializeAs: null })
  public status: boolean

  @column({ serializeAs: null })
  public is_deleted: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @belongsTo(() => DadosPessoais, { localKey: 'id', foreignKey: 'dados_pessoais_id' })
  public dados_pessoais: BelongsTo<typeof DadosPessoais>

  @belongsTo(() => Endereco, { localKey: 'id', foreignKey: 'endereco_id' })
  public endereco: BelongsTo<typeof Endereco>

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'gcm_id' })
  public user: BelongsTo<typeof User>

  /* --------------------------------- HOOKS --------------------------------- */

  /* --------------------------------- SCOPES --------------------------------- */

  public static scopeSearchQuery = scope((query, search) => {
    const search_fields = ['nome_guerra']
    let str_return = ''

    search_fields.forEach((element: string, index: number) => {
      str_return = `${str_return} ${index !== 0 ? ' or ' : ' '} ${element} ilike '%${search}%'`
    })

    return query.whereRaw(`(${str_return})`)
  })
}
