import Route from '@ioc:Adonis/Core/Route'

Route.get('/profile', 'Profile/Main.show').middleware('auth')
