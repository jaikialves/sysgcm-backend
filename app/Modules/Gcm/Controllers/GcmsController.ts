import { container } from 'tsyringe'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validator from 'validator'
import isUUID = validator.isUUID

import Gcm from 'App/Modules/Gcm/Models/Gcm'

import {
  CreateDadosPessoaisValidator,
  UpdateDadosPessoaisValidator,
  CreateGcmValidator,
  UpdateGcmValidator,
} from 'App/Modules/Gcm/Validators'

import {
  IndexGcmService,
  ShowGcmService,
  CreateGcmService,
  UpdateGcmService,
  DeleteGcmService,
} from 'App/Modules/Gcm/Services'

import CreateBairroService from 'App/Modules/Endereco/Services/bairro/CreateBairroService'
import CreateEnderecoService from '../../Endereco/Services/endereco/CreateEnderecoService'
import CreateDadosPessoaisService from '../Services/dados_pessoais/CreateDadosPessoaisService'

import CreateKeycodeService from 'App/Modules/User/Services/keycode/CreateKeycodeService'
import UpdateBairroService from 'App/Modules/Endereco/Services/bairro/UpdateBairroService'
import UpdateEnderecoService from 'App/Modules/Endereco/Services/endereco/UpdateEnderecoService'
import UpdateDadosPessoaisService from 'App/Modules/Gcm/Services/dados_pessoais/UpdateDadosPessoaisService'

import CreateGcmBairroValidator from 'App/Modules/Endereco/Validators/bairro/CreateGcmBairroValidator'
import CreateGcmEnderecoValidator from 'App/Modules/Endereco/Validators/endereco/CreateGcmEnderecoValidator'

import UpdateEnderecoValidator from 'App/Modules/Endereco/Validators/endereco/UpdateEnderecoValidator'

import AppException from 'App/Shared/Exceptions/AppException'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import UpdateGcmBairroValidator from 'App/Modules/Endereco/Validators/bairro/UpdateGcmBairroValidator'

export default class GcmsController {
  public async index({ request, response }: HttpContextContract) {
    const search = request.input('search', '')

    const indexGcms = container.resolve(IndexGcmService)
    const gcms = await indexGcms.execute(search)

    return response.json(gcms)
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao processar informações: parâmetro incorreto.')
    }

    const showGcm = container.resolve(ShowGcmService)
    const gcm = await showGcm.execute(id)

    return response.json(gcm)
  }

  public async create({ request, response }: HttpContextContract) {
    const dados_pessoais_dto = await request.validate(CreateDadosPessoaisValidator)
    const bairro_dto = await request.validate(CreateGcmBairroValidator)
    const endereco_dto = await request.validate(CreateGcmEnderecoValidator)
    const gcm_dto = await request.validate(CreateGcmValidator)
    const role_name = request.input('role_name')

    // -> create endereco
    const bairro_id = await CreateBairroService.executeForGcm(bairro_dto)
    const endereco_id = await CreateEnderecoService.executeForGcm({
      logradouro: endereco_dto.logradouro,
      numero: endereco_dto.numero,
      complemento: endereco_dto.complemento,
      cep: endereco_dto.cep,
      bairro_id: bairro_id,
    })

    // -> create dados pessoais
    const dados_pessoais_id = await CreateDadosPessoaisService.execute(dados_pessoais_dto)

    const createGcm = container.resolve(CreateGcmService)
    const gcm_id = await createGcm.execute({
      nome_guerra: gcm_dto.nome_guerra,
      dados_pessoais_id,
      endereco_id,
      atribuicao: gcm_dto.atribuicao,
    })

    const createKeycode = container.resolve(CreateKeycodeService)
    const keycode = await createKeycode.execute({ gcm_id, role_name })

    return response.json({ keycode })
  }

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

    const bairro_dto = await request.validate(UpdateGcmBairroValidator)
    const endereco_dto = await request.validate(UpdateEnderecoValidator)
    const dados_pessoais_dto = await request.validate(UpdateDadosPessoaisValidator)
    const gcm_dto = await request.validate(UpdateGcmValidator)

    // -> update bairro
    const bairro_id = await UpdateBairroService.executeForGcm({
      bairro_id: gcm_exists.endereco.bairro_id,
      bairro: bairro_dto.bairro,
      codigo_bairro: bairro_dto.codigo_bairro,
      municipio_id: bairro_dto.municipio_id,
    })

    // -> update endereco
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
    const updateGcm = container.resolve(UpdateGcmService)
    const gcm_id = await updateGcm.execute({
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

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao processar informações: parâmetro incorreto.')
    }

    const deleteGcm = container.resolve(DeleteGcmService)
    await deleteGcm.execute(id)

    return response.json('Gcm deletado com sucesso.')
  }
}
