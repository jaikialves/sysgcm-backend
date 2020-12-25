import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column()
  public data_nascimento: DateTime

  @column()
  public nome_mae: string

  @column()
  public nome_pai: string

  @column()
  public telefone: string[]

  @column()
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

  @column()
  public validade_cnh: DateTime

  @column()
  public observacao: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
