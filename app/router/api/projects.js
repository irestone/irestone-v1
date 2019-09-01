import { Router } from 'express'

import { Project } from '../models/Project'

export const projectsRouter = new Router()

projectsRouter
  .route('/')
  .get(async (req, res) => {
    const projects = await Project.find(req.query)
    res.json({ data: projects })
  })
  .post(async (req, res) => {
    try {
      const newProject = new Project(req.body)
      const savedProject = await newProject.save()
      res.json({ data: savedProject })
    } catch (e) {
      console.error(e)
    }
  })

projectsRouter.route('/:id').get(async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.json({ data: project })
})
