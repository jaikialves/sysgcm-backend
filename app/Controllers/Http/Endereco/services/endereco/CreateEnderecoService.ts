import Bairro from 'App/Models/Endereco/Bairro'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Endereco from 'App/Models/Endereco/Enderecos'
import AppException from 'App/Exceptions/AppException'

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
  }: IRequestData): Promise<string> {
    // -> find and check bairro exist
    const bairro = await Bairro.findBy('id', bairro_id)
    if (!bairro) {
      throw new NotFoundException('Erro ao criar endereço: bairro não encontrado.')
    }

    try {
      const endereco = await Endereco.create({
        logradouro,
        numero,
        complemento,
        cep,
        codigo_endereco,
        bairro_id: bairro.id,
      })

      return endereco.id
    } catch (error) {
      throw new AppException('Erro ao criar endereço, tente novamente mais tarde.')
    }
  }
}

export default new CreateEnderecoService()
