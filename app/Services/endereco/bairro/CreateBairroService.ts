import Bairro from 'App/Models/Endereco/Bairro'

interface IRequestData {
  user_id: string
  codigo_bairro?: string
  nome: string
  observacao?: string
  municipio: string
}
