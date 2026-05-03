import { GenerateRequest } from '../types'
import {
    SYSTEM_PROMPT,
    FRAMEWORK_INSTRUCTIONS,
    STYLING_INSTRUCTIONS,
} from '../utils/constants'

/**
 * Builds the full prompt string to send to the AI model.
 * Combines the system prompt with framework/styling instructions
 * and the user's natural language request.
 */
export function buildGenerationPrompt(request: GenerateRequest): string {
    const frameworkInstruction =
        FRAMEWORK_INSTRUCTIONS[request.framework] ?? FRAMEWORK_INSTRUCTIONS.react

    const stylingInstruction =
        STYLING_INSTRUCTIONS[request.styling] ?? STYLING_INSTRUCTIONS.tailwind

    const contextHeader = request.currentCode
        ? `You are updating existing code. Here is the current code:\n\n\`\`\`\n${request.currentCode}\n\`\`\`\n\nTask: Modify the code above based on the following request. Maintain consistency with the existing style and structure.`
        : SYSTEM_PROMPT

    return `${contextHeader}

Framework: ${frameworkInstruction}
Styling: ${stylingInstruction}

User request: ${request.prompt}

Generate the updated code now:`
}
