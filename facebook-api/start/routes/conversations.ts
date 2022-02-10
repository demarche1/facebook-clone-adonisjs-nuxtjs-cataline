import Route from '@ioc:Adonis/Core/Route'

Route.get('/conversations/:id', 'Conversations/Main.show').middleware('auth')
