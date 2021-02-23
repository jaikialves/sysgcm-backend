import Gcm from 'App/Modules/Gcm/Models/Gcm'

export default interface IGcmsRepository {
  findById(gcm_id: string): Promise<Gcm | null>
}
