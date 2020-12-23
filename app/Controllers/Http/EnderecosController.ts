// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from '@adonisjs/core/build/standalone'

export default class EnderecosController {
  public async index() {
    return [{ msg: 'TEST' }]
  }

  public async store({ request }: HttpContext) {
    const { test } = request.all()
    console.log(test)
  }
}
