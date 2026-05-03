import { Router } from 'express'
import generateRouter from './generate'
import healthRouter from './health'

const apiRouter = Router()

apiRouter.use('/generate', generateRouter)
apiRouter.use('/health', healthRouter)

export default apiRouter
