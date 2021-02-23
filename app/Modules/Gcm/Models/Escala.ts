import { DateTime } from 'luxon'
import {
  afterCreate,
  afterFetch,
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Gcm from 'App/Modules/Gcm/Models/Gcm'

export default class Escala extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public data_inicio: DateTime

  @column()
  public data_fim: DateTime

  @column()
  public gcm_id: string

  @column()
  public observacao: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  /* ----------------------------- RELATIONSHIPS ----------------------------- */

  @manyToMany(() => Gcm, {
    localKey: 'id',
    pivotForeignKey: 'escala_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'gcm_id',
    pivotTable: 'escala_gcm',
  })
  public gcms: ManyToMany<typeof Gcm>

  /* --------------------------------- HOOKS --------------------------------- */

  // -> after hooks
  @afterCreate()
  public static async attachGcm(escala: Escala) {
    await escala.related('gcms').attach([escala.gcm_id])
  }

  @afterFetch()
  public static async preload(escala: Escala): Promise<void> {
    //await escala.preload('gcms')
  }

  /* --------------------------------- SCOPES --------------------------------- */
}
