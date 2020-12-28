import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateEnderecoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    logradouro: schema.string.optional({ escape: true }, []),
    numero: schema.string.optional({}, []),
    complemento: schema.string.optional({ escape: true }, []),
    cep: schema.string.optional({ trim: true, escape: true }, []),
    codigo_endereco: schema.string.optional({}, [
      rules.exists({ table: 'enderecos', column: 'codigo_endereco' }),
    ]),
    bairro_id: schema.string.optional({}, [rules.uuid()]),
  })

  public messages = {}
}
