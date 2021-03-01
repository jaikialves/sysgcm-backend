import { container } from 'tsyringe'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IndexEscalaService } from 'App/Modules/User/Services/escala/IndexEscalaService'

import { uuidUserHandler } from 'App/Shared/Validators'

export default class EscalasController {
  public async index({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()
    const auth_id = auth.user?.id

    await uuidUserHandler(id || auth_id)

    const indexEscala = container.resolve(IndexEscalaService)
    const escalas = await indexEscala.execute(id ? id : auth_id)

    return response.json(escalas)
  }
}
