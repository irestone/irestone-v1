import { Router } from 'express'

import { Tag } from '../../models/Tag'

export const tagsRouter = new Router()

tagsRouter
  .route('/')
  .get(async (_, res) => {
    const tags = await Tag.find()
    res.json({ data: tags })
  })
  .post(async (req, res) => {
    try {
      const newTag = new Tag(req.body)
      const savedTag = await newTag.save()
      res.json({ data: savedTag })
    } catch (e) {
      console.error(e)
    }
  })

tagsRouter.route('/:id').get(async (req, res) => {
  const tag = await Tag.findById(req.params.id)
  res.json({ data: tag })
})
