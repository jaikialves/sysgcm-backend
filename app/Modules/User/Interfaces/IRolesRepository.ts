import Role from 'App/Modules/User/Models/Role'

export interface IRolesRepository {
  findByName(role_name: string): Promise<Role | null>
}
