import IKeycodesRepository from 'App/Modules/User/Interfaces/IKeycodesRepository'
import Keycode from 'App/Modules/User/Models/Keycode'

export default class KeycodesRepository implements IKeycodesRepository {
  public async findByKeycode(keycode: string): Promise<Keycode | null> {
    return await Keycode.findBy('keycode', keycode)
  }

  public async revokeKeycode(keycode: Keycode): Promise<Keycode> {
    keycode.merge({ active: false })
    return await keycode.save()
  }
}
