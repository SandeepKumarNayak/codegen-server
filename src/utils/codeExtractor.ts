/**
 * Strips markdown code fences from a raw LLM response.
 *
 * The model often wraps output in:
 *   ```tsx
 *   ...code...
 *   ```
 * This utility removes those fences so only the raw code is kept.
 */
export function extractCode(raw: string): string {
    // Match an optional opening fence with language tag and a closing fence
    const fencePattern = /^```[\w]*\r?\n([\s\S]*?)```\s*$/m
    const match = raw.match(fencePattern)

    if (match) {
        return match[1].trimEnd()
    }

    // If no complete fence found yet (still streaming), strip only the opening fence
    const openingFence = /^```[\w]*\r?\n/m
    return raw.replace(openingFence, '')
}

/**
 * Returns true if the accumulated buffer ends with a complete code block.
 */
export function isCodeComplete(buffer: string): boolean {
    const openings = (buffer.match(/^```[\w]*/gm) ?? []).length
    const closings = (buffer.match(/^```\s*$/gm) ?? []).length
    return openings > 0 && openings === closings
}
