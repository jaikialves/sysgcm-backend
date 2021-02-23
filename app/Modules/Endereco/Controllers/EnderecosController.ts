import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validator from 'validator'
import isUUID = validator.isUUID

import CreateNewEnderecoValidator from 'App/Modules/Endereco/Validators/endereco/CreateNewEnderecoValidator'
import UpdateEnderecoValidator from 'App/Modules/Endereco/Validators/endereco/UpdateEnderecoValidator'

import IndexEnderecoService from 'App/Modules/Endereco/Services/endereco/IndexEnderecoService'
import CreateEnderecoService from 'App/Modules/Endereco/Services/endereco/CreateEnderecoService'
import UpdateEnderecoService from 'App/Modules/Endereco/Services/endereco/UpdateEnderecoService'

import AppException from 'App/Shared/Exceptions/AppException'

export default class EnderecosController {
  //* -> INDEX
  public async index({ request, response }: HttpContextContract): Promise<void> {
    const search = request.input('search', '')

    const enderecos = await IndexEnderecoService.execute(search)

    return response.json(enderecos)
  }

  //* -> CREATE
  public async create({ request, response }: HttpContextContract): Promise<void> {
    const endereco_dto = await request.validate(CreateNewEnderecoValidator)

    const endereco = await CreateEnderecoService.executeForEndereco(endereco_dto)

    response.json(endereco)
  }

  //* -> UPDATE
  public async update({ request, response }: HttpContextContract): Promise<void> {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao atualizar informações: parâmetro incorreto.')
    }

    const endereco_dto = await request.validate(UpdateEnderecoValidator)

    const endereco_id = await UpdateEnderecoService.execute({
      endereco_id: id,
      logradouro: endereco_dto.logradouro,
      numero: endereco_dto.numero,
      complemento: endereco_dto.complemento,
      cep: endereco_dto.cep,
      nome_local: endereco_dto.nome_local,
      codigo_endereco: endereco_dto.codigo_endereco,
      bairros_id: endereco_dto.bairro_id,
    })

    return response.json(endereco_id)
  }
}
