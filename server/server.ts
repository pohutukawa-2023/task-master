import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'

import taskRoutes from './routes/tasks.ts'
import clientRoutes from './routes/clients.ts'
import adminRoutes from './routes/admins.ts'

const filename = URL.fileURLToPath(import.meta.url)
const dirname = Path.dirname(filename)

const server = express()

server.use(express.json())
server.use(express.static(Path.join(dirname, 'public')))

server.use('/api/v1/tasks', taskRoutes)
server.use('/api/v1/client', clientRoutes)
server.use('/api/v1/admin', adminRoutes)

server.get('*', (req, res) => {
  res.sendFile(Path.join(__dirname, 'public/index.html'))
})

export default server
