import mongoose from 'mongoose'
import debug from 'debug'

class MongoDBConnector {
  constructor(credentials) {
    const { host, port, name, user, pass } = credentials

    if (!(host && port && name && user && pass)) {
      throw new Error('Database credentials are not provided')
    }

    this.URI = `mongodb://${user}:${pass}@${host}:${port}/${name}`
  }

  connect() {
    mongoose.connect(this.URI, { useNewUrlParser: true })
    this.connection = mongoose.connection
    this.assignHandlers()
  }

  assignHandlers() {
    this.connection.on('error', handleConnectionError.bind(this))
    this.connection.once('open', handleConnectionOpen.bind(this))
  }
}

// handlers

function handleConnectionError(error) {
  log('Connection failed')
  console.error(error)
}

function handleConnectionOpen() {
  log('Connection established')
}

// utils

const log = debug('database')

// exports

export const createDBConnector = (credentials) =>
  new MongoDBConnector(credentials)
