import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validator from 'validator'
import isUUID = validator.isUUID

import ShowUserService from 'App/Modules/User/Services/user/ShowUserService'
import CreateUserService from 'App/Modules/User/Services/user/CreateUserService'
import UpdateUserService from 'App/Modules/User/Services/user/UpdateUserService'

import CreateUserValidator from 'App/Modules/User/Validators/user/CreateUserValidator'
import UpdateUserValidator from 'App/Modules/User/Validators/user/UpdateUserValidator'

import AppException from 'App/Shared/Exceptions/AppException'

export default class UsersController {
  public async index() {}

  public async show({ request, response, auth }: HttpContextContract): Promise<void> {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao atualizar informações: parâmetro incorreto.')
    }

    const auth_id = auth.user?.id
    const user = await ShowUserService.execute(id || auth_id)

    return response.json(user)
  }

  public async create({ request, response }: HttpContextContract): Promise<void> {
    const user_dto = await request.validate(CreateUserValidator)

    const user = await CreateUserService.execute({
      nome_usuario: user_dto.nome_usuario.toLocaleLowerCase(),
      email: user_dto.email,
      password: user_dto.password,
      keycode: user_dto.keycode.toUpperCase(),
    })

    return response.json(user)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const { id } = request.params()
    if (!isUUID(id, 4)) {
      throw new AppException('Erro ao atualizar informações: parâmetro incorreto.')
    }

    const auth_id = auth.user?.id
    const user_dto = await request.validate(UpdateUserValidator)

    const user = await UpdateUserService.execute({ user_id: id || auth_id, ...user_dto })

    return response.json(user)
  }

  public async delete() {}
}
