import XLSX from 'xlsx'
import fs from 'fs'

import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Estado from 'App/Modules/Endereco/Models/Estado'
import Municipio from 'App/Modules/Endereco/Models/Municipio'

export default class MunicipiosSeeder extends BaseSeeder {
  public async run() {
    const checkSeeder = await Municipio.all()
    if (checkSeeder.length === 0) {
      // get file names
      const files_names = fs.readdirSync(`${__dirname}/xlsx/cidades/`)

      // get list code
      const codes = await Database.rawQuery(
        'select codigo_ibge, sigla from estados order by sigla;'
      )

      for (let i = 0; i < codes.rows.length; i++) {
        // get estado_id
        const estado = await Estado.findBy('codigo_ibge', `${codes.rows[i].codigo_ibge}`)
        if (!estado) {
          throw new Error('❌  Seed Falhou!')
        }

        // read xlsx file
        const file = XLSX.readFile(`${__dirname}/xlsx/cidades/${files_names[i]}`)
        const sheet = file.SheetNames

        // get rows
        const range = XLSX.utils.decode_range(<string>file.Sheets[sheet[0]]['!ref'])

        /*console.log(
          'ARQUIVO -> ',
          files_names[i],
          'ESTADO -> ',
          estado.sigla,
          'IBGE_CODE -> ',
          estado.codigo_ibge
        )*/

        for (let i = 2; i <= range.e.r + 1; i += 1) {
          XLSX.utils.sheet_add_json(file.Sheets[sheet[0]], [{ estado_id: estado.id }], {
            header: ['estado_id'],
            skipHeader: true,
            origin: `D${i}`,
          })
        }

        // save on database
        await Municipio.createMany(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]])).catch((err) => {
          throw new Error(`❌  ${err.message}`)
        })
      }
    } else if (checkSeeder.length !== 5703) {
      throw new Error('😓  Seed incorreto. Reinicie o bando de dados!')
    } else {
      throw new Error('😓  Tabela já semeada!')
    }
  }
}
