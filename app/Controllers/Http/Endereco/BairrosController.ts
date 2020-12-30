import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Bairro from 'App/Models/Endereco/Bairro'

export default class BairrosController {
  public async index({ response }: HttpContextContract) {
    const bairros = await Bairro.query().select('*').orderBy('codigo_bairro', 'asc')

    return response.json(bairros)
  }

  public async show() {}

  public async create({}: HttpContextContract) {}

  public async update() {}

  public async delete() {}
}
