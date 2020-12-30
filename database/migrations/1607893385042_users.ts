import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('nome_usuario', 20).notNullable()
      table.string('email', 100).notNullable()
      table.string('password').notNullable()
      table.string('avatar').nullable()
      table
        .uuid('gcm_id')
        .references('id')
        .inTable('gcms')
        .notNullable()
        .unique()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .uuid('role_id')
        .references('id')
        .inTable('roles')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.string('remember_me_token').nullable()
      table.boolean('status').defaultTo(true)

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
