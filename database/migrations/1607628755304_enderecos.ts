import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Enderecos extends BaseSchema {
  protected tableName = 'enderecos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('logradouro', 200).notNullable()
      table.string('numero', 4).nullable()
      table.string('complemento', 100).nullable()
      table.string('cep', 8).notNullable()
      table.string('codigo_endereco', 6).nullable()
      table.text('observacao').nullable()
      table
        .uuid('bairro_id')
        .references('id')
        .inTable('bairros')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
