import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import bodyParser from 'body-parser'

import { router } from './app/router'

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
app.set('views', path.join(__dirname, 'app', 'views'))

// static files
app.use(express.static(path.join(__dirname, 'public')))

// =====================================
//  ROUTING
// =====================================

app.use(router)
