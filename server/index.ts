import server from './server.ts'

const port = 3000

server.listen(port, () => {
  console.log('Server listening on port', port)
})
