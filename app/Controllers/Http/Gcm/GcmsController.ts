import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validator from 'validator'
import isUUID = validator.isUUID

import CreateDadosPessoaisValidator from 'App/Validators/gcm/dados_pessoais/CreateDadosPessoaisValidator'
import CreateBairroValidator from 'App/Validators/endereco/bairro/CreateBairroValidator'
import CreateEnderecoValidator from 'App/Validators/endereco/endereco/CreateEnderecoValidator'
import CreateGcmValidator from 'App/Validators/gcm/gcm/CreateGcmValidator'
import UpdateDadosPessoaisValidator from 'App/Validators/gcm/dados_pessoais/UpdateDadosPessoaisValidator'
import UpdateBairroValidator from 'App/Validators/endereco/bairro/UpdateBairroValidator'
import UpdateEnderecoValidator from 'App/Validators/endereco/endereco/UpdateEnderecoValidator'
import UpdateGcmValidator from 'App/Validators/gcm/gcm/UpdateGcmValidator'

import IndexGcmService from 'App/Controllers/Http/Gcm/services/gcm/IndexGcmService'
import ShowGcmService from 'App/Controllers/Http/Gcm/services/gcm/ShowGcmService'
import CreateBairroService from 'App/Controllers/Http/Endereco/services/bairro/CreateBairroService'
import CreateEnderecoService from '../Endereco/services/endereco/CreateEnderecoService'
import CreateDadosPessoaisService from './services/dados_pessoais/CreateDadosPessoaisService'
import CreateGcmService from 'App/Controllers/Http/Gcm/services/gcm/CreateGcmService'
import CreateKeycodeService from 'App/Controllers/Http/User/services/keycode/CreateKeycodeService'
import UpdateBairroService from 'App/Controllers/Http/Endereco/services/bairro/UpdateBairroService'

import AppException from 'App/Exceptions/AppException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Gcm from 'App/Models/Gcm/Gcm'
import DeleteGcmService from 'App/Controllers/Http/Gcm/services/gcm/DeleteGcmService'

export default class GcmsController {
  //* -> INDEX
  public async index({ response }: HttpContextContract) {
    const gcms = await IndexGcmService.execute()
    return response.json(gcms)
  }

  //* -> SHOW
  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao processar informações: parâmetro incorreto.')
    }

    const gcm = await ShowGcmService.execute(id)

    return response.json(gcm)
  }

  //* -> CREATE
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

    console.log(new Date(dados_pessoais_dto.data_nascimento.toISODate()))

    // -> create dados pessoais
    const dados_pessoais_id = await CreateDadosPessoaisService.execute(dados_pessoais_dto)

    // -> create gcm
    const gcm_id = await CreateGcmService.execute({
      nome_guerra: gcm_dto.nome_guerra,
      dados_pessoais_id,
      endereco_id,
      atribuicao: gcm_dto.atribuicao,
    })

    // -> create keycode
    const keycode = await CreateKeycodeService.execute(gcm_id)

    return response.json(keycode)
  }

  //* -> UPDATE
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Error ao atualizar informações: parâmetro incorreto.')
    }

    const gcm_exists = await Gcm.findBy('id', id)
    if (!gcm_exists) {
      throw new NotFoundException('rror ao atualizar informações: gcm não encontrado.')
    }

    const bairro_dto = await request.validate(UpdateBairroValidator)
    const endereco_dto = await request.validate(UpdateEnderecoValidator)
    const dados_pessoais_dto = await request.validate(UpdateDadosPessoaisValidator)
    const gcm_dto = await request.validate(UpdateGcmValidator)

    // -> update endereco
    const bairro = await UpdateBairroService.execute({})

    // -> update dados pessoais

    // -> update gcm

    return response.json('')
  }

  //* -> DELETE
  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao processar informações: parâmetro incorreto.')
    }

    await DeleteGcmService.execute(id)

    return response.send('Gcm deletado com sucesso.')
  }
}
