import http from 'http'
import debug from 'debug'

class Server {
  constructor(app, port) {
    this.app = app
    this.port = normalizePort(port || '8080')
    this.server = http.createServer(app)
  }

  assignHandlers() {
    this.server.on('error', handleError.bind(this))
    this.server.on('listening', handleListening.bind(this))
  }

  start() {
    this.assignHandlers()
    this.server.listen(this.port)
  }
}

// handlers

function handleError(error) {
  if (error.syscall !== 'listen') throw error

  const { port } = this
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

function handleListening() {
  const addr = this.server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  log('Listening on ' + bind)
}

// utils

const log = debug('server')

const normalizePort = (val) => {
  const port = parseInt(val, 10)
  return isNaN(port) ? val : port >= 0 ? port : false
}

// exports

export const createHTTPServer = (app, port) => new Server(app, port)
