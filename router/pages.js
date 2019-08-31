import { Router } from 'express'
import createHTTPError from 'http-errors'

import { Page } from '../models/Page'

export const pagesRouter = new Router()

pagesRouter.get('/', async (req, res, next) => {
  const page = await Page.findOne({ slug: 'home' })
  if (!page) return next(createHTTPError(404))
  res.render('page', page)
})

pagesRouter.get('/:page', async (req, res, next) => {
  const page = await Page.findOne({ slug: req.params.page })
  if (!page) return next(createHTTPError(404))
  res.render('page', page)
})
