import { Response } from 'express'
import { geminiModel } from '../config/gemini'
import { GenerateRequest } from '../types'
import { buildGenerationPrompt } from './promptService'
import { initSSE, sendToken, sendDone, sendError } from './sseService'

/**
 * Streams code generation from Gemini API to the client via SSE.
 *
 * Strategy: accumulate raw chunks in a buffer, strip leading code-fence
 * markers on the fly, and send only the net-new characters on each tick.
 * This avoids sending fence syntax (```tsx …) to the client.
 */
export async function streamCodeGeneration(
    req: GenerateRequest,
    res: Response
): Promise<void> {
    initSSE(res)

    const prompt = buildGenerationPrompt(req)
    console.log('Prompt:', prompt)
    try {
        const streamResult = await geminiModel.generateContentStream(prompt)

        // sentLength tracks how many characters of clean code we've already sent
        let rawBuffer = ''
        let sentLength = 0

        for await (const chunk of streamResult.stream) {
            const rawText = chunk.text()
            if (!rawText) continue

            rawBuffer += rawText

            // Robust cleaning: 
            // 1. Remove starting fence and language tag if present
            // 2. Remove any other occurrences of triple-backtick lines
            // 3. Remove trailing fence
            let clean = rawBuffer
                .replace(/^```[\w]*\r?\n?/, '')      // Start
                .replace(/\n```[\w]*\r?\n?/g, '\n') // Middle
                .replace(/\n?```\s*$/, '')           // End

            const newContent = clean.slice(sentLength)
            if (newContent) {
                sendToken(res, newContent)
                sentLength += newContent.length
            }
        }

        sendDone(res)
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Failed to generate code'
        console.error('[GeminiService] Error:', message)
        sendError(res, message)
    }
}