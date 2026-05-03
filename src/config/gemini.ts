import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from './env'

const genAI = new GoogleGenerativeAI(config.gemini.apiKey)
// Using v1 API version for better stability with 1.5 models
export const geminiModel = genAI.getGenerativeModel(
    {
        model: config.gemini.model,
        generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 8192,
        },
    },
    { apiVersion: 'v1' }
)
