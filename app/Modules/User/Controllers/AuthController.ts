import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AppException from 'App/Shared/Exceptions/AppException'
import ShowUserService from 'App/Modules/User/Services/user/ShowUserService'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const postsSchema = schema.create({
      email: schema.string({ trim: true }),
      password: schema.string({}, []),
    })

    const { email, password } = await request.validate({
      schema: postsSchema,
    })

    try {
      const token = await auth
        .use('api')
        .attempt(email, password, { expiresIn: '1 h', name: 'sysgcm' })

      if (!auth.user?.id) {
        return new AppException('Não foi possível fazer o login, tente mais tarte.')
      }

      const user = await ShowUserService.execute(auth.user.id)

      return response.json({ user: user, token: token.toJSON() })
    } catch (error) {
      console.log(error)
      throw new AppException(
        'Não foi possível fazer o login, verifique suas credenciais ou tente mais tarte.'
      )
    }
  }
}
