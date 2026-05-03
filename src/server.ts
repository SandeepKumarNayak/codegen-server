import app from './app'
import { config } from './config/env'

const server = app.listen(config.port, () => {
    console.log(`
  ┌─────────────────────────────────────────┐
  │   Code Generator Backend                │
  │   Running on http://localhost:${config.port}      │
  │   Environment: ${config.nodeEnv.padEnd(25)}│
  │   Gemini API: Connected ✓               │
  └─────────────────────────────────────────┘
  `)
})

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...')
    server.close(() => {
        console.log('Server closed.')
        process.exit(0)
    })
})

process.on('SIGINT', () => {
    console.log('\nSIGINT received. Shutting down gracefully...')
    server.close(() => {
        console.log('Server closed.')
        process.exit(0)
    })
})