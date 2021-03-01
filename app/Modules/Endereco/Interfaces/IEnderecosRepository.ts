import Endereco from 'App/Modules/Endereco/Models/Enderecos'

export interface IEnderecosRepository {
  create(): Promise<Endereco>
  findById(endereco_id: string): Promise<Endereco | null>
}
