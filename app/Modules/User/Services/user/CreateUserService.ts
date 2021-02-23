import { inject, injectable } from 'tsyringe'

import IGcmsRepository from 'App/Modules/Gcm/Interfaces/IGcmsRepository'
import IRolesRepository from 'App/Modules/User/Interfaces/IRolesRepository'
import IUsersRepository from 'App/Modules/User/Interfaces/IUsersRepository'
import IKeycodesRepository from 'App/Modules/User/Interfaces/IKeycodesRepository'

import AppException from 'App/Shared/Exceptions/AppException'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

interface IRequestData {
  nome_usuario: string
  email: string
  password: string
  keycode: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,

    @inject('KeycodesRepository')
    private keycodesRepository: IKeycodesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('KeycodesRepository')
    private rolesRepository: IRolesRepository
  ) {}

  public async execute({ nome_usuario, email, password, keycode }: IRequestData) {
    const keycode_exists = await this.keycodesRepository.findByKeycode(keycode)
    if (!keycode_exists) {
      throw new NotFoundException('Erro ao criar usuário: chave de acesso não encontrada.')
    }

    // -> check keycode is valid
    if (!keycode_exists.active) {
      throw new AppException('Erro ao criar usuário: chave de acesso já utilizada.')
    }

    const gcm = await this.gcmsRepository.findById(keycode_exists.gcm_id)
    if (!gcm) {
      throw new NotFoundException('Erro ao criar usuário: Gcm não encontrado.')
    }

    try {
      await this.keycodesRepository.revokeKeycode(keycode_exists)
    } catch (error) {
      throw new AppException('Erro ao criar usuário, tente novamente mais tarde.')
    }

    const role_exists = await this.rolesRepository.findByName(keycode_exists.role_name)
    if (!role_exists) {
      throw new NotFoundException('Erro ao criar usuário: role não encontrada.')
    }

    try {
      const user = await this.usersRepository.create({
        nome_usuario,
        email,
        password,
        gcm_id: gcm.id,
        role_id: role_exists.id,
      })
      await user.related('roles').attach([role_exists.id])

      return user.id
    } catch (error) {
      throw new AppException('Erro ao criar usuário, tente novamente mais tarde.')
    }
  }
}

export default CreateUserService
