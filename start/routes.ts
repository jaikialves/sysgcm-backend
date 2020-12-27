import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { status: '✅  Tudo ok patrão! 😁' }
})

//? -> PUBLIC

Route.group(() => {
  Route.post('/login', 'AuthController.login').as('auth.login')
  Route.post('/register', 'User/UsersController.create').as('user.create')
})

//? -> PRIVATE

// -> enderecos
import './routes/enderecos.routes'

// -> gcms
import './routes/gcms.routes'

// -> tests routes
Route.get('test', 'TestsController.index')
