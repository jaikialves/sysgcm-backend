import { atribuicao } from 'App/Models/Gcm/types/EnumTypes'
import Gcm from 'App/Models/Gcm/Gcm'
import NotFoundException from 'App/Exceptions/NotFoundException'
import DadosPessoais from 'App/Models/Gcm/DadosPessoais'
import Endereco from 'App/Models/Endereco/Enderecos'
import AppException from 'App/Exceptions/AppException'

interface IRequestData {
  gcm_id: string
  nome_guerra?: string
  dados_pessoais_id: string
  endereco_id: string
  atribuicao: atribuicao
  historico: string
  status: boolean
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
      throw new NotFoundException('Error ao atualizar informações: gcm não encontrado.')
    }

    const dados_pessoais_exists = await DadosPessoais.findBy('id', dados_pessoais_id)
    if (!dados_pessoais_exists) {
      throw new NotFoundException('Error ao atualizar informações: dados pessoais não encontrado.')
    }

    const endereco_exists = await Endereco.findBy('id', endereco_id)
    if (!endereco_exists) {
      throw new NotFoundException('Error ao atualizar informações: endereco não encontrado.')
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
      throw new AppException(`Error ao atualizar informações: ${error}.`)
    }
  }
}

export default new UpdateGcmService()
