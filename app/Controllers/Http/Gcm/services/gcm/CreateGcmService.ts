import { atribuicao } from 'App/Models/Gcm/types/EnumTypes'
import Endereco from 'App/Models/Endereco/Enderecos'
import NotFoundException from 'App/Exceptions/NotFoundException'
import DadosPessoais from 'App/Models/Gcm/DadosPessoais'
import Gcm from 'App/Models/Gcm/Gcm'

interface IRequestData {
  nome_guerra: string
  dados_pessoais_id: string
  endereco_id: string
  atribuicao: atribuicao
}

class CreateGcmService {
  public async execute({ nome_guerra, dados_pessoais_id, endereco_id, atribuicao }: IRequestData) {
    // -> check endereco exists
    const endereco_exists = await Endereco.findBy('id', endereco_id)
    if (!endereco_exists) {
      throw new NotFoundException('Erro no cadastro: Endereço não encontrado.')
    }

    // -> check dados pessoais exists
    const dados_pessoais_exists = await DadosPessoais.findBy('id', dados_pessoais_id)
    if (!dados_pessoais_exists) {
      throw new NotFoundException('Erro no cadastro: Dados Pessoais não encontrado.')
    }

    const gcm = await Gcm.create({
      nome_guerra,
      dados_pessoais_id: dados_pessoais_exists.id,
      endereco_id: endereco_exists.id,
      atribuicao,
    })

    return gcm.id
  }
}

export default new CreateGcmService()
