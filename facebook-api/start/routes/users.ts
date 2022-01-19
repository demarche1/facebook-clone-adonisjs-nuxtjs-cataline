import Route from '@ioc:Adonis/Core/Route'

Route.post('/users/register', 'Users/Register.store')
Route.get('/users/register/:key', 'Users/Register.show')
Route.put('/users/register', 'Users/Register.update')

Route.post('/users/forgot-password', 'Users/ForgotPasswords.store')
Route.get('/users/forgot-password/:key', 'Users/ForgotPasswords.show')
Route.put('/users/forgot-password', 'Users/ForgotPasswords.update')

Route.get('/users/profile', 'Users/UpdateProfiles.show').middleware('auth')
Route.put('/users/profile', 'Users/UpdateProfiles.update').middleware('auth')
Route.delete('/users/profile', 'Users/UpdateProfiles.destroy').middleware('auth')

Route.put('/users/avatar', 'Users/FilesController.update').middleware('auth')
Route.delete('/users/avatar', 'Users/FilesController.destroy').middleware('auth')
