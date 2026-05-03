export interface ApiError {
    error: string
    message: string
    statusCode: number
}

export interface HealthResponse {
    status: 'ok'
    timestamp: string
    uptime: number
    environment: string
}
