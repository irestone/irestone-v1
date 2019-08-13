import { Router } from 'express'

import { Topic } from '../../models/Topic'

export const topicsRouter = new Router()

topicsRouter
  .route('/')
  .get(async (_, res) => {
    const topics = await Topic.find()
    res.json({ data: topics })
  })
  .post(async (req, res) => {
    try {
      const newTopic = new Topic(req.body)
      const savedTopic = await newTopic.save()
      res.json({ data: savedTopic })
    } catch (e) {
      console.error(e)
    }
  })

topicsRouter.route('/:id').get(async (req, res) => {
  const topic = await Topic.findById(req.params.id)
  res.json({ data: topic })
})
