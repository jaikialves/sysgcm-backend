import { inject, injectable } from 'tsyringe'

import { IGcmsRepository } from 'App/Modules/Gcm/Interfaces'

import AppException from 'App/Shared/Exceptions/AppException'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

injectable()
export class DeleteGcmService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository
  ) {}

  public async execute(gcm_id: string) {
    const gcm_exists = await this.gcmsRepository.findById(gcm_id)
    if (!gcm_exists) {
      throw new NotFoundException('Erro ao deletar: gcm não encontrado.')
    }
    try {
      await this.gcmsRepository.delete(gcm_exists)
    } catch (error) {
      throw new AppException('Erro ao deletar gcm, tente novamente mais tarde.')
    }
  }
}
