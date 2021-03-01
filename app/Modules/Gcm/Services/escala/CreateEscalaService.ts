import { inject, injectable } from 'tsyringe'

import { ICreateEscalaDTO } from 'App/Modules/Gcm/DTOs'
import { IEscalaRepository, IGcmsRepository } from 'App/Modules/Gcm/Interfaces'

import AppException from 'App/Shared/Exceptions/AppException'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class CreateEscalaService {
  constructor(
    @inject('EscalaRepository')
    private escalasRepository: IEscalaRepository,

    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository
  ) {}

  public async execute({ data_inicio, data_fim, gcm_id, observacao }: ICreateEscalaDTO) {
    const gcm_exists = await this.gcmsRepository.findById(gcm_id)
    if (!gcm_exists) {
      throw new NotFoundException('Erro ao definir escala: gcm não encontrado.')
    }

    try {
      return await this.escalasRepository.create({
        data_inicio,
        data_fim,
        gcm_id: gcm_exists.id,
        observacao,
      })
    } catch (error) {
      throw new AppException('Erro ao definir escala, tente novamente mais tarde.')
    }
  }
}
