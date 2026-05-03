/**
 * Parses a raw SSE data line and returns the parsed object, or null if invalid.
 *
 * SSE format:  data: {"type":"token","data":"..."}
 */
export function parseSSELine(line: string): Record<string, unknown> | null {
    if (!line.startsWith('data:')) return null

    const jsonStr = line.slice(5).trim()

    try {
        return JSON.parse(jsonStr) as Record<string, unknown>
    } catch {
        return null
    }
}

/**
 * Splits a raw SSE stream buffer into individual data lines.
 * Handles both \n\n and \r\n\r\n event boundaries.
 */
export function splitSSEBuffer(buffer: string): string[] {
    return buffer
        .split(/\r?\n\r?\n/)
        .flatMap((block) => block.split(/\r?\n/))
        .filter((line) => line.startsWith('data:'))
}
