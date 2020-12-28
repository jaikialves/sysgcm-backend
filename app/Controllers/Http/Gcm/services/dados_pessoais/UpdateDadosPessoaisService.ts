import { DateTime } from 'luxon'
import {
  cutis,
  escolaridade,
  estado_civil,
  sexo,
  tipo_cnh,
  tipo_sanguineo,
} from 'App/Models/Gcm/types/EnumTypes'

import DadosPessoais from 'App/Models/Gcm/DadosPessoais'
import NotFoundException from 'App/Exceptions/NotFoundException'
import AppException from 'App/Exceptions/AppException'

interface IRequestData {
  dados_pessoais_id: string
  nome?: string
  rg?: string
  cpf?: string
  data_nascimento?: DateTime
  nome_mae?: string
  nome_pai?: string
  telefone?: string[]
  municipio_nascimento_id?: string
  sexo?: sexo
  cutis?: cutis
  tipo_sanguineo?: tipo_sanguineo
  estado_civil?: estado_civil
  profissao?: string[]
  escolaridade?: escolaridade
  nome_conjuge?: string
  nome_filhos?: string[]
  titulo_eleitor?: string
  zona_eleitoral?: string
  cnh?: string
  tipo_cnh?: tipo_cnh
  validade_cnh?: DateTime
  observacao?: string
}

class UpdateDadosPessoaisService {
  public async execute({
    dados_pessoais_id,
    nome,
    rg,
    cpf,
    data_nascimento,
    telefone,
    nome_mae,
    nome_pai,
    municipio_nascimento_id,
    sexo,
    cutis,
    tipo_sanguineo,
    estado_civil,
    profissao,
    escolaridade,
    nome_conjuge,
    nome_filhos,
    titulo_eleitor,
    zona_eleitoral,
    cnh,
    tipo_cnh,
    validade_cnh,
    observacao,
  }: IRequestData) {
    const dados_pessoais_exists = await DadosPessoais.findBy('id', dados_pessoais_id)
    if (!dados_pessoais_exists) {
      throw new NotFoundException('Erro ao atualizar informações: dados pessoais não encontrado.')
    }

    dados_pessoais_exists.merge({
      nome,
      rg,
      cpf,
      data_nascimento,
      telefone,
      nome_mae,
      nome_pai,
      municipio_nascimento_id,
      sexo,
      cutis,
      tipo_sanguineo,
      estado_civil,
      profissao,
      escolaridade,
      nome_conjuge,
      nome_filhos,
      titulo_eleitor,
      zona_eleitoral,
      cnh,
      tipo_cnh,
      validade_cnh,
      observacao,
    })

    try {
      await dados_pessoais_exists.save()

      return dados_pessoais_exists.id
    } catch (error) {
      throw new AppException(`Erro ao atualizar informações: ${error}.`)
    }
  }
}

export default new UpdateDadosPessoaisService()
