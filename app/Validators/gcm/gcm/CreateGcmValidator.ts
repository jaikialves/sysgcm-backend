import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { atribuicao } from 'App/Models/Gcm/types/EnumTypes'

export default class CreateGcmValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome_guerra: schema.string({ trim: true, escape: true }, [
      rules.minLength(2),
      rules.maxLength(20),
      rules.required(),
    ]),
    atribuicao: schema.enum(Object.values(atribuicao), [rules.required()]),
    role_name: schema.string({ trim: true, escape: true }, [
      rules.exists({ table: 'roles', column: 'name' }),
    ]),
  })

  public messages = {}
}
