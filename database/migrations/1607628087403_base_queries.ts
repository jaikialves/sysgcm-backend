import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BaseQueries extends BaseSchema {
  protected tableName = 'base_queries'

  public async up() {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').knexQuery
    await this.db.rawQuery('SET TIMEZONE="America/Sao_Paulo";').knexQuery

    // create enum types
    await this.db.rawQuery("CREATE TYPE  sexo AS ENUM ('MASCULINO', 'FEMININO');").knexQuery
    await this.db.rawQuery(
      "CREATE TYPE cutis AS ENUM ('BRANCO', 'PRETO', 'PARDO', 'AMARELO', 'INDIGENA');"
    ).knexQuery
    await this.db.rawQuery(
      "CREATE TYPE tipo_sanguineo AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');"
    ).knexQuery
    await this.db.rawQuery(
      "CREATE TYPE estado_civil AS ENUM ('SOLTEIRO', 'CASADO', 'SEPARADO', 'DIVORCIADO', 'VIUVO');"
    ).knexQuery
    await this.db.rawQuery(
      "CREATE TYPE tipo_cnh AS ENUM ('ACC', 'A', 'B', 'C', 'D', 'E', 'ACC-B', 'ACC-C', 'ACC-D', 'ACC-E', 'A-B', 'A-C', 'A-D', 'A-E');"
    ).knexQuery
    await this.db.rawQuery(
      "CREATE TYPE escolaridade AS ENUM ('FUNDAMENTAL-INCOMPLETO', 'FUNDAMENTAL-COMPLETO', 'MEDIO-INCOMPLETO', 'MEDIO-COMPLETO', 'SUPERIOR-INCOMPLETO', 'SUPERIOR-COMPLETO', 'POS-GRADUACAO-INCOMPLETO', 'POS-GRADUACAO-COMPLETO', 'MESTRADO');"
    ).knexQuery
    await this.db.rawQuery(
      "CREATE TYPE atribuicao AS ENUM ('COMANDANTE', 'SUB-COMANDANTE', 'ADMINISTRATIVO', 'COI', 'SUPERVISOR', 'OFICIAL');"
    ).knexQuery
  }

  public async down() {
    await this.db.rawQuery('DROP EXTENSION "uuid-ossp";').knexQuery
    await this.db.rawQuery('DROP TYPE sexo;').knexQuery
    await this.db.rawQuery('DROP TYPE cutis;').knexQuery
    await this.db.rawQuery('DROP TYPE tipo_sanguineo;').knexQuery
    await this.db.rawQuery('DROP TYPE estado_civil;').knexQuery
    await this.db.rawQuery('DROP TYPE tipo_cnh;').knexQuery
    await this.db.rawQuery('DROP TYPE escolaridade;').knexQuery
    await this.db.rawQuery('DROP TYPE atribuicao;').knexQuery
  }
}
