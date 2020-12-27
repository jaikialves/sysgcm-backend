import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/user/CreateUserValidator'
import CreateUserService from 'App/Controllers/Http/User/services/user/CreateUserService'

export default class UsersController {
  public async index() {}

  public async show() {}

  public async create({ request, response }: HttpContextContract) {
    const user_dto = await request.validate(CreateUserValidator)

    const user = await CreateUserService.execute({
      nome_usuario: user_dto.nome_usuario.toLocaleLowerCase(),
      email: user_dto.email,
      password: user_dto.password,
      keycode: user_dto.keycode.toUpperCase(),
    })

    return response.json(user)
  }

  public async update() {}

  public async delete() {}
}
