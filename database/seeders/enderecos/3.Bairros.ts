import XLSX from 'xlsx'

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Bairro from 'App/Models/Endereco/Bairro'
import Municipio from 'App/Models/Endereco/Municipio'

export default class BairrosSeeder extends BaseSeeder {
  public async run() {
    const checkSeeder = await Bairro.all()
    if (checkSeeder.length === 0) {
      const municipio = await Municipio.findBy('codigo_ibge', '3523206')
      if (!municipio) {
        throw new Error('❌  Seed Falhou!')
      }

      const file = XLSX.readFile(`${__dirname}/xlsx/bairros/seed_bairros_itarare.xlsx`)
      const sheet = file.SheetNames

      for (let i = 2; i <= 86; i += 1) {
        XLSX.utils.sheet_add_json(file.Sheets[sheet[0]], [{ municipio_id: municipio.id }], {
          header: ['municipio_id'],
          skipHeader: true,
          origin: `C${i}`,
        })
      }

      await Bairro.createMany(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]])).catch((err) => {
        throw new Error(`❌  ${err.message}`)
      })
    }
  }
}
