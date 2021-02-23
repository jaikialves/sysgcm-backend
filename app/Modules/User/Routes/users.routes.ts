import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('show/:id', 'User/UsersController.show').as('user.show')
  Route.put('update/:id', 'User/UsersController.update').as('user.update')
})
  .prefix('users')
  .middleware(['auth', 'acl:root,admin,user'])

Route.group(() => {
  Route.get('escala/index/:id', 'User/EscalasController.index').as('user.escala.index')
})
  .prefix('users')
  .middleware(['auth', 'acl:root,admin,user'])
