import Gcm from 'App/Modules/Gcm/Models/Gcm'
import AppException from 'App/Shared/Exceptions/AppException'

class IndexGcmService {
  public async execute(search: string) {
    try {
      return await Gcm.query()
        .apply((scopes) => {
          scopes.scopeSearchQuery(search)
        })
        .where('status', true)
        .preload('dados_pessoais', (query) => {
          query.preload('municipio_nascimento')
        })
        .preload('endereco', (query) => {
          query.preload('bairro', (query) => {
            query.preload('municipio', (query) => {
              query.preload('estado')
            })
          })
        })
    } catch (error) {
      throw new AppException(`Erro ao processar dados, tente novamente mais tarde. ${error}`)
    }
  }
}

export default new IndexGcmService()
