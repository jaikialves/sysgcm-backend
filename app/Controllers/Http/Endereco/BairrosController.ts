import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

import Bairro from 'App/Models/Endereco/Bairro'
import Municipio from 'App/Models/Endereco/Municipio'
import CreateNewBairroValidator from 'App/Validators/endereco/bairro/CreateNewBairroValidator'

import CreateBairroService from 'App/Controllers/Http/Endereco/services/bairro/CreateBairroService'
import UpdateBairroService from 'App/Controllers/Http/Endereco/services/bairro/UpdateBairroService'
import DeleteBairroService from 'App/Controllers/Http/Endereco/services/bairro/DeleteBairroService'

import NotFoundException from 'App/Exceptions/NotFoundException'

export default class BairrosController {
  //* -> INDEX
  public async index({ request, response }: HttpContextContract): Promise<void> {
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

  //* -> CREATE
  public async create({ request, response }: HttpContextContract): Promise<void> {
    const bairro_dto = await request.validate(CreateNewBairroValidator)

    const bairro = await CreateBairroService.executeForBairro(bairro_dto)

    return response.json(bairro)
  }

  //* -> UPDATE
  public async update({ request, response }: HttpContextContract): Promise<void> {
    const { id } = request.params()
    const bairro_dto = await request.validate({
      schema: schema.create({
        codigo_bairro: schema.string({ trim: true }, [rules.maxLength(6)]),
        bairro: schema.string({ escape: true }, []),
        observacao: schema.string.optional({ escape: true }, []),
      }),
    })

    const bairro = await UpdateBairroService.execute({
      bairro_id: id,
      bairro: bairro_dto.bairro,
      codigo_bairro: bairro_dto.codigo_bairro,
      observacao: bairro_dto.observacao,
    })

    return response.json(bairro)
  }

  //* -> DELETE
  public async delete({ request, response }: HttpContextContract): Promise<void> {
    const { id } = request.params()

    await DeleteBairroService.execute(id)

    response.json('Bairro excluído com sucesso.')
  }
}
