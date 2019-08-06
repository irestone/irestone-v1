import { Router } from 'express'

export const aboutRouter = new Router()

aboutRouter.get('/', function(req, res, next) {
  res.send('about me')
})
