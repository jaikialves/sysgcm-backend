import Endereco from 'App/Models/Endereco/Enderecos'

import AppException from 'App/Exceptions/AppException'

class IndexEnderecoService {
  public async execute(search: string) {
    try {
      return await Endereco.query()
        .apply((scopes) => {
          scopes.scopeSearchQuery(search)
        })
        .whereNot({ codigo_endereco: null })
        .preload('bairro')
        .orderBy('codigo_endereco', 'asc')
    } catch (error) {
      throw new AppException('Erro ao listar endereços, tente novamente mais tarde.')
    }
  }
}

export default new IndexEnderecoService()
