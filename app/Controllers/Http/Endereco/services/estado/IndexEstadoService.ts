import Estado from 'App/Models/Endereco/Estado'
import AppException from 'App/Exceptions/AppException'

class IndexEstadoService {
  public async execute(): Promise<Estado[]> {
    try {
      return await Estado.query().select('*').orderBy('uf', 'asc')
    } catch (error) {
      throw new AppException('Não foi possível listar os estados, tente novamente mais tarde. ')
    }
  }
}

export default new IndexEstadoService()
