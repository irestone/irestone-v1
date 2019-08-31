import { Router } from 'express'

import { Page } from '../../models/Page'

export const pagesRouter = new Router()

pagesRouter
  .route('/')
  .get(async (_, res) => {
    const pages = await Page.find()
    res.json({ data: pages })
  })
  .post(async (req, res) => {
    try {
      const newPage = new Page(req.body)
      const savedPage = await newPage.save()
      res.json({ data: savedPage })
    } catch (e) {
      console.error(e)
    }
  })

pagesRouter
  .route('/:idOrSlug')
  .get(async (req, res) => {
    const page = req.query.slug
      ? await Page.findOne({ slug: req.params.idOrSlug })
      : await Page.findById(req.params.idOrSlug)
    res.json({ data: page })
  })
  .put(async (req, res) => {
    try {
      const conditions = req.query.slug
        ? { slug: req.params.idOrSlug }
        : { _id: req.params.idOrSlug }
      const updatedPage = await Page.findOneAndUpdate(conditions, req.body, {
        new: true,
      })
      res.json({ data: updatedPage })
    } catch (e) {
      console.error(e)
    }
  })
  .delete(async (req, res) => {
    try {
      const conditions = req.query.slug
        ? { slug: req.params.idOrSlug }
        : { _id: req.params.idOrSlug }
      await Page.deleteOne(conditions)
      res.json({ data: 'Page successfully deleted' })
    } catch (e) {
      console.error(e)
    }
  })
