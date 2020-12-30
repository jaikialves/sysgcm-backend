import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Bairro from 'App/Models/Endereco/Bairro'
import Endereco from 'App/Models/Endereco/Enderecos'
import DadosPessoais from 'App/Models/Gcm/DadosPessoais'
import { DateTime } from 'luxon'
import Municipio from 'App/Models/Endereco/Municipio'
import {
  atribuicao,
  cutis,
  estado_civil,
  sexo,
  tipo_cnh,
  tipo_sanguineo,
} from 'App/Models/Gcm/types/EnumTypes'
import Gcm from 'App/Models/Gcm/Gcm'
import User from 'App/Models/User/User'
import Role from 'App/Models/User/Role'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const endereco = await Endereco.create({
      logradouro: 'Rua São Pedro 2570',
      numero: '249',
      cep: '18460974',
      bairro_id: await Bairro.findBy('codigo_bairro', '1-01').then((bairro) => {
        return bairro?.id
      }),
    })

    const dados_pessoais = await DadosPessoais.create({
      nome: 'Luís Miguel Gonçalves',
      rg: '434111259SP',
      cpf: '68307357853',
      data_nascimento: DateTime.fromISO('1992-04-12'),
      nome_mae: 'Patrícia Clarice',
      nome_pai: 'Daniel Eduardo Henrique Gonçalves',
      telefone: ['15996867570', '1529919751'],
      municipio_nascimento_id: await Municipio.findBy('codigo_ibge', '3113503').then(
        (municipio) => {
          return municipio?.id
        }
      ),
      sexo: sexo.MASCULINO,
      cutis: cutis.BRANCO,
      tipo_sanguineo: tipo_sanguineo['AB+'],
      estado_civil: estado_civil.SOLTEIRO,
      profissao: ['Guarda Civil Municipal'],
      titulo_eleitor: '347302850183',
      zona_eleitoral: '052',
      cnh: '49467019852',
      tipo_cnh: tipo_cnh['A-B'],
      validade_cnh: DateTime.fromISO('2021-07-21'),
      observacao: 'Fake dados pessoais',
    })

    const gcm = await Gcm.create({
      nome_guerra: 'Miguel',
      dados_pessoais_id: dados_pessoais.id,
      endereco_id: endereco.id,
      atribuicao: atribuicao.OFICIAL,
    })

    const user = await User.create({
      nome_usuario: 'luiz',
      email: 'luiz@gmail.com',
      password: '123456',
      gcm_id: gcm.id,
      role_id: await Role.findBy('role', 'user').then((role) => {
        return role?.id
      }),
    })

    await user.related('roles').attach([user.role_id])
  }
}
