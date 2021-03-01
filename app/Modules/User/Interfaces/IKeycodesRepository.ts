import Keycode from 'App/Modules/User/Models/Keycode'
import ICreateKeycodeDTO from 'App/Modules/User/DTOs/ICreateKeycodeDTO'

export interface IKeycodesRepository {
  create(data: ICreateKeycodeDTO): Promise<Keycode>
  findByKeycode(keycode: string): Promise<Keycode | null>
  revokeKeycode(keycode: Keycode): Promise<Keycode>
}
