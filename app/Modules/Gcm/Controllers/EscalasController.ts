import { container } from 'tsyringe'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { CreateEscalaValidator } from 'App/Modules/Gcm/Validators'
import { CreateEscalaService } from 'App/Modules/Gcm/Services/escala/CreateEscalaService'

export default class EscalasController {
  public async create({ request, response }: HttpContextContract) {
    const escala_dto = await request.validate(CreateEscalaValidator)

    const createEscala = container.resolve(CreateEscalaService)
    const escala_id = await createEscala.execute(escala_dto)

    return response.json(escala_id)
  }
}
