import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Municipios extends BaseSchema {
  protected tableName = 'municipios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('codigo_ibge', 7)
      table.string('municipio', 50)
      table.string('gentilico', 100)
      table.uuid('estado_id').references('id').inTable('estados').notNullable().onUpdate('CASCADE')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
