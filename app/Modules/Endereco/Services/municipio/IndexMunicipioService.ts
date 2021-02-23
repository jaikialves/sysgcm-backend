import Municipio from 'App/Modules/Endereco/Models/Municipio'
import AppException from 'App/Shared/Exceptions/AppException'

interface IRequestParams {
  page: number
  search: string
  state: string
}

class IndexMunicipioService {
  public async execute({ page, search, state }: IRequestParams): Promise<Municipio[]> {
    try {
      return await Municipio.query()
        .apply((scopes) => {
          scopes.scopeSearchQuery(search, state)
        })
        .preload('estado')
        .orderBy('municipio', 'asc')
        .paginate(page, 20)
    } catch (error) {
      throw new AppException('Não foi possível listar os municípios, tente novamente mais tarde. ')
    }
  }
}

export default new IndexMunicipioService()
