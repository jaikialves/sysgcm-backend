import Gcm from 'App/Modules/Gcm/Models/Gcm'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

class ShowGcmService {
  public async execute(gcm_id: string) {
    const gcm_exists = await Gcm.query()
      .where('id', gcm_id)
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
      .first()

    if (!gcm_exists) {
      throw new NotFoundException('Gcm não encontrado')
    }

    return gcm_exists
  }
}

export default new ShowGcmService()
