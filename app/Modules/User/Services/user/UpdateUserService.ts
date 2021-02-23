import User from 'App/Modules/User/Models/User'
import AppException from 'App/Shared/Exceptions/AppException'

interface IRequest {
  user_id: string
  nome_usuario: string
  email: string
  password: string
}

class UpdateUserService {
  public async execute({ user_id, nome_usuario, email, password }: IRequest) {
    const user = await User.findBy('id', user_id)
    if (!user) {
      return new AppException('Erro ao atualizar usuário, tente novamente mais tarde')
    }

    user.merge({ nome_usuario, email, password })
    await user.save()

    return user
  }
}

export default new UpdateUserService()
