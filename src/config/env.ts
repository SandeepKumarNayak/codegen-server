import 'dotenv/config'

function requireEnv(key: string): string {
    const value = process.env[key]
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`)
    }
    return value
}

function optionalEnv(key: string, fallback: string): string {
    return process.env[key] ?? fallback
}

export const config = {
    port: parseInt(optionalEnv('PORT', '3001'), 10),
    nodeEnv: optionalEnv('NODE_ENV', 'development'),

    gemini: {
        apiKey: optionalEnv('GEMINI_API_KEY', ''),
        model: "gemini-2.5-flash",
    },

    // openrouter: {
    //     apiKey: optionalEnv('OPENROUTER_API_KEY', ''),
    //     model: optionalEnv('OPENROUTER_MODEL', 'anthropic/claude-3-haiku'),
    //     baseUrl: 'https://openrouter.ai/api/v1',
    // },

    cors: {
        allowedOrigins: optionalEnv(
            'ALLOWED_ORIGINS',
            'http://localhost:5173,http://localhost:3000'
        ).split(','),
    },

    rateLimit: {
        windowMs: parseInt(optionalEnv('RATE_LIMIT_WINDOW_MS', '60000'), 10),
        maxRequests: parseInt(optionalEnv('RATE_LIMIT_MAX_REQUESTS', '10'), 10),
    },
} as const
