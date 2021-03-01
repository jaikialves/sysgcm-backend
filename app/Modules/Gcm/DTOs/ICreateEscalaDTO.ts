import { DateTime } from 'luxon'

export interface ICreateEscalaDTO {
  data_inicio: DateTime
  data_fim: DateTime
  gcm_id: string
  observacao?: string
}
