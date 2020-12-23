import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Keycodes extends BaseSchema {
  protected tableName = 'keycodes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('keycode', 8)
      table
        .uuid('gcm_id')
        .references('id')
        .inTable('gcms')
        .unique()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.boolean('active').defaultTo(true)

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
