import { app } from '../app'
import debug from 'debug'
import http from 'http'
import mongoose from 'mongoose'

import { dbURI } from '../config'

// =====================================
//  HELPERS
// =====================================

const log = debug('node-pug:server')

const normalizePort = (val) => {
  const port = parseInt(val, 10)
  return isNaN(port) ? val : port >= 0 ? port : false
}

// =====================================
//  HANDLERS
// =====================================

const onError = (error) => {
  if (error.syscall !== 'listen') throw error

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    default:
      throw error
  }
}

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  log('Listening on ' + bind)
}

// =====================================
//  CONNECTING TO DATABASE
// =====================================

mongoose.connect(dbURI, { useNewUrlParser: true })
const moncon = mongoose.connection
moncon.on('error', console.error.bind(console, 'Connection to DB failed:'))
moncon.once('open', console.log.bind(console, 'Connection to DB established.'))

// =====================================
//  STARTING THE SERVER
// =====================================

// ? why
// app.set('port', port)

const port = normalizePort(process.env.PORT || '8080')
const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
