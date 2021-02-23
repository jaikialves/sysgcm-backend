import { DateTime } from 'luxon'
import Gcm from 'App/Modules/Gcm/Models/Gcm'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import Escala from 'App/Modules/Gcm/Models/Escala'
import AppException from 'App/Shared/Exceptions/AppException'

interface IRequestData {
  data_inicio: DateTime
  data_fim: DateTime
  gcm_id: string
  observacao?: string
}

class CreateEscalaService {
  public async execute({ data_inicio, data_fim, gcm_id, observacao }: IRequestData) {
    const gcm_exists = await Gcm.findBy('id', gcm_id)
    if (!gcm_exists) {
      throw new NotFoundException('Erro ao definir escala: gcm não encontrado.')
    }

    try {
      return await Escala.create({
        data_inicio,
        data_fim,
        gcm_id: gcm_exists.id,
        observacao,
      })
    } catch (error) {
      console.log(error)
      throw new AppException('Erro ao definir escala, tente novamente mais tarde.')
    }
  }
}

export default new CreateEscalaService()
