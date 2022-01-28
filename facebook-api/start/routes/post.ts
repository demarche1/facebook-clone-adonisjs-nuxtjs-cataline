import Route from '@ioc:Adonis/Core/Route'

Route.resource('/posts', 'Posts/Main')
  .apiOnly()
  .except(['show'])
  .middleware({
    index: ['auth'],
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth']
  })

Route.post('/posts/:id/media', 'Posts/Media.store').middleware('auth')

Route.post('/comments', 'Posts/Comments.store').middleware('auth')
Route.put('/comments', 'Posts/Comments.update').middleware('auth')
Route.delete('/comments/:id', 'Posts/Comments.destroy').middleware('auth')
