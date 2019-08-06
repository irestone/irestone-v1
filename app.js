import createHTTPError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import stylus from 'stylus'

// routes
import { indexRouter } from './routes/index'
import { aboutRouter } from './routes/about'

// setting up
export const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// static files
app.use(stylus.middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// routing
app.use('/', indexRouter)
app.use('/about', aboutRouter)

// catch 404 and forward to error handler
app.use((_, __, next) => next(createHTTPError(404)))

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})
