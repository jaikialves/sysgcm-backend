import Gcm from 'App/Modules/Gcm/Models/Gcm'

import { IGcmsRepository } from 'App/Modules/Gcm/Interfaces'
import { ICreateGcmDTO } from 'App/Modules/Gcm/DTOs'

export class GcmsRepository implements IGcmsRepository {
  public async index(search: string): Promise<Gcm[]> {
    return Gcm.query().apply((scopes) => {
      scopes.scopeSearchQuery(search)
    })
  }

  public async create(data: ICreateGcmDTO): Promise<Gcm> {
    return await Gcm.create(data)
  }

  public async update(gcm: Gcm): Promise<Gcm> {
    return await gcm.save()
  }

  public async delete(gcm: Gcm): Promise<Gcm> {
    gcm.merge({ is_deleted: true })
    return await gcm.save()
  }

  public async findById(gcm_id: string): Promise<Gcm | null> {
    return await Gcm.findBy('id', gcm_id)
  }
}
