export type SSEEventType = 'token' | 'done' | 'error'

export interface SSEEvent {
    type: SSEEventType
    data: string
}
