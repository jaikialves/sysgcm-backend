import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Bairro from 'App/Models/Endereco/Bairro'
import Endereco from 'App/Models/Endereco/Enderecos'
import Municipio from 'App/Models/Endereco/Municipio'
import DadosPessoais from 'App/Models/Gcm/DadosPessoais'

import {
  atribuicao,
  cutis,
  estado_civil,
  roles,
  sexo,
  tipo_cnh,
  tipo_sanguineo,
} from 'App/Models/Gcm/types/EnumTypes'
import Gcm from 'App/Models/Gcm/Gcm'
import User from 'App/Models/User/User'

export default class AdminUserSeeder extends BaseSeeder {
  public async run() {
    const bairro = await Bairro.findBy('codigo_bairro', '1-02').catch((err) => {
      console.log(`❌  ${err.message}`)
    })
    if (!bairro) {
      throw new Error('❌  Bairro não encontrado.')
    }

    // -> seed endereco
    const endereco = await Endereco.create({
      logradouro: 'RUA JOÃO PRADO MARGARIDO',
      numero: '249',
      complemento: '',
      cep: '18460-000',
      codigo_endereco: '',
      bairro_id: bairro.id,
    })

    const municipio = await Municipio.findBy('codigo_ibge', '3113503').catch((err) => {
      console.log(`❌  ${err.message}`)
    })
    if (!municipio) {
      throw new Error('❌  Municipio não encontrado.')
    }

    // -> seed dados pessoais
    const dados_pessoais = await DadosPessoais.create({
      nome: 'Sebastião Ademar Gonçalves',
      rg: '377953611',
      cpf: '72042940682',
      data_nascimento: new Date('08-13-1971'),
      nome_mae: 'José Gonçalves Rosa',
      nome_pai: 'Sebastiana Rosa dos Santos',
      telefone: ['15996962874', '15996601743'],
      municipio_nascimento_id: municipio.id,
      sexo: sexo.MASCULINO,
      cutis: cutis.BRANCO,
      tipo_sanguineo: tipo_sanguineo['O+'],
      estado_civil: estado_civil.CASADO,
      profissao: ['Guarda Civil Municipal', 'Pintor'],
      //escolaridade: escolaridade['FUNDAMENTAL-COMPLETO'],
      nome_conjuge: 'Gonçalves',
      nome_filhos: ['Vitoria Caroline Gonçalves', 'Julia Gonçalves'],
      titulo_eleitor: '101811660272',
      zona_eleitoral: '057',
      cnh: '02737170006',
      tipo_cnh: tipo_cnh.C,
      validade_cnh: new Date('04-05-2020'),
      observacao: 'Esse é o ADMIN',
    })

    // -> seed gcm
    const gcm = await Gcm.create({
      nome_guerra: 'Gonsalves',
      dados_pessoais_id: dados_pessoais.id,
      endereco_id: endereco.id,
      atribuicao: atribuicao['SUB-COMANDANTE'],
      historico: ['Sem histórico'],
    })

    // -> seed user
    await User.create({
      nome_usuario: 'gonsalves',
      email: 'gonsalves@gmail.com',
      password: '123456',
      role: roles.MASTER,
      gcm_id: gcm.id,
    })
  }
}
