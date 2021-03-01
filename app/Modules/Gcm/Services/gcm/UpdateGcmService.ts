import { inject, injectable } from 'tsyringe'

import { IDadosPessoaisRepository, IGcmsRepository } from 'App/Modules/Gcm/Interfaces'
import { IEnderecosRepository } from 'App/Modules/Endereco/Interfaces'
import { atribuicao } from 'App/Modules/Gcm/Models/types/EnumTypes'

import AppException from 'App/Shared/Exceptions/AppException'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

interface IRequestData {
  gcm_id: string
  nome_guerra?: string
  dados_pessoais_id: string
  endereco_id: string
  atribuicao?: atribuicao
  historico?: string
  status?: boolean
}

@injectable()
export class UpdateGcmService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,

    @inject('DadosPessoaisRepository')
    private dadosPessoaisRepository: IDadosPessoaisRepository,

    @inject('EnderecosRepository')
    private enderecosRepository: IEnderecosRepository
  ) {}

  public async execute({
    gcm_id,
    nome_guerra,
    dados_pessoais_id,
    endereco_id,
    atribuicao,
    historico,
    status,
  }: IRequestData) {
    const gcm_exists = await this.gcmsRepository.findById(gcm_id)
    if (!gcm_exists) {
      throw new NotFoundException('Erro ao atualizar informações: gcm não encontrado.')
    }

    const dados_pessoais_exists = await this.dadosPessoaisRepository.findById(dados_pessoais_id)
    if (!dados_pessoais_exists) {
      throw new NotFoundException('Erro ao atualizar informações: dados pessoais não encontrado.')
    }

    const endereco_exists = await this.enderecosRepository.findById(endereco_id)
    if (!endereco_exists) {
      throw new NotFoundException('Erro ao atualizar informações: endereco não encontrado.')
    }

    gcm_exists.merge({
      nome_guerra,
      dados_pessoais_id: dados_pessoais_exists.id,
      endereco_id: endereco_exists.id,
      atribuicao,
      historico,
      status,
    })

    try {
      await this.gcmsRepository.update(gcm_exists)

      return gcm_exists.id
    } catch (error) {
      throw new AppException(`Erro ao atualizar informações: ${error}.`)
    }
  }
}
