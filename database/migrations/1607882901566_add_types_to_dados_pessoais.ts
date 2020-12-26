import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddTypesToDadosPessoais extends BaseSchema {
  protected tableName = 'add_types_to_dados_pessoais'

  public async up() {
    await this.db.rawQuery(
      'alter table dados_pessoais alter column telefone type varchar(11) [] using telefone::varchar(11) [];'
    ).knexQuery

    await this.db.rawQuery(
      'alter table dados_pessoais alter column profissao type varchar(40) [] using profissao::varchar(40) [];'
    ).knexQuery

    await this.db.rawQuery(
      'alter table dados_pessoais alter column nome_filhos type varchar(40) [] using nome_filhos::varchar(40) [];'
    ).knexQuery
  }

  public async down() {
    await this.db.rawQuery('alter table dados_pessoais drop column if exists telefone;').knexQuery
    await this.db.rawQuery('alter table dados_pessoais drop column if exists profissao;').knexQuery
    await this.db.rawQuery('alter table dados_pessoais drop column if exists nome_filhos;')
      .knexQuery
  }
}
