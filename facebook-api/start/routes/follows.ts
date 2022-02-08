import Route from '@ioc:Adonis/Core/Route'

Route.post('/follow', 'Follows/Follow.store').middleware('auth')
Route.post('/unfollow', 'Follows/Unfollow.store').middleware('auth')
