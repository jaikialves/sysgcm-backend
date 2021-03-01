import { container } from 'tsyringe'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ShowUserService, CreateUserService, UpdateUserService } from 'App/Modules/User/Services'
import { CreateUserValidator, UpdateUserValidator } from 'App/Modules/User/Validators'

import { uuidUserHandler } from 'App/Shared/Validators'

export default class UsersController {
  public async index(): Promise<void> {}

  public async show({ request, response, auth }: HttpContextContract): Promise<void> {
    const { id } = request.params()
    const auth_id = auth.user?.id

    await uuidUserHandler(id || auth_id)

    const showUser = container.resolve(ShowUserService)
    const user = await showUser.execute(id || auth_id)

    return response.json(user)
  }

  public async create({ request, response }: HttpContextContract): Promise<void> {
    const user_dto = await request.validate(CreateUserValidator)

    const createUser = container.resolve(CreateUserService)
    const user = await createUser.execute({
      nome_usuario: user_dto.nome_usuario.toLocaleLowerCase(),
      email: user_dto.email,
      password: user_dto.password,
      keycode: user_dto.keycode.toUpperCase(),
    })

    return response.json(user)
  }

  public async update({ request, response, auth }: HttpContextContract): Promise<void> {
    const { id } = request.params()
    const auth_id = auth.user?.id

    await uuidUserHandler(id || auth_id)

    const user_dto = await request.validate(UpdateUserValidator)

    const createUser = container.resolve(UpdateUserService)
    const user = await createUser.execute({ user_id: id || auth_id, ...user_dto })

    return response.json(user)
  }

  public async delete() {}
}
