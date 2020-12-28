import Gcm from 'App/Models/Gcm/Gcm'
import AppException from 'App/Exceptions/AppException'

class IndexGcmService {
  public async execute() {
    try {
      return await Gcm.query()
        .where('status', true)
        .preload('dados_pessoais')
        .preload('endereco', (query) => {
          query.preload('bairro', (query) => {
            query.preload('municipio', (query) => {
              query.preload('estado')
            })
          })
        })
    } catch (error) {
      throw new AppException('Erro ao processar dados, tente novamente mais tarde.')
    }
  }
}

export default new IndexGcmService()
