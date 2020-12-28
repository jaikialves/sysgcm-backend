import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'

import Estado from 'App/Models/Endereco/Estado'
import Bairro from 'App/Models/Endereco/Bairro'
import DadosPessoais from 'App/Models/Gcm/DadosPessoais'

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

  /* ------------------------------------------------------------------------ */

  @hasMany(() => Bairro, { localKey: 'id', foreignKey: 'bairro_id' })
  public enderecos: HasMany<typeof Bairro>

  @belongsTo(() => Estado, { localKey: 'id', foreignKey: 'estado_id' })
  public estado: BelongsTo<typeof Estado>

  @hasOne(() => DadosPessoais, { localKey: 'id', foreignKey: 'municipio_nascimento_id' })
  public dados_pessoais: HasOne<typeof DadosPessoais>
}
