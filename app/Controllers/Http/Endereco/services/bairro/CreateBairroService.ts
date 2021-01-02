import Municipio from 'App/Models/Endereco/Municipio'
import Bairro from 'App/Models/Endereco/Bairro'

import AppException from 'App/Exceptions/AppException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import ConflictException from 'App/Exceptions/ConflictException'

interface IRequestBairroData {
  codigo_bairro: string
  bairro: string
  observacao?: string
}

interface IRequestGcmData {
  municipio_itarare: boolean
  codigo_bairro?: string
  bairro?: string
  municipio_id?: string
}

class CreateBairroService {
  public async executeForBairro({
    bairro,
    observacao,
    codigo_bairro,
  }: IRequestBairroData): Promise<string> {
    const municipio_itarare_exists = await Municipio.findBy('codigo_ibge', '3523206')
    if (!municipio_itarare_exists) {
      throw new NotFoundException('Erro ao cadastrar bairro: municipio não encontrado.')
    }

    const codigo_bairro_exists = await Bairro.findBy('codigo_bairro', codigo_bairro)
    if (codigo_bairro_exists) {
      throw new ConflictException('Erro ao cadastrar bairro: codigo do bairro já cadastrado.')
    }

    try {
      const new_bairro = await Bairro.create({
        bairro,
        codigo_bairro,
        observacao,
        municipio_id: municipio_itarare_exists.id,
      })

      return new_bairro.id
    } catch (error) {
      throw new AppException('Erro ao cadastrar informações, tente novamente mais tarde.')
    }
  }

  public async executeForGcm({
    municipio_itarare,
    codigo_bairro,
    bairro,
    municipio_id,
  }: IRequestGcmData): Promise<string> {
    if (municipio_itarare) {
      const bairro_exists = await Bairro.findBy('codigo_bairro', codigo_bairro)
      if (!bairro_exists) {
        throw new NotFoundException('Erro ao cadastrar gcm: bairro não encontrado.')
      }

      return bairro_exists.id
    }

    if (municipio_id) {
      const municipio_exists = await Municipio.findBy('id', municipio_id)
      if (!municipio_exists) {
        throw new NotFoundException('Erro ao cadastrar gcm: municipio não encontrado.')
      }
    }

    try {
      const new_bairro = await Bairro.create({
        bairro,
        municipio_id,
      })

      return new_bairro.id
    } catch (error) {
      throw new AppException('Erro ao cadastrar gcm, tente novamente mais tarde.')
    }
  }
}

export default new CreateBairroService()
