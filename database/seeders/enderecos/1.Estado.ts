import XLSX from 'xlsx'

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Estado from 'App/Modules/Endereco/Models/Estado'

export default class EstadoSeeder extends BaseSeeder {
  public async run() {
    //? -> read xlsx file
    const file = XLSX.readFile(`${__dirname}/xlsx/seed_estado.xlsx`)
    const sheet = file.SheetNames

    //? -> xlsx to json
    //console.log(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]]))

    const range_db = (await Estado.all()).length
    const rande_xlsx = XLSX.utils.decode_range(<string>file.Sheets[sheet[0]]['!ref'])

    if (range_db === rande_xlsx.e.r) {
      throw new Error('😓  Tabela já semeada!')
    }

    await Estado.createMany(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]])).catch((err) => {
      console.log(`   ${err.message}`)
    })
  }
}
