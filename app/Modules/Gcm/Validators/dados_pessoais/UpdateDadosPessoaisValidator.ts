import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  cutis,
  escolaridade,
  estado_civil,
  sexo,
  tipo_cnh,
  tipo_sanguineo,
} from 'App/Modules/Gcm/Models/types/EnumTypes'

export default class UpdateDadosPessoaisValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string.optional({}, [
      rules.minLength(6),
      rules.maxLength(40),
      rules.alpha({ allow: ['space'] }),
    ]),
    rg: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(9),
      rules.maxLength(11),
    ]),
    cpf: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(11),
      rules.maxLength(11),
      rules.unique({ table: 'dados_pessoais', column: 'cpf' }),
    ]),
    data_nascimento: schema.date.optional({ format: 'yyyy-MM-dd' }, []),
    nome_mae: schema.string.optional({ escape: true }, [rules.minLength(6), rules.maxLength(40)]),
    nome_pai: schema.string.optional({ escape: true }, [rules.minLength(6), rules.maxLength(40)]),
    telefone: schema.array
      .optional([
        rules.maxLength(10),
        rules.unique({ table: 'dados_pessoais', column: 'telefone' }),
      ])
      .members(schema.string({ trim: true, escape: true }, [])),
    municipio_nascimento_id: schema.string.optional({}, [
      rules.uuid(),
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
    sexo: schema.enum.optional(Object.values(sexo), []),
    cutis: schema.enum.optional(Object.values(cutis), []),
    tipo_sanguineo: schema.enum.optional(Object.values(tipo_sanguineo), []),
    estado_civil: schema.enum.optional(Object.values(estado_civil), []),
    profissao: schema.array
      .optional([rules.maxLength(10)])
      .members(schema.string({ escape: true }, [rules.maxLength(4), rules.maxLength(20)])),
    escolaridade: schema.enum.optional(Object.values(escolaridade), []),
    nome_conjuge: schema.string.optional({ escape: true }, [
      rules.requiredWhen('estado_civil', '=', 'CASADO'),
    ]),
    nome_filhos: schema.array
      .optional([rules.maxLength(20)])
      .members(schema.string({ escape: true }, [rules.maxLength(40)])),
    titulo_eleitor: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(12),
      rules.maxLength(14),
      rules.unique({ table: 'dados_pessoais', column: 'titulo_eleitor' }),
    ]),
    zona_eleitoral: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(3),
      rules.maxLength(3),
      rules.requiredIfExists('titulo_eleitor'),
    ]),
    cnh: schema.string.optional({ trim: true, escape: true }, [
      rules.unique({ table: 'dados_pessoais', column: 'cnh' }),
      rules.minLength(11),
      rules.maxLength(11),
    ]),
    tipo_cnh: schema.enum.optional(Object.values(tipo_cnh), [rules.requiredIfExists('cnh')]),
    validade_cnh: schema.date.optional({ format: 'yyyy-MM-dd' }),
    observacao: schema.string.optional({ escape: true }, []),
  })

  public messages = {}
}
