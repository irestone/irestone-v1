import { createDBConnector } from './db'
import { createHTTPServer } from './server'
import { DBCredentials, port } from './config'
import { app } from './app'

export const launch = () => {
  createDBConnector(DBCredentials).connect()
  createHTTPServer(app, port).start()
}
