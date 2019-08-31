import path from 'path'
import createHTTPError from 'http-errors'
import { Router } from 'express'

import { Page } from '../models/Page'
import { Category } from '../models/Category'

const adminViews = (fileName) => path.join('admin', fileName)

export const adminRouter = new Router()

adminRouter.get('/', (req, res) => {
  res.render(adminViews('index'), {
    title: 'Settings',
    slug: 'settings',
  })
})

adminRouter.get('/pages/new', (req, res) => {
  res.render(adminViews('new_page'))
})

adminRouter.get('/pages/:slug', async (req, res, next) => {
  const page = await Page.findOne({ slug: req.params.slug })
  if (!page) return next(createHTTPError(404))
  res.render(adminViews('page'), page)
})

adminRouter.get('/categories/:slug', async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug })
  if (!category) return next(createHTTPError(404))
  res.render(adminViews('category'), category)
})
