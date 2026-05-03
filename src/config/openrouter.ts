import OpenAI from 'openai'
import { config } from './env'

/**
 * OpenRouter is OpenAI-API-compatible, so we reuse the openai SDK
 * by pointing baseURL at the OpenRouter endpoint.
 */
export const openrouterClient = new OpenAI({
    apiKey: config.openrouter.apiKey,
    baseURL: config.openrouter.baseUrl,
    defaultHeaders: {
        'HTTP-Referer': 'https://github.com/code-generator',
        'X-Title': 'AI Code Generator',
    },
})
