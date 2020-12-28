import Endereco from 'App/Models/Endereco/Enderecos'
import NotFoundException from 'App/Exceptions/NotFoundException'
import ConflictException from 'App/Exceptions/ConflictException'
import Bairro from 'App/Models/Endereco/Bairro'
import AppException from 'App/Exceptions/AppException'

interface IRequestData {
  endereco_id: string
  logradouro?: string
  complemento?: string
  cep?: string
  codigo_endereco?: string
  bairros_id: string
}

class UpdateEnderecoService {
  public async execute({
    endereco_id,
    logradouro,
    complemento,
    cep,
    codigo_endereco,
    bairros_id,
  }: IRequestData) {
    const endereco_exists = await Endereco.findBy('id', endereco_id)
    if (!endereco_exists) {
      throw new NotFoundException('Error ao atualizar informações: endereço não encontrado.')
    }

    if (codigo_endereco) {
      const codigo_endereco_exists = await Endereco.findBy('codigo_endereco', codigo_endereco)
      if (codigo_endereco_exists) {
        throw new ConflictException(
          'Error ao atualizar informações: codigo do endereço já existente.'
        )
      }
    }

    const bairro = await Bairro.findBy('id', bairros_id)
    if (!bairro) {
      throw new NotFoundException('Error ao atualizar informações: bairro não encontrado.')
    }

    endereco_exists.merge({ logradouro, complemento, cep, codigo_endereco, bairro_id: bairro.id })

    try {
      await endereco_exists.save()

      return endereco_exists.id
    } catch (error) {
      throw new AppException(`Error ao atualizar informações: ${error}.`)
    }
  }
}

export default new UpdateEnderecoService()
