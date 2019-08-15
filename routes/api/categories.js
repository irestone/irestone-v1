import { Router } from 'express'

import { Category } from '../../models/Category'

export const categoriesRouter = new Router()

categoriesRouter
  .route('/')
  .get(async (_, res) => {
    const categories = await Category.find()
    res.json({ data: categories })
  })
  .post(async (req, res) => {
    try {
      const newCategory = new Category(req.body)
      const savedCategory = await newCategory.save()
      res.json({ data: savedCategory })
    } catch (e) {
      console.error(e)
    }
  })

categoriesRouter.route('/:idOrSlug').get(async (req, res) => {
  const category = req.query.slug
    ? await Category.findOne({ slug: req.params.idOrSlug })
    : await Category.findById(req.params.idOrSlug)
  res.json({ data: category })
})
