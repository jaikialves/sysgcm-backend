import IUsersRepository from 'App/Modules/User/Interfaces/IUsersRepository'
import User from 'App/Modules/User/Models/User'
import ICreateUserDTO from 'App/Modules/User/DTOs/user/ICreateUserDTO'

export default class UsersRepository implements IUsersRepository {
  public async index(): Promise<User[]> {
    return await User.all()
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    return await User.create(data)
  }

  public async update(user: User): Promise<User> {
    return await user.save()
  }

  public async delete(user: User): Promise<User> {
    user.merge({ is_deleted: true })
    return user.save()
  }

  /*--------------------------------------------------------------------------*/

  public async findById(user_id: string): Promise<User | null> {
    return await User.findBy('id', user_id)
  }

  public async findByNomeUsuario(nome_usuario: string): Promise<User | null> {
    return await User.findBy('nome_usuario', nome_usuario)
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findBy('email', email)
  }
}
