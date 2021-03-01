import Escala from 'App/Modules/Gcm/Models/Escala'

import { IEscalaRepository } from 'App/Modules/Gcm/Interfaces'
import { ICreateEscalaDTO } from 'App/Modules/Gcm/DTOs'

export class EscalaRepository implements IEscalaRepository {
  public async create(data: ICreateEscalaDTO): Promise<Escala> {
    return await Escala.create(data)
  }
}
