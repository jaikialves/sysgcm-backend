import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { atribuicao } from './types/EnumTypes'

import DadosPessoais from './DadosPessoais'
import Endereco from 'App/Models/Endereco/Enderecos'

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

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @belongsTo(() => DadosPessoais, { localKey: 'id', foreignKey: 'dados_pessoais_id' })
  public dados_pessoais: BelongsTo<typeof DadosPessoais>

  @belongsTo(() => Endereco, { localKey: 'id', foreignKey: 'endereco_id' })
  public endereco: BelongsTo<typeof Endereco>
}
