import User from 'App/Modules/User/Models/User'
import ICreateUserDTO from 'App/Modules/User/DTOs/user/ICreateUserDTO'

export default interface IUsersRepository {
  index(): Promise<User[]>
  create(data: ICreateUserDTO): Promise<User>
  update(user: User): Promise<User>
  delete(user: User): Promise<User>
  findById(user_id: string): Promise<User | null>
  findByNomeUsuario(username: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
