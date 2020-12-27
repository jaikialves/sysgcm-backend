import Gcm from 'App/Models/Gcm/Gcm'

import NotFoundException from 'App/Exceptions/NotFoundException'
import Keycode from 'App/Models/User/Keycode'

import crypto from 'crypto'

class CreateKeycodeService {
  public async execute(gcm_id: string) {
    // -> check gcm exists
    const gcm_exists = await Gcm.findBy('id', gcm_id)
    if (!gcm_exists) {
      throw new NotFoundException('❌  Error no cadastro: Gcm não encontrado. 😓')
    }

    const keycode = await Keycode.create({
      gcm_id,
      keycode: await this.generateUniqueKeycode(4),
    })

    return {
      gcm: gcm_exists,
      keycode: keycode.keycode,
    }
  }

  private async generateUniqueKeycode(size: number) {
    let key = crypto.randomBytes(size).toString('hex').toLocaleUpperCase()

    // -> check key exists
    const key_exists = await Keycode.findBy('keycode', key)
    if (key_exists) {
      key = await this.generateUniqueKeycode(size)
    }

    return key
  }
}

export default new CreateKeycodeService()
