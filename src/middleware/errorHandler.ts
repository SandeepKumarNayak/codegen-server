import { Request, Response, NextFunction } from 'express'

/**
 * Global error handler — must be the last middleware registered in app.ts.
 * Normalises any thrown error into a consistent JSON shape.
 */
export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): void {
    const isDev = process.env.NODE_ENV !== 'production'

    if (err instanceof Error) {
        console.error(`[ErrorHandler] ${err.message}`, isDev ? err.stack : '')

        // Detect CORS errors from the cors middleware
        if (err.message.startsWith('CORS:')) {
            res.status(403).json({
                error: 'Forbidden',
                message: err.message,
                statusCode: 403,
            })
            return
        }

        res.status(500).json({
            error: 'Internal Server Error',
            message: isDev ? err.message : 'Something went wrong',
            statusCode: 500,
        })
        return
    }

    console.error('[ErrorHandler] Unknown error', err)
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        statusCode: 500,
    })
}
