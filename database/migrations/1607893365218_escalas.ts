import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Escalas extends BaseSchema {
  protected tableName = 'escalas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.dateTime('data_inicio', { useTz: true }).notNullable()
      table.dateTime('data_fim', { useTz: true }).notNullable()
      table.text('observacao').nullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
