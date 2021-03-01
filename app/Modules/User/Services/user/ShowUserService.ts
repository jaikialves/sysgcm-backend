import { inject, injectable } from 'tsyringe'

import AppException from 'App/Shared/Exceptions/AppException'

import { IUsersRepository } from 'App/Modules/User/Interfaces'

@injectable()
export class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(user_id: string) {
    if (!user_id) {
      throw new AppException('Erro ao mostar usuário, o parâmetro incorreto.')
    }

    try {
      return await this.usersRepository.show(user_id)
    } catch (error) {
      console.log(error)
      throw new AppException('Erro ao mostar usuário, tente novamente mais tarde.')
    }
  }
}
