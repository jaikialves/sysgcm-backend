import Route from '@ioc:Adonis/Core/Route'

// -> estados
Route.group(() => {
  Route.get('estados', 'Endereco/EstadosController.index').as('estado.index')
})
  .prefix('estados')
  .middleware(['auth'])

// -> municipios
Route.group(() => {
  Route.get('index', 'Endereco/MunicipiosController.index').as('municipio.index')
})
  .prefix('municipios')
  .middleware(['auth'])

// -> bairros
Route.group(() => {
  Route.get('index', 'Endereco/BairrosController.index').as('bairro.index')
  Route.post('create', 'Endereco/BairrosController.create').as('bairro.create')
  Route.put('update/:id', 'Endereco/BairrosController.update').as('bairro.update')
  Route.delete('delete/:id', 'Endereco/BairrosController.delete').as('bairro.delete')
})
  .prefix('bairros')
  .middleware(['auth'])

// -> enderecos
Route.group(() => {
  Route.get('index', 'Endereco/EnderecosController.index').as('enderecos.index')
  Route.post('create', 'Endereco/EnderecosController.create').as('endereco.create')
  Route.put('update/:id', 'Endereco/EnderecosController.update').as('endereco.update')
})
  .prefix('enderecos')
  .middleware(['auth'])
