import Bairro from 'App/Models/Endereco/Bairro'
import NotFoundException from 'App/Exceptions/NotFoundException'
import AppException from 'App/Exceptions/AppException'
import ConflictException from 'App/Exceptions/ConflictException'

interface IRequestData {
  bairro_id: string
  bairro?: string
  codigo_bairro?: string
  observacao?: string
  municipio_id?: string
}

class UpdateBairroService {
  public async execute({
    bairro_id,
    bairro,
    codigo_bairro,
    observacao,
    municipio_id,
  }: IRequestData): Promise<string> {
    const bairro_exists = await Bairro.findBy('id', bairro_id)
    if (!bairro_exists) {
      throw new NotFoundException('Erro ao atualizar informações: Bairro não encontrado.')
    }

    // -> check codigo_bairros exists
    if (codigo_bairro) {
      const codigo_bairro_exists = await Bairro.findBy('codigo_bairro', codigo_bairro)
      if (codigo_bairro_exists) {
        throw new ConflictException('Erro ao atualizar informações: codigo do bairro já existente.')
      }
    }

    bairro_exists.merge({
      bairro,
      codigo_bairro,
      observacao,
      municipio_id,
    })

    try {
      await bairro_exists.save()

      return bairro_exists.id
    } catch (error) {
      throw new AppException(`Erro ao atualizar informações: ${error}.`)
    }
  }
}

export default new UpdateBairroService()
