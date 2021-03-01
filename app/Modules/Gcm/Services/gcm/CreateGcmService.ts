import { inject, injectable } from 'tsyringe'

import { atribuicao } from 'App/Modules/Gcm/Models/types/EnumTypes'
import { IDadosPessoaisRepository } from 'App/Modules/Gcm/Interfaces'
import { IEnderecosRepository } from 'App/Modules/Endereco/Interfaces'
import { IGcmsRepository } from 'App/Modules/Gcm/Interfaces/IGcmsRepository'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

interface IRequestData {
  nome_guerra: string
  dados_pessoais_id: string
  endereco_id: string
  atribuicao: atribuicao
}

@injectable()
export class CreateGcmService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,

    @inject('DadosPessoaisRepository')
    private dadosPessoaisRepository: IDadosPessoaisRepository,

    @inject('EnderecosRepository')
    private enderecosRepository: IEnderecosRepository
  ) {}

  public async execute({
    nome_guerra,
    dados_pessoais_id,
    endereco_id,
    atribuicao,
  }: IRequestData): Promise<string> {
    // -> check endereco exists
    const endereco_exists = await this.enderecosRepository.findById(endereco_id)
    if (!endereco_exists) {
      throw new NotFoundException('Erro no cadastro: Endereço não encontrado.')
    }

    // -> check dados pessoais exists
    const dados_pessoais_exists = await this.dadosPessoaisRepository.findById(dados_pessoais_id)
    if (!dados_pessoais_exists) {
      throw new NotFoundException('Erro no cadastro: Dados Pessoais não encontrado.')
    }

    const gcm = await this.gcmsRepository.create({
      nome_guerra: nome_guerra,
      dados_pessoais_id: dados_pessoais_exists.id,
      endereco_id: endereco_exists.id,
      atribuicao: atribuicao,
    })

    return gcm.id
  }
}
