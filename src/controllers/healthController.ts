import { Request, Response } from 'express'
import { HealthResponse } from '../types'

export function getHealth(_req: Request, res: Response): void {
    const body: HealthResponse = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        environment: process.env.NODE_ENV ?? 'development',
    }
    res.status(200).json(body)
}