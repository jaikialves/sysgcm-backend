import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import IndexEstadoService from './services/estado/IndexEstadoService'

export default class EstadosController {
  //* -> INDEX
  public async index({ response }: HttpContextContract) {
    const estados = await IndexEstadoService.execute()

    return response.json(estados)
  }
}
