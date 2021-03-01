import Endereco from 'App/Modules/Endereco/Models/Enderecos'
import { IEnderecosRepository } from 'App/Modules/Endereco/Interfaces'

export class EnderecosRepository implements IEnderecosRepository {
  public async create(): Promise<Endereco> {}

  public async findById(endereco_id: string): Promise<Endereco | null> {
    return Endereco.findBy('id', endereco_id)
  }
}
