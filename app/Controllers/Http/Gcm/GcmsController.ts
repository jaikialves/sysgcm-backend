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
import Gcm from 'App/Models/Gcm/Gcm'
import AppException from 'App/Exceptions/AppException'
import NotFoundException from 'App/Exceptions/NotFoundException'

import IndexGcmService from './services/gcm/IndexGcmService'
import ShowGcmService from 'App/Controllers/Http/Gcm/services/gcm/ShowGcmService'
import CreateBairroService from 'App/Controllers/Http/Endereco/services/bairro/CreateBairroService'
import CreateEnderecoService from '../Endereco/services/endereco/CreateEnderecoService'
import CreateDadosPessoaisService from './services/dados_pessoais/CreateDadosPessoaisService'
import CreateGcmService from 'App/Controllers/Http/Gcm/services/gcm/CreateGcmService'
import CreateKeycodeService from 'App/Controllers/Http/User/services/keycode/CreateKeycodeService'
import UpdateBairroService from 'App/Controllers/Http/Endereco/services/bairro/UpdateBairroService'
import DeleteGcmService from 'App/Controllers/Http/Gcm/services/gcm/DeleteGcmService'
import UpdateEnderecoService from 'App/Controllers/Http/Endereco/services/endereco/UpdateEnderecoService'
import UpdateDadosPessoaisService from 'App/Controllers/Http/Gcm/services/dados_pessoais/UpdateDadosPessoaisService'
import UpdateGcmService from 'App/Controllers/Http/Gcm/services/gcm/UpdateGcmService'

export default class GcmsController {
  //* -> INDEX
  public async index({ request, response }: HttpContextContract) {
    const search = request.input('search', '')

    const gcms = await IndexGcmService.execute(search)
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
    const role_name = request.input('role_name')

    // -> create endereco
    const bairro_id = await CreateBairroService.executeForGcm(bairro_dto)
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
    const gcm_id = await CreateGcmService.execute({
      nome_guerra: gcm_dto.nome_guerra,
      dados_pessoais_id,
      endereco_id,
      atribuicao: gcm_dto.atribuicao,
    })

    // -> create keycode
    const keycode = await CreateKeycodeService.execute({ gcm_id, role_name })

    return response.json(keycode)
  }

  //* -> UPDATE
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao atualizar informações: parâmetro incorreto.')
    }

    const gcm_exists = await Gcm.query()
      .where('id', id)
      .where('status', true)
      .preload('dados_pessoais')
      .preload('endereco', (query) => {
        query.preload('bairro', (query) => {
          query.preload('municipio', (query) => {
            query.preload('estado')
          })
        })
      })
      .first()

    if (!gcm_exists) {
      throw new NotFoundException('Erro ao atualizar informações: gcm não encontrado.')
    }

    const bairro_dto = await request.validate(UpdateBairroValidator)
    const endereco_dto = await request.validate(UpdateEnderecoValidator)
    const dados_pessoais_dto = await request.validate(UpdateDadosPessoaisValidator)
    const gcm_dto = await request.validate(UpdateGcmValidator)

    // -> update endereco
    const bairro_id = await UpdateBairroService.execute({
      bairro_id: gcm_exists.endereco.bairro_id,
      bairro: bairro_dto.bairro,
      codigo_bairro: bairro_dto.codigo_bairro,
      observacao: bairro_dto.observacao_bairro,
      municipio_id: bairro_dto.municipio_id,
    })

    const endereco_id = await UpdateEnderecoService.execute({
      endereco_id: gcm_exists.endereco_id,
      logradouro: endereco_dto.logradouro,
      complemento: endereco_dto.complemento,
      cep: endereco_dto.cep,
      codigo_endereco: endereco_dto.codigo_endereco,
      bairros_id: bairro_id,
    })

    // -> update dados pessoais
    const dados_pessoais_id = await UpdateDadosPessoaisService.execute({
      dados_pessoais_id: gcm_exists.dados_pessoais_id,
      nome: dados_pessoais_dto.nome,
      rg: dados_pessoais_dto.rg,
      cpf: dados_pessoais_dto.cpf,
      data_nascimento: dados_pessoais_dto.data_nascimento,
      telefone: dados_pessoais_dto.telefone,
      nome_mae: dados_pessoais_dto.nome_mae,
      nome_pai: dados_pessoais_dto.nome_pai,
      municipio_nascimento_id: dados_pessoais_dto.municipio_nascimento_id,
      sexo: dados_pessoais_dto.sexo,
      cutis: dados_pessoais_dto.cutis,
      tipo_sanguineo: dados_pessoais_dto.tipo_sanguineo,
      estado_civil: dados_pessoais_dto.estado_civil,
      profissao: dados_pessoais_dto.profissao,
      escolaridade: dados_pessoais_dto.escolaridade,
      nome_conjuge: dados_pessoais_dto.nome_conjuge,
      titulo_eleitor: dados_pessoais_dto.titulo_eleitor,
      zona_eleitoral: dados_pessoais_dto.zona_eleitoral,
      cnh: dados_pessoais_dto.cnh,
      tipo_cnh: dados_pessoais_dto.tipo_cnh,
      validade_cnh: dados_pessoais_dto.validade_cnh,
      observacao: dados_pessoais_dto.observacao,
    })

    // -> update gcm
    const gcm_id = await UpdateGcmService.execute({
      gcm_id: gcm_exists.id,
      nome_guerra: gcm_dto.nome_guerra,
      dados_pessoais_id,
      endereco_id,
      atribuicao: gcm_dto.atribuicao,
      historico: gcm_dto.historico,
      status: gcm_dto.status,
    })

    return response.json(gcm_id)
  }

  //* -> DELETE
  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao processar informações: parâmetro incorreto.')
    }

    await DeleteGcmService.execute(id)

    return response.json('Gcm deletado com sucesso.')
  }
}
