import { GenerateRequest } from '../types'
import {
    SYSTEM_PROMPT,
    FRAMEWORK_INSTRUCTIONS,
    STYLING_INSTRUCTIONS,
} from './constants'

export function buildPrompt(request: GenerateRequest): string {
    const frameworkInstruction =
        FRAMEWORK_INSTRUCTIONS[request.framework] ?? FRAMEWORK_INSTRUCTIONS.react

    const stylingInstruction =
        STYLING_INSTRUCTIONS[request.styling] ?? STYLING_INSTRUCTIONS.tailwind

    return `${SYSTEM_PROMPT}

Framework: ${frameworkInstruction}
Styling: ${stylingInstruction}

User request: ${request.prompt}

Generate the code now:`
}