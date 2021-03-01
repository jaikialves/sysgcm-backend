import DadosPessoais from 'App/Modules/Gcm/Models/DadosPessoais'
import { ICreateDadosPessoais } from 'App/Modules/Gcm/DTOs/ICreateDadosPessoais'

export interface IDadosPessoaisRepository {
  create(data: ICreateDadosPessoais): Promise<DadosPessoais>
  update(dados_pessoais: DadosPessoais): Promise<DadosPessoais>
  findById(dados_pessoais_id: string): Promise<DadosPessoais | null>
  findByCpf(cpf: string): Promise<DadosPessoais | null>
  findByTituloEleitor(titulo_eleitor: string): Promise<DadosPessoais | null>
  findByCnh(cnh: string): Promise<DadosPessoais | null>
}
