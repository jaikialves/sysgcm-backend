import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('index', '/App/Modules/Gcm/Controllers/GcmsController.index').as('gcm.index')
  Route.get('show/:id', '/App/Modules/Gcm/Controllers/GcmsController.show').as('gcm.show')
  Route.post('create', '/App/Modules/Gcm/Controllers/GcmsController.create').as('gcm.create')
  Route.put('update/:id', '/App/Modules/Controllers/Gcm/GcmsController.update').as('gcm.update')
  Route.delete('delete/:id', '/App/Modules/Gcm/Controllers/GcmsController.delete').as('gcm.delete')
})
  .prefix('gcms')
  .middleware(['auth', 'acl:root,admin'])
