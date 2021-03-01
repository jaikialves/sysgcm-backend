import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from 'App/Modules/User/Interfaces'

import AppException from 'App/Shared/Exceptions/AppException'

interface IRequest {
  user_id: string
  nome_usuario: string
  email: string
  password: string
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, nome_usuario, email, password }: IRequest) {
    const user = await this.usersRepository.findById(user_id)
    if (!user) {
      return new AppException('Erro ao atualizar usuário, tente novamente mais tarde')
    }

    user.merge({ nome_usuario, email, password })
    await this.usersRepository.update(user)

    return user
  }
}
