import Route from '@ioc:Adonis/Core/Route'

// -> estados
Route.group(() => {
  Route.get('index', '/App/Modules/Endereco/Controllers/EstadosController.index').as('estado.index')
})
  .prefix('estados')
  .middleware(['auth'])

// -> municipios
Route.group(() => {
  Route.get('index', '/App/Modules/Endereco/Controllers/MunicipiosController.index').as(
    'municipio.index'
  )
})
  .prefix('municipios')
  .middleware(['auth'])

// -> bairros
Route.group(() => {
  Route.get('index', '/App/Modules/Endereco/Controllers/BairrosController.index').as('bairro.index')
  Route.post('create', '/App/Modules/Endereco/Controllers/BairrosController.create').as(
    'bairro.create'
  )
  Route.put('update/:id', '/App/Modules/Endereco/Controllers/BairrosController.update').as(
    'bairro.update'
  )
  Route.delete('delete/:id', '/App/Modules/Endereco/Controllers/BairrosController.delete').as(
    'bairro.delete'
  )
})
  .prefix('bairros')
  .middleware(['auth'])

// -> enderecos
Route.group(() => {
  Route.get('index', '/App/Modules/Endereco/Controllers/EnderecosController.index').as(
    'enderecos.index'
  )
  Route.post('create', '/App/Modules/Endereco/Controllers/EnderecosController.create').as(
    'endereco.create'
  )
  Route.put('update/:id', '/App/Modules/Endereco/Controllers/EnderecosController.update').as(
    'endereco.update'
  )
})
  .prefix('enderecos')
  .middleware(['auth'])
