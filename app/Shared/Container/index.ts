import { container } from 'tsyringe'

import IGcmsRepository from 'App/Modules/Gcm/Interfaces/IGcmsRepository'
import GcmsRepository from 'App/Modules/Gcm/Repositories/GcmsRepository'

import IUsersRepository from 'App/Modules/User/Interfaces/IUsersRepository'
import UsersRepository from 'App/Modules/User/Repositories/UsersRepository'

import IKeycodesRepository from 'App/Modules/User/Interfaces/IKeycodesRepository'
import KeycodesRepository from 'App/Modules/User/Repositories/KeycodesRepository'

import IRolesRepository from 'App/Modules/User/Interfaces/IRolesRepository'
import RolesRepository from 'App/Modules/User/Repositories/RolesRepository'

/* -------------------------------- Singleton --------------------------------*/

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IKeycodesRepository>('UsersRepository', KeycodesRepository)
container.registerSingleton<IGcmsRepository>('GcmsRepository', GcmsRepository)
container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository)
