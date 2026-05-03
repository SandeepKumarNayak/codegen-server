import { Router } from 'express'
import { generateCode } from '../controllers/generateController'
import { validateBody, generateRequestSchema } from '../middleware/validateRequest'
import { rateLimitMiddleware } from '../middleware/rateLimit'

const router = Router()

// POST /api/generate
// - Rate limited to protect free Gemini quota
// - Validated with Zod before hitting the controller
// - Streams response via SSE
router.post(
    '/',
    rateLimitMiddleware,
    validateBody(generateRequestSchema),
    generateCode
)

export default router