import { Router } from 'express'

export const aboutRouter = new Router()

aboutRouter.get('/', function(req, res, next) {
  res.render('index', {
    view: 'about',
    title: 'About',
    content: 'About content',
  })
})
