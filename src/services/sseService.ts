import { Response } from 'express'
import { SSEEvent } from '../types'

/**
 * Sets SSE headers on the response.
 * Must be called before any data is written.
 */
export function initSSE(res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no') // Disable Nginx buffering
    res.flushHeaders()
}

/**
 * Sends a single SSE event to the client.
 */
export function sendSSEEvent(res: Response, event: SSEEvent): void {
    const payload = JSON.stringify(event)
    res.write(`data: ${payload}\n\n`)
}

/**
 * Sends a token chunk to the client.
 */
export function sendToken(res: Response, token: string): void {
    sendSSEEvent(res, { type: 'token', data: token })
}

/**
 * Signals the client that streaming is complete.
 */
export function sendDone(res: Response): void {
    sendSSEEvent(res, { type: 'done', data: '' })
    res.end()
}

/**
 * Sends an error event to the client and ends the stream.
 */
export function sendError(res: Response, message: string): void {
    sendSSEEvent(res, { type: 'error', data: message })
    res.end()
}