import Escala from 'App/Modules/Gcm/Models/Escala'
import { ICreateEscalaDTO } from 'App/Modules/Gcm/DTOs/ICreateEscalaDTO'

export interface IEscalaRepository {
  create(data: ICreateEscalaDTO): Promise<Escala>
}
