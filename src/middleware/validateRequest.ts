import { Request, Response, NextFunction } from 'express'
import { z, ZodSchema } from 'zod'

export const generateRequestSchema = z.object({
    prompt: z
        .string()
        .min(5, 'Prompt must be at least 5 characters')
        .max(1000, 'Prompt must not exceed 1000 characters'),
    framework: z.enum(['react', 'vue', 'html'], {
        error: 'Framework must be react, vue, or html',
    }),
    styling: z.enum(['tailwind', 'css', 'none', 'bootstrap', 'scss'], {
        error: 'Styling must be tailwind, css, none, bootstrap, or scss',
    }),
})

export function validateBody(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            res.status(400).json({
                error: 'Validation Error',
                message: result.error.issues.map((i) => i.message).join(', '),
                statusCode: 400,
            })
            return
        }

        req.body = result.data
        next()
    }
}