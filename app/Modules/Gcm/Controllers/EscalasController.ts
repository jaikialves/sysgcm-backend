import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EscalaValidator from 'App/Modules/Gcm/Validators/escala/EscalaValidator'
import CreateEscalaService from 'App/Modules/Gcm/Services/escala/CreateEscalaService'

export default class EscalasController {
  public async create({ request, response }: HttpContextContract) {
    const escala_dto = await request.validate(EscalaValidator)

    const escala_id = await CreateEscalaService.execute(escala_dto)

    return response.json(escala_id)
  }
}
