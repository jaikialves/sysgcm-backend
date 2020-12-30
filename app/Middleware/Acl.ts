import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthorizationException from 'App/Exceptions/AuthorizationException'

export default class Acl {
  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    allowed_roles: string[]
  ) {
    if (Array.isArray(allowed_roles) === false) {
      throw new AuthorizationException('Usuário não permitindo')
    }

    const user = await auth.authenticate()
    await user.preload('roles')
    const roles = user.roles.map((role) => {
      return role.role
    })

    // -> check role
    for (const roleName of allowed_roles) {
      if (roles.includes(roleName)) {
        await next()
        return
      }
    }

    throw new AuthorizationException('Usuário não permitindo')
  }
}
