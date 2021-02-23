import Gcm from 'App/Modules/Gcm/Models/Gcm'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import AppException from 'App/Shared/Exceptions/AppException'

class DeleteGcmService {
  public async execute(gcm_id: string) {
    const gcm_exists = await Gcm.query().where('id', gcm_id).where('status', true).first()
    if (!gcm_exists) {
      throw new NotFoundException('Erro ao deletar: gcm não encontrado.')
    }

    gcm_exists.is_deleted = false

    try {
      await gcm_exists.save()
    } catch (error) {
      throw new AppException('Erro ao deletar gcm, tente novamente mais tarde.')
    }
  }
}

export default new DeleteGcmService()
