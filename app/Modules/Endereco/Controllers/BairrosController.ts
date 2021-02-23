import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import validator from 'validator'
import isUUID = validator.isUUID

import CreateNewBairroValidator from 'App/Modules/Endereco/Validators/bairro/CreateNewBairroValidator'

import IndexBairroService from 'App/Modules/Endereco/Services/bairro/IndexBairroService'
import CreateBairroService from 'App/Modules/Endereco/Services/bairro/CreateBairroService'
import UpdateBairroService from 'App/Modules/Endereco/Services/bairro/UpdateBairroService'
import DeleteBairroService from 'App/Modules/Endereco/Services/bairro/DeleteBairroService'

import AppException from 'App/Shared/Exceptions/AppException'

export default class BairrosController {
  //* -> INDEX
  public async index({ request, response }: HttpContextContract): Promise<void> {
    const search = request.input('search', '')

    const bairros = await IndexBairroService.execute(search)

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
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao atualizar informações: parâmetro incorreto.')
    }

    const bairro_dto = await request.validate({
      schema: schema.create({
        codigo_bairro: schema.string({ trim: true }, [rules.maxLength(6)]),
        bairro: schema.string({ escape: true }, []),
        observacao: schema.string.optional({ escape: true }, []),
      }),
    })

    const bairro_id = await UpdateBairroService.executeForBairro({
      bairro_id: id,
      bairro: bairro_dto.bairro,
      codigo_bairro: bairro_dto.codigo_bairro,
      observacao: bairro_dto.observacao,
    })

    return response.json(bairro_id)
  }

  //* -> DELETE
  public async delete({ request, response }: HttpContextContract): Promise<void> {
    const { id } = request.params()

    await DeleteBairroService.execute(id)

    response.json('Bairro excluído com sucesso.')
  }
}
