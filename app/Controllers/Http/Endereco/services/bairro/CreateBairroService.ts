import Municipio from 'App/Models/Endereco/Municipio'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Bairro from 'App/Models/Endereco/Bairro'
import AppException from 'App/Exceptions/AppException'

interface IRequestData {
  bairro: string
  observacao?: string
  codigo_bairro?: string
  municipio_id?: string
}

class CreateBairroService {
  public async execute({
    bairro,
    observacao,
    codigo_bairro,
    municipio_id,
  }: IRequestData): Promise<string> {
    if (codigo_bairro) {
      const bairro_exists = await Bairro.findBy('codigo_bairro', codigo_bairro)
      if (!bairro_exists) {
        const municipio_itarare = await Municipio.findBy('codigo_ibge', '3523206')
        if (!municipio_itarare) {
          throw new NotFoundException('Erro ao criar bairro: municipio itararé não encontrado.')
        }

        const new_bairro = await CreateBairroService.createNewBairro({
          codigo_bairro,
          bairro,
          observacao,
          municipio_id: municipio_itarare.id,
        })

        return new_bairro.id
      }

      return bairro_exists.id
    }

    const new_bairro = await CreateBairroService.createNewBairro({
      codigo_bairro,
      bairro,
      observacao,
      municipio_id: await CreateBairroService.checkMunicipioExists(municipio_id),
    })

    return new_bairro.id
  }

  private static async createNewBairro({
    bairro,
    observacao,
    codigo_bairro,
    municipio_id,
  }: IRequestData): Promise<Bairro> {
    return await Bairro.create({
      codigo_bairro,
      bairro,
      observacao,
      municipio_id,
    })
  }

  private static async checkMunicipioExists(municipio_id?: string) {
    if (!municipio_id) {
      throw new AppException('O parâmetro municipio_id deve ser passado.')
    }

    const municipio_exists = await Municipio.findBy('id', municipio_id)
    if (!municipio_exists) {
      throw new NotFoundException('Municipio não encontrado.')
    }

    return municipio_exists.id
  }
}

export default new CreateBairroService()
