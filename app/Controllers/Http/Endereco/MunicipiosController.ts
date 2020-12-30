import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Municipio from 'App/Models/Endereco/Municipio'

export default class MunicipiosController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const search = request.input('search', '')
    const state = request.input('state')

    const municipios = await Municipio.query()
      .apply((scopes) => {
        scopes.scopeSearchQuery(state)
      })
      .apply((scopes) => {
        scopes.scopeSearchQuery(search)
      })
      .preload('estado')
      .orderBy('municipio', 'asc')
      .paginate(page, 20)

    return response.json(municipios)
  }
}
