import { Router } from 'express'
import createHTTPError from 'http-errors'
import path from 'path'

import { Page } from './models/Page'
import { Category } from './models/Category'

const view = (name) => path.join('admin', name)

export const adminRouter = new Router()

adminRouter.get('/', (req, res) => {
  res.render(view('index'), {
    title: 'Settings',
    slug: 'settings',
  })
})

adminRouter.get('/pages/new', (req, res) => {
  res.render(view('new_page'))
})

adminRouter.get('/pages/:slug', async (req, res, next) => {
  const page = await Page.findOne({ slug: req.params.slug })
  if (!page) return next(createHTTPError(404))
  res.render(view('page'), page)
})

adminRouter.get('/categories/:slug', async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug })
  if (!category) return next(createHTTPError(404))
  res.render(view('category'), category)
})
