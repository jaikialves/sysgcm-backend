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

export class CreateDadosPessoaisValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // -> dados pessoais
    nome: schema.string({ escape: true }, [
      rules.minLength(6),
      rules.maxLength(40),
      rules.alpha({ allow: ['space'] }),
      rules.required(),
    ]),
    rg: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(9),
      rules.maxLength(11),
    ]),
    cpf: schema.string({ trim: true, escape: true }, [
      rules.minLength(11),
      rules.maxLength(11),
      rules.required(),
      rules.unique({ table: 'dados_pessoais', column: 'cpf' }),
    ]),
    data_nascimento: schema.date({ format: 'yyyy-MM-dd' }, [rules.required()]),
    nome_mae: schema.string({ escape: true }, [
      rules.minLength(6),
      rules.maxLength(40),
      rules.required(),
    ]),
    nome_pai: schema.string.optional({ escape: true }, [rules.minLength(6), rules.maxLength(40)]),
    telefone: schema
      .array([
        rules.minLength(1),
        rules.maxLength(10),
        rules.unique({ table: 'dados_pessoais', column: 'telefone' }),
      ])
      .members(schema.string({ trim: true, escape: true }, [])),
    municipio_nascimento_id: schema.string({}, [
      rules.required(),
      rules.uuid(),
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
    sexo: schema.enum(Object.values(sexo), [rules.required()]),
    cutis: schema.enum(Object.values(cutis), [rules.required()]),
    tipo_sanguineo: schema.enum.optional(Object.values(tipo_sanguineo), []),
    estado_civil: schema.enum(Object.values(estado_civil), []),
    profissao: schema.array
      .optional([rules.maxLength(10)])
      .members(schema.string({ escape: true }, [rules.maxLength(4), rules.maxLength(20)])),
    escolaridade: schema.enum(Object.values(escolaridade), []),
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
