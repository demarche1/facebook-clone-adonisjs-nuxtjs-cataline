import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.emit('news', { foo: 'bar' })

  socket.on('other', (data) => {
    console.log(data)
  })
})
