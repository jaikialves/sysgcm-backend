import Gcm from 'App/Modules/Gcm/Models/Gcm'
import Keycode from 'App/Modules/User/Models/Keycode'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import crypto from 'crypto'
import Role from 'App/Modules/User/Models/Role'

interface IRequestData {
  gcm_id: string
  role_name: string
}

class CreateKeycodeService {
  public async execute({ gcm_id, role_name }: IRequestData) {
    // -> check gcm exists
    const gcm_exists = await Gcm.findBy('id', gcm_id)
    if (!gcm_exists) {
      throw new NotFoundException('Erro no cadastro: Gcm não encontrado.')
    }

    const role_exists = await Role.findBy('name', role_name)
    if (!role_exists) {
      throw new NotFoundException('Erro no cadastro: Role não encontrada.')
    }

    const keycode = await Keycode.create({
      gcm_id,
      keycode: await this.generateUniqueKeycode(4),
      role_name: role_exists.name,
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
