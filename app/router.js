import express from 'express'
import createHTTPError from 'http-errors'
import path from 'path'

import { apiRouter } from './router/api'
import { adminRouter } from './router/admin'
import { pagesRouter } from './router/pages'

export const router = (req, _, next) => {
  const { app } = req

  // views
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, 'views'))

  // static files
  app.use(express.static(path.join(__dirname, 'static')))

  // routes
  app.use('/api', apiRouter)
  app.use('/admin', adminRouter)
  app.use(pagesRouter)

  // catch 404 and forward to error handler
  app.use((_, __, next) => next(createHTTPError(404)))

  // error handler
  app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error')
  })

  next()
}
