import Municipio from 'App/Models/Endereco/Municipio'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Bairro from 'App/Models/Endereco/Bairro'

interface IRequestData {
  bairro: string
  observacao: string
  codigo_bairro?: string
  municipio_id: string
}

class CreateBairroService {
  public async execute({ bairro, observacao, codigo_bairro, municipio_id }: IRequestData) {
    if (codigo_bairro) {
      const bairro_exists = await Bairro.findBy('codigo_bairro', codigo_bairro)
      if (!bairro_exists) {
        return await CreateBairroService.createNewBairro({
          codigo_bairro,
          bairro,
          observacao,
          municipio_id: await CreateBairroService.checkMunicipioExists(municipio_id),
        })
      }

      return bairro_exists.id
    } else {
      const new_bairro = await CreateBairroService.createNewBairro({
        codigo_bairro,
        bairro,
        observacao,
        municipio_id: await CreateBairroService.checkMunicipioExists(municipio_id),
      })

      return new_bairro.id
    }
  }

  private static async createNewBairro({
    bairro,
    observacao,
    codigo_bairro,
    municipio_id,
  }: IRequestData) {
    return await Bairro.create({
      codigo_bairro,
      bairro,
      observacao,
      municipio_id,
    })
  }

  private static async checkMunicipioExists(municipio_id: string) {
    const municipio_exists = await Municipio.findBy('id', municipio_id)
    if (!municipio_exists) {
      throw new NotFoundException('Municipio não encontrado.')
    }

    return municipio_exists.id
  }
}

export default new CreateBairroService()
