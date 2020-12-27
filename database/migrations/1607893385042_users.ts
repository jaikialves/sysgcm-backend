import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('nome_usuario', 20).notNullable()
      table.string('email', 100).nullable()
      table.string('password').notNullable()
      table
        .enu('role', ['ADMIN', 'MASTER', 'MEMBRO'], {
          useNative: true,
          existingType: true,
          enumName: 'roles',
        })
        .nullable()
      table.string('avatar')
      table
        .uuid('gcm_id')
        .references('id')
        .inTable('gcms')
        .unique()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('remember_me_token').nullable()
      table.boolean('status').defaultTo(true)

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
