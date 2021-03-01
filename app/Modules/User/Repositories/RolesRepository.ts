import { IRolesRepository } from 'App/Modules/User/Interfaces/IRolesRepository'
import Role from 'App/Modules/User/Models/Role'

export class RolesRepository implements IRolesRepository {
  public async findByName(role_name: string): Promise<Role | null> {
    return await Role.findBy('name', role_name)
  }
}
