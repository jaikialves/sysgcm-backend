import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('create', '/App/Modules/Gcm/Controllers/EscalasController.create').as('escala.create')
})
  .prefix('escalas')
  .middleware(['auth', 'acl:root,admin'])
