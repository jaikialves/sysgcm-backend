import Route from '@ioc:Adonis/Core/Route'

// -> estados
Route.group(() => {
  Route.get('estados', 'Endereco/EstadosController.index').as('estado.index')
})
  .prefix('enderecos')
  .middleware(['auth'])

// -> municipios
Route.group(() => {
  Route.get('municipios', 'Endereco/MunicipiosController.index').as('municipio.index')
})
  .prefix('enderecos')
  .middleware('auth')

// -> bairros
Route.group(() => {
  Route.get('index', 'Endereco/BairrosController.index').as('bairro.index')
  Route.post('create', 'Endereco/BairrosController.create').as('bairro.create')
})
  .prefix('bairros')
  .middleware('auth')
