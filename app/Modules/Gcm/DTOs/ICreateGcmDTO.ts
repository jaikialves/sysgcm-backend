import { atribuicao } from 'App/Modules/Gcm/Models/types/EnumTypes'

export interface ICreateGcmDTO {
  nome_guerra: string
  dados_pessoais_id: string
  endereco_id: string
  atribuicao: atribuicao
}
