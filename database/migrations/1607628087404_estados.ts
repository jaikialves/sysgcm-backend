import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Estados extends BaseSchema {
  protected tableName = 'estados'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.integer('codigo_ibge', 2).unique()
      table.string('uf', 50).unique()
      table.string('sigla', 2).unique()
      table.string('gentilico', 100)

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
