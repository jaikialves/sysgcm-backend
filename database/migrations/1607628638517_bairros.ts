import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bairros extends BaseSchema {
  protected tableName = 'bairros'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('bairro', 255).notNullable()
      table.string('codigo_bairro', 6).nullable()
      table.text('observacao').nullable()
      table
        .uuid('municipio_id')
        .references('id')
        .inTable('municipios')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.boolean('is_deleted').defaultTo(false)

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
