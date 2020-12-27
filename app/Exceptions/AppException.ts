import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AppException extends Exception {
  constructor(message: string, status_code = 400) {
    super(message, status_code)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).json(this.message)
  }
}
