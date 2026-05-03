import { Response } from 'express'
import { openrouterClient } from '../config/openrouter'
import { config } from '../config/env'
import { GenerateRequest } from '../types'
import { buildGenerationPrompt } from './promptService'
import { initSSE, sendToken, sendDone, sendError } from './sseService'

/**
 * Streams code generation from OpenRouter (Claude / other models) via SSE.
 * Acts as a fallback when the Gemini API is unavailable or quota is exhausted.
 */
export async function streamCodeGenerationOpenRouter(
    req: GenerateRequest,
    res: Response
): Promise<void> {
    initSSE(res)

    const prompt = buildGenerationPrompt(req)

    try {
        const stream = await openrouterClient.chat.completions.create({
            model: config.openrouter.model,
            stream: true,
            messages: [{ role: 'user', content: prompt }],
        })

        for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content
            if (delta) {
                sendToken(res, delta)
            }
        }

        sendDone(res)
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'OpenRouter generation failed'
        console.error('[OpenRouterService] Error:', message)
        sendError(res, message)
    }
}
