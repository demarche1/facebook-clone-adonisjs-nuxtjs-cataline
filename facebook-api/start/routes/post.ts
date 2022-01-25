import Route from '@ioc:Adonis/Core/Route'

Route.resource('/posts', 'Post/Main')
  .apiOnly()
  .except(['show'])
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth']
  })
