import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('create', 'Gcm/GcmsController.create').as('gcm.create')
}).prefix('gcms')
