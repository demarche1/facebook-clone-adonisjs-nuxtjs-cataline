import Route from '@ioc:Adonis/Core/Route'

Route.get('users/search', 'Search/Main.index').middleware('auth')
