import path from 'path'
import { Router } from 'express'

const adminViews = (fileName) => path.join('admin', fileName)

export const adminRouter = new Router()

adminRouter.get('/', (req, res) => {
  res.render(adminViews('index'), {
    title: 'Settings',
    slug: 'settings',
  })
})

adminRouter.get('/pages/:slug', (req, res) => {
  res.render(adminViews('page'), {
    title: req.params.slug,
    slug: req.params.slug,
  })
})

adminRouter.get('/categories/:slug', (req, res) => {
  res.render(adminViews('category'), {
    title: req.params.slug,
    slug: req.params.slug,
  })
})

adminRouter.get('/projects/new', (req, res) => {
  res.render(adminViews('projectEditor'), { title: 'New Project' })
})

adminRouter.get('/projects/edit/:id', (req, res) => {
  res.render(adminViews('projectEditor'), { title: 'Edit Project' })
})
