import Bairro from 'App/Models/Endereco/Bairro'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Endereco from 'App/Models/Endereco/Enderecos'

interface IRequestData {
  logradouro: string
  numero?: string
  complemento?: string
  cep: string
  codigo_endereco?: string
  bairro_id: string
}

class CreateEnderecoService {
  public async execute({
    logradouro,
    numero,
    complemento,
    cep,
    codigo_endereco,
    bairro_id,
  }: IRequestData) {
    // -> find and check bairro exist
    const bairro = await Bairro.findBy('id', bairro_id)
    if (!bairro) {
      throw new NotFoundException('Erro ao criar endereço: bairro não encontrado.')
    }

    const endereco = await Endereco.create({
      logradouro,
      numero,
      complemento,
      cep,
      codigo_endereco,
      bairro_id: bairro.id,
    })

    return endereco.id
  }
}

export default new CreateEnderecoService()
