import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateDadosPessoaisValidator from 'App/Validators/gcm/CreateDadosPessoaisValidator'
import CreateBairroValidator from 'App/Validators/endereco/CreateBairroValidator'
import CreateEnderecoValidator from 'App/Validators/endereco/CreateEnderecoValidator'
import CreateGcmValidator from 'App/Validators/gcm/CreateGcmValidator'

import CreateBairroService from 'App/Controllers/Http/Endereco/services/bairro/CreateBairroService'
import CreateEnderecoService from '../Endereco/services/endereco/CreateEnderecoService'
import CreateDadosPessoaisService from './services/dados_pessoais/CreateDadosPessoaisService'
import CreateGcmService from 'App/Controllers/Http/Gcm/services/gcm/CreateGcmService'

export default class GcmsController {
  public async create({ request, response }: HttpContextContract) {
    const dados_pessoais_dto = await request.validate(CreateDadosPessoaisValidator)
    const bairro_dto = await request.validate(CreateBairroValidator)
    const endereco_dto = await request.validate(CreateEnderecoValidator)
    const gcm_dto = await request.validate(CreateGcmValidator)

    // -> create endereco
    const bairro_id = await CreateBairroService.execute(bairro_dto)
    const endereco_id = await CreateEnderecoService.execute({
      logradouro: endereco_dto.logradouro,
      numero: endereco_dto.numero,
      complemento: endereco_dto.complemento,
      cep: endereco_dto.cep,
      bairro_id: bairro_id,
    })

    // -> create dados pessoais
    const dados_pessoais_id = await CreateDadosPessoaisService.execute(dados_pessoais_dto)

    // -> create gcm
    const gcm = await CreateGcmService.execute({
      nome_guerra: gcm_dto.nome_guerra,
      dados_pessoais_id,
      endereco_id,
      atribuicao: gcm_dto.atribuicao,
    })

    return response.json(gcm)
  }
}
