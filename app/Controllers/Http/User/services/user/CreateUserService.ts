import Keycode from 'App/Models/User/Keycode'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Gcm from 'App/Models/Gcm/Gcm'
import User from 'App/Models/User/User'
import AppException from 'App/Exceptions/AppException'

interface IRequestData {
  nome_usuario: string
  email: string
  password: string
  keycode: string
}

class CreateUserService {
  public async execute({ nome_usuario, email, password, keycode }: IRequestData) {
    const keycode_exists = await Keycode.findBy('keycode', keycode)
    if (!keycode_exists) {
      throw new NotFoundException('❌  Erro ao criar usuário: chave de acesso não encontrada. 😓')
    }

    // -> check keycode is valid
    if (!keycode_exists.active) {
      throw new AppException('❌ Erro ao criar usuário: chave de acesso já utilizada. 😓')
    }

    const gcm = await Gcm.findBy('id', keycode_exists.gcm_id)
    if (!gcm) {
      throw new NotFoundException('❌  Erro ao criar usuário: Gcm não encontrado. 😓')
    }

    try {
      await Keycode.query().where('id', keycode_exists.id).update({ active: false })
    } catch (error) {
      throw new AppException('❌  Erro ao criar usuário. 😓')
    }

    const user = await User.create({
      nome_usuario,
      email,
      password,
      gcm_id: gcm.id,
    })

    return user.id
  }
}

export default new CreateUserService()
