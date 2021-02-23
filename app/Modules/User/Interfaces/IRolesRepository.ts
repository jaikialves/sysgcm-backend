import Role from 'App/Modules/User/Models/Role'

export default interface IRolesRepository {
  findByName(role_name: string): Promise<Role | null>
}
