import Bairro from 'App/Models/Endereco/Bairro'
import NotFoundException from 'App/Exceptions/NotFoundException'
import AppException from 'App/Exceptions/AppException'
import Endereco from 'App/Models/Endereco/Enderecos'

class DeleteBairroService {
  public async execute(bairro_id: string): Promise<void> {
    const bairro = await Bairro.findBy('id', bairro_id)
    if (!bairro) {
      throw new NotFoundException('Erro ao excluir bairro: bairros não encontrado.')
    }

    const bairro_enderecos_exists = await Endereco.query()
      .select('id')
      .where('bairro_id', bairro_id)
    if (bairro_enderecos_exists.length !== 0) {
      throw new AppException('Erro ao excluir bairro: muitos endereço dependem desse bairro.')
    }

    try {
      await bairro.delete()
    } catch (error) {
      throw new AppException('Erro ao excluir bairro, tente novamente mais tarde.')
    }
  }
}

export default new DeleteBairroService()
