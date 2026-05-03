import cors from 'cors'
import { config } from '../config/env'

/**
 * CORS middleware configured from environment variables.
 * In development, the Vite dev server origin is whitelisted.
 */
export const corsMiddleware = cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman, server-to-server)
        if (!origin) return callback(null, true)

        if (config.cors.allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error(`CORS: origin '${origin}' is not allowed`))
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
})
