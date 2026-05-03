import rateLimit from 'express-rate-limit'
import { config } from '../config/env'

/**
 * Rate limiter applied to the /api/generate route.
 * Protects the free Gemini API quota from abuse.
 */
export const rateLimitMiddleware = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    standardHeaders: true,   // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false,     // Disable `X-RateLimit-*` headers
    message: {
        error: 'Too Many Requests',
        message: `You have exceeded ${config.rateLimit.maxRequests} requests per ${config.rateLimit.windowMs / 1000}s. Please slow down.`,
        statusCode: 429,
    },
    skip: () => process.env.NODE_ENV === 'test',
})
