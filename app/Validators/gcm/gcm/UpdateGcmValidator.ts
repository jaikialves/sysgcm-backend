import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { atribuicao } from 'App/Models/Gcm/types/EnumTypes'

export default class UpdateGcmValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome_guerra: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(2),
      rules.maxLength(20),
    ]),
    atribuicao: schema.enum.optional(Object.values(atribuicao), []),
    historico: schema.string.optional({}, []),
    status: schema.boolean.optional([]),
  })

  public messages = {}
}
