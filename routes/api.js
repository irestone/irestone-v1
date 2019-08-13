import { Router } from 'express'

import { categoriesRouter } from './api/categories'
import { topicsRouter } from './api/topics'
import { tagsRouter } from './api/tags'
import { projectsRouter } from './api/projects'
import { writingsRouter } from './api/writings'

export const apiRouter = new Router()

apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/topics', topicsRouter)
apiRouter.use('/tags', tagsRouter)
apiRouter.use('/projects', projectsRouter)
apiRouter.use('/writings', writingsRouter)
