import Escala from 'App/Modules/Gcm/Models/Escala'
import User from 'App/Modules/User/Models/User'
import AppException from 'App/Shared/Exceptions/AppException'

class IndexEscalaService {
  public async execute(user_id: string) {
    try {
      const user = await User.findBy('id', user_id)

      if (!user) {
        return new AppException('Não foi possível listar as escalas, tente novamente mais tarde.')
      }

      return Escala.query().select('*').where('gcm_id', user.gcm_id)
    } catch (error) {
      throw new AppException('Não foi possível listar as escalas, tente novamente mais tarde.')
    }
  }
}

export default new IndexEscalaService()
