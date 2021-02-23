import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Endereco from 'App/Modules/Endereco/Models/Enderecos'
import Bairro from 'App/Modules/Endereco/Models/Bairro'
import Municipio from 'App/Modules/Endereco/Models/Municipio'
import DadosPessoais from 'App/Modules/Gcm/Models/DadosPessoais'
import Gcm from 'App/Modules/Gcm/Models/Gcm'
import User from 'App/Modules/User/Models/User'
import Role from 'App/Modules/User/Models/Role'
import { DateTime } from 'luxon'
import {
  atribuicao,
  cutis,
  escolaridade,
  estado_civil,
  sexo,
  tipo_sanguineo,
} from 'App/Modules/Gcm/Models/types/EnumTypes'

export default class RootSeeder extends BaseSeeder {
  public async run() {
    const municipio = await Municipio.findBy('codigo_ibge', '3554003')
    if (!municipio) {
      return console.log('❌  Falha ao semear RootUser: municipio não encontrado.')
    }

    const bairro = await Bairro.create({
      bairro: 'Vila Angélica',
      municipio_id: municipio.id,
    })

    const endereco = await Endereco.create({
      logradouro: 'Isaltino Campos Viêira',
      numero: '24',
      cep: '18280170',
      bairro_id: bairro.id,
      observacao: 'Endereço do usuário raiz.',
    })

    const dados_pessoais = await DadosPessoais.create({
      nome: 'Gabriel Maia Silva Moreira',
      rg: '586109274SP',
      cpf: '38738734869',
      data_nascimento: DateTime.fromISO('1999-02-23'),
      nome_mae: 'Inêz Maia Silva',
      nome_pai: 'Denis Maurilho Maricato',
      telefone: ['15996601743', '15997204738'],
      municipio_nascimento_id: await Municipio.findBy('codigo_ibge', '3504008').then(
        (municipio) => {
          return municipio?.id
        }
      ),
      sexo: sexo.MASCULINO,
      cutis: cutis.BRANCO,
      tipo_sanguineo: tipo_sanguineo['O+'],
      estado_civil: estado_civil.SOLTEIRO,
      profissao: ['Programador', 'Engenheiro de softwares', 'Desenvolvedor fullstack'],
      escolaridade: escolaridade['SUPERIOR-INCOMPLETO'],
      titulo_eleitor: '436501630159',
      zona_eleitoral: '037',
      observacao: 'Dados pessoais do usuário raiz.',
    })

    const gcm = await Gcm.create({
      nome_guerra: 'Maia',
      dados_pessoais_id: dados_pessoais.id,
      endereco_id: endereco.id,
      atribuicao: atribuicao.COMANDANTE,
      historico: 'GCM: programador do sistema',
    })

    const user = await User.create({
      nome_usuario: 'root',
      email: 'gabrielmaialva33@gmail.com',
      password: 'Anonimonet22',
      gcm_id: gcm.id,
      role_id: await Role.findBy('role', 'root').then((role) => {
        return role?.id
      }),
    })

    await user.related('roles').attach([user.role_id])
  }
}
