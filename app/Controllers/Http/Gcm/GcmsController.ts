import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateGcmValidator from 'App/Validators/gcm/CreateGcmValidator'

export default class GcmsController {
  public async create({ request, response }: HttpContextContract) {
    const dados_pessoais_dto = await request.validate(CreateGcmValidator)

    return response.json(dados_pessoais_dto)
  }
}
