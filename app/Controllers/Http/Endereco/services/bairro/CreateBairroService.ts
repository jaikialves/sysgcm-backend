import Municipio from 'App/Models/Endereco/Municipio'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Bairro from 'App/Models/Endereco/Bairro'

interface IRequestData {
  codigo_bairro?: string
  nome: string
  observacao?: string
  municipio: string
}

class CreateBairroService {
  public async execute({ codigo_bairro, nome, observacao, municipio }: IRequestData) {
    // -> find and check municipio exists
    const check_municipio = await Municipio.findBy('municipio', municipio.toLocaleUpperCase())
    if (!check_municipio) {
      throw new NotFoundException('❌  Municipio não encontrado. 😓')
    }

    const bairro = await Bairro.create({
      codigo_bairro,
      nome,
      observacao,
      municipio_id: check_municipio.id,
    })

    return bairro.id
  }
}

export default new CreateBairroService()
