import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateBairroValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    codigo_bairro: schema.string.optional({ trim: true }, [
      rules.maxLength(6),
      rules.exists({ table: 'bairros', column: 'codigo_bairro' }),
    ]),
    bairro: schema.string.optional({ escape: true }, [rules.requiredIfNotExists('codigo_bairro')]),
    observacao: schema.string.optional({ escape: true }, []),
    municipio_id: schema.string.optional({}, [
      rules.uuid(),
      rules.exists({ table: 'municipios', column: 'id' }),
      rules.requiredIfNotExists('codigo_bairro'),
    ]),
  })

  public messages = {}
}
