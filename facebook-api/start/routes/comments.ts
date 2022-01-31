import Route from '@ioc:Adonis/Core/Route'

Route.post('/comments', 'Posts/Comments.store').middleware('auth')
Route.put('/comments', 'Posts/Comments.update').middleware('auth')
Route.delete('/comments/:id', 'Posts/Comments.destroy').middleware('auth')
