import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthorizationException extends Exception {
  constructor(message: string) {
    super(message, 401)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).json(this.message)
  }
}
