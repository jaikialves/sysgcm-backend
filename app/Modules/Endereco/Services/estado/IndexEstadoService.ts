import Estado from 'App/Modules/Endereco/Models/Estado'
import AppException from 'App/Shared/Exceptions/AppException'

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
