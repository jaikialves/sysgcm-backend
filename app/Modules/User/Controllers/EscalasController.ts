import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validator from 'validator'
import isUUID = validator.isUUID

import AppException from 'App/Shared/Exceptions/AppException'
import IndexEscalaService from 'App/Modules/User/Services/escala/IndexEscalaService'

export default class EscalasController {
  public async index({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()
    if (id && !isUUID(id, 4)) {
      throw new AppException('Erro ao atualizar informações: parâmetro incorreto.')
    }

    const auth_id = auth.user?.id
    const escalas = await IndexEscalaService.execute(id ? id : auth_id)

    return response.json(escalas)
  }
}
