import { inject, injectable } from 'tsyringe'

import { IGcmsRepository } from 'App/Modules/Gcm/Interfaces'

import AppException from 'App/Shared/Exceptions/AppException'

@injectable()
export class IndexGcmService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository
  ) {}

  public async execute(search: string) {
    try {
      return await this.gcmsRepository.index(search)
    } catch (error) {
      throw new AppException(`Erro ao processar dados, tente novamente mais tarde. ${error}`)
    }
  }
}
