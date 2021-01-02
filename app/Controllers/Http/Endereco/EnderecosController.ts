import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateNewEnderecoValidator from 'App/Validators/endereco/endereco/CreateNewEnderecoValidator'
import CreateEnderecoService from 'App/Controllers/Http/Endereco/services/endereco/CreateEnderecoService'

export default class EnderecosController {
  //* -> INDEX
  public async index({}: HttpContextContract): Promise<void> {}

  //* -> CREATE
  public async create({ request, response }: HttpContextContract): Promise<void> {
    const endereco_dto = await request.validate(CreateNewEnderecoValidator)

    const endereco = await CreateEnderecoService.executeForEndereco(endereco_dto)

    response.json(endereco)
  }

  //* -> UPDATE
  public async update({}: HttpContextContract): Promise<void> {}
}
