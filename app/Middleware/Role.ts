import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { roles } from 'App/Models/Gcm/types/EnumTypes'

export default class Role {
  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    allowed_roles: string[]
  ) {
    if (Array.isArray(allowed_roles) === false) {
      throw new AuthenticationException('Usuário não permitindo', '401')
    }

    const user = await auth.authenticate()



    await next()
  }
}
