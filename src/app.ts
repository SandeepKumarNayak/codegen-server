import express from 'express'
import { corsMiddleware } from './middleware/cors'
import { requestLogger } from './middleware/requestLogger'
import { errorHandler } from './middleware/errorHandler'
import apiRouter from './routes/index'

const app = express()

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(corsMiddleware)
app.use(express.json())
app.use(requestLogger)

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api', apiRouter)

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested endpoint does not exist',
        statusCode: 404,
    })
})

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use(errorHandler)

export default app