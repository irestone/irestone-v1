import { Router } from 'express'

export const indexRouter = new Router()

indexRouter.get('/', function(req, res, next) {
  res.render('index', {
    view: 'home',
    title: 'Home',
    content: 'Homepage content',
  })
})
