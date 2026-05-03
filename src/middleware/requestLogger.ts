import { Request, Response, NextFunction } from 'express'

/**
 * Simple request logger that prints method, path, status code, and duration.
 * Output format:  [2026-04-29T08:00:00Z] POST /api/generate → 200 (142ms)
 */
export function requestLogger(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const start = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - start
        const timestamp = new Date().toISOString()
        const status = res.statusCode
        const color =
            status >= 500 ? '\x1b[31m' :   // red
            status >= 400 ? '\x1b[33m' :   // yellow
            status >= 300 ? '\x1b[36m' :   // cyan
                            '\x1b[32m'     // green
        const reset = '\x1b[0m'

        console.log(
            `${color}[${timestamp}] ${req.method} ${req.path} → ${status} (${duration}ms)${reset}`
        )
    })

    next()
}
