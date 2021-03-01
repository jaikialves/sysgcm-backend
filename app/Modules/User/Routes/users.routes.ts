import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('show/:id', '/App/Modules/User/Controllers/UsersController.show').as('user.show')
  Route.put('update/:id', '/App/Modules/User/Controllers/UsersController.update').as('user.update')
})
  .prefix('users')
  .middleware(['auth', 'acl:root,admin,user'])

Route.group(() => {
  Route.get('escala/index/:id', '/App/Modules/User/Controllers/EscalasController.index').as(
    'user.escala.index'
  )
})
  .prefix('users')
  .middleware(['auth', 'acl:root,admin,user'])
