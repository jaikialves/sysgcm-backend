import Keycode from 'App/Modules/User/Models/Keycode'
import ICreateKeycodeDTO from 'App/Modules/User/DTOs/ICreateKeycodeDTO'
import { IKeycodesRepository } from 'App/Modules/User/Interfaces'

export class KeycodesRepository implements IKeycodesRepository {
  public async create(data: ICreateKeycodeDTO): Promise<Keycode> {
    return await Keycode.create(data)
  }

  public async findByKeycode(keycode: string): Promise<Keycode | null> {
    return await Keycode.findBy('keycode', keycode)
  }

  public async revokeKeycode(keycode: Keycode): Promise<Keycode> {
    keycode.merge({ active: false })
    return await keycode.save()
  }
}
