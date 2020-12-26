import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gcm from 'App/Models/Gcm/Gcm'

export default class TestsController {
  public async index({ response }: HttpContextContract) {
    const gcm_test = await Gcm.query()
      .where('id', '4c6fa9e7-9532-4f40-9498-97a1ef47bbff')
      .preload('dados_pessoais')
      .preload('endereco')
      .firstOrFail()

    return response.json(gcm_test)
  }
}
