import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('index', 'Gcm/GcmsController.index').as('gcm.index')
  Route.get('show/:id', 'Gcm/GcmsController.show').as('gcm.show')
  Route.post('create', 'Gcm/GcmsController.create').as('gcm.create')
  Route.put('update/:id', 'Gcm/GcmsController.update').as('gcm.update')
  Route.delete('delete/:id', 'Gcm/GcmsController.delete').as('gcm.delete')
}).prefix('gcms')
