import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConflictException extends Exception {
  constructor(message: string) {
    super(message, 409)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).json({ message: this.message })
  }
}
