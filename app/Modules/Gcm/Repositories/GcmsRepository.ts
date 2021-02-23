import IGcmsRepository from 'App/Modules/Gcm/Interfaces/IGcmsRepository'
import Gcm from 'App/Modules/Gcm/Models/Gcm'

export default class GcmsRepository implements IGcmsRepository {
  public async findById(gcm_id: string): Promise<Gcm | null> {
    return await Gcm.findBy('id', gcm_id)
  }
}
