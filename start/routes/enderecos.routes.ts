import Route from '@ioc:Adonis/Core/Route'

// -> estados
Route.group(() => {
  Route.get('estados', 'Endereco/EstadosController.index').as('estados.index')
}).prefix('enderecos')

Route.group(() => {
  Route.get('municipios', 'Endereco/MunicipiosController.index').as('municipios.index')
}).prefix('enderecos')

Route.group(() => {
  Route.get('bairros', 'Endereco/BairrosController.index').as('bairros.index')
}).prefix('enderecos')
