import { injectable, inject } from 'tsyringe'

import Escala from 'App/Modules/Gcm/Models/Escala'

import AppException from 'App/Shared/Exceptions/AppException'
import { IUsersRepository } from 'App/Modules/User/Interfaces'

injectable()
export class IndexEscalaService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(user_id: string) {
    try {
      const user = await this.usersRepository.findById(user_id)

      if (!user) {
        return new AppException('Não foi possível listar as escalas, tente novamente mais tarde.')
      }

      return Escala.query().select('*').where('gcm_id', user.gcm_id)
    } catch (error) {
      throw new AppException('Não foi possível listar as escalas, tente novamente mais tarde.')
    }
  }
}
