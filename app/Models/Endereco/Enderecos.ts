import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
  public codigo_endereco: string

  @column()
  public bairro_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
