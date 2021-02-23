import AppException from 'App/Shared/Exceptions/AppException'
import User from 'App/Modules/User/Models/User'

class ShowUserService {
  public async execute(user_id: string) {
    try {
      return await User.query()
        .where('id', user_id)
        .whereNot('status', false)
        .preload('gcm', (query) => {
          query
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
        })
    } catch (error) {
      console.log(error)
      throw new AppException('Erro ao mostar usuário, tente novamente mais tarde.')
    }
  }
}

export default new ShowUserService()
