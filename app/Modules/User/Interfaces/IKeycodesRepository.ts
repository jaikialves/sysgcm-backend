import Keycode from 'App/Modules/User/Models/Keycode'

export default interface IKeycodesRepository {
  findByKeycode(keycode: string): Promise<Keycode | null>
  revokeKeycode(keycode: Keycode): Promise<Keycode>
}
