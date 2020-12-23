import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Estado from 'App/Models/Endereco/Estado'

export default class EstadosController {
  public async index({ response }: HttpContextContract) {
    const estados = await Estado.query().select('*').orderBy('uf', 'asc')

    return response.json(estados)
  }
}
