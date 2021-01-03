import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import IndexMunicipioService from './services/municipio/IndexMunicipioService'

export default class MunicipiosController {
  //* -> INDEX
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const search = request.input('search', '')
    const state = request.input('state')

    const municipios = await IndexMunicipioService.execute({ page, search, state })

    return response.json(municipios)
  }
}
