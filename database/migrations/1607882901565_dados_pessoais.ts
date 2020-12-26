import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DadosPessoais extends BaseSchema {
  protected tableName = 'dados_pessoais'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('nome', 40)
      table.string('rg', 11).nullable()
      table.string('cpf', 11).notNullable()
      table.date('data_nascimento').notNullable()
      table.string('nome_mae', 40).notNullable()
      table.string('nome_pai', 40).nullable()
      table.string('telefone', 11).nullable()
      table
        .uuid('municipio_nascimento_id')
        .references('id')
        .inTable('municipios')
        .onUpdate('CASCADE')
        .notNullable()
      table
        .enu('sexo', ['MASCULINO', 'FEMININO'], {
          useNative: true,
          existingType: true,
          enumName: 'sexo',
        })
        .nullable()
      table
        .enu('cutis', ['BRANCO', 'PRETO', 'PARDO', 'AMARELO', 'INDIGENA'], {
          useNative: true,
          existingType: true,
          enumName: 'cutis',
        })
        .nullable()
      table
        .enu('tipo_sanguineo', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          useNative: true,
          existingType: true,
          enumName: 'tipo_sanguineo',
        })
        .nullable()
      table
        .enu('estado_civil', ['SOLTEIRO', 'CASADO', 'SEPARADO', 'DIVORCIADO', 'VIUVO'], {
          useNative: true,
          existingType: true,
          enumName: 'estado_civil',
        })
        .nullable()
      table.string('profissao', 40).nullable()
      table
        .enu(
          'escolaridade',
          [
            'FUNDAMENTAL-INCOMPLETO',
            'FUNDAMENTAL-COMPLETO',
            'MEDIO-INCOMPLETO',
            'MEDIO-COMPLETO',
            'SUPERIOR-INCOMPLETO',
            'SUPERIOR-COMPLETO',
            'POS-GRADUACAO-INCOMPLETO',
            'POS-GRADUACAO-COMPLETO',
            'MESTRADO',
          ],
          {
            useNative: true,
            existingType: true,
            enumName: 'escolaridade',
          }
        )
        .nullable()
      table.string('nome_conjuge', 20).nullable()
      table.string('nome_filhos', 40).nullable()
      table.string('titulo_eleitor', 14).nullable()
      table.string('zona_eleitoral', 3).nullable()
      table.string('cnh', 11).nullable()
      table
        .enu(
          'tipo_cnh',
          [
            'ACC',
            'A',
            'B',
            'C',
            'D',
            'E',
            'ACC-B',
            'ACC-C',
            'ACC-D',
            'ACC-E',
            'A-B',
            'A-C',
            'A-D',
            'A-E',
          ],
          {
            useNative: true,
            existingType: true,
            enumName: 'tipo_cnh',
          }
        )
        .nullable()
      table.date('validade_cnh').nullable()
      table.text('observacao').nullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
