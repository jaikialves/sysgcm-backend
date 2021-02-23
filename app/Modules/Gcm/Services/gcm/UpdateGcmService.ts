import { atribuicao } from 'App/Modules/Gcm/Models/types/EnumTypes'

import Gcm from 'App/Modules/Gcm/Models/Gcm'
import DadosPessoais from 'App/Modules/Gcm/Models/DadosPessoais'
import Endereco from 'App/Modules/Endereco/Models/Enderecos'

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

class UpdateGcmService {
  public async execute({
    gcm_id,
    nome_guerra,
    dados_pessoais_id,
    endereco_id,
    atribuicao,
    historico,
    status,
  }: IRequestData) {
    const gcm_exists = await Gcm.findBy('id', gcm_id)
    if (!gcm_exists) {
      throw new NotFoundException('Erro ao atualizar informações: gcm não encontrado.')
    }

    const dados_pessoais_exists = await DadosPessoais.findBy('id', dados_pessoais_id)
    if (!dados_pessoais_exists) {
      throw new NotFoundException('Erro ao atualizar informações: dados pessoais não encontrado.')
    }

    const endereco_exists = await Endereco.findBy('id', endereco_id)
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
      await gcm_exists.save()

      return gcm_exists.id
    } catch (error) {
      throw new AppException(`Erro ao atualizar informações: ${error}.`)
    }
  }
}

export default new UpdateGcmService()
