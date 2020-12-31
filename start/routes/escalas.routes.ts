import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('create', 'Gcm/EscalasController.create').as('escala.create')
})
  .prefix('escalas')
  .middleware(['auth', 'acl:root,admin'])
