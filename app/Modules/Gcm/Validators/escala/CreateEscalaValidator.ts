import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateEscalaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    data_inicio: schema.date({}, []),
    data_fim: schema.date({}, []),
    gcm_id: schema.string({}, [
      rules.uuid(),
      rules.exists({ table: 'gcms', column: 'id', where: { status: true } }),
    ]),
    observacao: schema.string.optional({ escape: true }, []),
  })

  public messages = {}
}
