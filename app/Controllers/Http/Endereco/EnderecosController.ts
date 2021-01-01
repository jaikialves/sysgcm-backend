import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EnderecosController {
  public async index() {}

  public async show() {}

  //* -> CREATE
  public async create({ request, response }: HttpContextContract): Promise<void> {
    const endereco_dto = await request.validate()
  }

  public async update() {}

  public async delete() {}
}
