import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Gcms extends BaseSchema {
  protected tableName = 'gcms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('nome_guerra', 20).notNullable()

      table
        .uuid('dados_pessoais_id')
        .references('id')
        .inTable('dados_pessoais')
        .unique()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .uuid('endereco_id')
        .references('id')
        .inTable('enderecos')
        .unique()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .enu(
          'atribuicao',
          ['COMANDANTE', 'SUB-COMANDANTE', 'ADMINISTRATIVO', 'COI', 'SUPERVISOR', 'OFICIAL'],
          { useNative: true, existingType: true, enumName: 'atribuicao' }
        )
        .notNullable()

      table.text('historico').nullable()

      table.boolean('status').defaultTo(true)
      table.boolean('is_deleted').defaultTo(false)

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
