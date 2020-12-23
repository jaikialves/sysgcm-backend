import XLSX from 'xlsx'
import fs from 'fs'

import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Estado from 'App/Models/Endereco/Estado'
import Municipio from 'App/Models/Endereco/Municipio'

export default class MunicipiosSeeder extends BaseSeeder {
  public async run() {
    const checkSeeder = await Municipio.all()
    if (checkSeeder.length === 0) {
      // get file names
      const files_names = fs.readdirSync(`${__dirname}/xlsx/cidades/`)

      // get list code
      const codes = await Database.rawQuery('select codigo_ibge from estados;')
      for (let i = 0; i < codes.rows.length; i++) {
        // get estado_id
        const estado = await Estado.findBy('codigo_ibge', `${codes.rows[i].codigo_ibge}`)
        if (!estado) {
          throw new Error('❌  Seed Failed!')
        }
        // read xlsx file
        const file = XLSX.readFile(`${__dirname}/xlsx/cidades/${files_names[i]}`)
        const sheet = file.SheetNames

        // get rows
        const range = XLSX.utils.decode_range(<string>file.Sheets[sheet[0]]['!ref'])
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
      throw new Error('😓  Incorrect seed. Reset database.')
    } else {
      throw new Error('😓  Table already sown!')
    }
  }
}
