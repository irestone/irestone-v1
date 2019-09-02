import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import bodyParser from 'body-parser'

import { router } from './app/router'

export const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use(router)
