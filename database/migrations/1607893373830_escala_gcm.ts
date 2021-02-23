import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EscalasGcms extends BaseSchema {
  protected tableName = 'escala_gcm'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.dateTime('data_inicio', { useTz: true }).nullable()
      table.dateTime('data_fim', { useTz: true }).nullable()

      table
        .uuid('gcm_id')
        .references('id')
        .inTable('gcms')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .nullable()
      table
        .uuid('escala_id')
        .references('id')
        .inTable('escalas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .nullable()

      table.text('observacao').nullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
