import { Router } from 'express'

import { Writing } from '../models/Writing'

export const writingsRouter = new Router()

writingsRouter
  .route('/')
  .get(async (_, res) => {
    const writingss = await Writing.find()
    res.json({ data: writingss })
  })
  .post(async (req, res) => {
    try {
      const newWritings = new Writing(req.body)
      const savedWritings = await newWritings.save()
      res.json({ data: savedWritings })
    } catch (e) {
      console.error(e)
    }
  })

writingsRouter.route('/:id').get(async (req, res) => {
  const writings = await Writing.findById(req.params.id)
  res.json({ data: writings })
})
