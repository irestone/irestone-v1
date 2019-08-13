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

categoriesRouter.route('/:id').get(async (req, res) => {
  const category = await Category.findById(req.params.id)
  res.json({ data: category })
})
