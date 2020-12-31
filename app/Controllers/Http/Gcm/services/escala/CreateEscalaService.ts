import { DateTime } from 'luxon'
import Gcm from 'App/Models/Gcm/Gcm'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Escala from 'App/Models/Gcm/Escala'
import AppException from 'App/Exceptions/AppException'

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
      const escala = await Escala.create({
        data_inicio,
        data_fim,
        gcm_id: gcm_exists.id,
        observacao,
      })

      return escala.id
    } catch (error) {
      throw new AppException('Erro ao definir escala, tente novamente mais tarde.')
    }
  }
}

export default new CreateEscalaService()
