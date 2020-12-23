import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DadosPessoais extends BaseSchema {
  protected tableName = 'dados_pessoais'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('nome', 40)
      table.string('rg', 15)
      table.string('cpf', 11)
      table.date('data_nascimento')
      table.string('nome_mae', 40)
      table.string('nome_pai', 40)
      table.string('telefone').notNullable().defaultTo('[]')
      table
        .uuid('municipio_nascimento_id')
        .references('id')
        .inTable('municipios')
        .onUpdate('CASCADE')
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
      table.enu('estado_civil', ['SOLTEIRO', 'CASADO', 'SEPARADO', 'DIVORCIADO', 'VIUVO'], {
        useNative: true,
        existingType: true,
        enumName: 'estado_civil',
      })
      table.string('profissao').notNullable().defaultTo('[]')
      table.enu(
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
          enumName: 'estado_civil',
        }
      )
      table.string('nome_conjuge', 20)
      table.string('nome_filhos').notNullable().defaultTo('[]')
      table.string('titulo_eleitor', 40)
      table.string('zona_eleitoral', 7)
      table.string('cnh', 15)
      table.enu(
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
      table.date('validade_cnh')
      table.text('observacao')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
