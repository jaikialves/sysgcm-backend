import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gcm from 'App/Models/Gcm/Gcm'

export default class TestsController {
  public async index({ response }: HttpContextContract) {
    const gcm_test = await Gcm.query()
      .where('id', 'fb333883-2f65-49a1-8db7-379c2aa73e14')
      .preload('dados_pessoais')
      .preload('endereco', (query) => {
        query.preload('bairro', (query) => {
          query.preload('municipio', (query) => {
            query.preload('estado')
          })
        })
      })
      .firstOrFail()

    /*return response.json(
      gcm_test.serialize({
        fields: ['id', 'nome_guerra', 'atribuicao'],
        relations: {
          dados_pessoais: {
            fields: {
              omit: ['municipio_nascimento_id'],
            },
          },
          endereco: {
            fields: {
              omit: ['bairro_id'],
            },
            relations: {
              bairro: {
                fields: {
                  omit: ['municipio_id'],
                },
                relations: {
                  municipio: {
                    fields: {
                      omit: ['estado_id'],
                    },
                    relations: {
                      estado: {
                        fields: {
                          omit: [''],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
    )*/

    return response.json(gcm_test)
  }
}
