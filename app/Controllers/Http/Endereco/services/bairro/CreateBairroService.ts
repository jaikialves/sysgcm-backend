import Municipio from 'App/Models/Endereco/Municipio'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Bairro from 'App/Models/Endereco/Bairro'

interface IRequestData {
  bairro: string
  observacao?: string
  codigo_bairro?: string
  municipio_id: string
}

class CreateBairroService {
  public async execute({ bairro, observacao, codigo_bairro, municipio_id }: IRequestData) {
    // -> find and check municipio exists
    const check_municipio = await Municipio.findBy('id', municipio_id)
    if (!check_municipio) {
      throw new NotFoundException('❌  Municipio não encontrado. 😓')
    }

    const new_bairro = await Bairro.create({
      codigo_bairro,
      bairro,
      observacao,
      municipio_id: check_municipio.id,
    })

    return new_bairro.id
  }
}

export default new CreateBairroService()
