import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Bairro from 'App/Models/Endereco/Bairro'
import Municipio from 'App/Models/Endereco/Municipio'

import CreateBairroValidator from 'App/Validators/endereco/bairro/CreateBairroValidator'

import NotFoundException from 'App/Exceptions/NotFoundException'
import CreateBairroService from 'App/Controllers/Http/Endereco/services/bairro/CreateBairroService'

export default class BairrosController {
  public async index({ request, response }: HttpContextContract) {
    const search = request.input('search', '')

    const municipio_itarare = await Municipio.findBy('codigo_ibge', '3523206')
    if (!municipio_itarare) {
      throw new NotFoundException('Erro ao lista bairros: municipio não encontrado.')
    }

    const bairros = await Bairro.query()
      .apply((scopes) => {
        scopes.scopeSearchQuery(search)
      })
      .where({
        municipio_id: municipio_itarare.id,
      })
      .orderBy('codigo_bairro', 'asc')

    return response.json(bairros)
  }

  public async show() {}

  public async create({ request, response }: HttpContextContract) {
    const bairro_dto = await request.validate(CreateBairroValidator)

    const bairro = await CreateBairroService.execute(bairro_dto)

    return response.json(bairro)
  }

  public async update() {}

  public async delete() {}
}
