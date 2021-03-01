import { container } from 'tsyringe'

import {
  IGcmsRepository,
  IEscalaRepository,
  IDadosPessoaisRepository,
} from 'App/Modules/Gcm/Interfaces'

import {
  DadosPessoaisRepository,
  EscalaRepository,
  GcmsRepository,
} from 'App/Modules/Gcm/Repositories'

import { IEnderecosRepository } from 'App/Modules/Endereco/Interfaces'
import { EnderecosRepository } from 'App/Modules/Endereco/Repositories'

import {
  IUsersRepository,
  IKeycodesRepository,
  IRolesRepository,
} from 'App/Modules/User/Interfaces'
import { UsersRepository, RolesRepository, KeycodesRepository } from 'App/Modules/User/Repositories'

/* -------------------------------- Singleton --------------------------------*/

// user
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IKeycodesRepository>('KeycodesRepository', KeycodesRepository)
container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository)

// gcm
container.registerSingleton<IDadosPessoaisRepository>(
  'DadosPessoaisRepository',
  DadosPessoaisRepository
)
container.registerSingleton<IEscalaRepository>('EscalaRepository', EscalaRepository)
container.registerSingleton<IGcmsRepository>('GcmsRepository', GcmsRepository)

container.registerSingleton<IEnderecosRepository>('EnderecosRepository', EnderecosRepository)
