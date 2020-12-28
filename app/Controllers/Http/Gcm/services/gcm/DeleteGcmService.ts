import Gcm from 'App/Models/Gcm/Gcm'
import NotFoundException from 'App/Exceptions/NotFoundException'
import AppException from 'App/Exceptions/AppException'

class DeleteGcmService {
  public async execute(gcm_id: string) {
    const gcm_exists = await Gcm.query().where('id', gcm_id).where('status', true).first()
    if (!gcm_exists) {
      throw new NotFoundException('Erro ao deletar: gcm não encontrado.')
    }

    gcm_exists.status = false

    try {
      await gcm_exists.save()
    } catch (error) {
      throw new AppException('Erro ao deletar gcm, tente novamente mais tarde.')
    }
  }
}

export default new DeleteGcmService()
