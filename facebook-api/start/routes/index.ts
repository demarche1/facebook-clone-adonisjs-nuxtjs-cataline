import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './users'
import './upload'
import './search'
import './post'
import './comments'
import './reactions'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/register')
})
