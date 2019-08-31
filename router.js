import { Router } from 'express'
import createHTTPError from 'http-errors'

import { apiRouter } from './router/api'
import { adminRouter } from './router/admin'
import { pagesRouter } from './router/pages'

export const router = new Router()

router.use('/api', apiRouter)
router.use('/admin', adminRouter)
router.use(pagesRouter)

// catch 404 and forward to error handler
router.use((_, __, next) => next(createHTTPError(404)))

// error handler
router.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})
