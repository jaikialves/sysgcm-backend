import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Municipio from 'App/Models/Endereco/Municipio'

export default class MunicipiosController {
  public async index({ response }: HttpContextContract) {
    const municipios = await Municipio.query()
      .select('*')
      .preload('estado')
      .orderBy('municipio', 'asc')

    return response.json(municipios)
  }

  public async show() {}
}
