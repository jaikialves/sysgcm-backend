import Gcm from 'App/Modules/Gcm/Models/Gcm'
import { ICreateGcmDTO } from 'App/Modules/Gcm/DTOs/ICreateGcmDTO'

export interface IGcmsRepository {
  index(search: string): Promise<Gcm[]>
  create(data: ICreateGcmDTO): Promise<Gcm>
  update(gcm: Gcm): Promise<Gcm>
  delete(gcm: Gcm): Promise<Gcm>
  findById(gcm_id: string): Promise<Gcm | null>
}
