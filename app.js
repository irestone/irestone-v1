import createHTTPError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import stylus from 'stylus'
import bodyParser from 'body-parser'

import { apiRouter } from './routes/api'
import { indexRouter } from './routes/index'
import { aboutRouter } from './routes/about'
import { adminRouter } from './routes/admin'

export const app = express()

// =====================================
//  SETTING UP
// =====================================

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

// view engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// static files
app.use(stylus.middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// =====================================
//  ROUTING
// =====================================
// ? should i do routing separately

app.use('/api', apiRouter)
app.use('/', indexRouter)
app.use('/about', aboutRouter)
app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use((_, __, next) => next(createHTTPError(404)))

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})
