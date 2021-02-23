import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Modules/User/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    try {
      await Role.create({
        role: 'root',
        name: 'ROOT',
        description: 'Tem todas as permissões do sistema.',
      })

      await Role.create({
        role: 'admin',
        name: 'ADMIN',
        description: 'Administrador do sistema.',
      })

      await Role.create({
        role: 'user',
        name: 'USER',
        description: 'Usuário do sistema.',
      })
    } catch (error) {
      console.log(`❌  Não foi possível criar as roles: ${error}`)
    }
  }
}
