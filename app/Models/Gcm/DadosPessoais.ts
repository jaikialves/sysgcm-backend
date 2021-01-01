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

import Gcm from './Gcm'
import Municipio from 'App/Models/Endereco/Municipio'

import {
  sexo,
  cutis,
  escolaridade,
  estado_civil,
  tipo_sanguineo,
  tipo_cnh,
} from 'App/Models/Gcm/types/EnumTypes'

export default class DadosPessoais extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nome: string

  @column()
  public rg: string

  @column()
  public cpf: string

  @column({
    serialize: (value: DateTime) => {
      return new Date(value.toString()).toLocaleDateString()
    },
  })
  public data_nascimento: DateTime

  @column()
  public nome_mae: string

  @column()
  public nome_pai: string

  @column()
  public telefone: string[]

  @column({ serializeAs: null })
  public municipio_nascimento_id: string

  @column()
  public sexo: sexo

  @column()
  public cutis: cutis

  @column()
  public tipo_sanguineo: tipo_sanguineo

  @column()
  public estado_civil: estado_civil

  @column()
  public profissao: string[]

  @column()
  public escolaridade: escolaridade

  @column()
  public nome_conjuge: string

  @column()
  public nome_filhos: string[]

  @column()
  public titulo_eleitor: string

  @column()
  public zona_eleitoral: string

  @column()
  public cnh: string

  @column()
  public tipo_cnh: tipo_cnh

  @column({
    serialize: (value?: DateTime) => {
      return value ? new Date(value.toString()).toLocaleDateString() : value
    },
  })
  public validade_cnh: DateTime

  @column()
  public observacao: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @hasOne(() => Gcm, { localKey: 'id', foreignKey: 'dados_pessoais_id' })
  public gcm: HasOne<typeof Gcm>

  @belongsTo(() => Municipio, { localKey: 'id', foreignKey: 'municipio_nascimento_id' })
  public municipio_nascimento: BelongsTo<typeof Municipio>

  /* --------------------------------- SCOPES --------------------------------- */

  public static scopeSearchQuery = scope((query, search) => {
    const search_fields = ['nome', 'rg', 'cpf', 'telefone', 'cnh', 'titulo_eleitor']
    let str_return = ''

    search_fields.forEach((element: string, index: number) => {
      str_return = `${str_return} ${index !== 0 ? ' or ' : ' '} ${element} ilike '%${search}%'`
    })

    return query.whereRaw(`(${str_return})`)
  })
}
