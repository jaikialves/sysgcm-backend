import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { status: '✅  Tudo ok patrão! 😁' }
})

//? -> PUBLIC

Route.group(() => {
  Route.post('/login', '/App/Modules/User/Controllers/AuthController.login').as('auth.login')
  Route.post('/register', '/App/Modules/User/UsersController.create').as('user.create')
})

//? -> PRIVATE

// -> enderecos
import 'App/Modules/Endereco/Routes/enderecos.routes'

// -> gcms
import 'App/Modules/Gcm/Routes/gcms.routes'

// -> escalas
import 'App/Modules/Gcm/Routes/escalas.routes'

// -> users
import 'App/Modules/User/Routes/users.routes'

// -> tests routes
Route.get('test', 'TestsController.index')
